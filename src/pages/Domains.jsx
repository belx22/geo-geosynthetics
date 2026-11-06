import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import PageHero from '../components/PageHero.jsx'
import { DOMAIN_FAMILIES } from '../data/site.js'
import { usePublies, usePage } from '../data/contenuStore.js'

const CRITERIA = [
  { icon: 'mountain', title: 'Nature du sol', text: 'Analyse granulométrique, portance et caractéristiques physico-chimiques.' },
  { icon: 'helmet', title: 'Charges et usages', text: "Évaluation des contraintes statiques et dynamiques liées à l'exploitation." },
  { icon: 'expand', title: 'Contraintes du site', text: 'Topographie, hydrologie et accès logistiques propres au chantier.' },
]

/* Mosaïque de la maquette : 1 carte large, 1 carte haute, puis 6 cartes. */
const SHAPE = ['domain-card--wide', 'domain-card--tall', '', '', '', '', '', '']

export default function Domains() {
  const DOMAINS = usePublies('domaines')
  const page = usePage('domaines')
  const [family, setFamily] = useState('Tous')
  const [query, setQuery] = useState('')

  /* EF-11 / EF-12 : filtre par domaine et recherche simple. */
  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DOMAINS.filter((d) => {
      const okFamily = family === 'Tous' || d.family === family
      const okQuery = !q || `${d.title} ${d.excerpt} ${d.family}`.toLowerCase().includes(q)
      return okFamily && okQuery
    })
  }, [DOMAINS, family, query])

  const isDefault = family === 'Tous' && !query.trim()

  return (
    <>
      <PageHero
        page={page}
        seed="ggs-domains-hero"
        crumbs={[{ label: 'Accueil', to: '/' }, { label: "Domaines d'application" }]}
        eyebrow="Nos expertises"
        title="Des solutions pour chaque type d'ouvrage"
        lead="Découvrez comment les géosynthétiques répondent aux contraintes de vos projets d'infrastructure."
      />

      {/* ---------------------------------------------------------- Filtres */}
      <div className="section--light">
        <div className="container filters">
          <span className="filters__label">
            <Icon name="filter" size={15} />
            Filtrer par :
          </span>
          <div className="filters__chips">
            {DOMAIN_FAMILIES.map((f) => (
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
            <label htmlFor="domain-search" style={{ position: 'absolute', left: '-9999px' }}>
              Rechercher un domaine
            </label>
            <input
              id="domain-search"
              type="search"
              placeholder="Rechercher un domaine"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- Cartes */}
      <section className="section section--light">
        <div className="container">
          {list.length === 0 ? (
            <p style={{ padding: '40px 0' }}>
              Aucun domaine ne correspond à votre recherche. Décrivez-nous votre
              situation : <Link className="link-arrow" to="/demander-une-etude">demander une étude</Link>
            </p>
          ) : (
            <div className="domains-grid">
              {list.map((d, i) => {
                const shape = isDefault ? SHAPE[i] || '' : ''
                return (
                  <article className={`domain-card ${shape}`} key={d.slug}>
                    <div className="domain-card__media">
                      <span className="badge badge--plain domain-card__tag">{d.family}</span>
                      <Photo seed={d.seed} src={d.image} zoom alt={d.title} />
                    </div>
                    <div className="domain-card__body">
                      <h2 className="domain-card__title">{d.title}</h2>
                      <p className="domain-card__desc">{d.excerpt}</p>
                      <div className="domain-card__foot">
                        <Link className="link-arrow" to={`/domaines/${d.slug}`}>
                          En savoir plus
                          <Icon name="arrowRight" size={14} />
                        </Link>
                        <span className="domain-card__icon">
                          <Icon name={d.icon} size={15} />
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------- Comment identifier la solution */}
      <section className="section section--grey">
        <div className="container identify">
          <div>
            <p className="eyebrow">Méthodologie d'étude</p>
            <h2 className="section-title section-title--caps">Comment identifier la bonne solution ?</h2>
            <p className="section-lead">
              Chaque solution dépend de trois paramètres que nos ingénieurs analysent
              rigoureusement pour garantir la pérennité de vos projets.
            </p>

            <div className="express">
              <span className="express__icon">
                <Icon name="bolt" size={18} />
              </span>
              <div>
                <h4>Étude express</h4>
                <p>Réponse sous 48h pour vos avant-projets.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="identify__criteria">
              {CRITERIA.map((c) => (
                <article className="criterion" key={c.title}>
                  <span className="criterion__icon">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>

            <div className="engagement">
              <div className="engagement__media">
                <Photo seed="ggs-engagement" alt="Poste de calcul d'un ingénieur d'études" />
              </div>
              <div className="engagement__card">
                <p className="eyebrow">Notre engagement</p>
                <p>« Une note de calcul certifiée pour chaque dimensionnement. »</p>
                <Link className="btn btn--outline btn--sm" to="/references">
                  Voir un exemple de dossier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Appel à l'action */}
      <section className="cta-split">
        <div className="cta-split__text">
          <h2 className="cta-band__title">Votre ouvrage ne figure pas dans la liste ?</h2>
          <p className="cta-band__text">
            Nos ingénieurs étudient votre situation spécifique et conçoivent une
            solution sur mesure adaptée à vos contraintes techniques et budgétaires.
          </p>
          <Link className="btn btn--dark" to="/demander-une-etude" style={{ marginTop: 28 }}>
            Demander une étude
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className="cta-split__media">
          <Photo seed="ggs-cta-split" alt="Technicienne de chantier" />
        </div>
      </section>

      {/* ---------------------------------------------------- Certifications */}
      <div className="container" id="certifications">
        <div className="certs">
          <span className="certs__item">
            <Icon name="shield" size={22} />
            Certifié Eurocodes
          </span>
          <span className="certs__item">
            <Icon name="award" size={22} />
            Alliance stratégique
          </span>
          <span className="certs__item">
            <Icon name="layers" size={22} />
            ISO 9001 / 14001
          </span>
        </div>
      </div>
    </>
  )
}
