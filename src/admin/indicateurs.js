import { STATUSES, isPublicBuyer } from '../data/demandes.js'

/* =============================================================================
   Indicateurs de pilotage — tableau 2 du cahier des charges (§ III).

   Deux sources :
   - « demandes »     : calculé à partir des demandes réellement reçues ;
   - « statistiques » : alimenté par le module de mesure d'audience respectueux
                        de la vie privée (EF-16), à brancher. Les valeurs
                        affichées sont des relevés d'exemple.
   ========================================================================== */

export const MOIS = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
]

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

export const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

/** Délai en heures entre réception et première réponse. */
const responseHours = (d) =>
  d.firstResponseAt
    ? (new Date(d.firstResponseAt) - new Date(d.createdAt)) / 3_600_000
    : null

export function formatDelay(hours) {
  if (hours === null || Number.isNaN(hours)) return '—'
  if (hours < 24) return `${Math.round(hours)} h`
  return `${(hours / 24).toFixed(1).replace('.', ',')} j`
}

/** Répartition par clé, triée du plus grand au plus petit. */
export function distribution(demandes, key) {
  const counts = new Map()
  demandes.forEach((d) => counts.set(d[key], (counts.get(d[key]) ?? 0) + 1))
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
}

/** Volume mensuel sur les `months` derniers mois, du plus ancien au plus récent. */
export function monthly(demandes, months = 6) {
  const now = new Date()
  const buckets = []
  for (let i = months - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.push({ year: d.getFullYear(), month: d.getMonth(), value: 0 })
  }
  demandes.forEach((d) => {
    const date = new Date(d.createdAt)
    const b = buckets.find((x) => x.year === date.getFullYear() && x.month === date.getMonth())
    if (b) b.value += 1
  })
  return buckets.map((b) => ({ label: `${MOIS[b.month]} ${String(b.year).slice(2)}`, value: b.value }))
}

/** File d'attente par statut, dans l'ordre du cycle de vie. */
export function pipeline(demandes) {
  return STATUSES.map((s) => ({
    ...s,
    value: demandes.filter((d) => d.status === s.id).length,
  }))
}

/**
 * Indicateurs du tableau 2.
 * `source` distingue le calculé du relevé d'audience ; `target` reprend la
 * cible inscrite au cahier des charges lorsqu'elle est arrêtée.
 */
export function indicateurs(demandes) {
  const now = new Date()
  const thisMonth = demandes.filter((d) => {
    const date = new Date(d.createdAt)
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
  })
  const lastMonth = demandes.filter((d) => {
    const date = new Date(d.createdAt)
    const ref = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return date.getFullYear() === ref.getFullYear() && date.getMonth() === ref.getMonth()
  })

  const publics = demandes.filter(isPublicBuyer)
  const delays = demandes.map(responseHours).filter((h) => h !== null)
  const avgDelay = delays.length ? delays.reduce((a, b) => a + b, 0) / delays.length : null
  const pending = demandes.filter((d) => d.status === 'nouvelle').length

  return [
    {
      id: 'recues',
      label: "Demandes d'étude reçues",
      icon: 'mail',
      value: thisMonth.length || lastMonth.length,
      unit: thisMonth.length ? 'ce mois' : 'mois dernier',
      foot: `${demandes.length} au total`,
      target: 'Cible à définir',
      freq: 'Relevé mensuel',
      source: 'demandes',
    },
    {
      id: 'publics',
      label: "Part émanant d'acheteurs publics",
      icon: 'building',
      value: demandes.length ? Math.round((publics.length / demandes.length) * 100) : 0,
      unit: '%',
      foot: `${publics.length} demande${publics.length > 1 ? 's' : ''} sur ${demandes.length}`,
      target: 'Visiteur prioritaire',
      freq: 'Relevé trimestriel',
      source: 'demandes',
    },
    {
      id: 'delai',
      label: 'Délai moyen de première réponse',
      icon: 'clock',
      value: formatDelay(avgDelay),
      unit: '',
      foot: `${delays.length} demande${delays.length > 1 ? 's' : ''} traitée${delays.length > 1 ? 's' : ''}`,
      target: 'Cible à définir',
      freq: 'Relevé mensuel',
      source: 'demandes',
    },
    {
      id: 'attente',
      label: 'En attente de qualification',
      icon: 'alert',
      value: pending,
      unit: '',
      foot: pending ? 'À traiter en priorité' : 'Aucune demande en attente',
      target: "Équipe d'étude",
      freq: 'Suivi opérationnel',
      source: 'demandes',
    },
  ]
}

/** Indicateurs alimentés par le module de statistiques (EF-16). */
export const INDICATEURS_AUDIENCE = [
  {
    id: 'transformation',
    label: 'Taux de transformation des visites',
    icon: 'trending',
    value: '2,4', unit: '%',
    foot: 'Visites converties en demandes',
    target: 'Cible à définir',
    freq: 'Relevé mensuel',
    source: 'statistiques',
  },
  {
    id: 'abandon',
    label: "Taux d'abandon du formulaire",
    icon: 'trendingDown',
    value: '31', unit: '%',
    foot: 'Formulaires ouverts non envoyés',
    target: 'Cible à définir',
    freq: 'Relevé mensuel',
    source: 'statistiques',
  },
  {
    id: 'clics',
    label: 'Clics pour atteindre le formulaire',
    icon: 'target',
    value: '2', unit: 'max',
    foot: 'Depuis n’importe quelle page',
    target: '3 au maximum',
    freq: 'À chaque version',
    source: 'statistiques',
  },
  {
    id: 'affichage',
    label: "Temps d'affichage de l'accueil (mobile)",
    icon: 'bolt',
    value: '1,8', unit: 's',
    foot: 'Connexion mobile moyenne',
    target: '3 secondes au plus',
    freq: 'À chaque version',
    source: 'statistiques',
  },
  {
    id: 'telechargements',
    label: 'Documents téléchargés',
    icon: 'download',
    value: '147', unit: '',
    foot: 'Sur le mois écoulé',
    target: 'Cible à définir',
    freq: 'Relevé mensuel',
    source: 'statistiques',
  },
]
