import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { usePublies, usePage } from '../data/contenuStore.js'
import { resolveImage } from '../data/images.js'

const HERO_FEATURES = [
  { icon: 'sparkle', tone: 'green', title: 'Analyse rigoureuse', text: 'Dimensionnement précis selon les normes Eurocodes.' },
  { icon: 'shield', tone: 'green', title: 'Expertise terrain', text: 'Accompagnement de la conception à la mise en œuvre.' },
  { icon: 'users', tone: 'blue', title: 'Proximité client', text: 'Un interlocuteur unique pour vos projets complexes.' },
]

const METHOD = [
  { title: 'Diagnostic géotechnique', text: "Analyse approfondie des rapports de sol et identification des contraintes spécifiques à l'ouvrage." },
  { title: 'Dimensionnement technique', text: 'Calculs de stabilité et choix des géosynthétiques optimaux pour maximiser la sécurité et réduire les coûts.' },
  { title: 'Validation et suivi', text: "Fourniture des notes de calcul détaillées et assistance technique lors de la phase d'installation." },
]

/* La mosaïque reprend les six premiers domaines publiés : dépublier un
   domaine en administration retire aussitôt sa tuile de l'accueil. */
const FORMES = ['a', 'b', 'c', 'd', 'e', 'f']

const STRENGTHS = [
  { title: 'Indépendance technique', text: 'Des solutions objectives orientées uniquement vers la performance.' },
  { title: 'Expertise réactive', text: 'Études remises dans les meilleurs délais pour vos projets.' },
  { title: 'Normes & certifications', text: 'Respect strict des référentiels techniques nationaux et internationaux.' },
  { title: 'Optimisation de coûts', text: 'Réduction drastique des volumes de terrassement et de matériaux.' },
]

const PER_PAGE = 3

export default function Home() {
  /* Le carrousel de la maquette feuillette les références 3 par 3. */
  const PROJECTS = usePublies('projets')
  const DOMAINES = usePublies('domaines')
  const accueil = usePage('accueil')
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(PROJECTS.length / PER_PAGE))
  const visible = PROJECTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const turn = (dir) => setPage((p) => (p + dir + pages) % pages)

  return (
    <>
      {/* ---------------------------------------------------------- Héros */}
      <section className="hero">
        <div className="hero__bg">
          <Photo seed="ggs-hero-home" src={accueil?.heroImage} eager alt="Chantier de terrassement routier en Afrique" />
        </div>
        <div className="container hero__inner">
          <p className="hero__partner">Partenaire Huesker</p>
          {/* EF-01 : le message « l'étude d'abord » est visible sans défilement. */}
          <h1 className="hero__title">
            {accueil?.heroTitle || 'Des solutions géosynthétiques étudiées pour chaque ouvrage'}
          </h1>
          <p className="hero__lead">
            Bureau d'études spécialisé dans l'ingénierie des sols, Geo-Geosynthetics
            analyse vos contraintes techniques pour proposer les solutions de
            renforcement les plus performantes.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--green" to="/domaines-d-application">
              Découvrir nos solutions
            </Link>
            <Link className="btn btn--ghost-light" to="/references">
              Consulter nos références
            </Link>
          </div>

          <div className="hero__card">
            {HERO_FEATURES.map((f) => (
              <div className="hero-feature" key={f.title}>
                <span className={`hero-feature__icon${f.tone === 'blue' ? ' hero-feature__icon--blue' : ''}`}>
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Méthodologie */}
      <section className="section section--light">
        <div className="container">
          <p className="eyebrow">Notre méthodologie</p>
          <h2 className="section-title">Une approche structurée pour la réussite de vos chantiers</h2>
          <p className="section-lead">
            Nous transformons les défis géotechniques en solutions durables grâce à
            un processus d'ingénierie éprouvé.
          </p>

          <div className="method">
            <div className="method__stack">
              {METHOD.map((m, i) => (
                <article className={`method-card method-card--${i + 1}`} key={m.title}>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </article>
              ))}
            </div>
            <div className="method__media">
              <Photo seed="ggs-ingenieur-terrain" alt="Ingénieur relevant des mesures sur le terrain" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Domaines d'application */}
      <section className="section topo on-dark">
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">Expertise sectorielle</p>
            <h2 className="section-title">Domaines d'application</h2>
            <p className="section-lead">
              Découvrez nos interventions spécialisées sur les projets
              d'infrastructure les plus exigeants.
            </p>
          </div>

          <div className="mosaic">
            {DOMAINES.slice(0, 6).map((d, i) => (
              <Link key={d.slug} to={`/domaines/${d.slug}`} className={`mosaic__tile mosaic__tile--${FORMES[i]}`}>
                <img
                  src={d.image || resolveImage(d.seed)}
                  alt={d.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                />
                <span className="mosaic__label">{d.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Pourquoi nous */}
      <section className="section section--light">
        <div className="container why">
          <div className="why__media">
            <Photo seed="ggs-why" alt="Technicienne sur un site de chantier" />
            <div className="why__float">
              <h4>Ingénierie de proximité</h4>
              <p>
                Nous nous déplaçons sur vos sites pour une compréhension parfaite
                des réalités du terrain.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Nos atouts</p>
            <h2 className="section-title">Pourquoi choisir Geo-Geosynthetics ?</h2>

            <div className="why__grid">
              {STRENGTHS.map((s) => (
                <div className="why-item" key={s.title}>
                  <h3 className="why-item__title">
                    <Icon name="checkCircle" size={17} />
                    {s.title}
                  </h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>

            <blockquote className="quote-block">
              « Notre mission est de sécuriser vos infrastructures tout en réduisant
              leur empreinte environnementale grâce aux technologies géosynthétiques
              de pointe. »
            </blockquote>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Partenaire */}
      <section className="partner">
        <div className="container partner__inner">
          <div>
            <span className="badge">Alliance stratégique</span>
            <h2 className="partner__title">Une expertise portée par l'excellence Huesker</h2>
            <p>
              En tant que partenaire privilégié, nous intégrons les solutions du
              leader mondial des géosynthétiques pour garantir la durabilité
              exceptionnelle de vos ouvrages.
            </p>
            <div className="partner__actions">
              <a className="btn btn--green" href="#documentation">
                <Icon name="download" size={16} />
                Documentation technique
              </a>
              <Link className="btn btn--ghost-light" to="/domaines-d-application">
                Découvrir la gamme
              </Link>
            </div>
          </div>
          <div className="partner__media">
            <Photo seed="ggs-geogrille-stack" alt="Nappes de géogrilles empilées" />
            <div className="partner__logo">
              <span>Logo partenaire</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Références */}
      <section className="section section--light">
        <div className="container">
          <div className="projects-head">
            <div>
              <p className="eyebrow">Réalisations</p>
              <h2 className="section-title">Nos références marquantes</h2>
              <p className="section-lead">
                Découvrez une sélection de projets d'ingénierie où Geo-Geosynthetics
                a apporté son expertise.
              </p>
            </div>
            <div className="carousel-nav">
              <button type="button" onClick={() => turn(-1)} aria-label="Projets précédents">
                <Icon name="chevronLeft" size={14} />
              </button>
              <button type="button" onClick={() => turn(1)} aria-label="Projets suivants">
                <Icon name="chevronRight" size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-3">
            {visible.map((p) => (
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
                  </div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__desc">{p.excerpt}</p>
                  <div className="project-card__foot">
                    <Link className="link-arrow" to={`/references/${p.slug}`}>
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

      <CtaBand />
    </>
  )
}
