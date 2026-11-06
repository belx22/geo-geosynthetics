import { useSyncExternalStore } from 'react'
import { SEED_DEMANDES } from './demandes.js'

/* =============================================================================
   Entrepôt des demandes d'étude.

   Front-end uniquement : les demandes sont conservées dans le navigateur
   (localStorage) afin que l'espace d'administration soit utilisable et que le
   parcours complet — envoi du formulaire public puis traitement en
   administration — soit démontrable.

   À brancher sur l'API du back-office lors de la réalisation : seules les
   fonctions ci-dessous sont à remplacer, les écrans restent inchangés.
   ========================================================================== */

const KEY = 'ggs.demandes.v1'

/* Garantit la forme attendue par les écrans, quelle que soit l'ancienneté de
   l'enregistrement conservé dans le navigateur. */
const normalise = (d) => ({
  ...d,
  files: Array.isArray(d.files) ? d.files : [],
  echanges: Array.isArray(d.echanges) ? d.echanges : [],
})

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(normalise)
    }
  } catch {
    /* stockage indisponible ou données illisibles : on repart du jeu d'essai */
  }
  return SEED_DEMANDES.map(normalise)
}

let state = read()
const listeners = new Set()

const commit = (next) => {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* quota dépassé ou navigation privée : l'état reste en mémoire */
  }
  listeners.forEach((l) => l())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => state

/** Liste réactive des demandes. */
export function useDemandes() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export const getDemande = (id) => state.find((d) => d.id === id)

/** Référence lisible, au format affiché sur l'écran de confirmation. */
export function nextReference() {
  const year = new Date().getFullYear()
  const used = new Set(state.map((d) => d.id))
  let n = 8413
  while (used.has(`GGS-${year}-${n}`)) n += 1
  return `GGS-${year}-${n}`
}

/** Enregistre une demande envoyée depuis le formulaire public. */
export function addDemande(values) {
  const demande = {
    id: nextReference(),
    createdAt: new Date().toISOString(),
    status: 'nouvelle',
    assignee: 'Non attribuée',
    firstResponseAt: null,
    echanges: [],
    ...values,
  }
  commit([demande, ...state])
  return demande
}

export function updateDemande(id, patch) {
  commit(state.map((d) => (d.id === id ? { ...d, ...patch } : d)))
}

/**
 * Ajoute un échange au dossier.
 *
 * `kind: 'note'`    — note interne, non visible du demandeur ;
 * `kind: 'reponse'` — réponse adressée au demandeur par courriel. Elle
 *   horodate la première réponse (indicateur « délai de première réponse »,
 *   § III tableau 2) et fait passer le dossier en « Réponse envoyée ».
 */
export function addEchange(id, { kind, author, subject = '', text }) {
  const at = new Date().toISOString()
  commit(
    state.map((d) => {
      if (d.id !== id) return d
      const isReply = kind === 'reponse'
      return {
        ...d,
        echanges: [...d.echanges, { at, author, kind, subject, text }],
        firstResponseAt: isReply ? d.firstResponseAt ?? at : d.firstResponseAt,
        status: isReply && ['nouvelle', 'qualifiee', 'etude'].includes(d.status)
          ? 'repondue'
          : d.status,
      }
    })
  )
}

/**
 * Construit le lien `mailto:` d'une réponse au demandeur.
 *
 * Front-end uniquement : le courriel est ouvert dans la messagerie de
 * l'utilisateur. L'envoi depuis le serveur, l'accusé de réception automatique
 * et la notification de l'équipe d'étude (EF-08) relèvent du back-office.
 */
export function buildMailto(demande, subject, body) {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${demande.email}?${params.toString().replace(/\+/g, '%20')}`
}

/** Suppression — droit à l'effacement (§ VII, données personnelles). */
export function deleteDemande(id) {
  commit(state.filter((d) => d.id !== id))
}

/** Restaure le jeu d'essai (utile en démonstration). */
export function resetDemandes() {
  commit(SEED_DEMANDES)
}
