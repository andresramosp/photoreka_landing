import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["nuxtjs-naive-ui", "@nuxtjs/color-mode"],
  css: ["~/assets/global.scss"],

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
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "color-scheme", content: "dark light" },
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

  nitro: {
    compressPublicAssets: true,
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
