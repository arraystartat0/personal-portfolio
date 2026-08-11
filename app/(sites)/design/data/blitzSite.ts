/**
 * Copy for the two Blitz Packaging renders in case study 01, rebuilt from the
 * client's own codebases rather than screenshots.
 */

export const beforeSite = {
  topbar: [
    "⚲ Plot 20-22 Nalukolongo Ring",
    "✆ +256 756 958995",
    "✉ info@blitzpackaging.co.ug",
  ],
  nav: ["ⓘ About us", "▣ Products"],
  carousel: "AUTOPLAY PHOTO CAROUSEL",
  columns: [
    {
      title: "Who we are",
      body: "Blitz Packaging Ltd is primarily involved in the manufacturing of plastic bags, wrapping and packaging products for the local market in Uganda. Blitz has established itself as one of the promising players in the market providing quality while building meaningful connections with our customers.",
    },
    {
      title: "Why choose us?",
      body: "At Blitz, we understand the vital role packaging plays in enhancing your product's appeal and ensuring its safety during transit. With our unwavering commitment to innovation, quality, and customer satisfaction, we aim to exceed your expectations at every step.",
    },
    {
      title: "What we do",
      body: "We take pride in manufacturing a diverse range of high-quality products to meet your packaging needs. From carrier bags for shopping to sheeting, we have you covered. Whether you're a supermarket, bakery, bottling company or laundry service…",
    },
  ],
  productsHeading: "Our Products",
  products: [
    "Packaging Bags",
    "Bread Bags",
    "Shopping Carrier Bags",
  ].map((title) => ({
    title,
    body: "These are manufactured for supermarkets, bakeries and companies providing laundry services…",
  })),
};

export const afterSite = {
  topbar: {
    address: "Plot 20–22 Nalukolongo Ring Road, Kampala",
    phone: "+256 756 958995",
    email: "info@blitzpackaging.co.ug",
    hours: "Mon–Sat, 8 AM–5 PM",
  },
  nav: ["About", "Products", "Industries", "Sustainability"],
  contact: "Contact",
  cta: "Request a quote →",
  /* The toggler that takes the links on a phone. The quote button never goes
     with them: it is the one thing the header exists to put in reach. */
  menuLabel: "Menu",
  menuCloseLabel: "Close menu",
  eyebrow: "FLEXIBLE PLASTIC PACKAGING SOLUTIONS IN UGANDA",
  headline: { lead: "Packaging that carries your brand ", accent: "forward", tail: "." },
  tagline: "Present your product differently",
  lead: "From carrier bags to co-extruded films, Blitz Packaging Ltd manufactures quality flexible plastic packaging solutions in Kampala, Uganda for supermarkets, bakeries, bottlers and industry across East Africa, built on global-grade resins and precision printing.",
  secondaryCta: "Explore products",
  /** The capability strip that closes the live hero, two up then one. */
  features: [
    { title: "3-layer co-extrusion", body: "Stronger, thinner films" },
    { title: "Digital CI printing", body: "Sharp, brand-true results" },
    { title: "Global-grade resins", body: "ExxonMobil · Qatar · Sabic" },
  ],
};
