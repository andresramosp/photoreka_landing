<template>
  <article class="pc-card" :class="[`is-${status}`, countdown && 'pc-card--countdown']">
    <ContestImage :contest="contest" ratio="auto" :eager="eager" class="pc-card__image" />
    <span class="pc-card__veil" aria-hidden="true" />

    <header class="pc-card__top">
      <ContestGenreChip :genre="contest.genre" />
      <a
        class="pc-card__picks"
        :href="picksUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Pick your entries for ${contest.name} with Photoreka Picks`"
        @click="trackPicks"
      >
        Pick your entries
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
      </a>
    </header>

    <div class="pc-card__body">
      <p v-if="countdown && days !== null" class="pc-card__count">
        <span class="pc-num pc-num--gold pc-card__num" :class="{ 'is-word': days === 0 }">
          {{ days === 0 ? "Today" : String(days).padStart(2, "0") }}
        </span>
        <span class="pc-card__unit">{{ days === 0 ? "last day to enter" : days === 1 ? "day left" : "days left" }}</span>
      </p>

      <h3 class="pc-card__title">
        <NuxtLink :to="contestPath(contest.slug)">{{ contest.name }}</NuxtLink>
      </h3>

      <ul class="pc-card__lines">
          <li v-if="contest.facts?.prizes">
            <n-icon size="15"><TrophyOutline /></n-icon>
            <span>{{ contest.facts.prizes }}</span>
          </li>
          <li v-if="when">
            <n-icon size="15"><TimeOutline /></n-icon>
            <span>{{ when }}</span>
          </li>
          <li v-if="fee" :class="{ 'is-free': contest.facts?.isFree }">
            <n-icon size="15"><TicketOutline /></n-icon>
            <span>{{ fee }}</span>
          </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { TicketOutline, TimeOutline, TrophyOutline } from "@vicons/ionicons5";
import ContestGenreChip from "./ContestGenreChip.vue";
import ContestImage from "./ContestImage.vue";
import {
  contestFeeLabel,
  contestPath,
  contestStatus,
  daysLabel,
  daysLeft,
  daysToOpening,
  formatContestDate,
  openingLabel,
  picksContestUrl,
} from "~/utils/contests";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  contest: { type: Object, required: true },
  today: { type: String, required: true },
  /** Puts the days left in large numerals over the photo. */
  countdown: { type: Boolean, default: false },
  eager: { type: Boolean, default: false },
  /** Where the card sits, for analytics. */
  source: { type: String, default: "featured" },
});

const config = useRuntimeConfig();

const status = computed(() => contestStatus(props.contest, props.today));
const days = computed(() => daysLeft(props.contest, props.today));
const fee = computed(() => contestFeeLabel(props.contest.facts));

const when = computed(() => {
  const facts = props.contest.facts;
  if (status.value === "open") {
    const date = formatContestDate(facts.deadline, "short");
    if (props.countdown || days.value === 0) return days.value === 0 ? `Closes today, ${date}` : `Closes ${date}`;
    return `${daysLabel(days.value)} · closes ${date}`;
  }
  if (status.value === "upcoming") {
    return `${openingLabel(daysToOpening(props.contest, props.today))} · ${formatContestDate(facts.opensAt, "short")}`;
  }
  if (status.value === "closed") return facts.nextOpening || `Closed ${formatContestDate(facts.deadline)}`;
  return facts?.nextOpening || "Dates to be confirmed";
});

const picksUrl = computed(() => picksContestUrl(config.public.appUrl, props.contest.slug));

function trackPicks() {
  trackUserAction("navigate_to_picks_contest", `photo_contests_${props.source}`, props.contest.slug);
}
</script>

<style scoped>
.pc-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: clamp(290px, 24vw, 320px);
  min-width: 0;
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-shot-bg);
  box-shadow: var(--lx-shadow-md);
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.7s var(--lx-ease),
    border-color 0.4s ease,
    box-shadow 0.7s var(--lx-ease);
}

.pc-card--countdown {
  min-height: clamp(340px, 28vw, 380px);
  border-color: color-mix(in srgb, var(--pc-gold) 30%, transparent);
}

.pc-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--pc-gold) 60%, transparent);
  box-shadow:
    var(--lx-shadow-md),
    0 30px 70px -40px color-mix(in srgb, var(--pc-gold) 55%, transparent);
}

.pc-card__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  height: 100%;
}

.pc-card__image :deep(img),
.pc-card__image :deep(.pc-img__fallback) {
  transition: transform 1.6s var(--lx-ease);
}

.pc-card:hover .pc-card__image :deep(img),
.pc-card:hover .pc-card__image :deep(.pc-img__fallback) {
  transform: scale(1.06);
}

/* Heavy at the bottom so the copy reads over bright photos too. */
.pc-card__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      0deg,
      rgba(5, 5, 8, 0.96) 0%,
      rgba(5, 5, 8, 0.86) 30%,
      rgba(5, 5, 8, 0.42) 58%,
      rgba(5, 5, 8, 0) 80%
    ),
    linear-gradient(180deg, rgba(5, 5, 8, 0.62), rgba(5, 5, 8, 0) 30%);
}

.pc-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: clamp(16px, 1.6vw, 22px) clamp(18px, 1.8vw, 24px) 0;
}

.pc-card__top :deep(.pc-genre) {
  --pc-chip-mix: #fff;
  padding: 0.38rem 0.7rem;
  border-radius: 999px;
  background: rgba(8, 8, 12, 0.55);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.pc-card__body {
  display: grid;
  gap: 0.75rem;
  padding: 0 clamp(18px, 1.8vw, 24px) clamp(18px, 1.8vw, 24px);
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.55);
}

.pc-card__count {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: -0.2rem;
}

.pc-card__num {
  font-size: clamp(4.4rem, 6.4vw, 6rem);
  font-style: italic;
  padding-right: 0.08em;
  filter: drop-shadow(0 2px 18px rgba(0, 0, 0, 0.5));
}

.pc-card__num.is-word {
  font-size: clamp(3.2rem, 4.6vw, 4.2rem);
  line-height: 1.1;
}

.pc-card__unit {
  font-size: var(--lx-fs-sm);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pc-gold-2);
}

.pc-card__title {
  font-size: clamp(1.4rem, 1.9vw, 1.75rem);
  font-weight: 380;
  line-height: 1.1;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.pc-card__title a {
  color: #fff;
  text-decoration: none;
}

/* The whole card opens the contest; the Picks button sits above this layer. */
.pc-card__title a::after {
  content: "";
  position: absolute;
  inset: 0;
}

.pc-card__lines {
  display: grid;
  gap: 0.32rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.86rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.86);
}

.pc-card__lines li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.pc-card__lines .n-icon {
  flex-shrink: 0;
  color: var(--pc-gold-2);
}

.pc-card__lines span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pc-card__lines .is-free {
  font-weight: 700;
  color: var(--lx-ok);
}

.pc-card__lines .is-free .n-icon {
  color: var(--lx-ok);
}

.pc-card__picks {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 34px;
  padding: 0 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(10, 10, 14, 0.55);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  text-shadow: none;
  white-space: nowrap;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.pc-card__picks svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.pc-card__picks:hover {
  background: var(--pc-gold-grad);
  border-color: transparent;
  color: #1a1206;
}

.pc-card__picks:focus-visible,
.pc-card__title a:focus-visible::after {
  outline: 2px solid var(--pc-gold);
  outline-offset: -4px;
  border-radius: var(--lx-radius-lg);
}

@media (prefers-reduced-motion: reduce) {
  .pc-card,
  .pc-card__image :deep(img),
  .pc-card__image :deep(.pc-img__fallback) {
    transition: none;
  }

  .pc-card:hover,
  .pc-card:hover .pc-card__image :deep(img),
  .pc-card:hover .pc-card__image :deep(.pc-img__fallback) {
    transform: none;
  }
}
</style>
