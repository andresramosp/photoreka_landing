<template>
  <ContestsShell :links="navLinks">
    <template #nav-actions>
      <NuxtLink to="/photo-contests/" class="lx-link pc-nav-back">All photo contests</NuxtLink>
      <LxButton size="sm" to="/ai_photo_picks/">About Picks</LxButton>
    </template>

    <ContestHeroStage
      :contests="inCategory"
      :today="today"
      :title="`${category.name} ${season}`"
      :lead="category.lead"
      compact
    >
      <template #crumbs>
        <nav class="pcc-crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/photo-contests/">Photo contests</NuxtLink>
          <span aria-hidden="true">/</span>
          <span>{{ crumb }}</span>
        </nav>
      </template>
    </ContestHeroStage>

    <!-- ── The category in figures ─────────────────────────────────── -->
    <section class="pcc-figures">
      <div class="lx-container">
        <ul class="pcc-stats">
          <li v-for="stat in stats" :key="stat.label">
            <span class="pc-num pcc-stats__value">{{ stat.value }}</span>
            <span class="pcc-stats__label">{{ stat.label }}</span>
            <NuxtLink v-if="stat.contest" :to="contestPath(stat.contest.slug)" class="lx-inline-link pcc-stats__link">
              {{ stat.contest.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- ── Open and upcoming ───────────────────────────────────────── -->
    <section id="calendar" class="pcc-block">
      <div class="lx-container">
        <ContestSectionHead :title="calendarTitle" :count="live.length || null">
          <template v-if="live.length">
            Open contests are listed by deadline, upcoming ones by the day entries open.
          </template>
          <template v-else>
            None of these contests is taking entries right now. They are listed below, with what each
            one has published about its next edition.
          </template>
        </ContestSectionHead>
        <div v-if="live.length" class="pc-panel pcc-panel">
          <ContestTimeline :contests="live" :today="today" />
        </div>
      </div>
    </section>

    <!-- ── Closed ──────────────────────────────────────────────────── -->
    <section v-if="closed.length" id="closed" class="pcc-block">
      <div class="lx-container">
        <ContestSectionHead title="Closed until the next edition" :count="closed.length">
          Open a contest to get an email the day entries reopen.
        </ContestSectionHead>
        <ContestCompactList :contests="closed" kind="closed" />
      </div>
    </section>

    <!-- ── Dates to be confirmed ───────────────────────────────────── -->
    <section v-if="unconfirmed.length" id="to-be-confirmed" class="pcc-block">
      <div class="lx-container">
        <ContestSectionHead title="Dates to be confirmed" :count="unconfirmed.length">
          Nothing is listed until it is confirmed on the contest's official site.
        </ContestSectionHead>
        <ContestCompactList :contests="unconfirmed" kind="unconfirmed" />
      </div>
    </section>

    <!-- ── How entries are judged, and Picks ───────────────────────── -->
    <section id="judging" class="pcc-block">
      <div class="lx-container">
        <ContestSectionHead :title="category.judgingTitle" />
        <div class="pcc-judging">
          <div class="pcc-judging__copy">
            <p>{{ category.judging }}</p>
            <p>
              Whatever the contest, an entry is judged against its brief. Our guide on
              <NuxtLink to="/blog/how-to-choose-photos-for-a-photo-contest/" class="lx-inline-link">
                how to choose photos for a contest</NuxtLink
              >
              covers how juries screen entries, from the first glance to the final technical checks.
            </p>
          </div>
          <aside class="pc-panel pcc-judging__picks">
            <p class="pc-kicker">Photoreka Picks</p>
            <p class="pcc-judging__lead">A jury for each of these contests</p>
            <p>
              Picks ranks your photos with a jury weighted for the contest you choose.
              <template v-if="juryFocus">
                Across these {{ inCategory.length }} contests, the juries give the most weight to
                <strong>{{ juryFocus }}</strong
                >.
              </template>
            </p>
            <LxButton icon="external" :href="PICKS_TRIAL_URL" target="_blank" @click="trackPicks">
              Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
            </LxButton>
            <p class="pcc-judging__note">
              No account needed. The ranking is orientation for choosing your entries, not a
              prediction.
            </p>
          </aside>
        </div>
      </div>
    </section>

    <!-- ── Other categories ────────────────────────────────────────── -->
    <section id="by-genre" class="pcc-block pcc-last">
      <div class="lx-container">
        <ContestSectionHead title="Photo contests by genre">
          <template #aside>
            <NuxtLink to="/photo-contests/" class="lx-link">See every photo contest</NuxtLink>
          </template>
        </ContestSectionHead>
        <ContestCategoryLinks :contests="contests" :today="today" :current="category.slug" />
        <ContestDisclaimer class="pcc-disclaimer" />
      </div>
    </section>
  </ContestsShell>
</template>

<script setup>
import ContestsShell from "~/components/contests/ContestsShell.vue";
import ContestHeroStage from "~/components/contests/ContestHeroStage.vue";
import ContestTimeline from "~/components/contests/ContestTimeline.vue";
import ContestCompactList from "~/components/contests/ContestCompactList.vue";
import ContestCategoryLinks from "~/components/contests/ContestCategoryLinks.vue";
import ContestDisclaimer from "~/components/contests/ContestDisclaimer.vue";
import ContestSectionHead from "~/components/contests/ContestSectionHead.vue";
import {
  contestGenre,
  contestJuryFocus,
  contestPath,
  contestStatus,
  formatContestDate,
} from "~/utils/contests";
import { contestCategory, contestCategoryPath, contestsInCategory } from "~/utils/contestCategories";
import { PICKS_FREE_TRIAL_PHOTOS, PICKS_TRIAL_URL } from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";
import { seoConfig } from "~/config/seo";

// One slug per entry of CONTEST_CATEGORIES. The pattern outranks the contest
// page's plain :slug, so every other segment is still read as a contest.
definePageMeta({
  path: "/photo-contests/:category(free|open-theme|street|documentary|landscape|portrait|travel|fine-art)",
});

const route = useRoute();
const { contests, today } = await useContests();

const category = contestCategory(String(route.params.category));
const inCategory = computed(() => (category ? contestsInCategory(contests.value, category) : []));

// A category without contests would be an empty page: better none at all.
if (!category || !inCategory.value.length) {
  throw createError({ statusCode: 404, statusMessage: "Contest category not found", fatal: true });
}

const statusOf = (contest) => contestStatus(contest, today.value);
const byDeadline = (a, b) => a.facts.deadline.localeCompare(b.facts.deadline);

const open = computed(() => inCategory.value.filter((c) => statusOf(c) === "open").sort(byDeadline));
const upcoming = computed(() =>
  inCategory.value
    .filter((c) => statusOf(c) === "upcoming")
    .sort((a, b) => a.facts.opensAt.localeCompare(b.facts.opensAt)),
);
const live = computed(() => [...open.value, ...upcoming.value]);
const closed = computed(() =>
  inCategory.value.filter((c) => statusOf(c) === "closed").sort((a, b) => byDeadline(b, a)),
);
const unconfirmed = computed(() =>
  inCategory.value.filter((c) => statusOf(c) === "unknown").sort((a, b) => a.name.localeCompare(b.name)),
);

const crumb = category.genre ? contestGenre(category.genre).label : "Free entry";
// "Street photography contest calendar": short enough to stay on one line.
const calendarTitle = `${category.name.replace(/contests$/, "contest")} calendar`;

const stats = computed(() => {
  // A figure of zero says nothing, so only the total is always shown.
  const list = [
    { value: inCategory.value.length, label: inCategory.value.length === 1 ? "contest listed" : "contests listed" },
    { value: open.value.length, label: "open for entries now" },
    category.genre
      ? { value: inCategory.value.filter((c) => c.facts?.isFree).length, label: "free to enter" }
      : { value: upcoming.value.length, label: "opening soon" },
  ].filter((stat, i) => i === 0 || stat.value);
  const next = open.value[0];
  const opening = upcoming.value[0];
  if (next) {
    list.push({ value: formatContestDate(next.facts.deadline, "short"), label: "next deadline", contest: next });
  } else if (opening) {
    list.push({ value: formatContestDate(opening.facts.opensAt, "short"), label: "next opening", contest: opening });
  }
  return list;
});

// The criteria the juries of these contests weigh most, each contest counting the same.
const juryFocus = computed(() => {
  const totals = {};
  for (const contest of inCategory.value) {
    const weights = Object.entries(contest.weights ?? {});
    const sum = weights.reduce((acc, [, weight]) => acc + weight, 0);
    if (!sum) continue;
    for (const [key, weight] of weights) totals[key] = (totals[key] ?? 0) + weight / sum;
  }
  const labels = contestJuryFocus(totals)
    .slice(0, 3)
    .map((item) => item.label.toLowerCase());
  return labels.length > 1 ? `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}` : (labels[0] ?? "");
});

const navLinks = computed(() => [
  { label: "Open now", target: "calendar" },
  ...(closed.value.length ? [{ label: "Closed", target: "closed" }] : []),
  { label: "Judging", target: "judging" },
  { label: "By genre", target: "by-genre" },
]);

// ── SEO: built once from what the build saw ────────────────────────────
// The years follow the calendar, so the page never names a past season.
const year = Number(today.value.slice(0, 4));
const season = `${year}–${year + 1}`;
const pageUrl = `${seoConfig.siteUrl}${contestCategoryPath(category.slug)}`;
const listed = inCategory.value.slice().sort((a, b) => a.name.localeCompare(b.name));
const openCount = open.value.length;
const lowerName = category.name.toLowerCase();

useSEO(undefined, {
  title: `${category.seoTitle} ${year} & ${year + 1}: ${
    category.genre ? "Deadlines & Fees" : "Free Entry, Deadlines & Prizes"
  } | Photoreka`,
  description: `${listed.length} ${category.noun} competitions for ${year} and ${year + 1}${
    openCount ? `, ${openCount} open for entries now` : ""
  }: ${category.genre ? "deadlines, entry fees, prizes" : "deadlines, prizes"} and rules, each checked on the official site.`,
  keywords: `${lowerName}, ${lowerName} ${year}, ${lowerName} ${year + 1}, ${category.noun} competitions, ${category.noun} awards, ${category.noun} contest deadlines, photo contests`,
  ogImage: live.value.find((c) => c.imageUrl)?.imageUrl || listed.find((c) => c.imageUrl)?.imageUrl || "/picks/og-picks.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: seoConfig.siteUrl },
        { "@type": "ListItem", position: 2, name: "Photo contests", item: `${seoConfig.siteUrl}/photo-contests/` },
        { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${category.name} ${year} and ${year + 1}`,
      numberOfItems: listed.length,
      itemListElement: listed.map((contest, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: contest.name,
        url: `${seoConfig.siteUrl}${contestPath(contest.slug)}`,
      })),
    },
  ],
});

function trackPicks() {
  trackUserAction("navigate_to_picks_trial", `photo_contests_category_${category.slug}`);
}
</script>

<style scoped>
.pcc-crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
  font-size: var(--lx-fs-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.pcc-crumbs a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.3s ease;
}

.pcc-crumbs a:hover {
  color: #fff;
}

.pcc-figures {
  padding-top: clamp(28px, 3.4vw, 48px);
}

.pcc-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: clamp(20px, 2.6vw, 40px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.pcc-stats li {
  display: grid;
  gap: 0.6rem;
  align-content: start;
  justify-items: start;
}

.pcc-stats__value {
  font-size: clamp(2.6rem, 4.2vw, 3.8rem);
  color: var(--lx-text);
}

.pcc-stats__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.pcc-stats__link {
  font-size: var(--lx-fs-sm);
}

.pcc-block {
  padding-block: clamp(36px, 4.5vw, 64px);
}

.pcc-panel {
  padding: clamp(20px, 2.6vw, 36px);
}

.pcc-judging {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(28px, 4vw, 72px);
  align-items: start;
}

.pcc-judging__copy {
  display: grid;
  gap: 1.1rem;
  max-width: 40em;
  font-size: var(--lx-fs-lead);
  line-height: 1.65;
  color: var(--lx-text-2);
}

.pcc-judging__picks {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding: clamp(22px, 2.6vw, 36px);
  line-height: 1.65;
  color: var(--lx-text-2);
}

.pcc-judging__picks strong {
  color: var(--lx-text);
}

.pcc-judging__lead {
  font-size: clamp(1.25rem, 1.7vw, 1.5rem);
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.pcc-judging__note {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.pcc-last {
  padding-bottom: clamp(48px, 6vw, 88px);
}

.pcc-disclaimer {
  margin-top: clamp(32px, 4vw, 56px);
}

@media (max-width: 1023px) {
  .pcc-judging {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .pcc-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
