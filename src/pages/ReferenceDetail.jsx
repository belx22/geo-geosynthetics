import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import { Breadcrumb } from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { PROJECT_DETAIL } from '../data/site.js'
import { usePublies } from '../data/contenuStore.js'

export default function ReferenceDetail() {
  const { slug } = useParams()
  const project = usePublies('projets').find((p) => p.slug === slug)

  /* Toutes les fiches suivent le modèle unique de l'écran 6 de la maquette ;
     les métadonnées propres au projet sont surchargées lorsqu'elles existent. */
  const d = PROJECT_DETAIL
  const title = project?.title ?? d.title
  const family = project?.family ?? d.family
  const location = project?.location ?? d.location
  const seed = project?.seed ?? d.seed
  const image = project?.image
  const meta = project
    ? d.meta.map((m) =>
        m.label === 'Domaine'
          ? { ...m, value: project.family }
          : m.label === 'Année'
          ? { ...m, value: project.year }
          : m
      )
    : d.meta

  return (
    <>
      {/* ------------------------------------------------------------ Héros */}
      <section className="page-hero page-hero--tall">
        <div className="page-hero__bg">
          <Photo seed={seed} src={image} eager />
        </div>
        <div className="container page-hero__inner">
          <Breadcrumb
            items={[
              { label: 'Accueil', to: '/' },
              { label: 'Références', to: '/references' },
              { label: title },
            ]}
          />
          <span className="badge" style={{ marginBottom: 16 }}>{family}</span>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__lead" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Icon name="pin" size={17} />
            {location}
          </p>

          <div className="hero-meta">
            {meta.map((m) => (
              <div className="hero-meta__item" key={m.label}>
                <p className="hero-meta__label">
                  <Icon name={m.icon} size={13} />
                  {m.label}
                </p>
                <p className="hero-meta__value">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Histoire + encart étude */}
      <section className="section section--light">
        <div className="container story">
          <div>
            <p className="eyebrow">L'histoire du projet</p>
            <h2 className="section-title section-title--caps">{d.storyTitle}</h2>

            <div className="timeline">
              {d.steps.map((s, i) => (
                <article className="tl-item" key={s.title}>
                  <span className="tl-item__no">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* --------------------------------------------------- Résultats */}
            <div className="results">
              <p className="eyebrow">Résultats obtenus</p>
              <h3>Performance et durabilité</h3>
              <span className="results__check">
                <Icon name="check" size={24} />
              </span>
              <div className="kpis">
                {d.results.map((r) => (
                  <div className="kpi" key={r.label}>
                    <strong>{r.value}</strong>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------------------------------------------- Galerie */}
            <div style={{ marginTop: 56 }}>
              <div className="projects-head" style={{ marginBottom: 0 }}>
                <div>
                  <p className="eyebrow">Album du projet</p>
                  <h2 className="section-title section-title--caps" style={{ marginBottom: 0 }}>
                    Immersion sur site
                  </h2>
                </div>
                <Link className="link-arrow link-arrow--green" to="/references">
                  Voir la galerie
                  <Icon name="arrowRight" size={14} />
                </Link>
              </div>

              <div className="gallery">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Photo key={n} seed={`${seed}-g${n}`} zoom alt={`Vue de chantier ${n}`} />
                ))}
              </div>

              <p className="eyebrow eyebrow--muted" style={{ marginTop: 34, color: 'var(--ardoise-700)' }}>
                Avant / après l'intervention
              </p>
              <div className="beforeafter">
                <span className="badge badge--dark beforeafter__tag beforeafter__tag--before">Avant</span>
                <span className="badge beforeafter__tag beforeafter__tag--after">Après</span>
                <span className="beforeafter__handle">
                  <Icon name="chevronRight" size={13} />
                </span>
                <Photo seed={`${seed}-before`} alt="Site avant intervention" />
                <Photo seed={`${seed}-after`} alt="Site après intervention" />
              </div>
            </div>

            {/* ------------------------------------------------- Témoignage */}
            <div className="testimonial">
              <span className="testimonial__mark" aria-hidden="true">
                <Icon name="quote" size={48} />
              </span>
              <div>
                <blockquote>« {d.testimonial.quote} »</blockquote>
                <div className="testimonial__author">
                  <span className="testimonial__avatar" aria-hidden="true" />
                  <div>
                    <strong>{d.testimonial.author}</strong>
                    <span>{d.testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------- Colonne droite */}
          <aside>
            <div className="aside-card advice">
              <span className="badge badge--soft">Conseil d'expert</span>
              <h3>Un projet similaire ?</h3>
              <p>
                Vous travaillez sur un aménagement en zone complexe ? Nos ingénieurs
                peuvent vous accompagner dès la phase d'avant-projet pour optimiser
                vos solutions.
              </p>
              <Link className="btn btn--green btn--block" to="/demander-une-etude">
                Demander une étude
                <Icon name="arrowRight" size={16} />
              </Link>
              <div className="advice__perks">
                <div className="advice__perk">
                  <Icon name="checkCircle" size={22} />
                  <div>
                    <strong>Note de calcul certifiée</strong>
                    <span>Sous 48 heures</span>
                  </div>
                </div>
                <div className="advice__perk">
                  <Icon name="expand" size={22} />
                  <div>
                    <strong>Visite site incluse</strong>
                    <span>Partout en Afrique</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="products">
              <h4>Solutions mises en œuvre</h4>
              <ul>
                {d.products.map((p) => (
                  <li key={p.name}>
                    <strong>{p.name}</strong>
                    <span>{p.detail}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,.55)' }}>
                Désignations génériques. Valeurs indicatives : toute solution retenue
                résulte d'une étude spécifique.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------ Autres réalisations */}
      <section className="others on-dark">
        <div className="others__bg">
          <Photo seed="ggs-others-bg" />
        </div>
        <div className="container others__inner">
          <div className="projects-head">
            <div>
              <p className="eyebrow">Explorer</p>
              <h2 className="section-title section-title--caps">Autres réalisations</h2>
              <p className="section-lead">
                Découvrez comment nous répondons aux défis d'infrastructure à travers
                d'autres projets marquants.
              </p>
            </div>
            <Link className="link-arrow link-arrow--light" to="/references">
              Toutes les références
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="grid grid-3">
            {d.others.map((o) => (
              <article className="project-card" key={o.title}>
                <Photo seed={o.seed} zoom alt={o.title} />
                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>
                      <Icon name="pin" size={13} />
                      {o.location}
                    </span>
                  </div>
                  <h3 className="project-card__title">{o.title}</h3>
                  <div className="project-card__foot" style={{ borderTop: 0, paddingTop: 0 }}>
                    <Link className="link-arrow" to={`/references/${o.slug}`}>
                      Voir le projet
                      <Icon name="arrowRight" size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        caps
        center
        title="Vous avez un projet similaire ?"
        text="Nos ingénieurs sont prêts à analyser vos rapports géotechniques pour concevoir une solution de renforcement sur mesure."
        secondary={{ to: '/domaines-d-application', label: 'Consulter nos domaines' }}
      />
    </>
  )
}
