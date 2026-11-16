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
            <li><Link to="/domaines/routes-et-infrastructures-routieres">Routes et infrastructures</Link></li>
            <li><Link to="/domaines/stabilisation-des-talus-et-soutenement">Talus et soutènement</Link></li>
            <li><Link to="/domaines/protection-des-berges-et-lutte-contre-l-erosion">Berges et érosion</Link></li>
            <li><Link to="/domaines/infrastructures-ferroviaires">Infrastructures ferroviaires</Link></li>
            <li><Link to="/domaines/genie-civil-et-ouvrages-industriels">Génie civil et industrie</Link></li>
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

        {/* Mentions de marques exigées dès lors que le logo et les noms du
            fabricant figurent sur le site (cahier des charges § VIII). */}
        <p className="footer__marques">
          HUESKER<sup>®</sup> et le signe associé sont des marques déposées de
          HUESKER Synthetic GmbH. Les noms de solutions cités (Fortrac<sup>®</sup>,
          Basetrac<sup>®</sup>, Incomat<sup>®</sup>, Stabilenka<sup>®</sup>,
          Tektoseal<sup>®</sup>) appartiennent à leurs titulaires respectifs.
        </p>
      </div>
    </footer>
  )
}
