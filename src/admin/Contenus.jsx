import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import AdminLayout from './AdminLayout.jsx'
import { SCHEMAS } from './contenuSchemas.js'
import { useContenus, togglePublication, resetContenus } from '../data/contenuStore.js'
import { resolveImage } from '../data/images.js'

/* EF-14 — création, modification et dépublication des pages, fiches et
   documents sans faire appel à un développeur. Les modifications enregistrées
   ici sont immédiatement visibles sur le site public. */

const ONGLETS = [
  { id: 'pages', label: 'Pages', icon: 'file' },
  { id: 'domaines', label: 'Fiches de domaine', icon: 'mountain' },
  { id: 'projets', label: 'Fiches de référence', icon: 'layers' },
  { id: 'documents', label: 'Documents', icon: 'download' },
]

function Switch({ checked, onChange, label }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch__track" />
      {label}
    </label>
  )
}

export default function Contenus() {
  const contenus = useContenus()
  const [onglet, setOnglet] = useState('pages')
  const [query, setQuery] = useState('')

  const schema = SCHEMAS[onglet]
  const cle = (item) => item.slug ?? item.id

  const liste = (contenus[onglet] ?? []).filter((item) => {
    const q = query.trim().toLowerCase()
    return !q || `${item.title} ${item.excerpt ?? ''} ${item.path ?? ''}`.toLowerCase().includes(q)
  })

  const visuel = (item) => item.image || item.heroImage || resolveImage(item.seed ?? cle(item))

  const colonnes = {
    pages: ['Page', 'Adresse', 'Mise à jour', 'Publication', ''],
    domaines: ['Fiche de domaine', 'Famille', 'Solutions', 'Mise à jour', 'Publication', ''],
    projets: ['Projet', 'Domaine', 'Localisation', 'Année', 'Publication', ''],
    documents: ['Document', 'Domaine', 'Langue', 'Poids', 'Édition', 'Publication', ''],
  }

  const lignes = {
    pages: (it) => [it.path, it.updatedAt || '—'],
    domaines: (it) => [it.family, it.solutions?.length ?? 0, it.updatedAt || '—'],
    projets: (it) => [it.family, it.location, it.year],
    documents: (it) => [it.domain, it.lang, it.size, it.date],
  }

  const etiquette = (publie) => {
    if (onglet === 'documents') return publie ? 'En ligne' : 'Retiré'
    if (onglet === 'pages') return publie ? 'Publiée' : 'Brouillon'
    return publie ? 'Publiée' : 'Dépubliée'
  }

  return (
    <AdminLayout
      title="Contenus du site"
      subtitle="Créer, modifier et dépublier les pages, fiches et documents — exigence EF-14"
      actions={
        <>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => {
              if (window.confirm('Rétablir les contenus d’origine ? Vos modifications seront perdues.')) {
                resetContenus()
              }
            }}
          >
            Rétablir les contenus d'origine
          </button>
          <Link className="btn btn--green btn--sm" to={`/admin/contenus/${onglet}/nouveau`}>
            <Icon name="plus" size={15} />
            Nouvelle {schema.singulier}
          </Link>
        </>
      }
    >
      <div className="adm-card">
        <div className="adm-filters" style={{ gap: 8 }}>
          {ONGLETS.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`chip${onglet === o.id ? ' is-active' : ''}`}
              onClick={() => setOnglet(o.id)}
              aria-pressed={onglet === o.id}
            >
              {o.label} ({contenus[o.id]?.length ?? 0})
            </button>
          ))}
          <div className="adm-filters__search" style={{ marginLeft: 'auto', maxWidth: 260 }}>
            <Icon name="search" size={15} />
            <label htmlFor="cq" style={{ position: 'absolute', left: '-9999px' }}>Rechercher un contenu</label>
            <input
              id="cq"
              type="search"
              placeholder="Rechercher…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <caption style={{ position: 'absolute', left: '-9999px' }}>{schema.pluriel}</caption>
            <thead>
              <tr>{colonnes[onglet].map((c, i) => <th key={c || i} scope="col">{c}</th>)}</tr>
            </thead>
            <tbody>
              {liste.length === 0 ? (
                <tr>
                  <td className="adm-table__empty" colSpan={colonnes[onglet].length}>
                    Aucun contenu ne correspond.
                  </td>
                </tr>
              ) : (
                liste.map((item) => {
                  const publie = item.published !== false
                  return (
                    <tr key={cle(item)}>
                      <td>
                        <Link
                          className="ed-ligne"
                          to={`/admin/contenus/${onglet}/${cle(item)}`}
                        >
                          {onglet === 'documents' ? (
                            <span className="ed-ligne__doc"><Icon name="file" size={16} /></span>
                          ) : (
                            <img className="ed-ligne__vignette" src={visuel(item)} alt="" loading="lazy" />
                          )}
                          <span>
                            <strong>{item.title}</strong>
                            {item.excerpt && <span>{item.excerpt.slice(0, 68)}…</span>}
                          </span>
                        </Link>
                      </td>
                      {lignes[onglet](item).map((v, i) => <td key={i}>{v}</td>)}
                      <td>
                        <Switch
                          checked={publie}
                          onChange={() => togglePublication(onglet, cle(item))}
                          label={etiquette(publie)}
                        />
                      </td>
                      <td>
                        <Link className="btn btn--outline btn--sm" to={`/admin/contenus/${onglet}/${cle(item)}`}>
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="adm-warn" style={{ marginTop: 18 }}>
        <Icon name="alert" size={16} />
        <span>
          Les contenus sont enregistrés dans le navigateur et le site public les
          reflète immédiatement. Lors de la réalisation, seules les fonctions de
          <code> src/data/contenuStore.js </code> sont à brancher sur le système
          de gestion de contenu retenu (§ VI.4) : les écrans restent inchangés.
        </span>
      </p>
    </AdminLayout>
  )
}
