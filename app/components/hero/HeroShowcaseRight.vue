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

      <div class="lx-hero__side" :class="{ 'has-phone': phone }">
        <ShotFrame ratio="auto" bare>
          <img
            v-for="(shot, i) in images"
            :key="shot.src"
            :src="shot.src"
            :alt="i === current ? shot.alt : ''"
            :aria-hidden="i !== current"
            :loading="i === 0 ? 'eager' : 'lazy'"
            decoding="async"
            class="lx-hero__slide"
            :class="{ 'is-active': i === current }"
          />
        </ShotFrame>
        <span v-if="phone" class="lx-hero__phone">
          <img
            src="/home/photoreka_mobile_halo.png"
            alt="Photoreka mobile app"
            loading="eager"
          />
        </span>
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

const props = defineProps({
  /** Phone capture hanging off the bottom-left corner of the capture. */
  phone: { type: Boolean, default: false },
  /** Captures shown in turn; the first one sets the frame's size. */
  images: {
    type: Array,
    default: () => [
      {
        src: "/canvas/chatlab_2.png",
        alt: "AI photo portfolio built with Photoreka",
      },
      // {
      //   src: "/home/portfolio_desktop_4.jpg",
      //   alt: "Photoreka AI photo curation and organizer dashboard",
      // },
      // {
      //   src: "/home/tag_cloud_poster_detailed.jpg",
      //   alt: "AI-generated photo tag cloud in 2D semantic space",
      // },
    ],
  },
  interval: { type: Number, default: 5000 },
});

const current = ref(0);
let timer = null;

onMounted(() => {
  if (props.images.length < 2) return;
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.images.length;
  }, props.interval);
});

onBeforeUnmount(() => clearInterval(timer));

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

.lx-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 570px) minmax(0, 1fr);
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

.lx-hero__side {
  position: relative;
  perspective: 1800px;
}

/* The capture turns slightly towards the copy. On load it slides in from
   the right, turned much further, and closes onto that angle; the phone
   rises once it has landed. */
.lx-hero__side .lx-shot {
  transform-origin: 0% 50%;
  transform: rotateY(-10deg);
  animation: lx-side-in 1.6s 0.25s var(--lx-ease) both;
}

@keyframes lx-side-in {
  from {
    opacity: 0;
    transform: translateX(38%) rotateY(-42deg);
  }
}

/* The first capture stays in flow and sizes the frame; the rest sit on top
   of it and cross-fade in. */
.lx-hero__slide {
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 1.2s var(--lx-ease),
    transform 1.6s var(--lx-ease);
}

.lx-hero__slide + .lx-hero__slide {
  position: absolute;
  inset: 0;
}

.lx-hero__slide.is-active {
  opacity: 1;
  transform: none;
}

/* Phone over the bottom-left corner of the capture. As in the product
   stage, clip-path trims the halo baked into the asset and the wrapper
   casts the shadow. */
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

@keyframes lx-side-up {
  from {
    opacity: 0;
    transform: translateY(40px);
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

  .lx-hero__slide {
    transform: none;
    transition: opacity 0.4s linear;
  }
}

/* Single column: the capture goes under the copy, facing front, with
   room below for the hanging phone when there is one. */
@media (max-width: 1023px) {
  .lx-hero__layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  .lx-hero__side {
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
  }

  .lx-hero__side.has-phone {
    margin-bottom: 14%;
  }

  .lx-hero__side .lx-shot {
    transform: none;
    animation-name: lx-side-up;
  }

  .lx-hero__phone {
    left: auto;
    right: -2%;
  }
}

@media (max-width: 640px) {
  .lx-hero__center {
    gap: 1.5rem;
  }
}
</style>
