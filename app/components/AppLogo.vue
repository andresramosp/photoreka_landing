<template>
  <div class="photoreka-logo">
    <img
      :src="logoSrc"
      alt="Photoreka"
      class="logo-image"
      :class="[`logo-size-${size}`, `logo-layout-${layout}`]"
      :style="logoStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "~/composables/useTheme.js";

type LogoLayout = "horizontal" | "vertical" | "icon";

interface Props {
  size?: "normal" | "large" | "small" | "tiny";
  height?: number; // altura en px, prevalece sobre size
  layout?: LogoLayout; // horizontal, vertical o solo icono
  withClaim?: boolean; // incluir el claim/tagline
}

const props = withDefaults(defineProps<Props>(), {
  size: "normal",
  layout: "vertical",
  withClaim: false,
});

// Obtener el tema internamente
const { themeMode } = useTheme();

// Computed style que incluye CSS custom property para media queries
const logoStyle = computed(() => {
  if (props.height) {
    return {
      "--logo-height-desktop": `${props.height}px`,
    };
  }
  return {};
});

// Mapa de logos según layout y themeMode (usando rutas públicas)
const logoMap = {
  icon: {
    dark: "/logos/marca/icon-dark.png",
    light: "/logos/marca/icon-light.png",
  },
  horizontal: {
    dark: {
      withClaim: "/logos/marca/horizontal-claim-dark.png",
      noClaim: "/logos/marca/horizontal-dark.png",
    },
    light: {
      withClaim: "/logos/marca/horizontal-claim-light.png",
      noClaim: "/logos/marca/horizontal-light.png",
    },
  },
  vertical: {
    dark: {
      withClaim: "/logos/marca/vertical-claim-dark.png",
      noClaim: "/logos/marca/vertical-dark.png",
    },
    light: {
      withClaim: "/logos/marca/vertical-claim-light.png",
      noClaim: "/logos/marca/vertical-light.png",
    },
  },
};

const logoSrc = computed(() => {
  const variant = themeMode.value as "dark" | "light";

  if (props.layout === "icon") {
    return logoMap.icon[variant];
  }

  const layoutLogos = logoMap[props.layout];
  const variantLogos = layoutLogos[variant];
  return props.withClaim ? variantLogos.withClaim : variantLogos.noClaim;
});
</script>

<script lang="ts">
export default {
  name: "AppLogo",
};
</script>

<style scoped>
.photoreka-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.logo-image {
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  /* Usar CSS custom property que se ajusta automáticamente en mobile */
  height: var(--logo-height-desktop, auto);
  /* transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.3)); */
}

/* ============================
   LAYOUT DEFAULTS
   Solo aplican cuando NO hay size específico
   ============================ */

/* Vertical layout: uses size as-is (no override) */

/* Horizontal layout: tamaño por defecto para navbars */
.logo-layout-horizontal:not([class*="logo-size-"]) {
  --logo-height-desktop: 45px;
}

/* Icon only: tamaño por defecto para iconos */
.logo-layout-icon:not([class*="logo-size-"]) {
  --logo-height-desktop: 50px;
}

/* ============================
   SIZE SYSTEM (prevalece sobre layout)
   Predefined heights for size prop
   ============================ */

.logo-size-tiny {
  --logo-height-desktop: 30px;
}

.logo-size-small {
  --logo-height-desktop: 55px;
}

.logo-size-normal {
  --logo-height-desktop: 130px;
}

.logo-size-large {
  --logo-height-desktop: 180px;
}

/* ============================
   MOBILE RESPONSIVE
   All sizes capped on mobile - usando CSS, no JavaScript
   ============================ */
@media (max-width: 768px) {
  .logo-image {
    height: 35px !important;
  }

  .logo-size-tiny .logo-image {
    height: 25px !important;
  }
}
</style>
