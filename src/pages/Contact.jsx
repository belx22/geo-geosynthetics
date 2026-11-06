import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Photo from '../components/Photo.jsx'
import { Breadcrumb } from '../components/PageHero.jsx'
import {
  SITE,
  FAQ,
  ORG_TYPES,
  WORK_TYPES,
  PROJECT_STAGES,
} from '../data/site.js'
import { addDemande } from '../data/demandesStore.js'
import { usePage } from '../data/contenuStore.js'

const SERVICES = [
  { icon: 'userSearch', title: 'Analyse technique', text: 'Étude approfondie de vos rapports de sol et contraintes spécifiques.' },
  { icon: 'edit', title: 'Dimensionnement', text: 'Calculs de stabilité selon les normes Eurocodes en vigueur.' },
  { icon: 'checkCircle', title: 'Note de calcul', text: "Remise d'un dossier technique complet et certifié sous 48h." },
]

/* Champs obligatoires — cahier des charges § V, tableau 9. */
const REQUIRED = ['name', 'org', 'orgType', 'email', 'location', 'workType', 'situation', 'consent']

const EMPTY = {
  name: '',
  org: '',
  orgType: '',
  role: '',
  email: '',
  phone: '',
  location: '',
  workType: '',
  stage: '',
  deadline: '',
  situation: '',
  constraints: '',
  consent: false,
}

export default function Contact() {
  const navigate = useNavigate()
  const page = usePage('contact')
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const fileInput = useRef(null)

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const invalid = (key) => (errors[key] ? 'true' : undefined)

  const addFiles = (list) => {
    setFiles((prev) => [...prev, ...Array.from(list).map((f) => f.name)].slice(0, 6))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    REQUIRED.forEach((key) => {
      if (!values[key]) next[key] = 'Ce champ est obligatoire.'
    })
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Veuillez saisir une adresse électronique valide.'
    }
    setErrors(next)

    if (Object.keys(next).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }

    /* La demande rejoint l'espace d'administration, où l'équipe d'étude la
       qualifie et y répond (EF-15). Front-end uniquement : l'envoi serveur et
       l'accusé de réception par courriel (EF-08) relèvent du back-office. */
    const [city, ...rest] = values.location.split(',').map((s) => s.trim())
    const demande = addDemande({
      name: values.name,
      role: values.role,
      org: values.org,
      orgType: values.orgType,
      email: values.email,
      phone: values.phone,
      city: city || values.location,
      country: rest.join(', ') || 'Non précisé',
      workType: values.workType,
      stage: values.stage,
      deadline: values.deadline,
      situation: values.situation,
      constraints: values.constraints,
      files,
    })

    navigate('/demande-envoyee', { state: { reference: demande.id } })
  }

  const complete = REQUIRED.every((key) => Boolean(values[key]))

  return (
    <>
      {/* ------------------------------------------------------------ Héros */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <Photo seed="ggs-contact-hero" src={page?.heroImage} eager />
        </div>
        <div className="container page-hero__inner">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]} />
          <p className="eyebrow">{page?.heroEyebrow || 'Parlons de votre projet'}</p>
          <h1 className="page-hero__title">{page?.heroTitle || 'Demander une étude'}</h1>
          <p className="page-hero__lead">
            Décrivez-nous votre situation : nos ingénieurs l'analysent avant de vous
            proposer une solution.
          </p>

          <div className="hero-services">
            {SERVICES.map((s) => (
              <div className="hero-service" key={s.title}>
                <span className="hero-service__icon">
                  <Icon name={s.icon} size={18} />
                </span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Formulaire */}
      <section className="section section--light">
        <div className="container contact-layout">
          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend className="form-legend">Vos coordonnées</legend>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Nom et prénom <span className="req">*</span></label>
                  <input id="name" value={values.name} onChange={set('name')} aria-invalid={invalid('name')} placeholder="Ex : Jean Dupont" autoComplete="name" />
                  {errors.name && <span className="field__error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="org">Organisme ou administration <span className="req">*</span></label>
                  <input id="org" value={values.org} onChange={set('org')} aria-invalid={invalid('org')} placeholder="Ex : Mairie de Douala / Eiffage" autoComplete="organization" />
                  {errors.org && <span className="field__error">{errors.org}</span>}
                </div>
                <div className="field">
                  <label htmlFor="orgType">Type d'organisme <span className="req">*</span></label>
                  <select id="orgType" value={values.orgType} onChange={set('orgType')} aria-invalid={invalid('orgType')}>
                    <option value="">Sélectionnez un type</option>
                    {ORG_TYPES.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  {errors.orgType && <span className="field__error">{errors.orgType}</span>}
                </div>
                <div className="field">
                  <label htmlFor="role">Fonction</label>
                  <input id="role" value={values.role} onChange={set('role')} placeholder="Ex : Chef de projet infrastructure" />
                </div>
                <div className="field">
                  <label htmlFor="email">E-mail professionnel <span className="req">*</span></label>
                  <input id="email" type="email" value={values.email} onChange={set('email')} aria-invalid={invalid('email')} placeholder="jean.dupont@entreprise.fr" autoComplete="email" />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Téléphone</label>
                  <input id="phone" type="tel" value={values.phone} onChange={set('phone')} placeholder="+237 6 XX XX XX XX" autoComplete="tel" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="form-legend">Votre projet</legend>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="workType">Type d'ouvrage <span className="req">*</span></label>
                  <select id="workType" value={values.workType} onChange={set('workType')} aria-invalid={invalid('workType')}>
                    <option value="">Sélectionnez un type</option>
                    {WORK_TYPES.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  {errors.workType && <span className="field__error">{errors.workType}</span>}
                </div>
                <div className="field">
                  <label htmlFor="stage">Stade du projet</label>
                  <select id="stage" value={values.stage} onChange={set('stage')}>
                    <option value="">Sélectionnez le stade</option>
                    {PROJECT_STAGES.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="location">Localisation du chantier <span className="req">*</span></label>
                  <input id="location" value={values.location} onChange={set('location')} aria-invalid={invalid('location')} placeholder="Pays, ville ou région" />
                  {errors.location && <span className="field__error">{errors.location}</span>}
                </div>
                <div className="field">
                  <label htmlFor="deadline">Échéance souhaitée</label>
                  <input id="deadline" value={values.deadline} onChange={set('deadline')} placeholder="Ex : T3 2026" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="form-legend">Votre situation</legend>
              <div className="field">
                <label htmlFor="situation">Décrivez votre situation <span className="req">*</span></label>
                <textarea id="situation" value={values.situation} onChange={set('situation')} aria-invalid={invalid('situation')} placeholder="Détaillez votre besoin technique ici…" />
                {errors.situation ? (
                  <span className="field__error">{errors.situation}</span>
                ) : (
                  <span className="field__hint">
                    <Icon name="sparkle" size={13} />
                    Nature du sol, contraintes du site, problème rencontré…
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="constraints">Contraintes connues</label>
                <textarea id="constraints" value={values.constraints} onChange={set('constraints')} placeholder="Sol, eau, délai, budget…" style={{ minHeight: 92 }} />
              </div>

              <div className="field">
                <label htmlFor="attachments">Ajoutez vos plans, photos ou études (PDF, JPG, DWG)</label>
                <div
                  className={`dropzone${dragging ? ' is-over' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
                >
                  <span className="dropzone__icon">
                    <Icon name="upload" size={24} />
                  </span>
                  <strong>Glissez-déposez vos fichiers ici</strong>
                  <p>Ou cliquez pour parcourir votre ordinateur · 10 Mo maximum par fichier</p>
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => fileInput.current?.click()}>
                    <Icon name="plus" size={14} />
                    Sélectionner des fichiers
                  </button>
                  <input
                    id="attachments"
                    ref={fileInput}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.dwg"
                    hidden
                    onChange={(e) => addFiles(e.target.files)}
                  />
                  {files.length > 0 && (
                    <ul className="dropzone__files">
                      {files.map((f, i) => (
                        <li key={`${f}-${i}`}>
                          <Icon name="file" size={13} /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </fieldset>

            {/* EF-07 / § V : consentement au traitement des données, obligatoire. */}
            <div className="consent">
              <input id="consent" type="checkbox" checked={values.consent} onChange={set('consent')} aria-invalid={invalid('consent')} />
              <label htmlFor="consent">
                J'accepte que mes données soient utilisées pour traiter ma demande
                conformément à la <a href="#confidentialite">politique de confidentialité</a> de
                Geo-Geosynthetics. <span className="req">*</span>
              </label>
            </div>
            {errors.consent && <p className="field__error" style={{ marginTop: -14, marginBottom: 18 }}>{errors.consent}</p>}

            <button className={`btn btn--green btn--block${complete ? '' : ' btn--pending'}`} type="submit">
              Envoyer ma demande
              <Icon name="send" size={16} />
            </button>
          </form>

          {/* ------------------------------------------------ Colonne droite */}
          <aside className="contact-aside">
            <div className="coords">
              <h3>Nos coordonnées</h3>
              <ul>
                <li>
                  <span className="coords__icon"><Icon name="pin" size={17} /></span>
                  <div>
                    <span className="coords__label">Siège social</span>
                    <strong>{SITE.address}</strong>
                  </div>
                </li>
                <li>
                  <span className="coords__icon"><Icon name="phone" size={17} /></span>
                  <div>
                    <span className="coords__label">Téléphone</span>
                    <strong>{SITE.phone}</strong>
                  </div>
                </li>
                <li>
                  <span className="coords__icon"><Icon name="mail" size={17} /></span>
                  <div>
                    <span className="coords__label">E-mail</span>
                    <strong>{SITE.email}</strong>
                  </div>
                </li>
                <li>
                  <span className="coords__icon"><Icon name="clock" size={17} /></span>
                  <div>
                    <span className="coords__label">Disponibilité</span>
                    <strong>{SITE.hours}</strong>
                  </div>
                </li>
              </ul>
            </div>

            <div className="callbox">
              <span className="callbox__icon"><Icon name="phone" size={19} /></span>
              <h3>Vous préférez échanger directement ?</h3>
              <p>
                Un ingénieur conseil est à votre disposition pour une première
                évaluation rapide par téléphone.
              </p>
              <a className="btn btn--outline btn--block" href={`tel:${SITE.phoneHref}`}>
                <Icon name="phone" size={15} />
                Nous appeler
              </a>
            </div>

            <div className="map" role="img" aria-label={`Localisation : ${SITE.address}`}>
              <div className="map__grid" />
              <span className="map__road" style={{ left: 0, right: 0, top: '38%', height: 7 }} />
              <span className="map__road" style={{ left: '28%', top: 0, bottom: 0, width: 6 }} />
              <span className="map__road" style={{ left: 0, right: 0, top: '72%', height: 4 }} />
              <span className="map__pin"><Icon name="pin" size={17} /></span>
              <span className="map__cta">Visualiser sur la carte</span>
            </div>
          </aside>
        </div>
      </section>

      {/* --------------------------------------------------------------- FAQ */}
      <section className="section section--light">
        <div className="container faq">
          <div>
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="section-title section-title--caps">Besoin de précisions ?</h2>
            <p className="section-lead">
              Retrouvez les réponses aux questions les plus courantes sur notre
              processus d'étude technique.
            </p>
            <a className="faq__doc-link" href="#documentation">
              <Icon name="question" size={17} />
              Toute la documentation technique
            </a>
          </div>

          <div className="faq__list">
            {FAQ.map((item, i) => {
              const open = openFaq === i
              return (
                <article className={`faq-item${open ? ' is-open' : ''}`} key={item.q}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      type="button"
                      className="faq-item__q"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      {item.q}
                      <Icon name="chevronDown" size={15} />
                    </button>
                  </h3>
                  {open && <p className="faq-item__a">{item.a}</p>}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Appel à l'action */}
      <section className="cta-band cta-band--caps">
        <div className="container cta-band__inner">
          <div>
            <h2 className="cta-band__title">Accompagnement expert de A à Z</h2>
            <p className="cta-band__text">
              De l'analyse de vos rapports G2 jusqu'à la visite technique de mise en
              œuvre, nous sécurisons chaque étape de votre ouvrage.
            </p>
          </div>
          <div className="cta-band__actions">
            <Link className="btn btn--dark" to="/references">
              Voir nos références
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
