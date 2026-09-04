import type { AboutContent, LegalPage, Product, SiteSettings } from "./types";

/**
 * Données de démonstration servies tant qu'aucun projet Sanity n'est configuré.
 * Tous les textes et images sont provisoires et destinés à être remplacés.
 */

const care =
  "Lavez la planche à la main, à l'eau tiède savonneuse, puis séchez-la aussitôt à plat. " +
  "Nourrissez le bois une fois par mois avec une huile alimentaire (huile de lin cuite ou huile minérale de qualité alimentaire). " +
  "Ne la passez jamais au lave-vaisselle et ne la laissez pas tremper.";

export const placeholderProducts: Product[] = [
  {
    id: "planche-bistrot",
    slug: "planche-bistrot-chene",
    title: "Planche Bistrot — Chêne",
    price: 69,
    images: [
      { url: "/placeholders/board-oak.svg", alt: "Planche Bistrot en chêne, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Bistrot en situation dans l'atelier" },
    ],
    shortDescription:
      "La planche du quotidien : format rectangulaire, chêne massif huilé, une prise en main facile.",
    description: [
      {
        style: "normal",
        text:
          "Taillée dans une planche de chêne français massif, la Bistrot accompagne tous les gestes de la cuisine : pain du matin, herbes, fromages, découpe des légumes.",
      },
      {
        style: "normal",
        text:
          "Chaque pièce est rabotée, poncée à la main en plusieurs passes puis nourrie à l'huile de lin. Le fil du bois et les nuances sont uniques à chaque planche.",
      },
    ],
    dimensions: "40 × 25 × 3 cm",
    woodEssence: "Chêne massif (France)",
    care,
    inStock: true,
    featured: true,
  },
  {
    id: "planche-service",
    slug: "planche-service-noyer",
    title: "Planche de Service — Noyer",
    price: 95,
    images: [
      { url: "/placeholders/board-walnut.svg", alt: "Planche de Service en noyer, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche de Service en noyer en situation" },
    ],
    shortDescription:
      "Grand plateau en noyer avec rigole périphérique, pensé pour la découpe des viandes et le service à table.",
    description: [
      {
        style: "normal",
        text:
          "Le noyer, dense et sombre, apporte une vraie présence sur la table. La rigole recueille les jus lors de la découpe d'un rôti ou d'une volaille.",
      },
      {
        style: "normal",
        text:
          "Les poignées latérales sont sculptées dans la masse pour soulever le plateau d'une seule main, même chargé.",
      },
    ],
    dimensions: "45 × 30 × 3 cm",
    woodEssence: "Noyer massif",
    care,
    inStock: true,
    featured: true,
  },
  {
    id: "planche-apero",
    slug: "planche-apero-merisier",
    title: "Planche Apéro — Merisier",
    price: 42,
    images: [
      { url: "/placeholders/board-cherry.svg", alt: "Planche Apéro en merisier, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Apéro en merisier en situation" },
    ],
    shortDescription:
      "Petit format nomade en merisier, avec trou de suspension. Parfaite pour un apéritif à deux.",
    description: [
      {
        style: "normal",
        text:
          "Le merisier prend une teinte miel qui se patine joliment avec le temps. Ce petit modèle se glisse partout et se suspend à la cuisine.",
      },
    ],
    dimensions: "30 × 18 × 2 cm",
    woodEssence: "Merisier massif",
    care,
    inStock: true,
    featured: true,
  },
  {
    id: "planche-comtoise",
    slug: "planche-comtoise-olivier",
    title: "Planche Comtoise — Olivier",
    price: 120,
    images: [
      { url: "/placeholders/board-olive.svg", alt: "Planche Comtoise en olivier, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Comtoise en olivier en situation" },
    ],
    shortDescription:
      "Pièce d'exception au veinage spectaculaire de l'olivier. Chaque planche est unique.",
    description: [
      {
        style: "normal",
        text:
          "L'olivier offre un dessin de fibres très contrasté, presque graphique. Le bois est dur, dense, idéal pour une planche qui traverse les années.",
      },
      {
        style: "normal",
        text:
          "Disponibilité limitée : l'olivier de cette qualité s'achète par petits lots, au gré des trouvailles.",
      },
    ],
    dimensions: "38 × 22 × 2,5 cm",
    woodEssence: "Olivier massif",
    care,
    inStock: false,
    featured: false,
  },
  {
    id: "planche-quotidienne",
    slug: "planche-quotidienne-hetre",
    title: "Planche Quotidienne — Hêtre",
    price: 49,
    images: [
      { url: "/placeholders/board-beech.svg", alt: "Planche Quotidienne en hêtre, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Quotidienne en hêtre en situation" },
    ],
    shortDescription:
      "Le hêtre clair, robuste et sobre. Un format passe-partout à prix doux pour équiper la cuisine.",
    description: [
      {
        style: "normal",
        text:
          "Le hêtre est le bois de référence pour la découpe : fibres serrées, surface homogène, respectueuse du tranchant des couteaux.",
      },
    ],
    dimensions: "35 × 22 × 2,5 cm",
    woodEssence: "Hêtre massif",
    care,
    inStock: true,
    featured: false,
  },
  {
    id: "planche-grande-tablee",
    slug: "planche-grande-tablee-chene",
    title: "Planche Grande Tablée — Chêne",
    price: 135,
    images: [
      { url: "/placeholders/board-oak.svg", alt: "Planche Grande Tablée en chêne, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Grande Tablée en chêne en situation" },
    ],
    shortDescription:
      "Très grand plateau en chêne pour les planches à partager, les grandes tablées et les buffets.",
    description: [
      {
        style: "normal",
        text:
          "Un format généreux qui devient la pièce centrale d'un repas : charcuteries, fromages, fruits, pains. Épaisseur renforcée pour ne pas voiler.",
      },
    ],
    dimensions: "55 × 32 × 3,5 cm",
    woodEssence: "Chêne massif (France)",
    care,
    inStock: true,
    featured: false,
  },
];

export const placeholderSettings: SiteSettings = {
  companyName: "Ma belle planche",
  legalStatus: "Entreprise individuelle (auto-entrepreneur) — [à compléter]",
  siret: "[SIRET à compléter]",
  address: "[Adresse de l'atelier à compléter], France",
  hostingInfo:
    "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com",
  contactEmail: "contact@mabelleplanche.fr",
  notificationEmail: "contact@mabelleplanche.fr",
  instagramUrl: "https://instagram.com/mabelleplanche",
  tiktokUrl: "https://tiktok.com/@mabelleplanche",
  shipping: {
    label: "Livraison France (Colissimo suivi)",
    amount: 8.9,
    freeThreshold: 150,
  },
  workshopImageUrl: "/placeholders/atelier.svg",
};

export const placeholderAbout: AboutContent = {
  title: "L'atelier Ma belle planche",
  intro:
    "Des planches à découper en bois massif, dessinées et fabriquées à la main, une par une, dans un petit atelier.",
  body: [
    { style: "h2", text: "Un métier des mains" },
    {
      style: "normal",
      text:
        "Tout part d'une planche brute de scierie. Je choisis les bois pour leur fil, leur densité et leur histoire, en privilégiant les essences françaises et les circuits courts.",
    },
    {
      style: "normal",
      text:
        "Débit, collage, rabotage, ponçage en cinq grains successifs, puis plusieurs couches d'huile alimentaire : chaque planche demande plusieurs jours et passe une dizaine de fois entre mes mains.",
    },
    { style: "h2", text: "Des objets faits pour durer" },
    {
      style: "normal",
      text:
        "Une planche bien entretenue se transmet. Elle se patine, se ré-huile, se ponce à nouveau si besoin. C'est tout le contraire d'un objet jetable.",
    },
    { style: "bullets", items: [
      "Bois massif, sans placage ni contreplaqué",
      "Finition à l'huile de qualité alimentaire",
      "Fabrication artisanale en France",
      "Chaque pièce est unique",
    ] },
  ],
  images: [
    { url: "/placeholders/portrait.svg", alt: "Portrait de l'artisan (démonstration)" },
    { url: "/placeholders/atelier.svg", alt: "L'atelier (démonstration)" },
  ],
};

export const placeholderLegalPages: LegalPage[] = [
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    updatedAt: "2026-01-01",
    body: [
      { style: "h2", text: "Éditeur du site" },
      {
        style: "normal",
        text:
          "Le site mabelleplanche.fr est édité par Ma belle planche, entreprise individuelle (auto-entrepreneur). SIRET : [à compléter]. Adresse : [à compléter], France. Contact : contact@mabelleplanche.fr. Responsable de la publication : [nom à compléter].",
      },
      { style: "h2", text: "Hébergement" },
      {
        style: "normal",
        text:
          "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
      },
      { style: "h2", text: "Propriété intellectuelle" },
      {
        style: "normal",
        text:
          "L'ensemble des contenus (textes, photographies, logo) est la propriété de Ma belle planche, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
      },
      {
        style: "normal",
        text:
          "Ce texte est un modèle à faire relire et à adapter à votre situation avant la mise en ligne.",
      },
    ],
  },
  {
    slug: "cgv",
    title: "Conditions générales de vente",
    updatedAt: "2026-01-01",
    body: [
      { style: "h2", text: "1. Objet" },
      {
        style: "normal",
        text:
          "Les présentes conditions régissent les ventes de planches à découper réalisées par Ma belle planche via le site mabelleplanche.fr, auprès de clients particuliers résidant en France métropolitaine.",
      },
      { style: "h2", text: "2. Prix" },
      {
        style: "normal",
        text:
          "Les prix sont indiqués en euros toutes taxes comprises. La TVA n'est pas applicable, article 293 B du CGI (le cas échéant). Les frais de livraison sont indiqués avant la validation de la commande.",
      },
      { style: "h2", text: "3. Commande et paiement" },
      {
        style: "normal",
        text:
          "Le paiement s'effectue en ligne par carte bancaire via le prestataire Stripe. La commande est ferme à réception du paiement. Un email de confirmation récapitule la commande.",
      },
      { style: "h2", text: "4. Livraison" },
      {
        style: "normal",
        text:
          "Les livraisons sont assurées en France métropolitaine, sous 5 à 10 jours ouvrés après expédition, via Colissimo suivi. Chaque planche étant fabriquée à la main, un délai de préparation supplémentaire peut s'appliquer et sera précisé sur la fiche produit ou par email.",
      },
      { style: "h2", text: "5. Droit de rétractation" },
      {
        style: "normal",
        text:
          "Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez d'un délai de quatorze (14) jours à compter de la réception pour exercer votre droit de rétractation, sans avoir à justifier de motif. Les frais de retour sont à votre charge. Le remboursement intervient sous 14 jours après récupération du bien, la planche devant être retournée dans son état d'origine.",
      },
      { style: "h2", text: "6. Garanties" },
      {
        style: "normal",
        text:
          "Les produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés. Le bois étant une matière vivante, les variations de teinte et de veinage ne constituent pas un défaut.",
      },
      { style: "h2", text: "7. Réclamations" },
      {
        style: "normal",
        text:
          "Pour toute réclamation : contact@mabelleplanche.fr. En cas de litige non résolu, le consommateur peut recourir gratuitement à un médiateur de la consommation.",
      },
      {
        style: "normal",
        text:
          "Ce texte est un modèle à faire relire et à adapter à votre situation avant la mise en ligne.",
      },
    ],
  },
  {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    updatedAt: "2026-01-01",
    body: [
      { style: "h2", text: "Données collectées" },
      {
        style: "normal",
        text:
          "Lors d'une commande, nous collectons : nom, adresse de livraison, adresse email. Ces données sont nécessaires au traitement et à l'expédition de la commande.",
      },
      { style: "h2", text: "Utilisation" },
      {
        style: "normal",
        text:
          "Les données servent uniquement à traiter les commandes, à vous tenir informé de leur suivi et à répondre à vos messages. Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.",
      },
      { style: "h2", text: "Sous-traitants" },
      {
        style: "bullets",
        items: [
          "Stripe (paiement) — traite les données de paiement, que le site ne stocke jamais.",
          "Resend (envoi d'emails) — traite votre adresse email pour l'envoi des confirmations.",
          "Vercel (hébergement) — héberge le site et ses journaux techniques.",
        ],
      },
      { style: "h2", text: "Durée de conservation" },
      {
        style: "normal",
        text:
          "Les données de commande sont conservées le temps nécessaire aux obligations comptables et légales (jusqu'à 10 ans pour les factures).",
      },
      { style: "h2", text: "Vos droits" },
      {
        style: "normal",
        text:
          "Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition sur vos données. Pour l'exercer : contact@mabelleplanche.fr. Vous pouvez aussi saisir la CNIL (cnil.fr).",
      },
      {
        style: "normal",
        text:
          "Ce texte est un modèle à faire relire et à adapter à votre situation avant la mise en ligne.",
      },
    ],
  },
];
