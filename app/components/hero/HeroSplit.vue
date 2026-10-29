<template>
  <HeroShell class="lx-hero--split">
    <div class="lx-hero__visual" aria-hidden="true">
      <img
        class="lx-hero__atlas"
        src="/home/hero_atlas_19.jpg"
        alt=""
        decoding="async"
      />
    </div>

    <div class="lx-container">
      <div class="lx-hero__copy">
        <HeroEyebrow v-reveal />
        <HeroTitle />
        <div v-reveal="420" class="lx-hero__intro">
          <HeroLead />
          <HeroGenres />
        </div>
        <HeroActions
          class="lx-hero__actions"
          align="start"
          @demo="emit('demo')"
          @signup="emit('signup')"
          @commercial-demo="emit('commercial-demo')"
        />
      </div>
    </div>
  </HeroShell>
</template>

<script setup>
import HeroShell from "./HeroShell.vue";
import HeroEyebrow from "./HeroEyebrow.vue";
import HeroTitle from "./HeroTitle.vue";
import HeroLead from "./HeroLead.vue";
import HeroGenres from "./HeroGenres.vue";
import HeroActions from "./HeroActions.vue";

const emit = defineEmits(["demo", "signup", "commercial-demo"]);
</script>

<style scoped>
/* Copy in a left column; the atlas fills the right side of the section,
   from below the nav to the bottom, up to the viewport edge. */
.lx-hero--split {
  --hero-top: clamp(128px, 17svh, 176px);
  --hero-bottom: clamp(48px, 8svh, 96px);
  --hero-title-size: clamp(3rem, min(5vw, 9svh), 5rem);
}

.lx-hero__copy {
  position: relative;
  display: grid;
  justify-items: start;
  gap: 1.9rem;
  max-width: min(640px, 50%);
}

.lx-hero__intro {
  display: grid;
  gap: 1.1rem;
  min-width: 0;
}

.lx-hero__actions {
  margin-top: 0.6rem;
}

/* No z-index on the box: a stacking context would stop the screen blend
   reaching the page background (same as in HeroAtlas). */
.lx-hero__visual {
  position: absolute;
  top: calc(var(--announcement-height, 0px) + 80px);
  bottom: 0;
  left: 44%;
  right: 0;
  pointer-events: none;
}

/* Cropped to its right half, where the larger photos sit. */
.lx-hero__atlas {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 88% center;
  mix-blend-mode: screen;
  filter: brightness(0.85);
  -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 18%,
      #000 42%
    ),
    linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 18%,
      #000 42%
    ),
    linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%);
  mask-composite: intersect;
  animation: lx-atlas-in 2s 0.6s ease-out both;
}

@keyframes lx-atlas-in {
  from {
    opacity: 0;
  }
}

[data-theme="light"] .lx-hero__atlas {
  display: none;
}

/* Single column below 1024px: no room for the atlas beside the copy. */
@media (max-width: 1023px) {
  .lx-hero__copy {
    max-width: none;
  }

  .lx-hero__visual {
    display: none;
  }
}

@media (max-width: 640px) {
  .lx-hero__copy {
    gap: 1.25rem;
  }

  .lx-hero__actions {
    margin-top: 0;
  }
}
</style>
