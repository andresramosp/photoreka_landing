<template>
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
