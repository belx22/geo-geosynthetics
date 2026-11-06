import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { PILLARS, PHASES, TEAM, COMMITMENTS } from '../data/site.js'
import { usePage } from '../data/contenuStore.js'

export default function About() {
  const page = usePage('apropos')

  return (
    <>
      <PageHero
        page={page}
        seed="ggs-about-hero"
        crumbs={[{ label: 'Accueil', to: '/' }, { label: 'À propos' }]}
        eyebrow="Qui sommes-nous"
        title="L'ingénierie des sols au service de vos ouvrages"
        lead="Geo-Geosynthetics est un bureau d'études spécialisé dans le dimensionnement technique et l'optimisation des structures terrestres."
      />

      {/* ------------------------------------------------------- Héritage */}
      <section className="section section--light">
        <div className="container about-intro">
          <div className="about-intro__media">
            <Photo className="about-intro__photo-a" seed="ggs-about-a" alt="Ingénieure de Geo-Geosynthetics" />
            <Photo className="about-intro__photo-b" seed="ggs-about-b" alt="Technicien sur chantier" />
            <div className="about-intro__chip">
              <span>Notre triptyque</span>
              <strong>
                Études
                <br />
                Innovations
                <br />
                Ingénieries
              </strong>
            </div>
          </div>

          <div>
            <p className="eyebrow">Notre héritage</p>
            <h2 className="section-title section-title--caps">
              Une vision panafricaine de l'expertise géotechnique
            </h2>
            <p>
              Fondée sur une volonté d'apporter une rigueur scientifique aux projets
              d'infrastructure majeurs, Geo-Geosynthetics s'est imposée comme un
              partenaire incontournable pour les acteurs publics et privés. Notre
              mission est de transformer la complexité des sols en fondations solides
              pour le développement durable.
            </p>
            <p>
              Nous combinons une connaissance approfondie des terrains locaux avec
              l'accès aux technologies mondiales les plus avancées, notamment à
              travers nos alliances stratégiques industrielles.
            </p>

            <div className="stats-inline">
              <div className="stat-inline">
                <strong>150+</strong>
                <span>Projets réalisés</span>
              </div>
              <div className="stat-inline stat-inline--blue">
                <strong>15 ans</strong>
                <span>D'expérience cumulée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Piliers */}
      <section className="pillars on-dark">
        <div className="pillars__bg">
          <Photo seed="ggs-pillars-bg" />
        </div>
        <div className="container pillars__inner">
          <div className="section-head--center" style={{ marginBottom: 44 }}>
            <p className="eyebrow">Ce qui nous guide</p>
            <h2 className="section-title section-title--caps">Nos piliers fondamentaux</h2>
          </div>
          <div className="grid grid-3">
            {PILLARS.map((p, i) => (
              <article className="pillar" key={p.title}>
                <span className={`pillar__icon${i === 2 ? ' pillar__icon--blue' : ''}`}>
                  <Icon name={p.icon} size={26} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Processus */}
      <section className="section section--light">
        <div className="container">
          <p className="eyebrow">Méthodologie</p>
          <h2 className="section-title section-title--caps">Notre processus d'accompagnement</h2>
          <p className="section-lead" style={{ textAlign: 'center', marginTop: 10 }}>
            Une approche structurée de la phase d'étude jusqu'à la livraison finale de l'ouvrage.
          </p>

          <div className="phases">
            {PHASES.map((p) => (
              <article className="phase" key={p.no}>
                <span className="phase__icon">
                  <Icon name={p.icon} size={22} />
                </span>
                <p className="phase__no">{p.no}</p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Équipe */}
      <section className="team on-dark">
        <div className="team__bg">
          <Photo seed="ggs-team-bg" />
        </div>
        <div className="container team__inner">
          <div className="section-head--center">
            <p className="eyebrow">Expertise humaine</p>
            <h2 className="section-title section-title--caps">Rencontrez notre équipe</h2>
          </div>
          <div className="team__grid">
            {TEAM.map((m) => (
              <article className="member" key={m.name}>
                <Photo seed={m.seed} alt={m.name} />
                <div className="member__body">
                  <h3>{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                  <p>{m.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Alliance */}
      <section className="alliance">
        <div className="container alliance__inner">
          <div>
            <span className="badge">Alliance stratégique</span>
            <h2 className="alliance__title">Geo-Geosynthetics &amp; Huesker : l'excellence partagée</h2>
            <p>
              En tant que partenaire technologique privilégié d'HUESKER, leader
              mondial des solutions géosynthétiques, nous intégrons des produits de
              haute performance certifiés pour garantir la sécurité et la durabilité
              de vos ouvrages les plus complexes.
            </p>
            <a className="btn btn--green" href="#partenaire" style={{ marginTop: 28 }}>
              En savoir plus sur Huesker
            </a>
          </div>
          <div className="alliance__frame">
            <div>
              <span>#</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Engagements */}
      <section className="section section--light">
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">Notre promesse</p>
            <h2 className="section-title section-title--caps">Nos engagements qualité</h2>
          </div>
          <div className="commitments">
            {COMMITMENTS.map((c) => (
              <div className="commitment" key={c.title}>
                <span className="commitment__icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3>{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
