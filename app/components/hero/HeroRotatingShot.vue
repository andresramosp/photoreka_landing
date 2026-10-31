<template>
  <div class="lx-rshot" :class="{ 'has-phone': phone }">
    <ShotFrame ratio="auto" bare>
      <img
        v-for="(shot, i) in images"
        :key="shot.src"
        :src="shot.src"
        :alt="i === current ? shot.alt : ''"
        :aria-hidden="i !== current"
        :loading="i === 0 ? 'eager' : 'lazy'"
        decoding="async"
        class="lx-rshot__slide"
        :class="{
          'is-active': i === current,
          'is-leaving': i === previous,
        }"
      />
    </ShotFrame>
    <span v-if="phone" class="lx-rshot__phone">
      <img
        src="/home/photoreka_mobile_halo.png"
        alt="Photoreka mobile app"
        loading="eager"
      />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  /** Phone capture hanging off the bottom-left corner of the capture. */
  phone: { type: Boolean, default: false },
  /** Captures shown in turn; the first one sets the frame's size. */
  images: {
    type: Array,
    default: () => [
      {
        src: "/canvas/chatlab_2.png",
        alt: "Photoreka infinite canvas with an AI chat docked to the board",
      },
      {
        src: "/home/hero_dashboard.jpg",
        alt: "Photoreka dashboard: world map, scores, genres and photographic patterns of a library",
      },
      {
        src: "/home/hero_portfolio.jpg",
        alt: "AI photo portfolio built with Photoreka",
      },
    ],
  },
  interval: { type: Number, default: 3500 },
});

const current = ref(0);
const previous = ref(-1);
let timer = null;

onMounted(() => {
  if (props.images.length < 2) return;
  timer = setInterval(() => {
    previous.value = current.value;
    current.value = (current.value + 1) % props.images.length;
  }, props.interval);
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
.lx-rshot {
  position: relative;
  perspective: 1800px;
}

/* The capture turns slightly towards the copy. On load it slides in from
   the right, turned much further, and closes onto that angle; the phone
   rises once it has landed. */
.lx-rshot :deep(.lx-shot) {
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
   of it. The incoming one drifts in from the right out of a soft blur while
   the outgoing one sinks back, so the change reads as one movement. */
.lx-rshot__slide {
  opacity: 0;
  filter: blur(8px);
  transform: translate3d(3%, 0, 0) scale(1.06);
  transition:
    opacity 1.1s var(--lx-ease),
    filter 1.1s var(--lx-ease),
    transform 1.8s var(--lx-ease);
}

.lx-rshot__slide + .lx-rshot__slide {
  position: absolute;
  inset: 0;
}

.lx-rshot__slide.is-active {
  z-index: 1;
  opacity: 1;
  filter: none;
  transform: none;
}

.lx-rshot__slide.is-leaving {
  opacity: 0;
  filter: blur(4px);
  transform: translate3d(-2%, 0, 0) scale(0.97);
}

/* Phone over the bottom-left corner of the capture. As in the product
   stage, clip-path trims the halo baked into the asset and the wrapper
   casts the shadow. */
.lx-rshot__phone {
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

.lx-rshot__phone img {
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

/* Single column: the capture goes under the copy, facing front, with
   room below for the hanging phone when there is one. */
@media (max-width: 1023px) {
  .lx-rshot {
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
  }

  .lx-rshot.has-phone {
    margin-bottom: 14%;
  }

  .lx-rshot :deep(.lx-shot) {
    transform: none;
    animation-name: lx-side-up;
  }

  .lx-rshot__phone {
    left: auto;
    right: -2%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lx-rshot :deep(.lx-shot),
  .lx-rshot__phone {
    animation: none;
  }

  .lx-rshot__slide,
  .lx-rshot__slide.is-leaving {
    filter: none;
    transform: none;
    transition: opacity 0.6s ease;
  }
}
</style>
