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
        "Photoreka is a Photo Management and Curation Lab. See how your images relate to each other, search in natural language, create meaningful sequences, rank your photos by aesthetic scores and navigate your catalog in 3D.",
      keywords:
        "photography, photo framer, photo curation, photo organization, photography portfolio, image cataloging, AI photography, photo management, visual archive, photography workflow, image search, culling, sequence creation",
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
          "Free Photo Framer tool",
          "Free Canvas Photo Tool",
          "Frame photos in batches",
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

    framer: {
      title:
        "Free Batch Photo Framer - Frame Hundreds of Photos Instantly | Photoreka",
      description:
        "Tired of framing photos one by one? Free Framer lets you add professional borders to unlimited photos at once. Batch processing with no limits, no watermarks, no account needed. The only free tool that truly handles bulk photo framing.",
      keywords:
        "batch photo framer, bulk photo framing, frame multiple photos, photo borders batch, frame photos in bulk, unlimited photo framing, batch photo borders, free bulk photo tool, frame hundreds of photos, batch photography tools, mass photo framing, photo frame online free unlimited, batch image frames, bulk photo processing free",
      ogImage: "/home/free_framer.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Free Framer",
        description:
          "Add professional frames and borders to your photos instantly. Free tool to create stunning framed photos for social media, portfolios, and presentations.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "Photoreka",
          url: "https://www.photoreka.com",
        },
        featureList: [
          "Unlimited batch processing",
          "Frame hundreds of photos at once",
          "No limits on quantity",
          "Multiple frame styles",
          "Custom colors",
          "High quality export",
          "No account required",
          "No watermarks",
          "Completely free",
          "Instant preview",
          "JPEG and PNG support",
        ],
      },
    },

    lightroom_plugin: {
      title:
        "Lightroom Classic Plugin - AI Search, 3D Catalog & Sync | Photoreka",
      description:
        "Transform your Lightroom Classic workflow with Photoreka's official plugin. Search your catalog in natural language, explore your photos in 3D space, analyze with AI, and sync seamlessly. See your entire catalog as a navigable universe. Free with Photoreka account.",
      keywords:
        "lightroom plugin, lightroom classic plugin, AI photo search, 3D photo navigation, 3D catalog view, semantic photo search, lightroom catalog sync, natural language photo search, lightroom integration, photo analysis AI, lightroom workflow, adobe lightroom plugin, smart photo organization, AI photography tools, lightroom catalog search, photo metadata analysis, navigate photos in 3D, view catalog as whole, photo clustering, visual similarity, 3D photo atlas",
      ogImage: "/home/video_lr_poster.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Photoreka Lightroom Classic Plugin",
        description:
          "Official Lightroom Classic plugin that brings AI-powered semantic search and intelligent photo analysis directly to your workflow.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Windows, macOS",
        softwareRequirements: "Adobe Lightroom Classic",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "USD",
          description: "Free with Photoreka account",
        },
        creator: {
          "@type": "Organization",
          name: "Photoreka",
          url: "https://www.photoreka.com",
        },
        featureList: [
          "Natural language search",
          "3D catalog exploration and navigation",
          "View entire catalog as navigable 3D universe",
          "Visual similarity clustering in 3D space",
          "Culling photos with AI",
          "Direct catalog sync",
          "AI-powered photo analysis",
          "One-click photo transfer",
          "Launch 3D Atlas from Lightroom",
          "Seamless Lightroom integration",
          "Privacy-first design",
          "Local photo processing",
          "Automatic metadata sync",
          "Compatible with Photoreka web platform",
          "Works with existing Lightroom structure",
        ],
      },
    },

    photo_3d_atlas: {
      title: "3D Photo Atlas - Navigate Your Catalog as a Universe | Photoreka",
      description:
        "Experience your photographic body of work in stunning 3D space. Photoreka's 3D Atlas automatically clusters photos by visual similarity, revealing patterns and connections. Navigate contextually, narratively, or aesthetically to see your catalog as a cohesive whole.",
      keywords:
        "3D photo atlas, 3D catalog navigation, photo visualization, 3D photo gallery, visual similarity clustering, photo archive navigation, immersive photo exploration, 3D photo space, catalog clustering, photographic patterns, photo relationships, navigate photos 3D, photo body of work, visual archive 3D, photo universe, AI photo clustering, contextual photo navigation, narrative photo view, aesthetic photo grouping, photo sequence building",
      ogImage: "/home/video_lr_poster.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka 3D Atlas",
        description:
          "Revolutionary 3D visualization tool that displays your entire photo catalog in immersive 3D space, automatically clustered by visual similarity.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "USD",
          description: "Included with Photoreka",
        },
        creator: {
          "@type": "Organization",
          name: "Photoreka",
          url: "https://www.photoreka.com",
        },
        featureList: [
          "Immersive 3D navigation",
          "Automatic visual similarity clustering",
          "Multi-dimensional navigation modes",
          "Contextual, narrative, and aesthetic views",
          "Pattern and relationship discovery",
          "Sequence building in 3D space",
          "Real-time performance with large catalogs",
          "Export and share discoveries",
          "Navigate thousands of photos smoothly",
          "Reveal hidden photographic patterns",
          "Understand catalog as cohesive whole",
        ],
      },
    },
  },
};

export type SEOPageKey = keyof typeof seoConfig.pages;
