/**
 * Jeu d'icônes en trait, repris des pictogrammes de la maquette.
 * Usage : <Icon name="phone" size={16} />
 */
const paths = {
  phone: <path d="M4 3h3l1.5 4-2 1.3a12 12 0 005.2 5.2l1.3-2 4 1.5v3a1.5 1.5 0 01-1.6 1.5A15.5 15.5 0 013 4.6 1.5 1.5 0 014.5 3z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5l7 5 7-5" />
    </>
  ),
  pin: (
    <>
      <path d="M10 18s6-5.2 6-9.4A6 6 0 004 8.6C4 12.8 10 18 10 18z" />
      <circle cx="10" cy="8.6" r="2.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l3 1.8" />
    </>
  ),
  search: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13.2 13.2L17 17" />
    </>
  ),
  filter: <path d="M3 4.5h14l-5.4 6.3v4.9l-3.2 1.8v-6.7z" />,
  arrowRight: (
    <>
      <path d="M3.5 10h12" />
      <path d="M11.5 5.8L15.7 10l-4.2 4.2" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M5.5 14.5l9-9" />
      <path d="M7.5 5.5h7v7" />
    </>
  ),
  chevronLeft: <path d="M12 4.5L6.5 10l5.5 5.5" />,
  chevronRight: <path d="M8 4.5l5.5 5.5L8 15.5" />,
  chevronDown: <path d="M4.5 7.5l5.5 5.5 5.5-5.5" />,
  check: <path d="M4.5 10.4l3.6 3.6 7.4-8" />,
  checkCircle: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M6.6 10.2l2.4 2.3 4.4-4.8" />
    </>
  ),
  shield: (
    <>
      <path d="M10 2.5l6 2.2v4.8c0 4-2.6 6.6-6 8-3.4-1.4-6-4-6-8V4.7z" />
      <path d="M7.3 10l1.9 1.9 3.6-3.9" />
    </>
  ),
  award: (
    <>
      <circle cx="10" cy="7.5" r="4.5" />
      <path d="M7 11.4L6 18l4-2 4 2-1-6.6" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="12" height="14" rx="1" />
      <path d="M7 6.5h2M11 6.5h2M7 10h2M11 10h2M8.5 17v-3h3v3" />
    </>
  ),
  users: (
    <>
      <circle cx="7.5" cy="7" r="2.7" />
      <path d="M2.8 16c0-2.6 2.1-4.3 4.7-4.3s4.7 1.7 4.7 4.3" />
      <path d="M13.5 5.2a2.6 2.6 0 010 5M14.5 11.9c1.7.5 2.8 1.9 2.8 4.1" />
    </>
  ),
  userSearch: (
    <>
      <circle cx="8" cy="6.8" r="2.8" />
      <path d="M2.8 16c0-2.8 2.3-4.6 5.2-4.6" />
      <circle cx="14" cy="13" r="2.6" />
      <path d="M15.9 14.9L18 17" />
    </>
  ),
  target: (
    <>
      <circle cx="10" cy="10" r="7.2" />
      <circle cx="10" cy="10" r="4" />
      <circle cx="10" cy="10" r="1.2" />
    </>
  ),
  bulb: (
    <>
      <path d="M7.3 13a4.8 4.8 0 115.4 0v1.8h-5.4z" />
      <path d="M8.4 17h3.2" />
    </>
  ),
  helmet: (
    <>
      <path d="M3 14.5h14" />
      <path d="M5 14.5V11a5 5 0 0110 0v3.5" />
      <path d="M8.5 6.4V4.2h3v2.2" />
    </>
  ),
  mountain: <path d="M2.5 16l5-9 3.2 5.4 1.8-2.6 5 6.2z" />,
  droplet: <path d="M10 2.8s5 5.4 5 8.6a5 5 0 11-10 0c0-3.2 5-8.6 5-8.6z" />,
  waves: (
    <>
      <path d="M2.5 7.5c2-2 3.5-2 5 0s3 2 5 0 3.5-2 5 0" />
      <path d="M2.5 11.5c2-2 3.5-2 5 0s3 2 5 0 3.5-2 5 0" />
      <path d="M2.5 15.5c2-2 3.5-2 5 0s3 2 5 0 3.5-2 5 0" />
    </>
  ),
  road: (
    <>
      <path d="M6 3.5L3.5 16.5M14 3.5l2.5 13" />
      <path d="M10 4v2.5M10 9v2.5M10 14v2.5" />
    </>
  ),
  train: (
    <>
      <rect x="5" y="3" width="10" height="10" rx="2" />
      <path d="M5 8.5h10M7 16.5l1.5-3M13 16.5L11.5 13.5" />
      <circle cx="7.6" cy="10.8" r=".7" fill="currentColor" />
      <circle cx="12.4" cy="10.8" r=".7" fill="currentColor" />
    </>
  ),
  alert: (
    <>
      <path d="M10 3.2L18 16.5H2z" />
      <path d="M10 8v3.6M10 13.8v.5" />
    </>
  ),
  wallet: (
    <>
      <rect x="2.8" y="5" width="14.4" height="10.5" rx="1.6" />
      <path d="M2.8 8.5h14.4" />
      <circle cx="13.6" cy="11.8" r=".9" fill="currentColor" />
    </>
  ),
  expand: (
    <>
      <path d="M12 4h4v4M16 4l-5 5" />
      <path d="M8 16H4v-4M4 16l5-5" />
    </>
  ),
  trending: (
    <>
      <path d="M3 13.5l4.5-4.5 3 3L17 5.5" />
      <path d="M13 5.5h4v4" />
    </>
  ),
  trendingDown: (
    <>
      <path d="M3 6.5l4.5 4.5 3-3L17 14.5" />
      <path d="M13 14.5h4v-4" />
    </>
  ),
  download: (
    <>
      <path d="M10 3v8.5" />
      <path d="M6.5 8.5L10 12l3.5-3.5" />
      <path d="M3.5 14v2.5h13V14" />
    </>
  ),
  upload: (
    <>
      <path d="M10 13V4.5" />
      <path d="M6.5 8L10 4.5 13.5 8" />
      <path d="M3.5 14v2.5h13V14" />
    </>
  ),
  file: (
    <>
      <path d="M5 2.5h6l4 4v11H5z" />
      <path d="M11 2.5v4h4" />
      <path d="M7.5 10h5M7.5 13h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="14" height="12" rx="1.4" />
      <path d="M3 8h14M7 2.8v3M13 2.8v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M2.8 10h14.4" />
      <path d="M10 2.7c2 2.2 3 4.7 3 7.3s-1 5.1-3 7.3c-2-2.2-3-4.7-3-7.3s1-5.1 3-7.3z" />
    </>
  ),
  layers: (
    <>
      <path d="M10 2.8L17.5 7 10 11.2 2.5 7z" />
      <path d="M2.5 11l7.5 4.2 7.5-4.2" />
    </>
  ),
  sparkle: <path d="M10 2.5l1.8 5.2 5.2 1.8-5.2 1.8L10 16.5l-1.8-5.2L3 9.5l5.2-1.8z" />,
  bolt: <path d="M11.5 2.5L5 11h4l-.5 6.5L15 9h-4z" />,
  question: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M8.1 8a2 2 0 113.1 1.9c-.7.5-1.2.9-1.2 1.8" />
      <path d="M10 14.3v.4" />
    </>
  ),
  home: (
    <>
      <path d="M3 9.2L10 3.5l7 5.7" />
      <path d="M4.8 10.6V17h10.4v-6.4" />
    </>
  ),
  send: <path d="M17.5 2.8L2.8 8.6l5.6 2.3 2.3 5.6z" />,
  plus: <path d="M10 4.5v11M4.5 10h11" />,
  menu: <path d="M3 5.5h14M3 10h14M3 14.5h14" />,
  close: <path d="M5 5l10 10M15 5L5 15" />,
  edit: (
    <>
      <path d="M13.2 3.6l3.2 3.2L7.6 15.6 3.6 16.4l.8-4z" />
    </>
  ),
  quote: <path d="M4 14.5c-1.3 0-2-1-2-2.4 0-2.6 1.6-5.2 4-6.6l.9 1.4C5.6 7.8 4.6 9 4.3 10.3c1.3 0 2.2.9 2.2 2.1S5.4 14.5 4 14.5zm7.8 0c-1.3 0-2-1-2-2.4 0-2.6 1.6-5.2 4-6.6l.9 1.4c-1.3.9-2.3 2.1-2.6 3.4 1.3 0 2.2.9 2.2 2.1s-1.1 2.1-2.5 2.1z" />,
}

export default function Icon({ name, size = 18, strokeWidth = 1.5, className = '', ...rest }) {
  const d = paths[name]
  if (!d) return null
  const filled = name === 'mountain' || name === 'droplet' || name === 'filter' ||
    name === 'sparkle' || name === 'bolt' || name === 'send' || name === 'quote'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {d}
    </svg>
  )
}
