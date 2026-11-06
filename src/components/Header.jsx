import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { SITE } from '../data/site.js'

/* Navigation limitée à cinq rubriques — cahier des charges § III. */
const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/a-propos', label: 'À propos' },
  { to: '/domaines-d-application', label: "Domaines d'application" },
  { to: '/references', label: 'Références' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <div className="container header__inner">
        <Link to="/" aria-label="Geo-Geosynthetics, retour à l'accueil">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Navigation principale">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__aside">
          <a className="header__phone" href={`tel:${SITE.phoneHref}`}>
            <Icon name="phone" size={15} />
            {SITE.phone}
          </a>
          {/* EF-06 : « Décrire mon projet » accessible depuis toutes les pages */}
          <Link className="header__cta" to="/demander-une-etude">
            <Icon name="mail" size={14} />
            Contact
          </Link>
        </div>

        <button
          className="header__burger"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>
    </header>
  )
}
