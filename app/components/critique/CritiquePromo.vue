<template>
  <!-- Internal link to the Critique landing, never straight to the app: the
       landing is the page that has to rank for "AI portfolio review". -->
  <aside v-reveal class="lx-card cpr" :class="`cpr--${variant}`" aria-label="Photoreka Critique">
    <NuxtLink
      :to="CRITIQUE_LANDING"
      class="cpr-visual"
      tabindex="-1"
      aria-hidden="true"
      @click="track('visual')"
    >
      <img
        v-for="(page, i) in pages"
        :key="page"
        :src="page"
        :class="`cpr-sheet cpr-sheet--${i}`"
        alt=""
        width="1100"
        height="1556"
        loading="lazy"
      />
    </NuxtLink>

    <div class="cpr-copy">
      <p class="cpr-eyebrow">
        <span class="cpr-dot" aria-hidden="true" />
        {{ eyebrow }}
      </p>
      <p class="cpr-title">
        {{ title }} <em v-if="accent">{{ accent }}</em>
      </p>
      <p v-if="variant !== 'card' || text" class="cpr-text">
        {{ text || defaultText }}
      </p>
    </div>

    <div class="cpr-actions">
      <LxButton :to="CRITIQUE_LANDING" :size="variant === 'card' ? 'sm' : 'md'" :block="variant === 'card'" @click="track('button')">
        {{ button }}
      </LxButton>
      <NuxtLink :to="`${CRITIQUE_LANDING}#sample`" class="lx-link cpr-sample" @click="track('sample')">
        Read a sample report
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
import {
  CRITIQUE_MAX_PHOTOS,
  CRITIQUE_MIN_PHOTOS,
  CRITIQUE_HERO_PAGES,
  CRITIQUE_PRICE_EUR,
} from "~/utils/critiqueShowcase";
import { trackUserAction } from "~/utils/analytics";

const CRITIQUE_LANDING = "/photography_portfolio_review/";

const props = defineProps({
  /** Analytics label of the page hosting the promo. */
  source: { type: String, required: true },
  /** banner: one row across the container · card: a narrow column (asides). */
  variant: { type: String, default: "banner" },
  eyebrow: { type: String, default: "New · Photoreka Critique" },
  title: { type: String, default: "An AI photography portfolio review" },
  /** The italic, gold end of the title. */
  accent: {
    type: String,
    default: `of your ${CRITIQUE_MIN_PHOTOS} to ${CRITIQUE_MAX_PHOTOS} best photos.`,
  },
  text: { type: String, default: "" },
  button: { type: String, default: "Get my portfolio reviewed" },
});

const defaultText = `A written report on your work as a whole: your strongest frames, the ones that hold the set back, your style counted photo by photo and what to photograph next. €${CRITIQUE_PRICE_EUR}, no account.`;

// The cover, a featured critique and a growth area, as on the landing hero.
const pages = CRITIQUE_HERO_PAGES;

function track(where) {
  trackUserAction("navigate_to_critique_landing", `${props.source}_critique_promo_${where}`);
}
</script>

<style scoped>
.cpr {
  --cpr-gold: var(--lx-warm);
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) auto;
  gap: clamp(20px, 3vw, 44px);
  align-items: center;
  padding: clamp(20px, 2.6vw, 32px) clamp(22px, 3vw, 40px);
  overflow: hidden;
  border-color: color-mix(in srgb, var(--cpr-gold) 35%, var(--lx-line));
  background:
    radial-gradient(120% 140% at 0% 50%, color-mix(in srgb, var(--cpr-gold) 12%, transparent), transparent 60%),
    var(--lx-surface);
}

/* Three pages of a real report, fanned like prints on a table. */
.cpr-visual {
  position: relative;
  display: block;
  height: 150px;
}

.cpr-sheet {
  position: absolute;
  top: 8px;
  width: 92px;
  height: auto;
  border-radius: 2px;
  background: #fff;
  box-shadow:
    0 18px 30px -18px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: transform 0.6s var(--lx-ease);
}

.cpr-sheet--0 {
  left: 0;
  transform: rotate(-8deg);
}

.cpr-sheet--1 {
  left: 92px;
  transform: rotate(7deg);
}

.cpr-sheet--2 {
  left: 46px;
  top: 0;
  transform: rotate(-1deg);
}

.cpr:hover .cpr-sheet--0 {
  transform: rotate(-11deg) translateX(-6px);
}

.cpr:hover .cpr-sheet--1 {
  transform: rotate(10deg) translateX(6px);
}

.cpr-copy {
  display: grid;
  gap: 0.55rem;
}

.cpr-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cpr-gold);
}

.cpr-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--cpr-gold);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--cpr-gold) 22%, transparent);
}

.cpr-title {
  margin: 0;
  font-family: var(--lx-font-display);
  font-weight: 400;
  font-size: clamp(1.45rem, 2.2vw, 1.9rem);
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--lx-text);
}

.cpr-title em {
  font-style: italic;
  font-weight: 300;
  color: var(--cpr-gold);
}

.cpr-text {
  margin: 0;
  max-width: 62ch;
  font-size: var(--lx-fs-sm);
  line-height: 1.6;
  color: var(--lx-text-2);
}

.cpr-actions {
  display: grid;
  justify-items: center;
  gap: 0.7rem;
}

.cpr-sample {
  font-size: var(--lx-fs-sm);
}

/* ── Card: a narrow column, visual on top ─────────────────────── */

.cpr--card {
  grid-template-columns: minmax(0, 1fr);
  gap: 1.1rem;
  padding: 22px;
  background:
    radial-gradient(140% 90% at 50% 0%, color-mix(in srgb, var(--cpr-gold) 14%, transparent), transparent 65%),
    var(--lx-surface);
}

.cpr--card .cpr-visual {
  width: 200px;
  height: 128px;
  margin-inline: auto;
}

.cpr--card .cpr-sheet {
  width: 80px;
}

.cpr--card .cpr-sheet--1 {
  left: 104px;
}

.cpr--card .cpr-sheet--2 {
  left: 58px;
}

.cpr--card .cpr-sheet--0 {
  left: 12px;
}

.cpr--card .cpr-title {
  font-size: 1.3rem;
}

.cpr--card .cpr-actions {
  justify-items: stretch;
  text-align: center;
}

/* ── Narrow screens: the banner stacks ────────────────────────── */

@media (max-width: 900px) {
  .cpr--banner {
    grid-template-columns: 160px minmax(0, 1fr);
  }

  .cpr--banner .cpr-visual {
    height: 130px;
  }

  .cpr--banner .cpr-sheet {
    width: 76px;
  }

  .cpr--banner .cpr-sheet--1 {
    left: 76px;
  }

  .cpr--banner .cpr-sheet--2 {
    left: 38px;
  }

  .cpr--banner .cpr-actions {
    grid-column: 1 / -1;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
  }
}

@media (max-width: 560px) {
  .cpr--banner {
    grid-template-columns: minmax(0, 1fr);
  }

  .cpr--banner .cpr-visual {
    width: 160px;
  }

  .cpr--banner .cpr-actions {
    grid-auto-flow: row;
    justify-items: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cpr-sheet {
    transition: none;
  }
}
</style>
