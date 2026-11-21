// What the Photoreka Critique landing states about the product. The numbers mirror
// the API (main_api/config/critique.ts), which is the source of truth for the charge
// and the limits; keep them in sync if the product changes.

export const CRITIQUE_APP_URL = "https://app.photoreka.com/critique";

// VAT included.
export const CRITIQUE_PRICE_EUR = 29;
export const CRITIQUE_MIN_PHOTOS = 20;
export const CRITIQUE_MAX_PHOTOS = 30;
export const CRITIQUE_MAX_CONTEXT_PHOTOS = 100;
export const CRITIQUE_DELIVERY_HOURS = 24;
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
  { length: 15 },
  (_, index) => `/critique/sample/${String(index + 1).padStart(2, "0")}.webp`,
);

// One critique of that report, word for word.
export const CRITIQUE_EXCERPT = {
  photo: "/critique/excerpt.webp",
  works:
    "An ordinary phone call acquires an extravagant golden hairdo: the stacked bangles beside the woman’s head suggest elaborate rollers. Her red clothing catches the eye, then the jewellery draws attention towards the display. The bracelets on her wrists echo the merchandise, while the red counter carries her clothing’s colour across to the men, whose presence gives the stall a life beyond the visual joke.",
  improve:
    "The suggested hairdo remains slightly tentative because the bangle stacks sit beside the woman’s hair rather than clearly within its outline. A small shift in viewpoint might have brought them into closer alignment, making the comic transformation more immediate.",
};

// Shared by the visible FAQ and its FAQPage JSON-LD, which must match word for word.
export const CRITIQUE_FAQS = [
  {
    q: "Who writes the report?",
    a: "An AI system writes it, following curatorial criteria, and a curator reads it against your photographs before it is sent to you. Every statement about a photo is also checked against that photo, and the figures in the report are counted, not estimated. It is a reasoned opinion, not a verdict.",
  },
  {
    q: "What do I receive?",
    a: `A written portfolio review, delivered as a PDF: an overview of your work, a critique of your strongest photographs one by one, the images that hold the set back, your strengths as an author, the habits that could turn into a formula, projects your material already points to, and a roadmap with concrete steps for the coming months and open contests worth entering.`,
  },
  {
    q: "How long does it take?",
    a: `The report is written within minutes of your payment and then reviewed by a curator. You receive it within ${CRITIQUE_DELIVERY_HOURS} hours, at the email you pay with.`,
  },
  {
    q: "Which photographs should I send?",
    a: `The ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} you would put in a portfolio today. You can add up to ${CRITIQUE_MAX_CONTEXT_PHOTOS} more as context: they are not critiqued one by one, but they show your habits and may hold a photograph worth rescuing.`,
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
