import { useSyncExternalStore } from 'react'
import { DOMAINS, PROJECTS } from './site.js'

/* =============================================================================
   Entrepôt des contenus du site.

   EF-14 — « L'administrateur crée, modifie et dépublie une page, une fiche ou
   un document sans faire appel à un développeur. »

   Le site public lit ses contenus ici : toute modification faite dans l'espace
   d'administration est immédiatement visible sur le site. Les contenus
   dépubliés disparaissent du site public mais restent accessibles en
   administration.

   Front-end uniquement : la persistance se fait dans le navigateur
   (localStorage). Lors de la réalisation, seules les fonctions de ce fichier
   sont à brancher sur le système de gestion de contenu retenu (§ VI.4) ; les
   écrans restent inchangés.
   ========================================================================== */

const KEY = 'ggs.contenus.v1'

/* ----------------------------------------------------------------- Pages --- */
const SEED_PAGES = [
  {
    id: 'accueil', title: 'Accueil', path: '/',
    seoTitle: 'Geo-Geosynthetics — Études, Innovations, Ingénieries',
    seoDescription: "Bureau d'études spécialisé dans l'ingénierie des sols. Nous étudions votre situation avant de proposer une solution géosynthétique.",
    intro: "Des solutions géosynthétiques étudiées pour chaque ouvrage.",
    published: true, updatedAt: '2026-10-28',
  },
  {
    id: 'apropos', title: 'À propos', path: '/a-propos',
    seoTitle: 'À propos — Geo-Geosynthetics',
    seoDescription: "Bureau d'études spécialisé dans le dimensionnement technique et l'optimisation des structures terrestres.",
    intro: "L'ingénierie des sols au service de vos ouvrages.",
    published: true, updatedAt: '2026-10-21',
  },
  {
    id: 'domaines', title: "Domaines d'application", path: '/domaines-d-application',
    seoTitle: "Domaines d'application — Geo-Geosynthetics",
    seoDescription: "Découvrez comment les géosynthétiques répondent aux contraintes de vos projets d'infrastructure.",
    intro: "Des solutions pour chaque type d'ouvrage.",
    published: true, updatedAt: '2026-10-24',
  },
  {
    id: 'references', title: 'Références', path: '/references',
    seoTitle: 'Références — Geo-Geosynthetics',
    seoDescription: "Nos projets d'ingénierie les plus emblématiques à travers le continent.",
    intro: 'Des ouvrages conçus pour durer.',
    published: true, updatedAt: '2026-10-19',
  },
  {
    id: 'contact', title: 'Demander une étude', path: '/demander-une-etude',
    seoTitle: "Demander une étude — Geo-Geosynthetics",
    seoDescription: "Décrivez-nous votre situation : nos ingénieurs l'analysent avant de vous proposer une solution.",
    intro: "Décrivez-nous votre situation.",
    published: true, updatedAt: '2026-10-28',
  },
  {
    id: 'glossaire', title: 'Glossaire', path: '/glossaire',
    seoTitle: 'Glossaire — Geo-Geosynthetics',
    seoDescription: 'Définitions simples des termes techniques : géogrille, géotextile, remblai, couche de forme…',
    intro: 'Les termes techniques expliqués simplement.',
    published: false, updatedAt: '',
  },
]

/* ------------------------------------------------------------- Documents --- */
const SEED_DOCUMENTS = [
  { id: 'doc-routes', title: 'Guide des solutions routières', domain: 'Routes et voiries', lang: 'Français', size: '2,4 Mo', date: '02/2026', published: true, updatedAt: '2026-02-10' },
  { id: 'doc-sols', title: 'Guide du renforcement de sols', domain: 'Terrassements et fondations', lang: 'Français', size: '3,1 Mo', date: '02/2026', published: true, updatedAt: '2026-02-18' },
  { id: 'doc-hydro', title: "Guide de l'étanchéité par géomembranes", domain: 'Travaux hydrauliques', lang: 'Français', size: '2,8 Mo', date: '01/2026', published: true, updatedAt: '2026-01-22' },
  { id: 'doc-env', title: 'Guide du confinement de sites', domain: 'Environnement et stockage', lang: 'Français', size: '4,2 Mo', date: '12/2025', published: true, updatedAt: '2025-12-05' },
  { id: 'doc-rail', title: 'Guide des plateformes ferroviaires', domain: 'Ouvrages ferroviaires', lang: 'Français', size: '1,9 Mo', date: '03/2026', published: true, updatedAt: '2026-03-14' },
]

const withMeta = (items, date) =>
  items.map((it) => ({ published: true, updatedAt: date, ...it }))

const seed = () => ({
  pages: SEED_PAGES,
  domaines: withMeta(DOMAINS, '2026-10-24'),
  projets: withMeta(PROJECTS, '2026-10-19'),
  documents: SEED_DOCUMENTS,
})

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      /* Si une collection manque (ancienne version), on complète par le socle. */
      const base = seed()
      return {
        pages: parsed.pages?.length ? parsed.pages : base.pages,
        domaines: parsed.domaines?.length ? parsed.domaines : base.domaines,
        projets: parsed.projets?.length ? parsed.projets : base.projets,
        documents: parsed.documents?.length ? parsed.documents : base.documents,
      }
    }
  } catch {
    /* stockage indisponible ou données illisibles : on repart du socle */
  }
  return seed()
}

let state = read()
const listeners = new Set()

const commit = (next) => {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* quota dépassé : l'état reste en mémoire pour la session */
  }
  listeners.forEach((l) => l())
}

const subscribe = (l) => {
  listeners.add(l)
  return () => listeners.delete(l)
}
const getSnapshot = () => state

/** Ensemble des contenus (vue administration : publiés et dépubliés). */
export function useContenus() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Contenus visibles du site public : les dépubliés sont retirés. */
export function usePublies(collection) {
  const all = useContenus()
  return all[collection].filter((item) => item.published !== false)
}

export const getContenu = (collection, id) =>
  state[collection].find((item) => item.id === id || item.slug === id)

/** Paramètres d'une page, tels que réglés en administration. */
export function usePage(id) {
  const all = useContenus()
  return all.pages.find((p) => p.id === id)
}

const keyOf = (item) => item.slug ?? item.id

/** Crée ou met à jour un contenu. */
export function saveContenu(collection, item) {
  const today = new Date().toISOString().slice(0, 10)
  const next = { ...item, updatedAt: today }
  const list = state[collection]
  const i = list.findIndex((x) => keyOf(x) === keyOf(next))
  const updated = i >= 0
    ? list.map((x, idx) => (idx === i ? { ...x, ...next } : x))
    : [next, ...list]
  commit({ ...state, [collection]: updated })
  return next
}

export function removeContenu(collection, id) {
  commit({ ...state, [collection]: state[collection].filter((x) => keyOf(x) !== id) })
}

export function togglePublication(collection, id) {
  commit({
    ...state,
    [collection]: state[collection].map((x) =>
      keyOf(x) === id ? { ...x, published: x.published === false } : x
    ),
  })
}

export function resetContenus() {
  commit(seed())
}

/** Identifiant d'URL lisible, dérivé du titre. */
export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
