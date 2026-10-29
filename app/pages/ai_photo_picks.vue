<template>
  <!-- Always dark, like the Picks app itself. -->
  <div
    class="lx-page lx-numbered pkl"
    :class="{ 'pkl--site-light': siteLight }"
    data-theme="dark"
  >
    <LandingNav :links="navLinks" @navigate="onNavigate">
      <template #actions>
        <NuxtLink to="/" class="lx-link pkl-nav-back">Back to Photoreka</NuxtLink>
        <LxButton size="sm" @click="goToTrial('nav')">Try it free</LxButton>
      </template>
    </LandingNav>

    <PageHero eyebrow="AI photo ranking · No account needed">
      <template #title>
        Find your <em class="lx-accent">best photos</em> with AI.
      </template>
      <p>
        Drop up to {{ formatCount(PICKS_MAX_PHOTOS) }} photos. An AI jury scores every frame
        on eight artistic criteria, writes a short critique for each one and ranks them
        through the eyes of street, documentary, landscape or award juries.
      </p>
      <template #actions>
        <LxButton icon="external" @click="goToTrial('hero')">
          Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
        </LxButton>
        <LxButton variant="ghost" @click="goToApp('hero')">
          Rank my whole collection
        </LxButton>
      </template>
      <template #note>
        <ul class="pkl-trust">
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
            {{ formatEur(PICKS_PRICE_PER_PHOTO_EUR) }} per photo, VAT included
          </li>
        </ul>
      </template>
      <template #visual>
        <div class="pkl-podium" aria-hidden="true">
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
      </template>
    </PageHero>

    <!-- ── Juries demo ─────────────────────────────────────────────── -->
    <section id="juries" class="lx-section">
      <div class="lx-container">
        <SectionIntro eyebrow="The juries" align="center">
          <template #title>
            Rank your photos through <em class="lx-accent">many juries.</em>
          </template>
          <p>
            A street photographer and a landscape editor would never pick the same frame. Switch
            jury and watch your ranking reorder itself: each one weighs the criteria its own way,
            and themed juries only judge the photos of their genre.
          </p>
        </SectionIntro>
        <div v-reveal="120">
          <PicksJuryDemo />
        </div>
      </div>
    </section>

    <!-- ── Critique ────────────────────────────────────────────────── -->
    <section id="critique" class="lx-section">
      <div class="lx-container pkl-critique">
        <div v-reveal="{ variant: 'scale' }" class="pkl-critique__photo">
          <ShotFrame
            :src="featured.photo.src"
            alt="Street photo with its AI critique"
            ratio="auto"
            bare
          />
        </div>
        <div class="pkl-critique__copy">
          <SectionIntro eyebrow="A critique for every frame" size="md" flush>
            <template #title>
              AI photo critique: <em class="lx-accent">not just a number.</em>
            </template>
          </SectionIntro>
          <blockquote v-reveal="160" class="pkl-quote">{{ featured.photo.critique }}</blockquote>
          <div v-reveal="240" class="pkl-bars">
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
    <section id="how-it-works" class="lx-section">
      <div class="lx-container">
        <SectionIntro eyebrow="How it works">
          <template #title>
            From a messy folder to <em class="lx-accent">your best photos.</em>
          </template>
        </SectionIntro>
        <PageSteps :steps="steps" />
      </div>
    </section>

    <!-- ── Features ────────────────────────────────────────────────── -->
    <section id="features" class="lx-section">
      <div class="lx-container">
        <SectionIntro eyebrow="What you get" align="center">
          <template #title>
            An AI photo picker that <em class="lx-accent">thinks like an editor.</em>
          </template>
        </SectionIntro>
        <PageGrid :items="features" :columns="3" />
      </div>
    </section>

    <!-- ── Pricing ─────────────────────────────────────────────────── -->
    <section id="pricing" class="lx-section">
      <div class="lx-container">
        <SectionIntro eyebrow="Pricing" align="center">
          <template #title>
            Rank your photos, <em class="lx-accent">pay per photo.</em>
          </template>
        </SectionIntro>
        <div class="pkl-pricing">
          <div v-reveal class="lx-card pkl-price-card pkl-price-card--main">
            <p class="pkl-price-main">
              {{ formatEur(PICKS_PRICE_PER_PHOTO_EUR) }}<span> per photo</span>
            </p>
            <p class="pkl-price-sub">
              One payment per order, VAT included, no subscription. Minimum
              charge {{ formatEur(PICKS_MIN_CHARGE_EUR) }}.
            </p>
            <ul class="lx-list pkl-price-examples">
              <li v-for="n in priceExamples" :key="n">
                <span>{{ formatCount(n) }} photos</span>
                <strong>{{ formatEur(priceFor(n)) }}</strong>
              </li>
            </ul>
            <LxButton icon="external" block @click="goToApp('pricing')">
              Rank my photos
            </LxButton>
          </div>
          <div v-reveal="120" class="lx-card pkl-price-card">
            <p class="pkl-price-main">Free<span> to try</span></p>
            <p class="pkl-price-sub">
              Judge {{ PICKS_FREE_TRIAL_PHOTOS }} of your own photos with the full jury, critiques
              included. No card, no account.
            </p>
            <ul class="lx-list pkl-checks">
              <li><span class="lx-tick" aria-hidden="true" />Scores on 8 criteria</li>
              <li><span class="lx-tick" aria-hidden="true" />A critique for every photo</li>
              <li><span class="lx-tick" aria-hidden="true" />Every jury and competition</li>
            </ul>
            <LxButton variant="ghost" icon="external" block @click="goToTrial('pricing')">
              Try it free
            </LxButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Privacy ─────────────────────────────────────────────────── -->
    <section class="lx-section lx-section--tight">
      <div class="lx-container">
        <div v-reveal class="lx-card pkl-privacy">
          <span class="pkl-privacy__icon" aria-hidden="true">
            <n-icon size="26"><LockClosedOutline /></n-icon>
          </span>
          <div class="pkl-privacy__copy">
            <h2 class="lx-title lx-title--md">Your originals stay with you.</h2>
            <p class="lx-lead">
              Picks resizes every photo in your browser and only sends an 800-pixel thumbnail to the
              jury. The full-resolution files never leave your device. Thumbnails and results are
              deleted after {{ PICKS_RETENTION_DAYS }} days, and the photos are never used to train
              any model.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FAQ ─────────────────────────────────────────────────────── -->
    <FaqSection :faqs="faqs">
      <template #title>
        Ranking your photos, <em class="lx-accent">answered.</em>
      </template>
      <template #answer="{ faq }">
        <p>
          {{ faq.answer }}
          <NuxtLink v-if="faq.link" :to="faq.link.to" class="lx-inline-link">
            {{ faq.link.label }} →
          </NuxtLink>
        </p>
      </template>
    </FaqSection>

    <!-- ── Final CTA ───────────────────────────────────────────────── -->
    <PageCta>
      <template #title>
        Your best photo is already <em class="lx-accent">in that folder.</em>
      </template>
      <p>Let the jury find it.</p>
      <template #actions>
        <LxButton icon="external" @click="goToTrial('final')">
          Try it free with {{ PICKS_FREE_TRIAL_PHOTOS }} photos
        </LxButton>
        <LxButton variant="ghost" @click="goToApp('final')">
          Rank my whole collection
        </LxButton>
      </template>
    </PageCta>
  </div>
</template>

<script setup>
import { markRaw } from "vue";
import {
  CardOutline,
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

const smoothScroll = useSmoothScroll();

// The page stays dark whatever the site theme, but the nav logo follows the
// site theme; with the light theme on, it would be dark text on dark.
const { themeMode } = useTheme();
const mounted = ref(false);
const siteLight = computed(() => mounted.value && themeMode.value === "light");

const navLinks = [
  { label: "Juries", target: "juries" },
  { label: "Critique", target: "critique" },
  { label: "How it works", target: "how-it-works" },
  { label: "Pricing", target: "pricing" },
  { label: "FAQ", target: "faq" },
];

const formatCount = (n) => new Intl.NumberFormat("en-US").format(n);
// Up to three decimals: the per-photo price is €0.012.
const formatEur = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 3,
  }).format(n);
const priceFor = (n) =>
  Math.max(PICKS_MIN_CHARGE_EUR, Math.round(n * PICKS_PRICE_PER_PHOTO_EUR * 100) / 100);

const overall = rankShowcase("overall");
const heroPodium = overall.slice(0, 3);
const featured = overall[0];

const priceExamples = [100, 500, 2000, 5000];

const steps = [
  {
    title: "Drop your photos",
    description: `Pick up to ${formatCount(PICKS_MAX_PHOTOS)} photos or a whole folder. They are resized in your browser and start uploading while you check out.`,
  },
  {
    title: "Pay only for what you upload",
    description: `${formatEur(PICKS_PRICE_PER_PHOTO_EUR)} per photo, VAT included, one payment, no account. The jury starts the moment you pay and works through your photos as they arrive.`,
  },
  {
    title: "Explore your ranking",
    description:
      "Switch between juries and criteria, read each critique and keep the shortlist. A private link to your ranking lands in your inbox.",
  },
];

const features = [
  {
    icon: markRaw(GridOutline),
    title: "Eight artistic criteria",
    description:
      "Aesthetics, composition, storytelling, originality, message, humor, visual games and spontaneity, each scored from 1 to 10.",
    color: "var(--lx-warm)",
  },
  {
    icon: markRaw(ChatbubbleEllipsesOutline),
    title: "A critique for every photo",
    description:
      "One or two sentences naming what makes the frame work or what holds it back, the way an editor would say it in a portfolio review.",
    color: "var(--lx-warm)",
  },
  {
    icon: markRaw(TrophyOutline),
    title: "Juries and competitions",
    description:
      "Overall, street, documentary, landscape, portrait, travel and fine art juries, plus award juries that only keep photos above a high bar.",
    color: "var(--lx-warm)",
  },
  {
    icon: markRaw(CopyOutline),
    title: "Identical copies grouped",
    description:
      "The same image uploaded twice is judged once and marked with its copies, so duplicates never crowd your top picks.",
    color: "var(--lx-warm)",
  },
  {
    icon: markRaw(DownloadOutline),
    title: "Originals one click away",
    description:
      "In Chrome and Edge, download the full-resolution original of any ranked photo straight from your disk. Export the whole ranking as CSV.",
    color: "var(--lx-warm)",
  },
  {
    icon: markRaw(LinkOutline),
    title: `A private link for ${PICKS_RETENTION_DAYS} days`,
    description:
      "Close the tab once your photos are uploaded: the ranking keeps going and the link to it reaches your inbox.",
    color: "var(--lx-warm)",
  },
];

const faqs = PICKS_FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.a,
  link: faq.link,
}));

const onNavigate = (target) => {
  trackUserAction("navigate_to_section", "ai_photo_picks_nav", target);
};

onMounted(() => {
  mounted.value = true;
  smoothScroll.enable();
});

onBeforeUnmount(() => {
  smoothScroll.disable();
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
/* Picks keeps the gold of its app for the No. 1 photo and the score bars. */
.pkl {
  --pk-gold: #f4b740;
  --pk-gold-gradient: linear-gradient(135deg, #ffe3a3 0%, #f4b740 45%, #d4861c 100%);
}

.pkl--site-light :deep(.lx-nav__brand) {
  background: url("/logos/marca/horizontal-dark.png") left center / contain
    no-repeat;
}

.pkl--site-light :deep(.lx-nav__brand .photoreka-logo) {
  visibility: hidden;
}

.pkl-nav-back {
  margin-right: 0.75rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

/* ── Hero ───────────────────────────────────────────────────────── */

.pkl-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pkl-trust li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

/* Podium like the app: No. 1 large on top, No. 2 and No. 3 underneath. */
.pkl-podium {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.75fr 1fr;
  gap: 12px;
  height: clamp(380px, 44vw, 540px);
}

.pkl-print {
  position: relative;
  border-radius: var(--lx-radius);
  overflow: hidden;
  background: var(--lx-shot-bg);
  border: 1px solid var(--lx-line-2);
  box-shadow: var(--lx-shadow-lg);
}

.pkl-print img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pkl-print--0 {
  grid-column: 1 / -1;
}

.pkl-print-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(0deg, rgba(4, 4, 7, 0.88) 0%, rgba(4, 4, 7, 0.1) 45%, transparent 60%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.35), transparent 30%);
}

.pkl-print-rank {
  position: absolute;
  top: 10px;
  left: 16px;
  font-family: var(--lx-font-display);
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
  font-family: var(--lx-font-display);
  font-size: 1rem;
  color: #fff;
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
  font-family: var(--lx-font-display);
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

/* ── Critique ───────────────────────────────────────────────────── */

.pkl-critique {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(40px, 5vw, 80px);
  align-items: center;
}

.pkl-critique__copy {
  display: grid;
  gap: 1.75rem;
}

.pkl-quote {
  position: relative;
  margin: 0;
  padding-left: 24px;
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
  line-height: 1.5;
  color: var(--lx-text);
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 28px;
}

.pkl-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px 10px;
  align-items: center;
}

.pkl-bar-label {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

.pkl-bar-value {
  grid-row: 1;
  grid-column: 2;
  font-family: var(--lx-font-display);
  font-size: 0.95rem;
}

.pkl-bar-track {
  grid-column: 1 / -1;
  height: 4px;
  border-radius: 999px;
  background: var(--lx-line);
  overflow: hidden;
}

.pkl-bar-fill {
  display: block;
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--lx-accent), var(--pk-gold));
  transition: width 1.4s var(--lx-ease) 0.3s;
}

/* The bars fill once their block has been revealed (or right away when
   motion is off and nothing is ever hidden). */
.pkl-bars.is-in .pkl-bar-fill,
html:not(.lx-motion) .pkl-bar-fill {
  width: var(--w);
}

.pkl-fineprint {
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
}

/* ── Pricing ────────────────────────────────────────────────────── */

.pkl-pricing {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  max-width: 920px;
  margin-inline: auto;
}

.pkl-price-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(28px, 3.5vw, 44px);
}

.pkl-price-card--main {
  border-color: color-mix(in srgb, var(--pk-gold) 35%, transparent);
  box-shadow:
    var(--lx-highlight),
    0 30px 80px -40px color-mix(in srgb, var(--pk-gold) 45%, transparent);
}

.pkl-price-main {
  font-family: var(--lx-font-display);
  font-weight: 340;
  font-size: clamp(2.6rem, 4vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--lx-text);
}

.pkl-price-main span {
  font-family: var(--lx-font-sans);
  font-size: var(--lx-fs-body);
  letter-spacing: 0;
  color: var(--lx-text-2);
}

.pkl-price-sub {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.pkl-price-examples li {
  justify-content: space-between;
  color: var(--lx-text-2);
}

.pkl-price-examples strong {
  font-family: var(--lx-font-display);
  font-weight: 400;
  color: var(--lx-text);
}

.pkl-pricing :deep(.lx-btn) {
  margin-top: auto;
}

/* ── Privacy ────────────────────────────────────────────────────── */

.pkl-privacy {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
  max-width: 980px;
  margin-inline: auto;
  padding: clamp(28px, 4vw, 56px);
}

.pkl-privacy__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
  color: var(--lx-ok);
}

.pkl-privacy__copy {
  display: grid;
  gap: 1rem;
}

@media (max-width: 1023px) {
  .pkl-critique {
    grid-template-columns: 1fr;
  }

  .pkl-nav-back {
    display: none;
  }
}

@media (max-width: 760px) {
  .pkl-pricing {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .pkl-podium {
    height: 360px;
  }

  .pkl-bars {
    grid-template-columns: 1fr;
  }

  .pkl-print-critique {
    right: 20px;
    bottom: 54px;
  }

  .pkl-privacy {
    grid-template-columns: 1fr;
  }
}
</style>
