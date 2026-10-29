<template>
  <HeroShell class="lx-hero--showcase">
    <div class="lx-hero__side is-left">
      <ShotFrame
        src="/home/portfolio_desktop_4.jpg"
        alt="Photoreka AI photo curation and organizer dashboard"
        label="Photoreka — Dashboard"
        ratio="auto"
        loading="eager"
      />
    </div>
    <div class="lx-hero__side is-right">
      <ShotFrame
        src="/canvas/chatlab.png"
        alt="AI-generated photo tag cloud in 2D semantic space"
        label="Photoreka — Tag Cloud"
        ratio="auto"
        loading="eager"
      />
      <span class="lx-hero__phone">
        <img
          src="/home/photoreka_mobile_halo.png"
          alt="Photoreka mobile app"
          loading="eager"
        />
      </span>
    </div>

    <div class="lx-container">
      <div class="lx-hero__center">
        <HeroTitle />
        <HeroLead v-reveal="420" />
        <HeroActions
          align="center"
          @demo="emit('demo')"
          @signup="emit('signup')"
          @commercial-demo="emit('commercial-demo')"
        />
        <div v-reveal="680" class="lx-hero__proof">
          <HeroEyebrow />
          <HeroGenres class="lx-hero__genres" />
        </div>
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
/* Centred column with a capture on each side. Each capture is shown whole
   in its frame; only the screen edges cut it, more so as the viewport
   narrows. --showcase-col is the column's width and --showcase-side the
   width of each capture. */
.lx-hero--showcase {
  --hero-top: clamp(128px, 17svh, 176px);
  --hero-bottom: clamp(56px, 9svh, 112px);
  --hero-title-size: clamp(3rem, min(4.9vw, 9svh), 4.9rem);
  --showcase-col: 680px;
  --showcase-side: clamp(520px, 44vw, 760px);
  --showcase-side-top: calc(
    var(--announcement-height, 0px) + clamp(150px, 22svh, 210px)
  );
}

.lx-hero__center {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: var(--showcase-col);
  margin-inline: auto;
  text-align: center;
}

.lx-hero__proof {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  margin-top: 0.25rem;
}

/* The rolling row has no width of its own (see HeroGenres). */
.lx-hero__genres {
  --lx-hero-genres-justify: center;
  width: min(100%, 600px);
}

.lx-hero__side {
  position: absolute;
  top: var(--showcase-side-top);
  width: var(--showcase-side);
  perspective: 1800px;
}

.lx-hero__side.is-left {
  right: calc(50% + var(--showcase-col) / 2 + 10px);
}

.lx-hero__side.is-right {
  left: calc(50% + var(--showcase-col) / 2 + 10px);
}

/* Both captures turn slightly towards the centre. On load they slide in
   from beyond the screen edges, turned much further, and close onto that
   angle; the phone rises once the right capture has landed. */
.lx-hero__side.is-left .lx-shot {
  transform-origin: 100% 50%;
  transform: rotateY(10deg);
  animation: lx-side-in-left 1.6s 0.25s var(--lx-ease) both;
}

.lx-hero__side.is-right .lx-shot {
  transform-origin: 0% 50%;
  transform: rotateY(-10deg);
  animation: lx-side-in-right 1.6s 0.25s var(--lx-ease) both;
}

@keyframes lx-side-in-left {
  from {
    opacity: 0;
    transform: translateX(-38%) rotateY(42deg);
  }
}

@keyframes lx-side-in-right {
  from {
    opacity: 0;
    transform: translateX(38%) rotateY(-42deg);
  }
}

@keyframes lx-phone-in {
  from {
    opacity: 0;
    transform: translateY(18%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lx-hero__side .lx-shot,
  .lx-hero__phone {
    animation: none;
  }
}

/* Phone over the bottom-left corner of the right capture. As in the
   product stage, clip-path trims the halo baked into the asset and the
   wrapper casts the shadow. */
.lx-hero__phone {
  position: absolute;
  z-index: 2;
  left: -6%;
  bottom: -22%;
  width: 24%;
  pointer-events: none;
  filter: drop-shadow(0 28px 40px rgba(0, 0, 0, 0.6))
    drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
  animation: lx-phone-in 1s 1.2s var(--lx-ease) both;
}

.lx-hero__phone img {
  display: block;
  width: 100%;
  height: auto;
  clip-path: inset(6.5% 13.5% 6.5% 16% round 10% / 5.9%);
}

/* Below 1180px the captures would cover the copy: centred column only. */
@media (max-width: 1179px) {
  .lx-hero__side {
    display: none;
  }
}

@media (max-width: 640px) {
  .lx-hero__center {
    gap: 1.5rem;
  }
}
</style>
