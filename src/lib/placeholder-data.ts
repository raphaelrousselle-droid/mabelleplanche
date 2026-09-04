import type {
  AboutContent,
  Essence,
  LegalPage,
  Product,
  ProductVariant,
  SiteSettings,
} from "./types";

/**
 * Données de démonstration servies tant qu'aucun projet Sanity n'est configuré.
 * Tous les textes sont provisoires et destinés à être remplacés. Les 4 essences
 * (chêne, noyer, châtaignier, hêtre) sont celles réellement travaillées par
 * l'atelier ; les modèles et leurs déclinaisons restent, eux, illustratifs.
 */

const care =
  "Lavez la planche à la main, à l'eau tiède savonneuse, puis séchez-la aussitôt à plat. " +
  "Nourrissez le bois une fois par mois avec une huile alimentaire (huile de lin cuite ou huile minérale de qualité alimentaire). " +
  "Ne la passez jamais au lave-vaisselle et ne la laissez pas tremper.";

export const placeholderEssences: Essence[] = [
  {
    id: "essence-chene",
    slug: "chene",
    name: "Chêne",
    swatch: "#b0794f",
    shortDescription:
      "Un bois dense au fil prononcé, référence intemporelle de la menuiserie française.",
    description: [
      {
        style: "normal",
        text:
          "Le chêne est le bois de la robustesse : dense, résistant aux chocs, il traverse les décennies sans faiblir. Son grain marqué, en veines longues et régulières, donne à chaque planche un caractère affirmé.",
      },
      {
        style: "normal",
        text:
          "C'est une essence locale par excellence, issue de forêts françaises gérées durablement — un choix évident pour un objet fait pour durer.",
      },
    ],
  },
  {
    id: "essence-noyer",
    slug: "noyer",
    name: "Noyer",
    swatch: "#5f3f28",
    shortDescription:
      "Un bois sombre et élégant, au grain fin, qui se patine magnifiquement avec le temps.",
    description: [
      {
        style: "normal",
        text:
          "Le noyer se distingue par sa teinte brun chocolat profonde, parcourue de veines plus claires. C'est un bois noble, souvent réservé aux pièces de service ou aux planches destinées à trôner sur la table.",
      },
      {
        style: "normal",
        text:
          "Plus tendre que le chêne, il se travaille finement et prend, à l'usage, une patine chaude qui s'approfondit d'année en année.",
      },
    ],
  },
  {
    id: "essence-chataignier",
    slug: "chataignier",
    name: "Châtaignier",
    swatch: "#a97a3f",
    shortDescription:
      "Proche du chêne en résistance, plus léger, naturellement peu sensible à l'humidité.",
    description: [
      {
        style: "normal",
        text:
          "Cousin du chêne, le châtaignier partage sa résistance mais avec une teinte plus dorée et un poids plus léger en main. Sa richesse en tanins le rend naturellement peu sensible à l'humidité.",
      },
      {
        style: "normal",
        text:
          "Une essence discrète mais généreuse, appréciée pour son fil régulier et sa couleur chaleureuse qui s'accorde avec tous les intérieurs.",
      },
    ],
  },
  {
    id: "essence-hetre",
    slug: "hetre",
    name: "Hêtre",
    swatch: "#e3c9a0",
    shortDescription:
      "Un bois clair à grain très serré, classique des planches à découper françaises.",
    description: [
      {
        style: "normal",
        text:
          "Le hêtre est l'une des essences de référence pour les planches à découper : un grain extrêmement serré, une surface lisse et dure qui préserve le tranchant des couteaux, et un bois neutre qui ne transmet aucun goût aux aliments.",
      },
      {
        style: "normal",
        text:
          "Très répandu dans les forêts françaises, c'est aussi un bois local et abordable, à la teinte claire légèrement rosée qui apporte de la lumière en cuisine.",
      },
    ],
  },
];

function essenceRef(slug: string) {
  const e = placeholderEssences.find((x) => x.slug === slug);
  if (!e) throw new Error(`Essence inconnue: ${slug}`);
  return e;
}

/** Construit les déclinaisons d'un modèle. Sans `price`, le prix suit `basePrice` du modèle. */
function variant(
  essenceSlug: string,
  opts: { inStock?: boolean; price?: number; images?: ProductVariant["images"] } = {},
): Omit<ProductVariant, "price"> & { price?: number } {
  const e = essenceRef(essenceSlug);
  return {
    essenceSlug: e.slug,
    essenceName: e.name,
    swatch: e.swatch,
    inStock: opts.inStock ?? true,
    images: opts.images ?? [],
    price: opts.price,
  };
}

function withVariants(basePrice: number, variants: ReturnType<typeof variant>[]): ProductVariant[] {
  return variants.map((v) => ({ ...v, price: v.price ?? basePrice }));
}

export const placeholderProducts: Product[] = [
  {
    id: "planche-bistrot",
    slug: "planche-bistrot",
    title: "Planche Bistrot",
    basePrice: 69,
    images: [
      { url: "/placeholders/board-oak.svg", alt: "Planche Bistrot, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Bistrot en situation dans l'atelier" },
    ],
    shortDescription:
      "La planche du quotidien : format rectangulaire, une prise en main facile.",
    description: [
      {
        style: "normal",
        text:
          "La Bistrot accompagne tous les gestes de la cuisine : pain du matin, herbes, fromages, découpe des légumes.",
      },
      {
        style: "normal",
        text:
          "Chaque pièce est rabotée, poncée à la main en plusieurs passes puis nourrie à l'huile. Le fil du bois et les nuances sont uniques à chaque planche.",
      },
    ],
    dimensions: "40 × 25 × 3 cm",
    care,
    featured: true,
    variants: withVariants(69, [variant("chene"), variant("chataignier")]),
  },
  {
    id: "planche-service",
    slug: "planche-service",
    title: "Planche de Service",
    basePrice: 95,
    images: [
      { url: "/placeholders/board-walnut.svg", alt: "Planche de Service, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche de Service en situation" },
    ],
    shortDescription:
      "Grand plateau avec rigole périphérique, pensé pour la découpe des viandes et le service à table.",
    description: [
      {
        style: "normal",
        text:
          "La rigole recueille les jus lors de la découpe d'un rôti ou d'une volaille. Les poignées latérales sont sculptées dans la masse pour soulever le plateau d'une seule main, même chargé.",
      },
    ],
    dimensions: "45 × 30 × 3 cm",
    care,
    featured: true,
    variants: withVariants(95, [variant("noyer"), variant("chene")]),
  },
  {
    id: "planche-apero",
    slug: "planche-apero",
    title: "Planche Apéro",
    basePrice: 42,
    images: [
      { url: "/placeholders/board-beech.svg", alt: "Planche Apéro, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Apéro en situation" },
    ],
    shortDescription:
      "Petit format nomade avec trou de suspension. Parfaite pour un apéritif à deux.",
    description: [
      {
        style: "normal",
        text:
          "Ce petit modèle se glisse partout et se suspend à la cuisine. Idéal pour découvrir une essence avant de craquer pour un plus grand format.",
      },
    ],
    dimensions: "30 × 18 × 2 cm",
    care,
    featured: true,
    variants: withVariants(42, [variant("hetre"), variant("noyer")]),
  },
  {
    id: "planche-comtoise",
    slug: "planche-comtoise",
    title: "Planche Comtoise",
    basePrice: 120,
    images: [
      { url: "/placeholders/board-chestnut.svg", alt: "Planche Comtoise, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Comtoise en situation" },
    ],
    shortDescription: "Pièce d'exception au veinage spectaculaire. Chaque planche est unique.",
    description: [
      {
        style: "normal",
        text:
          "Un dessin de fibres très contrasté, presque graphique. Disponibilité limitée : cette essence s'achète par petits lots, au gré des trouvailles.",
      },
    ],
    dimensions: "38 × 22 × 2,5 cm",
    care,
    featured: false,
    variants: withVariants(120, [variant("chataignier", { inStock: false })]),
  },
  {
    id: "planche-quotidienne",
    slug: "planche-quotidienne",
    title: "Planche Quotidienne",
    basePrice: 49,
    images: [
      { url: "/placeholders/board-oak.svg", alt: "Planche Quotidienne, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Quotidienne en situation" },
    ],
    shortDescription:
      "Un format passe-partout à prix doux pour équiper la cuisine au quotidien.",
    description: [
      {
        style: "normal",
        text:
          "Fibres serrées, surface homogène, respectueuse du tranchant des couteaux : la planche qu'on utilise tous les jours.",
      },
    ],
    dimensions: "35 × 22 × 2,5 cm",
    care,
    featured: false,
    variants: withVariants(49, [variant("hetre"), variant("chene")]),
  },
  {
    id: "planche-grande-tablee",
    slug: "planche-grande-tablee",
    title: "Planche Grande Tablée",
    basePrice: 135,
    images: [
      { url: "/placeholders/board-walnut.svg", alt: "Planche Grande Tablée, vue de face" },
      { url: "/placeholders/atelier.svg", alt: "Planche Grande Tablée en situation" },
    ],
    shortDescription:
      "Très grand plateau pour les planches à partager, les grandes tablées et les buffets.",
    description: [
      {
        style: "normal",
        text:
          "Un format généreux qui devient la pièce centrale d'un repas : charcuteries, fromages, fruits, pains. Épaisseur renforcée pour ne pas voiler.",
      },
    ],
    dimensions: "55 × 32 × 3,5 cm",
    care,
    featured: false,
    variants: withVariants(135, [variant("chene"), variant("noyer", { inStock: false })]),
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
  workshopImageUrl: "/photos/atelier-trois-planches.jpg",
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
    {
      style: "bullets",
      items: [
        "Bois massif, sans placage ni contreplaqué",
        "Finition à l'huile de qualité alimentaire",
        "Fabrication artisanale en France",
        "Chaque pièce est unique",
      ],
    },
  ],
  images: [
    { url: "/photos/planche-fromages.jpg", alt: "Planche Ma belle planche dressée avec des fromages" },
    { url: "/photos/planche-dessert.jpg", alt: "Planche Ma belle planche utilisée pour un dressage sucré" },
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
          "Les prix sont indiqués en euros toutes taxes comprises et peuvent varier selon l'essence de bois choisie. La TVA n'est pas applicable, article 293 B du CGI (le cas échéant). Les frais de livraison sont indiqués avant la validation de la commande.",
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
          "Les produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés. Le bois étant une matière vivante, les variations de teinte et de veinage propres à chaque essence ne constituent pas un défaut.",
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
