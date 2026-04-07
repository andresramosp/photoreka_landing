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
      title: "Photoreka | Smart Tools to Curate Your Photographic Body of Work",
      description:
        "Photoreka is a suite of smart tools to help you curate your photographic body of work. Upload a specific project, a curated selection, or a significant portion of your archive. Search in natural language, find patterns across your work, and explore your catalog in interactive 3D. Works with Lightroom Classic, Google Photos, and local files.",
      keywords:
        "photo curation tools, curate your photos, photographic body of work, photo curation app, photo management system, photography DAM, image curation software, AI photo organizer, photo archive curation, photo management, photo organization, photography portfolio, image cataloging, AI photography, visual archive, photography workflow, image search, culling, sequence creation, professional photo organizer, smart photo tagging",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka",
        description:
          "A suite of smart tools to help photographers curate their photographic body of work. Upload a specific project, curated selection, or your full archive—then search in natural language, find patterns, and explore your catalog in 3D.",
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
      title: "Terms of Service - Photoreka",
      description:
        "Read Photoreka's Terms of Service. Understand your rights and responsibilities when using our AI-powered photo curation platform, including intellectual property, prohibited content, and liability.",
      keywords:
        "terms of service, user agreement, terms and conditions, legal, photo platform terms",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms of Service - Photoreka",
        description:
          "Terms of Service for the Photoreka photo curation platform.",
      },
    },

    privacy: {
      title: "Privacy & Image Policy - Photoreka",
      description:
        "Learn how Photoreka handles your data and images. You retain 100% ownership of your photos. We only store medium-quality copies for analysis — Photoreka is not a storage service. Read about AI processing, data rights (GDPR/CCPA), security, and deletion.",
      keywords:
        "privacy policy, image policy, data protection, GDPR, CCPA, image rights, copyright, photo privacy, AI image processing, data security, image ownership",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy & Image Policy - Photoreka",
        description:
          "Privacy and Image Policy for the Photoreka photo curation platform.",
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

    ai_photo_culling: {
      title:
        "AI Photo Culling Tool - Auto-Select Your Best Photos Instantly | Photoreka",
      description:
        "Stop spending hours culling photos manually. Photoreka's AI photo culling ranks every image by aesthetics, composition, sharpness, and narrative strength—so you instantly see your strongest shots. Works with Lightroom Classic, Google Photos, and local files. Not binary keep/reject: multi-dimensional scoring that respects your style.",
      keywords:
        "AI photo culling, photo culling software, best photo culling tool, AI cull photos, fast photo culling, auto select best photos, aftershoot alternative, narrative select alternative, photo culling app, smart photo selection, automated photo editing, AI photo selector, batch photo culling, photography culling workflow, lightroom culling plugin, professional photo culling",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Culling",
        description:
          "AI-powered photo culling tool that ranks your images across multiple quality dimensions instead of binary keep/reject. Find your best photos instantly.",
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
          "Multi-dimensional photo scoring",
          "Aesthetic quality ranking",
          "Composition analysis",
          "Sharpness and technical evaluation",
          "Narrative strength scoring",
          "Batch processing of thousands of photos",
          "Works with Lightroom Classic",
          "Natural language search to filter results",
          "No manual tagging required",
        ],
      },
    },

    photo_scoring: {
      title:
        "AI Photo Scoring & Aesthetic Ranking - Rate Your Photos Automatically | Photoreka",
      description:
        "Score every photo in your catalog across multiple dimensions: aesthetics, composition, narrative strength, originality, visual wit, and more. Photoreka's AI photo scoring uses computer vision to rank your best work automatically—no subjective guesswork, no manual curation. Surface your strongest images instantly from thousands.",
      keywords:
        "AI photo scoring, aesthetic photo score, rate my photos AI, photography quality score, image aesthetic assessment, photo composition analyzer, best photo selector AI, photo rating tool, image quality scoring, AI photography ranking, photo aesthetic analysis, automated photo rating, visual quality assessment, photography scoring app, photo quality checker AI",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Scoring",
        description:
          "AI-powered photo scoring tool that rates your photos across multiple quality dimensions: aesthetics, composition, narrative strength, originality, and more.",
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
          "Multi-dimensional photo scoring",
          "Aesthetic quality assessment",
          "Composition analysis",
          "Narrative strength rating",
          "Originality scoring",
          "Visual wit and humor detection",
          "Batch scoring of entire catalogs",
          "Automatic best photo surfacing",
          "Ranking across custom criteria",
        ],
      },
    },

    photography_portfolio_builder: {
      title:
        "AI Photography Portfolio Builder - Auto-Curate Your Best Work | Photoreka",
      description:
        "Let AI select and sequence your strongest photos into a cohesive portfolio. Photoreka combines aesthetic scoring, narrative sequencing, and conversational curation to help you build a photography portfolio that tells your story. Prepare for exhibitions, competitions, and client presentations in minutes instead of days.",
      keywords:
        "AI photography portfolio builder, best photos for portfolio AI, photography portfolio selector, build photography portfolio automatically, AI portfolio curation, photography website portfolio tool, auto curate portfolio, portfolio photo selection AI, photography exhibition preparation, competition photo selection, photo portfolio generator, AI photo curation tool, photography portfolio creator",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka Portfolio Builder",
        description:
          "AI-powered photography portfolio builder that automatically selects, ranks, and sequences your strongest work into cohesive portfolios for exhibitions, competitions, and presentations.",
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
          "AI-powered best photo selection",
          "Automatic narrative sequencing",
          "Multi-dimensional quality scoring",
          "Exhibition-ready portfolio curation",
          "Competition submission preparation",
          "Conversational curation assistant",
          "Thematic coherence analysis",
          "Style consistency evaluation",
          "Portfolio gap analysis",
        ],
      },
    },

    google_photos_alternative: {
      title:
        "Google Photos Alternative for Photographers - AI Photo Organizer | Photoreka",
      description:
        "Looking for a Google Photos alternative built for serious photographers? Photoreka offers AI-powered semantic search, 3D catalog visualization, aesthetic scoring, narrative sequencing, and portfolio curation—tools that consumer apps can't match. Full privacy, no ads, and you keep 100% ownership of your images.",
      keywords:
        "google photos alternative for photographers, google photos alternative privacy, better than google photos, photo organizer for professionals, google photos alternative AI search, professional photo management, apple photos alternative, photo management for photographers, AI photo organizer, advanced photo search, photography DAM alternative, photo library management, private photo organizer, photographer photo management, photo curation platform",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka - Google Photos Alternative",
        description:
          "Professional photo management platform for photographers. AI-powered alternative to Google Photos with semantic search, 3D visualization, aesthetic scoring, and portfolio curation.",
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
          "3D catalog visualization",
          "Multi-dimensional aesthetic scoring",
          "AI-powered photo curation",
          "Narrative sequencing tools",
          "Lightroom Classic integration",
          "Privacy-first design",
          "100% image ownership",
          "No ads or data mining",
          "Professional-grade organization",
        ],
      },
    },

    photo_reports: {
      title:
        "Photography Style Analysis & Pattern Reports - AI Insights | Photoreka",
      description:
        "Understand how you shoot. Photoreka's AI analyzes your entire catalog to surface recurring patterns, stylistic tendencies, compositional habits, color palettes, and thematic preferences. Get detailed reports on your photographic evolution, strengths, blind spots, and unique visual signature. See your work from the outside for the first time.",
      keywords:
        "photography style analysis AI, photo pattern report, photography portfolio analysis, AI photography critique, visual style analysis tool, understand my photography style, photography insights, photo catalog analysis, photographer style report, visual pattern detection, photography evolution tracker, photo habit analysis, compositional style analysis, photography strengths analysis, photographic body of work analysis",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka Photography Reports",
        description:
          "AI-powered photography style analysis and pattern reports. Discover your visual signature, track stylistic evolution, and understand your photographic habits across your entire archive.",
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
          "Stylistic pattern detection",
          "Compositional habit analysis",
          "Color palette evolution tracking",
          "Thematic preference reports",
          "Strengths and blind spots analysis",
          "Photography evolution timeline",
          "Visual signature identification",
          "Subject frequency analysis",
          "Lighting style breakdown",
          "Cross-catalog pattern comparison",
        ],
      },
    },
  },
};

export type SEOPageKey = keyof typeof seoConfig.pages;
