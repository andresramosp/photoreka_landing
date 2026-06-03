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
  jsonLd?: any | any[];
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
      title:
        "Photoreka | AI Photo Organizer & Curation App for Photographers | Curate, Search & Explore Your Photos",
      description:
        "Photoreka is an AI-powered app to curate and organize your photos. Search your entire photo library by describing what you see, score and rank photos automatically, explore your catalog in 3D, and build portfolios with AI. Works with Lightroom Classic, Google Photos, Dropbox, and local files. The smart photo organizer built for serious photographers.",
      keywords:
        "AI photo organizer, app to curate photos with AI, organize photos with AI, AI photo curation app, photo organizer app, smart photo management, AI photo management tool, curate photos AI, organize my photos AI, photo curation software, AI photo library organizer, photo catalog organizer, AI photo search app, natural language photo search, photo organization app, best AI photo organizer, photo management app for photographers, AI photo sorting, photo archive organizer, AI photography tools, photo curation platform, digital photo organizer, intelligent photo organizer, AI image organizer, photo library management app, photography workflow tool, photo scoring AI, photo ranking app, 3D photo catalog, visual photo organizer, AI photo assistant, smart photo curation, curate and organize photos, photo management system, photography DAM, professional photo organizer",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka",
          url: "https://www.photoreka.com",
          description:
            "AI-powered app to curate and organize your photos. Search by natural language, score and rank photos, explore your catalog in 3D, and build portfolios with AI. The smart photo organizer for serious photographers.",
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
            sameAs: ["https://www.instagram.com/photoreka_curation_lab/"],
            logo: {
              "@type": "ImageObject",
              url: "https://www.photoreka.com/logos/marca/vertical-claim-light.png",
            },
          },
          featureList: [
            "AI-powered photo curation and organization",
            "Natural language photo search",
            "3D photo catalog exploration",
            "AI photo scoring and ranking",
            "Portfolio builder with AI curation",
            "Photo style and pattern reports",
            "AI photo chat assistant",
            "Lightroom Classic plugin integration",
            "Google Photos import",
            "Dropbox sync",
            "Free Photo Framer tool",
            "Free Canvas Photo Tool",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "47",
            bestRating: "5",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Photoreka and who is it for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka is an AI-powered app to curate and organize your photos. Upload a specific project, a curated selection, or a significant portion of your archive—then search in natural language, find patterns across your work, and explore your catalog in 3D. Built for street, documentary, artistic, portrait, and landscape photographers who take their work seriously.",
              },
            },
            {
              "@type": "Question",
              name: "How does Photoreka organize and curate photos with AI?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka uses computer vision AI to analyze your photographs, identifying narrative and stylistic elements. This enables intelligent organization, advanced semantic search by natural language, automatic photo scoring and ranking, 3D catalog visualization, and AI-assisted portfolio curation. No manual tagging required.",
              },
            },
            {
              "@type": "Question",
              name: "Is Photoreka a photo storage platform?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka is an AI photo curation and organization tool, not a storage service. It focuses on helping you understand, search, score, and curate your photo library. It works alongside your existing storage (Lightroom, Google Photos, Dropbox, or local files).",
              },
            },
            {
              "@type": "Question",
              name: "Does Photoreka create or transform images?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Photoreka is dedicated exclusively to the analysis, organization, and curation of your photographic images. The platform does not generate synthetic images, alter, or transform your photos in any way.",
              },
            },
            {
              "@type": "Question",
              name: "What happens to my photos and who can see them?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka only stores a reduced version of your images on secure servers for analysis. Your photos are not shared with anyone and you retain 100% of the rights to your work. Analysis uses proprietary and third-party services under agreements that prevent retaining or reusing your photos.",
              },
            },
            {
              "@type": "Question",
              name: "Can I try Photoreka for free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "During the early access phase, a free photo package and usage credits are offered. Analyzing your photos requires a single batch payment, after which you can use most tools for free with daily limits, or purchase credits for unlimited access.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.photoreka.com",
            },
          ],
        },
      ],
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
        "AI Photo Search — Find Any Photo by Describing It | Excire Alternative | Photoreka",
      description:
        "Find any photo by describing it in natural language — no tagging needed. Three honest search modes: Broad (embedding similarity), Adaptive (re-ranked), and Precise (logical inference that verifies conditions, not just ranks them). No query length limit — unlike CLIP-based tools like Excire Search (~77-token cap). Enriched results with AI insights. ChatLab for iterative LLM refinement. The AI photo search app that tells you exactly how precise it's being.",
      keywords:
        "AI photo search, natural language photo search, Excire Search alternative, Excire alternative, Mylio Photos alternative, semantic photo search alternative, find photos by description, search photos without tags, AI photo finder, photo search app, search my photo library, find photo by describing it, smart photo search, semantic image search, photo catalog search, AI image search, visual photo search, search photos by mood, search photos AI, intelligent photo finder, AI photo organizer, photo library search, describe photo find it, no tagging photo search, computer vision photo search, photo archive search app, precise AI photo search, broad adaptive precise photo search, ChatLab photo search, AI photo search no character limit",
      ogImage: "/home/video_poster.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Search",
          description:
            "Find any photo in your catalog by describing it in natural language. No tagging required. Search your entire photo library instantly with AI.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/ai_photo_search",
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
            "Three search modes: Broad, Adaptive, and Precise",
            "Precise mode uses logical inference to verify conditions (not just embedding proximity)",
            "No query length limit — works with long, complex descriptions",
            "Enriched result insights (why each photo surfaced)",
            "ChatLab: LLM vision layer for iterative conversational refinement",
            "Search by mood, style, and emotion",
            "Semantic image understanding",
            "Works with 100,000+ photos",
            "Cross-source search (Lightroom, Google Photos, Dropbox)",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.photoreka.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "AI Photo Search",
              item: "https://www.photoreka.com/ai_photo_search",
            },
          ],
        },
      ],
    },

    lightroom_plugin: {
      title:
        "Natural Language AI Photo Search Plugin for Lightroom Classic | Excire Alternative | Photoreka",
      description:
        "Search your Lightroom Classic catalog by describing what you remember — no manual tagging. Unlike CLIP-based plugins like Excire Search (limited to ~77-token queries), Photoreka has no length cap and offers three search modes: Broad, Adaptive, and Precise (logical inference). All AI processing runs locally. Compatible with Lightroom Classic 13.0+. RAW, CR2, NEF, ARW, JPEG, PNG, TIFF.",
      keywords:
        "lightroom plugin, lightroom classic plugin, AI photo search, Excire Search alternative, Excire plugin alternative, lightroom AI search plugin, semantic photo search lightroom, 3D photo navigation, 3D catalog view, natural language photo search, lightroom catalog sync, lightroom integration, photo analysis AI, lightroom workflow, adobe lightroom plugin, smart photo organization, AI photography tools, lightroom catalog search, navigate photos in 3D, AI photo organizer, photo curation platform, photography DAM, digital asset management, professional photo organizer, precise photo search, broad adaptive precise search, no character limit photo search",
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
        "AI Photo Assistant — Chat with Your Photo Library in Natural Language | Photoreka",
      description:
        "Chat with your photo library using AI. Ask questions about your catalog, get portfolio critique, discover patterns, and build curated photo selections—all in natural conversation. Photoreka's AI photo assistant combines photo search, curation, and catalog intelligence in one conversational interface for photographers.",
      keywords:
        "AI photo assistant, chat with photo library, AI photo chat, photo library assistant, conversational photo search, AI assistant for photographers, photo catalog chat, AI photo organizer, photo library AI, natural language photo assistant, AI photography assistant, photograph assistant chatbot, AI portfolio critique, photo curation AI, smart photo assistant, ask AI about my photos",
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
        "AI Photo Culling — Auto-Select Your Best Photos Instantly | Smart Photo Culling App | Photoreka",
      description:
        "Stop spending hours culling photos manually. Photoreka's AI photo culling ranks every image by aesthetics, composition, sharpness, and narrative strength—so you instantly see your strongest shots. Not binary keep/reject: multi-dimensional scoring that respects your style. Works with Lightroom Classic, Google Photos, and local files.",
      keywords:
        "AI photo culling, photo culling software, photo culling app, AI cull photos, auto select best photos, fast photo culling, smart photo culling, automated photo culling, best photo culling tool, AI photo selector, batch photo culling, photo culling workflow, aftershoot alternative, narrative select alternative, professional photo culling, lightroom culling, AI photo organizer, cull photos with AI",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Culling",
          description:
            "AI-powered photo culling app that ranks your images across multiple quality dimensions instead of binary keep/reject. Find your best photos instantly.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/ai_photo_culling",
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
            "Narrative strength scoring",
            "Batch processing of thousands of photos",
            "Works with Lightroom Classic",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.photoreka.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "AI Photo Culling",
              item: "https://www.photoreka.com/ai_photo_culling",
            },
          ],
        },
      ],
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

    ai_geo_recovery: {
      title: "Geo Recovery — Bulk Photo Geotagging & EXIF GPS | Photoreka",
      description:
        "Bulk photo geotagging for missing GPS metadata: upload your photos, let AI recover the location from visual context, review every marker on the interactive map, and download your originals with GPS coordinates injected directly into the EXIF data. No Photoreka account needed — one flat payment for the entire batch. Your originals never leave your browser.",
      keywords:
        "photo geotagging, bulk photo geotagging, geotag photos, geotagging tool, geotagging app, GPS EXIF, EXIF geotagging, geolocate photos without GPS, GPS EXIF recovery, batch photo geolocation, add GPS to photos, photo location recovery, EXIF GPS injection, AI photo geolocation, recover GPS metadata, bulk photo geolocate, photo location finder, add coordinates to photos, photo GPS recovery tool, anonymous photo geolocation, no account photo GPS, travel photo GPS recovery, photo metadata GPS",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka Geo Recovery",
        description:
          "Upload photos, let AI geolocate them from visual context, review markers on an interactive map, and download originals with GPS coordinates embedded in the EXIF. No account required — one flat payment per batch.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        url: "https://www.photoreka.com/ai_geo_recovery",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "EUR",
        },
        creator: {
          "@type": "Organization",
          name: "Photoreka",
          url: "https://www.photoreka.com",
        },
        featureList: [
          "Originals stored only in the browser — never transmitted to servers",
          "Bulk-scale AI geolocation — thousands of photos in one batch",
          "GPS coordinates injected directly into EXIF metadata",
          "Full-screen interactive map review with manual correction",
          "Drag-to-correct or search-by-name for any marker",
          "No Photoreka account required",
          "One-time flat payment per batch, no subscription",
          "Download originals with GPS data, pixel-perfect and unchanged otherwise",
        ],
      },
    },

    ai_geo_inference: {
      title:
        "AI Geo-Inference — Place Your Photos on the Map with AI | Photoreka",
      description:
        "Photoreka's AI geo-inference engine analyzes photos without GPS metadata, reads visual context (architecture, signage, landscapes, lighting), and geotags them on your world map at city or district level. A geolocatability forecast scores every photo before you spend a single credit — so you know what to expect. Only confident matches land on the map.",
      keywords:
        "photo geotagging, AI geotagging, geotag photos, geotagging tool, photo geolocation, AI photo geolocation, photo location inference, GPS metadata recovery, AI photo mapping, photo location AI, geolocate photos without GPS, AI map photos, photo location finder, visual geolocation, photography world map, photo archive mapping, AI location inference, photo location analysis, travel photo mapping, photo geographic tagging",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Geo-Inference",
        description:
          "AI-powered geo-inference engine that analyzes photos without GPS metadata, infers city or region from visual context (landmarks, architecture, signage, landscapes), and places only confident matches on an interactive world map.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        url: "https://www.photoreka.com/ai_geo_inference",
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
          "Geolocatability forecast with three tiers (Good / Possible / Unlikely) before spending credits",
          "City or district-level location inference from visual context",
          "Confidence gating — only reliable matches placed on the map",
          "Background processing with email notification on completion",
          "Manual correction via map marker edit button",
          "Rich map filtering by GPS source, confidence, granularity and visual aspects",
          "Compatible with Lightroom Plugin and web-uploaded photos",
        ],
      },
    },

    photography_portfolio_builder: {
      title:
        "AI Photography Portfolio Builder — Curate & Sequence Your Best Photos | Photoreka",
      description:
        "Turn thousands of photos into a curated 10–40 image portfolio. Photoreka's AI portfolio builder scores every photo across 8 artistic dimensions (aesthetics, composition, storytelling, originality, message, humor, visual games, candidness), applies one of five coherence modes (visual, chromatic, narrative, heterogeneous or free), and intelligently sequences the final selection. Prepare gallery exhibitions, competition submissions, client edits and photobooks in minutes instead of days.",
      keywords:
        "AI photography portfolio builder, AI photo curation tool, automatic photo selection, portfolio photo selection AI, photography portfolio selector, AI portfolio curation, photo sequencing tool, narrative photo sequencing, coherent photo portfolio, photography exhibition preparation, competition photo selection, photobook layout AI, photography portfolio creator, best photos for portfolio AI, visual coherence portfolio, chromatic photo curation",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka Portfolio Builder",
        description:
          "AI-powered photography portfolio builder that scores photos across 8 artistic dimensions, curates them under five coherence modes (visual, chromatic, narrative, heterogeneous, free), and intelligently sequences the final 10–40 image selection for exhibitions, competitions and photobooks.",
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
          "8-dimension artistic scoring (aesthetics, composition, storytelling, originality, message, humor, visual games, candidness)",
          "Five coherence modes: visual, chromatic, narrative, heterogeneous, free",
          "Configurable portfolio size from 10 to 40 photos",
          "Natural-language style description parsed into weight vectors",
          "Visual filters by genre, framing, depth of field, lighting and perspective",
          "Intelligent photo sequencing with orientation balancing",
          "Similarity gating to avoid near-duplicates",
          "Iterative LLM-based refinement of the selection",
          "Drag-and-drop reordering and manual portfolio mode",
        ],
      },
    },

    photo_tag_cloud: {
      title:
        "Photo Tag Cloud — Explore Your Entire Photo Vocabulary in 2D Semantic Space | Photoreka",
      description:
        "See every tag AI extracted from your photos arranged in an interactive 2D semantic map. Similar tags cluster together—mood next to atmosphere, rain next to fog, city next to urban. Navigate the map to search your catalog: zoom into a cluster and instantly surface the photos that live there. No tagging needed, no lists to scroll.",
      keywords:
        "photo tag cloud, semantic tag map, photo vocabulary visualization, interactive tag map, photo tags 2D, visual tag browser, AI photo tags, semantic photo search, tag-based photo search, photo catalog tags, tag cloud photographer, interactive photo tags, AI photo tagging, photo tag visualization, semantic photo organization, photo tag explorer, UMAP tag map, photo tag clustering, visual photo exploration, tag-based image search, photo tag atlas, photo semantic map",
      ogImage: "/home/tag_cloud_poster.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka Photo Tag Cloud",
          description:
            "Interactive 2D semantic map of every tag extracted from your photos. Navigate by meaning—similar tags cluster together. Zoom in to search, drag to multi-select, enable dynamic search for real-time photo discovery.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/photo_tag_cloud",
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
            "Semantic 2D tag placement using UMAP dimensionality reduction",
            "10 color-coded tag groups (mood, environment, objects, people, weather, animals, place, symbols, abstract, misc)",
            "Collision-aware progressive label rendering",
            "Balloon expansion for dense clusters",
            "Click-to-search any tag",
            "Rectangle multi-select (Ctrl/Cmd + drag)",
            "Dynamic search mode: navigate = search",
            "Group filter panel",
            "Touch-native (pinch zoom, pan, tap)",
            "Keyboard navigation (WASD / arrows)",
            "Handles 10,000+ tags in real time via WebGL",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.photoreka.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Photo Tag Cloud",
              item: "https://www.photoreka.com/photo_tag_cloud",
            },
          ],
        },
      ],
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
