// Free of runtime imports on purpose: nuxt.config and the sitemap route load
// this file too.
import type { ContestGenre } from "./contests";

export interface ContestCategory {
  /** URL segment under /photo-contests/. */
  slug: string;
  /** Absent for the free-entry page, which cuts across genres. */
  genre?: ContestGenre;
  /** Sentence case, for headings and link text. */
  name: string;
  /** Title case, for the <title> tag. */
  seoTitle: string;
  /** Lowercase, to finish a sentence: "12 ... competitions". */
  noun: string;
  lead: string;
  judgingTitle: string;
  judging: string;
}

// Adding one here also means adding its slug to the route pattern in
// pages/photo-contests/category.vue.
export const CONTEST_CATEGORIES: ContestCategory[] = [
  {
    slug: "free",
    name: "Free photo contests",
    seoTitle: "Free Photo Contests",
    noun: "free-entry photo",
    lead: "Photography competitions with no entry fee: their deadlines, prizes and rules, read on each contest's own site.",
    judgingTitle: "Before you enter a free contest",
    judging:
      "Free to enter does not mean easy to win. Without a fee, a contest usually receives many more entries, so the first round is fast and a photo has to read at a glance. Read the terms on image rights as well: some free contests ask for a broad licence to use the photos you submit.",
  },
  {
    slug: "open-theme",
    genre: "open",
    name: "Open-theme photo contests",
    seoTitle: "Open-Theme Photo Contests",
    noun: "open-theme photography",
    lead: "Photography competitions that accept any subject, with their deadlines, entry fees and prizes read on each contest's own site.",
    judgingTitle: "How open-theme entries are judged",
    judging:
      "An open theme puts every genre in the same pool, so a street frame competes with a landscape and a portrait. The photos that go through tend to be the ones that read instantly and do not look like last year's winners.",
  },
  {
    slug: "street",
    genre: "street",
    name: "Street photography contests",
    seoTitle: "Street Photography Contests",
    noun: "street photography",
    lead: "Street photography competitions and festival open calls, with their deadlines, entry fees and prizes read on each contest's own site.",
    judgingTitle: "How street photography entries are judged",
    judging:
      "Street juries tend to reward an unstaged moment over technical polish: a gesture, a coincidence or a layered frame that could not be repeated. Read each brief for its rule on staged scenes and candid portraits, because it changes from one contest to the next.",
  },
  {
    slug: "documentary",
    genre: "documentary",
    name: "Documentary photography contests",
    seoTitle: "Documentary Photography Contests",
    noun: "documentary photography",
    lead: "Documentary and photojournalism awards and grants, with their deadlines, entry fees and prizes read on each organiser's own site.",
    judgingTitle: "How documentary entries are judged",
    judging:
      "Documentary and photojournalism awards judge the story as much as the single frame, and most ask for captions and a project statement. Editing rules are strict: adding or removing elements usually disqualifies an entry, and finalists may be asked for the original files.",
  },
  {
    slug: "landscape",
    genre: "landscape",
    name: "Landscape photography contests",
    seoTitle: "Landscape Photography Contests",
    noun: "landscape photography",
    lead: "Landscape and nature photography competitions, with their deadlines, entry fees and prizes read on each contest's own site.",
    judgingTitle: "How landscape entries are judged",
    judging:
      "Landscape juries look closely at light, depth and technical control, and many competitions limit how far an image can be composited or altered. Check the rules on focus stacking, sky replacement and AI before you choose.",
  },
  {
    slug: "portrait",
    genre: "portrait",
    name: "Portrait photography contests",
    seoTitle: "Portrait Photography Contests",
    noun: "portrait photography",
    lead: "Portrait photography prizes and competitions, with their deadlines, entry fees and prizes read on each contest's own site.",
    judgingTitle: "How portrait entries are judged",
    judging:
      "Portrait juries respond to the connection between sitter and viewer more than to flawless retouching. Many portrait prizes ask who the sitter is and what the story behind the picture is, so have a caption ready.",
  },
  {
    slug: "travel",
    genre: "travel",
    name: "Travel photography contests",
    seoTitle: "Travel Photography Contests",
    noun: "travel photography",
    lead: "Travel photography competitions, with their deadlines, entry fees and prizes read on each contest's own site.",
    judgingTitle: "How travel entries are judged",
    judging:
      "Travel juries look for a sense of place: people, landscape and daily life that say where you are without a caption. Several competitions judge a set of images rather than one frame, so consistency across the set counts.",
  },
  {
    slug: "fine-art",
    genre: "fine_art",
    name: "Fine art photography contests",
    seoTitle: "Fine Art Photography Contests",
    noun: "fine art photography",
    lead: "Fine art photography awards and open calls, with their deadlines, entry fees and prizes read on each contest's own site.",
    judgingTitle: "How fine art entries are judged",
    judging:
      "Fine art awards judge the idea and how it holds across a series, more than one spectacular frame. An artist statement is usually part of the entry, and the work is read as a project.",
  },
];

export const contestCategory = (slug: string) =>
  CONTEST_CATEGORIES.find((category) => category.slug === slug);

export const contestCategoryForGenre = (genre: string) =>
  CONTEST_CATEGORIES.find((category) => category.genre === genre);

export const contestCategoryPath = (slug: string) => `/photo-contests/${slug}/`;

type Categorised = { genre: string; facts?: { isFree?: boolean | null } | null };

export function contestsInCategory<T extends Categorised>(contests: T[], category: ContestCategory): T[] {
  return contests.filter((contest) =>
    category.genre ? contest.genre === category.genre : contest.facts?.isFree === true,
  );
}
