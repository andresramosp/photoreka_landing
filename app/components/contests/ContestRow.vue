<template>
  <article class="pc-row" :class="[`is-${status}`, soon && 'is-soon']" :style="{ '--c': genre.color }">
    <div class="pc-row__date">
      <span class="pc-num pc-row__day">{{ day }}</span>
      <span class="pc-row__event">{{ status === "upcoming" ? "Opens" : "Closes" }}</span>
    </div>

    <NuxtLink :to="contestPath(contest.slug)" class="pc-row__thumb" tabindex="-1" aria-hidden="true">
      <ContestImage :contest="contest" ratio="3 / 2" monogram alt="" />
    </NuxtLink>

    <div class="pc-row__main">
      <h3 class="pc-row__name">
        <NuxtLink :to="contestPath(contest.slug)">{{ contest.name }}</NuxtLink>
      </h3>
      <p class="pc-row__meta">
        <span v-if="leftLabel" class="pc-row__left">{{ leftLabel }}</span>
        <ContestGenreChip :genre="contest.genre" />
        <span v-if="fee" class="pc-row__fee" :class="{ 'is-free': contest.facts.isFree }">{{ fee }}</span>
        <span v-if="status === 'upcoming' && contest.facts.deadline" class="pc-row__fee">
          Closes {{ formatContestDate(contest.facts.deadline) }}
        </span>
      </p>
      <p v-if="contest.facts.prizes" class="pc-row__prizes">{{ contest.facts.prizes }}</p>
    </div>

    <div class="pc-row__actions">
      <LxButton
        variant="ghost"
        size="sm"
        icon="external"
        :href="picksUrl"
        target="_blank"
        @click="trackPicks"
      >
        <ContestPicksMark :size="18" />
        Rank my photos
      </LxButton>
    </div>
  </article>
</template>

<script setup>
import ContestGenreChip from "./ContestGenreChip.vue";
import ContestImage from "./ContestImage.vue";
import ContestPicksMark from "./ContestPicksMark.vue";
import {
  contestFeeLabel,
  contestGenre,
  contestKeyDate,
  contestPath,
  contestStatus,
  daysLabel,
  daysLeft,
  daysToOpening,
  formatContestDate,
  isClosingSoon,
  openingLabel,
  picksContestUrl,
} from "~/utils/contests";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  contest: { type: Object, required: true },
  today: { type: String, required: true },
});

const config = useRuntimeConfig();

const genre = computed(() => contestGenre(props.contest.genre));
const status = computed(() => contestStatus(props.contest, props.today));
const soon = computed(() => isClosingSoon(props.contest, props.today));
const day = computed(() => {
  const date = contestKeyDate(props.contest, props.today);
  return date ? String(Number(date.slice(8, 10))).padStart(2, "0") : "";
});
const fee = computed(() => contestFeeLabel(props.contest.facts));
const leftLabel = computed(() => {
  const left = daysLeft(props.contest, props.today);
  if (left !== null) return daysLabel(left);
  const opening = daysToOpening(props.contest, props.today);
  return opening !== null ? openingLabel(opening) : "";
});
const picksUrl = computed(() => picksContestUrl(config.public.appUrl, props.contest.slug));

function trackPicks() {
  trackUserAction("navigate_to_picks_contest", "photo_contests_calendar", props.contest.slug);
}
</script>

<style scoped>
.pc-row {
  position: relative;
  display: grid;
  grid-template-columns: 76px 150px minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(16px, 2vw, 28px);
  padding: clamp(18px, 2vw, 26px) clamp(16px, 2vw, 28px);
  border-radius: var(--lx-radius);
  border: 1px solid transparent;
  border-bottom-color: var(--lx-line);
  transition:
    background-color 0.4s ease,
    border-color 0.4s ease;
}

.pc-row:hover {
  background: var(--pc-tint);
  border-color: var(--lx-line-2);
}

/* The genre's colour marks the row on hover. */
.pc-row::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 2px;
  border-radius: 2px;
  background: var(--c);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.pc-row:hover::before {
  opacity: 1;
}

.pc-row__date {
  display: grid;
  gap: 0.35rem;
  justify-items: start;
}

.pc-row__day {
  font-size: clamp(2.4rem, 3.4vw, 3.3rem);
  color: var(--lx-text);
}

.pc-row.is-soon .pc-row__day {
  background: var(--pc-gold-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pc-row__event {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.pc-row.is-upcoming .pc-row__event {
  color: var(--pc-sky);
}

.pc-row__thumb {
  display: block;
  border-radius: 12px;
  border: 1px solid var(--lx-line-2);
  overflow: hidden;
}

.pc-row__thumb :deep(img) {
  transition: transform 1.2s var(--lx-ease);
}

.pc-row:hover .pc-row__thumb :deep(img) {
  transform: scale(1.06);
}

.pc-row__main {
  display: grid;
  gap: 0.5rem;
  min-width: 0;
}

.pc-row__name {
  font-size: clamp(1.2rem, 1.7vw, 1.55rem);
  font-weight: 380;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.pc-row__name a {
  color: var(--lx-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.pc-row__name a:hover {
  color: var(--pc-gold-ink);
}

.pc-row__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 1rem;
}

.pc-row__fee {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.pc-row__fee.is-free {
  font-weight: 600;
  color: var(--lx-ok);
}

.pc-row__prizes {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pc-row__left {
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  font-size: var(--lx-fs-xs);
  font-weight: 600;
  white-space: nowrap;
  color: var(--lx-text-2);
}

.pc-row.is-soon .pc-row__left {
  border-color: transparent;
  background: var(--pc-gold-grad);
  color: #1a1206;
}

.pc-row.is-upcoming .pc-row__left {
  border-color: color-mix(in srgb, var(--pc-sky) 30%, transparent);
  color: var(--pc-sky);
}

.pc-row__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 1023px) {
  .pc-row {
    grid-template-columns: 72px 132px minmax(0, 1fr);
  }

  .pc-row__actions {
    grid-column: 3;
  }
}

@media (max-width: 640px) {
  .pc-row {
    grid-template-columns: 58px minmax(0, 1fr);
    align-items: start;
    padding-inline: 4px;
  }

  .pc-row__thumb,
  .pc-row__main {
    grid-column: 2;
  }

  .pc-row__actions {
    grid-column: 2;
  }

  .pc-row__prizes {
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}
</style>
