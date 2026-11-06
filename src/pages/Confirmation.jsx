import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import { SITE } from '../data/site.js'
import { usePublies } from '../data/contenuStore.js'

const STEPS = [
  { label: 'Analyse de votre demande', state: 'En cours d’analyse' },
  { label: 'Échange avec un ingénieur' },
  { label: "Proposition d'une solution adaptée" },
]

export default function Confirmation() {
  const { state } = useLocation()
  /* Référence réellement attribuée à la demande ; valeur d'exemple si la page
     est atteinte directement, sans passer par le formulaire. */
  const ref = useMemo(() => {
    const fallback = `GGS-${new Date().getFullYear()}-8412`
    return `#${state?.reference ?? fallback}`
  }, [state?.reference])
  const suggestions = usePublies('domaines').slice(0, 3)

  return (
    <>
      {/* EF-08 : confirmation à l'écran après envoi de la demande. */}
      <section className="confirm">
        <div className="confirm__bg">
          <Photo seed="ggs-confirm-bg" />
        </div>
        <div className="container confirm__inner">
          <div className="confirm__card">
            <span className="confirm__check">
              <Icon name="check" size={28} strokeWidth={2.2} />
            </span>
            <h1>Merci, votre demande a bien été envoyée</h1>
            <p>
              Nos ingénieurs vont étudier votre situation et reviendront vers vous
              rapidement. Un e-mail de confirmation vous a été envoyé.
            </p>
            <p className="confirm__ref">
              Référence de votre demande : <strong>{ref}</strong>
            </p>

            <div className="confirm__steps">
              <h2>Les prochaines étapes</h2>
              {STEPS.map((s, i) => (
                <div className={`step${i === 0 ? ' is-active' : ''}`} key={s.label}>
                  <span className="step__dot" />
                  <div>
                    <strong>{s.label}</strong>
                    {s.state && <span>{s.state}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="confirm__actions">
              <Link className="btn btn--green" to="/">
                <Icon name="home" size={16} />
                Retour à l'accueil
              </Link>
              <Link className="btn btn--outline" to="/references">
                <Icon name="search" size={16} />
                Découvrir nos références
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Suggestions */}
      <section className="section section--light">
        <div className="container">
          <div className="section-head--center">
            <p className="eyebrow">Poursuivre la navigation</p>
            <h2 className="section-title section-title--caps">
              En attendant, découvrez nos domaines d'application
            </h2>
          </div>

          <div className="mini-grid">
            {suggestions.map((d) => (
              <article className="mini-card" key={d.slug}>
                <Photo seed={`${d.seed}-suggest`} src={d.image} zoom alt={d.title} />
                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 className="domain-card__title" style={{ fontSize: 15 }}>{d.title}</h3>
                  <div className="domain-card__foot">
                    <Link className="link-arrow" to={`/domaines/${d.slug}`}>
                      En savoir plus
                      <Icon name="arrowRight" size={14} />
                    </Link>
                    <span className="domain-card__icon">
                      <Icon name="arrowUpRight" size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Assistance */}
      <section className="band-dark">
        <div className="container band-dark__inner">
          <div>
            <h2>Besoin d'une assistance immédiate ?</h2>
            <p>Nos bureaux sont ouverts du lundi au vendredi de 8h30 à 18h30.</p>
          </div>
          <div className="band-dark__phone">
            <span>Ligne directe</span>
            <strong>
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </strong>
          </div>
        </div>
      </section>
    </>
  )
}
