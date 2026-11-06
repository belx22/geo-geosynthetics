import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import AdminLayout from './AdminLayout.jsx'
import AccessDenied from './AccessDenied.jsx'
import { useDemandes, resetDemandes } from '../data/demandesStore.js'
import { useSession } from '../data/sessionStore.js'
import { STATUSES, getStatus, isPublicBuyer, ASSIGNEES } from '../data/demandes.js'
import { WORK_TYPES, ORG_TYPES } from '../data/site.js'
import { formatDate, formatDelay } from './indicateurs.js'
import { exportDemandesCsv } from './exportCsv.js'

const SORTS = {
  recent: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  ancien: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  organisme: (a, b) => a.org.localeCompare(b.org, 'fr'),
  statut: (a, b) =>
    STATUSES.findIndex((s) => s.id === a.status) - STATUSES.findIndex((s) => s.id === b.status),
}

export default function Demandes() {
  const demandes = useDemandes()
  const session = useSession()

  const [status, setStatus] = useState('tous')
  const [workType, setWorkType] = useState('tous')
  const [orgType, setOrgType] = useState('tous')
  const [assignee, setAssignee] = useState('tous')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recent')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return demandes
      .filter((d) => {
        if (status !== 'tous' && d.status !== status) return false
        if (workType !== 'tous' && d.workType !== workType) return false
        if (orgType === 'publics' && !isPublicBuyer(d)) return false
        if (orgType !== 'tous' && orgType !== 'publics' && d.orgType !== orgType) return false
        if (assignee !== 'tous' && d.assignee !== assignee) return false
        if (!q) return true
        return `${d.id} ${d.name} ${d.org} ${d.city} ${d.country} ${d.situation} ${d.email}`
          .toLowerCase()
          .includes(q)
      })
      .sort(SORTS[sort])
  }, [demandes, status, workType, orgType, assignee, query, sort])

  if (!session.can.demandes) {
    return (
      <AdminLayout title="Demandes reçues" subtitle={`Profil ${session.label}`}>
        <AccessDenied />
      </AdminLayout>
    )
  }

  const delay = (d) =>
    d.firstResponseAt
      ? formatDelay((new Date(d.firstResponseAt) - new Date(d.createdAt)) / 3_600_000)
      : '—'

  return (
    <AdminLayout
      title="Demandes reçues"
      subtitle="Consulter, qualifier, répondre et exporter les demandes d'étude"
      actions={
        <>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => {
              if (window.confirm('Restaurer le jeu de démonstration ? Les modifications locales seront perdues.')) {
                resetDemandes()
              }
            }}
          >
            Réinitialiser la démonstration
          </button>
          <button
            type="button"
            className="btn btn--green btn--sm"
            onClick={() => exportDemandesCsv(list)}
            disabled={list.length === 0}
          >
            <Icon name="download" size={15} />
            Exporter ({list.length})
          </button>
        </>
      }
    >
      <div className="adm-card">
        {/* ------------------------------------------------------- Filtres */}
        <div className="adm-filters">
          <div className="adm-filters__search">
            <Icon name="search" size={15} />
            <label htmlFor="q" style={{ position: 'absolute', left: '-9999px' }}>
              Rechercher une demande
            </label>
            <input
              id="q"
              type="search"
              placeholder="Référence, nom, organisme, ville…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <label htmlFor="f-statut" style={{ position: 'absolute', left: '-9999px' }}>Statut</label>
          <select id="f-statut" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="tous">Tous les statuts</option>
            {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>

          <label htmlFor="f-domaine" style={{ position: 'absolute', left: '-9999px' }}>Domaine</label>
          <select id="f-domaine" value={workType} onChange={(e) => setWorkType(e.target.value)}>
            <option value="tous">Tous les domaines</option>
            {WORK_TYPES.map((w) => <option key={w}>{w}</option>)}
          </select>

          <label htmlFor="f-org" style={{ position: 'absolute', left: '-9999px' }}>Type d'organisme</label>
          <select id="f-org" value={orgType} onChange={(e) => setOrgType(e.target.value)}>
            <option value="tous">Tous les organismes</option>
            <option value="publics">Acheteurs publics uniquement</option>
            {ORG_TYPES.map((o) => <option key={o}>{o}</option>)}
          </select>

          <label htmlFor="f-assignee" style={{ position: 'absolute', left: '-9999px' }}>Attribution</label>
          <select id="f-assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option value="tous">Toute l'équipe</option>
            {ASSIGNEES.map((a) => <option key={a}>{a}</option>)}
          </select>

          <label htmlFor="f-tri" style={{ position: 'absolute', left: '-9999px' }}>Trier</label>
          <select id="f-tri" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Plus récentes d'abord</option>
            <option value="ancien">Plus anciennes d'abord</option>
            <option value="organisme">Organisme (A → Z)</option>
            <option value="statut">Avancement</option>
          </select>

          <span className="adm-filters__count">
            {list.length} demande{list.length > 1 ? 's' : ''} sur {demandes.length}
          </span>
        </div>

        {/* ------------------------------------------------------- Tableau */}
        <div className="adm-table-wrap">
          <table className="adm-table">
            <caption style={{ position: 'absolute', left: '-9999px' }}>
              Demandes d'étude reçues par le formulaire du site
            </caption>
            <thead>
              <tr>
                <th scope="col">Référence</th>
                <th scope="col">Demandeur</th>
                <th scope="col">Domaine</th>
                <th scope="col">Localisation</th>
                <th scope="col">Reçue le</th>
                <th scope="col">1ʳᵉ réponse</th>
                <th scope="col">Attribuée à</th>
                <th scope="col">Statut</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td className="adm-table__empty" colSpan={8}>
                    Aucune demande ne correspond à ces critères.
                  </td>
                </tr>
              ) : (
                list.map((d) => {
                  const s = getStatus(d.status)
                  return (
                    <tr key={d.id}>
                      <td>
                        <Link className="adm-table__ref" to={`/admin/demandes/${d.id}`}>{d.id}</Link>
                      </td>
                      <td className="adm-table__main">
                        <strong>{d.name}</strong>
                        <span>{d.org}</span>
                        {isPublicBuyer(d) && (
                          <div style={{ marginTop: 4 }}>
                            <span className="tag-public">
                              <Icon name="building" size={11} />
                              Acheteur public
                            </span>
                          </div>
                        )}
                      </td>
                      <td>{d.workType}</td>
                      <td>{d.city}, {d.country}</td>
                      <td>{formatDate(d.createdAt)}</td>
                      <td>{delay(d)}</td>
                      <td>{d.assignee === 'Non attribuée' ? <em style={{ color: 'var(--muted)' }}>Non attribuée</em> : d.assignee}</td>
                      <td>
                        <span className="pill" style={{ background: s.tint }}>
                          <span className="pill__dot" style={{ background: s.step }} />
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="adm-rgpd" style={{ marginTop: 18 }}>
        <strong>
          <Icon name="shield" size={15} />
          Données personnelles
        </strong>
        Les demandes contiennent des données personnelles collectées avec le
        consentement du visiteur. Leur durée de conservation est limitée et
        l'export est réservé aux besoins du suivi des demandes
        (cahier des charges § VII).
      </p>
    </AdminLayout>
  )
}
