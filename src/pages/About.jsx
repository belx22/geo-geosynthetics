import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import HueskerLogo from '../components/HueskerLogo.jsx'
import { VISION, MISSION, VALUES, PILLARS, PHASES, TEAM, COMMITMENTS } from '../data/site.js'
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
        title="L'ingénierie innovante au service des infrastructures durables"
        lead={[
          "Geo-Geosynthetics est un bureau d'études et d'ingénierie spécialisé dans les solutions géotechniques innovantes, les géosynthétiques et l'optimisation des infrastructures.",
          "Nous accompagnons les maîtres d'ouvrage publics et privés, les entreprises de construction, les bureaux d'études et les partenaires institutionnels dans la conception et la réalisation de solutions techniques adaptées aux défis des infrastructures modernes.",
        ]}
      />

      {/* --------------------------------------------------------- Vision */}
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
            <p className="eyebrow">Notre vision</p>
            {/* L'énoncé de vision tient lieu de titre : en casse normale, il
                reste lisible malgré sa longueur. */}
            <h2 className="section-title">{VISION.statement}</h2>
            <p>{VISION.text}</p>

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

      {/* -------------------------------------------------------- Mission */}
      <section className="section section--white">
        <div className="container mission">
          <p className="eyebrow">Notre mission</p>
          <h2 className="mission__statement">{MISSION.statement}</h2>
          <p className="mission__text">{MISSION.text}</p>
        </div>
      </section>

      {/* --------------------------------------------------------- Valeurs */}
      <section className="section section--light">
        <div className="container">
          <div className="section-head--center" style={{ marginBottom: 40 }}>
            <p className="eyebrow">Ce qui nous engage</p>
            <h2 className="section-title section-title--caps">Nos valeurs</h2>
          </div>

          <div className="values">
            {VALUES.map((v) => (
              <article className="value" key={v.title}>
                <span className="value__icon">
                  <Icon name={v.icon} size={20} />
                </span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </article>
            ))}
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
          <div className="pillars__grid">
            {PILLARS.map((p) => (
              <article className="pillar" key={p.title}>
                <span className="pillar__no">{p.no}</span>
                <span className="pillar__icon">
                  <Icon name={p.icon} size={22} />
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
              <HueskerLogo size={0.95} />
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
