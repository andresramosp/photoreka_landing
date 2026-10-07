<template>
  <section ref="sectionRef" class="ppr-section">
    <!-- Always dark, like the Picks app: it reads as a product showcase on either theme. -->
    <div class="ppr-card" :class="{ visible }">
      <div class="ppr-glow" aria-hidden="true" />

      <div class="ppr-copy">
        <span class="ppr-badge">
          <n-icon size="15"><TrophyOutline /></n-icon>
          New · Photoreka Picks
        </span>
        <h2 class="ppr-title">
          Find your best shots.
          <em>No account needed.</em>
        </h2>
        <p class="ppr-desc">
          Drop up to 5,000 photos and let an AI jury score every frame, write a short critique
          for each one and rank them through street, documentary, landscape or award juries. Pay
          per photo, or try it free with {{ PICKS_FREE_TRIAL_PHOTOS }}.
        </p>
        <ul class="ppr-points">
          <li><n-icon size="16"><CheckmarkOutline /></n-icon>Scores on 8 artistic criteria</li>
          <li><n-icon size="16"><CheckmarkOutline /></n-icon>A written critique for every photo</li>
          <li><n-icon size="16"><CheckmarkOutline /></n-icon>Originals never leave your device</li>
        </ul>
        <div class="ppr-actions">
          <button class="ppr-cta" @click="goToTrial">
            Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
          </button>
          <NuxtLink to="/ai_photo_picks" class="ppr-link" @click="trackDiscover">
            Discover Picks
            <n-icon size="16"><ArrowForwardOutline /></n-icon>
          </NuxtLink>
        </div>
      </div>

      <div class="ppr-visual" aria-hidden="true">
        <div v-for="(item, i) in podium" :key="item.photo.id" class="ppr-print" :class="`ppr-print--${i}`">
          <img :src="item.photo.src" alt="" loading="lazy" />
          <span class="ppr-shade" />
          <span class="ppr-rank">{{ String(item.rank).padStart(2, "0") }}</span>
          <span class="ppr-score">{{ formatScore(item.score) }}</span>
          <span v-if="i === 0" class="ppr-critique">“{{ item.photo.critique }}”</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowForwardOutline, CheckmarkOutline, TrophyOutline } from "@vicons/ionicons5";
import {
  PICKS_FREE_TRIAL_PHOTOS,
  PICKS_TRIAL_URL,
  formatScore,
  rankShowcase,
} from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  /** Analytics label of the page hosting the promo. */
  source: { type: String, default: "landing" },
});

const podium = rankShowcase("overall").slice(0, 3);

const sectionRef = ref(null);
const visible = ref(false);
let observer = null;

onMounted(() => {
  if (!sectionRef.value) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      visible.value = true;
      observer?.disconnect();
    },
    { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
  );
  observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());

function goToTrial() {
  trackUserAction("navigate_to_picks_trial", `${props.source}_picks_promo`);
  window.open(PICKS_TRIAL_URL, "_blank");
}

function trackDiscover() {
  trackUserAction("navigate_to_picks_landing", `${props.source}_picks_promo`);
}
</script>

<style scoped>
.ppr-section {
  padding: 5rem 2rem;
}

.ppr-card {
  --gold: #f4b740;
  --gold-2: #ffd98a;
  --gold-gradient: linear-gradient(135deg, #ffe3a3 0%, #f4b740 45%, #d4861c 100%);
  --serif: "Fraunces", Georgia, serif;

  position: relative;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 3rem;
  align-items: center;
  padding: clamp(2rem, 4vw, 3.5rem);
  border-radius: 28px;
  background: radial-gradient(120% 120% at 100% 0%, rgba(91, 33, 182, 0.35), transparent 55%),
    radial-gradient(90% 90% at 0% 100%, rgba(14, 116, 144, 0.3), transparent 60%), #07070a;
  border: 1px solid rgba(244, 183, 64, 0.25);
  box-shadow: 0 40px 100px -40px rgba(0, 0, 0, 0.8), 0 24px 60px -30px rgba(244, 183, 64, 0.25);
  color: rgba(255, 255, 255, 0.94);
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.ppr-card.visible {
  opacity: 1;
  transform: none;
}

.ppr-glow {
  position: absolute;
  right: -10%;
  bottom: -30%;
  width: 60%;
  height: 80%;
  background: radial-gradient(circle, rgba(244, 183, 64, 0.18), transparent 65%);
  pointer-events: none;
}

.ppr-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ppr-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.4rem 0.95rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--gold-2);
  background: rgba(244, 183, 64, 0.1);
  border: 1px solid rgba(244, 183, 64, 0.35);
}

.ppr-title {
  margin: 0;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: #fff;
}

.ppr-title em {
  display: block;
  font-style: italic;
  font-weight: 300;
  background: linear-gradient(110deg, #22d3ee 0%, #8b5cf6 48%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ppr-desc {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.66);
}

.ppr-points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.82);
}

.ppr-points li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.ppr-points .n-icon {
  color: var(--gold);
}

.ppr-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.5rem;
}

.ppr-cta {
  position: relative;
  overflow: hidden;
  padding: 0.95rem 1.7rem;
  border: 0;
  border-radius: 999px;
  background: var(--gold-gradient);
  color: #1a1206;
  font: 700 0.98rem "Plus Jakarta Sans", sans-serif;
  cursor: pointer;
  box-shadow: 0 14px 40px -12px rgba(244, 183, 64, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ppr-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 50px -12px rgba(244, 183, 64, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.ppr-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.2s ease, gap 0.2s ease;
}

.ppr-link:hover {
  color: var(--gold-2);
  gap: 0.6rem;
}

/* Podium like the app: No. 1 large on top, No. 2 and No. 3 underneath. */
.ppr-visual {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.75fr 1fr;
  gap: 10px;
  height: clamp(340px, 36vw, 460px);
}

.ppr-print {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #111117;
  box-shadow: 0 30px 70px -25px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.ppr-print img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ppr-print--0 {
  grid-column: 1 / -1;
}

.ppr-print img {
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.ppr-card:hover .ppr-print img {
  transform: scale(1.04);
}

.ppr-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(4, 4, 7, 0.88) 0%, transparent 50%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.35), transparent 30%);
}

.ppr-rank {
  position: absolute;
  top: 8px;
  left: 14px;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 300;
  font-size: 1.9rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.92);
}

.ppr-print--0 .ppr-rank {
  font-size: clamp(2.8rem, 5vw, 4rem);
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ppr-score {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 3px 11px;
  border-radius: 999px;
  font-family: var(--serif);
  font-size: 0.95rem;
  color: #fff;
  background: rgba(8, 8, 12, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.ppr-print--0 .ppr-score {
  color: #1a1206;
  border-color: transparent;
  background: var(--gold-gradient);
}

.ppr-critique {
  position: absolute;
  left: 18px;
  right: 80px;
  bottom: 16px;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 300;
  font-size: 0.98rem;
  line-height: 1.42;
  color: rgba(255, 255, 255, 0.92);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

@media (max-width: 900px) {
  .ppr-card {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 600px) {
  .ppr-section {
    padding: 3.5rem 1.25rem;
  }
  .ppr-visual {
    height: 280px;
  }
  .ppr-critique {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}
</style>
