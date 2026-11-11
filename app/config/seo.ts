/**
 * Configuración SEO centralizada para Photoreka
 * Edita este archivo para cambiar meta tags, Open Graph, y Twitter Cards
 */

import { PICKS_FAQS } from "../utils/picksShowcase";
import { COMMERCIAL_FAQS } from "../utils/commercialFaqs";
import { IMAGE_LIBRARY_FAQS } from "../utils/imageLibraryFaqs";

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
        "AI photo curation for the photos you kept. Score your body of work on 8 artistic criteria, find patterns, search by description and build sequenced portfolios.",
      keywords:
        "AI photo curation app, curate photos with AI, AI photo organizer, photo organizer online, organize photos with AI, AI Photo management online, AI photo culling, photo scoring and ranking app, AI photography portfolio builder, photography style analysis, understand my photography style, curate photography portfolio, AI photo search app, natural language photo search, find any photo by describing it, semantic photo search, Excire alternative, photo organizer app for photographers, photo library organizer, photo catalog organizer, smart photo organizer, photo curation software, photo curation platform, 3D photo catalog, AI photography tools, AI photo assistant, photography workflow tool, curate and organize photos, photo management app for photographers, AI photo curation for commercial photographers, commercial photo scoring, commercial intent scoring, subject clarity scoring, product photography curation, fashion photo selection AI, wedding photo culling AI, client-ready photo selection, stock photo library organizer",
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
            "AI photo curation app for photographers' bodies of work: the photos kept after culling, up to 50,000 per catalog. Score photos on 8 artistic criteria, search by natural language, discover patterns across your work, explore your catalog in 3D, and build sequenced portfolios with AI.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Windows, macOS, Linux (web browser)",
          audience: {
            "@type": "Audience",
            audienceType: [
              "Photographers",
              "Commercial photographers",
              "Product and packshot photographers",
              "Fashion and editorial photographers",
              "Architecture and interiors photographers",
              "Wedding photographers",
              "Stock photographers",
              "Documentary and street photographers",
            ],
          },
          offers: {
            "@type": "AggregateOffer",
            availability: "https://schema.org/InStock",
            lowPrice: "9.90",
            highPrice: "315",
            priceCurrency: "EUR",
            offerCount: 7,
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
            "Built for curated bodies of work of up to 50,000 photos",
            "Natural language photo search",
            "3D photo catalog exploration",
            "AI photo scoring on 8 artistic criteria",
            "Commercial profile: subject clarity and commercial intent",
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
                text: "Photoreka is an AI app to curate the photos you kept. A first pass, by hand or with a tool like Aftershoot, gets you from a full memory card to your keepers; Photoreka finishes the cull and curates them—a project, a series or years of selects, up to 50,000 photos. Score them on 8 artistic criteria, search them in natural language, find the patterns across your work, explore them in 3D and turn them into sequenced portfolios. Built for street, documentary, artistic, portrait, landscape, and commercial photographers who take their work seriously.",
              },
            },
            {
              "@type": "Question",
              name: "How is Photoreka different from Aftershoot, Imagen or Excire?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "They're built for large volumes of photos. Aftershoot, Imagen, Narrative Select, FilterPixel and Lightroom's Assisted Culling spot the shots that failed—blinks, blur, missed focus—and suggest the strongest frame of each moment. Libraries like Excire, Peakto or Mylio keep everything you shot and find it by keyword, and some add an aesthetic score per photo. Photoreka works on more carefully curated catalogs—the photos you kept—which is what lets it go a level higher: curation and editorial judgment. It scores each photo on 8 artistic criteria—storytelling, originality, message and more—reads it against the rest of your work, and helps you see patterns, build sequences and critique the whole. Many photographers use both: one of them for the first pass, Photoreka for the final cull and the edit.",
              },
            },
            {
              "@type": "Question",
              name: "Why up to 50,000 photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Because Photoreka is built for bodies of work, not memory cards. Every photo is read against all the others: originality is measured within your own catalog, and clusters, patterns and gaps emerge from the whole set. Bursts, blinks and near-duplicates would only drown that signal. Up to 50,000 photos leaves room for years of selects—bring the keepers of every shoot, a long-term project or a client archive, and Photoreka shows you what they say together.",
              },
            },
            {
              "@type": "Question",
              name: "How much does Photoreka cost? Is there a free version?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "There is no subscription. You pay once to analyze a batch of photos, and the price per photo drops as the batch grows: 500 photos cost €9.90, 2,500 cost €36 and 10,000 cost €89. Every package includes tool credits, and photo slots never expire. After the analysis, most tools are free within daily limits, and credits let you use them without limits. New accounts get a free welcome pack of 100 photos and 500 credits, so you can try Photoreka on your own work before paying.",
              },
            },
            {
              "@type": "Question",
              name: "Does Photoreka work on Windows and Mac?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Photoreka runs in the browser, so it works on Windows, macOS and Linux with nothing to install. You can bring photos from local folders, Google Photos, Google Drive or Dropbox, or straight from your Lightroom Classic catalog with the official plugin for Windows and macOS.",
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
              name: "Does Photoreka work for commercial and product photography?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The commercial profile swaps two of the 8 criteria for subject clarity—how cleanly the main subject reads—and commercial intent—how usable a frame is for a brand, catalog, or campaign. Commercial photographers use it to search an archive from a client brief, rank their selects by what's actually sellable, and assemble a client-ready selection, across product, fashion, architecture, lifestyle, and wedding work. A separate commercial demo runs on its own catalog.",
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
      title: "AI Photo Search: Find Any Photo by Describing It | Photoreka",
      description:
        "AI photo search and image finder for your own library. Describe any shot and find it across Lightroom, Google Photos, Dropbox or local files. No tagging, no keywords.",
      keywords:
        "AI photo search, AI image finder, photo search AI, natural language photo search, Excire Search alternative, Excire alternative, Mylio Photos alternative, semantic photo search alternative, find photos by description, search photos without tags, AI photo finder, photo search app, search my photo library, find photo by describing it, smart photo search, semantic image search, photo catalog search, AI image search, visual photo search, search photos by mood, search photos AI, intelligent photo finder, AI photo organizer, photo library search, describe photo find it, no tagging photo search, computer vision photo search, photo archive search app, precise AI photo search, broad adaptive precise photo search, ChatLab photo search, AI photo search no character limit",
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
          url: "https://www.photoreka.com/ai_photo_search/",
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
            "Built for curated bodies of work of up to 50,000 photos",
            "Cross-source search (Lightroom, Google Photos, Dropbox)",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is AI photo search?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AI photo search lets you find pictures by describing what's in them instead of relying on file names, folders or keywords. A computer-vision model analyzes every photo once—subjects, setting, light, composition and mood—so a sentence like 'two people on a bench at dusk' finds the right frame. Photoreka is an AI photo search tool and image finder for your own catalog, not for photos on the web.",
              },
            },
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
                text: "Photoreka is built for the photos you kept, not every photo you shot: a curated body of work of up to 50,000 photos. Culling tools like Aftershoot, Imagen or Lightroom's Assisted Culling handle the first pass, rejecting blur, blinks and duplicates across thousands of raw frames. Photoreka works on what survives it: searching by mood, narrative and reference, scoring, clustering and sequencing a body of work. Every photo is read in the context of the rest of your catalog, so the analysis goes deeper when the starting point already has intention.",
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
              item: "https://www.photoreka.com/ai_photo_search/",
            },
          ],
        },
      ],
    },

    lightroom_plugin: {
      title: "AI Photo Search Plugin for Lightroom Classic | Photoreka",
      description:
        "Search your Lightroom Classic catalog by describing what you remember — no manual tagging. Unlike CLIP-based plugins like Excire Search (limited to ~77-token queries), Photoreka has no length cap and offers three search modes: Broad, Adaptive, and Precise (logical inference). Your originals never leave your computer. Compatible with Lightroom Classic 13.0+. RAW, CR2, NEF, ARW, JPEG, PNG, TIFF.",
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
          "View your analyzed body of work as a navigable 3D universe",
          "Visual similarity clustering in 3D space",
          "Culling photos with AI",
          "Direct catalog sync",
          "AI-powered photo analysis",
          "One-click photo transfer",
          "Launch 3D Atlas from Lightroom",
          "Seamless Lightroom integration",
          "Privacy-first design",
          "Originals stay on your computer",
          "Automatic metadata sync",
          "Compatible with Photoreka web platform",
          "Works with existing Lightroom structure",
        ],
      },
    },

    photo_chat: {
      title: "AI Photo Assistant: Chat With Your Photo Library | Photoreka",
      description:
        "AI photo assistant for photographers. Chat with your photo library to get an honest portfolio review, see how your style has evolved and build sequences.",
      keywords:
        "chatgpt for my photos, chat with my photo library, chat with your photos, ask photos alternative, AI photo assistant, find my best photos, organize photos with AI, AI photo critique, photo portfolio critique AI, AI photography feedback, AI photo curation, ask AI about my photos, photo library AI chat, conversational photo search, photo catalog AI assistant, photography improvement tracker AI, discover photo patterns AI, AI photo curator, AI assistant for photographers",
      ogImage: "/home/dashboard.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Assistant",
          description:
            "AI photo assistant for photographers. Ask anything about your photo library—search your catalog, get a portfolio review, discover patterns, track artistic improvement, and build curated selections in natural language.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/photo_chat/",
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
          mainEntityOfPage: "https://www.photoreka.com/photo_chat/",
          featureList: [
            "Natural language search across your body of work",
            "Portfolio review grounded in your own archive",
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
              name: "What is an AI photo assistant?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "An AI photo assistant is a chat interface on top of your own photo library. In Photoreka it is called ChatLab: you ask a question in plain language and it answers with text plus a ranked, intentionally ordered set of your photos. It can search, review a portfolio, describe how your style has changed and build sequences, working on a body of work of up to 50,000 photos.",
              },
            },
            {
              "@type": "Question",
              name: "Can it review my portfolio like an editor would?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Ask it to review a shoot or your whole portfolio and it gives evidence-based feedback grounded in your actual catalog—composition patterns, aesthetic scores, lighting consistency, and stylistic evolution. It is honest, not flattering, and it is not generic advice. Art is subjective, so the assistant is clear about what it is measuring and how.",
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
              name: "Is this like Ask Photos in Google Photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "They share the idea of chatting with a photo library, but they answer different questions. Ask Photos is Google's Gemini-powered conversational search inside the Google Photos app: it finds moments in your backed-up camera roll, chats about one photo and can edit it on request. ChatLab works on a photographer's curated catalog of up to 50,000 photos, each already scored on eight artistic criteria and indexed by meaning, and it answers editorial questions: which frames are strongest, what you keep repeating, how your style has changed and in what order a sequence should go. Many photographers use both: Google Photos for the camera roll, Photoreka for the body of work.",
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
              name: "Can it help me organize my photo library with AI?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Beyond chat, Photoreka uses AI to understand and organize your catalog so you can group, filter, and curate by subject, style, lighting, or quality—without manual tagging. The assistant works on top of that organized library to answer your questions.",
              },
            },
            {
              "@type": "Question",
              name: "How many photos does it need to give useful answers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You'll start seeing useful insights from around 50–100 photos. Catalog-level questions (evolution, statistics, portfolio review) become richer as your body of work grows, up to 50,000 photos. It works best on a coherent body of work rather than an unculled dump: questions about style and evolution need intention, not noise.",
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
              name: "Can the AI find my best photos automatically?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Just ask it to find your best photos and it ranks your strongest shots across your catalog—by aesthetics, composition, storytelling, and originality—then explains why each one stands out. It is one of the fastest ways to surface portfolio-worthy images you may have overlooked.",
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
              name: "Does it remember previous conversations?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Within a session, the assistant remembers the recent conversation so you can ask follow-up questions naturally. Long-term memory across sessions is on the roadmap.",
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
              item: "https://www.photoreka.com/photo_chat/",
            },
          ],
        },
      ],
    },

    ai_photo_storyboard: {
      title: "Storyboard Your Photos with AI — Infinite Canvas | Photoreka",
      description:
        "The app to storyboard your photos with AI. Lay your own shots out on an infinite canvas and a chat that sees the board tells you what is missing, what breaks the sequence, and pulls the next frame straight from your archive. Real photographs, never generated images.",
      keywords:
        "app to storyboard my photos with ai, storyboard my photos with AI, AI photo storyboard, photo storyboard maker, storyboard from my own photos, AI photo sequencing, sequence photos with AI, arrange photos into a narrative, photo narrative builder, infinite canvas for photographers, photo canvas app, visual storytelling with my own photos, photo essay builder AI, photo series builder, photo sequencing tool, moodboard from my own photos, AI moodboard photographers, storyboard photo library, order photos into a story, photo layout AI assistant, curate a photo sequence, photo book sequencing AI, exhibition sequence photos, AI photo edit sequence",
      ogImage: "/home/canvas_playground.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka Canvas — AI Photo Storyboarding",
          description:
            "An infinite canvas where photographers storyboard their own photographs, with an AI chat docked to the board that reads the arrangement, judges the sequence, and retrieves the missing frame from the photographer's own archive.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/ai_photo_storyboard/",
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
          mainEntityOfPage: "https://www.photoreka.com/ai_photo_storyboard/",
          featureList: [
            "Infinite canvas to arrange and sequence your own photographs",
            "AI chat docked to the board that reads the arrangement",
            "Three nested levels of context: board, focus area, spotlight",
            "Layout-aware answers: what sits next to what, and where the gap is",
            "Search your archive anchored on the photos already on the board",
            "Drag AI-suggested photos straight from the reply onto the canvas",
            "Lay a proposed sequence out on the board in one click",
            "Similar-photo expansion by narrative, chromatic, context or technical criteria",
            "Canvas-only mode to reason strictly within the photos on the board",
            "Board profiling: recurring subjects, palette, lighting, dates and places",
            "Multiple saved canvases per project",
            "Live demo board on a real catalog, no registration required",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to storyboard your photos with AI",
          description:
            "Turn a pile of your own photographs into an ordered visual sequence using Photoreka's infinite canvas and its docked AI chat.",
          totalTime: "PT10M",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Drop your photos on the canvas",
              text: "Add photos from your catalog to an infinite board and arrange them by hand — left to right, top to bottom, the way the story should read.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Mark out what you are working on",
              text: "Move the halo over a stretch of the board, or drag a box, to set the focus. Spotlight individual frames when the question is about one shot.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Ask the chat about the sequence",
              text: "The chat sees the board's arrangement — what sits next to what, and where the hole is. Ask whether a frame fits, which one is weakest, or what the sequence is missing.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Pull the missing frame from your archive",
              text: "The chat searches your own library for photos that would sit well beside what you have out. Drag any result straight from the reply onto the board.",
            },
            {
              "@type": "HowToStep",
              position: 5,
              name: "Lay the proposed sequence out",
              text: "When the chat proposes an order, one click places those photos on the canvas in that exact sequence, ready to adjust by hand.",
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is there an app to storyboard my photos with AI?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Photoreka's canvas is an infinite board where you lay your own photographs out and arrange them into a sequence, with an AI chat docked beside it that reads the arrangement. Unlike AI storyboard generators, it never invents an image — every frame it proposes is a real photograph from your own archive.",
              },
            },
            {
              "@type": "Question",
              name: "Does it generate images, or use my own photos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Only your own photos. Photoreka is a curation tool, not an image generator. Every photo the assistant surfaces comes from the library you uploaded, which is what makes the result usable as a real edit, portfolio sequence or photo essay rather than a mockup.",
              },
            },
            {
              "@type": "Question",
              name: "Does the AI actually understand how my photos are arranged?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The board's geometry travels to the assistant as a grid: which photos are neighbours, what sits above or below what, where the empty slot is, and whether two clusters read as separate groups. That is what lets it answer questions like 'does this fit here', 'what breaks the run', or 'what belongs in the gap' — questions a flat list of photos cannot answer.",
              },
            },
            {
              "@type": "Question",
              name: "How do I tell the AI which photos I am asking about?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Three nested levels. The whole board is the general context. The focus — the photos under the halo, or the ones you pick by hand — is the working area. The spotlight singles out the specific frames you are asking about. You never name a level: you mark it on the board and the assistant reads the finest one as the subject of your question.",
              },
            },
            {
              "@type": "Question",
              name: "Can it find the photo that is missing from my sequence?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "That is the most common request on the canvas. The assistant reads the photos you have out, works out what the set is doing, and searches your archive for work that would sit well beside them — by overall look, by narrative, by palette or by setting. Photos already on the board are excluded from results, so everything it shows is genuinely new material you can drag onto the canvas.",
              },
            },
            {
              "@type": "Question",
              name: "Can the AI arrange the photos for me?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It can propose an order and lay it out. When a reply groups photos into a sequence, one click places them on the board in that exact order, as a block you can then rearrange by hand. The canvas stays yours — the assistant proposes, you edit.",
              },
            },
            {
              "@type": "Question",
              name: "Can I keep the AI strictly inside the photos I already have out?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Canvas only switch confines every search to the photos placed on the board. With it on, the conversation is about reading your own edit — which frames are weakest, what repeats, how the set holds together — instead of proposing new material.",
              },
            },
            {
              "@type": "Question",
              name: "What can I use a photo storyboard for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sequencing a photo essay or documentary story, ordering a photo book or zine, planning an exhibition wall, building a portfolio edit, laying out a moodboard for a client, or simply working out whether a shoot holds together as a series.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to install anything?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The canvas runs in the browser. There is also a demo you can open without registering — a board backed by a real catalog, with the chat live — so you can try the arranging and the sequencing before uploading anything of your own.",
              },
            },
            {
              "@type": "Question",
              name: "Is the conversation saved with the board?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Each canvas keeps its own conversation, stored with the board rather than in a general chat history. Reopen the board on any device and the discussion about that particular sequence is still there.",
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
              name: "AI Photo Storyboard",
              item: "https://www.photoreka.com/ai_photo_storyboard/",
            },
          ],
        },
      ],
    },

    ai_photo_culling: {
      title: "AI Photo Culling Software for Your Body of Work | Photoreka",
      description:
        "AI photo culling beyond the first pass: once blinks and blur are filtered out, Photoreka flags near-duplicates and ranks the photos you kept on 8 artistic criteria.",
      keywords:
        "AI photo culling, photo culling software, photo culling app, AI cull photos, auto select best photos, fast photo culling, smart photo culling, automated photo culling, best photo culling tool, AI photo selector, second pass photo culling, photo culling workflow, aftershoot alternative, narrative select alternative, professional photo culling, lightroom culling, AI photo organizer, cull photos with AI",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Culling",
          description:
            "AI photo culling for the second pass: scores the photos you kept on 8 artistic criteria and ranks each one against the rest of your body of work, instead of binary keep/reject.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/ai_photo_culling/",
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
            "Scoring on 8 artistic criteria",
            "Aesthetic quality ranking",
            "Composition analysis",
            "Storytelling and originality scoring",
            "Built for bodies of work of up to 50,000 photos",
            "Works with Lightroom Classic picks and collections",
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
              item: "https://www.photoreka.com/ai_photo_culling/",
            },
          ],
        },
      ],
    },

    photo_scoring: {
      title: "AI Photo Scoring — Score Your Entire Catalog | Photoreka",
      description:
        "Score every photo in your body of work on 8 artistic criteria: aesthetics, composition, narrative strength, originality, message and more. Surface your strongest work from thousands of keepers and track your progress over time. The commercial profile swaps in subject clarity and commercial intent for product, stock and fashion work.",
      keywords:
        "AI photo scoring, photo scoring software, score entire photo catalog, rank photo library AI, find best photos in large catalog, photo aesthetic score, aesthetic scoring photography, AI photo ranking, photo quality assessment, image aesthetic assessment, photo composition analyzer, photo selection AI for photographers, automatically surface best photos, photo ranking software, photo aesthetic analysis, AI photography critique tool, photo quality metrics, photography quality score, score photos lightroom catalog, track photography progress over time, photo scoring for photographers, curate large photo archive, commercial photo scoring, commercial intent scoring, subject clarity scoring, product photography scoring, packshot selection AI, stock photography scoring, fashion editorial photo selection, score photos for client delivery, find most licensable photos",
      ogImage: "/logos/marca/vertical-claim-light.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Scoring",
          description:
            "AI photo scoring and ranking for bodies of work of up to 50,000 photos. Scores every photo on 8 artistic criteria—aesthetics, composition, narrative, originality, and more—to surface a photographer's strongest work from thousands of keepers.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/photo_scoring/",
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
            "AI photo scoring on 8 artistic criteria",
            "Aesthetic quality assessment and ranking",
            "Composition analysis",
            "Narrative strength rating",
            "Originality and message scoring",
            "Visual games, humor, and candidness detection",
            "Commercial profile with subject clarity and commercial intent",
            "Scoring for bodies of work of up to 50,000 photos",
            "Automatic best photo surfacing from thousands",
            "Sort and filter by any individual quality dimension",
            "Track artistic progress over time with score history",
            "Works with Lightroom Classic, Google Photos, and local libraries",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
          {
            "@type": "Question",
            name: "Can AI really judge the quality of a photo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Photoreka's scoring models are trained on expert photographic assessments and analyze visual properties that correlate with quality: composition, color harmony, lighting, subject presence, and emotional impact. They're not infallible—art is subjective—but they provide a consistent, data-driven starting point that most photographers find surprisingly accurate.",
            },
          },
          {
            "@type": "Question",
            name: "Is this just a sharpness detector?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No—it doesn't measure sharpness at all. Focus, blur and blinks belong to the first pass, which you run on each shoot by hand or with a tool like Aftershoot, Imagen or Lightroom's Assisted Culling. Photoreka scores the photos you kept on 8 artistic criteria, so a soft, atmospheric portrait can score very high on aesthetics, narrative and originality. The system evaluates what makes a photo compelling, not whether it's technically correct.",
            },
          },
          {
            "@type": "Question",
            name: "How are the scoring models trained?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The models combine large-scale visual understanding (from computer vision foundation models) with specialized fine-tuning on photographic quality datasets curated by professional photographers and critics. They're designed to evaluate photography, not generic images.",
            },
          },
          {
            "@type": "Question",
            name: "Can I sort by a single dimension?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can sort and filter by any individual criterion (aesthetics, composition, narrative strength, originality, message, humor, visual games, or candidness) or by the overall rating. This lets you tailor rankings to each specific project.",
            },
          },
          {
            "@type": "Question",
            name: "Do scores change over time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Scores are computed once when your photos are analyzed and remain stable. As our models improve, you may optionally re-score your catalog, but existing scores persist. This ensures consistency and allows meaningful comparisons over time.",
            },
          },
          {
            "@type": "Question",
            name: "Is this included with Photoreka?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Aesthetic scoring is a core feature available to all Photoreka users. Every photo in your catalog receives a full quality profile as part of the standard analysis pipeline.",
            },
          },
          {
            "@type": "Question",
            name: "How does commercial scoring work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Choose the Commercial Photography profile and two of the eight criteria are swapped for commercial ones: Subject Clarity, which measures how cleanly the main subject stands out from its environment, and Commercial Intent, which evaluates overall production value and suitability for advertising, stock libraries, or editorial use. They replace Visual Games and Message, so every photo still gets 8 scores. These help you quickly identify your most licensable or pitch-ready images.",
            },
          },
          ],
        },
      ],
    },

    ai_photo_picks: {
      title: "AI Photo Rating & Critique: Rank Your Best Photos | Photoreka",
      description:
        "AI photo rating and critique: an AI jury rates up to 5,000 photos on eight artistic criteria, writes a critique of each one and ranks them. No account. 10 photos free.",
      keywords:
        "photo critique, photography critique, ai photo critique, photo rating, photo rater, ai photo rater, rate my photo, rate my photos, photo rating, ai photo rating, image rating ai, photo ranker, ai photo ranker, photo ranking, ai photo picker, find my best photos, find my best photos ai, pick best photos ai, best photo selector, ai photo ranking, rank photos with ai, ai photo critique, photo critique online, rate my photos ai, ai photo selection, choose best photos for portfolio, choose photos for photo contest, photography competition shortlist, street photography critique, ai photo scoring online, rank photos online no account",
      ogImage: "/picks/og-picks.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka Picks",
          description:
            "Online AI photo rating and critique: rates every photo on eight artistic criteria, writes a critique for each and ranks them with genre and award juries. No account required, pay per photo.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/ai_photo_picks/",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
            price: "0.012",
          },
          creator: {
            "@type": "Organization",
            name: "Photoreka",
            url: "https://www.photoreka.com",
          },
          featureList: [
            "Scores on eight artistic criteria",
            "A written critique for every photo",
            "Genre juries: street, documentary, landscape, portrait, travel, fine art",
            "Award juries with a minimum score",
            "Identical copies grouped and judged once",
            "Originals never leave the browser",
            "Free trial with 10 photos, no account",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PICKS_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
      ],
    },

    ai_geo_recovery: {
      title: "Bulk Photo Geotagging Online — EXIF GPS Writeback | Photoreka",
      description:
        "Need to geotag photos already taken without an account? Geo Recovery uses AI to find where your shots were taken, lets you review every pin on a map, and writes GPS coordinates directly into EXIF on download. Built for DSLR and archive photos with missing GPS metadata. One payment per batch, no subscription.",
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
          url: "https://www.photoreka.com/ai_geo_recovery/",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
            price: "0.012",
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
          url: "https://www.photoreka.com/ai_geo_inference/",
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
        "AI photography portfolio builder, AI portfolio generator photographer, automatically select best photos for portfolio, AI photo curation portfolio, photo selection for gallery exhibition, competition photo selection AI, photobook AI curation, photo portfolio sequencing AI, curate photography portfolio AI, gallery exhibition photo picker, portfolio photo picker AI, select photos for exhibition AI, coherent photo portfolio AI, narrative photo sequencing, photography exhibition preparation, find my best photos, client-ready photo selection, client delivery portfolio AI, commercial portfolio builder, select photos for a client pitch, campaign photo selection",
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
          url: "https://www.photoreka.com/photography_portfolio_builder/",
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
              item: "https://www.photoreka.com/photography_portfolio_builder/",
            },
          ],
        },
      ],
    },

    ai_photo_organizer: {
      title:
        "AI Photo Organizer for Windows, Mac & Web | Photoreka",
      description:
        "Organize your photos with AI without moving a file. Runs in the browser on top of Lightroom, Google Photos, Dropbox or local folders. No subscription.",
      keywords:
        "AI photo organizer, ai photo organizer for cloud, ai photo management online, ai photo organizer for windows, ai photo organizer web, cloud photo organizer, web based photo organizer, browser based photo organizer, photo organizer for windows, photo organizer no download, organize photos with AI, photo organizer for large libraries, organize large photo library, photo library organizer, photo catalog organizer, smart photo organizer, photo organizer without subscription, photo organizer works with lightroom, photo organizer windows and mac, Excire Foto alternative, Peakto alternative, Peakto alternative Windows, Mylio alternative, digikam alternative, photo management software for photographers, organize 20000 photos, photo organization software, AI photo tagging automatic, photo library cleanup, photo DAM alternative, photo analysis layer, no migration photo organizer, organize photos without moving files, 3D photo atlas, visualize photo library, photo similarity map, photo tag cloud, photo tag map, semantic tag map, photography reports, photo style analysis, photography progress report",
      ogImage: "/home/dashboard.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka AI Photo Organizer",
          url: "https://www.photoreka.com/ai_photo_organizer/",
          description:
            "Cloud-based AI photo organizer that runs in the browser on Windows, Mac, and Linux—no install required. Works as a curation layer on top of your existing storage: analyzes your library once, then gives you semantic search, automatic tags, quality scores, a 2D/3D visual similarity atlas, an interactive tag map, style and evolution reports, and duplicate detection—without migrating files or replacing your catalog.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Windows, macOS, Linux (web browser)",
          offers: {
            "@type": "AggregateOffer",
            availability: "https://schema.org/InStock",
            lowPrice: "9.90",
            highPrice: "315",
            priceCurrency: "EUR",
            offerCount: 7,
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
            "Artistic scoring across 8 criteria",
            "2D/3D visual similarity maps of the whole library",
            "Interactive tag map of your photo vocabulary, with dynamic search",
            "Quality, evolution, style and pattern reports",
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
                text: "Excire Foto and Peakto are organizers built for everything you've shot: they import, keyword and find your whole library, and both add an aesthetic score to help you pick the best frames. Photoreka works one step later, on the body of work you kept, up to 50,000 photos. Instead of one global score it rates each photo on 8 artistic criteria, reads the collection as a whole (patterns, gaps, style reports, an AI assistant for your catalog) and helps you sequence portfolios. It also runs in the browser on any OS (Peakto is Mac-only, subscription-based) and is paid per analyzed batch instead of a subscription.",
              },
            },
            {
              "@type": "Question",
              name: "How many photos can I organize with Photoreka?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Up to 50,000 photos, and that limit is deliberate. Photoreka is built for the photos you kept, not every photo you shot: the selects that survive your first pass, across projects and years. Every photo is analyzed in the context of the rest of your catalog, so a focused body of work gives clearer clusters and more meaningful scores and reports. Duplicate detection is built in for the stragglers.",
              },
            },
            {
              "@type": "Question",
              name: "Does Photoreka replace Lightroom?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No—it complements it. Lightroom remains your editor and catalog of record. Photoreka adds what Lightroom doesn't have: natural language search, AI artistic scoring, style reports, and visual maps of your whole archive. The Lightroom Classic plugin keeps both in sync.",
              },
            },
            {
              "@type": "Question",
              name: "What is the 3D Atlas and how are photos placed on it?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Atlas shows your entire catalog as a navigable 2D or 3D map. Photoreka extracts a visual embedding from every photo—composition, colors, subjects, mood and lighting as numbers—and projects them with UMAP, a dimensionality-reduction technique that keeps similar photos close together. The clusters that form reveal your recurring themes and how your work has evolved.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need special hardware to use the 3D Atlas?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The Atlas runs in modern browsers using WebGL, and any computer with reasonably recent graphics—even integrated graphics from the last five years—can navigate thousands of photos smoothly. There's nothing to install.",
              },
            },
            {
              "@type": "Question",
              name: "How is the tag map different from a tag list or a word cloud?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A word cloud shows tags by frequency and a tag list sorts them alphabetically. The tag map places them by meaning: tags that share meaning or appear in the same kind of scene sit close together, using UMAP on AI-generated semantic embeddings. Click a tag, drag a rectangle over several, or turn on dynamic search to browse your photos by moving across the map.",
              },
            },
            {
              "@type": "Question",
              name: "What do the photography reports show, and how many photos do I need?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Reports are built from the AI scores of every photo plus metadata such as date, camera settings and detected subjects. They cover quality distribution, evolution over time, style, strengths and gaps, patterns, and individual sessions. You get basic insights from about 50 photos; for meaningful trends, 200 or more spread over time works best. Reports update as your catalog grows.",
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
              item: "https://www.photoreka.com/ai_photo_organizer/",
            },
          ],
        },
      ],
    },

    ai_image_library_search: {
      title: "AI Image Library Search for Businesses & Agencies | Photoreka",
      description:
        "Find any image in your company photo library by describing it. No tagging, no migration: works on Dropbox, Lightroom or local folders. Pay per batch.",
      keywords:
        "AI image library search, search photo archive by description, search company photo library, image library software for business, photo library software for business, photo management software for business, photo management software for marketing agencies, AI photo tagging alternative, search Dropbox images by description, find duplicate images in photo library, tourism photo library software, travel photo library search, destination photo library, select best product photos AI, e-commerce product photo selection, hotel photo library, real estate photo library, marketing image library search, DAM alternative without migration, photo archive without metadata",
      ogImage: "/home/video_poster.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka Image Library Search",
          url: "https://www.photoreka.com/ai_image_library_search/",
          description:
            "AI search and curation layer for business image libraries. Find any image by describing it, rank shots by quality and commercial intent, flag near-duplicates, recover missing locations, and assemble selections — on top of Dropbox, Google Photos, Lightroom Classic, or local folders, without migration or a monthly subscription.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          audience: {
            "@type": "BusinessAudience",
            audienceType:
              "Travel agencies, tour operators, e-commerce teams, marketing agencies, real estate and hospitality businesses",
          },
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
            "Natural language image search from a written brief",
            "No tagging or keywording required",
            "Quality and commercial-intent scoring",
            "Near-duplicate detection",
            "2D map of the whole image library",
            "AI location recovery for images without GPS",
            "Selections for campaigns, brochures, and catalogs",
            "Works on Dropbox, Google Photos, Lightroom Classic, and local files",
            "Pay per analyzed batch, no monthly subscription",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: IMAGE_LIBRARY_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
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
              name: "Image Library Search",
              item: "https://www.photoreka.com/ai_image_library_search/",
            },
          ],
        },
      ],
    },

    commercial_photography: {
      title: "Pick the Best Product & Commercial Photos with AI | Photoreka",
      description:
        "AI curation for product, fashion, architecture and stock work. Score shots for commercial intent, search your archive by client brief, send client selects.",
      keywords:
        "select best product photos AI, AI e-commerce photo selection, product photography culling software, AI photo selection for commercial photographers, find duplicate product photos, choose best stock photos to submit, curate stock photo portfolio, commercial intent photo scoring, subject clarity scoring, packshot selection AI, fashion photography culling, architecture photography curation, campaign photo curation, search photo archive by client brief, client-ready photo selection, commercial photo portfolio builder, Lightroom commercial workflow",
      ogImage: "/portfolio_builder/2.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Photoreka for Commercial Photographers",
          description:
            "AI photo curation for commercial photographers. Score frames for commercial intent and subject clarity, search an archive from a client brief, and build sequenced client-ready selections across fashion, architecture, lifestyle, product, and wedding work.",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          url: "https://www.photoreka.com/commercial_photography/",
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
            "Commercial scoring: subject clarity and commercial intent",
            "Natural language search from a client brief",
            "Client-ready portfolio builder with AI sequencing",
            "Photo chat for building selects and critique",
            "Style and pattern reports for commercial work",
            "2D/3D atlas for large stock libraries",
            "Near-duplicate detection for over-shot setups",
            "Coverage for fashion, architecture, lifestyle, product, and wedding",
            "Lightroom Classic plugin, Google Photos, and Dropbox import",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: COMMERCIAL_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
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
              name: "Commercial Photography",
              item: "https://www.photoreka.com/commercial_photography/",
            },
          ],
        },
      ],
    },
  },
};

export type SEOPageKey = keyof typeof seoConfig.pages;
