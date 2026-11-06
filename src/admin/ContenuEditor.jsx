import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import AdminLayout from './AdminLayout.jsx'
import MediaPicker from './MediaPicker.jsx'
import { SCHEMAS } from './contenuSchemas.js'
import { useContenus, saveContenu, removeContenu, slugify } from '../data/contenuStore.js'

/* ------------------------------------------------------------- Champ simple */
function Champ({ champ, valeur, onChange, seed }) {
  const id = `c-${champ.nom}`
  const commun = {
    id,
    value: valeur ?? '',
    onChange: (e) => onChange(e.target.value),
    'aria-describedby': champ.aide ? `${id}-aide` : undefined,
  }

  return (
    <div className="adm-field">
      {champ.type !== 'image' && (
        <label className="adm-field__label" htmlFor={id}>
          {champ.label}{champ.requis && <span style={{ color: 'var(--bleu)' }}> *</span>}
        </label>
      )}

      {champ.type === 'texte' && <input className="ed-input" type="text" {...commun} />}

      {champ.type === 'zone' && <textarea className="ed-input ed-input--zone" {...commun} />}

      {champ.type === 'choix' && (
        <select className="ed-input" {...commun}>
          {champ.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      )}

      {champ.type === 'image' && (
        <MediaPicker label={champ.label} value={valeur} seed={seed} onChange={onChange} />
      )}

      {champ.type === 'mots' && (
        <MotsCles valeurs={valeur ?? []} onChange={onChange} />
      )}

      {champ.aide && <p className="ed-aide" id={`${id}-aide`}>{champ.aide}</p>}
    </div>
  )
}

/* ------------------------------------------ Liste de courtes chaînes (mots) */
function MotsCles({ valeurs, onChange }) {
  const [saisie, setSaisie] = useState('')
  const ajouter = () => {
    const v = saisie.trim()
    if (!v) return
    onChange([...valeurs, v])
    setSaisie('')
  }
  return (
    <div>
      <div className="ed-mots">
        {valeurs.map((v, i) => (
          <span className="ed-mot" key={`${v}-${i}`}>
            {v}
            <button type="button" onClick={() => onChange(valeurs.filter((_, j) => j !== i))} aria-label={`Retirer ${v}`}>
              <Icon name="close" size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="ed-mots__ajout">
        <input
          className="ed-input"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); ajouter() } }}
          placeholder="Ajouter, puis Entrée"
        />
        <button type="button" className="btn btn--outline btn--sm" onClick={ajouter}>
          <Icon name="plus" size={13} />
        </button>
      </div>
    </div>
  )
}

/* --------------------------------------------- Liste de sous-formulaires */
function ListeRepetable({ champ, valeurs, onChange }) {
  const items = valeurs ?? []
  const maj = (i, nom, v) =>
    onChange(items.map((it, j) => (j === i ? { ...it, [nom]: v } : it)))

  return (
    <div className="ed-liste">
      {items.map((item, i) => (
        <div className="ed-liste__item" key={i}>
          <div className="ed-liste__head">
            <strong>{champ.libelleItem} {i + 1}</strong>
            <div className="ed-liste__ctrl">
              <button type="button" disabled={i === 0} aria-label="Monter"
                onClick={() => { const c = [...items]; [c[i - 1], c[i]] = [c[i], c[i - 1]]; onChange(c) }}>
                <Icon name="chevronDown" size={13} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button type="button" disabled={i === items.length - 1} aria-label="Descendre"
                onClick={() => { const c = [...items]; [c[i + 1], c[i]] = [c[i], c[i + 1]]; onChange(c) }}>
                <Icon name="chevronDown" size={13} />
              </button>
              <button type="button" aria-label="Supprimer"
                onClick={() => onChange(items.filter((_, j) => j !== i))}>
                <Icon name="close" size={13} />
              </button>
            </div>
          </div>
          {champ.sous.map((sc) => (
            <Champ
              key={sc.nom}
              champ={sc}
              valeur={item[sc.nom]}
              seed={item.seed}
              onChange={(v) => maj(i, sc.nom, v)}
            />
          ))}
        </div>
      ))}
      <button
        type="button"
        className="btn btn--outline btn--sm"
        onClick={() => onChange([...items, { ...champ.modele }])}
      >
        <Icon name="plus" size={14} />
        Ajouter un{champ.libelleItem.startsWith('e') ? '' : 'e'} {champ.libelleItem}
      </button>
    </div>
  )
}

/* ================================================================= Éditeur */
export default function ContenuEditor() {
  const { collection, id } = useParams()
  const navigate = useNavigate()
  const contenus = useContenus()
  const schema = SCHEMAS[collection]

  const estNouveau = id === 'nouveau'
  const existant = estNouveau
    ? null
    : contenus[collection]?.find((x) => (x.slug ?? x.id) === id)

  const [valeurs, setValeurs] = useState(() =>
    estNouveau ? schema?.nouveau() : { ...existant }
  )
  const [erreurs, setErreurs] = useState({})

  if (!schema) return <Navigate to="/admin/contenus" replace />
  if (!estNouveau && !existant) return <Navigate to="/admin/contenus" replace />

  const set = (nom) => (v) => {
    setValeurs((prev) => ({ ...prev, [nom]: v }))
    if (erreurs[nom]) setErreurs((p) => ({ ...p, [nom]: undefined }))
  }

  const tousChamps = schema.groupes.flatMap((g) => g.champs)

  const enregistrer = (publier) => {
    const manquants = {}
    tousChamps.forEach((c) => {
      if (c.requis && !String(valeurs[c.nom] ?? '').trim()) manquants[c.nom] = true
    })
    if (Object.keys(manquants).length > 0) {
      setErreurs(manquants)
      document.querySelector('.ed-input[aria-invalid="true"]')?.focus()
      return
    }

    /* L'identifiant d'URL est dérivé du titre à la création, puis figé :
       modifier une adresse déjà publiée casserait les liens existants. */
    const cle = schema.cle
    const final = { ...valeurs, published: publier }
    if (!final[cle]) final[cle] = slugify(valeurs.title)

    saveContenu(collection, final)
    navigate('/admin/contenus')
  }

  const titre = estNouveau
    ? `Nouveau contenu — ${schema.singulier}`
    : valeurs.title || schema.singulier

  return (
    <AdminLayout
      title={titre}
      subtitle={
        estNouveau
          ? `Création d'une ${schema.singulier}`
          : `Modification · ${valeurs.published === false ? 'dépubliée' : 'en ligne'}`
      }
      actions={
        <Link className="btn btn--outline btn--sm" to="/admin/contenus">
          <Icon name="chevronLeft" size={14} />
          Retour aux contenus
        </Link>
      }
    >
      <div className="ed-layout">
        <form onSubmit={(e) => { e.preventDefault(); enregistrer(valeurs.published !== false) }}>
          {schema.groupes.map((groupe) => (
            <section className="adm-card" key={groupe.titre} style={{ marginBottom: 16 }}>
              <div className="adm-card__head">
                <h2>{groupe.titre}</h2>
                {groupe.aide && <p>{groupe.aide}</p>}
              </div>
              <div className="adm-card__body">
                {groupe.champs.map((champ) =>
                  champ.type === 'liste' ? (
                    <div className="adm-field" key={champ.nom}>
                      <p className="adm-field__label">{champ.label}</p>
                      <ListeRepetable
                        champ={champ}
                        valeurs={valeurs[champ.nom]}
                        onChange={set(champ.nom)}
                      />
                    </div>
                  ) : (
                    <div key={champ.nom} className={erreurs[champ.nom] ? 'ed-erreur' : undefined}>
                      <Champ
                        champ={champ}
                        valeur={valeurs[champ.nom]}
                        seed={valeurs.seed ?? valeurs.id}
                        onChange={set(champ.nom)}
                      />
                      {erreurs[champ.nom] && (
                        <p className="field__error" style={{ marginTop: -14, marginBottom: 16 }}>
                          Ce champ est obligatoire.
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
        </form>

        <aside className="adm-aside">
          <div className="adm-card">
            <div className="adm-card__body">
              <p className="adm-field__label">Publication</p>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.6 }}>
                {valeurs.published === false
                  ? "Ce contenu n'apparaît pas sur le site public."
                  : 'Ce contenu est visible sur le site public.'}
              </p>

              <button type="button" className="btn btn--green btn--block" onClick={() => enregistrer(true)}>
                <Icon name="checkCircle" size={15} />
                Enregistrer et publier
              </button>
              <button
                type="button"
                className="btn btn--outline btn--block"
                style={{ marginTop: 10 }}
                onClick={() => enregistrer(false)}
              >
                Enregistrer comme brouillon
              </button>

              {!estNouveau && (
                <>
                  <hr style={{ border: 0, borderTop: '1px solid var(--line-soft)', margin: '20px 0' }} />
                  <dl className="adm-meta-list">
                    <div>
                      <dt>Adresse</dt>
                      <dd style={{ fontSize: 11.5 }}>{valeurs.path ?? `/${valeurs.slug ?? valeurs.id}`}</dd>
                    </div>
                    <div>
                      <dt>Dernière mise à jour</dt>
                      <dd>{valeurs.updatedAt || '—'}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm btn--block"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      if (window.confirm(`Supprimer définitivement « ${valeurs.title} » ?`)) {
                        removeContenu(collection, valeurs.slug ?? valeurs.id)
                        navigate('/admin/contenus')
                      }
                    }}
                  >
                    Supprimer ce contenu
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="adm-rgpd">
            <strong>
              <Icon name="bulb" size={15} />
              Règles de rédaction
            </strong>
            Aucun prix ni bouton d'achat. Chaque solution est présentée comme le
            résultat possible d'une étude. Privilégier « étude »,
            « dimensionnement », « solution » et « situation » (§ IV).
          </p>
        </aside>
      </div>
    </AdminLayout>
  )
}
