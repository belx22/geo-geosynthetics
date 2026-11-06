import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/**
 * Bandeau vert d'appel à l'action, présent en bas de chaque page de la maquette.
 * EF-06 : le bouton « Demander une étude » reste accessible partout.
 */
export default function CtaBand({
  title = "Vous avez un projet d'ouvrage ?",
  text = "Parlez-nous de votre situation : nos ingénieurs l'étudient et vous proposent la solution la plus adaptée.",
  caps = false,
  center = false,
  secondary,
}) {
  return (
    <section className={`cta-band${caps ? ' cta-band--caps' : ''}${center ? ' cta-band--center' : ''}`}>
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <div className="cta-band__actions">
          <Link className="btn btn--dark" to="/demander-une-etude">
            Demander une étude
            <Icon name="arrowRight" size={16} />
          </Link>
          {secondary && (
            <Link className="btn btn--ghost-light" to={secondary.to}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
