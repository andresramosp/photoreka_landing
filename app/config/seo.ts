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
      title: "Photoreka | AI Photo Search & Curation Lab for Photographers",
      description:
        "Search your entire photo library in natural language—no tagging needed. Photoreka is an AI-powered photo curation platform: find any photo by describing it, explore your archive in interactive 3D, rank images by aesthetic scores, and create meaningful sequences. Works with Lightroom Classic, Google Photos, and local files.",
      keywords:
        "photo curation app, photo curation platform, photo management system, photography DAM, image curation software, AI photo organizer, photo management, photo organization, photography portfolio, image cataloging, AI photography, visual archive, photography workflow, image search, culling, sequence creation, professional photo organizer, photo workflow automation, online photo organizer, smart photo tagging",
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
        "Free Framer is the ultimate batch photo framing tool and photo workflow automation software. Frame unlimited photos at once with professional borders. No limits, no watermarks, no account needed. Perfect for photo management, culling, and organizing your photo library. The only free tool for true bulk photo framing and batch image processing.",
      keywords:
        "batch photo framer, bulk photo framing, frame multiple photos, photo borders batch, frame photos in bulk, unlimited photo framing, batch photo borders, free bulk photo tool, frame hundreds of photos, batch photography tools, mass photo framing, photo frame online free unlimited, batch image frames, bulk photo processing free, photo workflow automation, batch image processing, photo organization tool, photo culling software",
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

    ai_photo_search: {
      title:
        "AI Photo Search App - Find Photos in Your Catalog by Natural Language | Photoreka",
      description:
        "Find any photo in your catalog just by describing it. Type 'rainy street at night with reflections' or 'melancholic portrait in window light' and Photoreka instantly searches your entire photo library—no tagging, no manual keywords. The AI photo search app that understands natural language. Powered by semantic image embeddings and vector similarity search.",
      keywords:
        "AI photo search, natural language photo search, find photos in catalog, search photo catalog, find photos by description, search my photo library, photo catalog search app, semantic image search, no tagging photo search, search photos without keywords, find photos by describing them, photo library search, photo archive search, intelligent photo finder, AI photo organizer, computer vision photo search",
      ogImage: "/home/video_poster.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Search",
        description:
          "Find any photo in your catalog by describing it in natural language. No tagging required. Search your entire photo library instantly with computer vision AI and semantic image embeddings.",
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
          "Natural language photo search",
          "No manual tagging required",
          "Semantic image understanding",
          "Search by mood, style, and emotion",
          "Vector similarity search",
          "Works with 100,000+ photos",
          "Cross-source search",
          "Figurative and artistic query support",
        ],
      },
    },

    lightroom_plugin: {
      title:
        "Natural Language AI Photo Search Plugin for Lightroom Classic | Photoreka",
      description:
        "Search your Lightroom Classic catalog by describing what you remember—no manual tagging required. Photoreka's official plugin uses computer vision AI and semantic search to find any photo instantly. Supports RAW, JPEG, PNG, TIFF. Compatible with Lightroom Classic 13.0+. All AI processing runs locally—your originals never leave your computer.",
      keywords:
        "lightroom plugin, lightroom classic plugin, AI photo search, 3D photo navigation, 3D catalog view, semantic photo search, lightroom catalog sync, natural language photo search, lightroom integration, photo analysis AI, lightroom workflow, adobe lightroom plugin, smart photo organization, AI photography tools, lightroom catalog search, photo metadata analysis, navigate photos in 3D, view catalog as whole, photo clustering, visual similarity, 3D photo atlas, AI photo organizer, photo curation platform, photography DAM, digital asset management, professional photo organizer",
      ogImage: "/home/video_lr_poster.jpg",
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

    photo_chat: {
      title:
        "AI Photo Assistant for Your Photo Library | Photo Catalog Chat & Search | Photoreka",
      description:
        "Chat with your photo library in natural language. Photoreka is an AI photo assistant for photographers that combines photo catalog search, portfolio critique, curated selections, and catalog insights in one conversational interface.",
      keywords:
        "AI photo assistant, photo library assistant, photo catalog assistant, photo catalog chat, chat with your photo library, AI photo chat, AI photo search assistant, photo library search AI, photo catalog search AI, AI photo organizer, AI photo organizer for photographers, conversational photo search, natural language photo search, photo archive assistant, photography assistant AI, AI portfolio critique, photo curation AI, photo archive insights, AI photography analysis, AI catalog intelligence, smart photo catalog analysis, conversational DAM, photography workflow AI, AI digital asset management for photographers, intelligent photo search, own photo library AI, AI assistant for photographers",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Assistant",
        description:
          "AI photo assistant for photographers. Chat with your photo library to search your catalog, get portfolio critique, discover patterns, and build curated photo selections.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        url: "https://www.photoreka.com/photo_chat",
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
        mainEntityOfPage: "https://www.photoreka.com/photo_chat",
        featureList: [
          "Chat with your photo library in natural language",
          "AI photo catalog search assistant",
          "AI-powered portfolio critique and artistic analysis",
          "Artistic and stylistic evolution tracking over time",
          "Intelligent curation and sequence building",
          "AI photo series and exhibition selection",
          "Personalized photography advice",
          "Catalog intelligence: statistics, scores, and visual pattern discovery",
          "AI style analysis and photography pattern analysis",
          "Visual similarity search within your catalog",
          "AI photo clustering and style clustering",
          "Competition and exhibition submission assistance",
          "Conversational digital asset management",
          "Multilingual support",
          "Context-aware follow-up questions",
        ],
      },
    },

    photo_3d_atlas: {
      title:
        "3D Photo Atlas - Visualize Your Entire Photo Catalog in 3D Space | Photoreka",
      description:
        "Stop scrolling grids endlessly. Photoreka's 3D Photo Atlas uses AI and dimensionality reduction (UMAP) to place your entire catalog in navigable 3D space—automatically clustered by visual similarity. Discover hidden patterns, stylistic evolution, and thematic connections across thousands of photos. Runs in browser via WebGL, no installation required.",
      keywords:
        "3D photo atlas, 3D catalog navigation, photo visualization, 3D photo gallery, visual similarity clustering, photo archive navigation, immersive photo exploration, 3D photo space, catalog clustering, photographic patterns, photo relationships, navigate photos 3D, photo body of work, visual archive 3D, photo universe, AI photo clustering, contextual photo navigation, narrative photo view, aesthetic photo grouping, photo sequence building, AI photo organizer, photo curation platform, photo management system, professional photo organizer, photography DAM, image visualization, photo library management",
      ogImage: "/home/video_lr_poster.jpg",
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
