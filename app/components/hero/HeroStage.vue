<template>
  <div
    v-scroll-progress="{
      mode: 'scroll',
      distance: 0.45,
      disableBelow: 760,
    }"
    class="lx-hero__stage"
  >
    <!-- Product stage: three static captures (see heroStage).
         Tilted back at load, the whole set straightens as you scroll. -->
    <div class="lx-container">
      <div v-reveal="{ variant: 'scale', delay: 380 }" class="lx-stage">
        <div class="lx-stage__scene">
          <div
            class="lx-stage__deck"
            :class="{ 'is-turning': heroStageTurning }"
          >
            <div
              v-for="(shot, index) in heroStage"
              :key="shot.src"
              class="lx-stage__slot"
              :class="`is-${heroStagePosition(index)}`"
            >
              <ShotFrame
                :src="shot.src"
                :alt="shot.alt"
                :label="shot.label"
                ratio="auto"
                loading="eager"
              />
              <span
                class="lx-stage__phone"
                :aria-hidden="heroStagePosition(index) !== 'center'"
              >
                <img
                  :src="heroStagePhone"
                  alt="Photoreka mobile app"
                  loading="eager"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ── Escenario del hero ─────────────────────────────────────────
// Tres capturas que rotan entre las posiciones `center` (delante) y `left` /
// `right` (detrás, más pequeñas y atenuadas); en móvil solo se ve `center`.
// La primera del array empieza en el centro.
//
// Cada marco adopta la proporción de su captura, así que se ven enteras sin
// recorte. Tamaños y posiciones de cada hueco viven en el CSS
// (.lx-stage__slot.is-*).
//
// `heroStagePhone`: captura móvil adosada a la esquina inferior derecha de
// la captura que esté en el centro. El CSS recorta el halo de
// photoreka_mobile_halo.png, así que otra imagen con distinto encuadre
// necesitaría ajustar el clip-path de .lx-stage__phone img.
const heroStage = [
  {
    src: "/canvas/chatlab_2.png",
    label: "Photoreka — Portfolio",
    alt: "AI photo portfolio built with Photoreka",
  },
  {
    src: "/home/portfolio_desktop_4.jpg",
    label: "Photoreka — Dashboard",
    alt: "Photoreka AI photo curation and organizer dashboard",
  },
  {
    src: "/home/tag_cloud_poster_detailed.jpg",
    label: "Photoreka — Tag Cloud",
    alt: "AI-generated photo tag cloud in 2D semantic space",
  },
];

const heroStagePhone = "/home/photoreka_mobile_halo.png";

// Cada turno: derecha → centro, centro → izquierda, izquierda → derecha.
const HERO_STAGE_POSITIONS = ["center", "left", "right"];
// Milisegundos entre cambios; 0 deja las capturas fijas.
const HERO_STAGE_INTERVAL = 0;
const HERO_STAGE_TRANSITION = 1100;
const heroStageTurn = ref(0);
const heroStageTurning = ref(false);
const heroStagePosition = (index) =>
  HERO_STAGE_POSITIONS[
    (index + heroStageTurn.value) % HERO_STAGE_POSITIONS.length
  ];

let heroStageTimer = null;
let heroStageTurningTimer = null;

// La transición solo se activa durante el cambio para que el resto del
// tiempo las capturas sigan al scroll sin retraso.
const advanceHeroStage = () => {
  heroStageTurning.value = true;
  heroStageTurn.value += 1;
  clearTimeout(heroStageTurningTimer);
  heroStageTurningTimer = setTimeout(() => {
    heroStageTurning.value = false;
  }, HERO_STAGE_TRANSITION);
};

onMounted(() => {
  if (
    HERO_STAGE_INTERVAL > 0 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    heroStageTimer = setInterval(advanceHeroStage, HERO_STAGE_INTERVAL);
  }
});

onBeforeUnmount(() => {
  clearInterval(heroStageTimer);
  clearTimeout(heroStageTurningTimer);
});
</script>

<style scoped>
/* ── Hero stage ─────────────────────────────────────────────────
   .lx-stage__deck follows the scroll (--p, 0..1 over the first ~45% of a
   viewport): the whole set leans back at load and stands upright. The
   three captures share one grid cell and are placed with transforms. */
.lx-hero__stage {
  margin-top: clamp(32px, 5svh, 64px);
}

.lx-stage {
  position: relative;
}

.lx-stage__scene {
  position: relative;
  perspective: 2200px;
  perspective-origin: 50% 0%;
  padding-bottom: 6%;
}

.lx-stage__scene::before {
  content: "";
  position: absolute;
  inset: 6% 0 -4%;
  pointer-events: none;
  background: radial-gradient(closest-side, var(--lx-glow-1), transparent);
  filter: blur(30px);
}

.lx-stage__deck {
  /* Extra side offset on wide screens, pulled in a little on narrow ones
     so the side captures don't fall off the viewport. */
  --lx-stage-spread: clamp(-64px, calc((100vw - 1440px) * 0.3), 140px);
  position: relative;
  display: grid;
  width: min(74%, 940px);
  margin-inline: auto;
  transform-origin: 50% 0%;
  transform: rotateX(calc((1 - var(--p, 1)) * 20deg))
    scale(calc(0.92 + var(--p, 1) * 0.08));
  will-change: transform;
}

.lx-stage__slot {
  grid-area: 1 / 1;
  align-self: start;
  position: relative;
  z-index: 1;
}

.lx-stage__slot.is-center {
  z-index: 3;
  transform: none;
}

/* The capture wrapping from left to right passes behind the other two. */
.lx-stage__slot.is-right {
  z-index: 0;
}

.lx-stage__deck.is-turning .lx-stage__slot {
  transition: transform 1.1s cubic-bezier(0.65, 0, 0.35, 1);
}

.lx-stage__deck.is-turning .lx-stage__slot::after {
  transition: opacity 1.1s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Side captures fan out like an open hand of cards (tops leaning outward)
   and close as --p reaches 1. */
.lx-stage__slot.is-left,
.lx-stage__slot.is-right {
  --lx-stage-fan: calc((1 - var(--p, 1)) * 6deg);
}

.lx-stage__slot.is-right {
  transform: translate3d(calc(42% + var(--lx-stage-spread)), 7%, 0) scale(0.68)
    rotate(var(--lx-stage-fan));
}

.lx-stage__slot.is-left {
  transform: translate3d(calc(-42% - var(--lx-stage-spread)), 7%, 0) scale(0.68)
    rotate(calc(var(--lx-stage-fan) * -1));
}

/* A veil of the page colour dims the captures while the stage is tilted
   (--p < 1) and lifts as it straightens; the side ones keep part of it. */
.lx-stage__slot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--lx-radius);
  background: var(--lx-bg);
  opacity: calc((1 - var(--p, 1)) * 0.5);
  pointer-events: none;
}

.lx-stage__slot.is-left::after,
.lx-stage__slot.is-right::after {
  opacity: calc(0.45 + (1 - var(--p, 1)) * 0.3);
}

/* Optional phone hanging off the capture's bottom-right corner; it rises
   slightly as the stage straightens on scroll.
   The asset has a cyan halo baked in; clip-path trims the image to the
   phone body (insets measured on photoreka_mobile_halo.png) and the
   wrapper adds a neutral shadow, which a clipped element can't cast. */
.lx-stage__phone {
  position: absolute;
  z-index: 5;
  right: -4.5%;
  bottom: -13%;
  width: 21%;
  pointer-events: none;
  filter: brightness(calc(1 - (1 - var(--p, 1)) * 0.5))
    drop-shadow(0 28px 40px rgba(0, 0, 0, 0.6))
    drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
  transform: translate3d(0, calc((1 - var(--p, 1)) * 14%), 0);
  will-change: transform;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lx-stage__slot.is-center .lx-stage__phone {
  opacity: 1;
  transition-delay: 0.6s;
}

.lx-stage__phone img {
  display: block;
  width: 100%;
  height: auto;
  clip-path: inset(6.5% 13.5% 6.5% 16% round 10% / 5.9%);
}

@media (max-width: 760px) {
  /* No room for the sides on phones: only the centre capture shows. */
  .lx-stage__deck {
    width: 100%;
  }

  .lx-stage__slot.is-left,
  .lx-stage__slot.is-right {
    display: none;
  }

  .lx-stage__phone {
    right: -2%;
    bottom: -10%;
    width: 30%;
  }
}
</style>
