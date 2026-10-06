export const PAGES = {
  about: {
    path: "/a-propos",
    title: "À propos",
    eyebrow: "La marque",
    lead: "SHU ANTA transforme des ingrédients naturels en cosmétiques pensés au Cameroun — pour une peau d’apparence saine, chaque jour.",
  },
  boutiques: {
    path: "/boutiques",
    title: "Nos boutiques",
    eyebrow: "Présence",
    lead: "Retrouvez-nous à Yaoundé, Douala et Garoua — boutique, conseils et atelier.",
  },
  spa: {
    path: "/conseils-spa",
    title: "Conseils & spa",
    eyebrow: "Accompagnement",
    lead: "Conseils dermo-cosmétiques et prestations esthétiques personnalisées, dans l’esprit SHU ANTA.",
  },
  blog: {
    path: "/blog",
    title: "Blog",
    eyebrow: "Journal",
    lead: "Gestes, saisons et routines — des notes simples pour prendre soin de soi.",
  },
  legal: {
    path: "/mentions-legales",
    title: "Mentions légales",
    eyebrow: "Informations",
    lead: "Informations légales relatives au site SHU ANTA.",
  },
  privacy: {
    path: "/confidentialite",
    title: "Confidentialité",
    eyebrow: "Vos données",
    lead: "Comment nous traitons les informations lorsque vous utilisez ce site.",
  },
  cart: {
    path: "/panier",
    title: "Panier",
    eyebrow: "Votre sélection",
    lead: "Vérifiez vos soins avant de finaliser.",
  },
  catalogue: {
    path: "/catalogue",
    title: "Catalogue",
    eyebrow: "Collections",
    lead: "Explorez les soins SHU ANTA — visage, corps, savons, huiles et routines.",
  },
};

export const BLOG_POSTS = [
  {
    slug: "routine-visage-douce",
    title: "Une routine visage en trois gestes",
    excerpt:
      "Nettoyer, hydrater, protéger : la séquence minimale pour accompagner la peau sans la saturer.",
    date: "2026-09-12",
    image: "/images/ig/eau-micellaire.jpg",
    body: [
      "Chez SHU ANTA, la routine commence par un nettoyage doux — notre eau micellaire aux hydrolats prépare la peau sans effet « tirant ».",
      "Ensuite, un sérum ciblé soutient l’éclat et le confort. Enfin, un soin hydratant scelle le geste.",
      "Moins de produits, plus de constance : c’est le minimalisme intelligent que nous défendons.",
    ],
  },
  {
    slug: "peau-saison-seche",
    title: "Peau & saison sèche : le réflexe Harmattan",
    excerpt:
      "Quand l’air dessèche, le beurre corporel devient un allié. Quelques conseils pour garder le confort.",
    date: "2026-09-21",
    image: "/images/ig/beurre-corps.jpg",
    body: [
      "L’Harmattan demande des textures plus riches. Appliquez le beurre sur peau encore légèrement humide pour mieux sceller l’hydratation.",
      "Évitez les frottements agressifs : privilégiez un exfoliant doux une à deux fois par semaine.",
      "Et n’oubliez pas les zones sensibles — coudes, genoux, mains — qui marquent souvent le premier inconfort.",
    ],
  },
  {
    slug: "savon-noir-geste",
    title: "Le savon noir spa, un geste traditionnel",
    excerpt:
      "Dalan, karité, texture exfoliante : comment intégrer le savon noir dans un rituel corps.",
    date: "2026-09-14",
    image: "/images/ig/savon-noir.jpg",
    body: [
      "Le savon noir spa SHU ANTA s’inspire de gestes connus, avec une formule pensée pour le confort moderne.",
      "Utilisez-le en massage circulaire, rincez abondamment, puis enchaînez avec une huile ou un beurre.",
      "Écoutez votre peau : l’exfoliation doit rester un plaisir, jamais une contrainte.",
    ],
  },
];

export const SHOPS = [
  {
    city: "Yaoundé",
    role: "Boutique & atelier",
    address:
      "Nlongkak — rond-point, face Pharmacie des Lumières, à côté du Macadam Bikers",
    phone: "+237 6 99 19 55 46",
    hours: "Lun–Ven 9h–19h · Sam–Dim 10h–18h",
    image: "/images/ig/atelier.jpg",
  },
  {
    city: "Douala",
    role: "Point de présence",
    address: "Douala, Cameroun — contactez-nous pour l’adresse du jour",
    phone: "+237 6 96 97 91 27",
    hours: "Sur rendez-vous",
    image: "/images/ig/soin-lifestyle.jpg",
  },
  {
    city: "Garoua",
    role: "Point de présence",
    address: "Garoua, Cameroun — présence ponctuelle & commandes",
    phone: "+237 6 99 19 55 46",
    hours: "Sur rendez-vous",
    image: "/images/care_c.jpg",
  },
];
