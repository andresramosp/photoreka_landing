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
      <LxButton variant="ghost" size="sm" @click="goToLogin">Sign in</LxButton>
    </template>
  </LandingNav>
</template>

<script setup>
import { SunnyOutline, MoonOutline } from "@vicons/ionicons5";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  /** [{ label, target }] — target is the id of a section on the page. */
  links: { type: Array, default: () => [] },
  /** Page key used in analytics events, e.g. "ai_geo_inference_page". */
  source: { type: String, required: true },
});

const { themeMode, toggleTheme, canToggleTheme } = useTheme();
const config = useRuntimeConfig();

const onNavigate = (target) => {
  trackUserAction("navigate_to_section", props.source, target);
};

const goToLogin = () => {
  trackUserAction("navigate_to_auth", props.source, "login");
  window.location.assign(`${config.public.appUrl}/auth?mode=login`);
};
</script>
