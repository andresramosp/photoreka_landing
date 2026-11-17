<template>
  <ContestsShell :links="navLinks">
    <template #nav-actions>
      <NuxtLink to="/photo-contests/" class="lx-link pc-nav-back">All photo contests</NuxtLink>
      <LxButton size="sm" icon="external" :href="picksUrl" target="_blank" @click="trackPicks('nav')">
        <ContestPicksMark dark :size="22" />
        Rank my photos
      </LxButton>
    </template>

    <!-- ── Cover: the contest's image, with the countdown overlapping it ── -->
    <section id="hero" class="pcd-cover">
      <div class="pcd-cover__frame">
        <ContestImage :contest="contest" ratio="auto" eager class="pcd-cover__image" />
        <span class="pcd-cover__veil" aria-hidden="true" />
        <div class="pcd-cover__inner">
          <div class="pcd-cover__copy">
            <nav class="pcd-crumbs" aria-label="Breadcrumb">
              <NuxtLink to="/photo-contests/">Photo contests</NuxtLink>
              <span aria-hidden="true">/</span>
              <ContestGenreChip :genre="contest.genre" />
            </nav>
            <h1 class="lx-title pcd-cover__title">
              {{ contest.name }}
              <em v-if="edition" class="lx-accent">{{ edition }}</em>
            </h1>
            <p class="pcd-cover__tagline">{{ contest.tagline }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Facts, with the countdown riding up over the cover ──────── -->
    <section id="details" class="pcd-main">
      <div class="lx-container pcd-main__grid">
        <div class="pcd-main__facts">
          <ContestSectionHead title="Fees, prizes and rules">
            <template v-if="contest.facts">
              As published on the official site<template v-if="contest.checkedAt">, last checked on
              {{ formatCheckedAt(contest.checkedAt) }}</template>. Anything the contest has not
              published is left out.
            </template>
            <template v-else>
              The dates and rules of the next edition are not confirmed yet. They will appear here
              once they are published on the official site.
            </template>
          </ContestSectionHead>
          <ContestFactGrid :contest="contest" />
          <p class="pcd-source">
            Source:
            <a :href="contest.url" target="_blank" rel="noopener noreferrer" class="lx-inline-link">{{ sourceHost }}</a>
          </p>
        </div>
        <aside class="pcd-main__panel">
          <ContestCountdown :contest="contest" :today="today" />
        </aside>
      </div>
    </section>

    <!-- ── Jury ────────────────────────────────────────────────────── -->
    <section id="jury" class="lx-section lx-section--tight">
      <div class="lx-container">
        <ContestJuryFocus :contest="contest" />
      </div>
    </section>

    <!-- ── Reminder ────────────────────────────────────────────────── -->
    <section id="reminder" class="lx-section lx-section--tight">
      <div class="lx-container">
        <div v-reveal="{ variant: 'scale' }">
          <ContestReminder :contest="contest" :today="today" />
        </div>
      </div>
    </section>

    <!-- ── Related ─────────────────────────────────────────────────── -->
    <section v-if="related.length" id="related" class="lx-section lx-section--tight">
      <div class="lx-container">
        <ContestSectionHead :title="`More ${genreLabel} contests`" />
        <div class="pcd-related">
          <ContestPhotoCard
            v-for="item in related"
            :key="item.slug"
            :contest="item"
            :today="today"
            source="related"
          />
        </div>
        <p class="pcd-all">
          <NuxtLink to="/photo-contests/" class="lx-link">See every photo contest</NuxtLink>
        </p>
      </div>
    </section>

    <section class="lx-section lx-section--tight pcd-foot">
      <div class="lx-container">
        <ContestDisclaimer />
      </div>
    </section>
  </ContestsShell>
</template>

<script setup>
import ContestsShell from "~/components/contests/ContestsShell.vue";
import ContestGenreChip from "~/components/contests/ContestGenreChip.vue";
import ContestCountdown from "~/components/contests/ContestCountdown.vue";
import ContestFactGrid from "~/components/contests/ContestFactGrid.vue";
import ContestJuryFocus from "~/components/contests/ContestJuryFocus.vue";
import ContestReminder from "~/components/contests/ContestReminder.vue";
import ContestPhotoCard from "~/components/contests/ContestPhotoCard.vue";
import ContestImage from "~/components/contests/ContestImage.vue";
import ContestDisclaimer from "~/components/contests/ContestDisclaimer.vue";
import ContestPicksMark from "~/components/contests/ContestPicksMark.vue";
import ContestSectionHead from "~/components/contests/ContestSectionHead.vue";
import {
  contestFeeLabel,
  contestGenre,
  contestPath,
  contestStatus,
  formatCheckedAt,
  formatContestDate,
  picksContestUrl,
} from "~/utils/contests";
import { trackUserAction } from "~/utils/analytics";
import { seoConfig } from "~/config/seo";

const route = useRoute();
const config = useRuntimeConfig();
const { contests, today } = await useContests();

const slug = String(route.params.slug);
const contest = computed(() => contests.value.find((c) => c.slug === slug));

if (!contest.value) {
  throw createError({ statusCode: 404, statusMessage: "Contest not found", fatal: true });
}

const facts = computed(() => contest.value.facts);
const genreLabel = computed(() => contestGenre(contest.value.genre).label.toLowerCase());

// "2027" is shown beside the name unless the name already carries it.
const edition = computed(() => {
  const value = facts.value?.edition;
  return value && !contest.value.name.includes(value) ? value : "";
});

const sourceHost = computed(() => {
  try {
    return new URL(contest.value.url).hostname.replace(/^www\./, "");
  } catch {
    return contest.value.url;
  }
});

const statusRank = { open: 0, upcoming: 1, closed: 2, unknown: 3 };
const related = computed(() =>
  contests.value
    .filter((c) => c.slug !== slug && c.genre === contest.value.genre)
    .map((c) => ({ c, rank: statusRank[contestStatus(c, today.value)], date: c.facts?.deadline ?? "" }))
    .sort((a, b) => a.rank - b.rank || a.date.localeCompare(b.date) || a.c.name.localeCompare(b.c.name))
    .slice(0, 3)
    .map((item) => item.c),
);

const picksUrl = computed(() => picksContestUrl(config.public.appUrl, slug));

const navLinks = [
  { label: "Details", target: "details" },
  { label: "Rank photos", target: "jury" },
  { label: "Reminder", target: "reminder" },
];

// ── SEO: built once from the facts available at build time ─────────────
const c = contest.value;
const f = c.facts;
const fullName = f?.edition && !c.name.includes(f.edition) ? `${c.name} ${f.edition}` : c.name;
const pageUrl = `${seoConfig.siteUrl}${contestPath(c.slug)}`;

const descriptionParts = [];
if (f?.deadline) descriptionParts.push(`Deadline: ${formatContestDate(f.deadline)}.`);
if (contestFeeLabel(f)) descriptionParts.push(`Entry fee: ${contestFeeLabel(f)}.`);
if (f?.prizes) descriptionParts.push(`Prizes: ${f.prizes}.`);
const description = f
  ? `${fullName}: ${descriptionParts.join(" ")} Checked on the official site${c.checkedAt ? ` on ${formatCheckedAt(c.checkedAt)}` : ""}.`
  : `${c.name}: the dates of the next edition are not confirmed yet. Get an email when entries open.`;

useSEO(undefined, {
  title: `${fullName}: Deadline, Entry Fee & Prizes | Photoreka`,
  description: description.length > 300 ? `${description.slice(0, 297)}…` : description,
  keywords: `${c.name}, ${c.name} deadline, ${c.name} entry fee, ${c.name} how to enter, ${genreLabel.value} photo contest, photo contests`,
  ogImage: c.imageUrl || "/picks/og-picks.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: seoConfig.siteUrl },
        { "@type": "ListItem", position: 2, name: "Photo contests", item: `${seoConfig.siteUrl}/photo-contests/` },
        { "@type": "ListItem", position: 3, name: c.name, item: pageUrl },
      ],
    },
  ],
});

function trackPicks(where) {
  trackUserAction("navigate_to_picks_contest", `photo_contest_detail_${where}`, slug);
}
</script>

<style scoped>
.pcd-cover {
  --cover-pad: clamp(12px, 2.4vw, 32px);
  max-width: calc(1480px + 2 * var(--cover-pad));
  margin-inline: auto;
  padding: calc(var(--lx-nav-h) + 28px) var(--cover-pad) 0;
}

.pcd-cover__frame {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: clamp(420px, 66svh, 640px);
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  box-shadow: var(--lx-shadow-lg);
  overflow: hidden;
  isolation: isolate;
}

.pcd-cover__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  height: 100%;
}

/* Dark towards the copy on the left and the bottom; bright photos stay readable. */
.pcd-cover__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(0deg, rgba(5, 5, 8, 0.94) 0%, rgba(5, 5, 8, 0.6) 36%, rgba(5, 5, 8, 0.05) 70%),
    linear-gradient(90deg, rgba(5, 5, 8, 0.82) 0%, rgba(5, 5, 8, 0.4) 48%, rgba(5, 5, 8, 0) 78%),
    linear-gradient(180deg, rgba(5, 5, 8, 0.6), rgba(5, 5, 8, 0) 24%);
}

/* Same edges as the sections below, although the photo is wider. */
.pcd-cover__inner {
  width: 100%;
  max-width: calc(var(--lx-container) + 2 * var(--lx-gutter));
  margin-inline: auto;
  padding: clamp(24px, 4vw, 64px) var(--lx-gutter);
}

.pcd-cover__copy {
  display: grid;
  gap: 1.2rem;
  justify-items: start;
  width: min(100%, 58%);
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.55);
}

.pcd-crumbs {
  --pc-chip-mix: #fff;
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

.pcd-crumbs a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.3s ease;
}

.pcd-crumbs a:hover {
  color: #fff;
}

.pcd-cover__title {
  font-size: clamp(2.5rem, min(5vw, 9svh), 4.8rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: #fff;
}

.pcd-cover__tagline {
  max-width: 34em;
  font-size: var(--lx-fs-lead);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.86);
}

.pcd-main__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
}

.pcd-main__facts {
  padding-top: clamp(28px, 3.4vw, 48px);
}

/* The countdown rides up over the cover's lower right corner. */
.pcd-main__panel {
  position: relative;
  z-index: 1;
  margin-top: clamp(-260px, -20vw, -160px);
}

.pcd-related {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(14px, 1.6vw, 22px);
}

.pcd-source {
  margin-top: 1.4rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.pcd-all {
  margin-top: clamp(24px, 3vw, 40px);
}

.pcd-foot {
  padding-top: 0;
}

.lx-section--tight :deep(.lx-intro) {
  margin-bottom: clamp(32px, 4vw, 56px);
}

@media (max-width: 1023px) {
  .pcd-cover__copy {
    width: 100%;
  }

  .pcd-main__grid {
    grid-template-columns: 1fr;
  }

  .pcd-cover__inner {
    padding-bottom: 44px;
  }

  .pcd-main__panel {
    order: -1;
    margin-top: -20px;
  }

  .pcd-main__facts {
    padding-top: 0;
  }

  .pcd-related {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .pcd-cover__frame {
    min-height: clamp(360px, 58svh, 480px);
  }

  .pcd-cover__title {
    font-size: clamp(2.1rem, 9.5vw, 2.8rem);
  }

  .pcd-related {
    grid-template-columns: 1fr;
  }
}
</style>
