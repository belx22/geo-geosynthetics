import { useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { useMedias, importerMedia, supprimerMedia, quotaMedia } from '../data/mediaStore.js'
import { FAMILLES_MEDIA } from '../data/mediaLibrary.js'
import { resolveImage } from '../data/images.js'

/**
 * Choix d'un visuel dans la médiathèque, avec import depuis le poste.
 * `value` est le chemin du visuel ; `seed` sert d'aperçu par défaut lorsque
 * aucun visuel n'a encore été choisi.
 */
export default function MediaPicker({ value, seed, onChange, label = 'Visuel' }) {
  const medias = useMedias()
  const [open, setOpen] = useState(false)
  const [famille, setFamille] = useState('Toutes')
  const [query, setQuery] = useState('')
  const [erreur, setErreur] = useState('')
  const [enCours, setEnCours] = useState(false)
  const input = useRef(null)

  const apercu = value || (seed ? resolveImage(seed) : null)
  const familles = ['Toutes', 'Visuels importés', ...FAMILLES_MEDIA]

  const liste = medias.filter((m) => {
    const okFamille = famille === 'Toutes' || m.famille === famille
    const okQuery = !query.trim() || m.name.toLowerCase().includes(query.trim().toLowerCase())
    return okFamille && okQuery
  })

  const quota = quotaMedia()
  const pct = Math.min(100, Math.round((quota.utilise / quota.total) * 100))

  const importer = async (file) => {
    if (!file) return
    setErreur('')
    setEnCours(true)
    try {
      const media = await importerMedia(file)
      onChange(media.src)
      setFamille('Visuels importés')
    } catch (e) {
      setErreur(e.message)
    } finally {
      setEnCours(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="media-field">
      <p className="adm-field__label">{label}</p>

      <div className="media-current">
        <div className="media-current__thumb">
          {apercu ? (
            <img src={apercu} alt="" />
          ) : (
            <span className="media-current__empty"><Icon name="layers" size={20} /></span>
          )}
        </div>
        <div className="media-current__info">
          <strong>{value ? (medias.find((m) => m.src === value)?.name ?? 'Visuel choisi') : 'Visuel par défaut'}</strong>
          <span>{value ?? 'Attribué automatiquement selon le thème du contenu'}</span>
          <div className="media-current__actions">
            <button type="button" className="btn btn--outline btn--sm" onClick={() => setOpen((v) => !v)}>
              <Icon name="search" size={14} />
              {open ? 'Fermer la médiathèque' : 'Choisir un visuel'}
            </button>
            {value && (
              <button type="button" className="btn btn--outline btn--sm" onClick={() => onChange('')}>
                Rétablir le visuel par défaut
              </button>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="media-browser">
          <div className="media-browser__bar">
            <div className="adm-filters__search" style={{ minWidth: 180 }}>
              <Icon name="search" size={15} />
              <label htmlFor="media-q" style={{ position: 'absolute', left: '-9999px' }}>
                Rechercher un visuel
              </label>
              <input
                id="media-q"
                type="search"
                placeholder="Rechercher…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <label htmlFor="media-fam" style={{ position: 'absolute', left: '-9999px' }}>Famille</label>
            <select id="media-fam" value={famille} onChange={(e) => setFamille(e.target.value)}>
              {familles.map((f) => <option key={f}>{f}</option>)}
            </select>

            <button
              type="button"
              className="btn btn--green btn--sm"
              onClick={() => input.current?.click()}
              disabled={enCours}
            >
              <Icon name="upload" size={14} />
              {enCours ? 'Import en cours…' : 'Importer une image'}
            </button>
            <input
              ref={input}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => importer(e.target.files?.[0])}
            />
          </div>

          {erreur && <p className="media-browser__error">{erreur}</p>}

          <div className="media-grid">
            {liste.length === 0 ? (
              <p className="chart__empty" style={{ padding: 16 }}>Aucun visuel ne correspond.</p>
            ) : (
              liste.map((m) => (
                <div key={m.id} className={`media-cell${value === m.src ? ' is-on' : ''}`}>
                  <button
                    type="button"
                    onClick={() => { onChange(m.src); setOpen(false) }}
                    title={m.name}
                  >
                    <img src={m.src} alt={m.name} loading="lazy" />
                    <span>{m.name}</span>
                  </button>
                  {m.kind === 'import' && (
                    <button
                      type="button"
                      className="media-cell__del"
                      title="Supprimer ce visuel importé"
                      onClick={() => {
                        if (value === m.src) onChange('')
                        supprimerMedia(m.id)
                      }}
                    >
                      <Icon name="close" size={12} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="media-quota">
            <span>Stockage local des visuels importés</span>
            <span className="media-quota__track">
              <span className="media-quota__bar" style={{ width: `${pct}%` }} />
            </span>
            <span>{Math.round(quota.utilise / 1024)} Ko / {Math.round(quota.total / 1048576)} Mo</span>
          </div>
        </div>
      )}
    </div>
  )
}
