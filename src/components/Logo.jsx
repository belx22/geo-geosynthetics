/**
 * Logo Geo-Geosynthetics : marque « strates de sol » en dégradé + signature.
 * Reproduit en SVG en attendant la version vectorielle fournie par le client
 * (cahier des charges, § VI — le JPEG 569x166 est insuffisant en haute densité).
 */
export default function Logo({ light = false, size = 1 }) {
  const w = 56 * size
  const h = 24 * size
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <svg
        className="logo__mark"
        width={w}
        height={h}
        viewBox="0 0 56 24"
        role="img"
        aria-label="Geo-Geosynthetics"
      >
        <defs>
          <linearGradient id="ggsA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1f7a3d" />
            <stop offset="0.5" stopColor="#56b24a" />
            <stop offset="1" stopColor="#f2b705" />
          </linearGradient>
          <linearGradient id="ggsB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1b6fc4" />
            <stop offset="0.55" stopColor="#36a9e1" />
            <stop offset="1" stopColor="#8fd14f" />
          </linearGradient>
          <linearGradient id="ggsC" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d94f1e" />
            <stop offset="0.5" stopColor="#f08a24" />
            <stop offset="1" stopColor="#f6c445" />
          </linearGradient>
          <linearGradient id="ggsD" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2b3a8f" />
            <stop offset="1" stopColor="#4369f0" />
          </linearGradient>
        </defs>
        <path d="M2 21h52L40 3H16z" fill="url(#ggsD)" />
        <path d="M5 18h46L39.5 6.5H17z" fill="url(#ggsC)" />
        <path d="M8 15h40L38.8 9.4H19z" fill="url(#ggsB)" />
        <path d="M11 12.2h34L38 11.5H19.6z" fill="url(#ggsA)" />
        <path d="M14 9.6h28L37.4 4.6H19.5z" fill="#1f3d6b" opacity=".9" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">GEO-GEOSYNTHETICS</span>
        <span className="logo__tag">ETUDES-INNOVATIONS-INGENIERIES</span>
      </span>
    </span>
  )
}
