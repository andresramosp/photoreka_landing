<template>
  <!-- Always light: the contest pages stand apart from the dark product pages. -->
  <div class="lx-page pc" :class="{ 'pc--site-dark': siteDark }" data-theme="light">
    <LandingNav :links="links">
      <template #actions>
        <slot name="nav-actions" />
      </template>
    </LandingNav>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  links: { type: Array, default: () => [] },
});

// The nav logo follows the site theme; on this light page the dark theme's
// logo would be light on light.
const { themeMode } = useTheme();
const mounted = ref(false);
const siteDark = computed(() => mounted.value && themeMode.value === "dark");

const smoothScroll = useSmoothScroll();

onMounted(() => {
  mounted.value = true;
  smoothScroll.enable();
});

onBeforeUnmount(() => smoothScroll.disable());
</script>

<style>
/* Warm gold accent on the light lx palette. --pc-gold-2 stays light: it is
   only used on top of photos. */
.lx-page.pc {
  --pc-gold: #e3a12b;
  --pc-gold-2: #ffd98a;
  --pc-gold-ink: #9a5f06;
  --pc-gold-grad: linear-gradient(135deg, #f7cf72 0%, #e3a12b 45%, #c27512 100%);
  --pc-brand-grad: linear-gradient(110deg, #e3a12b 0%, #c27512 100%);
  --pc-panel: #ffffff;
  --pc-tint: rgba(14, 14, 18, 0.035);
  --pc-sky: #0369a1;
  --lx-accent: #b26d0a;
  --lx-accent-2: #d4861c;
  --lx-accent-grad: linear-gradient(100deg, #c27512 0%, #9a5f06 100%);
  --lx-glow-1: rgba(227, 161, 43, 0.1);
  --lx-glow-2: rgba(227, 161, 43, 0.05);
}

.pc .lx-btn--primary .lx-btn__icon {
  color: #1a1206;
}

.pc--site-dark .lx-nav__brand {
  background: url("/logos/marca/horizontal-light.webp") left center / contain no-repeat;
}

.pc--site-dark .lx-nav__brand .photoreka-logo {
  visibility: hidden;
}

.pc .pc-nav-back {
  margin-right: 0.75rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-2);
}

/* Numerals set in the display serif, lined up like a scoreboard. */
.pc-num {
  font-family: var(--lx-font-display);
  font-variant-numeric: lining-nums tabular-nums;
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.pc-num--gold {
  background: var(--pc-gold-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.pc-kicker {
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.pc-panel {
  position: relative;
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--pc-panel);
  box-shadow: var(--lx-shadow-md), var(--lx-highlight);
}

@media (max-width: 1023px) {
  .pc .pc-nav-back {
    display: none;
  }
}
</style>
