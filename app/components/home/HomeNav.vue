<template>
  <LandingNav :links="links" @navigate="onNavigate">
    <template #actions>
      <button
        v-if="canToggleTheme(true)"
        class="lx-icon-btn"
        aria-label="Toggle theme"
        @click="toggleTheme"
      >
        <n-icon size="18">
          <component :is="themeMode === 'dark' ? SunnyOutline : MoonOutline" />
        </n-icon>
      </button>
      <LxButton variant="ghost" size="sm" @click="emit('login')">
        Sign in
      </LxButton>
    </template>
  </LandingNav>
</template>

<script setup>
import { SunnyOutline, MoonOutline } from "@vicons/ionicons5";
import { trackUserAction } from "~/utils/analytics";

const emit = defineEmits(["login"]);

const { themeMode, toggleTheme, canToggleTheme } = useTheme();

// Secciones que aparecen en la barra de navegación (target = id de sección)
const links = [
  { label: "Overview", target: "overview" },
  { label: "Sources", target: "sources" },
  { label: "Tools", target: "features" },
  { label: "Picks", target: "picks" },
  { label: "Pricing", target: "pricing" },
  { label: "FAQ", target: "faq" },
];

// Pricing conserva su evento de siempre.
const onNavigate = (target) => {
  if (target === "pricing") {
    trackUserAction("navigate_to_pricing", "landing_page_premium");
  } else {
    trackUserAction("navigate_to_section", "landing_page_premium", target);
  }
};
</script>
