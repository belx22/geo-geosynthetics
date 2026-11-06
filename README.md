# Geo-Geosynthetics — site vitrine (frontend React)

Reproduction en React des 8 écrans de la maquette `visily-multiscreens.pdf`,
conforme au `Cahier des charges GEO-GEOSYNTHESIS.pdf`.

**Frontend uniquement** : aucun back-office, aucune base de données, aucun envoi
de courriel réel.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle de production dans dist/
```

## Écrans

| Route | Écran de la maquette |
|---|---|
| `/` | 1 — Accueil |
| `/a-propos` | 2 — À propos |
| `/domaines-d-application` | 3 — Domaines d'application (liste + filtres) |
| `/domaines/:slug` | 4 — Fiche d'un domaine (8 domaines) |
| `/references` | 5 — Références (liste + filtres) |
| `/references/:slug` | 6 — Fiche d'une réalisation |
| `/demander-une-etude` | 7 — Formulaire de demande d'étude |
| `/demande-envoyee` | 8 — Confirmation d'envoi |

## Espace d'administration

Accessible sur **`/admin`**, hors navigation publique. Il couvre la réception,
le traitement et la réponse aux demandes d'étude.

| Route | Écran |
|---|---|
| `/admin` | Tableau de bord — indicateurs de pilotage (§ III, tableau 2) |
| `/admin/demandes` | Demandes reçues — filtres, recherche, tri, export CSV |
| `/admin/demandes/:ref` | Dossier d'une demande — traitement et réponse au demandeur |
| `/admin/contenus` | Pages, fiches de domaine, fiches de référence et documents |
| `/admin/contenus/:type/:id` | Édition d'un contenu — `nouveau` pour une création |

### Gestion des contenus (EF-14)

**Les modifications sont immédiatement visibles sur le site public.** Le site
lit ses contenus dans `src/data/contenuStore.js` ; dépublier une fiche la
retire du site, modifier un titre ou un visuel le change partout.

Quatre collections éditables, décrites dans `src/admin/contenuSchemas.js` —
ajouter un champ au site revient à l'ajouter à ce fichier :

| Collection | Champs paramétrables |
|---|---|
| **Pages** | titre, adresse, surtitre, titre affiché, accroche, image du bandeau, titre et description pour les moteurs de recherche |
| **Fiches de domaine** | nom, famille, pictogramme, visuel, résumé, enjeux, solutions (avec avantages et visuel), bénéfices, appel à l'action |
| **Fiches de référence** | nom, domaine, localisation, année, résumé, visuel |
| **Documents** | titre, domaine, langue, poids, date d'édition (métadonnées EF-10) |

Les enjeux, solutions et bénéfices sont des listes réordonnables : on ajoute,
déplace ou retire un élément sans toucher au code.

Chaque contenu s'enregistre **publié** ou **en brouillon**. L'identifiant
d'URL est dérivé du titre à la création puis figé, pour ne pas casser les
liens existants.

### Médiathèque

Un sélecteur de visuel accompagne chaque champ image : parcourir les
**48 photographies livrées** (classées par famille, avec recherche), ou
**importer une image depuis le poste**. Les imports sont redimensionnés à
1400 px et recompressés en WebP dans le navigateur avant enregistrement, pour
tenir la cible de performance (§ VII). Une jauge indique l'occupation du
stockage local.

Un contenu sans visuel choisi reçoit automatiquement une photographie
cohérente avec son thème.

### Le cycle d'une demande

1. Le visiteur envoie le formulaire public → la demande rejoint l'espace
   d'administration avec le statut **Nouvelle** (compteur dans la barre latérale).
2. L'équipe d'étude **qualifie** la situation : statut, attribution à un
   ingénieur, notes internes.
3. Elle **répond au demandeur par courriel** depuis le dossier : cinq modèles de
   réponse pré-rédigés (accusé de réception, demande de compléments, visite
   technique, transmission de la note de calcul, demande hors périmètre), objet
   et message modifiables.
4. L'envoi consigne la réponse au **journal du dossier**, horodate la première
   réponse (indicateur « délai de première réponse ») et fait passer le dossier
   en **Réponse envoyée**.

Statuts : Nouvelle → Qualifiée → Étude en cours → Réponse envoyée → Clôturée,
plus Sans suite. Le libellé accompagne toujours la couleur.

### Deux profils (§ I, module « Administration »)

| Profil | Accès |
|---|---|
| **Administrateur** | Contenus, demandes reçues, indicateurs, export |
| **Rédacteur** | Contenus uniquement — les demandes contiennent des données personnelles |

### Indicateurs du tableau 2

Les **8 lignes du tableau 2 sont couvertes**, chacune avec sa cible et sa
fréquence de relevé telles qu'inscrites au cahier des charges.

| Ligne du tableau 2 | Source | Cible | Fréquence |
|---|---|---|---|
| Nombre de demandes d'étude reçues | demandes | à définir | Mensuelle |
| Part émanant d'acheteurs publics | demandes | à définir | Trimestrielle |
| Délai de première réponse | demandes | à définir | Mensuelle |
| Taux de transformation des visites | statistiques | à définir | Mensuelle |
| Taux d'abandon du formulaire | statistiques | à définir | Mensuelle |
| Clics pour atteindre le formulaire | statistiques | 3 au maximum | À chaque version |
| Temps d'affichage de l'accueil (mobile) | statistiques | 3 secondes au plus | À chaque version |
| Nombre de documents téléchargés | statistiques | à définir | Mensuelle |

S'y ajoute une tuile **hors tableau 2**, utile au travail quotidien de l'équipe
d'étude : « en attente de qualification ».

Chaque tuile porte sa source. **Demandes** : calculé sur les demandes réelles.
**Statistiques** : alimenté par la mesure d'audience respectueuse de la vie
privée (EF-16) à brancher — les valeurs affichées sont des relevés d'exemple.

Les graphiques utilisent une teinte unique avec valeurs étiquetées (une seule
série : la couleur n'encode rien que la longueur ne dise déjà) et, pour la file
de traitement, une rampe ordinale bleue validée — clarté monotone, écarts
visibles, extrémité claire à 2,07:1 sur blanc.

## Charte graphique (§ VI du cahier des charges)

| Couleur | Code | Usage |
|---|---|---|
| Bleu ardoise | `#4A5970` | Titres, textes secondaires, filets, pied de page |
| Bleu vif | `#4369F0` | Boutons d'action, liens, éléments interactifs |
| Vert clair | `#AAD084` | Accents, surlignages, pictogrammes, fonds d'encarts |

Les trois couleurs sont déclarées en variables CSS dans
`src/styles/global.css` (`--ardoise`, `--bleu`, `--vert`), avec des déclinaisons
dérivées. Le vert officiel n'est jamais utilisé en fond de texte blanc
(contraste 1,7:1) : les textes verts sur blanc emploient `--vert-600`.

Typographie : deux polices, **Poppins** (titres) et **Inter** (texte courant).

## Exigences fonctionnelles couvertes côté frontend

- **EF-01** — le message « l'étude d'abord » est visible sans défilement en page d'accueil.
- **EF-02** — entrée par type d'ouvrage via la mosaïque des domaines.
- **EF-03** — chaque page de domaine présente la situation, les enjeux et les solutions possibles.
- **EF-04 / § IV** — modèle de fiche unique : nom, famille, fonction, applications, avantages, documents, encart étude.
- **EF-05** — aucun prix, panier ni bouton d'achat.
- **EF-06** — bouton de contact dans l'en-tête et bandeau « Demander une étude » en bas de chaque page (3 clics maximum).
- **EF-07 / § V** — formulaire reprenant les champs du tableau 9, avec un nombre limité de champs obligatoires.
- **EF-08** — confirmation à l'écran avec référence de demande (`/demande-envoyee`).
- **EF-11 / EF-12** — filtres par domaine et recherche simple sur les listes.

- **EF-14** — écrans de création, modification et dépublication des pages, fiches et documents.
- **EF-15** — consultation et export CSV des demandes reçues.
- **EF-16** — indicateurs de pilotage alimentés par les demandes et par la mesure d'audience.

## Points restant à la charge du back-office

- **Envoi serveur des courriels.** La réponse au demandeur ouvre la messagerie du
  poste (`mailto:`) et est consignée au dossier. L'envoi depuis le serveur,
  l'accusé de réception automatique et la notification de l'équipe d'étude
  (EF-08) restent à réaliser.
- **Authentification.** Le choix du profil à la connexion n'offre aucune
  protection : comptes protégés, contrôle d'accès et HTTPS relèvent du
  back-office (§ VII, sécurité).
- **Persistance.** Les demandes sont conservées dans le navigateur
  (`localStorage`) afin que le parcours complet soit démontrable. Seules les
  fonctions de `src/data/demandesStore.js` sont à brancher sur l'API : les
  écrans restent inchangés.
- **Édition des contenus.** Les contenus et les visuels importés sont
  enregistrés dans le navigateur. À brancher sur le système de gestion de
  contenu retenu (§ VI.4) : seules les fonctions de `contenuStore.js` et
  `mediaStore.js` changent, les écrans restent inchangés. Les visuels importés
  devront être déposés sur le serveur plutôt que dans le stockage local, dont
  la capacité (environ 5 Mo) n'autorise qu'une poignée d'images.
- **Contenus non encore éditables.** Les blocs internes des pages d'accueil et
  « à propos » — méthodologie, piliers, processus, équipe, engagements — restent
  dans le code. Seuls les paramètres de page (bandeau, visuel, référencement)
  sont réglables. Les rendre modifiables bloc par bloc relève du système de
  gestion de contenu.
- Protection anti-envois automatiques du formulaire public (EF-09).

## Photothèque

48 photographies servies en local depuis `public/images/` (WebP, 1400 px max,
**135 Ko en moyenne**, 6,3 Mo au total). Aucun appel réseau externe : la page
d'accueil reste sous la cible de 3 secondes sur connexion mobile (§ VII).

Les visuels privilégient les **contextes africains et camerounais** : chantiers
routiers et terrassements, échangeurs d'Abidjan, ouvrages ferroviaires,
ouvrages hydrauliques, littoraux, équipes d'ingénierie et bureaux d'études de
Lagos, Douala, Kaduna. Source : Pexels (licence libre, usage commercial
autorisé, attribution non obligatoire).

`src/data/images.js` associe chaque emplacement du site à une photographie
(711 emplacements → 46 photographies). Les emplacements dérivés — vignettes,
galeries, bandeaux — héritent du thème de leur emplacement racine via des
réservoirs thématiques (`route`, `terrassement`, `rail`, `hydraulique`,
`littoral`, `environnement`, `equipe`, `bureau`, `plans`, `materiau`).

**Pour changer une photo** : déposer le fichier dans `public/images/` et
modifier l'entrée correspondante dans `MAP` (`src/data/images.js`).

**Pour reconstruire la photothèque** :

```bash
./fetch-images.sh        # télécharge les JPEG sources
python optimize-images.py # convertit en WebP et optimise le poids
```

## À remplacer avant mise en ligne

- **Photographies** — les visuels actuels sont des photographies de
  substitution, cohérentes avec le contexte africain mais génériques. Elles ont
  vocation à être remplacées par les photographies des ouvrages réellement
  réalisés par Geo-Geosynthetics. Un dégradé ardoise sert de repli si une image
  manque : la mise en page reste identique.
- **Logo** — `src/components/Logo.jsx` est une reconstitution SVG. Le JPEG
  569×166 fourni est insuffisant en haute densité (§ VI) ; une version
  vectorielle est à intégrer.
- **Contenus du fabricant** — conformément au § VIII, les désignations employées
  sont génériques (géogrille, géotextile tissé…). Toute reprise de texte, de
  visuel ou de brochure HUESKER suppose une autorisation écrite préalable.
- **Valeurs techniques** — les chiffres repris de la maquette sont indicatifs et
  doivent être validés par l'équipe d'étude avant publication.

## Structure

```
public/images/    48 photographies WebP
src/
  components/     Header, Footer, CtaBand, PageHero, Logo, Icon, Photo
  data/site.js    Tous les contenus (domaines, références, équipe, FAQ, formulaire)
  data/images.js  Association emplacement -> photographie
  pages/          Un fichier par écran
  styles/         global.css — design system complet
fetch-images.sh     Reconstruction de la photothèque (téléchargement)
optimize-images.py  Conversion WebP et optimisation du poids
```
