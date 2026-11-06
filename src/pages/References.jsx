import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import PageHero from '../components/PageHero.jsx'
import { PROJECT_FAMILIES, FEATURED_PROJECT } from '../data/site.js'
import { usePublies, usePage } from '../data/contenuStore.js'

const STATS = [
  { icon: 'checkCircle', value: '250+', label: 'Projets livrés' },
  { icon: 'trending', value: '12', label: "Pays d'intervention" },
  { icon: 'expand', value: '1.2M', label: 'm² de géosynthétiques' },
  { icon: 'checkCircle', value: '98%', label: 'Taux de satisfaction' },
]

const LOGOS = ['Ministère TP', 'Ageroute', 'Vinci Cons.', 'Eiffage Infra', 'SNCF Int.']

export default function References() {
  const PROJECTS = usePublies('projets')
  const page = usePage('references')
  const [family, setFamily] = useState('Tous')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const okFamily = family === 'Tous' || p.family === family
      const okQuery = !q || `${p.title} ${p.location} ${p.excerpt}`.toLowerCase().includes(q)
      return okFamily && okQuery
    })
  }, [PROJECTS, family, query])

  return (
    <>
      <PageHero
        page={page}
        seed="ggs-refs-hero"
        crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Références' }]}
        eyebrow="Nos réalisations"
        title="Des ouvrages conçus pour durer"
        lead="Explorez nos projets d'ingénierie les plus emblématiques à travers le continent."
      />

      {/* ------------------------------------------------------ Indicateurs */}
      <section className="hero-stats">
        <div className="container hero-stats__grid">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="hero-stat__value">
                <Icon name={s.icon} size={20} />
                {s.value}
              </p>
              <p className="hero-stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Filtres */}
      <div className="section--light">
        <div className="container filters">
          <span className="filters__label">
            <Icon name="filter" size={15} />
            Filtrer :
          </span>
          <div className="filters__chips">
            {PROJECT_FAMILIES.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip${family === f ? ' is-active' : ''}`}
                onClick={() => setFamily(f)}
                aria-pressed={family === f}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="search">
            <Icon name="search" size={15} />
            <label htmlFor="ref-search" style={{ position: 'absolute', left: '-9999px' }}>
              Rechercher par projet ou ville
            </label>
            <input
              id="ref-search"
              type="search"
              placeholder="Rechercher par projet ou ville…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------- Projet signature */}
      <section className="section section--light">
        <div className="container">
          <p className="eyebrow">À la une</p>
          <h2 className="section-title section-title--caps">Projet signature</h2>

          <div className="feature-project">
            <div className="feature-project__media">
              <span className="badge feature-project__badge">Projet phare</span>
              <Photo seed={FEATURED_PROJECT.seed} alt={FEATURED_PROJECT.title} />
            </div>
            <div className="feature-project__body">
              <p className="feature-project__loc">
                <Icon name="pin" size={14} />
                {FEATURED_PROJECT.location}
              </p>
              <h3>{FEATURED_PROJECT.title}</h3>
              <p>{FEATURED_PROJECT.text}</p>

              <div className="feature-project__kpis">
                {FEATURED_PROJECT.kpis.map((k) => (
                  <div className="kpi" key={k.label}>
                    <span>{k.label}</span>
                    <strong>{k.value}</strong>
                  </div>
                ))}
              </div>

              <Link className="btn btn--green" to="/references/protection-cotiere-de-saint-louis">
                Consulter le dossier technique
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Projets récents */}
      <section className="portfolio on-dark">
        <div className="portfolio__bg">
          <Photo seed="ggs-portfolio-bg" />
        </div>
        <div className="container portfolio__inner">
          <p className="eyebrow">Portfolio</p>
          <h2 className="section-title section-title--caps">Projets récents</h2>
          <p className="section-lead">Une sélection rigoureuse de nos interventions techniques.</p>

          <p className="portfolio__count">
            Affichage <strong>{list.length} projet{list.length > 1 ? 's' : ''}</strong>
          </p>

          {list.length === 0 ? (
            <p>Aucun projet ne correspond à votre recherche.</p>
          ) : (
            <div className="portfolio__grid">
              {list.map((p) => (
                <article className="project-card" key={p.slug}>
                  <div className="project-card__media">
                    <span className="badge badge--white badge--plain project-card__tag">{p.family}</span>
                    <Photo seed={p.seed} src={p.image} zoom alt={p.title} />
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span>
                        <Icon name="pin" size={13} />
                        {p.location}
                      </span>
                      <span className="project-card__date">
                        <Icon name="calendar" size={13} />
                        {p.year}
                      </span>
                    </div>
                    <h3 className="project-card__title">{p.title}</h3>
                    <p className="project-card__desc">{p.excerpt}</p>
                    <div className="project-card__foot">
                      <Link className="link-arrow" to={`/references/${p.slug}`}>
                        Voir le projet
                        <Icon name="arrowRight" size={14} />
                      </Link>
                      <span className="project-card__pill">
                        <Icon name="arrowUpRight" size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------ Partenariats */}
      <section className="section section--light">
        <div className="container partners">
          <p className="eyebrow">Partenariats</p>
          <h2 className="section-title section-title--caps">Ils nous font confiance</h2>

          <div className="partners__quote">
            <div>
              <span className="badge">Alliance stratégique</span>
              <blockquote>« Une synergie technique mondiale pour des solutions locales. »</blockquote>
              <p>
                Geo-Geosynthetics collabore étroitement avec les leaders mondiaux pour
                garantir la conformité Eurocodes de chaque ouvrage.
              </p>
            </div>
            <div className="partners__card">
              <Icon name="layers" size={34} />
              <span>Partenaire technologique</span>
            </div>
          </div>

          <div className="partners__logos">
            {LOGOS.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Appel à l'action */}
      <section className="cta-split">
        <div className="cta-split__text">
          <span className="badge badge--white" style={{ marginBottom: 18 }}>Contactez nos experts</span>
          <h2 className="cta-band__title" style={{ textTransform: 'uppercase', fontWeight: 700 }}>
            Un défi technique pour votre futur ouvrage ?
          </h2>
          <p className="cta-band__text">
            Bénéficiez d'une note de calcul personnalisée et d'une expertise terrain
            pour optimiser vos coûts et sécuriser vos infrastructures.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
            <Link className="btn btn--dark" to="/demander-une-etude">
              Demander une étude
              <Icon name="arrowRight" size={16} />
            </Link>
            <Link className="btn btn--ghost-light" to="/demander-une-etude">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
        <div className="cta-split__media">
          <Photo seed="ggs-refs-cta" alt="Ingénieure sur un chantier" />
        </div>
      </section>
    </>
  )
}
