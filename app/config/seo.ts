/**
 * Configuración SEO centralizada para Photoreka
 * Edita este archivo para cambiar meta tags, Open Graph, y Twitter Cards
 */

export interface SEOPage {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  jsonLd?: any;
}

export const seoConfig = {
  // Configuración global del sitio
  siteName: "Photoreka",
  siteUrl: "https://www.photoreka.com",
  defaultLocale: "en",

  // Imágenes por defecto para Open Graph
  defaultOgImage: "/logos/marca/vertical-claim-light.png",
  defaultTwitterImage: "/logos/marca/vertical-claim-light.png",

  // Redes sociales
  social: {
    twitter: "@photoreka",
    facebook: "photoreka",
    instagram: "@photoreka",
  },

  // Configuración por página
  pages: {
    home: {
      title: "Photoreka - Curation Lab for Photographers",
      description:
        "Photoreka is a Photo Management and Curation Lab. See how your images relate to each other, search in natural language, create meaningful sequences, and explore your catalog in 3D.",
      keywords:
        "photography, photo curation, photo organization, photography portfolio, image cataloging, AI photography, photo management, visual archive, photography workflow, image search, culling, sequence creation",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka",
        description:
          "A Curation Lab for photographers to organize, curate, and explore their photographic body of work with AI-powered tools.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/PreOrder",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "Photoreka",
          url: "https://www.photoreka.com",
        },
        featureList: [
          "Natural language search",
          "3D catalog exploration",
          "AI-powered curation",
          "Sequence creation",
          "Visual similarity detection",
        ],
      },
    },

    terms: {
      title: "Terms of Use and Image Policy - Photoreka",
      description:
        "Read Photoreka's Terms of Use and Image Policy. We respect your copyright - you retain 100% ownership of all uploaded images. Learn about our commitment to privacy and security.",
      keywords:
        "terms of use, privacy policy, image rights, copyright, user agreement, terms and conditions",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms of Use - Photoreka",
        description: "Terms of Use and Image Policy for Photoreka",
      },
    },
  },
};

export type SEOPageKey = keyof typeof seoConfig.pages;
