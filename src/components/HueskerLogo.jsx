/**
 * Logo du partenaire technologique HUESKER.
 *
 * Reconstitution vectorielle : le signe (carré gris au dièse évidé) est tracé
 * en SVG, le logotype est composé avec la typographie du site. Elle reste nette
 * sur les écrans haute densité, à l'inverse d'une image bitmap.
 *
 * ⚠️ HUESKER® et le signe associé sont des marques déposées de HUESKER
 * Synthetic GmbH. Leur reprise sur le site suppose l'autorisation écrite du
 * fabricant (cahier des charges § VIII) ; à défaut, remplacer ce composant par
 * une désignation générique. Le fichier officiel fourni par le fabricant est à
 * substituer à cette reconstitution dès qu'il est disponible.
 */
export default function HueskerLogo({ size = 1, claim = true, className = '' }) {
  return (
    <span
      className={`huesker${className ? ' ' + className : ''}`}
      style={{ '--huesker-scale': size }}
      role="img"
      aria-label="HUESKER — Ideas. Engineers. Innovations."
    >
      <svg className="huesker__mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <rect width="64" height="64" fill="#9d9d9d" />
        {/* Dièse évidé : deux montants, deux traverses */}
        <g fill="#fff">
          <rect x="17" y="6" width="9.5" height="52" />
          <rect x="37.5" y="6" width="9.5" height="52" />
          <rect x="6" y="19" width="52" height="9.5" />
          <rect x="6" y="35.5" width="52" height="9.5" />
        </g>
      </svg>

      <span className="huesker__text">
        <span className="huesker__name">HUESKER</span>
        {claim && <span className="huesker__claim">Ideas. Engineers. Innovations.</span>}
      </span>
    </span>
  )
}
