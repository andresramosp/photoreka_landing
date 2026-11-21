// What the Photoreka Critique landing states about the product. The numbers mirror
// the API (main_api/config/critique.ts), which is the source of truth for the charge
// and the limits; keep them in sync if the product changes.

import { CONTEST_GENRES } from "./contests";

export const CRITIQUE_APP_URL = "https://app.photoreka.com/critique";

// Two tiers, VAT included, read at build time from the same variables as the API
// (with the VITE_ prefix). VITE_CRITIQUE_INSTANT_ENABLED unset or false is the beta:
// only Curated is sold, at the Instant price. A change needs a new build.
const envPrice = (value, fallback) => (Number(value) > 0 ? Number(value) : fallback);
const INSTANT_ENABLED = import.meta.env.VITE_CRITIQUE_INSTANT_ENABLED === "true";

export const CRITIQUE_BETA = !INSTANT_ENABLED;
export const CRITIQUE_TIERS = {
  instant: {
    name: "Instant",
    priceEur: envPrice(import.meta.env.VITE_CRITIQUE_INSTANT_PRICE_EUR, 29),
    available: INSTANT_ENABLED,
  },
  curated: {
    name: "Reviewed",
    priceEur: envPrice(import.meta.env.VITE_CRITIQUE_CURATED_PRICE_EUR, 39),
    available: true,
  },
};
/** What a report costs today. */
export const CRITIQUE_PRICE_EUR = CRITIQUE_BETA
  ? CRITIQUE_TIERS.instant.priceEur
  : CRITIQUE_TIERS.curated.priceEur;
export const CRITIQUE_MIN_PHOTOS = 20;
export const CRITIQUE_MAX_PHOTOS = 30;
export const CRITIQUE_MAX_CONTEXT_PHOTOS = 100;
export const CRITIQUE_DELIVERY_HOURS = 12;
export const CRITIQUE_RETENTION_DAYS = 30;

/** The languages a report can be written in, each named in itself. */
export const CRITIQUE_LANGUAGES = [
  "English",
  "Español",
  "Français",
  "Deutsch",
  "Italiano",
  "Português",
];

// A real report, page by page, and the same report as the PDF a buyer downloads.
export const CRITIQUE_SAMPLE_PDF = "/critique/photoreka-critique-sample.pdf";
export const CRITIQUE_SAMPLE_PAGES = Array.from(
  { length: 16 },
  (_, index) => `/critique/sample/${String(index + 1).padStart(2, "0")}.webp`,
);

/** The section each page of the sample belongs to, in page order. */
export const CRITIQUE_SAMPLE_LABELS = [
  "Cover",
  "Portfolio overview",
  "Featured photographs",
  "Featured photographs",
  "Featured photographs",
  "Featured photographs",
  "Featured photographs",
  "Other images",
  "Set-aside images",
  "Style profile",
  "Your strengths",
  "Areas for growth",
  "Areas for growth",
  "Proposed projects",
  "Roadmap",
  "Roadmap",
];

// One critique of a photograph from that report. "works" is word for word the
// report's reading ("Other images", page 8); the report gives that section no
// "could have been better", so "improve" was written for the landing.
export const CRITIQUE_EXCERPT = {
  photo: "/critique/excerpt.webp",
  works:
    "The cropped red scarf in the foreground makes the woman behind seem briefly like a smaller echo. Her sideways glance sends the eye back across the green shutter, turning the repetition of scarves and patterned tops into a relationship across depth.",
  improve:
    "The right third adds little: the stickered pole and the dark arcade behind it pull the eye away from the exchange between the two scarves. A step to the left, or a tighter frame, would have kept attention moving between the two women and let the green shutter carry the whole background.",
};

// The genres a report reads, as the API classifies each photo (CARD_GENRES in
// photoreka_main_api/config/critique_card.ts, without "other"). Colours from the
// contest pages, so a genre looks the same everywhere; architecture has none there.
const genreColor = (key) => CONTEST_GENRES.find((g) => g.key === key)?.color;
export const CRITIQUE_GENRES = [
  { key: "street", label: "Street" },
  { key: "documentary", label: "Documentary" },
  { key: "travel", label: "Travel" },
  { key: "portrait", label: "Portrait" },
  { key: "landscape", label: "Landscape" },
  { key: "architecture", label: "Architecture", color: "#60a5fa" },
  { key: "fine_art", label: "Fine art" },
].map((g) => ({ ...g, color: g.color ?? genreColor(g.key) }));

const eur = (n) => `€${n}`;

const genreNames =CRITIQUE_GENRES.map((g) => g.label.toLowerCase());
const genreList = `${genreNames.slice(0, -1).join(", ")} and ${genreNames.at(-1)}`;

// Shared by the visible FAQ and its FAQPage JSON-LD, which must match word for word.
export const CRITIQUE_FAQS = [
  {
    q: "Who writes the report?",
    a: "An AI system writes it, following curatorial criteria, and a curator reads it against your photographs before it is sent to you. Every statement about a photo is also checked against that photo, and the figures in the report are counted, not estimated. It is a reasoned opinion, not a verdict.",
  },
  {
    q: "What do I receive?",
    a: `A written portfolio review, delivered as a PDF: an overview of your work, a critique of your strongest photographs one by one, the images that hold the set back, a profile of your style counted photo by photo, your strengths as an author, the habits that could turn into a formula, projects your material already points to, and a roadmap with concrete steps for the coming months and open contests worth entering.`,
  },
  {
    q: "How long does it take?",
    a: `The report is written within minutes of your payment and then reviewed by a curator. You receive it in under ${CRITIQUE_DELIVERY_HOURS} hours, at the email you pay with.`,
  },
  {
    q: "Which photographs should I send?",
    a: `The ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} you would put in a portfolio today. You can add up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context: they are not critiqued one by one, but they show your habits and may hold a photograph worth rescuing.`,
  },
  // Only while the beta lasts.
  ...(CRITIQUE_BETA ? [{
    q: "Why does a person review every report?",
    a: `Because we are in beta. The AI writes the whole report on its own, but while we keep refining it we would rather read every portfolio ourselves before it reaches you. So for now you get a curator-reviewed report for the price of an automatic one: ${eur(CRITIQUE_TIERS.instant.priceEur)} instead of ${eur(CRITIQUE_TIERS.curated.priceEur)}. After the beta, Instant reports will arrive in minutes at ${eur(CRITIQUE_TIERS.instant.priceEur)}, and reviewed ones will cost ${eur(CRITIQUE_TIERS.curated.priceEur)}.`,
  }] : []),
  {
    q: "Which kinds of photography does it review?",
    a: `${genreList[0].toUpperCase()}${genreList.slice(1)} photography, in colour or black and white. A portfolio can mix genres: each photograph is read on its own terms, and then the report looks at what holds the set together.`,
  },
  {
    q: "In which languages can I get it?",
    a: `You choose the language of your report when you order: ${CRITIQUE_LANGUAGES.join(", ")}.`,
  },
  {
    q: "Do I need a Photoreka account?",
    a: "No. You pay once per report and receive a private link to it. Nothing to sign up for, nothing to cancel.",
  },
  {
    q: "What happens to my photographs?",
    a: `They are resized in your browser before they are uploaded, used only to write your report, never made public and never used to train any model. Your photographs and your report are kept for ${CRITIQUE_RETENTION_DAYS} days.`,
  },
  {
    q: "How is it different from Photoreka Picks?",
    a: "Picks scores and ranks up to 5,000 photos so you can find your best frames. Critique reads a finished selection as a body of work: what each strong photograph does, what repeats across the set and where to take it next.",
    link: { to: "/ai_photo_picks/", label: "About Picks" },
  },
];
