<template>
  <div class="lx-fold">
    <component
      :is="HERO_VARIANTS[HERO_VARIANT]"
      @demo="goToDemo"
      @signup="emit('signup')"
      @commercial-demo="goToCommercialDemo"
    />

    <MarqueeStrip
      v-if="SHOW_FEATURES_STRIP"
      :items="features"
      :repeat="1"
      :duration="40"
    />
  </div>
</template>

<script setup>
import { provide } from "vue";
import HeroAtlas from "~/components/hero/HeroAtlas.vue";
import HeroSplit from "~/components/hero/HeroSplit.vue";
import HeroShowcase from "~/components/hero/HeroShowcase.vue";
import HeroShowcaseRight from "~/components/hero/HeroShowcaseRight.vue";
import HeroPrints from "~/components/hero/HeroPrints.vue";
import { trackUserAction } from "~/utils/analytics";

const emit = defineEmits(["signup"]);

// Variantes del hero (app/components/hero/). Cambia HERO_VARIANT para
// alternar entre ellas; todas emiten demo, signup y commercial-demo.
const HERO_VARIANTS = {
  atlas: HeroAtlas,
  split: HeroSplit,
  showcase: HeroShowcase,
  showcaseRight: HeroShowcaseRight,
  prints: HeroPrints,
};
const HERO_VARIANT = "showcaseRight";

// Franja de funcionalidades bajo el hero. Si está activa, la fila de géneros
// del hero queda fija para no tener dos cintas en movimiento a la vez.
const SHOW_FEATURES_STRIP = true;
provide("heroGenresStatic", SHOW_FEATURES_STRIP);

const features = [
  { label: "Natural-language search" },
  { label: "Chat Assistant" },
  { label: "Multi-score ranking" },
  { label: "2D/3D clustering" },
  { label: "Storyboarding" },
  { label: "AI Portfolio builder" },
  { label: "Style patterns" },
  { label: "AI Geo-Location" },
];

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo", "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "landing_page_premium", "commercial");
  window.open("https://app.photoreka.com/demo-commercial/workspace", "_blank");
};
</script>

<style scoped>
/* Desktop: hero and strip fill the first screen (up to 1100px tall), the
   strip on its bottom edge and the copy centred in the rest. When the copy
   does not fit, the block grows and the strip falls below the fold. */
@media (min-width: 1024px) {
  .lx-fold {
    display: flex;
    flex-direction: column;
    min-height: min(100svh, 1100px);
  }

  .lx-fold > :deep(.lx-hero) {
    --hero-top: clamp(104px, 12svh, 136px);
    --hero-bottom: clamp(32px, 4svh, 56px);
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* With auto side margins a flex item would shrink to its content. */
  .lx-fold > :deep(.lx-hero > *) {
    width: 100%;
  }
}
</style>
