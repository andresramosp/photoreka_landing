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
  robots?: string;
  jsonLd?: any | any[];
  // Article-specific fields (used when ogType === "article", e.g. blog posts)
  publishedTime?: string;
  modifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
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
      title: "Photoreka | AI Photo Curation & Organizer for Photographers",
      description:
        "AI photo curation and organizer for photographers. Search your library by description, score and rank your best shots, and explore your catalog in 3D.",
      keywords:
        "AI photo curation app, curate photos with AI, AI photo organizer, photo organizer online, organize photos with AI, AI Photo management online, AI photo culling, photo scoring and ranking app, AI photography portfolio builder, photography style analysis, understand my photography style, curate photography portfolio, AI photo search app, natural language photo search, find any photo by describing it, semantic photo search, Excire alternative, photo organizer app for photographers, photo library organizer, photo catalog organizer, smart photo organizer, photo curation software, photo curation platform, 3D photo catalog, AI photography tools, AI photo assistant, photography workflow tool, curate and organize photos, photo management app for photographers",
      ogImage: "/home/dashboard.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka",
          url: "https://www.photoreka.com",
          description:
            "AI-powered photo curation and organizer app. Search your library by natural language, score and rank your best shots, discover patterns across your archive, explore your catalog in 3D, and build portfolios with AI.",
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
              name: "What kind of photo catalog works best with Photoreka?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka is built for photographers who want to work with a curated body of work, not a raw dump of every file ever captured. The sweet spot is a catalog of up to 20,000 photos, with up to 50,000 tested and workable. Because the AI tools are built around curation, they work best when your archive already has a baseline of intentionality.",
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

    blog: {
      title: "Photoreka Blog — AI Photo Curation & Organization Insights",
      description:
        "Technical write-ups and field notes on AI photo curation, semantic photo search, photo organization, and computer vision for photographers — from the team building Photoreka.",
      keywords:
        "photoreka blog, ai photo curation blog, photo organization insights, ai photo search articles, photography technology blog, computer vision photography, photo curation philosophy, ai photo organizer articles, semantic search photography, 3D photo atlas articles",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
    },

    framer: {
      title: "Free Batch Photo Framer — Frame Hundreds at Once | Photoreka",
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
        "AI Search for Your Own Photo Catalog — Find Any Photo by Describing It | Photoreka",
      description:
        "Point Photoreka at your own photo library — local files, Lightroom, Google Photos, Dropbox — and find any shot just by describing it in natural language. No tagging needed. Three honest search modes: Broad (embedding similarity), Adaptive (re-ranked), and Precise (logical inference that verifies conditions, not just ranks them). No query length limit — unlike CLIP-based tools like Excire Search (~77-token cap). Enriched results with AI insights.",
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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Do I need to tag or keyword my photos first?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. That's the whole point. Photoreka analyzes the visual content of your photos automatically when you upload or sync your library. You never need to add a single keyword or tag to search effectively.",
              },
            },
            {
              "@type": "Question",
              name: "How is this different from searching in Google Photos or Apple Photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Google Photos and Apple Photos also use AI search, but they're optimized for consumer snapshots and basic object detection. Photoreka is built for photographers: it understands compositional intent, lighting mood, stylistic references, and figurative language—not just 'dog' or 'beach'. It also gives you full control over your archive without locking you into a proprietary cloud.",
              },
            },
            {
              "@type": "Question",
              name: "How does Photoreka compare to Excire Search?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Excire Search is a solid Lightroom Classic plugin for short keyword prompts, but its CLIP model has a hard context window of ~77 tokens, meaning long or nuanced queries get silently truncated, and it offers a single associative search mode. Photoreka has no query length limit, offers three distinct modes (Broad, Adaptive, and Precise), enriches results with insights, and lets you keep refining through ChatLab's LLM vision layer. It also searches across Google Photos, Dropbox, and local files in addition to Lightroom.",
              },
            },
            {
              "@type": "Question",
              name: "What's the difference between Broad, Adaptive, and Precise search?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Broad search uses pure embedding similarity—fast and associative, best for mood, style, and figurative queries. Adaptive automatically expands cultural or stylistic references (like 'Blade Runner-inspired') with the implicit visual vocabulary they carry. Precise adds a logical inference step that actively verifies each candidate against your specific conditions instead of just ranking by vector proximity.",
              },
            },
            {
              "@type": "Question",
              name: "Can it understand artistic or emotional descriptions?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. You can search for 'melancholic portrait', 'chaotic energy', or 'cinematic tension' and get meaningful results, thanks to a model trained on a vast corpus of image-text pairs including photography criticism and art descriptions.",
              },
            },
            {
              "@type": "Question",
              name: "Are my photos sent to a server or processed locally?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka sends compressed previews (not your originals) to our servers for analysis. Your full-resolution files never leave your machine, and the search index is stored on your account only.",
              },
            },
            {
              "@type": "Question",
              name: "Can I search across multiple sources at once?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. If you have photos from Lightroom Classic, Google Photos, Dropbox, and local uploads all synced to Photoreka, a single search returns results across all of them simultaneously.",
              },
            },
            {
              "@type": "Question",
              name: "What kind of photo catalog is Photoreka designed for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka is built for photographers who want to work with a curated body of work, not a raw dump of every file ever captured. The sweet spot is a catalog of up to 20,000 photos, with up to 50,000 tested and workable. Duplicate detection is built in, but the value of every feature increases the more curated your starting point is.",
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
      title: "AI Photo Search Plugin for Lightroom Classic | Photoreka",
      description:
        "Search your Lightroom Classic catalog by describing what you remember — no manual tagging. Unlike CLIP-based plugins like Excire Search (limited to ~77-token queries), Photoreka has no length cap and offers three search modes: Broad, Adaptive, and Precise (logical inference). All AI processing runs locally. Compatible with Lightroom Classic 13.0+. RAW, CR2, NEF, ARW, JPEG, PNG, TIFF.",
      keywords:
        "lightroom plugin, lightroom classic plugin, AI photo search, Excire Search alternative, Excire plugin alternative, lightroom AI search plugin, semantic photo search lightroom, 3D photo navigation, 3D catalog view, natural language photo search, lightroom catalog sync, lightroom integration, photo analysis AI, lightroom workflow, adobe lightroom plugin, smart photo organization, AI photography tools, lightroom catalog search, navigate photos in 3D, AI photo organizer, photo curation platform, photo library organizer, professional photo organizer, precise photo search, broad adaptive precise search, no character limit photo search",
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
      title: "ChatGPT for Your Photo Library — AI Assistant | Photoreka",
      description:
        "Chat with your photo catalog to find your strongest work, get honest portfolio critique, and track your progress over time. Like ChatGPT for your photo library—built for photographers with serious archives.",
      keywords:
        "chatgpt for my photos, chat with my photo library, AI photo assistant, find my best photos, organize photos with AI, AI photo critique, photo portfolio critique AI, AI photography feedback, AI photo curation, ask AI about my photos, photo library AI chat, conversational photo search, photo catalog AI assistant, photography improvement tracker AI, discover photo patterns AI, AI photo curator, AI assistant for photographers",
      ogImage: "/home/dashboard.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
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
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can the AI find my best photos automatically?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Just ask it to find your best photos and it ranks your strongest shots across your entire library—by composition, expression, and technical quality—then explains why each one stands out. It is one of the fastest ways to surface portfolio-worthy images you may have overlooked.",
              },
            },
            {
              "@type": "Question",
              name: "Can it critique my portfolio like an editor would?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Ask it to review a shoot or critique your portfolio and it gives evidence-based feedback grounded in your actual catalog—composition patterns, aesthetic scores, lighting consistency, and stylistic evolution. It is honest, not flattering, and clear about what it is measuring.",
              },
            },
            {
              "@type": "Question",
              name: "Can it help me organize my photo library with AI?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Beyond chat, Photoreka uses AI to understand and organize your catalog so you can group, filter, and curate by subject, style, lighting, or quality—without manual tagging. The assistant works on top of that organized library to answer your questions.",
              },
            },
            {
              "@type": "Question",
              name: "How is this different from just searching my photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Search finds photos that match a description. The assistant reasons about your catalog as a whole: it can evaluate your work, spot patterns across thousands of images, build curated sequences, and give you personalized feedback—answers that no search bar can provide.",
              },
            },
            {
              "@type": "Question",
              name: "Does it actually look at my photos, or just the metadata?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Both. For most questions it combines metadata with visual embeddings (AI representations of each photo's content and style). When you ask about specific images, it also processes the actual photos directly, enabling true visual understanding of composition, mood, and lighting.",
              },
            },
            {
              "@type": "Question",
              name: "What languages does it support?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The assistant responds in the language you write in. Spanish, English, French, Portuguese, German, Italian, and most major languages are fully supported. Just write naturally.",
              },
            },
            {
              "@type": "Question",
              name: "How many photos does it need to give useful answers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You'll start seeing useful insights from around 50–100 photos. Catalog-level questions (evolution, statistics, portfolio critique) become richer as your archive grows. There's no upper limit—it works well with 10,000+ images.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use it to prepare for a competition or exhibition?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, that's one of its strongest use cases. You can ask for a ranked selection of your best work, a thematically coherent sequence, or a specific number of images that tell a story—the assistant will select and order them with curatorial intent.",
              },
            },
            {
              "@type": "Question",
              name: "Is my photo data private?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The assistant only accesses your own catalog—it has no visibility into other users' libraries. Your photos are processed under Photoreka's privacy policy, and your full-resolution originals are never uploaded unless you explicitly share them.",
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
            {
              "@type": "ListItem",
              position: 2,
              name: "AI Photo Assistant",
              item: "https://www.photoreka.com/photo_chat",
            },
          ],
        },
      ],
    },

    photo_3d_atlas: {
      title: "3D Photo Atlas — Explore Your Catalog in 3D Space | Photoreka",
      description:
        "Stop scrolling grids endlessly. Photoreka's 3D Photo Atlas uses AI and dimensionality reduction (UMAP) to place your entire catalog in navigable 3D space—automatically clustered by visual similarity. Discover hidden patterns, stylistic evolution, and thematic connections across thousands of photos. Runs in browser via WebGL, no installation required.",
      keywords:
        "3D photo atlas, 3D catalog navigation, photo visualization, 3D photo gallery, visual similarity clustering, photo archive navigation, immersive photo exploration, 3D photo space, catalog clustering, photographic patterns, photo relationships, navigate photos 3D, photo body of work, visual archive 3D, photo universe, AI photo clustering, contextual photo navigation, narrative photo view, aesthetic photo grouping, photo sequence building, AI photo organizer, photo curation platform, photo library organizer, professional photo organizer, image visualization, photo library management",
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
        url: "https://www.photoreka.com/photo_3D_atlas",
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
      title: "AI Photo Culling for Your Whole Catalog | Photoreka",
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
      title: "AI Photo Scoring — Rank Your Entire Catalog | Photoreka",
      description:
        "Score every photo in your catalog across 9+ quality dimensions: aesthetics, composition, narrative strength, originality, candidness, and more. Surface your strongest work from an archive of thousands, track your artistic progress over time, and separate keepers from noise. Built for photographers with serious catalogs—works with Lightroom Classic, Google Photos, and local libraries.",
      keywords:
        "AI photo scoring, photo scoring software, score entire photo catalog, rank photo library AI, find best photos in large catalog, photo aesthetic score, aesthetic scoring photography, AI photo ranking, photo quality assessment, image aesthetic assessment, photo composition analyzer, photo selection AI for photographers, automatically surface best photos, photo ranking software, photo aesthetic analysis, AI photography critique tool, photo quality metrics, photography quality score, score photos lightroom catalog, track photography progress over time, photo scoring for photographers, curate large photo archive",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Photoreka AI Photo Scoring",
        description:
          "AI photo scoring and ranking for large photo catalogs. Scores every photo across 9+ quality dimensions—aesthetics, composition, narrative, originality, and more—to automatically surface a photographer's strongest work from an archive of thousands.",
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
      title: "Bulk Photo Geotagging Online — EXIF GPS Writeback | Photoreka",
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
      title: "Recover Missing GPS in Your Photo Library | Photoreka",
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
      title: "AI Photography Portfolio Builder | Photoreka",
      description:
        "Automatically score, select, and sequence your strongest photos into a curated portfolio for exhibitions, competitions, and client delivery.",
      keywords:
        "AI photography portfolio builder, AI portfolio generator photographer, automatically select best photos for portfolio, AI photo curation portfolio, photo selection for gallery exhibition, competition photo selection AI, photobook AI curation, photo portfolio sequencing AI, curate photography portfolio AI, gallery exhibition photo picker, portfolio photo picker AI, select photos for exhibition AI, coherent photo portfolio AI, narrative photo sequencing, photography exhibition preparation, find my best photos",
      ogImage: "/portfolio_builder/0.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
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
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How many photos can a portfolio have?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Between 10 and 40 photos, in increments of 5. The builder over-generates by ~35% during evaluation, then trims the set down to the exact target size you chose.",
              },
            },
            {
              "@type": "Question",
              name: "What do the five coherence modes actually do?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Visual favours photos with similar style and composition using CLIP embeddings. Chromatic groups by color palette and temperature. Narrative looks for related situations and emotional tone. Heterogeneous intentionally maximizes diversity. Free applies no coherence constraint and selects purely on quality.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to analyze my catalog first?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The builder only considers photos that have been processed by Photoreka's analyzer (artistic scores, embeddings and perceptual hashes). At least ~80% of the pool used must be analyzed for a build to be eligible.",
              },
            },
            {
              "@type": "Question",
              name: "Can I control the ordering of photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sequencing is optional. You can leave the AI-generated order, disable sequencing entirely, or—after the build completes—drag-and-drop photos to reorder them, remove any that don't belong (with undo) and save the final layout.",
              },
            },
            {
              "@type": "Question",
              name: "Can I build a portfolio manually?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Alongside the AI-driven flow there is a Manual mode: create an empty portfolio, then add or remove photos from your catalog by hand. No scoring, no credits—just a curated bucket you control end to end.",
              },
            },
            {
              "@type": "Question",
              name: "Does it cost credits?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Cost scales with target size, coherence mode and whether LLM-based sequencing is used. The wizard shows a live, backend-authoritative credit estimate before you start the build. Manual portfolios are free.",
              },
            },
            {
              "@type": "Question",
              name: "Is this a portfolio website builder?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No—Photoreka is the curation engine, not the website. It selects and sequences your photos. You can then take the resulting set to any portfolio platform, print service, competition submission or photobook layout tool.",
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
            {
              "@type": "ListItem",
              position: 2,
              name: "AI Photography Portfolio Builder",
              item: "https://www.photoreka.com/photography_portfolio_builder",
            },
          ],
        },
      ],
    },

    photo_tag_cloud: {
      title: "Photo Tag Cloud — Your Photo Vocabulary as a 2D Map | Photoreka",
      description:
        "See every tag AI extracted from your photos arranged in an interactive 2D semantic map. Similar tags cluster together—mood next to atmosphere, rain next to fog, city next to urban. Navigate the map to search your catalog: zoom into a cluster and instantly surface the photos that live there. No tagging needed, no lists to scroll.",
      keywords:
        "photo tag cloud, semantic tag map, photo vocabulary visualization, interactive tag map, photo tags 2D, visual tag browser, AI photo tags, semantic photo search, tag-based photo search, photo catalog tags, tag cloud photographer, interactive photo tags, AI photo tagging, photo tag visualization, semantic photo organization, photo tag explorer, UMAP tag map, photo tag clustering, visual photo exploration, tag-based image search, photo tag atlas, photo semantic map",
      ogImage: "/home/tag_cloud_poster_detailed.jpg",
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
      title: "Photography Style Analysis & Pattern Reports | Photoreka",
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

    ai_photo_organizer: {
      title:
        "AI Photo Organizer for Cloud, Windows & Web | No Migration | Photoreka",
      description:
        "Organize your photo library with AI—without moving a single file. Photoreka is a cloud-based AI photo organizer that runs entirely in the browser (web, no install) on Windows, Mac, or Linux, and layers on top of Lightroom Classic, Google Photos, Dropbox, and local folders: automatic analysis, semantic search, quality scores, visual maps, and duplicate detection. Pay per photo batch, no subscription.",
      keywords:
        "AI photo organizer, ai photo organizer for cloud, ai photo management online, ai photo organizer for windows, ai photo organizer web, cloud photo organizer, web based photo organizer, browser based photo organizer, photo organizer for windows, photo organizer no download, organize photos with AI, photo organizer for large libraries, organize large photo library, photo library organizer, photo catalog organizer, smart photo organizer, photo organizer without subscription, photo organizer works with lightroom, photo organizer windows and mac, Excire Foto alternative, Peakto alternative, Peakto alternative Windows, Mylio alternative, digikam alternative, photo management software for photographers, organize 20000 photos, photo organization software, AI photo tagging automatic, photo library cleanup, photo DAM alternative, photo analysis layer, no migration photo organizer, organize photos without moving files",
      ogImage: "/home/dashboard.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Organizer",
          url: "https://www.photoreka.com/ai_photo_organizer",
          description:
            "Cloud-based AI photo organizer that runs in the browser on Windows, Mac, and Linux—no install required. Works as a curation layer on top of your existing storage: analyzes your library once, then gives you semantic search, automatic tags, quality scores, visual similarity maps, and duplicate detection—without migrating files or replacing your catalog.",
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
            "Cloud-based: runs entirely in the browser, nothing to install",
            "Works on Windows, Mac, and Linux from the same web app",
            "Works on top of Lightroom Classic, Google Photos, Dropbox, and local files",
            "No file migration, no new catalog, no subscription",
            "Automatic AI analysis: tags, scores, embeddings",
            "Natural language semantic search",
            "Quality scoring across 9+ dimensions",
            "2D/3D visual similarity maps of the whole library",
            "Duplicate and near-duplicate detection",
            "World map view with AI geo-inference",
            "Runs in the browser on Windows, Mac, and Linux",
            "Pay per analyzed photo batch",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is Photoreka a DAM or photo management software?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Photoreka is the layer most DAMs are missing: intelligence. It doesn't store your originals or replace your folder structure—it analyzes your library and gives you semantic search, quality scores, automatic tags, and visual maps on top of the storage you already use (Lightroom, Google Photos, Dropbox, or local files).",
              },
            },
            {
              "@type": "Question",
              name: "Do I have to migrate my photo library or rebuild my catalog?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Your files stay exactly where they are. Photoreka reads your existing sources—including your Lightroom Classic catalog via the official plugin—and builds its analysis from compressed previews. Nothing is moved, renamed, or reorganized.",
              },
            },
            {
              "@type": "Question",
              name: "How is Photoreka different from Excire Foto or Peakto?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Excire Foto and Peakto are desktop apps (Peakto is Mac-only, subscription-based). Photoreka runs in the browser on any OS, is paid per analyzed photo batch instead of a subscription, and goes beyond organization into curation: multi-dimensional quality scoring, three-mode semantic search with no query length limit, portfolio sequencing, and an AI assistant for your catalog.",
              },
            },
            {
              "@type": "Question",
              name: "How many photos can I organize with Photoreka?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The sweet spot is a catalog of up to 20,000 photos, with up to 50,000 tested and workable. Photoreka is built for a curated body of work rather than a raw dump of every file ever captured—duplicate detection is built in to help you get there.",
              },
            },
            {
              "@type": "Question",
              name: "Does Photoreka replace Lightroom?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No—it complements it. Lightroom remains your editor and catalog of record. Photoreka adds what Lightroom doesn't have: natural language search, AI quality scoring, style reports, and visual maps of your whole archive. The Lightroom Classic plugin keeps both in sync.",
              },
            },
            {
              "@type": "Question",
              name: "Is Photoreka a cloud photo organizer, and does it work on Windows?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Photoreka is a cloud-based AI photo organizer: it runs entirely in your web browser, with no software to install and no OS-specific build. That means it works the same way on Windows, Mac, and Linux—unlike desktop organizers such as Peakto, which is Mac-only.",
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
            {
              "@type": "ListItem",
              position: 2,
              name: "AI Photo Organizer",
              item: "https://www.photoreka.com/ai_photo_organizer",
            },
          ],
        },
      ],
    },

    // commercial_photography: {
    //   title: "AI Photo Curation for Commercial Photographers | Photoreka",
    //   description:
    //     "Curation built for commercial work. Score frames for commercial intent and subject clarity, search your archive from a client brief, and assemble sequenced, client-ready selections. For fashion, architecture, lifestyle, product, and wedding photographers.",
    //   keywords:
    //     "commercial photography workflow, AI photo culling for commercial photographers, fashion photography culling, product photography selection, architecture photography curation, lifestyle stock photo curation, wedding photo culling AI, client-ready photo selection, commercial intent photo scoring, subject clarity scoring, packshot selection AI, campaign photo curation, stock library organizer, brief to shot photo search, commercial photo portfolio builder, AI photo scoring commercial, photo delivery workflow, Lightroom commercial workflow",
    //   ogImage: "/portfolio_builder/2.png",
    //   ogType: "website",
    //   twitterCard: "summary_large_image",
    //   jsonLd: [
    //     {
    //       "@context": "https://schema.org",
    //       "@type": "WebApplication",
    //       name: "Photoreka for Commercial Photographers",
    //       description:
    //         "AI photo curation for commercial photographers. Score frames for commercial intent and subject clarity, search an archive from a client brief, and build sequenced client-ready selections across fashion, architecture, lifestyle, product, and wedding work.",
    //       applicationCategory: "PhotographyApplication",
    //       operatingSystem: "Web",
    //       url: "https://www.photoreka.com/commercial_photography",
    //       offers: {
    //         "@type": "Offer",
    //         availability: "https://schema.org/PreOrder",
    //         price: "0",
    //         priceCurrency: "USD",
    //       },
    //       creator: {
    //         "@type": "Organization",
    //         name: "Photoreka",
    //         url: "https://www.photoreka.com",
    //       },
    //       featureList: [
    //         "Commercial scoring: subject clarity and commercial intent",
    //         "Natural language search from a client brief",
    //         "Client-ready portfolio builder with AI sequencing",
    //         "Photo chat for building selects and critique",
    //         "Style and pattern reports for commercial work",
    //         "2D/3D atlas for large stock libraries",
    //         "Coverage for fashion, architecture, lifestyle, product, and wedding",
    //         "Lightroom Classic plugin, Google Photos, and Dropbox import",
    //       ],
    //     },
    //     {
    //       "@context": "https://schema.org",
    //       "@type": "FAQPage",
    //       mainEntity: [
    //         {
    //           "@type": "Question",
    //           name: "What does Photoreka do for commercial photographers?",
    //           acceptedAnswer: {
    //             "@type": "Answer",
    //             text: "Photoreka helps you curate faster on paid work. It scores frames for commercial intent and subject clarity, ranks a shoot by what's sellable, lets you search an archive from a client brief in natural language, and assembles sequenced, client-ready selections across fashion, architecture, lifestyle, product, and wedding work.",
    //           },
    //         },
    //         {
    //           "@type": "Question",
    //           name: "What is commercial scoring and how is it different?",
    //           acceptedAnswer: {
    //             "@type": "Answer",
    //             text: "On top of aesthetics, composition, narrative, and originality, commercial mode activates two extra scores: subject clarity (how clean and readable the main subject is) and commercial intent (how usable a frame is for a brand, catalog, or campaign). A sharp, usable packshot ranks above a moody frame that wouldn't pass a client review.",
    //           },
    //         },
    //         {
    //           "@type": "Question",
    //           name: "Can it handle a full wedding or a large stock library?",
    //           acceptedAnswer: {
    //             "@type": "Answer",
    //             text: "Yes. Photoreka takes a few thousand frames from a wedding or campaign and surfaces your strongest selects, with near-duplicate detection to cut over-shot setups. The sweet spot is a curated body of work up to about 20,000 photos, with up to 50,000 workable.",
    //           },
    //         },
    //         {
    //           "@type": "Question",
    //           name: "Does Photoreka retouch, generate, or alter images?",
    //           acceptedAnswer: {
    //             "@type": "Answer",
    //             text: "No. Photoreka only analyzes, organizes, and curates your existing photographs. It never generates synthetic images or edits your files. It works alongside your editing and delivery tools, not as a replacement.",
    //           },
    //         },
    //         {
    //           "@type": "Question",
    //           name: "Who owns the rights to work uploaded to Photoreka?",
    //           acceptedAnswer: {
    //             "@type": "Answer",
    //             text: "You keep 100% of the rights. Photoreka stores only reduced versions of your images to power search and curation, analyzed under agreements that prevent retaining or reusing your photos. Your work is never shared, preserving client confidentiality.",
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       "@context": "https://schema.org",
    //       "@type": "BreadcrumbList",
    //       itemListElement: [
    //         {
    //           "@type": "ListItem",
    //           position: 1,
    //           name: "Home",
    //           item: "https://www.photoreka.com",
    //         },
    //         {
    //           "@type": "ListItem",
    //           position: 2,
    //           name: "Commercial Photography",
    //           item: "https://www.photoreka.com/commercial_photography",
    //         },
    //       ],
    //     },
    //   ],
    // },
  },
};

export type SEOPageKey = keyof typeof seoConfig.pages;
