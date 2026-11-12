import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Photo from './Photo.jsx'

export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane">
      {items.map((item, i) => (
        <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
          {i > 0 && <Icon name="chevronRight" size={11} />}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span className="breadcrumb__current">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

/**
 * Bandeau d'une page intérieure.
 *
 * `page` est l'enregistrement de la page dans l'entrepôt de contenus : ses
 * paramètres (surtitre, titre affiché, accroche, image) priment sur les
 * valeurs passées en propriété, afin que l'administration pilote réellement
 * l'affichage (EF-14).
 */
export default function PageHero({
  eyebrow, title, lead, badge, crumbs, seed, image, page, tall = false, children,
}) {
  const surtitre = page?.heroEyebrow || eyebrow
  const titre = page?.heroTitle || title
  const visuel = page?.heroImage || image

  /* L'accroche peut tenir en plusieurs paragraphes. Saisie en administration,
     elle les sépare par une ligne vide ; dans le code, par un tableau. */
  const source = page?.heroLead || lead
  const paragraphes = Array.isArray(source)
    ? source
    : String(source ?? '').split(/\n\s*\n/).filter(Boolean)

  return (
    <section className={`page-hero${tall ? ' page-hero--tall' : ''}`}>
      <div className="page-hero__bg">
        <Photo seed={seed} src={visuel} eager />
      </div>
      <div className="container page-hero__inner">
        {crumbs && <Breadcrumb items={crumbs} />}
        {badge && <span className="badge" style={{ marginBottom: 16 }}>{badge}</span>}
        {surtitre && <p className="eyebrow">{surtitre}</p>}
        <h1 className="page-hero__title">{titre}</h1>
        {paragraphes.map((texte) => (
          <p className="page-hero__lead" key={texte.slice(0, 40)}>{texte}</p>
        ))}
        {children}
      </div>
    </section>
  )
}
