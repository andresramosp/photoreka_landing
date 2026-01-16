/**
 * ==========================================================================
 * COMPOSABLE: useTheme
 * ==========================================================================
 *
 * Gestiona el tema de la aplicación usando @nuxtjs/color-mode.
 * Sincroniza automáticamente:
 * - Naive UI themeOverrides
 * - CSS variables via clases en html
 * - Persistencia automática
 */

import { computed } from "vue";
import { darkTheme as naiveUIDarkTheme } from "naive-ui";
import { getNaiveThemeOverrides } from "@/config/theme.js";

// ========================================================================
// CONFIGURACIÓN DE TEMA FORZADO
// ========================================================================
const FORCE_APP_THEME = null; // null | "dark" | "light"
const FORCE_LANDING_THEME = null; // null | "dark" | "light"

/**
 * Composable principal del tema - usa @nuxtjs/color-mode
 */
export function useTheme() {
  const colorMode = useColorMode();

  // Estado reactivo basado en colorMode
  const isDarkMode = computed(() => colorMode.value === "dark");

  const themeMode = computed({
    get: () => colorMode.value,
    set: (value) => {
      colorMode.preference = value;
    },
  });

  /**
   * Alterna entre dark y light
   */
  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  /**
   * Cambia el modo del tema
   */
  const setTheme = (dark) => {
    colorMode.preference = dark ? "dark" : "light";
  };

  /**
   * Inicializa el tema - ahora solo verifica temas forzados
   */
  const initTheme = () => {
    if (typeof window === "undefined") return;

    const isLanding =
      window.location.pathname === "/" ||
      window.location.pathname === "/landing" ||
      window.location.pathname.includes("/landing");

    const forcedTheme = isLanding ? FORCE_LANDING_THEME : FORCE_APP_THEME;
    if (forcedTheme !== null) {
      colorMode.preference = forcedTheme;
    }
  };

  // Computeds para Naive UI
  const naiveTheme = computed(() => {
    return isDarkMode.value ? naiveUIDarkTheme : null;
  });

  const naiveThemeOverrides = computed(() => {
    return getNaiveThemeOverrides(isDarkMode.value);
  });

  /**
   * Verifica si el toggle de tema debe estar visible
   */
  const canToggleTheme = (isLanding = false) => {
    const forcedTheme = isLanding ? FORCE_LANDING_THEME : FORCE_APP_THEME;
    return forcedTheme === null;
  };

  // No-op para compatibilidad
  const watchSystemPreference = () => {};

  return {
    // Estado
    isDarkMode,
    themeMode,

    // Para Naive UI
    naiveTheme,
    naiveThemeOverrides,

    // Métodos
    setTheme,
    toggleTheme,
    initTheme,
    watchSystemPreference,
    canToggleTheme,
  };
}

/**
 * Hook para inicializar el tema en el componente raíz
 */
export function useThemeInit() {
  const theme = useTheme();
  theme.initTheme();
  return theme;
}

/**
 * Acceso directo para componentes que solo necesitan leer el tema actual
 */
export function useThemeMode() {
  const colorMode = useColorMode();
  return {
    isDarkMode: computed(() => colorMode.value === "dark"),
    themeMode: computed(() => colorMode.value),
  };
}
