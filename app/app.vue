<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <NuxtPage />
      <FooterLanding />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
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

onMounted(() => {
  // Inicializar tema completo (el plugin ya aplicó las variables básicas)
  initTheme();
});
</script>

<style>
/* Los estilos globales están en assets/global.scss */
</style>
