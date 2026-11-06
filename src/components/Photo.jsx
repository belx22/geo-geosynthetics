import { resolveImage } from '../data/images.js'

/**
 * Visuel de chantier.
 *
 * Les photographies sont servies depuis `public/images/` (format WebP, ~135 Ko
 * en moyenne) : aucun appel réseau externe, conformément à l'exigence de
 * performance du cahier des charges (§ VII).
 *
 * Un dégradé ardoise sert de repli si l'image ne se charge pas : la mise en
 * page reste identique.
 */
export default function Photo({
  seed,
  src,
  alt = '',
  zoom = false,
  eager = false,
  className = '',
  style,
}) {
  return (
    <div className={`photo${zoom ? ' photo--zoom' : ''}${className ? ' ' + className : ''}`} style={style}>
      <img
        /* Un visuel choisi en administration prime sur le visuel par défaut. */
        src={src || resolveImage(seed)}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.visibility = 'hidden'
        }}
      />
    </div>
  )
}
