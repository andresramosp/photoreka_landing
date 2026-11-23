// What the Photoreka Critique landing states about the product. The numbers mirror
// the API (main_api/config/critique.ts), which is the source of truth for the charge
// and the limits; keep them in sync if the product changes.

import { CONTEST_GENRES } from "./contests";
import { PICKS_MAX_PHOTOS } from "./picksShowcase";

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
export const CRITIQUE_MAX_CONTEXT_PHOTOS = 50;
/** How long a Reviewed report takes: the curator's pass. Instant takes minutes. */
export const CRITIQUE_DELIVERY_HOURS = 12;
export const CRITIQUE_RETENTION_DAYS = 30;

/**
 * When the report a buyer gets by default arrives. During the beta every report
 * is Reviewed, so it is the curator's delay; after it, Instant is the default.
 * Reads after "in" or "delivered in": "under 12 hours" / "minutes".
 */
export const CRITIQUE_DEFAULT_DELIVERY = CRITIQUE_BETA
  ? `under ${CRITIQUE_DELIVERY_HOURS} hours`
  : "minutes";

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
// The PDF has 18 pages; the last one only holds the note on contest dates, so the
// reel stops at 17.
export const CRITIQUE_SAMPLE_PDF = "/critique/photoreka-critique-sample.pdf";
export const CRITIQUE_SAMPLE_PAGES = Array.from(
  { length: 17 },
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

/** What the sample report was written on: the photos reviewed and those sent as context. */
export const CRITIQUE_SAMPLE_PHOTOS = 23;
export const CRITIQUE_SAMPLE_CONTEXT_PHOTOS = 11;

/**
 * The three faces of a report, back to front: a growth area (page 13), a featured
 * critique (page 6) and the cover on top. Shared by the landing hero and the promo;
 * the web app keeps its own copies of the same pages (photoreka_web/src/assets/critique).
 */
export const CRITIQUE_HERO_PAGES = [12, 5, 0].map((index) => CRITIQUE_SAMPLE_PAGES[index]);

// One critique of a photograph from the sample report, which is pure AI output
// (Featured photographs 02/08, page 4). "improve" is word for word; "works" keeps
// three of its four sentences, word for word (it drops the second, which only reads
// against the rest of the portfolio), to fit the layout.
export const CRITIQUE_EXCERPT = {
  photo: "/critique/excerpt-kolkata.webp",
  alt: "A woman in an orange sari leans over a man resting on a bed in a Kolkata home, both with raised hands, while a pot boils over open flames in the foreground in front of a blue cupboard drawn with hearts",
  works:
    "The photograph gives a private exchange the physical immediacy of the fire beside it. The leaning bodies and raised hands concentrate attention at the bed; orange fabric echoes the foreground flames, binding people and hearth across the room. Hearts drawn on the blue cupboard lend the encounter a suggestion of tenderness without establishing the nature of the relationship.",
  improve:
    "The closeness of the bodies gives the exchange its intensity, but the shadowed overlap around the reclining person’s face and the raised hands makes the precise gesture somewhat difficult to distinguish.",
};

// The "how it works" manuscript: another reading from the same report, word for
// word ("Other images" 01/03, page 9), with an illustrative curator's addition.
export const CRITIQUE_MANUSCRIPT = {
  photo: "/critique/excerpt.webp",
  text: "The close foreground figure interrupts the frame with a red headscarf and patterned top, echoed by the woman farther back. The difference in scale makes the resemblance uncanny, while the farther woman’s sideways glance gives the near-double a fleeting human connection.",
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

/**
 * Who a report is for: authors with an artistic or documentary intent. Commercial
 * work is not read on its own terms yet (the API has no commercial reading), and
 * personal snapshots are left out because the report judges authorship.
 */
export const CRITIQUE_AUDIENCE =
  "Made for photographers building a body of work with an artistic or documentary intent. Not built for commercial or client work, or for everyday snapshots.";

/** Who looks at the photographs before the report is sent, by tier. */
export const CRITIQUE_WHO_SEES = CRITIQUE_BETA
  ? "During the beta, the curator who reviews your report sees them."
  : "An Instant report is sent without anyone looking at your photographs; in a Reviewed report, the curator who reviews it does.";

const genreNames =CRITIQUE_GENRES.map((g) => g.label.toLowerCase());
const genreList = `${genreNames.slice(0, -1).join(", ")} and ${genreNames.at(-1)}`;

// Shared by the visible FAQ and its FAQPage JSON-LD, which must match word for word.
export const CRITIQUE_FAQS = [
  {
    q: "Who writes the report?",
    a: `Our AI writes the whole report, following curatorial criteria: it ties every statement to the photograph it talks about and counts every figure instead of estimating it. In a Reviewed report, a curator also reads it against your photographs, adds their notes and signs it off before it reaches you.${CRITIQUE_BETA ? " During the beta, every report is Reviewed." : ""} Either way, it is a reasoned opinion, not a verdict.`,
  },
  {
    q: "Is an Instant report as good as a Reviewed one?",
    a: "It is the same report: the reading, the critiques, the counts and the roadmap are written by the AI in both. A curator adds references to photographers and books, nuance where your context or intent matters, and a person who answers for the result. Choose Reviewed when that accountability matters to you, for example before a grant, a book or a gallery submission.",
  },
  {
    q: "Why not just ask ChatGPT to review my portfolio?",
    a: `A general chatbot tends to comment one photo at a time, and to praise. Critique reads your ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} photographs as a body of work: it counts what repeats across the set, names the images that hold it back and ties every statement to a photograph, always with the same criteria.`,
    link: {
      to: "/blog/can-ai-review-a-photography-portfolio/",
      label: "What AI can and can't judge in a portfolio",
    },
  },
  {
    q: "What do I receive?",
    a: `A written portfolio review, delivered as a PDF: an overview of your work, a critique of your strongest photographs one by one, the images that hold the set back, a profile of your style counted photo by photo, your strengths as an author, the habits that could turn into a formula, projects your material already points to, and a roadmap with concrete steps for the coming months and up to five contests worth entering, with the ones open now marked.`,
  },
  {
    q: "How long does it take?",
    a: CRITIQUE_BETA
      ? `The report is written within minutes of your payment. During the beta a curator reviews every report, so it reaches you in under ${CRITIQUE_DELIVERY_HOURS} hours, at the email you pay with.`
      : `An Instant report is ready within minutes of your payment. A Reviewed report reaches you in under ${CRITIQUE_DELIVERY_HOURS} hours, once a curator has signed it off. Both arrive at the email you pay with.`,
  },
  {
    q: "Which photographs should I send?",
    a: `Your portfolio: the ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} photographs you would show today, not a random batch. The report reads your selection as a statement of who you are as a photographer, so every choice counts. You can add up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context: they are not critiqued one by one, but they show your habits and may hold a photograph worth rescuing. Not sure which ones are your best? Photoreka Picks ranks up to ${PICKS_MAX_PHOTOS.toLocaleString("en-US")} photos to find them.`,
    link: { to: "/ai_photo_picks/", label: "Find your best photos with Picks" },
  },
  // Only while the beta lasts.
  ...(CRITIQUE_BETA ? [{
    q: "Why does a curator review every report during the beta?",
    a: `The AI writes the whole report on its own; reading every one ourselves while we refine it is how we keep raising the bar. You get the curator's pass as a bonus: a Reviewed report for ${eur(CRITIQUE_TIERS.instant.priceEur)} instead of ${eur(CRITIQUE_TIERS.curated.priceEur)}. After the beta, Instant reports will arrive in minutes at ${eur(CRITIQUE_TIERS.instant.priceEur)}, and Reviewed ones will cost ${eur(CRITIQUE_TIERS.curated.priceEur)}.`,
  }] : []),
  {
    q: "Who is it for?",
    a: `Photographers building a body of work with an artistic or documentary intent: ${genreList} photography, from personal projects to long-term series, in colour or black and white. A portfolio can mix genres: each photograph is read on its own terms, and then the report looks at what holds the set together. It is not designed for commercial or client work (product, fashion, advertising, weddings) or for everyday snapshots: the report judges authorship, and those photographs are made for other reasons. Before you pay, a quick look at your photos tells you if some of them fall outside what the report is built for.`,
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
    a: `They are resized in your browser before they are uploaded, used only to write your report, never made public and never used to train any model. ${CRITIQUE_WHO_SEES} Your photographs and your report are kept for ${CRITIQUE_RETENTION_DAYS} days.`,
  },
  {
    q: "How is it different from Photoreka Picks?",
    a: "Picks scores and ranks up to 5,000 photos so you can find your best frames. Critique reads a finished selection as a body of work: what each strong photograph does, what repeats across the set and where to take it next.",
    link: { to: "/ai_photo_picks/", label: "About Picks" },
  },
];
