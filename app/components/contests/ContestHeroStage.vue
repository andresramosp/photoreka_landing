<template>
  <section id="hero" class="pc-hero">
    <div class="pc-hero__frame">
      <ContestImage v-if="cover" :contest="cover.contest" ratio="auto" eager alt="" class="pc-hero__image" />
      <span class="pc-hero__veil" aria-hidden="true" />

      <div class="pc-hero__copy">
        <h1 class="pc-hero__title">Photo contests {{ season }}: open now and coming up</h1>
        <p class="pc-hero__lead">
          Deadlines, entry fees and prizes of {{ contests.length }} leading photography competitions,
          read on each contest's own site.
        </p>
        <div class="pc-hero__actions">
          <LxButton variant="ghost" icon="down" href="#calendar" class="pc-hero__find">Find a contest</LxButton>
          <span class="pc-hero__picks">
            <span class="pc-hero__picks-free">Free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos</span>
            <LxButton icon="external" :href="PICKS_TRIAL_URL" target="_blank" class="pc-hero__rank" @click="trackTrial">
              <img src="/logos/marca/icon-light.webp" alt="" width="22" height="22" class="pc-hero__rank-logo" />
              Rank my photos
            </LxButton>
          </span>
        </div>
      </div>

      <NuxtLink v-if="cover" :to="contestPath(cover.contest.slug)" class="pc-hero__credit">
        {{ cover.contest.name }}<template v-if="cover.when"> · {{ cover.when }}</template>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import ContestImage from "./ContestImage.vue";
import { contestPath, contestStatus, daysLeft, daysToOpening } from "~/utils/contests";
import { PICKS_FREE_TRIAL_PHOTOS, PICKS_TRIAL_URL } from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  contests: { type: Array, required: true },
  today: { type: String, required: true },
});

const statusOf = (contest) => contestStatus(contest, props.today);
const year = Number(props.today.slice(0, 4));
const season = `${year}–${year + 1}`;

// The contest chosen in the admin lends its photo. Without one: the open contest
// closing first, then the next to open, then a featured one, skipping contests
// without an approved image when possible.
const cover = computed(() => {
  const chosen = props.contests.find((c) => c.hero && c.imageUrl);
  if (chosen) return { contest: chosen, when: whenLabel(chosen) };
  const open = props.contests
    .filter((c) => statusOf(c) === "open")
    .sort((a, b) => a.facts.deadline.localeCompare(b.facts.deadline));
  const upcoming = props.contests
    .filter((c) => statusOf(c) === "upcoming")
    .sort((a, b) => a.facts.opensAt.localeCompare(b.facts.opensAt));
  const ordered = [...open, ...upcoming, ...props.contests.filter((c) => c.featured)];
  const contest = ordered.find((c) => c.imageUrl) ?? ordered[0];
  return contest ? { contest, when: whenLabel(contest) } : null;
});

function whenLabel(contest) {
  const status = statusOf(contest);
  if (status === "open") {
    const days = daysLeft(contest, props.today);
    return days === 0 ? "last day to enter" : `closes in ${days} ${days === 1 ? "day" : "days"}`;
  }
  if (status === "upcoming") {
    const days = daysToOpening(contest, props.today);
    return `opens in ${days} ${days === 1 ? "day" : "days"}`;
  }
  return "";
}

function trackTrial() {
  trackUserAction("navigate_to_picks_trial", "photo_contests_hero");
}
</script>

<style scoped>
.pc-hero {
  padding: calc(var(--lx-nav-h) + 24px) clamp(8px, 1.4vw, 20px) 0;
}

.pc-hero__frame {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(520px, 80svh, 840px);
  border-radius: var(--lx-radius);
  overflow: hidden;
  isolation: isolate;
  background: #111;
}

.pc-hero__image,
.pc-hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.pc-hero__image {
  height: 100%;
}

.pc-hero__veil {
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0.36) 50%, rgba(0, 0, 0, 0.08) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 30%);
}

.pc-hero__copy {
  display: grid;
  justify-items: start;
  gap: clamp(18px, 2.2vw, 28px);
  width: 100%;
  max-width: calc(var(--lx-container) + 2 * var(--lx-gutter));
  margin-inline: auto;
  padding: clamp(40px, 6vw, 80px) var(--lx-gutter);
  color: #fff;
}

.pc-hero__title {
  max-width: 15em;
  margin: 0;
  font-family: var(--lx-font-sans);
  font-size: clamp(2.2rem, 4.4vw, 4.2rem);
  font-weight: 650;
  line-height: 1.12;
  letter-spacing: -0.015em;
  text-wrap: balance;
  color: #fff;
}

.pc-hero__lead {
  max-width: 34em;
  margin: 0;
  font-size: var(--lx-fs-lead);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
}

.pc-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 1.4rem;
}

/* Glass pill over the photo, lighter than the Picks call but just as alive. */
.pc-hero__find {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 12px 30px -14px rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(12px) saturate(1.3);
  backdrop-filter: blur(12px) saturate(1.3);
}

.pc-hero__find:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.26);
  transform: translateY(-2px);
}

.pc-hero__find :deep(.lx-btn__icon) {
  background: #fff;
  color: #111;
}

/* The Picks call: a white pill inside a slowly turning ring of gold light. */
.pc-hero__picks {
  position: relative;
  display: inline-flex;
  padding: 2px;
  border-radius: 999px;
  isolation: isolate;
  overflow: visible;
}

.pc-hero__picks::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: conic-gradient(from var(--pc-ring, 0deg), #f7cf72, #e3a12b 25%, rgba(255, 255, 255, 0.25) 50%, #c27512 75%, #f7cf72);
  box-shadow: 0 0 28px -4px rgba(227, 161, 43, 0.75);
  animation: pc-ring 6s linear infinite;
}

@property --pc-ring {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@keyframes pc-ring {
  to {
    --pc-ring: 360deg;
  }
}

.pc-hero__rank {
  background: #fff;
  color: #111;
  box-shadow: none;
}

.pc-hero__rank:hover {
  box-shadow: 0 18px 40px -16px rgba(227, 161, 43, 0.8);
}

.pc-hero__rank :deep(.lx-btn__label) {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.pc-hero__rank-logo {
  display: block;
  width: 22px;
  height: 22px;
}

.pc-hero__picks-free {
  position: absolute;
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  .pc-hero__picks::before {
    animation: none;
  }
}

.pc-hero__credit {
  position: absolute;
  right: clamp(14px, 1.8vw, 24px);
  bottom: clamp(12px, 1.6vw, 20px);
  max-width: calc(100% - 28px);
  font-size: var(--lx-fs-xs);
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
}

.pc-hero__credit:hover {
  color: #fff;
  text-decoration: underline;
}

@media (max-width: 640px) {
  .pc-hero__frame {
    align-items: flex-end;
    min-height: clamp(520px, 82svh, 700px);
  }

  .pc-hero__veil {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0.15) 100%);
  }

  .pc-hero__copy {
    padding-bottom: 64px;
  }

  .pc-hero__actions {
    width: 100%;
  }

  .pc-hero__actions {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 40px;
  }

  .pc-hero__picks,
  .pc-hero__actions :deep(.lx-btn) {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
