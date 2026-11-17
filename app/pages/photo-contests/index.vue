<template>
  <ContestsShell :links="navLinks">
    <template #nav-actions>
      <NuxtLink to="/" class="lx-link pc-nav-back">Back to Photoreka</NuxtLink>
      <LxButton size="sm" to="/ai_photo_picks/">About Picks</LxButton>
    </template>

    <ContestHeroStage :contests="contests" :today="today" />

    <section v-if="failed" class="pcl-block">
      <div class="lx-container">
        <p class="pcl-empty">
          The contest calendar could not be loaded right now. Please try again
          in a few minutes.
        </p>
      </div>
    </section>

    <!-- ── Featured ────────────────────────────────────────────────── -->
    <section v-if="featured.length" id="featured" class="pcl-block">
      <div class="lx-container">
        <ContestSectionHead title="Featured photo contests" />
        <div class="pcl-grid pcl-grid--featured" :class="gridClass(visibleFeatured.length)">
          <ContestPhotoCard
            v-for="contest in visibleFeatured"
            :key="contest.slug"
            :contest="contest"
            :today="today"
            source="featured"
          />
        </div>
        <p
          v-if="featured.length > FEATURED_CAP && !showAllFeatured"
          class="pcl-more"
        >
          <LxButton variant="ghost" icon="down" @click="showAllFeatured = true">
            Show {{ featured.length - FEATURED_CAP }} more
          </LxButton>
        </p>
      </div>
    </section>

    <!-- ── Closing soon ────────────────────────────────────────────── -->
    <section v-if="closingSoon.length" id="closing-soon" class="pcl-block">
      <div class="lx-container">
        <ContestSectionHead title="Photo contests closing soon" :count="closingSoon.length">
          Deadlines in the next {{ CLOSING_SOON_DAYS }} days. Confirm the exact
          cut-off time on the official site.
        </ContestSectionHead>
        <div class="pcl-grid" :class="gridClass(closingSoon.length)">
          <ContestPhotoCard
            v-for="contest in closingSoon"
            :key="contest.slug"
            :contest="contest"
            :today="today"
            countdown
            source="closing_soon"
          />
        </div>
      </div>
    </section>

    <!-- ── Calendar ────────────────────────────────────────────────── -->
    <section id="calendar" class="pcl-block">
      <div class="lx-container">
        <ContestSectionHead :title="`Photo contest calendar ${season}`">
          Open contests are listed by deadline, upcoming ones by the day entries
          open.
        </ContestSectionHead>

        <div class="pc-panel pcl-finder">
          <div
            class="pcl-finder__top"
            :class="{ 'has-overview': hasDeadlines }"
          >
            <ContestFilters v-model="filter" :available="availableGenres" />
            <ContestDotCalendar
              v-if="hasDeadlines"
              :contests="contests"
              :today="today"
              bare
            />
          </div>

          <div class="pcl-finder__results">
            <p class="pcl-result" aria-live="polite">
              <strong
                >{{ timeline.length }}
                {{ timeline.length === 1 ? "contest" : "contests" }}</strong
              >
              <span>open or opening</span>
              <span v-if="filtering"
                >{{ timeline.length === 1 ? "matches" : "match" }} your
                filters</span
              >
              <button
                v-if="filtering"
                type="button"
                class="lx-link pcl-clear"
                @click="clearFilters"
              >
                Clear filters
              </button>
            </p>

            <Transition name="pcl-swap" mode="out-in">
              <ContestTimeline
                v-if="timeline.length"
                :key="resultsKey"
                :contests="timeline"
                :today="today"
              />
              <p v-else-if="filtering" key="no-match" class="pcl-empty">
                No open or upcoming contest matches these filters. Try another
                genre or clear the filters.
              </p>
              <p v-else key="no-dates" class="pcl-empty">
                No contest has confirmed dates right now. The ones on our list
                are below.
              </p>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Closed ──────────────────────────────────────────────────── -->
    <section v-if="closed.length" id="closed" class="pcl-block">
      <div class="lx-container">
        <ContestSectionHead
          title="Closed until the next edition"
          :count="closed.length"
        >
          Open a contest to get an email the day entries reopen.
        </ContestSectionHead>
        <ContestCompactList :contests="closed" kind="closed" />
      </div>
    </section>

    <!-- ── Dates to be confirmed ───────────────────────────────────── -->
    <section v-if="unconfirmed.length" id="to-be-confirmed" class="pcl-block">
      <div class="lx-container">
        <ContestSectionHead
          title="Dates to be confirmed"
          :count="unconfirmed.length"
        >
          Nothing is listed until it is confirmed on the contest's official
          site.
        </ContestSectionHead>
        <ContestCompactList :contests="unconfirmed" kind="unconfirmed" />
      </div>
    </section>

    <!-- ── By genre ────────────────────────────────────────────────── -->
    <section id="by-genre" class="pcl-block">
      <div class="lx-container">
        <ContestSectionHead title="Photo contests by genre">
          Each genre has its own page, and so do the contests that are free to enter.
        </ContestSectionHead>
        <ContestCategoryLinks :contests="contests" :today="today" />
      </div>
    </section>

    <!-- ── About the data ──────────────────────────────────────────── -->
    <section id="about" class="pcl-block pcl-about">
      <div class="lx-container">
        <ContestSectionHead title="About these listings" />
        <dl class="pcl-facts">
          <div v-for="item in principles" :key="item.title">
            <dt>{{ item.title }}</dt>
            <dd>{{ item.text }}</dd>
          </div>
        </dl>
        <p class="pcl-picks">
          Not sure which photos to enter? Photoreka Picks ranks your photos with
          a jury weighted for the contest you choose. Try it free with
          {{ PICKS_FREE_TRIAL_PHOTOS }} photos, no account needed:
          <a
            :href="PICKS_TRIAL_URL"
            target="_blank"
            rel="noopener"
            class="lx-inline-link"
            @click="trackPicks('about_trial')"
          >
            try Picks free</a
          >, or read
          <NuxtLink
            to="/blog/how-to-choose-photos-for-a-photo-contest/"
            class="lx-inline-link"
          >
            how to choose photos for a contest</NuxtLink
          >.
        </p>
        <ContestDisclaimer />
      </div>
    </section>
  </ContestsShell>
</template>

<script setup>
import ContestsShell from "~/components/contests/ContestsShell.vue";
import ContestHeroStage from "~/components/contests/ContestHeroStage.vue";
import ContestPhotoCard from "~/components/contests/ContestPhotoCard.vue";
import ContestDotCalendar from "~/components/contests/ContestDotCalendar.vue";
import ContestFilters from "~/components/contests/ContestFilters.vue";
import ContestTimeline from "~/components/contests/ContestTimeline.vue";
import ContestCompactList from "~/components/contests/ContestCompactList.vue";
import ContestCategoryLinks from "~/components/contests/ContestCategoryLinks.vue";
import ContestDisclaimer from "~/components/contests/ContestDisclaimer.vue";
import ContestSectionHead from "~/components/contests/ContestSectionHead.vue";
import {
  CLOSING_SOON_DAYS,
  contestKeyDate,
  contestPath,
  contestStatus,
  emptyContestFilter,
  isClosingSoon,
  matchesContestFilter,
} from "~/utils/contests";
import {
  PICKS_FREE_TRIAL_PHOTOS,
  PICKS_TRIAL_URL,
} from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";
import { seoConfig } from "~/config/seo";

const FEATURED_CAP = 9;

const { contests, today, failed } = await useContests();

const filter = reactive(emptyContestFilter());
const showAllFeatured = ref(false);

const statusOf = (contest) => contestStatus(contest, today.value);
const isLive = (contest) => ["open", "upcoming"].includes(statusOf(contest));
const byDeadline = (a, b) => a.facts.deadline.localeCompare(b.facts.deadline);

// Featured contests taking entries now or soon, the next date first. A last
// row left short is completed with other contests taking entries (those with
// an image first), or trimmed when there are not enough. Before any date is
// confirmed, the featured list itself fills the grid.
const FEATURED_PER_ROW = 3;
const byNextDate = (a, b) =>
  (a.facts.deadline ?? contestKeyDate(a, today.value)).localeCompare(
    b.facts.deadline ?? contestKeyDate(b, today.value),
  );

const featured = computed(() => {
  const picked = contests.value.filter((c) => c.featured);
  const live = picked.filter(isLive).sort(byNextDate);
  if (!live.length) return fullRows(picked.slice().sort((a, b) => a.name.localeCompare(b.name)));

  const others = contests.value.filter((c) => !c.featured && isLive(c)).sort(byNextDate);
  const fillers = [...others.filter((c) => c.imageUrl), ...others.filter((c) => !c.imageUrl)];
  const missing = (FEATURED_PER_ROW - (live.length % FEATURED_PER_ROW)) % FEATURED_PER_ROW;
  return fullRows([...live, ...fillers.slice(0, missing)]);
});

// One or two cards have their own layouts; from three on, only complete rows.
function fullRows(list) {
  if (list.length < FEATURED_PER_ROW) return list;
  return list.slice(0, list.length - (list.length % FEATURED_PER_ROW));
}

const visibleFeatured = computed(() =>
  showAllFeatured.value
    ? featured.value
    : featured.value.slice(0, FEATURED_CAP),
);

const closingSoon = computed(() =>
  contests.value.filter((c) => isClosingSoon(c, today.value)).sort(byDeadline),
);

// Two or four cards read better as pairs than as a row of three with a gap.
function gridClass(count) {
  if (count === 1) return "pcl-grid--one";
  return count === 2 || count === 4 ? "pcl-grid--two" : "";
}

const filtered = computed(() =>
  contests.value.filter((c) => matchesContestFilter(c, filter)),
);
const filtering = computed(
  () => filtered.value.length !== contests.value.length,
);

const timeline = computed(() => filtered.value.filter(isLive));
// The results fade out and in only when the list itself changes.
const resultsKey = computed(() => timeline.value.map((c) => c.slug).join());

function clearFilters() {
  Object.assign(filter, emptyContestFilter());
}
const closed = computed(() =>
  filtered.value
    .filter((c) => statusOf(c) === "closed")
    .sort((a, b) => byDeadline(b, a)),
);
const unconfirmed = computed(() =>
  filtered.value
    .filter((c) => statusOf(c) === "unknown")
    .sort((a, b) => a.name.localeCompare(b.name)),
);

const hasDeadlines = computed(() =>
  contests.value.some(
    (c) => c.facts?.deadline && c.facts.deadline >= today.value,
  ),
);
const availableGenres = computed(() => [
  ...new Set(contests.value.map((c) => c.genre)),
]);

const navLinks = computed(() => [
  ...(featured.value.length ? [{ label: "Featured", target: "featured" }] : []),
  ...(closingSoon.value.length
    ? [{ label: "Closing soon", target: "closing-soon" }]
    : []),
  { label: "Calendar", target: "calendar" },
  { label: "By genre", target: "by-genre" },
  { label: "About", target: "about" },
]);

const principles = [
  {
    title: "Read on the official site",
    text: "Deadlines, fees, prizes and rules come from each contest's own pages. If a contest has not published something, the field stays empty.",
  },
  {
    title: "Checked again as deadlines approach",
    text: "Every contest is reviewed regularly, and more often in its last month. Each page shows the date it was last checked, so you know how fresh it is.",
  },
  {
    title: "A jury for every contest",
    text: "Each contest links to a Photoreka Picks jury weighted towards what that competition tends to reward. It is orientation for choosing your entries, not a prediction.",
  },
];

// The years in the title follow the calendar, so the page never names a past season.
const year = Number(today.value.slice(0, 4));
const season = `${year}–${year + 1}`;
const listed = contests.value
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

useSEO("photo_contests", {
  title: `Photo Contests ${year} & ${year + 1}: Deadlines, Fees & Free Entry | Photoreka`,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Photo contests ${year} and ${year + 1}`,
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

function trackPicks(where) {
  trackUserAction("navigate_to_picks_trial", `photo_contests_${where}`);
}
</script>

<style scoped>
.pcl-block {
  padding-block: clamp(36px, 4.5vw, 64px);
}

.pcl-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(14px, 1.6vw, 22px);
}

.pcl-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.pcl-grid--one {
  grid-template-columns: minmax(0, 720px);
}

.pcl-more {
  display: flex;
  justify-content: center;
  margin-top: clamp(24px, 3vw, 40px);
}

/* clip, not hidden: a scroll container would stop the month names from sticking. */
.pcl-finder {
  overflow: clip;
}

.pcl-finder__top {
  display: grid;
  gap: clamp(24px, 3vw, 48px);
  align-items: start;
  padding: clamp(20px, 2.6vw, 36px);
  background: var(--lx-surface-2);
  border-bottom: 1px solid var(--lx-line-2);
}

.pcl-finder__top.has-overview {
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
}

.pcl-finder__results {
  padding: clamp(20px, 2.6vw, 36px);
}

.pcl-result {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3rem 0.4rem;
  margin: 0 0 clamp(8px, 1vw, 14px);
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.pcl-result strong {
  color: var(--lx-text);
}

.pcl-clear {
  margin-left: 0.8rem;
  font-size: var(--lx-fs-sm);
}

.pcl-swap-enter-active {
  transition:
    opacity 0.35s var(--lx-ease),
    transform 0.35s var(--lx-ease);
}

.pcl-swap-leave-active {
  transition: opacity 0.15s ease;
}

.pcl-swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.pcl-swap-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .pcl-swap-enter-active,
  .pcl-swap-leave-active {
    transition: none;
  }
}

.pcl-empty {
  padding: clamp(24px, 4vw, 48px) 0;
  font-size: var(--lx-fs-lead);
  color: var(--lx-text-2);
}

.pcl-about {
  padding-bottom: clamp(48px, 6vw, 88px);
}

.pcl-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(18px, 2.4vw, 36px);
  margin: 0 0 clamp(24px, 3vw, 36px);
}

.pcl-facts dt {
  margin-bottom: 0.4rem;
  font-weight: 650;
  color: var(--lx-text);
}

.pcl-facts dd {
  margin: 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.65;
  color: var(--lx-text-2);
}

.pcl-picks {
  max-width: 52em;
  margin: 0 0 1.4rem;
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-2);
}

@media (max-width: 1023px) {
  .pcl-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pcl-finder__top.has-overview,
  .pcl-facts {
    grid-template-columns: 1fr;
  }
}

/* Two columns: an odd featured card would sit alone on the last row. */
@media (min-width: 641px) and (max-width: 1023px) {
  .pcl-grid--featured > :last-child:nth-child(odd):not(:first-child) {
    display: none;
  }
}

@media (max-width: 640px) {
  .pcl-grid,
  .pcl-grid--two {
    grid-template-columns: 1fr;
  }
}
</style>
