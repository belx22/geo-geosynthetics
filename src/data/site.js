/* =============================================================================
   Contenus du site — repris de la maquette Visily.
   Les valeurs techniques sont indicatives : toute valeur publiée est à faire
   valider par l'équipe d'étude (cahier des charges § IV et § VIII).
   ========================================================================== */

export const SITE = {
  name: 'Geo-Geosynthetics',
  baseline: 'Études · Innovations · Ingénieries',
  address: 'St Marie Damas',
  phone: '+237 6 58 37 68 53',
  phoneHref: '+237658376853',
  email: 'contact@geo-geosynthetics.fr',
  hours: 'Lundi – Vendredi : 8h30 – 18h30',
}

/* ---------------------------------------------------------------- Domaines */

export const DOMAINS = [
  {
    slug: 'routes-et-voiries',
    title: 'Routes et voiries',
    family: 'Transport',
    icon: 'road',
    seed: 'ggs-route-1',
    excerpt:
      'Optimisation des structures de chaussées pour supporter des trafics intenses et réduire les coûts de maintenance.',
    heroLead: 'Des chaussées plus durables, même sur les sols les plus difficiles.',
    intro:
      'La construction routière est confrontée à des défis géotechniques majeurs qui compromettent la durabilité des infrastructures et augmentent les budgets de maintenance.',
    solutionsIntro:
      'Geo-Geosynthetics propose des systèmes de renforcement et de séparation étudiés pour optimiser chaque couche de la structure de chaussée.',
    issues: [
      {
        icon: 'mountain',
        title: 'Sols de faible portance',
        text: 'Instabilité structurelle nécessitant des fondations profondes ou des volumes de terrassement massifs.',
      },
      {
        icon: 'alert',
        title: 'Orniérage et fissuration',
        text: "Dégradations prématurées sous l'effet du trafic lourd et des variations climatiques extrêmes.",
      },
      {
        icon: 'wallet',
        title: "Coûts d'entretien élevés",
        text: 'Cycles de maintenance fréquents pesant lourdement sur les budgets publics et privés.',
      },
    ],
    solutions: [
      {
        title: 'Renforcement par géogrilles',
        text: "Augmentation de la capacité portante du sol support et réduction de l'épaisseur des couches granulaires.",
        perks: ['Économie de matériaux', 'Stabilité long terme'],
        seed: 'ggs-geogrille',
      },
      {
        title: 'Séparation et filtration par géotextiles',
        text: "Maintien de l'intégrité des couches de la chaussée en empêchant la migration des fines.",
        perks: ['Drainage efficace', 'Pérennité structurelle'],
        seed: 'ggs-geotextile',
      },
      {
        title: 'Renforcement des enrobés',
        text: 'Utilisation de grilles en fibre de verre ou polyester pour retarder la remontée de fissures.',
        perks: ['Durée de vie x3', 'Réduction orniérage'],
        seed: 'ggs-enrobe',
      },
    ],
    benefits: [
      { icon: 'shield', label: 'Durée de vie prolongée' },
      { icon: 'trendingDown', label: 'Économie de matériaux' },
      { icon: 'trendingDown', label: 'Délais de chantier réduits' },
      { icon: 'wallet', label: 'Entretien limité' },
    ],
    guide: {
      title: 'Guide des solutions routières',
      text: "Consultez notre guide complet sur l'usage des géosynthétiques dans les infrastructures de transport : notes de calcul, retours d'expérience et spécifications produits.",
      seed: 'ggs-guide-plans',
    },
    showcase: {
      kpis: [
        { value: '45k m²', label: 'Géogrilles installées' },
        { value: '12 km', label: 'Linéaire traité' },
        { value: '−30%', label: 'Terrassement réduit' },
      ],
      seed: 'ggs-route-ref',
    },
    ctaTitle: 'Vous avez un projet routier ?',
  },
  {
    slug: 'ouvrages-ferroviaires',
    title: 'Ouvrages ferroviaires',
    family: 'Transport',
    icon: 'train',
    seed: 'ggs-rail-1',
    excerpt:
      "Stabilisation des couches d'assise et réduction des vibrations pour les lignes à grande vitesse.",
    heroLead: "Des voies stables, des couches d'assise qui durent.",
    intro:
      "Les sollicitations dynamiques répétées dégradent les couches d'assise et provoquent des tassements différentiels coûteux à reprendre en exploitation.",
    solutionsIntro:
      "Nos systèmes confinent le ballast, séparent les couches et répartissent les charges dynamiques sur l'ensemble de la plateforme.",
    issues: [
      { icon: 'mountain', title: 'Tassements différentiels', text: "Déformation de la plateforme sous charges répétées et perte de géométrie de la voie." },
      { icon: 'alert', title: 'Pollution du ballast', text: 'Remontée des fines du sol support qui réduit la capacité drainante du ballast.' },
      { icon: 'wallet', title: 'Interruptions de service', text: "Opérations de bourrage et de renouvellement fréquentes sur les lignes exploitées." },
    ],
    solutions: [
      { title: 'Confinement du ballast par géogrilles', text: "Blocage mécanique des granulats qui limite la déformation latérale sous charge.", perks: ['Géométrie préservée', 'Bourrage espacé'], seed: 'ggs-ballast' },
      { title: 'Séparation sous-couche', text: "Géotextile anticontaminant empêchant la migration des fines vers le ballast.", perks: ['Drainage maintenu', 'Durée de vie accrue'], seed: 'ggs-souscouche' },
      { title: 'Renforcement de plateforme', text: 'Répartition des charges dynamiques sur les sols compressibles en zone de remblai.', perks: ['Portance augmentée', 'Vibrations réduites'], seed: 'ggs-plateforme' },
    ],
    benefits: [
      { icon: 'shield', label: 'Géométrie de voie stable' },
      { icon: 'trendingDown', label: 'Maintenance réduite' },
      { icon: 'clock', label: "Disponibilité d'exploitation" },
      { icon: 'wallet', label: 'Coût global maîtrisé' },
    ],
    guide: { title: 'Guide des plateformes ferroviaires', text: "Dimensionnement des couches d'assise renforcées : hypothèses de calcul, essais et retours de chantier.", seed: 'ggs-guide-rail' },
    showcase: { kpis: [{ value: '28k m²', label: 'Surface traitée' }, { value: '9 km', label: 'Linéaire de voie' }, { value: '−40%', label: 'Bourrages évités' }], seed: 'ggs-rail-ref' },
    ctaTitle: 'Vous avez un projet ferroviaire ?',
  },
  {
    slug: 'stabilisation-des-sols',
    title: 'Stabilisation des sols',
    family: 'Géotechnique',
    icon: 'mountain',
    seed: 'ggs-sol-1',
    excerpt:
      "Renforcement mécanique des sols compressibles pour permettre l'édification d'ouvrages lourds.",
    heroLead: 'Construire lourd sur des sols qui ne le permettaient pas.',
    intro:
      "Les sols compressibles imposent souvent des solutions de fondation profondes, coûteuses et consommatrices de ressources.",
    solutionsIntro:
      "Nous dimensionnons des plateformes de transfert de charge et des remblais renforcés qui exploitent le sol en place plutôt que de le remplacer.",
    issues: [
      { icon: 'mountain', title: 'Sols compressibles', text: 'Tassements importants et différés incompatibles avec la durée de vie attendue.' },
      { icon: 'alert', title: 'Instabilité générale', text: 'Risque de rupture circulaire sous remblai de grande hauteur.' },
      { icon: 'wallet', title: 'Terrassements massifs', text: 'Substitution de sol coûteuse en matériaux, en transport et en émissions.' },
    ],
    solutions: [
      { title: 'Matelas de répartition sur inclusions', text: 'Plateforme de transfert de charge renforcée au-dessus des inclusions rigides.', perks: ['Tassement maîtrisé', 'Inclusions espacées'], seed: 'ggs-matelas' },
      { title: 'Remblais renforcés', text: 'Nappes de renforcement dimensionnées contre la rupture circulaire et le poinçonnement.', perks: ['Stabilité garantie', 'Hauteur accrue'], seed: 'ggs-remblai' },
      { title: 'Plateformes de travail', text: "Portance immédiate pour la circulation des engins de chantier sur sol mou.", perks: ['Accès sécurisé', 'Granulats économisés'], seed: 'ggs-plateforme-travail' },
    ],
    benefits: [
      { icon: 'shield', label: 'Fondations sécurisées' },
      { icon: 'trendingDown', label: 'Volume de déblai réduit' },
      { icon: 'clock', label: 'Délais raccourcis' },
      { icon: 'wallet', label: 'Coût de fondation réduit' },
    ],
    guide: { title: 'Guide du renforcement de sols', text: 'Méthodes de dimensionnement des matelas de répartition et des remblais sur sols compressibles.', seed: 'ggs-guide-sol' },
    showcase: { kpis: [{ value: '62k m²', label: 'Plateforme renforcée' }, { value: '4,5 m', label: 'Hauteur de remblai' }, { value: '−35%', label: 'Inclusions évitées' }], seed: 'ggs-sol-ref' },
    ctaTitle: 'Vous avez un projet de terrassement ?',
  },
  {
    slug: 'renforcement-de-talus-et-murs',
    title: 'Renforcement de talus et murs',
    family: 'Géotechnique',
    icon: 'mountain',
    seed: 'ggs-talus-1',
    excerpt:
      'Conception de massifs en sol renforcé par géogrilles pour des pentes raides et sécurisées.',
    heroLead: "Gagner de l'emprise sans renoncer à la stabilité.",
    intro:
      "Les murs de soutènement traditionnels mobilisent des emprises et des ouvrages en béton lourds, longs à mettre en œuvre.",
    solutionsIntro:
      'Les massifs en sol renforcé permettent des pentes raides, une mise en œuvre rapide et une intégration paysagère maîtrisée.',
    issues: [
      { icon: 'mountain', title: 'Emprise foncière limitée', text: 'Impossibilité de réaliser des talus à pente douce en zone contrainte.' },
      { icon: 'alert', title: 'Glissement de terrain', text: "Instabilité des pentes sous l'effet des pluies et de la saturation du sol." },
      { icon: 'wallet', title: 'Ouvrages béton coûteux', text: 'Fondations profondes et délais de réalisation importants.' },
    ],
    solutions: [
      { title: 'Massifs en sol renforcé', text: 'Nappes de géogrilles dimensionnées pour des parements raides jusqu’à la verticale.', perks: ['Emprise réduite', 'Mise en œuvre rapide'], seed: 'ggs-massif' },
      { title: 'Parements végétalisables', text: "Intégration paysagère par parement souple végétalisé en remplacement du béton.", perks: ['Insertion paysagère', 'Entretien limité'], seed: 'ggs-vegetal' },
      { title: 'Confortement de talus existants', text: 'Reprise de pentes instables par ancrage et renforcement de surface.', perks: ['Sans démolition', 'Chantier allégé'], seed: 'ggs-confortement' },
    ],
    benefits: [
      { icon: 'shield', label: 'Stabilité long terme' },
      { icon: 'expand', label: 'Gain de surface' },
      { icon: 'clock', label: 'Chantier accéléré' },
      { icon: 'wallet', label: 'Béton économisé' },
    ],
    guide: { title: 'Guide des massifs en sol renforcé', text: 'Hypothèses de calcul, vérifications internes et externes, dispositions constructives de parement.', seed: 'ggs-guide-talus' },
    showcase: { kpis: [{ value: '3 200 m²', label: 'Parement renforcé' }, { value: '11 m', label: 'Hauteur maximale' }, { value: '−45%', label: 'Emprise gagnée' }], seed: 'ggs-talus-ref' },
    ctaTitle: 'Vous avez un projet de soutènement ?',
  },
  {
    slug: 'systemes-de-drainage',
    title: 'Systèmes de drainage',
    family: 'Hydraulique',
    icon: 'droplet',
    seed: 'ggs-drain-1',
    excerpt:
      "Gestion des flux hydriques souterrains pour prévenir l'érosion interne et l'instabilité des structures.",
    heroLead: "Maîtriser l'eau avant qu'elle ne déstabilise l'ouvrage.",
    intro:
      "L'eau est la première cause de désordre des ouvrages en terre : érosion interne, sous-pressions et perte de portance.",
    solutionsIntro:
      'Nos géocomposites de drainage évacuent les flux et filtrent les particules fines sans colmatage dans le temps.',
    issues: [
      { icon: 'droplet', title: 'Sous-pressions', text: "Accumulation d'eau derrière les ouvrages et perte de stabilité." },
      { icon: 'alert', title: 'Érosion interne', text: 'Entraînement des particules fines et formation de renards hydrauliques.' },
      { icon: 'wallet', title: 'Granulats drainants rares', text: "Coût et disponibilité des matériaux drainants naturels sur certains territoires." },
    ],
    solutions: [
      { title: 'Géocomposites de drainage', text: 'Remplacement des couches granulaires drainantes par un complexe mince à forte capacité.', perks: ['Épaisseur réduite', 'Pose rapide'], seed: 'ggs-geocomposite' },
      { title: 'Filtration des sols fins', text: 'Géotextiles filtrants dimensionnés selon la granulométrie du sol à retenir.', perks: ['Anticolmatage', 'Durabilité'], seed: 'ggs-filtration' },
      { title: 'Drainage de parement', text: 'Évacuation des eaux derrière les soutènements et les culées d’ouvrage d’art.', perks: ['Sous-pressions évitées', 'Entretien limité'], seed: 'ggs-drain-parement' },
    ],
    benefits: [
      { icon: 'droplet', label: 'Flux maîtrisés' },
      { icon: 'shield', label: 'Ouvrage protégé' },
      { icon: 'trendingDown', label: 'Granulats économisés' },
      { icon: 'clock', label: 'Pose accélérée' },
    ],
    guide: { title: 'Guide du drainage géosynthétique', text: 'Dimensionnement hydraulique, critères de filtration et vérification du non-colmatage.', seed: 'ggs-guide-drain' },
    showcase: { kpis: [{ value: '18k m²', label: 'Drainage posé' }, { value: '2,4 km', label: 'Linéaire drainé' }, { value: '−50%', label: 'Granulats évités' }], seed: 'ggs-drain-ref' },
    ctaTitle: 'Vous avez un projet de drainage ?',
  },
  {
    slug: 'ouvrages-hydrauliques',
    title: 'Ouvrages hydrauliques',
    family: 'Hydraulique',
    icon: 'waves',
    seed: 'ggs-hydro-1',
    excerpt:
      'Étanchéité des bassins, canaux et barrages grâce à des barrières géomembranes de haute performance.',
    heroLead: "Retenir l'eau là où elle doit l'être.",
    intro:
      "Les pertes par infiltration compromettent le rendement des retenues et la sécurité des ouvrages hydrauliques.",
    solutionsIntro:
      "Nous dimensionnons des complexes d'étanchéité multicouches associant géomembrane, protection mécanique et drainage de contrôle.",
    issues: [
      { icon: 'droplet', title: 'Pertes par infiltration', text: 'Rendement de la retenue dégradé et nappe sous-jacente sollicitée.' },
      { icon: 'alert', title: 'Agressions mécaniques', text: 'Poinçonnement de la barrière par les granulats du support ou de la protection.' },
      { icon: 'waves', title: 'Batillage et érosion', text: 'Attaque répétée du parement par les vagues et les variations de niveau.' },
    ],
    solutions: [
      { title: 'Complexes d’étanchéité', text: 'Géomembrane associée à un géotextile anti-poinçonnement et à un drainage de contrôle.', perks: ['Étanchéité durable', 'Contrôle des fuites'], seed: 'ggs-etancheite' },
      { title: 'Matelas coffrants béton', text: 'Protection de berges et de lits de cours d’eau par matelas béton coffré sur site.', perks: ['Mise en œuvre immergée', 'Résistance au courant'], seed: 'ggs-matelas-beton' },
      { title: 'Géosynthétiques bentonitiques', text: "Barrière minérale souple s'auto-cicatrisant en cas de perforation ponctuelle.", perks: ['Auto-cicatrisation', 'Faible épaisseur'], seed: 'ggs-bentonite' },
    ],
    benefits: [
      { icon: 'droplet', label: 'Étanchéité garantie' },
      { icon: 'shield', label: 'Berges protégées' },
      { icon: 'clock', label: 'Mise en eau rapide' },
      { icon: 'wallet', label: 'Exploitation optimisée' },
    ],
    guide: { title: "Guide de l'étanchéité par géomembranes", text: 'Choix du complexe, dispositions de liaison et contrôle qualité des soudures.', seed: 'ggs-guide-hydro' },
    showcase: { kpis: [{ value: '34k m²', label: 'Géomembrane posée' }, { value: '120k m³', label: 'Volume retenu' }, { value: '50 ans', label: 'Durabilité estimée' }], seed: 'ggs-hydro-ref' },
    ctaTitle: 'Vous avez un projet hydraulique ?',
  },
  {
    slug: 'protection-contre-l-erosion',
    title: "Protection contre l'érosion",
    family: 'Environnement',
    icon: 'waves',
    seed: 'ggs-erosion-1',
    excerpt:
      'Solutions de végétalisation et de confinement pour la protection des berges et des littoraux.',
    heroLead: 'Fixer les sols, accompagner la végétation.',
    intro:
      "Le ruissellement, la houle et les crues emportent les sols de surface et déstabilisent progressivement les ouvrages.",
    solutionsIntro:
      "Nous associons des nattes anti-érosion, des conteneurs géotextiles et des solutions végétalisées adaptées au site.",
    issues: [
      { icon: 'waves', title: 'Érosion littorale', text: 'Recul du trait de côte et exposition des infrastructures côtières.' },
      { icon: 'droplet', title: 'Ravinement des talus', text: 'Entraînement de la terre végétale avant installation du couvert végétal.' },
      { icon: 'alert', title: 'Milieux sensibles', text: 'Interventions contraintes par la préservation des écosystèmes locaux.' },
    ],
    solutions: [
      { title: 'Nattes anti-érosion', text: "Maintien de la terre végétale le temps de l'enracinement du couvert végétal.", perks: ['Végétalisation rapide', 'Intégration paysagère'], seed: 'ggs-natte' },
      { title: 'Conteneurs géotextiles', text: 'Structures souples ensablées pour la défense côtière et la protection des berges.', perks: ['Matériau local', 'Démontable'], seed: 'ggs-conteneur' },
      { title: 'Protection de berges', text: 'Complexes filtrants sous enrochement ou sous matelas béton.', perks: ['Filtration assurée', 'Résistance au courant'], seed: 'ggs-berge' },
    ],
    benefits: [
      { icon: 'shield', label: 'Trait de côte sécurisé' },
      { icon: 'layers', label: 'Sols fixés' },
      { icon: 'globe', label: 'Impact réduit' },
      { icon: 'wallet', label: 'Matériaux locaux' },
    ],
    guide: { title: "Guide de la protection contre l'érosion", text: 'Critères de choix entre nattes, conteneurs et matelas selon la sollicitation hydraulique.', seed: 'ggs-guide-erosion' },
    showcase: { kpis: [{ value: '12 000 m³', label: 'Volume de sable' }, { value: '1,8 km', label: 'Littoral protégé' }, { value: '50 ans', label: 'Durabilité estimée' }], seed: 'ggs-erosion-ref' },
    ctaTitle: 'Vous avez un projet de protection ?',
  },
  {
    slug: 'centres-de-stockage',
    title: 'Centres de stockage',
    family: 'Environnement',
    icon: 'layers',
    seed: 'ggs-stockage-1',
    excerpt:
      'Confinement sécurisé des déchets et protection des nappes phréatiques par systèmes multicouches.',
    heroLead: 'Isoler durablement, protéger la ressource en eau.',
    intro:
      'Le stockage de déchets et la sécurisation des sols pollués imposent des barrières étanches contrôlables sur plusieurs décennies.',
    solutionsIntro:
      "Nos complexes de fond et de couverture associent barrière passive, géomembrane, drainage des lixiviats et protection mécanique.",
    issues: [
      { icon: 'droplet', title: 'Lixiviats', text: 'Risque de transfert vers la nappe en cas de défaut de la barrière.' },
      { icon: 'alert', title: 'Sols pollués', text: "Nécessité de confiner sur place sans excavation des terres contaminées." },
      { icon: 'wallet', title: 'Contrôle sur 30 ans', text: 'Obligation de suivi post-exploitation et de traçabilité des contrôles.' },
    ],
    solutions: [
      { title: 'Barrières de fond', text: 'Complexe multicouche associant géosynthétique bentonitique et géomembrane.', perks: ['Nappe protégée', 'Contrôle qualité'], seed: 'ggs-barriere' },
      { title: 'Drainage des lixiviats', text: 'Géocomposite drainant collectant les effluents vers le réseau de traitement.', perks: ['Collecte efficace', 'Anticolmatage'], seed: 'ggs-lixiviat' },
      { title: 'Couverture finale', text: 'Étanchéité de couverture, drainage des eaux pluviales et support de végétalisation.', perks: ['Réhabilitation', 'Entretien limité'], seed: 'ggs-couverture' },
    ],
    benefits: [
      { icon: 'shield', label: 'Confinement sécurisé' },
      { icon: 'droplet', label: 'Nappes protégées' },
      { icon: 'globe', label: 'Site réhabilité' },
      { icon: 'checkCircle', label: 'Conformité réglementaire' },
    ],
    guide: { title: 'Guide du confinement de sites', text: 'Composition des barrières, essais de réception et plan de contrôle post-exploitation.', seed: 'ggs-guide-stockage' },
    showcase: { kpis: [{ value: '52k m²', label: 'Barrière posée' }, { value: '6 ha', label: 'Site réhabilité' }, { value: '30 ans', label: 'Suivi assuré' }], seed: 'ggs-stockage-ref' },
    ctaTitle: 'Vous avez un projet environnemental ?',
  },
]

export const DOMAIN_FAMILIES = ['Tous', 'Transport', 'Géotechnique', 'Hydraulique', 'Environnement']

export const getDomain = (slug) => DOMAINS.find((d) => d.slug === slug)

/* -------------------------------------------------------------- Références */

export const PROJECT_FAMILIES = [
  'Tous',
  'Routes et voiries',
  'Géotechnique',
  'Hydraulique',
  'Environnement',
]

export const FEATURED_PROJECT = {
  slug: 'stabilisation-du-littoral',
  title: 'Stabilisation du littoral par structures souples',
  location: 'Région du Cap, Sénégal',
  seed: 'ggs-littoral',
  text: "Une solution d'ingénierie pionnière utilisant des tubes géosynthétiques de grand volume pour protéger les infrastructures côtières contre l'érosion marine agressive, tout en préservant l'écosystème local.",
  kpis: [
    { value: '12 000 m³', label: 'Volume de sable' },
    { value: '50 ans', label: 'Durabilité estimée' },
  ],
}

export const PROJECTS = [
  {
    slug: 'autoroute-de-contournement-nord',
    title: 'Autoroute de contournement Nord',
    family: 'Routes et voiries',
    location: 'Dakar, Sénégal',
    year: '2023',
    seed: 'ggs-proj-1',
    excerpt:
      'Renforcement de chaussée sur sol compressible par géogrilles haute performance pour limiter les tassements différentiels.',
  },
  {
    slug: 'stabilisation-de-talus-ferroviaire',
    title: 'Stabilisation de talus ferroviaire',
    family: 'Géotechnique',
    location: 'Libreville, Gabon',
    year: '2022',
    seed: 'ggs-proj-2',
    excerpt:
      "Conception de massifs en sol renforcé pour la sécurisation d'une voie ferrée stratégique en zone de forte pluviométrie.",
  },
  {
    slug: 'amenagement-du-bassin-de-retention',
    title: 'Aménagement du bassin de rétention',
    family: 'Hydraulique',
    location: "Abidjan, Côte d'Ivoire",
    year: '2023',
    seed: 'ggs-proj-3',
    excerpt:
      'Étanchéité par géomembranes PEHD et protection mécanique pour la gestion durable des eaux pluviales urbaines.',
  },
  {
    slug: 'confinement-de-site-industriel',
    title: 'Confinement de site industriel',
    family: 'Environnement',
    location: 'Lomé, Togo',
    year: '2021',
    seed: 'ggs-proj-4',
    excerpt:
      "Système multicouche d'étanchéité et de drainage pour la réhabilitation d'une décharge contrôlée.",
  },
  {
    slug: 'pont-de-l-emergence-acces',
    title: "Pont de l'Émergence – Accès",
    family: 'Routes et voiries',
    location: 'Yaoundé, Cameroun',
    year: '2022',
    seed: 'ggs-proj-5',
    excerpt:
      "Réduction des épaisseurs de couches d'assise grâce à la séparation géotextile sur un sol de faible portance.",
  },
  {
    slug: 'protection-cotiere-de-saint-louis',
    title: 'Protection côtière de Saint-Louis',
    family: 'Environnement',
    location: 'Saint-Louis, Sénégal',
    year: '2023',
    seed: 'ggs-proj-6',
    excerpt:
      "Ouvrages de défense contre l'érosion marine utilisant des conteneurs géosynthétiques ensablés.",
  },
]

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug)

/* Fiche détaillée (écran 6 de la maquette). */
export const PROJECT_DETAIL = {
  slug: 'amenagement-de-la-voie-express-ouest',
  title: 'Aménagement de la Voie Express Ouest',
  family: 'Routes et voiries',
  location: "Zone Littorale, Afrique de l'Ouest",
  seed: 'ggs-voie-express',
  meta: [
    { icon: 'building', label: "Maître d'ouvrage", value: 'Ministère des Infrastructures' },
    { icon: 'helmet', label: 'Domaine', value: 'Routes et voiries' },
    { icon: 'calendar', label: 'Année', value: '2023' },
    { icon: 'clock', label: 'Durée des travaux', value: '14 mois' },
    { icon: 'expand', label: 'Surface traitée', value: '85 000 m²' },
  ],
  storyTitle: 'Une ingénierie de précision pour un sol complexe',
  steps: [
    {
      title: 'Le contexte',
      text: "Le projet s'inscrit dans une zone de sols marécageux compressibles à très faible portance. La construction d'une voie express lourde nécessitait une solution capable de prévenir les tassements différentiels majeurs sans recourir à un remplacement de sol coûteux et écologiquement impactant.",
    },
    {
      title: 'Notre étude',
      text: "Nos ingénieurs ont réalisé une modélisation par éléments finis pour comparer différentes méthodes de renforcement. L'analyse a démontré que l'usage de géogrilles à haute rigidité permettrait de créer une plateforme rigide, réduisant de 40% l'épaisseur des couches granulaires de chaussée.",
    },
    {
      title: 'La solution retenue',
      text: "Installation d'un complexe multicouche : un géotextile de séparation non-tissé associé à une géogrille haute performance. Cette synergie garantit la stabilité structurelle à long terme et une filtration efficace des eaux de ruissellement.",
    },
  ],
  products: [
    { name: 'Géogrille de renforcement PVA', detail: 'Renforcement de plateforme — 55/30-20' },
    { name: 'Géotextile non-tissé', detail: 'Séparation et filtration technique' },
    { name: 'Géotextile tissé haute résistance', detail: 'Répartition des charges' },
  ],
  results: [
    { value: '65%', label: 'Tassement réduit' },
    { value: '30%', label: 'Économie matériaux' },
    { value: '50 ans', label: 'Garantie structurelle' },
  ],
  testimonial: {
    quote:
      "L'expertise technique de Geo-Geosynthetics a été déterminante pour la réussite de ce chantier stratégique. Leurs solutions ont permis non seulement de sécuriser l'ouvrage mais aussi de respecter des délais de livraison extrêmement serrés.",
    author: 'Dr. Ousmane Diop',
    role: 'Directeur des grands travaux – Ministère',
  },
  others: [
    { title: 'Autoroute A2 section Sud', location: 'Sénégal', seed: 'ggs-other-1', slug: 'autoroute-de-contournement-nord' },
    { title: 'Drainage urbain zone portuaire', location: "Côte d'Ivoire", seed: 'ggs-other-2', slug: 'amenagement-du-bassin-de-retention' },
    { title: "Stabilisation Pont de l'Unité", location: 'Cameroun', seed: 'ggs-other-3', slug: 'pont-de-l-emergence-acces' },
  ],
}

/* ------------------------------------------------------------------ Équipe */

export const TEAM = [
  { name: 'Kenfack Mongue Archange', role: 'Directeur technique', text: 'Expert en géotechnique avec plus de 15 ans d’expérience.', seed: 'ggs-team-1' },
  { name: 'Atangane Orlane', role: 'Chef de projet ingénierie', text: 'Spécialiste du renforcement de sols et soutènements complexes.', seed: 'ggs-team-2' },
  { name: 'Siapi Jean Bosco', role: "Ingénieur d'études", text: 'Dimensionnement technique et modélisation Eurocodes.', seed: 'ggs-team-3' },
  { name: 'Ekotto Nyitoueke Handy', role: 'Responsable qualité & environnement', text: 'Garante de la durabilité et du respect des normes environnementales.', seed: 'ggs-team-4' },
]

export const PHASES = [
  { no: 'Phase 01', icon: 'users', title: 'Écoute de votre besoin', text: "Identification précise des contraintes et des objectifs de votre projet d'ouvrage." },
  { no: 'Phase 02', icon: 'search', title: 'Diagnostic du site', text: 'Analyse approfondie des caractéristiques géotechniques et environnementales du terrain.' },
  { no: 'Phase 03', icon: 'bulb', title: 'Conception et dimensionnement', text: 'Élaboration de solutions sur mesure avec notes de calculs détaillées.' },
  { no: 'Phase 04', icon: 'helmet', title: 'Accompagnement sur le chantier', text: 'Suivi technique rigoureux pour garantir la conformité de la mise en œuvre.' },
]

export const PILLARS = [
  { icon: 'target', title: 'Études', text: 'Analyser chaque situation avec une rigueur absolue pour identifier les solutions les plus efficientes techniquement.' },
  { icon: 'bulb', title: 'Innovations', text: "Intégrer les dernières avancées en géosynthétiques pour réduire l'impact environnemental des chantiers." },
  { icon: 'helmet', title: 'Ingénieries', text: 'Accompagner la mise en œuvre sur le terrain pour garantir que chaque dimensionnement devient une réalité pérenne.' },
]

export const COMMITMENTS = [
  { icon: 'shield', title: 'Rigueur technique' },
  { icon: 'award', title: 'Respect des normes' },
  { icon: 'clock', title: 'Durabilité des ouvrages' },
  { icon: 'building', title: 'Maîtrise des coûts' },
]

/* -------------------------------------------------------------------- FAQ */

export const FAQ = [
  {
    q: 'Quels sont les délais habituels pour une note de calcul ?',
    a: "Pour les projets standards, nos ingénieurs remettent une note de calcul préliminaire sous 48 à 72 heures après réception de l'ensemble des données géotechniques.",
  },
  {
    q: 'Quelles informations dois-je fournir pour une étude ?',
    a: "Au minimum : la localisation du chantier, le type d'ouvrage envisagé, le rapport de sol s'il existe, les charges d'exploitation prévues et vos contraintes de délai. Un plan de masse, même sommaire, accélère considérablement l'étude.",
  },
  {
    q: 'Proposez-vous une assistance technique sur chantier ?',
    a: "Oui. Nos ingénieurs se déplacent pour la réception des supports, la formation des équipes de pose et le contrôle de conformité de la mise en œuvre, partout en Afrique.",
  },
  {
    q: 'Vos solutions sont-elles conformes aux normes européennes ?',
    a: "Nos dimensionnements sont établis selon les Eurocodes en vigueur. Les matériaux retenus disposent des certifications et marquages exigés, dont les justificatifs sont joints au dossier technique.",
  },
]

/* ------------------------------------------------- Formulaire d'étude (§ V) */

export const ORG_TYPES = [
  'Collectivité',
  'Ministère ou agence publique',
  'Entreprise publique',
  "Bureau d'études",
  'Entreprise de travaux',
  'Autre',
]

export const WORK_TYPES = [
  'Routes et voiries',
  'Ouvrages ferroviaires',
  'Terrassements et fondations',
  'Travaux hydrauliques',
  'Environnement et stockage',
  'Autre ou je ne sais pas',
]

export const PROJECT_STAGES = [
  'Étude préalable',
  'Avant-projet',
  'Projet / consultation',
  'Chantier en cours',
]
