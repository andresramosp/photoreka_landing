<template>
  <HeroShell class="lx-hero--showcase-right">
    <div class="lx-hero__layout">
      <div class="lx-hero__center">
        <HeroEyebrow v-reveal class="lx-hero__eyebrow" />
        <HeroTitle />
        <HeroLead v-reveal="420" />
        <HeroActions
          align="center"
          @demo="emit('demo')"
          @signup="emit('signup')"
          @commercial-demo="emit('commercial-demo')"
        />
        <HeroGenres v-reveal="680" class="lx-hero__genres" />
      </div>

      <HeroRotatingShot
        class="lx-hero__side"
        :images="images"
        :interval="interval"
        :phone="phone"
      />
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
import HeroRotatingShot from "./HeroRotatingShot.vue";

defineProps({
  phone: { type: Boolean, default: false },
  /** Captures shown in turn; HeroRotatingShot has the default set. */
  images: { type: Array, default: undefined },
  interval: { type: Number, default: undefined },
});

const emit = defineEmits(["demo", "signup", "commercial-demo"]);
</script>

<style scoped>
/* HeroShowcase with only its right capture: the centred copy on the left
   and the capture beside it, kept whole inside the page. The layout is
   wider than .lx-container so the capture gets room. */
.lx-hero--showcase-right {
  --hero-top: clamp(128px, 17svh, 176px);
  --hero-bottom: clamp(56px, 9svh, 112px);
  --hero-title-size: clamp(3rem, min(4.9vw, 9svh), 4.9rem);
}

/* Below ~1400px the copy column shrinks with the row instead of holding
   570px, and the headline with it, so the capture stays the larger block. */
@media (min-width: 1024px) {
  .lx-hero--showcase-right {
    --hero-title-size: clamp(2.6rem, min(4.9vw, 9svh, 6.6vw - 25px), 4.9rem);
  }
}

.lx-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, min(570px, 45%)) minmax(0, 1fr);
  gap: clamp(32px, 4vw, 64px);
  align-items: center;
  max-width: calc(1560px + 2 * var(--lx-gutter));
  margin-inline: auto;
  padding-inline: var(--lx-gutter);
}

.lx-hero__center {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

/* The eyebrow sits closer to the headline than the column gap. */
.lx-hero__eyebrow {
  margin-bottom: -0.75rem;
}

/* The rolling row has no width of its own (see HeroGenres). */
.lx-hero__genres {
  --lx-hero-genres-justify: center;
  width: min(100%, 600px);
}

/* Narrowed copy column: the lead flows as one paragraph (three separate
   sentences would each break into ragged short lines) and the eyebrow
   tightens to stay on one line. */
@media (min-width: 1024px) and (max-width: 1365px) {
  .lx-hero__center :deep(.lx-hero__lead) {
    text-wrap: balance;
  }

  .lx-hero__center :deep(.lx-hero__lead > span) {
    display: inline;
  }

  .lx-hero__eyebrow {
    gap: 0.5rem;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }
}

/* Single column: the capture goes under the copy. */
@media (max-width: 1023px) {
  .lx-hero__layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

@media (max-width: 640px) {
  .lx-hero__center {
    gap: 1.5rem;
  }
}
</style>
