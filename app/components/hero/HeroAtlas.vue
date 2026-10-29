<template>
  <HeroShell class="lx-hero--atlas">
    <div class="lx-container lx-hero__grid">
      <div class="lx-hero__heading">
        <HeroEyebrow v-reveal />
        <HeroTitle />
        <div class="lx-hero__atlas-box" aria-hidden="true">
          <img
            class="lx-hero__atlas"
            src="/home/hero_atlas_19.jpg"
            alt=""
            decoding="async"
          />
          <img
            v-for="(src, i) in heroFeatures2d"
            :key="src"
            class="lx-hero__feature"
            :class="`is-${i}`"
            :src="src"
            alt=""
            decoding="async"
          />
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

// Photos shown enlarged over the atlas, as on hover in the 2D viewer.
const heroFeatures2d = [];
</script>

<style scoped>
/* The headline spans the full width; everything else sits in a band
   below it, so the supporting copy never competes with it side by side.
   Vertical sizes follow the viewport height so the product stage always
   peeks above the fold. */
.lx-hero__grid {
  display: grid;
  gap: clamp(28px, 4svh, 48px);
}

.lx-hero__heading {
  position: relative;
  display: grid;
  gap: 1.9rem;
}

/* The 2D atlas as a far-off universe beside the headline. Screen blending
   drops the capture's black background, so only the photos and their glow
   remain; the radial mask dissolves its edges. */
/* From 40% of the heading to the viewport's right edge, rising above the
   eyebrow and ending at the divider. The left side fades under the headline
   through the mask. No z-index here: a stacking context would stop the
   screen blend reaching the page background. */
.lx-hero__atlas-box {
  position: absolute;
  top: -54%;
  aspect-ratio: 2400 / 1100;
  left: 40%;
  right: calc((100% - 100vw) / 2);
  pointer-events: none;
}

.lx-hero__atlas {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  mix-blend-mode: screen;
  filter: brightness(0.85);
  -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.18) 22%,
      rgba(0, 0, 0, 0.55) 42%,
      #000 62%
    ),
    linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.18) 22%,
      rgba(0, 0, 0, 0.55) 42%,
      #000 62%
    ),
    linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%);
  mask-composite: intersect;
  animation: lx-atlas-in 2s 0.6s ease-out both;
}

/* One photo of the atlas shown enlarged, as on hover in the 2D viewer. */
.lx-hero__feature {
  position: absolute;
  z-index: 0;
  object-fit: cover;
  border-radius: 2px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 16px 34px -12px rgba(0, 0, 0, 0.9);
  filter: brightness(0.92);
  pointer-events: auto;
  transition: filter 0.5s ease;
  animation: lx-feature-in 0.9s var(--lx-feature-delay, 1.4s) var(--lx-ease)
    both;
}

/* Centred on the cores of the upper and right clusters of the atlas image
   (57%/28% and 86%/42% of the box). Heights are in box units: the box is
   2.45 times wider than tall. */
.lx-hero__feature.is-0 {
  left: 52.75%;
  top: 17.6%;
  width: 8.5%;
  aspect-ratio: 1;
}

.lx-hero__feature.is-1 {
  left: 82.5%;
  top: 29.2%;
  width: 7%;
  aspect-ratio: 2 / 3;
  --lx-feature-delay: 1.7s;
}

.lx-hero__feature:hover {
  filter: none;
}

@keyframes lx-feature-in {
  from {
    opacity: 0;
    transform: scale(0.35);
  }
}

@keyframes lx-atlas-in {
  from {
    opacity: 0;
  }
}

[data-theme="light"] .lx-hero__atlas,
[data-theme="light"] .lx-hero__feature {
  display: none;
}

/* Below 1280px the headline reaches the atlas, so it goes. */
@media (max-width: 1279px) {
  .lx-hero__atlas,
  .lx-hero__feature {
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
