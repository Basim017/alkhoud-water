/**
 * Single source of truth for every piece of copy on the site.
 *
 * Body copy, contact details and social links are taken verbatim from the
 * live Al Khoud site (alkhoud.com) so the rebuild stays faithful to the
 * original. Anything added during the redesign is marked `// added`.
 */

export const company = {
  name: "Al Khoud",
  nameArabic: "الخوض",
  legalName: "Global Pioneer LLC",
  tagline: "Pure by Nature",
  descriptor: "Pure Natural Water", // from "Al Khoud - Pure Natural Water."
  founded: 2016,
  url: "https://www.alkhoud.com/",
} as const;

export const contact = {
  email: "info@alkhoud.com",
  tollFree: "80070066",
  tollFreeHref: "tel:80070066",
  phone: "+968 2454 1617",
  phoneHref: "tel:+96824541617",
  address: {
    lines: [
      "Global Pioneer LLC",
      "P. O. Box: 2727, P. C. 111,",
      "Al Khoud, Al Seeb, Muscat,",
      "Sultanate of Oman",
    ],
    locality: "Al Seeb",
    region: "Muscat",
    country: "OM",
  },
} as const;

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/alkhoudwater/" },
  { label: "X", href: "https://twitter.com/alkhoudwater" },
  { label: "Instagram", href: "https://www.instagram.com/alkhoud_water/" },
] as const;

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Al Hajjar Mountains · Sultanate of Oman",
  title: company.tagline,
  body:
    "The purest form of hydration coming straight from nature. Al Khoud is for everyone pursuing healthy hydration and natural products.",
  primaryCta: { label: "Order Water & Coolers", href: "#contact" },
  secondaryCta: { label: "Read Our Story", href: "#story" },
} as const;

/** Verified figures drawn from the company's own copy. */
export const stats: ReadonlyArray<{ value: string; unit?: string; label: string }> = [
  { value: "24", label: "Step Hygiene & Safety Process" },
  { value: "500", unit: "m", label: "Of Igneous Rock Filtration" },
  { value: "2016", label: "Serving Oman Since" },
];

export const journey = {
  title: "The Journey",
  body:
    "In the sun-kissed surroundings of the majestic Al Hajjar mountains there lies a reservoir of deep earth water as old as civilization. Formed in the rain clouds high above, every shower, every drizzle, every drop makes its journey through half a kilometer of igneous rock and nestles in the deep earth as pure, natural water rich in naturally added minerals.",
  steps: [
    {
      title: "Heavy Rainfall",
      // added: one-line expansions of the original four icon captions
      body: "Every shower, every drizzle, every drop begins in the rain clouds high above Oman.",
    },
    {
      title: "In Al Hajjar Mountain",
      body: "Rain gathers across the sun-kissed slopes of the majestic Al Hajjar range.",
    },
    {
      title: "Deep Naturally Filtered",
      body: "The water travels down through half a kilometre of igneous rock, filtered entirely by nature.",
    },
    {
      title: "Ground Water by Nature",
      body: "It nestles in the deep earth as pure, natural water rich in naturally added minerals.",
    },
  ],
} as const;

/**
 * Product range.
 *
 * Only offerings the company states publicly are described here — the
 * 5-gallon polycarbonate bottle, coolers and delivery. Exact retail bottle
 * sizes are not published on the current site, so none are invented; add
 * them to `retailSizes` below once confirmed and the card will render them.
 */
export const products = {
  title: "Products & Service",
  body:
    "One water, delivered the way you need it — to the door of your home, to your office floor, or by the pallet.",
  retailSizes: [] as string[], // TODO(client): add confirmed retail sizes, e.g. "330 ml"
  items: [
    {
      name: "5-Gallon Home & Office",
      volume: "18.9 L",
      body:
        "Our returnable polycarbonate bottle. Each one is thoroughly washed and sanitised before filling, following a sophisticated 24-step process to achieve the highest standard of hygiene and safety.",
      points: ["Free delivery to home or office", "Returnable & reusable bottle", "Sanitised before every fill"],
    },
    {
      name: "Coolers & Servicing",
      volume: "Hot & cold",
      body:
        "Coolers delivered free alongside your water. There is an army of technicians who're always available on spot, in case your Al Khoud cooler needs repair.",
      points: ["Free cooler delivery", "On-site technicians", "Multilingual call centre"],
    },
    {
      name: "Retail & Bulk Supply",
      volume: "By arrangement",
      body:
        "Supply for retailers, hospitality, events and corporate accounts across Muscat and beyond. Tell us the volumes you need and we will put a schedule together.",
      points: ["Corporate accounts", "Scheduled deliveries", "Event & hospitality supply"],
    },
  ],
} as const;

export const story = {
  title: "Our Story",
  lead: "Al Khoud — Pure Natural Water.",
  paragraphs: [
    "This is not a story about just a bottle of water. It's a story about nature, respect and a continuous journey for excellence. Al-Khoud water came to life in 2016, celebrating the magnificence of the most precious treasure in our land which is water.",
    "Our team had a vision of bringing the purest water to the people of Oman because we believe that you deserve to have the best that nature has to offer. Using the latest available technologies out there we've brought you the drops of life running through the rocks of the majestic Al Hajjar mountains to provide you with the purest and finest water.",
    "Our first priority is our customers' wellness, as a healthy body and a pure mind mean a happy life. There is a journey of excellence behind every single bottle of Al Khoud water. Following a sophisticated 24-step process to achieve the highest standard of hygiene and safety, each 5-gallon polycarbonate bottle is thoroughly washed and sanitized before filling.",
    "We're so serious about your wellness and health, so we utilize the most advanced machines in our field that involves no human intervention to have ultimate levels of sanitation and hygiene in our cleaning and bottling facilities.",
    "Our mission is to quench the thirst of upcoming generations with the purest and finest water that nature has to offer. For that, there is a dedicated multilingual call center at your service for any of your inquiries or comments. Plus, there is an army of technicians who're always available on spot, in case your Al Khoud cooler needs repair.",
  ],
} as const;

export const process = {
  title: "A Journey of Excellence Behind Every Bottle",
  body:
    "We utilize the most advanced machines in our field that involves no human intervention to have ultimate levels of sanitation and hygiene in our cleaning and bottling facilities.",
  pillars: [
    {
      title: "Washed & Sanitised",
      body: "Each 5-gallon polycarbonate bottle is thoroughly washed and sanitised before filling.",
    },
    {
      title: "No Human Intervention",
      body: "The most advanced machines in our field handle cleaning and bottling end to end.",
    },
    {
      title: "24-Step Standard",
      body: "A sophisticated 24-step process to achieve the highest standard of hygiene and safety.",
    },
    {
      title: "Always On Call",
      body: "A dedicated multilingual call centre for any of your inquiries or comments.",
    },
  ],
} as const;

export const careers = {
  title: "Work with Al Khoud",
  paragraphs: [
    "At Al Khoud Oman, we produce the highest quality products and deliver services that exceed our customers' expectations.",
    "To make this possible, we don't just look out for the most motivated, highly skilled and dedicated people but we also make an investment in their safety, welfare and their personal development.",
    "If you think you have what it takes to join the Al Khoud family, see from the below listings if we need someone with your skillset.",
  ],
  cta: { label: "Join Us", href: "https://www.gpoman.com/careers" },
} as const;

export const contactSection = {
  title: "Contact Us",
  body:
    "Delivery of Al Khoud water and coolers is free to your home or office. Call the toll free line or send us a message and our team will get back to you.",
  successMessage: "Thanks! Message sent.",
} as const;

export const copyright = "© 2018 Global Pioneer. All Right Reserved.";
