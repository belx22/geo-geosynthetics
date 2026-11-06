import { Link, Navigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { SITE } from '../data/site.js'
import { usePublies } from '../data/contenuStore.js'

export default function DomainDetail() {
  const { slug } = useParams()
  const DOMAINS = usePublies('domaines')
  const domain = DOMAINS.find((d) => d.slug === slug)

  if (!domain) return <Navigate to="/domaines-d-application" replace />

  const others = DOMAINS.filter((d) => d.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        seed={domain.seed}
        image={domain.image}
        badge={domain.family}
        title={domain.title}
        lead={domain.heroLead}
        crumbs={[
          { label: 'Accueil', to: '/' },
          { label: "Domaines d'application", to: '/domaines-d-application' },
          { label: domain.title },
        ]}
      />

      {/* -------------------------------------------- Enjeux + encart étude */}
      <section className="section section--light">
        <div className="container domain-detail">
          <div>
            <p className="eyebrow">Défis techniques</p>
            <h2 className="section-title section-title--caps">Les enjeux</h2>
            <p className="section-lead" style={{ maxWidth: 640 }}>{domain.intro}</p>

            <div className="issues">
              {domain.issues.map((issue) => (
                <article className="issue" key={issue.title}>
                  <span className="issue__icon">
                    <Icon name={issue.icon} size={20} />
                  </span>
                  <h3>{issue.title}</h3>
                  <p>{issue.text}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 62 }}>
              <p className="eyebrow">Expertise géosynthétique</p>
              <h2 className="section-title section-title--caps">Nos solutions</h2>
              <p className="section-lead" style={{ maxWidth: 640 }}>{domain.solutionsIntro}</p>

              <div className="solutions">
                {domain.solutions.map((s, i) => (
                  <article className="solution" key={s.title}>
                    <div className="solution__body">
                      <div className="solution__head">
                        <span className="solution__no">Solution {i + 1}</span>
                        <h3>{s.title}</h3>
                      </div>
                      <p>{s.text}</p>
                      <div className="solution__perks">
                        {s.perks.map((perk) => (
                          <span key={perk}>
                            <Icon name="checkCircle" size={14} />
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="solution__media">
                      <Photo seed={s.seed} src={s.image} alt={s.title} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Encart étude — obligatoire sur chaque fiche (cahier des charges § IV) */}
          <aside className="aside-card">
            <h3>Chaque ouvrage est unique</h3>
            <p>
              Nos ingénieurs analysent votre site avant toute proposition pour
              garantir un dimensionnement technique précis et économique.
            </p>
            <Link className="btn btn--green btn--block" to="/demander-une-etude">
              Demander une étude
              <Icon name="arrowRight" size={16} />
            </Link>
            <div className="aside-card__links">
              <a href="#documentation">
                <Icon name="file" size={16} />
                Télécharger la documentation (PDF — 2,4 Mo)
              </a>
              <a href={`tel:${SITE.phoneHref}`}>
                <Icon name="phone" size={16} />
                {SITE.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* -------------------------------------------------------- Bénéfices */}
      <section className="benefits">
        <div className="benefits__bg">
          <Photo seed={`${domain.seed}-benefits`} />
        </div>
        <div className="container benefits__grid">
          {domain.benefits.map((b) => (
            <div className="benefit" key={b.label}>
              <span className="benefit__icon">
                <Icon name={b.icon} size={20} />
              </span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Ressource à télécharger */}
      <section className="section section--light" id="documentation">
        <div className="container">
          <div className="resource">
            <div className="resource__text">
              <span className="badge">Ressource technique</span>
              <h2>{domain.guide.title}</h2>
              <p>{domain.guide.text}</p>
              {/* EF-10 : titre, domaine, langue, poids et date d'édition indiqués. */}
              <a className="btn btn--white" href="#telechargement">
                <Icon name="download" size={16} />
                Télécharger le PDF
              </a>
              <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,.62)' }}>
                PDF · Français · 2,4 Mo · édition 02/2026
              </p>
            </div>
            <div className="resource__media">
              <Photo seed={domain.guide.seed} alt="Plans et notes de calcul" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Projet de référence */}
      <section className="ref-feature topo on-dark">
        <div className="container ref-feature__inner">
          <div className="section-head--center">
            <p className="eyebrow">Réalisation</p>
            <h2 className="section-title section-title--caps">Projet de référence</h2>
          </div>

          <div className="ref-feature__media">
            <Photo seed={domain.showcase.seed} alt="Chantier de référence" />
            <div className="ref-feature__card">
              <span className="badge">{domain.title}</span>
              <h3>[Nom du projet]</h3>
              <p className="ref-feature__loc">[Localisation]</p>
              <div className="kpis">
                {domain.showcase.kpis.map((k) => (
                  <div className="kpi" key={k.label}>
                    <strong>{k.value}</strong>
                    <span>{k.label}</span>
                  </div>
                ))}
              </div>
              <Link className="link-arrow" to="/references">
                Voir le projet
                <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Autres domaines */}
      <section className="section section--light">
        <div className="container">
          <div className="projects-head">
            <div>
              <p className="eyebrow">Explorer</p>
              <h2 className="section-title section-title--caps">Autres domaines</h2>
              <p className="section-lead">
                Découvrez comment nos solutions s'adaptent à d'autres infrastructures civiles.
              </p>
            </div>
            <Link className="link-arrow link-arrow--green" to="/domaines-d-application">
              Tous les domaines
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="mini-grid">
            {others.map((d) => (
              <Link className="mini-card" key={d.slug} to={`/domaines/${d.slug}`}>
                <Photo seed={`${d.seed}-mini`} src={d.image} alt={d.title} />
                <div className="mini-card__body">
                  <h3>{d.title}</h3>
                  <Icon name={d.icon} size={17} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        caps
        title={domain.ctaTitle}
        text="Parlez-nous de votre situation : nos ingénieurs l'étudient et vous proposent la solution la plus adaptée à vos contraintes techniques et budgétaires."
      />
    </>
  )
}
