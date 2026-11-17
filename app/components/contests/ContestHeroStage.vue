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
          <a href="#calendar" class="pc-hero__btn">Find a contest</a>
          <a :href="PICKS_TRIAL_URL" target="_blank" rel="noopener" class="pc-hero__btn" @click="trackTrial">
            Choose your entries
          </a>
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
import { PICKS_TRIAL_URL } from "~/utils/picksShowcase";
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
  gap: 14px;
  margin-top: 0.6rem;
}

.pc-hero__btn {
  padding: 0.95rem 1.9rem;
  border: 2px solid #fff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  transition:
    background 0.25s ease,
    color 0.25s ease;
}

.pc-hero__btn:hover,
.pc-hero__btn:focus-visible {
  background: #fff;
  color: #111;
}

.pc-hero__btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
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

  .pc-hero__btn {
    flex: 1 1 auto;
    text-align: center;
  }
}
</style>
