import {
  CONTEST_CATEGORIES,
  contestCategoryPath,
  contestsInCategory,
} from "../../app/utils/contestCategories";

// Prerendered at build time: the contest URLs come from the API, like the pages.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { contests } = await $fetch<{
    contests: {
      slug: string;
      checkedAt: string | null;
      genre: string;
      facts?: { isFree?: boolean | null } | null;
    }[];
  }>("/api/contests", { baseURL: config.public.mainApiBaseUrl });

  const site = String(config.public.siteUrl).replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);

  const entry = (path: string, lastmod: string, priority: string) =>
    `  <url>\n    <loc>${site}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const urls = [
    entry("/photo-contests/", today, "0.9"),
    ...CONTEST_CATEGORIES.filter((category) => contestsInCategory(contests, category).length > 0).map(
      (category) => entry(contestCategoryPath(category.slug), today, "0.8"),
    ),
    ...contests.map((contest) =>
      entry(`/photo-contests/${contest.slug}/`, contest.checkedAt?.slice(0, 10) ?? today, "0.7"),
    ),
  ];

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
});
