import { DOMAIN_FAMILIES, PROJECT_FAMILIES, WORK_TYPES } from '../data/site.js'

/* =============================================================================
   Description des contenus éditables.

   Chaque collection déclare ses champs ; l'éditeur se construit à partir de
   cette description. Ajouter un champ au site revient à l'ajouter ici.

   Types de champ : texte, zone, choix, image, liste (sous-formulaire répétable),
   mots (liste de courtes chaînes).
   ========================================================================== */

const ICONES = [
  'road', 'train', 'mountain', 'droplet', 'waves', 'layers', 'shield', 'alert',
  'wallet', 'clock', 'expand', 'trending', 'trendingDown', 'checkCircle',
  'globe', 'helmet', 'target', 'bulb', 'building',
]

export const SCHEMAS = {
  pages: {
    singulier: 'page',
    pluriel: 'Pages du site',
    cle: 'id',
    nouveau: () => ({
      id: '', title: '', path: '/', seoTitle: '', seoDescription: '',
      heroEyebrow: '', heroTitle: '', heroLead: '', heroImage: '',
      published: false,
    }),
    groupes: [
      {
        titre: 'Identification',
        champs: [
          { nom: 'title', label: 'Titre de la page', type: 'texte', requis: true, aide: 'Apparaît dans le menu et le fil d’Ariane.' },
          { nom: 'path', label: 'Adresse (URL)', type: 'texte', requis: true, aide: 'Doit commencer par une barre oblique, par exemple /glossaire.' },
        ],
      },
      {
        titre: 'Bandeau de la page',
        champs: [
          { nom: 'heroEyebrow', label: 'Surtitre', type: 'texte', aide: 'Courte mention au-dessus du titre, en capitales.' },
          { nom: 'heroTitle', label: 'Titre affiché', type: 'texte', aide: 'Laisser vide pour reprendre le titre de la page.' },
          { nom: 'heroLead', label: 'Accroche', type: 'zone', aide: 'Une à deux phrases, en langage simple.' },
          { nom: 'heroImage', label: 'Image du bandeau', type: 'image' },
        ],
      },
      {
        titre: 'Référencement naturel',
        champs: [
          { nom: 'seoTitle', label: 'Titre pour les moteurs de recherche', type: 'texte', aide: '60 caractères environ.' },
          { nom: 'seoDescription', label: 'Description', type: 'zone', aide: '150 à 160 caractères environ.' },
        ],
      },
    ],
  },

  domaines: {
    singulier: 'fiche de domaine',
    pluriel: 'Fiches de domaine',
    cle: 'slug',
    nouveau: () => ({
      slug: '', title: '', family: 'Transport', icon: 'mountain', image: '',
      excerpt: '', heroLead: '', intro: '', solutionsIntro: '',
      issues: [], solutions: [], benefits: [],
      guide: { title: '', text: '', seed: 'ggs-guide-plans' },
      showcase: { kpis: [], seed: 'ggs-route-ref' },
      ctaTitle: "Vous avez un projet d'ouvrage ?",
      published: false,
    }),
    groupes: [
      {
        titre: 'Identification',
        champs: [
          { nom: 'title', label: 'Nom du domaine', type: 'texte', requis: true },
          { nom: 'family', label: "Famille", type: 'choix', options: DOMAIN_FAMILIES.filter((f) => f !== 'Tous'), requis: true },
          { nom: 'icon', label: 'Pictogramme', type: 'choix', options: ICONES },
          { nom: 'image', label: 'Visuel principal', type: 'image' },
        ],
      },
      {
        titre: 'Présentation',
        champs: [
          { nom: 'excerpt', label: 'Résumé (liste des domaines)', type: 'zone', requis: true, aide: 'Une phrase affichée sur la carte du domaine.' },
          { nom: 'heroLead', label: 'Accroche du bandeau', type: 'texte' },
          { nom: 'intro', label: 'Les enjeux', type: 'zone', aide: 'Décrit la situation rencontrée, en langage simple.' },
          { nom: 'solutionsIntro', label: 'Introduction aux solutions', type: 'zone' },
          { nom: 'ctaTitle', label: "Titre de l'appel à l'action", type: 'texte' },
        ],
      },
      {
        titre: 'Défis techniques',
        aide: 'Trois enjeux affichés en haut de la fiche.',
        champs: [
          {
            nom: 'issues', label: 'Enjeux', type: 'liste', libelleItem: 'enjeu',
            modele: { icon: 'alert', title: '', text: '' },
            sous: [
              { nom: 'icon', label: 'Pictogramme', type: 'choix', options: ICONES },
              { nom: 'title', label: 'Titre', type: 'texte' },
              { nom: 'text', label: 'Description', type: 'zone' },
            ],
          },
        ],
      },
      {
        titre: 'Solutions proposées',
        aide: 'Chaque solution est présentée comme un résultat possible de l’étude — jamais comme un produit à vendre (§ IV).',
        champs: [
          {
            nom: 'solutions', label: 'Solutions', type: 'liste', libelleItem: 'solution',
            modele: { title: '', text: '', perks: [], seed: 'ggs-geogrille', image: '' },
            sous: [
              { nom: 'title', label: 'Nom de la solution', type: 'texte' },
              { nom: 'text', label: 'Ce qu’elle permet', type: 'zone' },
              { nom: 'perks', label: 'Avantages', type: 'mots', aide: 'Deux à cinq avantages, en langage simple.' },
              { nom: 'image', label: 'Visuel', type: 'image' },
            ],
          },
        ],
      },
      {
        titre: 'Bénéfices',
        champs: [
          {
            nom: 'benefits', label: 'Bénéfices', type: 'liste', libelleItem: 'bénéfice',
            modele: { icon: 'shield', label: '' },
            sous: [
              { nom: 'icon', label: 'Pictogramme', type: 'choix', options: ICONES },
              { nom: 'label', label: 'Libellé', type: 'texte' },
            ],
          },
        ],
      },
    ],
  },

  projets: {
    singulier: 'fiche de référence',
    pluriel: 'Fiches de référence',
    cle: 'slug',
    nouveau: () => ({
      slug: '', title: '', family: 'Routes et voiries', location: '', year: '',
      excerpt: '', image: '', published: false,
    }),
    groupes: [
      {
        titre: 'Le projet',
        champs: [
          { nom: 'title', label: 'Nom du projet', type: 'texte', requis: true },
          { nom: 'family', label: 'Domaine', type: 'choix', options: PROJECT_FAMILIES.filter((f) => f !== 'Tous'), requis: true },
          { nom: 'location', label: 'Localisation', type: 'texte', requis: true, aide: 'Ville, pays — par exemple « Douala, Cameroun ».' },
          { nom: 'year', label: 'Année', type: 'texte' },
          { nom: 'excerpt', label: 'Résumé', type: 'zone', requis: true, aide: 'Contexte, solution retenue, résultat.' },
          { nom: 'image', label: 'Visuel du projet', type: 'image' },
        ],
      },
    ],
  },

  documents: {
    singulier: 'document',
    pluriel: 'Documents téléchargeables',
    cle: 'id',
    nouveau: () => ({
      id: '', title: '', domain: 'Routes et voiries', lang: 'Français',
      size: '', date: '', published: false,
    }),
    groupes: [
      {
        titre: 'Le document',
        aide: 'Titre, domaine, langue, poids et date d’édition sont affichés au visiteur avant téléchargement (EF-10).',
        champs: [
          { nom: 'title', label: 'Titre du document', type: 'texte', requis: true },
          { nom: 'domain', label: 'Domaine', type: 'choix', options: WORK_TYPES, requis: true },
          { nom: 'lang', label: 'Langue', type: 'choix', options: ['Français', 'Anglais'], requis: true },
          { nom: 'size', label: 'Poids du fichier', type: 'texte', requis: true, aide: 'Par exemple « 2,4 Mo ».' },
          { nom: 'date', label: "Date d'édition", type: 'texte', requis: true, aide: 'Par exemple « 02/2026 ».' },
        ],
      },
    ],
  },
}

export const COLLECTIONS = Object.keys(SCHEMAS)
