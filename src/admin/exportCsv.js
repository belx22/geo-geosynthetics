import { getStatus, isPublicBuyer } from '../data/demandes.js'
import { formatDateTime } from './indicateurs.js'

/* EF-15 — « L'administration permet de consulter et d'exporter les demandes
   reçues. » Export CSV (séparateur point-virgule, BOM UTF-8) directement
   exploitable dans un tableur francophone. */

const COLUMNS = [
  ['Référence', (d) => d.id],
  ['Date de réception', (d) => formatDateTime(d.createdAt)],
  ['Statut', (d) => getStatus(d.status).label],
  ['Nom et prénom', (d) => d.name],
  ['Fonction', (d) => d.role],
  ['Organisme', (d) => d.org],
  ["Type d'organisme", (d) => d.orgType],
  ['Acheteur public', (d) => (isPublicBuyer(d) ? 'Oui' : 'Non')],
  ['Courriel', (d) => d.email],
  ['Téléphone', (d) => d.phone],
  ['Pays', (d) => d.country],
  ['Ville', (d) => d.city],
  ["Domaine d'application", (d) => d.workType],
  ['Stade du projet', (d) => d.stage],
  ['Échéance souhaitée', (d) => d.deadline],
  ['Description de la situation', (d) => d.situation],
  ['Contraintes connues', (d) => d.constraints],
  ['Pièces jointes', (d) => (d.files ?? []).join(' | ')],
  ['Attribuée à', (d) => d.assignee],
  ['Première réponse', (d) => (d.firstResponseAt ? formatDateTime(d.firstResponseAt) : '')],
  ['Réponses envoyées', (d) => (d.echanges ?? []).filter((e) => e.kind === 'reponse').length],
]

const escape = (value) => {
  const text = String(value ?? '').replace(/\r?\n/g, ' ')
  return /[";]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function exportDemandesCsv(demandes) {
  const header = COLUMNS.map(([label]) => escape(label)).join(';')
  const rows = demandes.map((d) => COLUMNS.map(([, get]) => escape(get(d))).join(';'))
  /* BOM : Excel reconnaît l'UTF-8 et affiche correctement les accents. */
  const csv = `﻿${[header, ...rows].join('\r\n')}`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  link.href = url
  link.download = `geo-geosynthetics-demandes-${stamp}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
