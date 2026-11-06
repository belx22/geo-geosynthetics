import { NavLink, Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Logo from '../components/Logo.jsx'
import { useSession, signOut } from '../data/sessionStore.js'
import { useDemandes } from '../data/demandesStore.js'

const initials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

export default function AdminLayout({ title, subtitle, actions, children }) {
  const session = useSession()
  const demandes = useDemandes()
  const nouvelles = demandes.filter((d) => d.status === 'nouvelle').length

  return (
    <div className="admin">
      <aside className="adm-side">
        <div className="adm-side__head">
          <Logo light />
          <span className="adm-side__tag">Espace d'administration</span>
        </div>

        <nav className="adm-nav" aria-label="Navigation de l'administration">
          <p className="adm-nav__group">Pilotage</p>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            <Icon name="trending" size={17} />
            Tableau de bord
          </NavLink>

          {session.can.demandes && (
            <>
              <p className="adm-nav__group">Demandes d'étude</p>
              <NavLink to="/admin/demandes" className={({ isActive }) => (isActive ? 'is-active' : '')}>
                <Icon name="mail" size={17} />
                Demandes reçues
                {nouvelles > 0 && <span className="adm-nav__count">{nouvelles}</span>}
              </NavLink>
            </>
          )}

          <p className="adm-nav__group">Contenus</p>
          <NavLink to="/admin/contenus" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            <Icon name="file" size={17} />
            Pages, fiches et documents
          </NavLink>
          <Link to="/" target="_blank" rel="noreferrer">
            <Icon name="globe" size={17} />
            Voir le site public
          </Link>
        </nav>

        <div className="adm-side__foot">
          <div className="adm-user">
            <span className="adm-user__badge">{initials(session.name)}</span>
            <div>
              <strong>{session.name}</strong>
              <span>{session.label}</span>
            </div>
          </div>
          <button type="button" onClick={signOut}>
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-top">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="adm-top__actions">{actions}</div>}
        </header>
        <div className="adm-body">{children}</div>
      </div>
    </div>
  )
}
