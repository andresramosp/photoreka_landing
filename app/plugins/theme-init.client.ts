import { defineNuxtPlugin } from "nuxt/app";

/**
 * Plugin para inicializar el tema ANTES del montaje
 * Previene FOUC al aplicar el tema inmediatamente
 */
export default defineNuxtPlugin({
  name: "theme-init",
  enforce: "pre",
  setup() {
    // @nuxtjs/color-mode ya m
    // aneja esto, solo aseguramos que esté sincronizado
    if (process.client) {
      const colorMode = useColorMode();
      // Forzar actualización inmediata
      const theme = colorMode.value || "dark";
      document.documentElement.setAttribute("data-theme", theme);
    }
  },
});
