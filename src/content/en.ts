import type { Locale } from "./shared";

type NavItem = { label: string; href: string };
type Stat = { value: string; unit?: string; label: string };
type Step = { title: string; body: string };
type Service = { name: string; volume: string; body: string; points: string[] };

/**
 * English copy.
 *
 * Body text is carried over verbatim from the original alkhoud.com wherever
 * the original had it. Copy written for the redesign is marked `// new`.
 */

export const en = {
  locale: "en" as Locale,
  dir: "ltr" as "ltr" | "rtl",
  label: "English",
  otherLocaleLabel: "العربية",
  otherLocaleHref: "/ar",

  meta: {
    title: "Al Khoud — Pure Natural Water",
    description:
      "The purest form of hydration coming straight from nature. Al Khoud is for everyone pursuing healthy hydration and natural products.",
  },

  nav: [
    { label: "Products", href: "#products" },
    { label: "Our Story", href: "#story" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],

  a11y: {
    skipToContent: "Skip to main content",
    backToTop: "Al Khoud — back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    newTab: "(opens in a new tab)",
    primaryNav: "Primary",
    mobileNav: "Primary, mobile",
    footerNav: "Footer",
  },

  header: { tollFreeShort: "Toll Free" },

  hero: {
    eyebrow: "Al Hajjar Mountains · Sultanate of Oman",
    title: "Pure by Nature",
    body:
      "The purest form of hydration coming straight from nature. Al Khoud is for everyone pursuing healthy hydration and natural products.",
    primaryCta: "Order Water & Coolers",
    secondaryCta: "See the Range",
    photoAlt:
      "The layered limestone cliffs of the Al Hajjar mountains in Oman, where Al Khoud water is drawn from.", // new
    lineupAlt: "The Al Khoud bottled water range: 1.5 litre, 500 ml, 250 ml and a 200 ml cup.", // new
  },

  stats: [
    { value: "24", label: "Step Hygiene & Safety Process" },
    { value: "500", unit: "m", label: "Of Igneous Rock Filtration" },
    { value: "2016", label: "Serving Oman Since" },
  ] as Stat[],

  journey: {
    eyebrow: "From Cloud to Bottle",
    title: "The Journey",
    depthLabel: "Depth", // new
    scrollHint: "Scroll to descend", // new
    body:
      "In the sun-kissed surroundings of the majestic Al Hajjar mountains there lies a reservoir of deep earth water as old as civilization. Formed in the rain clouds high above, every shower, every drizzle, every drop makes its journey through half a kilometer of igneous rock and nestles in the deep earth as pure, natural water rich in naturally added minerals.",
    steps: [
      {
        title: "Heavy Rainfall",
        body: "Every shower, every drizzle, every drop begins in the rain clouds high above Oman.", // new
      },
      {
        title: "In Al Hajjar Mountain",
        body: "Rain gathers across the sun-kissed slopes of the majestic Al Hajjar range.", // new
      },
      {
        title: "Deep Naturally Filtered",
        body: "The water travels down through half a kilometre of igneous rock, filtered entirely by nature.", // new
      },
      {
        title: "Ground Water by Nature",
        body: "It nestles in the deep earth as pure, natural water rich in naturally added minerals.", // new
      },
    ] as Step[],
  },

  products: {
    eyebrow: "What We Deliver",
    title: "The Range",
    body:
      "One water, four ways to drink it — and a delivery service that brings it to your door.", // new
    retailTitle: "Retail bottles", // new
    retailNote: "Shown at true relative size. Volumes as printed on the bottle.", // new
    selectHint: "Choose a size", // new
    skuNotes: ["The family bottle", "The everyday size", "Compact", "Sealed cup"] as string[], // new
    serviceTitle: "Home & office delivery", // new
    services: [
      {
        name: "5-Gallon Home & Office",
        volume: "18.9 L",
        body:
          "Our returnable polycarbonate bottle. Each one is thoroughly washed and sanitised before filling, following a sophisticated 24-step process to achieve the highest standard of hygiene and safety.",
        points: [
          "Free delivery to home or office",
          "Returnable & reusable bottle",
          "Sanitised before every fill",
        ],
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
    ] as Service[],
  },

  story: {
    eyebrow: "Since 2016",
    title: "Our Story",
    lead: "Al Khoud — Pure Natural Water.",
    paragraphs: [
      "This is not a story about just a bottle of water. It's a story about nature, respect and a continuous journey for excellence. Al-Khoud water came to life in 2016, celebrating the magnificence of the most precious treasure in our land which is water.",
      "Our team had a vision of bringing the purest water to the people of Oman because we believe that you deserve to have the best that nature has to offer. Using the latest available technologies out there we've brought you the drops of life running through the rocks of the majestic Al Hajjar mountains to provide you with the purest and finest water.",
      "Our first priority is our customers' wellness, as a healthy body and a pure mind mean a happy life. There is a journey of excellence behind every single bottle of Al Khoud water. Following a sophisticated 24-step process to achieve the highest standard of hygiene and safety, each 5-gallon polycarbonate bottle is thoroughly washed and sanitized before filling.",
      "We're so serious about your wellness and health, so we utilize the most advanced machines in our field that involves no human intervention to have ultimate levels of sanitation and hygiene in our cleaning and bottling facilities.",
      "Our mission is to quench the thirst of upcoming generations with the purest and finest water that nature has to offer. For that, there is a dedicated multilingual call center at your service for any of your inquiries or comments. Plus, there is an army of technicians who're always available on spot, in case your Al Khoud cooler needs repair.",
    ] as string[],
  },

  process: {
    eyebrow: "Hygiene & Safety",
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
    ] as Step[],
  },

  careers: {
    eyebrow: "Careers",
    title: "Work with Al Khoud",
    paragraphs: [
      "At Al Khoud Oman, we produce the highest quality products and deliver services that exceed our customers' expectations.",
      "To make this possible, we don't just look out for the most motivated, highly skilled and dedicated people but we also make an investment in their safety, welfare and their personal development.",
      "If you think you have what it takes to join the Al Khoud family, see from the below listings if we need someone with your skillset.",
    ] as string[],
    cta: "Join Us",
  },

  contact: {
    eyebrow: "Get In Touch",
    title: "Contact Us",
    body:
      "Delivery of Al Khoud water and coolers is free to your home or office. Call the toll free line or send us a message and our team will get back to you.",
    formTitle: "Send Us A Message",
    formNote: "We reply to every enquiry. For urgent orders, the toll free line is fastest.",
    labels: {
      tollFree: "Toll Free",
      telephone: "Telephone",
      email: "Email",
      address: "Address",
      follow: "Follow",
      name: "Name",
      message: "Message",
      phone: "Phone",
      optional: "(optional)",
    },
    placeholders: {
      name: "e.g. Fatma Al Balushi…",
      email: "e.g. you@company.om…",
      phone: "e.g. +968 9000 0000…",
      message: "How many bottles, and where should we deliver?…",
    },
    submit: "Send Message",
    submitting: "Sending…",
    success: "Thanks! Message sent.",
    errorPrefix: "That didn’t send. Please call",
    errorSuffix: "or email us instead.",
    errors: {
      name: "Enter your name so we know who to reply to.",
      emailMissing: "Enter an email address we can reply to.",
      emailInvalid: "That email address is missing an @ or a domain.",
      message: "Tell us what you need and we will get back to you.",
    },
  },

  footer: {
    blurb:
      "Pure natural water, drawn from the Al Hajjar mountains and delivered across the Sultanate of Oman.", // new
    tollFree: "Toll Free",
  },
};

export type Dictionary = typeof en;
