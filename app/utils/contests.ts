import { PICKS_CRITERIA } from "./picksShowcase";

export type ContestGenre =
  | "open"
  | "street"
  | "documentary"
  | "landscape"
  | "portrait"
  | "travel"
  | "fine_art";

export type ContestStatus = "upcoming" | "open" | "closed" | "unknown";

export interface ContestFacts {
  edition: string | null;
  opensAt: string | null;
  deadline: string | null;
  earlyDeadline: string | null;
  entryFee: string | null;
  isFree: boolean | null;
  prizes: string | null;
  categories: string[];
  accepts: "single" | "series" | "both" | null;
  maxImages: number | null;
  eligibility: string | null;
  entryUrl: string | null;
  nextOpening: string | null;
}

/** Written from the official site and approved in the admin. */
export interface ContestDescription {
  /** One sentence, for search results. */
  summary: string;
  about: string;
  rewards: string | null;
  audience: string | null;
}

export interface Contest {
  slug: string;
  juryId: string;
  name: string;
  url: string;
  genre: ContestGenre;
  juryGenres: string[] | null;
  tagline: string;
  weights: Record<string, number>;
  cadence: "annual" | "biennial" | "monthly";
  featured: boolean;
  /** Our optimised copy of the contest's image; null until one is approved. */
  imageUrl: string | null;
  /** Chosen in the admin to open the contests page. */
  hero: boolean;
  facts: ContestFacts | null;
  /** Null until one is approved: the page then shows only the facts. */
  description: ContestDescription | null;
  checkedAt: string | null;
}

export interface ContestsResponse {
  minScore: number;
  contests: Contest[];
}

export const CLOSING_SOON_DAYS = 14;

export const CONTEST_GENRES: { key: ContestGenre; label: string; color: string }[] = [
  { key: "open", label: "Open theme", color: "#a8a29e" },
  { key: "street", label: "Street", color: "#fb923c" },
  { key: "documentary", label: "Documentary", color: "#f87171" },
  { key: "landscape", label: "Landscape", color: "#4ade80" },
  { key: "portrait", label: "Portrait", color: "#f472b6" },
  { key: "travel", label: "Travel", color: "#22d3ee" },
  { key: "fine_art", label: "Fine art", color: "#a78bfa" },
];

export const contestGenre = (key: string) =>
  CONTEST_GENRES.find((genre) => genre.key === key) ?? CONTEST_GENRES[0]!;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const pad = (n: number) => String(n).padStart(2, "0");

/** The visitor's calendar day, as YYYY-MM-DD. */
export function todayIso(date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Dates are plain calendar days: parsing them as UTC keeps the arithmetic free
// of time zones and daylight saving.
const toUtc = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y!, (m ?? 1) - 1, d ?? 1);
};

export const daysBetween = (fromIso: string, toIso: string) =>
  Math.round((toUtc(toIso) - toUtc(fromIso)) / 86_400_000);

export function contestStatus(contest: Contest, today: string): ContestStatus {
  const facts = contest.facts;
  if (!facts) return "unknown";
  if (facts.opensAt && facts.opensAt > today) return "upcoming";
  if (!facts.deadline) return "unknown";
  return facts.deadline >= today ? "open" : "closed";
}

/** Days until the final deadline of a contest that is open; 0 = closes today. */
export function daysLeft(contest: Contest, today: string): number | null {
  if (contestStatus(contest, today) !== "open") return null;
  return daysBetween(today, contest.facts!.deadline!);
}

export function daysToOpening(contest: Contest, today: string): number | null {
  if (contestStatus(contest, today) !== "upcoming") return null;
  return daysBetween(today, contest.facts!.opensAt!);
}

export function isClosingSoon(contest: Contest, today: string): boolean {
  const left = daysLeft(contest, today);
  return left !== null && left <= CLOSING_SOON_DAYS;
}

/** The date a contest sits on in the timeline: its deadline while open, its opening before. */
export function contestKeyDate(contest: Contest, today: string): string | null {
  const status = contestStatus(contest, today);
  if (status === "open") return contest.facts!.deadline;
  if (status === "upcoming") return contest.facts!.opensAt;
  return null;
}

// Hand-rolled so the prerendered HTML and the browser always agree, whatever
// their locale or time zone.
export function formatContestDate(iso: string | null | undefined, style: "long" | "short" = "long"): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[(m ?? 1) - 1] ?? "";
  return style === "short" ? `${d} ${month.slice(0, 3)}` : `${d} ${month} ${y}`;
}

export const contestWeekday = (iso: string) => WEEKDAYS[new Date(toUtc(iso)).getUTCDay()] ?? "";

export const contestMonthKey = (iso: string) => iso.slice(0, 7);

export function contestMonthLabel(key: string): { month: string; year: string } {
  const [y, m] = key.split("-").map(Number);
  return { month: MONTHS[(m ?? 1) - 1] ?? "", year: String(y) };
}

export function formatCheckedAt(isoDateTime: string | null): string {
  return isoDateTime ? formatContestDate(isoDateTime.slice(0, 10)) : "";
}

export function daysLabel(days: number): string {
  if (days === 0) return "Closes today";
  return days === 1 ? "1 day left" : `${days} days left`;
}

export function openingLabel(days: number): string {
  return days === 1 ? "Opens tomorrow" : `Opens in ${days} days`;
}

export function contestFeeLabel(facts: ContestFacts | null): string {
  if (!facts) return "";
  if (facts.isFree) return "Free entry";
  return facts.entryFee ?? "";
}

export function contestFormatLabel(accepts: ContestFacts["accepts"]): string {
  if (accepts === "single") return "Single images";
  if (accepts === "series") return "Series";
  if (accepts === "both") return "Single images and series";
  return "";
}

/** Criteria a jury weighs, heaviest first, with the weight relative to its top one. */
export function contestJuryFocus(weights: Record<string, number>) {
  const entries = Object.entries(weights).filter(([, weight]) => weight > 0);
  const max = Math.max(...entries.map(([, weight]) => weight), 1);
  return entries
    .sort(([, a], [, b]) => b - a)
    .map(([key, weight]) => ({
      key,
      label: PICKS_CRITERIA.find((criterion) => criterion.key === key)?.label ?? key,
      share: weight / max,
    }));
}

export interface ContestFilter {
  genre: ContestGenre | "all";
  free: boolean;
  format: "any" | "single" | "series";
  query: string;
}

export const emptyContestFilter = (): ContestFilter => ({
  genre: "all",
  free: false,
  format: "any",
  query: "",
});

export function matchesContestFilter(contest: Contest, filter: ContestFilter): boolean {
  if (filter.genre !== "all" && contest.genre !== filter.genre) return false;
  if (filter.free && contest.facts?.isFree !== true) return false;
  if (filter.format !== "any") {
    const accepts = contest.facts?.accepts;
    if (accepts !== filter.format && accepts !== "both") return false;
  }
  const query = filter.query.trim().toLowerCase();
  return !query || contest.name.toLowerCase().includes(query);
}

export const contestPath = (slug: string) => `/photo-contests/${slug}/`;

export const picksContestUrl = (appUrl: string, slug: string, trial = false) =>
  `${appUrl}/picks?contest=${encodeURIComponent(slug)}${trial ? "&trial=1" : ""}`;
