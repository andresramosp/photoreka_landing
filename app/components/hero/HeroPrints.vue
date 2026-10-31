<template>
  <HeroShell class="lx-hero--prints">
    <div class="lx-container lx-hero__grid">
      <div class="lx-hero__heading">
        <HeroEyebrow v-reveal />
        <HeroTitle />
        <div
          v-reveal="{ variant: 'fade', delay: 700 }"
          class="lx-hero__prints"
          aria-hidden="true"
        >
          <div class="lx-hero__prints-set">
            <span
              v-for="(src, i) in heroPrints"
              :key="src"
              class="lx-hero__print"
              :class="`is-${i}`"
            >
              <svg class="lx-hero__clip" viewBox="0 0 14 40">
                <path
                  d="M5 12 V30 A2.5 2.5 0 0 0 10 30 V7 A4 4 0 0 0 2 7 V32 A5 5 0 0 0 12 32 V14"
                />
              </svg>
              <img :src="src" alt="" decoding="async" />
            </span>
          </div>
        </div>
      </div>

      <div class="lx-hero__aside">
        <div v-reveal="420" class="lx-hero__intro">
          <HeroLead />
          <HeroGenres />
        </div>
        <HeroActions
          @demo="emit('demo')"
          @signup="emit('signup')"
          @commercial-demo="emit('commercial-demo')"
        />
      </div>
    </div>

    <HeroStage />
  </HeroShell>
</template>

<script setup>
import HeroShell from "./HeroShell.vue";
import HeroEyebrow from "./HeroEyebrow.vue";
import HeroTitle from "./HeroTitle.vue";
import HeroLead from "./HeroLead.vue";
import HeroGenres from "./HeroGenres.vue";
import HeroActions from "./HeroActions.vue";
import HeroStage from "./HeroStage.vue";

const emit = defineEmits(["demo", "signup", "commercial-demo"]);

const heroPrints = [
  "/picks/photos/2.jpg",
  "/picks/photos/5.jpg",
  "/picks/photos/1.jpg",
];
</script>

<style scoped>
/* Same frame as HeroAtlas: full-width heading, then a band with the copy
   and the buttons. The headline is narrowed so the prints fit beside it. */
.lx-hero__grid {
  display: grid;
  gap: clamp(28px, 4svh, 48px);
}

.lx-hero__heading {
  position: relative;
  display: grid;
  gap: 1.9rem;
}

@media (min-width: 1280px) {
  .lx-hero--prints {
    --hero-title-size: clamp(3rem, min(5.8vw, 10.4svh), 5.8rem);
  }

  .lx-hero__title {
    max-width: calc(100% - min(31%, 420px) - 2rem);
  }
}

/* Loose prints beside the end of the headline, kept fully opaque.
   Below 1280px the headline reaches them, so they go. */
.lx-hero__prints {
  --lx-prints-bleed: 56px;
  position: absolute;
  z-index: 0;
  top: calc(var(--lx-prints-bleed) * -1);
  right: calc(var(--lx-prints-bleed) * -1);
  bottom: calc(var(--lx-prints-bleed) * -1);
  width: calc(min(31%, 420px) + var(--lx-prints-bleed));
  pointer-events: none;
}

.lx-hero__prints-set {
  position: absolute;
  inset: var(--lx-prints-bleed) var(--lx-prints-bleed) var(--lx-prints-bleed) 0;
  container-type: size;
}

/* Thin paper border at the photos' own 3:2. Dimmed rather than
   translucent, so overlapping prints don't show through each other. */
.lx-hero__print {
  position: absolute;
  top: var(--y);
  right: var(--x);
  /* Capped by the headline's height too, so on short screens the stack
     stays clear of the divider. */
  width: min(56cqw, 76cqh);
  padding: 2.5%;
  background: #ebe7de;
  border-radius: 1px;
  filter: brightness(0.7) saturate(0.8);
  box-shadow: 0 22px 40px -18px rgba(0, 0, 0, 0.85);
  transform: translate(var(--dx, 0), var(--dy, 0))
    rotate(calc(var(--r) + var(--dr, 0deg)));
  pointer-events: auto;
  transition:
    filter 0.5s ease,
    transform 0.7s var(--lx-ease);
}

[data-theme="light"] .lx-hero__print {
  background: #ffffff;
  filter: brightness(0.7) saturate(0.25);
  box-shadow: 0 18px 34px -18px rgba(13, 13, 16, 0.35);
}

.lx-hero__print img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.lx-hero__print.is-0 {
  --x: 2%;
  --y: 0%;
  --r: 6deg;
}

.lx-hero__print.is-1 {
  --x: 40%;
  --y: 16%;
  --r: -7deg;
}

.lx-hero__print.is-2 {
  --x: 15%;
  --y: 36%;
  --r: 2.5deg;
}

/* Hovering any print lifts the dimming on all three and fans them out. */
.lx-hero__prints-set:has(.lx-hero__print:hover) .lx-hero__print {
  filter: none;
}

.lx-hero__prints-set:has(.lx-hero__print:hover) .is-0 {
  --dx: 10px;
  --dy: -6px;
  --dr: 2deg;
}

.lx-hero__prints-set:has(.lx-hero__print:hover) .is-1 {
  --dx: -12px;
  --dy: -2px;
  --dr: -2deg;
}

.lx-hero__prints-set:has(.lx-hero__print:hover) .is-2 {
  --dx: 2px;
  --dy: 8px;
  --dr: -1.5deg;
}

/* Paper clip slid over a corner of each print. */
.lx-hero__clip {
  position: absolute;
  z-index: 1;
  top: -15px;
  width: 13px;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.55));
}

.lx-hero__clip path {
  fill: none;
  stroke: #dfe3e8;
  stroke-width: 1.5;
  stroke-linecap: round;
}

.lx-hero__print.is-0 .lx-hero__clip {
  right: 9%;
  transform: rotate(28deg);
}

.lx-hero__print.is-1 .lx-hero__clip {
  left: 9%;
  transform: rotate(-28deg);
}

.lx-hero__print.is-2 .lx-hero__clip {
  right: 12%;
  transform: rotate(22deg);
}

@media (max-width: 1279px) {
  .lx-hero__prints {
    display: none;
  }
}

.lx-hero__aside {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lx-line-2);
}

.lx-hero__intro {
  display: grid;
  gap: 1rem;
  justify-self: start;
  min-width: 0;
}

@media (max-width: 1023px) {
  .lx-hero__aside {
    grid-template-columns: 1fr;
    gap: 1.6rem;
    align-items: start;
  }
}

@media (max-width: 640px) {
  .lx-hero__heading {
    gap: 1.25rem;
  }

  .lx-hero__aside {
    gap: 1.25rem;
    padding-top: 1.25rem;
  }
}
</style>
