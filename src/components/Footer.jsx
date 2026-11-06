import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { SITE } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h2 className="footer__title">Contact</h2>
          <ul className="footer__list">
            <li>
              <Icon name="pin" size={15} />
              <span>{SITE.address}</span>
            </li>
            <li>
              <Icon name="phone" size={15} />
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={15} />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Expertise</h2>
          <ul className="footer__list">
            <li><Link to="/domaines/renforcement-de-talus-et-murs">Renforcement</Link></li>
            <li><Link to="/domaines/systemes-de-drainage">Drainage</Link></li>
            <li><Link to="/domaines/stabilisation-des-sols">Stabilisation</Link></li>
            <li><Link to="/domaines/ouvrages-hydrauliques">Filtration</Link></li>
            <li><Link to="/domaines/centres-de-stockage">Environnement</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Ressources</h2>
          <ul className="footer__list">
            <li>
              <Icon name="file" size={15} />
              <a href="#documentation">Documentation technique</a>
            </li>
            <li>
              <Icon name="checkCircle" size={15} />
              <a href="#certifications">Certifications</a>
            </li>
            <li>
              <Icon name="globe" size={15} />
              <Link to="/references">Projets internationaux</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Rester informé</h2>
          <p className="footer__note">
            Recevez notre lettre d'information mensuelle sur les innovations
            géosynthétiques et la réglementation des infrastructures.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter" style={{ position: 'absolute', left: '-9999px' }}>
              Votre adresse électronique
            </label>
            <input
              id="newsletter"
              className="footer__input"
              type="email"
              placeholder="Votre adresse e-mail"
            />
          </form>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <Logo />
          <span className="footer__copy">© 2026 Geo-Geosynthetics. Tous droits réservés.</span>
          <nav className="footer__legal" aria-label="Liens légaux">
            <a href="#confidentialite">Politique de confidentialité</a>
            <a href="#mentions-legales">Mentions légales</a>
            <a href="#plan-du-site">Plan du site</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
