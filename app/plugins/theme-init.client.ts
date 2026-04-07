import { defineNuxtPlugin } from "nuxt/app";
import { getThemeCSSVariables } from "@/config/theme.js";

/**
 * Plugin para inicializar el tema ANTES del montaje
 * Previene FOUC al aplicar el tema inmediatamente
 */
export default defineNuxtPlugin({
  name: "theme-init",
  enforce: "pre",
  setup() {
    if (process.client) {
      const colorMode = useColorMode();
      const isDark = (colorMode.value || "dark") === "dark";

      // Establecer atributo data-theme
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light",
      );

      // Inyectar CSS variables
      const cssVars = getThemeCSSVariables(isDark);
      Object.entries(cssVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
      });

      // Watch para cambios de tema
      watch(
        () => colorMode.value,
        (newTheme) => {
          const isDarkNew = newTheme === "dark";
          document.documentElement.setAttribute(
            "data-theme",
            isDarkNew ? "dark" : "light",
          );

          const newCssVars = getThemeCSSVariables(isDarkNew);
          Object.entries(newCssVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value as string);
          });
        },
      );
    }
  },
});
