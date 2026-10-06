import type { Messages } from "./types";

export const en: Messages = {
  nav: {
    home: "Home",
    about: "About",
    catalogue: "Catalogue",
    soaps: "Soaps",
    body: "Body care",
    blog: "Blog",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cart: "Cart",
    mainNav: "Main navigation",
    langSwitch: "Switch language",
  },
  navItems: [
    { label: "Home", path: "/" },
    { label: "About", path: "/a-propos" },
    { label: "Catalogue", path: "/catalogue" },
    { label: "Soaps", path: "/savons" },
    { label: "Body care", path: "/soins-corps" },
    { label: "Blog", path: "/blog" },
  ],
  philosophy: {
    title: "A new selfcare philosophy: calm skin & hair",
    titleLines: [
      "A new selfcare",
      "philosophy: calm skin",
      "& hair",
    ],
    p1: "SHU ANTA is conscious simplicity: effective formulas, carefully chosen ingredients, and soft textures designed for everyday life.",
    p2: "We believe care should accompany your skin, not overwhelm it — blending modern know-how with a calm, minimal approach.",
    cta: "Discover SHU ANTA",
    jarNote: "Take care of yourself,\ngently.",
  },
  pureCare: {
    title: "Pure care, by nature",
    titleLines: ["Pure care,", "by nature"],
    p1: "Formulas crafted with care to bring balance and softness to your daily ritual.",
    p2: "Light textures, gentle ingredients, and a minimal approach for skin that looks healthy — effortlessly, every day.",
  },
  allInOne: {
    title: "Complete care, all in one",
    titleLines: ["Complete care,", "all in one"],
    lead: "A multifunctional range designed to simplify your daily ritual — without compromise.",
    body: "Each formula brings together hydration, barrier support, and skin balance in a single gesture. The collection champions intelligent minimalism: fewer products, more impact, steady care for skin that looks healthy.",
    cta: "Catalogue",
  },
  footer: {
    tagline:
      "Natural cosmetics inspired by tradition, crafted in Cameroon — face, body, and soaps.",
    about:
      "Boutique and atelier in Yaoundé: dermo-cosmetics, bio-cosmetics, advice, and personalized aesthetic care.",
    shopTitle: "Shop",
    brandTitle: "The brand",
    findUs: "Find us",
    shop: [
      { label: "Soaps & exfoliants", href: "/savons" },
      { label: "Face care", href: "/soins-visage" },
      { label: "Body care", href: "/soins-corps" },
      { label: "Oils & butters", href: "/huiles-beurres" },
      { label: "Face routine", href: "/routine-visage" },
    ],
    brand: [
      { label: "About", href: "/a-propos" },
      { label: "Our shops", href: "/boutiques" },
      { label: "Advice & spa", href: "/conseils-spa" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/shuanta.naturalcosmetics/",
      },
    ],
    legal: [
      { label: "Legal notice", href: "/mentions-legales" },
      { label: "Privacy", href: "/confidentialite" },
    ],
    contact: {
      city: "Yaoundé, Cameroon",
      address:
        "Nlongkak — roundabout, facing Pharmacie des Lumières, next to Macadam Bikers",
      hours: "Mon–Fri 9am–7pm · Sat–Sun 10am–6pm",
      cities: "Yaoundé · Douala · Garoua",
      yaounde: "Yaoundé",
      douala: "Douala",
      presence: "Presence",
    },
    rights: "© {year} SHU ANTA. All rights reserved.",
  },
  ui: {
    add: "Add",
    seeMore: "See more",
    addToCart: "Add to cart",
    viewCart: "View cart",
    collection: "Collection",
    allCare: "All care",
    emptyCart: "Your cart is empty",
    browseCatalogue: "Browse the catalogue",
    remove: "Remove",
    clear: "Clear",
    orderPhone: "Order by phone",
    cartNote:
      "Online payment is not available on this showcase — finalize your order with the SHU ANTA boutique.",
    total: "Total",
    qty: "Quantity",
    decrease: "Decrease",
    increase: "Increase",
    added: "Added · {name}",
    productMissing: "Product not found",
    backCatalogue: "Back to catalogue",
    sameCollection: "In the same collection",
    articleMissing: "Article not found",
    backBlog: "Back to blog",
    readArticle: "Read article",
    bookVisit: "Book a visit",
    faceRoutine: "See the face routine",
    careCount: "{n} care(s)",
    careOne: "1 care",
    careMany: "{n} cares",
  },
  pages: {
    about: {
      title: "About",
      eyebrow: "The brand",
      lead: "SHU ANTA turns natural ingredients into cosmetics crafted in Cameroon — for skin that looks healthy, every day.",
      h2: "Tradition & nature, crafted in Cameroon",
      p1: "SHU ANTA is conscious simplicity: effective formulas, carefully chosen ingredients, and soft textures designed for everyday life. We believe care should accompany your skin, not overwhelm it.",
      p2: "Boutique and atelier in Yaoundé: dermo-cosmetics, bio-cosmetics, advice, and personalized aesthetic care — with a presence in Douala and Garoua too.",
      discoverCat: "Discover the catalogue",
      ourShops: "Our shops",
    },
    boutiques: {
      title: "Our shops",
      eyebrow: "Presence",
      lead: "Find us in Yaoundé, Douala, and Garoua — boutique, advice, and atelier.",
    },
    spa: {
      title: "Advice & spa",
      eyebrow: "Guidance",
      lead: "Dermo-cosmetic advice and personalized aesthetic care, in the SHU ANTA spirit.",
      services: [
        {
          title: "Dermo-cosmetic advice",
          text: "Guidance to choose a routine that fits your skin, climate, and rhythm.",
        },
        {
          title: "Aesthetic care",
          text: "Personalized treatments in boutique / atelier, with a calm and attentive approach.",
        },
        {
          title: "Guided face routine",
          text: "Discover the SHU ANTA gestures — cleanse, serum, hydrate — for a coherent result.",
        },
      ],
      bookTitle: "Book a visit",
      bookText:
        "Contact the Yaoundé or Douala boutique for advice or a treatment. You can also explore the face routine online.",
    },
    blog: {
      title: "Blog",
      eyebrow: "Journal",
      lead: "Gestures, seasons, and routines — simple notes for taking care of yourself.",
    },
    legal: {
      title: "Legal notice",
      eyebrow: "Information",
      lead: "Legal information about the SHU ANTA website.",
      sections: [
        {
          title: "Publisher",
          body: "SHU ANTA — Natural cosmetics, crafted in Cameroon.\nBoutique & atelier: Nlongkak, Yaoundé.\nContact: +237 6 99 19 55 46 · www.shu-anta.com",
        },
        {
          title: "Hosting",
          body: "This site is presented as a showcase. Hosting details will be specified upon public production launch.",
        },
        {
          title: "Intellectual property",
          body: "SHU ANTA texts, visuals, logos, and content are protected. Unauthorized reproduction is prohibited.",
        },
        {
          title: "Liability",
          body: "Product descriptions are informative. Results may vary by skin. For personalized advice, contact the boutique.",
        },
      ],
    },
    privacy: {
      title: "Privacy",
      eyebrow: "Your data",
      lead: "How we handle information when you use this site.",
      sections: [
        {
          title: "Data collected",
          body: "This site may store your cart locally (browser) to keep your selection. No payment data is processed on this showcase.",
        },
        {
          title: "Purposes",
          body: "To improve navigation, remember your cart, and let you contact the brand via the channels listed (phone, Instagram).",
        },
        {
          title: "Your rights",
          body: "You can clear the cart at any time from the Cart page, or erase site data via your browser settings. For any question: contact SHU ANTA using the details in the footer.",
        },
        {
          title: "Cookies",
          body: "No third-party advertising cookies are used on this version of the site. Local cart storage is technical and necessary for the selection to work.",
        },
      ],
    },
    cart: {
      title: "Cart",
      eyebrow: "Your selection",
      lead: "Review your care before finalizing.",
    },
    catalogue: {
      title: "Catalogue",
      eyebrow: "Collections",
      lead: "Explore SHU ANTA care — face, body, soaps, oils, and routines.",
    },
  },
  categories: {
    savons: {
      label: "Soaps & exfoliants",
      title: "Soaps & exfoliants",
      lead: "Rich textures inspired by traditional gestures, to cleanse and reveal skin gently.",
    },
    "soins-visage": {
      label: "Face care",
      title: "Face care",
      lead: "A clear routine: cleanse, hydrate, support radiance — without overload.",
    },
    "soins-corps": {
      label: "Body care",
      title: "Body care",
      lead: "Butters, creams, and care to accompany skin daily, including in a tropical climate.",
    },
    "huiles-beurres": {
      label: "Oils & butters",
      title: "Oils & butters",
      lead: "Nourishing textures designed to hydrate and wrap the skin.",
    },
    "routine-visage": {
      label: "Face routine",
      title: "Face routine",
      lead: "The complete SHU ANTA gesture: a simple sequence for skin that looks healthy.",
    },
  },
  products: {
    "savon-noir-spa": {
      name: "Black soap spa — Dalan & shea",
      short: "Body exfoliant with black soap, dalan, and shea butter.",
      details: [
        "Exfoliating texture inspired by traditional black soap, enriched with dalan and shea butter.",
        "Ideal as a circular massage in the shower, once or twice a week depending on your skin’s sensitivity.",
        "After rinsing, follow with a SHU ANTA oil or butter to seal in comfort.",
      ],
      tags: ["Body", "Exfoliant"],
    },
    "savon-exfoliant-doux": {
      name: "Gentle body exfoliant",
      short: "A melting texture to smooth skin without harshness.",
      details: [
        "A gentle formula to smooth the look of skin without an abrasive feel.",
        "Suited to skin that prefers light exfoliation, even in a tropical climate.",
        "Use on damp skin, then moisturize generously.",
      ],
      tags: ["Body"],
    },
    "eau-micellaire": {
      name: "Detox micellar water with hydrosols",
      short: "Plant-based cleansing with plant hydrosols — turmeric, guava, herbs.",
      details: [
        "Plant-based cleansing with plant hydrosols (turmeric, guava, herbs) to remove makeup and refresh.",
        "Apply morning and evening on cotton; rinsing is optional if your skin tolerates it well.",
        "The first step of the SHU ANTA face routine.",
      ],
      tags: ["Face", "Cleansing"],
    },
    "serum-teint": {
      name: "Clear complexion serum complex",
      short:
        "A kojic-acid serum to support a more even-looking complexion.",
      details: [
        "A kojic-acid serum designed to accompany the appearance of a more even complexion.",
        "Light texture — apply in the evening on clean skin, before your hydrating care.",
        "Regular use recommended; avoid excess sun and protect your skin daily.",
      ],
      tags: ["Face", "Radiance"],
    },
    "serum-hydratant": {
      name: "Hydrating restorative face serum",
      short: "Light hydration to support the skin barrier every day.",
      details: [
        "A hydrating serum designed for daily comfort and barrier support.",
        "Alone or paired with the complexion serum, according to your skin’s needs.",
        "Non-greasy texture, suited to a warm climate.",
      ],
      tags: ["Face"],
    },
    "beurre-harmattan": {
      name: "Harmattan body butter",
      short: "Shea & glycerin butter — deep comfort in dry season.",
      details: [
        "A rich shea & glycerin butter for dry periods (Harmattan).",
        "Apply on still-slightly-damp skin to better seal in hydration.",
        "Priority areas: elbows, knees, legs, and rough patches.",
      ],
      tags: ["Body", "Nourishing"],
    },
    "creme-mains": {
      name: "Nourishing hand cream",
      short: "Targeted hand care with a melting texture.",
      details: [
        "Targeted hand care with a melting texture that absorbs quickly.",
        "Keep by the sink for a gesture after every wash.",
        "An ideal companion to SHU ANTA body care.",
      ],
      tags: ["Body"],
    },
    "huile-or": {
      name: "Precious body & hair oil",
      short: "A golden multifunctional oil to nourish skin and hair.",
      details: [
        "A golden multifunctional oil: body, hair ends, or a finishing touch after the shower.",
        "A few drops are enough — warm between the palms before applying.",
        "Subtle scent and glow, in the Tradition & Nature spirit.",
      ],
      tags: ["Oil"],
    },
    "beurre-karite": {
      name: "Purified shea butter",
      short: "A rich butter to seal in hydration after the bath.",
      details: [
        "Purified shea butter with a rich texture to seal in hydration.",
        "Melt between the hands before applying for more comfort.",
        "An ally for very dry skin and post-exfoliation care.",
      ],
      tags: ["Butter"],
    },
    "routine-kit": {
      name: "SHU ANTA face routine kit",
      short: "Micellar water + serum + hydrating care — the essential trio.",
      details: [
        "Trio set: micellar water, serum, and hydrating care for a complete routine.",
        "Ideal for discovering the SHU ANTA philosophy in a single purchase.",
        "Follow the order: cleanse → serum → hydrate, morning and/or evening.",
      ],
      tags: ["Routine", "Set"],
    },
    "routine-plateau": {
      name: "Face routine tray",
      short: "The full sequence, presented for calm selfcare.",
      details: [
        "The complete face sequence, presented for a calm selfcare ritual.",
        "Perfect as a gift or to set up a lasting routine at home.",
        "Products can also be purchased separately in the catalogue.",
      ],
      tags: ["Routine"],
    },
  },
  blogPosts: [
    {
      slug: "routine-visage-douce",
      title: "A face routine in three gestures",
      excerpt:
        "Cleanse, hydrate, protect: the minimal sequence to accompany skin without saturating it.",
      date: "2026-09-12",
      image: "/images/ig/eau-micellaire.jpg",
      body: [
        "At SHU ANTA, the routine begins with a gentle cleanse — our hydrosol micellar water prepares the skin without a tight feel.",
        "Next, a targeted serum supports radiance and comfort. Finally, a hydrating care seals the gesture.",
        "Fewer products, more consistency: the intelligent minimalism we stand for.",
      ],
    },
    {
      slug: "peau-saison-seche",
      title: "Skin & dry season: the Harmattan reflex",
      excerpt:
        "When the air dries everything out, body butter becomes an ally. A few tips to keep comfort.",
      date: "2026-09-21",
      image: "/images/ig/beurre-corps.jpg",
      body: [
        "Harmattan calls for richer textures. Apply the butter on still-slightly-damp skin to better seal in hydration.",
        "Avoid aggressive rubbing: prefer a gentle exfoliant once or twice a week.",
        "And don’t forget sensitive areas — elbows, knees, hands — which often show the first discomfort.",
      ],
    },
    {
      slug: "savon-noir-geste",
      title: "Black soap spa, a traditional gesture",
      excerpt:
        "Dalan, shea, exfoliating texture: how to bring black soap into a body ritual.",
      date: "2026-09-14",
      image: "/images/ig/savon-noir.jpg",
      body: [
        "SHU ANTA black soap spa draws on familiar gestures, with a formula designed for modern comfort.",
        "Use it in a circular massage, rinse thoroughly, then follow with an oil or butter.",
        "Listen to your skin: exfoliation should stay a pleasure, never a constraint.",
      ],
    },
  ],
  shops: [
    {
      city: "Yaoundé",
      role: "Boutique & atelier",
      address:
        "Nlongkak — roundabout, facing Pharmacie des Lumières, next to Macadam Bikers",
      phone: "+237 6 99 19 55 46",
      hours: "Mon–Fri 9am–7pm · Sat–Sun 10am–6pm",
      image: "/images/ig/atelier.jpg",
    },
    {
      city: "Douala",
      role: "Presence point",
      address: "Douala, Cameroon — contact us for today’s address",
      phone: "+237 6 96 97 91 27",
      hours: "By appointment",
      image: "/images/ig/soin-lifestyle.jpg",
    },
    {
      city: "Garoua",
      role: "Presence point",
      address: "Garoua, Cameroon — occasional presence & orders",
      phone: "+237 6 99 19 55 46",
      hours: "By appointment",
      image: "/images/care_c.jpg",
    },
  ],
  alts: {
    hero_bg: "Close-up of luminous skin, Black woman — SHU ANTA",
    jar: "SHU ANTA black soap spa with dalan and shea",
    care_a: "SHU ANTA detox micellar water",
    care_b: "SHU ANTA hydrating restorative face serum",
    care_c: "SHU ANTA care range presented in a basket",
    allinone_a: "SHU ANTA face routine on a wooden tray",
    allinone_b: "Four products from the SHU ANTA face routine",
  },
};
