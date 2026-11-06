import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import AdminLayout from './AdminLayout.jsx'
import AccessDenied from './AccessDenied.jsx'
import {
  useDemandes, updateDemande, addEchange, deleteDemande, buildMailto,
} from '../data/demandesStore.js'
import { useSession } from '../data/sessionStore.js'
import { STATUSES, getStatus, isPublicBuyer, ASSIGNEES } from '../data/demandes.js'
import { formatDate, formatDateTime, formatDelay } from './indicateurs.js'
import { TEMPLATES, getTemplate } from './reponses.js'

function Field({ label, children, full = false }) {
  return (
    <div className="adm-field" style={full ? { gridColumn: '1 / -1' } : undefined}>
      <p className="adm-field__label">{label}</p>
      <div className="adm-field__value">{children || <span style={{ color: 'var(--muted)' }}>Non renseigné</span>}</div>
    </div>
  )
}

export default function DemandeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const demandes = useDemandes()
  const session = useSession()
  const demande = demandes.find((d) => d.id === id)

  const [tab, setTab] = useState('reponse')
  const [templateId, setTemplateId] = useState('accuse')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  /* Le modèle choisi réinitialise l'objet et le corps du message. */
  useEffect(() => {
    if (!demande || !session.can.demandes) return
    const t = getTemplate(templateId)
    setSubject(t.subject(demande))
    setBody(t.body(demande, session.name))
    setSent(false)
  }, [templateId, demande?.id, session.name])

  if (!session.can.demandes) {
    return (
      <AdminLayout title="Demande d'étude" subtitle={`Profil ${session.label}`}>
        <AccessDenied />
      </AdminLayout>
    )
  }
  if (!demande) return <Navigate to="/admin/demandes" replace />

  const status = getStatus(demande.status)
  const delay = demande.firstResponseAt
    ? formatDelay((new Date(demande.firstResponseAt) - new Date(demande.createdAt)) / 3_600_000)
    : null

  /* Ouvre la messagerie avec le courriel pré-rempli, puis consigne la réponse
     au dossier et fait passer la demande en « Réponse envoyée ». */
  const sendReply = () => {
    if (!body.trim()) return
    window.location.href = buildMailto(demande, subject, body)
    addEchange(demande.id, { kind: 'reponse', author: session.name, subject, text: body })
    setSent(true)
  }

  return (
    <AdminLayout
      title={demande.name}
      subtitle={`${demande.org} · demande ${demande.id} reçue le ${formatDate(demande.createdAt)}`}
      actions={
        <Link className="btn btn--outline btn--sm" to="/admin/demandes">
          <Icon name="chevronLeft" size={14} />
          Retour à la liste
        </Link>
      }
    >
      <div className="adm-detail">
        <div style={{ display: 'grid', gap: 16 }}>
          {/* ------------------------------------------------ La situation */}
          <section className="adm-card">
            <div className="adm-card__head">
              <h2>La situation décrite par le demandeur</h2>
              <p>Champs recueillis par le formulaire — cahier des charges § V, tableau 9.</p>
            </div>
            <div className="adm-card__body">
              <Field label="Description de la situation" full>
                <div className="adm-field__value--quote">{demande.situation}</div>
              </Field>

              <div className="adm-grid-2">
                <Field label="Domaine d'application">{demande.workType}</Field>
                <Field label="Stade du projet">{demande.stage}</Field>
                <Field label="Localisation du chantier">{demande.city}, {demande.country}</Field>
                <Field label="Échéance souhaitée">{demande.deadline}</Field>
              </div>

              <Field label="Contraintes connues" full>{demande.constraints}</Field>

              <Field label="Pièces jointes" full>
                {demande.files?.length ? (
                  <div className="adm-files">
                    {demande.files.map((f) => (
                      <a key={f} href="#piece-jointe" onClick={(e) => e.preventDefault()}>
                        <Icon name="file" size={15} />
                        {f}
                      </a>
                    ))}
                  </div>
                ) : null}
              </Field>
            </div>
          </section>

          {/* ------------------------------------------------ Le demandeur */}
          <section className="adm-card">
            <div className="adm-card__head">
              <h2>Coordonnées du demandeur</h2>
            </div>
            <div className="adm-card__body">
              <div className="adm-grid-2">
                <Field label="Nom et prénom">{demande.name}</Field>
                <Field label="Fonction">{demande.role}</Field>
                <Field label="Organisme">
                  {demande.org}
                  {isPublicBuyer(demande) && (
                    <div style={{ marginTop: 6 }}>
                      <span className="tag-public">
                        <Icon name="building" size={11} />
                        Acheteur public — visiteur prioritaire
                      </span>
                    </div>
                  )}
                </Field>
                <Field label="Type d'organisme">{demande.orgType}</Field>
                <Field label="Courriel">
                  <a href={`mailto:${demande.email}`}>{demande.email}</a>
                </Field>
                <Field label="Téléphone">
                  {demande.phone ? <a href={`tel:${demande.phone.replace(/\s/g, '')}`}>{demande.phone}</a> : null}
                </Field>
              </div>
            </div>
          </section>

          {/* -------------------------------------- Répondre / note interne */}
          <section className="adm-card">
            <div className="adm-card__head">
              <h2>Traiter la demande</h2>
              <p>Répondre au demandeur par courriel ou consigner une note interne.</p>
            </div>

            <div className="adm-filters" style={{ paddingTop: 12, paddingBottom: 12 }}>
              <button
                type="button"
                className={`chip${tab === 'reponse' ? ' is-active' : ''}`}
                onClick={() => setTab('reponse')}
                aria-pressed={tab === 'reponse'}
              >
                Répondre au demandeur
              </button>
              <button
                type="button"
                className={`chip${tab === 'note' ? ' is-active' : ''}`}
                onClick={() => setTab('note')}
                aria-pressed={tab === 'note'}
              >
                Note interne
              </button>
            </div>

            <div className="adm-card__body">
              {tab === 'reponse' ? (
                <>
                  <div className="adm-field">
                    <label className="adm-field__label" htmlFor="modele">Modèle de réponse</label>
                    <select
                      id="modele"
                      value={templateId}
                      onChange={(e) => setTemplateId(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 3, fontSize: 13 }}
                    >
                      {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                  </div>

                  <div className="adm-field">
                    <label className="adm-field__label" htmlFor="destinataire">Destinataire</label>
                    <input
                      id="destinataire"
                      value={demande.email}
                      readOnly
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 3, fontSize: 13, background: 'var(--bg)' }}
                    />
                  </div>

                  <div className="adm-field">
                    <label className="adm-field__label" htmlFor="objet">Objet</label>
                    <input
                      id="objet"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 3, fontSize: 13 }}
                    />
                  </div>

                  <div className="adm-field">
                    <label className="adm-field__label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      style={{ width: '100%', minHeight: 260, padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 3, fontSize: 13, lineHeight: 1.6, resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button type="button" className="btn btn--green" onClick={sendReply} disabled={!body.trim()}>
                      <Icon name="send" size={15} />
                      Envoyer la réponse
                    </button>
                    {sent && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--vert-600)', fontWeight: 600 }}>
                        <Icon name="checkCircle" size={15} />
                        Réponse consignée au dossier et ouverte dans votre messagerie.
                      </span>
                    )}
                  </div>

                  <p className="adm-warn" style={{ marginTop: 18 }}>
                    <Icon name="alert" size={16} />
                    <span>
                      Le courriel s'ouvre dans la messagerie de votre poste et la
                      réponse est consignée au dossier. <strong>L'envoi depuis le
                      serveur</strong>, l'accusé de réception automatique au
                      visiteur et la notification de l'équipe d'étude (EF-08)
                      relèvent du back-office à réaliser.
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <div className="adm-field">
                    <label className="adm-field__label" htmlFor="note">
                      Note interne — non transmise au demandeur
                    </label>
                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Qualification de la situation, points à vérifier, suite à donner…"
                      style={{ width: '100%', minHeight: 120, padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 3, fontSize: 13, lineHeight: 1.6, resize: 'vertical' }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn--outline"
                    disabled={!note.trim()}
                    onClick={() => {
                      addEchange(demande.id, { kind: 'note', author: session.name, text: note })
                      setNote('')
                    }}
                  >
                    <Icon name="plus" size={15} />
                    Ajouter la note
                  </button>
                </>
              )}
            </div>
          </section>

          {/* ------------------------------------------- Journal du dossier */}
          <section className="adm-card">
            <div className="adm-card__head">
              <h2>Journal du dossier</h2>
              <p>
                {demande.echanges.filter((e) => e.kind === 'reponse').length} réponse(s) au
                demandeur · {demande.echanges.filter((e) => e.kind === 'note').length} note(s) interne(s)
              </p>
            </div>
            <div className="adm-card__body">
              {demande.echanges.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                  Aucun échange pour l'instant. Cette demande attend une première réponse.
                </p>
              ) : (
                <div className="adm-notes">
                  {[...demande.echanges].reverse().map((e, i) => (
                    <article
                      className="adm-note"
                      key={`${e.at}-${i}`}
                      style={e.kind === 'note' ? { borderLeftColor: 'var(--ardoise-200)' } : undefined}
                    >
                      <p className="adm-note__meta">
                        <strong>{e.author}</strong>
                        <span>{formatDateTime(e.at)}</span>
                        <span className={`src-chip ${e.kind === 'reponse' ? 'src-chip--data' : 'src-chip--stats'}`}>
                          <Icon name={e.kind === 'reponse' ? 'send' : 'edit'} size={10} />
                          {e.kind === 'reponse' ? 'Réponse au demandeur' : 'Note interne'}
                        </span>
                      </p>
                      {e.subject && (
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ardoise-900)', marginBottom: 4 }}>
                          Objet : {e.subject}
                        </p>
                      )}
                      <p style={{ whiteSpace: 'pre-line' }}>{e.text}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ------------------------------------------------ Colonne latérale */}
        <aside className="adm-aside">
          <div className="adm-card">
            <div className="adm-card__body">
              <label htmlFor="statut">Statut du dossier</label>
              <select
                id="statut"
                value={demande.status}
                onChange={(e) => updateDemande(demande.id, { status: e.target.value })}
              >
                {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <p style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: -8, marginBottom: 18 }}>
                {status.help}
              </p>

              <label htmlFor="attribution">Attribuée à</label>
              <select
                id="attribution"
                value={demande.assignee}
                onChange={(e) => updateDemande(demande.id, { assignee: e.target.value })}
              >
                {ASSIGNEES.map((a) => <option key={a}>{a}</option>)}
              </select>

              <dl className="adm-meta-list">
                <div>
                  <dt>Référence</dt>
                  <dd>{demande.id}</dd>
                </div>
                <div>
                  <dt>Reçue le</dt>
                  <dd>{formatDateTime(demande.createdAt)}</dd>
                </div>
                <div>
                  <dt>Première réponse</dt>
                  <dd>{delay ?? 'En attente'}</dd>
                </div>
                <div>
                  <dt>Acheteur public</dt>
                  <dd>{isPublicBuyer(demande) ? 'Oui' : 'Non'}</dd>
                </div>
                <div>
                  <dt>Consentement</dt>
                  <dd>Recueilli</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="adm-rgpd">
            <strong>
              <Icon name="shield" size={15} />
              Données personnelles
            </strong>
            Le visiteur a consenti au traitement de ses données pour l'instruction
            de sa demande. La conservation est limitée à la durée nécessaire au
            suivi (§ VII).
            <button
              type="button"
              className="btn btn--outline btn--sm btn--block"
              style={{ marginTop: 14 }}
              onClick={() => {
                if (window.confirm(`Supprimer définitivement la demande ${demande.id} et les données personnelles associées ?`)) {
                  deleteDemande(demande.id)
                  navigate('/admin/demandes')
                }
              }}
            >
              Supprimer la demande
            </button>
          </div>
        </aside>
      </div>
    </AdminLayout>
  )
}
