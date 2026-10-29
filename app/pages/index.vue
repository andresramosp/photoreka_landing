<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <!-- lx-numbered: section numbers follow the order of this stack. -->
      <div
        class="lx-page lx-home lx-numbered"
        :style="{ '--announcement-height': announcementHeight + 'px' }"
      >
        <HomeAnnouncement
          @signup="goToAuth('signup')"
          @height="announcementHeight = $event"
        />
        <HomeNav @login="goToAuth('login')" />
        <HomeHero @signup="goToAuth('signup')" />

        <HomeOverview />
        <HomeCanvas />
        <HomeSearch />
        <HomeFeatures />
        <PicksPromo id="picks" source="home" immersive />
        <HomeSources />
        <!-- <HomeLightroom @signup="goToAuth('signup')" /> -->
        <HomePricing @signup="goToAuth('signup')" />
        <HomeFaq @signup="goToAuth('signup')" />
      </div>

      <RequestAccessDialog v-model:show="showRequestDialog" />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("home");

// Inyectar script inline para prevenir FOUC
useHead({
  script: [
    {
      children: `(function(){try{const t=localStorage.getItem('photoreka-theme-mode')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
      tagPosition: "head",
      type: "text/javascript",
    },
  ],
});

const {
  naiveTheme: currentTheme,
  naiveThemeOverrides: themeOverrides,
  initTheme,
} = useTheme();

// Scroll suave (Lenis) mientras la página está montada
const smoothScroll = useSmoothScroll();

const showRequestDialog = ref(false);
const announcementHeight = ref(0);

const config = useRuntimeConfig();
const { isOpenMode } = useRegistrationMode();

const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_page_premium", mode);
  if (mode === "signup") {
    if (isOpenMode.value) {
      window.open(`${config.public.appUrl}/auth`, "_blank");
    } else {
      showRequestDialog.value = true;
    }
  } else {
    window.location.assign(`${config.public.appUrl}/auth?mode=${mode}`);
  }
};

onMounted(() => {
  // Inicializar tema completo (el plugin ya aplicó las variables básicas)
  initTheme();
  smoothScroll.enable();
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>
