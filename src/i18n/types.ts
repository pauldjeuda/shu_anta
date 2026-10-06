export type Locale = "fr" | "en";

export type Messages = {
  nav: {
    home: string;
    about: string;
    catalogue: string;
    soaps: string;
    body: string;
    blog: string;
    openMenu: string;
    closeMenu: string;
    cart: string;
    mainNav: string;
    langSwitch: string;
  };
  navItems: { label: string; path: string }[];
  philosophy: {
    title: string;
    titleLines: [string, string, string];
    p1: string;
    p2: string;
    cta: string;
    jarNote: string;
  };
  pureCare: {
    title: string;
    titleLines: [string, string];
    p1: string;
    p2: string;
  };
  allInOne: {
    title: string;
    titleLines: [string, string];
    lead: string;
    body: string;
    cta: string;
  };
  footer: {
    tagline: string;
    about: string;
    shopTitle: string;
    brandTitle: string;
    findUs: string;
    shop: { label: string; href: string }[];
    brand: { label: string; href: string }[];
    legal: { label: string; href: string }[];
    contact: {
      city: string;
      address: string;
      hours: string;
      cities: string;
      yaounde: string;
      douala: string;
      presence: string;
    };
    rights: string;
  };
  ui: {
    add: string;
    seeMore: string;
    addToCart: string;
    viewCart: string;
    collection: string;
    allCare: string;
    emptyCart: string;
    browseCatalogue: string;
    remove: string;
    clear: string;
    orderPhone: string;
    cartNote: string;
    total: string;
    qty: string;
    decrease: string;
    increase: string;
    added: string;
    productMissing: string;
    backCatalogue: string;
    sameCollection: string;
    articleMissing: string;
    backBlog: string;
    readArticle: string;
    bookVisit: string;
    faceRoutine: string;
    careCount: string;
    careOne: string;
    careMany: string;
  };
  pages: {
    about: {
      title: string;
      eyebrow: string;
      lead: string;
      h2: string;
      p1: string;
      p2: string;
      discoverCat: string;
      ourShops: string;
    };
    boutiques: { title: string; eyebrow: string; lead: string };
    spa: {
      title: string;
      eyebrow: string;
      lead: string;
      services: { title: string; text: string }[];
      bookTitle: string;
      bookText: string;
    };
    blog: { title: string; eyebrow: string; lead: string };
    legal: {
      title: string;
      eyebrow: string;
      lead: string;
      sections: { title: string; body: string }[];
    };
    privacy: {
      title: string;
      eyebrow: string;
      lead: string;
      sections: { title: string; body: string }[];
    };
    cart: { title: string; eyebrow: string; lead: string };
    catalogue: { title: string; eyebrow: string; lead: string };
  };
  categories: Record<
    | "savons"
    | "soins-visage"
    | "soins-corps"
    | "huiles-beurres"
    | "routine-visage",
    { label: string; title: string; lead: string }
  >;
  products: Record<
    string,
    { name: string; short: string; details: string[]; tags?: string[] }
  >;
  blogPosts: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    body: string[];
  }[];
  shops: {
    city: string;
    role: string;
    address: string;
    phone: string;
    hours: string;
    image: string;
  }[];
  alts: {
    hero_bg: string;
    jar: string;
    care_a: string;
    care_b: string;
    care_c: string;
    allinone_a: string;
    allinone_b: string;
  };
};
