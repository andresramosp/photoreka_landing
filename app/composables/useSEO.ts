import { seoConfig, type SEOPageKey, type SEOPage } from "~/config/seo";

/**
 * Composable para manejar SEO de forma consistente en toda la aplicación
 * Usa la configuración centralizada de ~/config/seo.ts
 */
export function useSEO(pageKey?: SEOPageKey, customConfig?: Partial<SEOPage>) {
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  // Obtener configuración de la página o usar personalizada
  const pageConfig = pageKey ? seoConfig.pages[pageKey] : ({} as SEOPage);

  // Combinar configuración de página con personalización
  const config = {
    ...pageConfig,
    ...customConfig,
  };

  // Construir URL canónica
  const canonicalUrl =
    config.canonicalUrl ||
    `${seoConfig.siteUrl}${route.path === "/" ? "" : route.path}`;

  // Construir imagen OG completa
  const ogImage = config.ogImage
    ? config.ogImage.startsWith("http")
      ? config.ogImage
      : `${seoConfig.siteUrl}${config.ogImage}`
    : `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`;

  const twitterImage = config.ogImage
    ? config.ogImage.startsWith("http")
      ? config.ogImage
      : `${seoConfig.siteUrl}${config.ogImage}`
    : `${seoConfig.siteUrl}${seoConfig.defaultTwitterImage}`;

  // Configurar meta tags
  const headConfig: any = {
    title: config.title || seoConfig.siteName,
    meta: [
      // Meta tags básicos
      {
        name: "description",
        content: config.description || "",
      },
      ...(config.keywords
        ? [
            {
              name: "keywords",
              content: config.keywords,
            },
          ]
        : []),

      // Open Graph
      {
        property: "og:site_name",
        content: seoConfig.siteName,
      },
      {
        property: "og:title",
        content: config.title || seoConfig.siteName,
      },
      {
        property: "og:description",
        content: config.description || "",
      },
      {
        property: "og:type",
        content: config.ogType || "website",
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        property: "og:image",
        content: ogImage,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:locale",
        content: seoConfig.defaultLocale,
      },

      // Twitter Card
      {
        name: "twitter:card",
        content: config.twitterCard || "summary_large_image",
      },
      {
        name: "twitter:site",
        content: seoConfig.social.twitter,
      },
      {
        name: "twitter:title",
        content: config.title || seoConfig.siteName,
      },
      {
        name: "twitter:description",
        content: config.description || "",
      },
      {
        name: "twitter:image",
        content: twitterImage,
      },

      // Adicionales para mejorar SEO
      {
        name: "robots",
        content: "index, follow, max-image-preview:large",
      },
      {
        name: "author",
        content: seoConfig.siteName,
      },
      {
        name: "theme-color",
        content: "#1a1a1a",
      },
    ],
    link: [
      // Canonical URL
      {
        rel: "canonical",
        href: canonicalUrl,
      },
      // Preconnect para performance
      {
        rel: "preconnect",
        href: seoConfig.siteUrl,
      },
    ],
  };

  // Agregar JSON-LD si existe
  if (config.jsonLd) {
    headConfig.script = [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(config.jsonLd),
      },
    ];
  }

  useHead(headConfig);

  // Configurar título del sitio
  useSeoMeta({
    title: config.title || seoConfig.siteName,
    ogTitle: config.title || seoConfig.siteName,
    description: config.description || "",
    ogDescription: config.description || "",
    ogImage: ogImage,
    twitterCard: (config.twitterCard || "summary_large_image") as any,
    twitterImage: twitterImage,
  });

  return {
    config,
    canonicalUrl,
    ogImage,
  };
}
