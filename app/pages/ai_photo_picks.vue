<template>
  <!-- Always dark, like the Picks app itself. -->
  <div class="pkl" data-theme="dark">
    <div class="pkl-aurora" aria-hidden="true">
      <span class="pkl-orb pkl-orb--cyan" />
      <span class="pkl-orb pkl-orb--violet" />
      <span class="pkl-orb pkl-orb--amber" />
    </div>
    <div class="pkl-grain" aria-hidden="true" />

    <!-- ── Nav ─────────────────────────────────────────────────────── -->
    <nav class="pkl-nav" :class="{ 'is-solid': scrolled }">
      <div class="pkl-nav-inner">
        <NuxtLink to="/" class="pkl-brand" aria-label="Photoreka home">
          <img src="/logos/marca/horizontal-dark.png" alt="Photoreka" class="pkl-logo" />
          <span class="pkl-brand-divider" />
          <span class="pkl-brand-name">Picks</span>
        </NuxtLink>
        <div class="pkl-nav-actions">
          <NuxtLink to="/" class="pkl-nav-link">Back to Photoreka</NuxtLink>
          <button class="pkl-btn pkl-btn--small" @click="goToTrial('nav')">Try it free</button>
        </div>
      </div>
    </nav>

    <!-- ── Hero ────────────────────────────────────────────────────── -->
    <header class="pkl-hero">
      <div class="pkl-container pkl-hero-grid">
        <div class="pkl-hero-copy">
          <p class="pkl-eyebrow pkl-in" style="--d: 0ms">AI photo ranking · No account needed</p>
          <h1 class="pkl-hero-title pkl-in" style="--d: 80ms">
            Find your <em>best photos</em> with AI.
          </h1>
          <p class="pkl-hero-sub pkl-in" style="--d: 160ms">
            Drop up to {{ formatCount(PICKS_MAX_PHOTOS) }} photos. An AI jury scores every frame
            on eight artistic criteria, writes a short critique for each one and ranks them
            through the eyes of street, documentary, landscape or award juries.
          </p>
          <div class="pkl-hero-actions pkl-in" style="--d: 240ms">
            <button class="pkl-cta" @click="goToTrial('hero')">
              Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
            </button>
            <button class="pkl-btn" @click="goToApp('hero')">Rank my whole collection</button>
          </div>
          <ul class="pkl-trust pkl-in" style="--d: 320ms">
            <li>
              <n-icon size="15"><PersonRemoveOutline /></n-icon>
              No account, no subscription
            </li>
            <li>
              <n-icon size="15"><ShieldCheckmarkOutline /></n-icon>
              Originals never leave your device
            </li>
            <li>
              <n-icon size="15"><CardOutline /></n-icon>
              {{ formatEur(PICKS_PRICE_PER_PHOTO_EUR) }} per photo
            </li>
          </ul>
        </div>

        <div class="pkl-hero-visual" aria-hidden="true">
          <div
            v-for="(item, i) in heroPodium"
            :key="item.photo.id"
            class="pkl-print"
            :class="`pkl-print--${i}`"
          >
            <img :src="item.photo.src" alt="" />
            <span class="pkl-print-shade" />
            <span class="pkl-print-rank">{{ String(item.rank).padStart(2, "0") }}</span>
            <span class="pkl-print-score">{{ formatScore(item.score) }}</span>
            <span v-if="i === 0" class="pkl-print-critique">“{{ item.photo.critique }}”</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ── Juries demo ─────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container">
        <div class="pkl-head">
          <p class="pkl-eyebrow">The juries</p>
          <h2 class="pkl-title">Rank your photos through <em>many juries.</em></h2>
          <p class="pkl-lead">
            A street photographer and a landscape editor would never pick the same frame. Switch
            jury and watch your ranking reorder itself: each one weighs the criteria its own way,
            and themed juries only judge the photos of their genre.
          </p>
        </div>
        <PicksJuryDemo />
      </div>
    </section>

    <!-- ── Critique ────────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container pkl-critique-grid">
        <div class="pkl-critique-photo">
          <img :src="featured.photo.src" alt="Street photo with its AI critique" loading="lazy" />
        </div>
        <div class="pkl-critique-copy">
          <p class="pkl-eyebrow">A critique for every frame</p>
          <h2 class="pkl-title">AI photo critique: <em>not just a number.</em></h2>
          <blockquote class="pkl-quote">{{ featured.photo.critique }}</blockquote>
          <div class="pkl-bars">
            <div v-for="criterion in PICKS_CRITERIA" :key="criterion.key" class="pkl-bar">
              <span class="pkl-bar-label">{{ criterion.label }}</span>
              <span class="pkl-bar-track">
                <span
                  class="pkl-bar-fill"
                  :style="{ '--w': `${(featured.photo.scores[criterion.key] / 10) * 100}%` }"
                />
              </span>
              <span class="pkl-bar-value">{{ formatScore(featured.photo.scores[criterion.key]) }}</span>
            </div>
          </div>
          <p class="pkl-fineprint">Real output of the Picks jury for the photo on the left.</p>
        </div>
      </div>
    </section>

    <!-- ── How it works ────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container">
        <div class="pkl-head">
          <p class="pkl-eyebrow">How it works</p>
          <h2 class="pkl-title">From a messy folder to <em>your best photos.</em></h2>
        </div>
        <ol class="pkl-steps">
          <li v-for="(step, i) in steps" :key="step.title" class="pkl-step">
            <span class="pkl-step-num">{{ i + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ── Features ────────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container">
        <div class="pkl-head">
          <p class="pkl-eyebrow">What you get</p>
          <h2 class="pkl-title">An AI photo picker that <em>thinks like an editor.</em></h2>
        </div>
        <div class="pkl-features">
          <article v-for="feature in features" :key="feature.title" class="pkl-feature">
            <span class="pkl-feature-icon">
              <n-icon size="22"><component :is="feature.icon" /></n-icon>
            </span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Pricing ─────────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container">
        <div class="pkl-head">
          <p class="pkl-eyebrow">Pricing</p>
          <h2 class="pkl-title">Rank your photos, <em>pay per photo.</em></h2>
        </div>
        <div class="pkl-pricing">
          <div class="pkl-price-card">
            <p class="pkl-price-main">
              {{ formatEur(PICKS_PRICE_PER_PHOTO_EUR) }}<span> per photo</span>
            </p>
            <p class="pkl-price-sub">
              One payment per order, no subscription. Minimum charge
              {{ formatEur(PICKS_MIN_CHARGE_EUR) }}.
            </p>
            <ul class="pkl-price-examples">
              <li v-for="n in priceExamples" :key="n">
                <span>{{ formatCount(n) }} photos</span>
                <strong>{{ formatEur(priceFor(n)) }}</strong>
              </li>
            </ul>
            <button class="pkl-cta pkl-cta--block" @click="goToApp('pricing')">
              Rank my photos
            </button>
          </div>
          <div class="pkl-price-card pkl-price-card--trial">
            <p class="pkl-price-main">Free<span> to try</span></p>
            <p class="pkl-price-sub">
              Judge {{ PICKS_FREE_TRIAL_PHOTOS }} of your own photos with the full jury, critiques
              included. No card, no account.
            </p>
            <ul class="pkl-checks">
              <li><n-icon size="16"><CheckmarkOutline /></n-icon>Scores on 8 criteria</li>
              <li><n-icon size="16"><CheckmarkOutline /></n-icon>A critique for every photo</li>
              <li><n-icon size="16"><CheckmarkOutline /></n-icon>Every jury and competition</li>
            </ul>
            <button class="pkl-btn pkl-cta--block" @click="goToTrial('pricing')">
              Try it free
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Privacy ─────────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container pkl-privacy">
        <n-icon size="34" class="pkl-privacy-icon"><LockClosedOutline /></n-icon>
        <div>
          <h2 class="pkl-title pkl-title--small">Your originals stay with you.</h2>
          <p class="pkl-lead">
            Picks resizes every photo in your browser and only sends an 800-pixel thumbnail to the
            jury. The full-resolution files never leave your device. Thumbnails and results are
            deleted after {{ PICKS_RETENTION_DAYS }} days, and the photos are never used to train
            any model.
          </p>
        </div>
      </div>
    </section>

    <!-- ── FAQ ─────────────────────────────────────────────────────── -->
    <section class="pkl-section" data-reveal>
      <div class="pkl-container pkl-faq-wrap">
        <div class="pkl-head">
          <p class="pkl-eyebrow">FAQ</p>
          <h2 class="pkl-title">Ranking your photos, <em>answered.</em></h2>
        </div>
        <div class="pkl-faq">
          <details v-for="faq in PICKS_FAQS" :key="faq.q" class="pkl-faq-item">
            <summary>
              {{ faq.q }}
              <n-icon size="18" class="pkl-faq-chevron"><ChevronDownOutline /></n-icon>
            </summary>
            <p>
              {{ faq.a }}
              <NuxtLink v-if="faq.link" :to="faq.link.to" class="pkl-faq-link">
                {{ faq.link.label }} →
              </NuxtLink>
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- ── Final CTA ───────────────────────────────────────────────── -->
    <section class="pkl-final" data-reveal>
      <div class="pkl-container">
        <h2 class="pkl-final-title">Your best photo is already <em>in that folder.</em></h2>
        <p class="pkl-lead">Let the jury find it.</p>
        <div class="pkl-hero-actions pkl-hero-actions--center">
          <button class="pkl-cta" @click="goToTrial('final')">
            Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
          </button>
          <button class="pkl-btn" @click="goToApp('final')">Rank my whole collection</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { markRaw } from "vue";
import {
  CardOutline,
  CheckmarkOutline,
  ChevronDownOutline,
  ChatbubbleEllipsesOutline,
  CopyOutline,
  DownloadOutline,
  GridOutline,
  LinkOutline,
  LockClosedOutline,
  PersonRemoveOutline,
  ShieldCheckmarkOutline,
  TrophyOutline,
} from "@vicons/ionicons5";
import {
  PICKS_APP_URL,
  PICKS_CRITERIA,
  PICKS_FAQS,
  PICKS_FREE_TRIAL_PHOTOS,
  PICKS_MAX_PHOTOS,
  PICKS_MIN_CHARGE_EUR,
  PICKS_PRICE_PER_PHOTO_EUR,
  PICKS_RETENTION_DAYS,
  PICKS_TRIAL_URL,
  formatScore,
  rankShowcase,
} from "~/utils/picksShowcase";
import { trackUserAction } from "~/utils/analytics";

useSEO("ai_photo_picks");


const formatCount = (n) => new Intl.NumberFormat("en-US").format(n);
const formatEur = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);
const priceFor = (n) =>
  Math.max(PICKS_MIN_CHARGE_EUR, Math.round(n * PICKS_PRICE_PER_PHOTO_EUR * 100) / 100);

const overall = rankShowcase("overall");
const heroPodium = overall.slice(0, 3);
const featured = overall[0];

const priceExamples = [100, 500, 2000, 5000];

const steps = [
  {
    title: "Drop your photos",
    text: `Pick up to ${formatCount(PICKS_MAX_PHOTOS)} photos or a whole folder. They are resized in your browser and start uploading while you check out.`,
  },
  {
    title: "Pay only for what you upload",
    text: `${formatEur(PICKS_PRICE_PER_PHOTO_EUR)} per photo, one payment, no account. The jury starts the moment you pay and works through your photos as they arrive.`,
  },
  {
    title: "Explore your ranking",
    text: "Switch between juries and criteria, read each critique and keep the shortlist. A private link to your ranking lands in your inbox.",
  },
];

const features = [
  {
    icon: markRaw(GridOutline),
    title: "Eight artistic criteria",
    text: "Aesthetics, composition, storytelling, originality, message, humor, visual games and spontaneity, each scored from 1 to 10.",
  },
  {
    icon: markRaw(ChatbubbleEllipsesOutline),
    title: "A critique for every photo",
    text: "One or two sentences naming what makes the frame work or what holds it back, the way an editor would say it in a portfolio review.",
  },
  {
    icon: markRaw(TrophyOutline),
    title: "Juries and competitions",
    text: "Overall, street, documentary, landscape, portrait, travel and fine art juries, plus award juries that only keep photos above a high bar.",
  },
  {
    icon: markRaw(CopyOutline),
    title: "Identical copies grouped",
    text: "The same image uploaded twice is judged once and marked with its copies, so duplicates never crowd your top picks.",
  },
  {
    icon: markRaw(DownloadOutline),
    title: "Originals one click away",
    text: "In Chrome and Edge, download the full-resolution original of any ranked photo straight from your disk. Export the whole ranking as CSV.",
  },
  {
    icon: markRaw(LinkOutline),
    title: `A private link for ${PICKS_RETENTION_DAYS} days`,
    text: "Close the tab once your photos are uploaded: the ranking keeps going and the link to it reaches your inbox.",
  },
];

const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 12);

let observer = null;
onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      }),
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  document.querySelectorAll(".pkl [data-reveal]").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  observer?.disconnect();
});

function goToTrial(where) {
  trackUserAction("navigate_to_picks_trial", `ai_photo_picks_${where}`);
  window.open(PICKS_TRIAL_URL, "_blank");
}

function goToApp(where) {
  trackUserAction("navigate_to_picks_tool", `ai_photo_picks_${where}`);
  window.open(PICKS_APP_URL, "_blank");
}
</script>

<style scoped>
.pkl {
  --pk-gold: #f4b740;
  --pk-gold-2: #ffd98a;
  --pk-gradient: linear-gradient(110deg, #22d3ee 0%, #8b5cf6 48%, #f59e0b 100%);
  --pk-gold-gradient: linear-gradient(135deg, #ffe3a3 0%, #f4b740 45%, #d4861c 100%);
  --pk-text: rgba(255, 255, 255, 0.94);
  --pk-text-2: rgba(255, 255, 255, 0.64);
  --pk-text-3: rgba(255, 255, 255, 0.42);
  --pk-line: rgba(255, 255, 255, 0.08);
  --pk-line-strong: rgba(255, 255, 255, 0.16);
  --pk-panel: rgba(18, 18, 24, 0.66);
  --pk-serif: "Fraunces", Georgia, serif;
  --pk-sans: "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif;
  --pk-ease: cubic-bezier(0.22, 1, 0.36, 1);

  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #07070a;
  color: var(--pk-text);
  font-family: var(--pk-sans);
}

/* ── Atmosphere ─────────────────────────────────────────────────── */

.pkl-aurora {
  position: absolute;
  inset: 0 0 auto;
  height: 1400px;
  pointer-events: none;
  overflow: hidden;
}

.pkl-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
  animation: pkl-drift 22s ease-in-out infinite alternate;
}

.pkl-orb--cyan {
  width: 560px;
  height: 560px;
  top: -160px;
  left: -140px;
  background: #0e7490;
}

.pkl-orb--violet {
  width: 640px;
  height: 640px;
  top: 120px;
  right: -200px;
  background: #5b21b6;
  animation-delay: -6s;
}

.pkl-orb--amber {
  width: 520px;
  height: 520px;
  top: 640px;
  left: 30%;
  background: #b45309;
  opacity: 0.22;
  animation-delay: -12s;
}

@keyframes pkl-drift {
  to {
    transform: translate(60px, 40px) scale(1.08);
  }
}

.pkl-grain {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.pkl > *:not(.pkl-aurora):not(.pkl-grain) {
  position: relative;
  z-index: 1;
}

.pkl-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
}

/* ── Nav ────────────────────────────────────────────────────────── */

.pkl-nav {
  position: sticky !important;
  top: 0;
  z-index: 30 !important;
  border-bottom: 1px solid transparent;
  transition: background 0.4s var(--pk-ease), border-color 0.4s var(--pk-ease);
}

.pkl-nav.is-solid {
  background: rgba(7, 7, 10, 0.75);
  backdrop-filter: blur(18px) saturate(1.3);
  border-bottom-color: var(--pk-line);
}

.pkl-nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  height: 68px;
  padding: 0 clamp(16px, 4vw, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.pkl-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.pkl-logo {
  height: 26px;
  width: auto;
}

.pkl-brand-divider {
  width: 1px;
  height: 20px;
  background: var(--pk-line-strong);
}

.pkl-brand-name {
  font-family: var(--pk-serif);
  font-style: italic;
  font-size: 1.45rem;
  line-height: 1;
  background: var(--pk-gold-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: 2px;
}

.pkl-nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.pkl-nav-link {
  font-size: 0.875rem;
  color: var(--pk-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
}

.pkl-nav-link:hover {
  color: var(--pk-text);
}

/* ── Buttons ────────────────────────────────────────────────────── */

.pkl-cta,
.pkl-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  font-family: var(--pk-sans);
  cursor: pointer;
  transition: transform 0.3s var(--pk-ease), box-shadow 0.3s var(--pk-ease),
    background 0.3s var(--pk-ease), border-color 0.3s var(--pk-ease);
}

.pkl-cta {
  padding: 16px 30px;
  border: 0;
  background: var(--pk-gold-gradient);
  color: #1a1206;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 14px 40px -12px rgba(244, 183, 64, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.pkl-cta::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.55) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.9s var(--pk-ease);
}

.pkl-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 50px -12px rgba(244, 183, 64, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.pkl-cta:hover::after {
  transform: translateX(120%);
}

.pkl-btn {
  padding: 15px 26px;
  border: 1px solid var(--pk-line-strong);
  background: rgba(255, 255, 255, 0.04);
  color: var(--pk-text);
  font-weight: 600;
  font-size: 1rem;
}

.pkl-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.pkl-btn--small {
  padding: 9px 18px;
  font-size: 0.875rem;
  color: var(--pk-gold-2);
  border-color: rgba(244, 183, 64, 0.45);
  background: rgba(244, 183, 64, 0.08);
}

.pkl-cta--block {
  width: 100%;
}

/* ── Typography ─────────────────────────────────────────────────── */

.pkl-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--pk-gold-2);
}

.pkl-title {
  margin: 14px 0 0;
  font-family: var(--pk-serif);
  font-weight: 400;
  font-size: clamp(2.1rem, 4.4vw, 3.6rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.pkl-title--small {
  margin-top: 0;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
}

.pkl-title em,
.pkl-hero-title em,
.pkl-final-title em {
  font-style: italic;
  font-weight: 300;
  background: var(--pk-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: 0.06em;
}

.pkl-lead {
  margin: 18px 0 0;
  font-size: clamp(1rem, 1.4vw, 1.12rem);
  line-height: 1.65;
  color: var(--pk-text-2);
  text-wrap: pretty;
}

.pkl-head {
  max-width: 760px;
  margin: 0 auto 44px;
  text-align: center;
}

/* ── Hero ───────────────────────────────────────────────────────── */

.pkl-hero {
  padding: clamp(40px, 8vh, 96px) 0 clamp(60px, 10vh, 120px);
}

.pkl-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}

.pkl-hero-title em {
  white-space: nowrap;
}

.pkl-hero-title {
  margin: 18px 0 0;
  font-family: var(--pk-serif);
  font-weight: 400;
  font-size: clamp(3rem, 7vw, 5.8rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
}

.pkl-hero-sub {
  margin: 24px 0 0;
  max-width: 560px;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.65;
  color: var(--pk-text-2);
}

.pkl-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.pkl-hero-actions--center {
  justify-content: center;
}

.pkl-trust {
  list-style: none;
  padding: 0;
  margin: 26px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  font-size: 0.85rem;
  color: var(--pk-text-3);
}

.pkl-trust li {
  display: flex;
  align-items: center;
  gap: 7px;
}

.pkl-trust .n-icon {
  color: var(--pk-gold);
}

.pkl-in {
  animation: pkl-in 1s var(--pk-ease) both;
  animation-delay: var(--d, 0ms);
}

@keyframes pkl-in {
  from {
    opacity: 0;
    transform: translateY(18px);
    filter: blur(8px);
  }
}

/* Podium like the app: No. 1 large on top, No. 2 and No. 3 underneath. */
.pkl-hero-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.75fr 1fr;
  gap: 12px;
  height: clamp(380px, 44vw, 540px);
}

.pkl-print {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #111117;
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06);
  animation: pkl-deal 1.1s var(--pk-ease) both;
}

.pkl-print img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pkl-print--0 {
  grid-column: 1 / -1;
  animation-delay: 0.2s;
}

.pkl-print--1 {
  animation-delay: 0.4s;
}

.pkl-print--2 {
  animation-delay: 0.55s;
}

@keyframes pkl-deal {
  from {
    opacity: 0;
    translate: 0 40px;
    filter: blur(10px);
  }
}

.pkl-print-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(4, 4, 7, 0.88) 0%, rgba(4, 4, 7, 0.1) 45%, transparent 60%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.35), transparent 30%);
}

.pkl-print-rank {
  position: absolute;
  top: 10px;
  left: 16px;
  font-family: var(--pk-serif);
  font-style: italic;
  font-weight: 300;
  font-size: 2.2rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.92);
}

.pkl-print--0 .pkl-print-rank {
  font-size: clamp(3.4rem, 6vw, 5rem);
  background: var(--pk-gold-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pkl-print-score {
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 4px 12px;
  border-radius: 999px;
  font-family: var(--pk-serif);
  font-size: 1rem;
  background: rgba(8, 8, 12, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}

.pkl-print--0 .pkl-print-score {
  color: #1a1206;
  background: var(--pk-gold-gradient);
  border-color: transparent;
  font-size: 1.25rem;
}

.pkl-print-critique {
  position: absolute;
  left: 20px;
  right: 92px;
  bottom: 18px;
  font-family: var(--pk-serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(0.9rem, 1.3vw, 1.08rem);
  line-height: 1.42;
  color: rgba(255, 255, 255, 0.92);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

/* ── Sections ───────────────────────────────────────────────────── */

.pkl-section {
  padding: clamp(64px, 10vh, 120px) 0;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s var(--pk-ease), transform 0.9s var(--pk-ease);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}

/* ── Critique ───────────────────────────────────────────────────── */

.pkl-critique-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
}

.pkl-critique-photo {
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 50px 120px -40px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.pkl-critique-photo img {
  width: 100%;
  display: block;
}

.pkl-quote {
  position: relative;
  margin: 26px 0 0;
  padding-left: 24px;
  font-family: var(--pk-serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

.pkl-quote::before {
  content: "“";
  position: absolute;
  left: -4px;
  top: -16px;
  font-size: 3.6rem;
  line-height: 1;
  color: var(--pk-gold);
}

.pkl-bars {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 28px;
}

.pkl-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 5px 10px;
  align-items: center;
}

.pkl-bar-label {
  font-size: 0.82rem;
  color: var(--pk-text-2);
}

.pkl-bar-value {
  grid-row: 1;
  grid-column: 2;
  font-family: var(--pk-serif);
  font-size: 0.9rem;
}

.pkl-bar-track {
  grid-column: 1 / -1;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.pkl-bar-fill {
  display: block;
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, #8b5cf6, #f4b740);
  transition: width 1.4s var(--pk-ease) 0.3s;
}

.is-visible .pkl-bar-fill {
  width: var(--w);
}

.pkl-fineprint {
  margin: 22px 0 0;
  font-size: 0.78rem;
  color: var(--pk-text-3);
}

/* ── Steps ──────────────────────────────────────────────────────── */

.pkl-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.pkl-step {
  padding: 28px;
  border-radius: 22px;
  background: var(--pk-panel);
  border: 1px solid var(--pk-line);
}

.pkl-step-num {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(244, 183, 64, 0.45);
  font-family: var(--pk-serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--pk-gold-2);
}

.pkl-step h3,
.pkl-feature h3 {
  margin: 18px 0 8px;
  font-family: var(--pk-serif);
  font-weight: 400;
  font-size: 1.35rem;
  letter-spacing: -0.01em;
}

.pkl-step p,
.pkl-feature p {
  margin: 0;
  font-size: 0.93rem;
  line-height: 1.6;
  color: var(--pk-text-2);
}

/* ── Features ───────────────────────────────────────────────────── */

.pkl-features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.pkl-feature {
  padding: 26px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));
  border: 1px solid var(--pk-line);
  transition: border-color 0.3s var(--pk-ease), transform 0.3s var(--pk-ease);
}

.pkl-feature:hover {
  border-color: rgba(244, 183, 64, 0.3);
  transform: translateY(-3px);
}

.pkl-feature-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  color: var(--pk-gold-2);
  background: rgba(244, 183, 64, 0.1);
  border: 1px solid rgba(244, 183, 64, 0.22);
}

/* ── Pricing ────────────────────────────────────────────────────── */

.pkl-pricing {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  max-width: 900px;
  margin: 0 auto;
}

.pkl-price-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border-radius: 24px;
  background: var(--pk-panel);
  border: 1px solid rgba(244, 183, 64, 0.35);
  box-shadow: 0 30px 80px -40px rgba(244, 183, 64, 0.35);
}

.pkl-price-card--trial {
  border-color: var(--pk-line);
  box-shadow: none;
}

.pkl-price-main {
  margin: 0;
  font-family: var(--pk-serif);
  font-size: 3.2rem;
  letter-spacing: -0.03em;
  line-height: 1;
}

.pkl-price-main span {
  font-family: var(--pk-sans);
  font-size: 1rem;
  letter-spacing: 0;
  color: var(--pk-text-3);
}

.pkl-price-sub {
  margin: 0;
  color: var(--pk-text-2);
  line-height: 1.6;
}

.pkl-price-examples,
.pkl-checks {
  list-style: none;
  margin: 0 0 auto;
  padding: 0;
  display: grid;
  gap: 8px;
}

.pkl-price-examples li {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid var(--pk-line);
  font-size: 0.93rem;
  color: var(--pk-text-2);
}

.pkl-price-examples strong {
  font-family: var(--pk-serif);
  font-weight: 400;
  color: var(--pk-text);
}

.pkl-checks li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.93rem;
  color: var(--pk-text-2);
}

.pkl-checks .n-icon {
  color: var(--pk-gold);
}

/* ── Privacy ────────────────────────────────────────────────────── */

.pkl-privacy {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  max-width: 900px;
}

.pkl-privacy-icon {
  flex-shrink: 0;
  margin-top: 6px;
  color: var(--pk-gold);
}

/* ── FAQ ────────────────────────────────────────────────────────── */

.pkl-faq-wrap {
  max-width: 860px;
}

.pkl-faq {
  display: grid;
  gap: 10px;
}

.pkl-faq-item {
  border-radius: 16px;
  background: var(--pk-panel);
  border: 1px solid var(--pk-line);
  transition: border-color 0.25s var(--pk-ease);
}

.pkl-faq-item[open] {
  border-color: rgba(244, 183, 64, 0.35);
}

.pkl-faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  list-style: none;
  cursor: pointer;
  font-weight: 600;
}

.pkl-faq-item summary::-webkit-details-marker {
  display: none;
}

.pkl-faq-chevron {
  flex-shrink: 0;
  color: var(--pk-text-3);
  transition: transform 0.3s var(--pk-ease);
}

.pkl-faq-item[open] .pkl-faq-chevron {
  transform: rotate(180deg);
  color: var(--pk-gold);
}

.pkl-faq-item p {
  margin: 0;
  padding: 0 24px 22px;
  line-height: 1.65;
  color: var(--pk-text-2);
}

.pkl-faq-link {
  display: inline-block;
  margin-left: 4px;
  color: var(--pk-gold-2);
  font-weight: 600;
  text-decoration: none;
}

.pkl-faq-link:hover {
  text-decoration: underline;
}

/* ── Final CTA ──────────────────────────────────────────────────── */

.pkl-final {
  padding: clamp(80px, 12vh, 140px) 0;
  text-align: center;
  background: radial-gradient(ellipse 60% 70% at 50% 60%, rgba(244, 183, 64, 0.12), transparent 70%);
}

.pkl-final-title {
  margin: 0 auto;
  max-width: 820px;
  font-family: var(--pk-serif);
  font-weight: 400;
  font-size: clamp(2.3rem, 5vw, 4.2rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

/* ── Responsive ─────────────────────────────────────────────────── */

@media (max-width: 900px) {
  .pkl-hero-grid,
  .pkl-critique-grid {
    grid-template-columns: 1fr;
  }
  .pkl-hero-visual {
    height: 380px;
  }
  .pkl-steps,
  .pkl-features {
    grid-template-columns: 1fr 1fr;
  }
  .pkl-nav-link {
    display: none;
  }
}

@media (max-width: 640px) {
  .pkl-steps,
  .pkl-features,
  .pkl-pricing,
  .pkl-bars {
    grid-template-columns: 1fr;
  }
  .pkl-hero-visual {
    height: 300px;
  }
  .pkl-print-critique {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .pkl-privacy {
    flex-direction: column;
    gap: 12px;
  }
  .pkl-hero-actions > * {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pkl-orb,
  .pkl-in,
  .pkl-print {
    animation: none;
  }
  [data-reveal] {
    opacity: 1;
    transform: none;
  }
}
</style>
