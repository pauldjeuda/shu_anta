export type CategoryId =
  | "savons"
  | "soins-visage"
  | "soins-corps"
  | "huiles-beurres"
  | "routine-visage";

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  currency: "XAF";
  short: string;
  details: string[];
  image: string;
  tags?: string[];
};

export const CATEGORIES: Record<
  CategoryId,
  { label: string; path: string; title: string; lead: string; cover: string }
> = {
  savons: {
    label: "Savons & exfoliants",
    path: "/savons",
    title: "Savons & exfoliants",
    lead: "Des textures riches, inspirées des gestes traditionnels, pour nettoyer et révéler la peau en douceur.",
    cover: "/images/hero_savons.jpg",
  },
  "soins-visage": {
    label: "Soins visage",
    path: "/soins-visage",
    title: "Soins visage",
    lead: "Une routine claire : nettoyer, hydrater, soutenir l’éclat — sans surcharge.",
    cover: "/images/ig/serum-teint.jpg",
  },
  "soins-corps": {
    label: "Soins corps",
    path: "/soins-corps",
    title: "Soins corps",
    lead: "Beurres, crèmes et soins pour accompagner la peau au quotidien, y compris sous le climat tropical.",
    cover: "/images/hero_soins_corps.jpg",
  },
  "huiles-beurres": {
    label: "Huiles & beurres",
    path: "/huiles-beurres",
    title: "Huiles & beurres",
    lead: "Des textures nourrissantes, pensées pour hydrater et envelopper la peau.",
    cover: "/images/ig/huile-or.jpg",
  },
  "routine-visage": {
    label: "Routine visage",
    path: "/routine-visage",
    title: "Routine visage",
    lead: "Le geste complet SHU ANTA : une séquence simple pour une peau d’apparence saine.",
    cover: "/images/ig/eau-micellaire.jpg",
  },
};

export const PRODUCTS: Product[] = [
  {
    id: "savon-noir-spa",
    name: "Savon noir spa — Dalan & karité",
    category: "savons",
    price: 4500,
    currency: "XAF",
    short: "Exfoliant corporel au savon noir, dalan et beurre de karité.",
    details: [
      "Texture exfoliante inspirée du savon noir traditionnel, enrichie de dalan et de beurre de karité.",
      "Idéal en massage circulaire sous la douche, une à deux fois par semaine selon la sensibilité de votre peau.",
      "Après rinçage, enchaînez avec une huile ou un beurre SHU ANTA pour sceller le confort.",
    ],
    image: "/images/ig/savon-noir.jpg",
    tags: ["Corps", "Exfoliant"],
  },
  {
    id: "savon-exfoliant-doux",
    name: "Exfoliant corps doux",
    category: "savons",
    price: 4200,
    currency: "XAF",
    short: "Texture fondante pour lisser la peau sans l’agresser.",
    details: [
      "Formule douce pour lisser l’apparence de la peau sans effet abrasif.",
      "Convient aux peaux qui préfèrent une exfoliation légère, même en climat tropical.",
      "À utiliser sur peau humide, puis hydrater généreusement.",
    ],
    image: "/images/jar.png",
    tags: ["Corps"],
  },
  {
    id: "eau-micellaire",
    name: "Eau micellaire détox aux hydrolats",
    category: "soins-visage",
    price: 6500,
    currency: "XAF",
    short: "Nettoyage végétal aux hydrolats de plantes — curcuma, goyave, herbes.",
    details: [
      "Nettoyage végétal aux hydrolats de plantes (curcuma, goyave, herbes) pour démaquiller et rafraîchir.",
      "Appliquez le matin et le soir sur coton, sans rinçage obligatoire si la peau le tolère bien.",
      "Premier geste de la routine visage SHU ANTA.",
    ],
    image: "/images/ig/eau-micellaire.jpg",
    tags: ["Visage", "Nettoyage"],
  },
  {
    id: "serum-teint",
    name: "Sérum complexe teint clair",
    category: "soins-visage",
    price: 9800,
    currency: "XAF",
    short: "Sérum réparateur anti-taches à l’acide kojique, pour un teint plus uniforme.",
    details: [
      "Sérum à l’acide kojique conçu pour accompagner l’apparence d’un teint plus uniforme.",
      "Texture légère, à appliquer le soir sur peau propre, avant le soin hydratant.",
      "Utilisation régulière recommandée ; évitez le soleil excessif et protégez votre peau au quotidien.",
    ],
    image: "/images/ig/serum-teint.jpg",
    tags: ["Visage", "Éclat"],
  },
  {
    id: "serum-hydratant",
    name: "Sérum visage hydratant réparateur",
    category: "soins-visage",
    price: 8900,
    currency: "XAF",
    short: "Hydratation légère pour soutenir la barrière cutanée au quotidien.",
    details: [
      "Sérum hydratant pensé pour le confort quotidien et le soutien de la barrière cutanée.",
      "Seule ou en duo avec le sérum teint, selon les besoins de votre peau.",
      "Texture non grasse, adaptée au climat chaud.",
    ],
    image: "/images/care_b.jpg",
    tags: ["Visage"],
  },
  {
    id: "beurre-harmattan",
    name: "Beurre corporel Harmattan",
    category: "soins-corps",
    price: 7500,
    currency: "XAF",
    short: "Beurre karité & glycérine — confort intense en saison sèche.",
    details: [
      "Beurre riche karité & glycérine pour les périodes de sécheresse (Harmattan).",
      "Appliquez sur peau encore légèrement humide pour mieux sceller l’hydratation.",
      "Zones à prioriser : coudes, genoux, jambes et zones rugueuses.",
    ],
    image: "/images/ig/beurre-corps.jpg",
    tags: ["Corps", "Nourrissant"],
  },
  {
    id: "creme-mains",
    name: "Crème mains nourrissante",
    category: "soins-corps",
    price: 3500,
    currency: "XAF",
    short: "Soin ciblé pour les mains, texture fondante.",
    details: [
      "Soin ciblé pour les mains, texture fondante qui pénètre rapidement.",
      "À garder près du lavabo pour un geste après chaque lavage.",
      "Complément idéal aux soins corps SHU ANTA.",
    ],
    image: "/images/ig/creme-main.jpg",
    tags: ["Corps"],
  },
  {
    id: "huile-or",
    name: "Huile précieuse corps & cheveux",
    category: "huiles-beurres",
    price: 8200,
    currency: "XAF",
    short: "Huile dorée multifonction pour nourrir peau et cheveux.",
    details: [
      "Huile dorée multifonction : corps, pointes des cheveux, ou finition après la douche.",
      "Quelques gouttes suffisent — chauffez entre les paumes avant d’appliquer.",
      "Parfum et éclat subtils, dans l’esprit Tradition & Nature.",
    ],
    image: "/images/ig/huile-or.jpg",
    tags: ["Huile"],
  },
  {
    id: "beurre-karite",
    name: "Beurre de karité purifié",
    category: "huiles-beurres",
    price: 6000,
    currency: "XAF",
    short: "Beurre riche pour sceller l’hydratation après le bain.",
    details: [
      "Beurre de karité purifié, texture riche pour sceller l’hydratation.",
      "Peut se fondre entre les mains avant application pour plus de confort.",
      "Allié des peaux très sèches et des soins post-exfoliation.",
    ],
    image: "/images/ig/beurre-corps.jpg",
    tags: ["Beurre"],
  },
  {
    id: "routine-kit",
    name: "Kit routine visage SHU ANTA",
    category: "routine-visage",
    price: 18500,
    currency: "XAF",
    short: "Eau micellaire + sérum + soin hydratant — le trio essentiel.",
    details: [
      "Coffret trio : eau micellaire, sérum et soin hydratant pour une routine complète.",
      "Idéal pour découvrir la philosophie SHU ANTA en un seul geste d’achat.",
      "Suivez l’ordre : nettoyer → sérum → hydrater, matin et/ou soir.",
    ],
    image: "/images/allinone_b.jpg",
    tags: ["Routine", "Coffret"],
  },
  {
    id: "routine-plateau",
    name: "Plateau routine visage",
    category: "routine-visage",
    price: 22000,
    currency: "XAF",
    short: "La séquence complète présentée pour un selfcare calme.",
    details: [
      "La séquence visage complète, présentée pour un rituel selfcare calme.",
      "Parfait en cadeau ou pour installer une routine durable à la maison.",
      "Les produits peuvent aussi s’acheter séparément dans le catalogue.",
    ],
    image: "/images/allinone_a.jpg",
    tags: ["Routine"],
  },
];

export function formatPrice(n: number, locale: "fr" | "en" = "fr"): string {
  return `${n.toLocaleString(locale === "en" ? "en-US" : "fr-FR")} FCFA`;
}

export function productsByCategory(id: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === id);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
