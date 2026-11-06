import { useSyncExternalStore } from 'react'

/* =============================================================================
   Session de l'espace d'administration.

   ⚠️ Démonstration d'interface uniquement. Aucune authentification réelle :
   le choix du profil n'est pas vérifié et n'offre aucune protection. Le
   contrôle d'accès, les comptes protégés et la connexion sécurisée relèvent du
   back-office (§ VII, sécurité).

   Deux profils, conformes au périmètre fonctionnel (§ I, module
   « Administration » : profils rédacteur et administrateur) :

   - administrateur : contenus + demandes reçues + indicateurs ;
   - rédacteur      : contenus seulement. Les demandes contiennent des données
                      personnelles : l'accès est réservé à l'administrateur et à
                      l'équipe d'étude (§ VII, données personnelles).
   ========================================================================== */

const KEY = 'ggs.session.v1'

export const PROFILES = {
  administrateur: {
    id: 'administrateur',
    label: 'Administrateur',
    name: 'Dongmo Djouaka Bryan',
    scope: "Contenus, demandes reçues et indicateurs de pilotage",
    can: { demandes: true, contenus: true, indicateurs: true, export: true },
  },
  redacteur: {
    id: 'redacteur',
    label: 'Rédacteur',
    name: 'Ines Tchankwe',
    scope: 'Contenus des pages, fiches et documents',
    can: { demandes: false, contenus: true, indicateurs: false, export: false },
  },
}

const read = () => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw && PROFILES[raw]) return PROFILES[raw]
  } catch {
    /* stockage indisponible */
  }
  return null
}

let state = read()
const listeners = new Set()

const commit = (next) => {
  state = next
  try {
    if (next) sessionStorage.setItem(KEY, next.id)
    else sessionStorage.removeItem(KEY)
  } catch {
    /* stockage indisponible : la session reste en mémoire */
  }
  listeners.forEach((l) => l())
}

export function useSession() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
    () => state
  )
}

export const signIn = (profileId) => commit(PROFILES[profileId] ?? null)
export const signOut = () => commit(null)
