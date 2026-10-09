// Real Photoreka Picks output for eight street photos: scores, critiques and
// genres exactly as the AI jury returned them. The jury weights mirror the app
// (web/src/config/picks.ts); keep them in sync if the app's juries change.

export const PICKS_APP_URL = "https://app.photoreka.com/picks";
export const PICKS_TRIAL_URL = `${PICKS_APP_URL}?trial=1`;

export const PICKS_PRICE_PER_PHOTO_EUR = 0.01;
export const PICKS_MIN_CHARGE_EUR = 1;
export const PICKS_FREE_TRIAL_PHOTOS = 10;
export const PICKS_MAX_PHOTOS = 5000;
export const PICKS_RETENTION_DAYS = 30;

// Shared by the visible FAQ and its FAQPage JSON-LD, which must match word for word.
export const PICKS_FAQS = [
  {
    q: "Do I need a Photoreka account?",
    a: "No. Picks is a standalone tool: you pay per order and get a private link to your ranking. Nothing to sign up for, nothing to cancel.",
  },
  {
    q: "How much does it cost?",
    a: `€${PICKS_PRICE_PER_PHOTO_EUR.toFixed(2)} per photo, paid once per order, with a €${PICKS_MIN_CHARGE_EUR} minimum. You can try it free with ${PICKS_FREE_TRIAL_PHOTOS} of your own photos first: no card, no account.`,
  },
  {
    q: "Do my original photos get uploaded?",
    a: "No. Only an 800-pixel thumbnail of each photo is sent for judging. Your full-resolution files stay on your device, and in Chrome or Edge Picks can read them back from your disk to download them from the ranking.",
  },
  {
    q: "How long does it take?",
    a: "A few minutes for a few hundred photos, and under half an hour for 5,000. You can watch the ranking build up live or close the tab once the upload is done.",
  },
  {
    q: "How are the juries different?",
    a: "Every photo is scored once on eight criteria. Each jury weighs those criteria differently, and themed juries such as street or landscape only rank the photos that belong to their genre.",
  },
  {
    q: "Can Picks help me choose photos for a photography competition?",
    a: "Yes. Award juries only keep the photos that clear a high score, and every photo comes with a critique of what works and what holds it back, so you get a shortlist of candidate entries. The jury does not know the contest's theme or rules, so make the final call against the brief yourself.",
    link: { to: "/blog/how-to-choose-photos-for-a-photo-contest", label: "How to choose your contest entries" },
  },
  {
    q: "What file formats are supported?",
    a: "JPEG, PNG and WebP. Export your RAW files to JPEG first; the jury only needs the image, not the raw data.",
  },
  {
    q: "What happens to my photos afterwards?",
    a: `Thumbnails and results are deleted after ${PICKS_RETENTION_DAYS} days. They are never shared and never used to train AI models.`,
  },
  {
    q: "How is Picks different from Photoreka's Photo Scoring?",
    a: `Picks is a standalone tool for a one-off batch of photos: no account, pay per photo, results kept for ${PICKS_RETENTION_DAYS} days. Photo Scoring is part of a Photoreka account and scores your whole catalog permanently, so you can search, filter and follow your work over time.`,
    link: { to: "/photo_scoring", label: "Discover Photo Scoring" },
  },
];

export const PICKS_CRITERIA = [
  { key: "aesthetics", label: "Aesthetics" },
  { key: "composition", label: "Composition" },
  { key: "storytelling", label: "Storytelling" },
  { key: "originality", label: "Originality" },
  { key: "message", label: "Message" },
  { key: "humor", label: "Humor" },
  { key: "visual_games", label: "Visual games" },
  { key: "spontaneity", label: "Spontaneity" },
];

export const SHOWCASE_PHOTOS = [
  {
    id: 1,
    src: "/picks/photos/1.jpg",
    genres: ["street", "documentary"],
    scores: { aesthetics: 8.5, composition: 9, storytelling: 9, originality: 8, message: 8, humor: 3, visual_games: 4, spontaneity: 8.5 },
    critique:
      "The warm side-light on the orange sari against the turquoise cupboard is gorgeous, but the boiling pot in the foreground could be framed slightly higher to strengthen its connection to the intimate exchange on the bed.",
  },
  {
    id: 2,
    src: "/picks/photos/2.jpg",
    genres: ["street", "fine_art"],
    scores: { aesthetics: 8, composition: 8.5, storytelling: 8, originality: 8.5, message: 7, humor: 4, visual_games: 7.5, spontaneity: 8 },
    critique:
      "The eerie spotlighted girl with outstretched arms and the two oblivious figures create a cinematic tension; consider simplifying the bright flare at the bottom, which pulls attention from the trio.",
  },
  {
    id: 3,
    src: "/picks/photos/3.jpg",
    genres: ["street", "travel"],
    scores: { aesthetics: 8, composition: 9, storytelling: 7.5, originality: 8, message: 6.5, humor: 5, visual_games: 7, spontaneity: 7.5 },
    critique:
      "The split stall with mirrored shrines and the man leaning into the light is a strong formal construction; watch the blown characters at the very top, which compete with his face.",
  },
  {
    id: 4,
    src: "/picks/photos/4.jpg",
    genres: ["street", "documentary"],
    scores: { aesthetics: 7, composition: 7.5, storytelling: 8, originality: 7, message: 7.5, humor: 3, visual_games: 6.5, spontaneity: 8.5 },
    critique:
      "The layered gazes and reflections around the two veiled women are compelling, but the large blurred arm and phone dominate the foreground more than they help the narrative.",
  },
  {
    id: 5,
    src: "/picks/photos/5.jpg",
    genres: ["street", "travel", "portrait"],
    scores: { aesthetics: 8.5, composition: 8, storytelling: 7.5, originality: 7.5, message: 6.5, humor: 4, visual_games: 3, spontaneity: 8 },
    critique:
      "The turquoise bathhouse geometry beautifully frames the relaxed couple, yet the woman's cropped legs and the empty upper space risk diluting the intimacy of their interaction.",
  },
  {
    id: 6,
    src: "/picks/photos/6.jpg",
    genres: ["street", "documentary"],
    scores: { aesthetics: 8, composition: 8.5, storytelling: 8.5, originality: 7.5, message: 8, humor: 4, visual_games: 4, spontaneity: 8.5 },
    critique:
      "The woman with sunflowers and a faraway expression anchors the carriage poignantly; wait a beat for a clearer separation of faces from the poles and foreground heads.",
  },
  {
    id: 7,
    src: "/picks/photos/7.jpg",
    genres: ["street", "travel"],
    scores: { aesthetics: 8, composition: 8.5, storytelling: 8, originality: 8.5, message: 7.5, humor: 6, visual_games: 8.5, spontaneity: 8 },
    critique:
      "The split frame between the smoking man and the sensuous waterfall painting is a clever visual rhyme; a slight step left to avoid cutting the right figure's arm would refine it further.",
  },
  {
    id: 8,
    src: "/picks/photos/8.jpg",
    genres: ["street", "landscape"],
    scores: { aesthetics: 7.5, composition: 8, storytelling: 7, originality: 7.5, message: 6, humor: 5, visual_games: 7, spontaneity: 8 },
    critique:
      "The clash of inflatable primary colours with corporate towers is strong, and the girl's outstretched hands pop nicely; tightening the right edge to avoid the partial second child would sharpen the focus.",
  },
];

export const SHOWCASE_JURIES = [
  {
    id: "overall",
    label: "Overall",
    tagline: "A balanced eye across every criterion.",
    weights: { aesthetics: 1, composition: 1, storytelling: 0.8, originality: 0.8, message: 0.6, humor: 0.3, visual_games: 0.4, spontaneity: 0.4 },
  },
  {
    id: "street",
    label: "Street",
    tagline: "Timing, wit and the theatre of everyday life.",
    genres: ["street"],
    weights: { aesthetics: 0.6, composition: 0.8, storytelling: 0.9, originality: 0.9, message: 0.5, humor: 0.7, visual_games: 0.8, spontaneity: 1 },
  },
  {
    id: "documentary",
    label: "Documentary",
    tagline: "Truth, context and human stories.",
    genres: ["documentary"],
    weights: { aesthetics: 0.4, composition: 0.7, storytelling: 1, originality: 0.4, message: 1, humor: 0.1, visual_games: 0.2, spontaneity: 0.8 },
  },
  {
    id: "travel",
    label: "Travel",
    tagline: "A sense of place you can almost smell.",
    genres: ["travel"],
    weights: { aesthetics: 0.9, composition: 0.8, storytelling: 0.7, spontaneity: 0.5, originality: 0.5, message: 0.3, humor: 0.3, visual_games: 0.3 },
  },
  {
    id: "visual_games",
    label: "Visual games",
    tagline: "Ranked by a single criterion: rhymes, reflections, tricks of the eye.",
    weights: { visual_games: 1 },
  },
];

function weightedScore(scores, weights) {
  let sum = 0;
  let used = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (typeof scores[key] !== "number") continue;
    sum += scores[key] * weight;
    used += weight;
  }
  return used ? sum / used : null;
}

/** Same rule as the app: a themed jury only ranks photos of its genres. */
export function rankShowcase(juryId) {
  const jury = SHOWCASE_JURIES.find((j) => j.id === juryId) ?? SHOWCASE_JURIES[0];
  return SHOWCASE_PHOTOS.filter((p) => !jury.genres || p.genres.some((g) => jury.genres.includes(g)))
    .map((photo) => ({ photo, score: weightedScore(photo.scores, jury.weights) }))
    .sort((a, b) => b.score - a.score)
    .map((item, i) => ({ ...item, rank: i + 1 }));
}

export const formatScore = (n) => (typeof n === "number" ? n.toFixed(1) : "–");
