/* =============================================================================
   Photothèque du site.

   Les visuels sont servis depuis `public/images/` : aucun appel réseau externe,
   ce qui sert l'exigence de performance (page d'accueil en moins de 3 secondes
   sur connexion mobile moyenne — cahier des charges § VII).

   Les photographies privilégient les contextes africains et camerounais :
   chantiers routiers, ouvrages d'art, équipes d'ingénierie et bureaux d'études
   du continent. Elles sont issues de banques libres de droits et restent des
   visuels de substitution : elles ont vocation à être remplacées par les
   photographies des ouvrages réalisés par Geo-Geosynthetics.
   ========================================================================== */

const img = (name) => `/images/${name}.webp`

/* Réservoirs thématiques — servent de repli pour les emplacements dérivés
   (galeries, vignettes, bandeaux) afin que chaque visuel reste cohérent. */
export const POOLS = {
  route: ['route-01', 'route-02', 'route-03', 'route-04', 'route-05', 'route-06',
          'route-07', 'route-08', 'route-09', 'route-10', 'route-11'],
  terrassement: ['terrassement-01', 'terrassement-02', 'route-02', 'route-11', 'route-05'],
  rail: ['rail-01', 'route-11', 'route-09', 'terrassement-01'],
  hydraulique: ['hydraulique-01', 'littoral-02', 'terrassement-02', 'environnement-03'],
  littoral: ['littoral-01', 'littoral-02', 'littoral-03', 'environnement-03'],
  environnement: ['environnement-01', 'environnement-02', 'environnement-03',
                  'environnement-04', 'environnement-05'],
  equipe: ['equipe-01', 'equipe-02', 'equipe-03', 'equipe-04', 'equipe-05', 'equipe-06',
           'equipe-07', 'equipe-08', 'equipe-09', 'equipe-10', 'equipe-11', 'equipe-12',
           'equipe-13', 'equipe-14', 'equipe-15'],
  bureau: ['bureau-01', 'bureau-02', 'bureau-03', 'bureau-04'],
  plans: ['plans-01', 'plans-02', 'plans-03', 'plans-04', 'plans-05'],
  materiau: ['materiau-01', 'route-11', 'terrassement-01'],
}

/* Affectation explicite : un emplacement du site -> une photographie. */
const MAP = {
  /* ---------------------------------------------------------- Accueil */
  'ggs-hero-home': 'route-11',
  'ggs-ingenieur-terrain': 'equipe-03',
  'ggs-why': 'equipe-06',
  'ggs-geogrille-stack': 'materiau-01',
  'ggs-m-sol': 'terrassement-01',
  'ggs-m-talus': 'route-06',
  'ggs-m-drain': 'terrassement-02',
  'ggs-m-env': 'environnement-01',
  'ggs-m-rail': 'rail-01',
  'ggs-m-route': 'route-01',

  /* ---------------------------------------------------------- À propos */
  'ggs-about-hero': 'route-07',
  'ggs-about-a': 'equipe-05',
  'ggs-about-b': 'equipe-12',
  'ggs-pillars-bg': 'bureau-02',
  'ggs-team-bg': 'bureau-03',
  'ggs-team-1': 'equipe-13',
  'ggs-team-2': 'equipe-07',
  'ggs-team-3': 'equipe-02',
  'ggs-team-4': 'equipe-14',

  /* ------------------------------------------------- Domaines : vignettes */
  'ggs-domains-hero': 'route-02',
  'ggs-route-1': 'route-01',
  'ggs-rail-1': 'rail-01',
  'ggs-sol-1': 'terrassement-01',
  'ggs-talus-1': 'route-06',
  'ggs-drain-1': 'terrassement-02',
  'ggs-hydro-1': 'hydraulique-01',
  'ggs-erosion-1': 'littoral-01',
  'ggs-stockage-1': 'environnement-01',
  'ggs-engagement': 'plans-03',
  'ggs-cta-split': 'equipe-09',

  /* ------------------------------------- Domaines : solutions et ressources */
  'ggs-geogrille': 'materiau-01',
  'ggs-geotextile': 'route-05',
  'ggs-enrobe': 'route-03',
  'ggs-ballast': 'rail-01',
  'ggs-souscouche': 'terrassement-02',
  'ggs-plateforme': 'route-11',
  'ggs-matelas': 'terrassement-01',
  'ggs-remblai': 'route-04',
  'ggs-plateforme-travail': 'route-02',
  'ggs-massif': 'route-06',
  'ggs-vegetal': 'littoral-03',
  'ggs-confortement': 'terrassement-01',
  'ggs-geocomposite': 'terrassement-02',
  'ggs-filtration': 'environnement-03',
  'ggs-drain-parement': 'route-05',
  'ggs-etancheite': 'hydraulique-01',
  'ggs-matelas-beton': 'littoral-02',
  'ggs-bentonite': 'environnement-04',
  'ggs-natte': 'littoral-03',
  'ggs-conteneur': 'littoral-01',
  'ggs-berge': 'littoral-02',
  'ggs-barriere': 'environnement-01',
  'ggs-lixiviat': 'environnement-02',
  'ggs-couverture': 'environnement-05',
  'ggs-guide-plans': 'plans-01',
  'ggs-guide-rail': 'plans-02',
  'ggs-guide-sol': 'plans-04',
  'ggs-guide-talus': 'plans-05',
  'ggs-guide-drain': 'plans-03',
  'ggs-guide-hydro': 'plans-01',
  'ggs-guide-erosion': 'plans-02',
  'ggs-guide-stockage': 'plans-04',
  'ggs-route-ref': 'route-03',
  'ggs-rail-ref': 'rail-01',
  'ggs-sol-ref': 'route-11',
  'ggs-talus-ref': 'route-06',
  'ggs-drain-ref': 'terrassement-02',
  'ggs-hydro-ref': 'hydraulique-01',
  'ggs-erosion-ref': 'littoral-01',
  'ggs-stockage-ref': 'environnement-03',

  /* -------------------------------------------------------- Références */
  'ggs-refs-hero': 'route-09',
  'ggs-portfolio-bg': 'route-08',
  'ggs-refs-cta': 'equipe-08',
  'ggs-littoral': 'littoral-01',
  'ggs-proj-1': 'route-01',
  'ggs-proj-2': 'route-06',
  'ggs-proj-3': 'hydraulique-01',
  'ggs-proj-4': 'environnement-01',
  'ggs-proj-5': 'route-03',
  'ggs-proj-6': 'littoral-02',
  'ggs-voie-express': 'route-04',
  'ggs-others-bg': 'bureau-01',
  'ggs-other-1': 'route-10',
  'ggs-other-2': 'terrassement-02',
  'ggs-other-3': 'route-09',

  /* ---------------------------------------------------------- Contact */
  'ggs-contact-hero': 'route-10',
  'ggs-confirm-bg': 'equipe-01',
}

/* Thème déduit du nom de l'emplacement, pour les visuels dérivés. */
const THEME_HINTS = [
  [/talus|massif|remblai|confortement/, 'route'],
  [/route|voie|enrobe|chaussee|proj-1|proj-5/, 'route'],
  [/rail|ballast|ferroviaire/, 'rail'],
  [/sol|terrassement|plateforme|matelas(?!-beton)/, 'terrassement'],
  [/hydro|etancheite|drain|geocomposite|souscouche/, 'hydraulique'],
  [/littoral|erosion|berge|natte|conteneur|beton/, 'littoral'],
  [/stockage|environnement|barriere|lixiviat|couverture|bentonite/, 'environnement'],
  [/team|equipe|why|ingenieur|cta|confirm/, 'equipe'],
  [/bureau|pillars|others|portfolio/, 'bureau'],
  [/guide|plans|engagement/, 'plans'],
  [/geogrille|geotextile|materiau/, 'materiau'],
]

/* Hachage stable : un même emplacement renvoie toujours la même photo. */
const hash = (s) => {
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/**
 * Renvoie le chemin de la photographie associée à un emplacement.
 * Les emplacements dérivés (`…-mini`, `…-g3`, `…-before`) héritent du thème de
 * leur emplacement racine et reçoivent une variante stable du même réservoir.
 */
export function resolveImage(seed = '') {
  if (MAP[seed]) return img(MAP[seed])

  /* Emplacement dérivé : on retrouve la racine connue. */
  const base = Object.keys(MAP).find((key) => seed.startsWith(`${key}-`))
  const theme = THEME_HINTS.find(([re]) => re.test(seed))?.[1]
  const pool = POOLS[theme] ?? (base ? [MAP[base], ...POOLS.route] : POOLS.route)

  return img(pool[hash(seed) % pool.length])
}

export default resolveImage
