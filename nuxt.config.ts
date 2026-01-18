import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["nuxtjs-naive-ui", "@nuxtjs/color-mode"],
  css: ["~/assets/global.scss"],

  // Configuración SSR para SEO óptimo
  ssr: true,

  runtimeConfig: {
    public: {
      mainApiBaseUrl:
        import.meta.env.VITE_MAIN_API_BASE_URL || "http://localhost:3333",
      gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "G-WK7N5SVNVD",
      appUrl: import.meta.env.VITE_APP_URL || "https://app.photoreka.com",
      siteUrl: import.meta.env.VITE_SITE_URL || "https://www.photoreka.com",
    },
  },

  colorMode: {
    preference: "dark",
    fallback: "dark",
    dataValue: "theme",
    storageKey: "photoreka-theme-mode",
    classSuffix: "",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        prefix: "og: https://ogp.me/ns#",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "color-scheme", content: "dark light" },
        {
          name: "format-detection",
          content: "telephone=no, date=no, email=no, address=no",
        },
        // Meta tags base - se sobrescriben por página
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "preload",
          href: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap",
          as: "style",
        },
        // Favicon
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
    },
  },

  build: {
    transpile: [
      "vueuc",
      "naive-ui",
      "@css-render/vue3-ssr",
      "@juggle/resize-observer",
    ],
  },

  experimental: {
    payloadExtraction: false,
  },

  // Configuración de generación para SEO
  routeRules: {
    "/": { prerender: true },
    "/terms": { prerender: true },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/terms"],
    },
  },

  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    optimizeDeps: {
      include: ["vueuc", "naive-ui"],
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "naive-ui": ["naive-ui"],
            icons: ["@vicons/ionicons5", "@vicons/carbon", "@vicons/fluent"],
          },
        },
      },
    },
  },
});
