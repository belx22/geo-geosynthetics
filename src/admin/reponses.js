/* =============================================================================
   Modèles de réponse au demandeur.

   Le vocabulaire respecte le positionnement arrêté au cahier des charges
   (§ IV) : « étude », « dimensionnement », « solution », « situation ».
   Aucun modèle ne mentionne de prix ni de commande.
   ========================================================================== */

import { SITE } from '../data/site.js'

const signature = (author) => `
Cordialement,

${author}
Geo-Geosynthetics — Études, Innovations, Ingénieries
${SITE.phone} · ${SITE.email}`

export const TEMPLATES = [
  {
    id: 'accuse',
    label: 'Accusé de réception',
    subject: (d) => `Votre demande d'étude ${d.id} — Geo-Geosynthetics`,
    body: (d, author) => `Bonjour ${d.name},

Nous avons bien reçu votre demande d'étude concernant votre projet à ${d.city} (${d.country}), enregistrée sous la référence ${d.id}.

Votre situation est en cours d'analyse par notre équipe d'étude. Nous revenons vers vous avec une première lecture technique et, le cas échéant, les compléments dont nous aurions besoin pour dimensionner la solution adaptée.
${signature(author)}`,
  },
  {
    id: 'complements',
    label: 'Demande de compléments techniques',
    subject: (d) => `Compléments nécessaires — demande d'étude ${d.id}`,
    body: (d, author) => `Bonjour ${d.name},

Merci pour votre demande ${d.id} relative à votre projet « ${d.workType} » à ${d.city}.

Afin de dimensionner précisément la solution, nous aurions besoin des éléments suivants :

- le rapport de sol (G2 ou équivalent) s'il est disponible ;
- les charges d'exploitation retenues ;
- un plan de masse ou un profil en long, même sommaire ;
- le niveau de la nappe et les conditions hydrauliques connues.

Dès réception, notre équipe d'étude vous transmet une première note de calcul.
${signature(author)}`,
  },
  {
    id: 'visite',
    label: 'Proposition de visite technique',
    subject: (d) => `Visite technique — demande d'étude ${d.id}`,
    body: (d, author) => `Bonjour ${d.name},

Après analyse de votre demande ${d.id}, nous proposons une visite technique sur votre site de ${d.city} afin de relever les contraintes réelles du terrain avant tout dimensionnement.

Cette visite nous permet de vérifier la nature du sol, les accès, les conditions hydrauliques et les contraintes d'exploitation. Elle est incluse dans notre démarche d'étude.

Pouvez-vous nous indiquer deux créneaux qui vous conviendraient ?
${signature(author)}`,
  },
  {
    id: 'note-calcul',
    label: 'Transmission de la note de calcul',
    subject: (d) => `Note de calcul — demande d'étude ${d.id}`,
    body: (d, author) => `Bonjour ${d.name},

Vous trouverez ci-joint la note de calcul établie pour votre projet « ${d.workType} » à ${d.city}, référence ${d.id}.

Le dossier précise les hypothèses retenues, les vérifications conduites selon les Eurocodes et la solution recommandée, ainsi que les dispositions constructives à prévoir à la mise en œuvre.

Les valeurs indiquées résultent de l'étude de votre situation : toute évolution des hypothèses (charges, sol, niveau d'eau) nécessiterait une reprise du dimensionnement. Nous restons disponibles pour en échanger.
${signature(author)}`,
  },
  {
    id: 'hors-perimetre',
    label: 'Demande hors périmètre',
    subject: (d) => `Votre demande ${d.id} — Geo-Geosynthetics`,
    body: (d, author) => `Bonjour ${d.name},

Nous avons bien reçu votre demande ${d.id}.

Geo-Geosynthetics est un bureau d'études : nous étudions la situation d'un ouvrage puis dimensionnons la solution géosynthétique adaptée. Nous ne commercialisons pas de produit et ne sommes donc pas en mesure de répondre à une demande de tarif ou de fourniture.

Si votre projet nécessite une étude technique — portance, stabilité, drainage, étanchéité — nous restons à votre disposition pour en étudier les contraintes.
${signature(author)}`,
  },
]

export const getTemplate = (id) => TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]
