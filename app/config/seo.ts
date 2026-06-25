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
        "Find Your Best Photos with AI — Critique, Organize & Chat With Your Library | Photoreka",
      description:
        "Find your best photos, organize your catalog, and get an honest AI critique of your work—just by chatting. Photoreka is like ChatGPT for your photo library: ask it to rank your strongest shots, rate your photos, see if you've improved, or build a curated selection, and it answers using your actual archive. Search thousands of images by describing them—no tagging required. An AI photo assistant that organizes, curates, and critiques. Works in any language.",
      keywords:
        "find my best photos, app to find my best photos, organize photos with AI, AI to organize photos, best AI to organize photos, AI app to organize photos, AI photo critique, best AI for photo critique, rate my photos AI, chatgpt for my photos, AI to cull photos, find photos by describing them, how to choose best photos, am I a good photographer AI, AI photography feedback, AI photo curation, photo portfolio critique AI, AI photo assistant, ask AI about my photos, analyze my photos AI, photo library AI chat, conversational photo search, search my photo library AI, AI photo analyzer, AI photo organizer, photography improvement tracker AI, discover photo patterns AI, AI photo curator",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Assistant",
        description:
          "AI photo assistant for photographers. Ask anything about your photo library—search your catalog, get portfolio critique, discover patterns, track artistic improvement, and build curated selections in natural language.",
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
          "Natural language search across your entire photo library",
          "AI-powered portfolio critique and artistic analysis",
          "Photography improvement and progression tracking over time",
          "Intelligent photo curation and sequence building",
          "Photo catalog statistics: subjects, lighting, color patterns",
          "AI-generated curated selections for exhibitions and competitions",
          "Personalized photography advice based on your actual archive",
          "Pattern and style discovery across thousands of images",
          "Conversational follow-up questions with session memory",
          "Multilingual support",
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
        "AI Photo Scoring — Rate, Rank & Find Your Best Photos Automatically | Photoreka",
      description:
        "Automatically score and rank every photo in your catalog across 9+ quality dimensions: aesthetics, composition, narrative strength, originality, humor, visual wit, candidness, and more. Photoreka's AI photo rating finds your best photos instantly—no manual selection, no guesswork. Surface hidden gems from thousands of images, track your artistic progress over time, and separate your strongest work from the noise. The photo quality checker and best-photo picker built for serious photographers.",
      keywords:
        "AI photo scoring, rate my photos AI, find best photos AI, photo quality checker AI, best photo picker AI, photo rating app, AI photo ranking, photo quality assessment, photo aesthetic score, photography scoring app, AI photo culling alternative, photo quality grader, image quality rating, photo composition analyzer, photo selection AI, automatically find best photos, best photo selector AI, photo ranking software, photo aesthetic analysis, AI photography ranking, score photos automatically, AI photography critique tool, photo quality metrics, rate photos automatically, photo aesthetic rating, select best photos AI, AI photo filter, photo quality comparison tool, photography quality score, auto select best photos, image aesthetic assessment, AI photo assessment tool",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Scoring",
        description:
          "AI photo scoring and ranking tool for photographers. Rates every photo across 9+ quality dimensions—aesthetics, composition, narrative, originality, and more—to automatically surface your best work from thousands of images.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        url: "https://www.photoreka.com/photo_scoring",
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
          "9+ dimensional AI photo scoring",
          "Aesthetic quality assessment and ranking",
          "Composition analysis",
          "Narrative strength rating",
          "Originality scoring",
          "Visual wit, humor, and candidness detection",
          "Commercial subject clarity and intent scoring",
          "Batch scoring of entire photo catalogs",
          "Automatic best photo surfacing from thousands",
          "Sort and filter by any individual quality dimension",
          "Track artistic progress over time with score history",
          "Works with Lightroom Classic, Google Photos, and local libraries",
        ],
      },
    },

    ai_geo_recovery: {
      title:
        "Geo Recovery — Bulk Photo Geotagging & EXIF GPS Writeback Online | Photoreka",
      description:
        "Need to geotag photos already taken without an account? Geo Recovery uses AI to find where your shots were taken, lets you review every pin on a map, and writes GPS coordinates directly into EXIF on download. Built for DSLR and archive photos with missing GPS metadata. One flat payment, no subscription.",
      keywords:
        "how to geotag photos already taken online, geotag photos already taken, add gps data to photos, add gps to photos, add gps coordinates to photos, bulk photo geotagging, batch geotag photos, geotag photos online, geotag photos online free alternative, photo geotagging tool, exif gps editor, bulk exif gps editor online, fix missing gps metadata photos, dslr photos without gps, add geotag to photos online, ai photo geotagging, geotag photos with ai, photo location recovery, gps metadata recovery, lightroom geotag photos",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka Geo Recovery",
          description:
            "Online bulk photo geotagging tool to add GPS data to photos and write coordinates into EXIF. Upload once, review on map, correct pins, and download originals with GPS metadata.",
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
            "Add GPS data to photos in bulk",
            "Bulk EXIF GPS writeback on original files",
            "AI location recovery for DSLR photos without GPS",
            "Interactive map review before EXIF injection",
            "Manual pin correction and search-by-place",
            "No account required, one-time payment per batch",
            "Original files stay in browser storage",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How to geotag photos already taken online?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Upload the photos you already took, let AI infer likely locations, review and correct each map pin, then download your original files with GPS coordinates written into EXIF metadata.",
              },
            },
            {
              "@type": "Question",
              name: "How can I add GPS data to photos in bulk?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Upload your batch, let AI infer locations, review markers on the map, correct any pin, and download originals with GPS written into EXIF metadata.",
              },
            },
            {
              "@type": "Question",
              name: "Can I geotag DSLR photos that were shot without GPS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Geo Recovery is designed for DSLR and archive photos with missing GPS metadata and can process large batches in one run.",
              },
            },
            {
              "@type": "Question",
              name: "Is this an EXIF GPS editor or only a map viewer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It is both. You review inferred locations on the map, then download the original files with GPS coordinates embedded in standard EXIF fields.",
              },
            },
            {
              "@type": "Question",
              name: "Will geotagged files work in Lightroom and other EXIF-aware apps?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. GPS is written into standard EXIF metadata that is readable by Lightroom, Capture One, Finder, and similar tools.",
              },
            },
          ],
        },
      ],
    },

    ai_geo_inference: {
      title:
        "AI Geo-Inference — Recover Missing GPS Metadata in Your Photo Library | Photoreka",
      description:
        "Fix missing GPS metadata in your existing Photoreka library. AI Geo-Inference analyzes your own photos, predicts location from visual context, and places confident results on your world map with city or district precision. Includes a geolocatability forecast before credit spend.",
      keywords:
        "how to geotag photos already taken, geotag photos already taken in library, fix missing gps metadata photos, photo geotagging for photographers, geotag dslr photos, ai geo inference, ai photo geolocation, geolocate photos without gps, map my photo archive, photo location inference, add location to existing photo library, lightroom classic geotagging workflow, world map photo catalog, city level photo geotagging, visual geolocation for own photos",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Geo-Inference",
          description:
            "AI geo-inference for registered Photoreka users. Recover missing photo locations in your own library, review confidence, and manage map corrections at scale.",
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
            "Fix missing GPS metadata in existing Photoreka libraries",
            "Geolocatability forecast (Good, Possible, Unlikely)",
            "City or district-level location inference",
            "Confidence gating for reliable map placement",
            "Manual correction workflow for map markers",
            "Map filters by source, confidence, and granularity",
            "Lightroom Plugin and web upload compatibility",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How to geotag photos already taken in an existing library?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Open your existing catalog map, run AI geo-inference on photos that lack GPS metadata, review confidence-based results, and manually correct markers where needed.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between AI Geo-Inference and Geo Recovery?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AI Geo-Inference is for registered Photoreka users who want to recover missing locations inside their existing catalog and world map workflow. Geo Recovery is the one-time, no-account option for standalone batches.",
              },
            },
            {
              "@type": "Question",
              name: "Can AI Geo-Inference help fix missing GPS metadata in bulk?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. It analyzes photos without GPS in your library, estimates location confidence, and places reliable matches on the map for review and correction.",
              },
            },
            {
              "@type": "Question",
              name: "Does AI Geo-Inference guess locations for random internet photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. It is designed for your own photo archive inside Photoreka, not for OSINT-style investigation of third-party images.",
              },
            },
          ],
        },
      ],
    },

    photography_portfolio_builder: {
      title:
        "AI Photography Portfolio Builder & Generator — Pick & Sequence Your Best Photos | Photoreka",
      description:
        "Automatically build a curated, sequenced portfolio from your photo archive. Photoreka's AI photography portfolio builder and generator scores every image across 8 artistic dimensions, selects the strongest 10–40 photos under five coherence modes (visual, chromatic, narrative, heterogeneous, free), and intelligently sequences the final set. Stop spending days second-guessing which photos belong. Prepare gallery exhibitions, competition submissions, client deliveries, and photobooks in minutes. The AI portfolio generator built for serious photographers.",
      keywords:
        "AI photography portfolio builder, AI portfolio generator photographer, photography portfolio generator, AI portfolio maker photographer, photo portfolio AI generator, automatically select best photos for portfolio, best photos for portfolio AI, AI photo curation portfolio, photography portfolio creator AI, photo selection for gallery exhibition, competition photo selection AI, photography competition submission tool, photobook AI curation, photo portfolio sequencing AI, curate photography portfolio AI, gallery exhibition photo picker, AI photo selection tool, best photography portfolio curator, photo book curation AI, portfolio photo picker AI, AI curation tool photographer, select photos for exhibition AI, photography portfolio selector AI, AI portfolio curation, coherent photo portfolio AI, photo sequencing tool, narrative photo sequencing, photography exhibition preparation",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photography Portfolio Builder",
        description:
          "AI photography portfolio builder and generator. Scores photos across 8 artistic dimensions, curates the strongest 10–40 images under five coherence modes, and intelligently sequences the final selection for exhibitions, competitions, client deliveries and photobooks.",
        applicationCategory: "PhotographyApplication",
        operatingSystem: "Web",
        url: "https://www.photoreka.com/photography_portfolio_builder",
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
          "AI-powered intelligent photo sequencing",
          "Similarity gating to remove near-duplicates",
          "Manual portfolio mode with full drag-and-drop control",
          "Photo selection for gallery exhibitions and competition submissions",
          "Photobook and client delivery curation",
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
