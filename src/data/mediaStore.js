import { useSyncExternalStore } from 'react'
import { BUNDLED_MEDIA } from './mediaLibrary.js'

/* =============================================================================
   Médiathèque.

   Deux origines :
   - « livrée »  : les 48 photographies de `public/images/`, non supprimables ;
   - « importée » : les visuels ajoutés depuis l'administration.

   Les imports sont redimensionnés (1400 px au plus) et recompressés en WebP
   dans le navigateur avant enregistrement, afin de tenir l'exigence de
   performance (§ VII) et de limiter l'occupation du stockage local.

   Front-end uniquement : lors de la réalisation, l'import doit déposer le
   fichier sur le serveur ; seules les fonctions de ce fichier changent.
   ========================================================================== */

const KEY = 'ggs.medias.v1'
const MAX_WIDTH = 1400
const QUOTA_OCTETS = 4 * 1024 * 1024 // marge sous la limite usuelle de 5 Mo

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    /* stockage indisponible */
  }
  return []
}

let imported = read()
const listeners = new Set()

/* Catalogue complet, recomposé à chaque changement seulement : la référence
   reste stable entre deux rendus, comme l'exige `useSyncExternalStore`. */
let snapshot = [...BUNDLED_MEDIA, ...imported]

const commit = (next) => {
  imported = next
  snapshot = [...BUNDLED_MEDIA, ...imported] // avant de notifier
  try {
    localStorage.setItem(KEY, JSON.stringify(imported))
  } catch {
    /* quota dépassé : les visuels restent disponibles pour la session */
  }
  listeners.forEach((l) => l())
}

export function useMedias() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => snapshot,
    () => snapshot
  )
}

export const getMedia = (src) => snapshot.find((m) => m.src === src)

/** Poids approximatif des visuels importés. */
export function poidsImporte() {
  return imported.reduce((total, m) => total + m.src.length * 0.75, 0)
}

export const quotaMedia = () => ({ utilise: poidsImporte(), total: QUOTA_OCTETS })

/**
 * Importe un fichier image : redimensionnement, conversion WebP, puis
 * enregistrement. Rejette si le quota local est atteint.
 */
export function importerMedia(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error("Ce fichier n'est pas une image."))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Lecture du fichier impossible.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Image illisible.'))
      img.onload = () => {
        const ratio = Math.min(1, MAX_WIDTH / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * ratio)
        canvas.height = Math.round(img.height * ratio)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)

        let src = canvas.toDataURL('image/webp', 0.78)
        /* Si le visuel reste lourd, on réduit la qualité avant d'abandonner. */
        if (src.length * 0.75 > 600 * 1024) src = canvas.toDataURL('image/webp', 0.6)

        if (poidsImporte() + src.length * 0.75 > QUOTA_OCTETS) {
          reject(new Error(
            "Le stockage local de démonstration est plein. Supprimez un visuel importé, " +
            'ou branchez le dépôt de fichiers du serveur.'
          ))
          return
        }

        const media = {
          id: `import-${Date.now()}`,
          name: file.name.replace(/\.[^.]+$/, ''),
          src,
          famille: 'Visuels importés',
          kind: 'import',
          width: canvas.width,
          height: canvas.height,
        }
        commit([media, ...imported])
        resolve(media)
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function supprimerMedia(id) {
  commit(imported.filter((m) => m.id !== id))
}

export function renommerMedia(id, name) {
  commit(imported.map((m) => (m.id === id ? { ...m, name } : m)))
}
