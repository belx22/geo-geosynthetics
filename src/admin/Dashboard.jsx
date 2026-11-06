import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import AdminLayout from './AdminLayout.jsx'
import { useDemandes } from '../data/demandesStore.js'
import { useSession } from '../data/sessionStore.js'
import { getStatus, isPublicBuyer } from '../data/demandes.js'
import {
  indicateurs, INDICATEURS_AUDIENCE, distribution, monthly, pipeline, formatDate,
} from './indicateurs.js'

function KpiTile({ item }) {
  return (
    <article className="kpi-tile">
      <p className="kpi-tile__label">
        <Icon name={item.icon} size={15} />
        {item.label}
      </p>
      <p className="kpi-tile__value">
        {item.value}
        {item.unit && <span className="kpi-tile__unit">{item.unit}</span>}
      </p>
      <p className="kpi-tile__foot">
        <span>{item.foot}</span>
        <span className="kpi-tile__target">{item.target}</span>
      </p>
      {item.freq && <p className="kpi-tile__freq">{item.freq}</p>}
    </article>
  )
}

/* Barres de magnitude : une seule série, teinte unique, valeurs étiquetées —
   la couleur n'encode rien que la longueur ne dise déjà. */
function BarChart({ rows, caption }) {
  const max = Math.max(1, ...rows.map((r) => r.value))
  if (rows.length === 0) return <p className="chart__empty">Aucune donnée.</p>
  return (
    <div className="chart" role="img" aria-label={caption}>
      {rows.map((r) => (
        <div className="chart-row" key={r.label}>
          <span className="chart-row__label">{r.label}</span>
          <span className="chart-row__track">
            <span className="chart-row__bar" style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className="chart-row__value">{r.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const demandes = useDemandes()
  const session = useSession()

  /* Le rédacteur n'accède ni aux demandes ni aux indicateurs (§ VII, données
     personnelles) : il est orienté vers les contenus. */
  if (!session.can.indicateurs) {
    return (
      <AdminLayout title="Tableau de bord" subtitle={`Profil ${session.label}`}>
        <div className="adm-denied">
          <Icon name="shield" size={34} />
          <h2>Indicateurs réservés à l'administrateur</h2>
          <p>
            Les demandes d'étude contiennent des données personnelles. Votre
            profil donne accès à la gestion des contenus du site.
          </p>
          <Link className="btn btn--green" to="/admin/contenus">
            Gérer les contenus
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </AdminLayout>
    )
  }

  const kpis = indicateurs(demandes)
  const parDomaine = distribution(demandes, 'workType')
  const parOrganisme = distribution(demandes, 'orgType')
  const parMois = monthly(demandes, 6)
  const file = pipeline(demandes)
  const maxFile = Math.max(1, ...file.map((f) => f.value))
  const recentes = [...demandes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <AdminLayout
      title="Tableau de bord"
      subtitle="Indicateurs de pilotage du site — cahier des charges § III, tableau 2"
      actions={
        <Link className="btn btn--green btn--sm" to="/admin/demandes">
          <Icon name="mail" size={15} />
          Demandes reçues
        </Link>
      }
    >
      {/* ----------------------------------------- Indicateurs sur demandes */}
      <section className="adm-section">
        <div className="adm-section__head">
          <div>
            <h2>Suivi des demandes</h2>
            <p className="adm-section__note">Calculé à partir des demandes reçues par le formulaire.</p>
          </div>
          <span className="src-chip src-chip--data">
            <Icon name="checkCircle" size={11} />
            Source : demandes
          </span>
        </div>
        <div className="kpis-grid">
          {kpis.map((item) => <KpiTile key={item.id} item={item} />)}
        </div>
      </section>

      {/* -------------------------------------------- Indicateurs d'audience */}
      <section className="adm-section">
        <div className="adm-section__head">
          <div>
            <h2>Parcours et performance</h2>
            <p className="adm-section__note">
              Alimenté par la mesure d'audience respectueuse de la vie privée (EF-16),
              à brancher — les valeurs affichées sont des relevés d'exemple.
            </p>
          </div>
          <span className="src-chip src-chip--stats">
            <Icon name="trending" size={11} />
            Source : statistiques
          </span>
        </div>
        <div className="kpis-grid kpis-grid--5">
          {INDICATEURS_AUDIENCE.map((item) => <KpiTile key={item.id} item={item} />)}
        </div>
      </section>

      {/* ------------------------------------------------------ Répartitions */}
      <section className="adm-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="adm-card">
            <div className="adm-card__head">
              <h2>Demandes par domaine d'application</h2>
              <p>Oriente les contenus à renforcer sur le site.</p>
            </div>
            <div className="adm-card__body">
              <BarChart rows={parDomaine} caption="Nombre de demandes par domaine d'application" />
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card__head">
              <h2>Demandes par type d'organisme</h2>
              <p>Mesure le ciblage du visiteur prioritaire.</p>
            </div>
            <div className="adm-card__body">
              <BarChart rows={parOrganisme} caption="Nombre de demandes par type d'organisme" />
            </div>
          </div>
        </div>
      </section>

      <section className="adm-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="adm-card">
            <div className="adm-card__head">
              <h2>Demandes reçues par mois</h2>
              <p>Six derniers mois.</p>
            </div>
            <div className="adm-card__body">
              <BarChart rows={parMois} caption="Nombre de demandes reçues par mois" />
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card__head">
              <h2>File de traitement</h2>
              <p>Avancement des dossiers, de la réception à la clôture.</p>
            </div>
            <div className="adm-card__body">
              <div className="pipeline">
                {file.map((s) => (
                  <div className="pipeline__row" key={s.id}>
                    <span className="pipeline__name">
                      <span className="pipeline__dot" style={{ background: s.step }} />
                      {s.label}
                    </span>
                    <span className="pipeline__track">
                      <span
                        className="pipeline__bar"
                        style={{ width: `${(s.value / maxFile) * 100}%`, background: s.step }}
                      />
                    </span>
                    <span className="pipeline__n">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Dernières demandes */}
      <section className="adm-section">
        <div className="adm-card">
          <div className="adm-card__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Dernières demandes reçues</h2>
              <p>Les cinq demandes les plus récentes.</p>
            </div>
            <Link className="link-arrow" to="/admin/demandes">
              Tout voir
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Référence</th>
                  <th scope="col">Demandeur</th>
                  <th scope="col">Domaine</th>
                  <th scope="col">Reçue le</th>
                  <th scope="col">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentes.map((d) => {
                  const status = getStatus(d.status)
                  return (
                    <tr key={d.id}>
                      <td>
                        <Link className="adm-table__ref" to={`/admin/demandes/${d.id}`}>{d.id}</Link>
                      </td>
                      <td className="adm-table__main">
                        <strong>{d.name}</strong>
                        <span>
                          {d.org}
                          {isPublicBuyer(d) && <> · <span className="tag-public">Acheteur public</span></>}
                        </span>
                      </td>
                      <td>{d.workType}</td>
                      <td>{formatDate(d.createdAt)}</td>
                      <td>
                        <span className="pill" style={{ background: status.tint }}>
                          <span className="pill__dot" style={{ background: status.step }} />
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}
