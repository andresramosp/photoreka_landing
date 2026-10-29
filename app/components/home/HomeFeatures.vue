<template>
  <!-- variant: "grid" (card grid), "showcase" (alternating image + copy rows)
       or "stack" (sticky cards that pile up while scrolling, lx system). -->
  <FeaturesShowcase
    variant="stack"
    section-id="features"
    eyebrow="AI tools"
    title="A whole range of AI tools to organize, search, and curate your photos"
    title-accent="curate your photos"
    subtitle="A smart photo organizer built for photographers who take their work seriously. Search with AI, score and rank, explore in 3D, and build portfolios from your photo library."
    :features="features"
  />
</template>

<script setup>
import { markRaw } from "vue";
import {
  ChatbubblesOutline,
  CubeOutline,
  BarChartOutline,
  LayersOutline,
  AnalyticsOutline,
} from "@vicons/ionicons5";
import Workspace from "@vicons/carbon/es/Workspace.js";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";

// Features data
// `lead` + `bullets` + `image` are used by the "showcase" and "stack" variants.
// If `bullets` is omitted they fall back to splitting `description`.
const features = [
  // {
  //   icon: markRaw(SearchOutline),
  //   title: "Natural Language Search",
  //   description:
  //     "Find any photo by describing it. Search for moods, scenes, lighting conditions, cinematic references, or abstract feelings. No keywords, no tagging—just describe what you remember and Photoreka finds it.",
  //   lead: "Find any photo just by describing it — no keywords, no tagging.",
  //   bullets: [
  //     "Search moods, scenes, lighting and cinematic references",
  //     "Broad, Adaptive and Precise search modes",
  //     "Just describe what you remember and Photoreka finds it",
  //   ],
  //   image: "/ai_photo_scoring/2.png",
  //   color: "#2563eb",
  //   link: "/ai_photo_search",
  // },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Photo Chat Assistant",
    description:
      "Chat with your photo library to find your strongest images, request honest critique, detect patterns across your catalog, and curate meaningful selections in plain language.",
    lead: "Talk to your archive and get ranked picks, critique, and catalog insights.",
    bullets: [
      "Ask natural-language questions about your full photo library",
      "Get portfolio critique and quality-ranked selections",
      "Track your evolution and discover recurring patterns",
    ],
    image: "/chatlab/1.png",
    color: "#8b5cf6",
    link: "/photo_chat",
    demoLinks: [
      { label: "Try demo", link: "/demo/chat-lab" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/chat-lab",
        commercial: true,
      },
    ],
  },
  {
    icon: markRaw(CubeOutline),
    title: "2D / 3D Atlas",
    description:
      "Explore your entire archive as an universe of images mapped in semantic space. Navigate in 2D or immersive 3D to discover visual clusters, stylistic threads, and unexpected connections across your catalog.",
    lead: "Explore your entire archive as a universe of images mapped in semantic space.",
    bullets: [
      "Navigate your catalog in 2D or immersive 3D",
      "Discover visual clusters and stylistic threads",
      "Surface unexpected connections across your work",
    ],
    image: "/atlas/2d.png",
    color: "#06b6d4",
    link: "/photo_3D_atlas",
    // /2d-atlas en vez de /atlas?mode=2d: el guard de demo de la app reconstruye
    // el destino desde `to.path` y pierde el query, así que el modo tiene que
    // viajar en la ruta. /2d-atlas ya redirige a /atlas?mode=2d.
    demoLinks: [
      { label: "Try demo", link: "/demo/2d-atlas" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/2d-atlas",
        commercial: true,
      },
    ],
  },

  {
    icon: markRaw(Trophy20Regular),
    title: "Rankings & Scores",
    description:
      "Score your photos across multiple dimensions: aesthetics, composition, narrative strength, originality, visual wit, humor, and more. Commercial mode adds product-specific scores like subject clarity and commercial intent. Rank your catalog and surface your strongest work automatically.",
    lead: "Score your photos across multiple dimensions and rank your catalog.",
    bullets: [
      "Score aesthetics, composition, narrative and originality",
      "Commercial mode adds product-specific scores",
      "Surface your strongest work automatically",
    ],
    image: "/ai_photo_scoring/1.png",
    color: "#ec4899",
    link: "/photo_scoring",
    demoLinks: [
      { label: "Try demo", link: "/demo/workspace" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/workspace",
        commercial: true,
      },
    ],
  },
  {
    icon: markRaw(Workspace),
    title: "Interactive Canvas",
    description:
      "Drag, arrange, and storyboard your photos freely on an infinite canvas. Drop any image and Photoreka surfaces visually or narratively similar photos from your archive — and a chat docked to the board reads the arrangement, tells you what the sequence is missing, and finds it in your library.",
    lead: "Storyboard your photos freely on an infinite canvas, with AI beside you.",
    bullets: [
      "Compose and sequence freely on an infinite canvas",
      "Drop an image to surface visually similar photos",
      "Ask a chat that sees your board what the sequence is missing",
    ],
    image: "/canvas/levels.png",
    color: "#8b5cf6",
    link: "/ai_photo_storyboard",
    demoLinks: [
      { label: "Try demo", link: "/demo/canvas" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/canvas",
        commercial: true,
      },
    ],
  },
  // {
  //   icon: markRaw(GitNetworkOutline),
  //   title: "Tag Cloud",
  //   description:
  //     "Every AI-extracted tag from your photos mapped in 2D semantic space. Similar concepts cluster together. Navigate the map to browse, select a region to search, or enable dynamic mode for real-time photo discovery.",
  //   color: "#a78bfa",
  //   link: "/photo_tag_cloud",
  // },
  {
    icon: markRaw(LayersOutline),
    title: "AI Portfolio Builder",
    description:
      "Turn thousands of photos into a curated, ordered portfolio in minutes. Photoreka scores your catalog across 8 artistic dimensions, selects your strongest work under one of five coherence modes, and sequences the final set for visual flow.",
    lead: "Turn thousands of photos into a curated, ordered portfolio in minutes.",
    bullets: [
      "Score photos across 8 artistic dimensions",
      "Choose from five coherence modes: Visual, Chromatic, Narrative, Heterogeneous, Free",
      "Let AI sequence the final selection for visual flow",
    ],
    // Multiple images → rendered as an auto-rotating carousel.
    // Single-image features just use `image` below.
    images: [
      "/portfolio_builder/0.png",
      "/portfolio_builder/1.png",
      "/portfolio_builder/2.png",
      "/portfolio_builder/3.png",
      "/portfolio_builder/4.png",
      "/portfolio_builder/5.png",
    ],
    color: "#22c55e",
    link: "/photography_portfolio_builder",
    demoLinks: [
      { label: "Try demo", link: "/demo/portfolios" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/portfolios",
        commercial: true,
      },
    ],
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Reports & Patterns",
    description:
      "Understand how you shoot. Photoreka surfaces recurring stylistic patterns, narrative tendencies, cultural references, and compositional habits across your archive—helping you see your work from the outside.",
    lead: "Understand how you shoot — see your work from the outside.",
    bullets: [
      "Surface recurring stylistic and narrative patterns",
      "Reveal cultural references and compositional habits",
      "Analyze your whole archive with AI, not vibes",
    ],
    image: "/report/3.png",
    color: "#f59e0b",
    link: "/photo_reports",
    demoLinks: [
      { label: "Try demo", link: "/demo/report" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/report",
        commercial: true,
      },
    ],
  },

  {
    icon: markRaw(AnalyticsOutline),
    title: "AI Geo Inference",
    description:
      "Map your archive by inferred location, even when GPS data is missing. Photoreka estimates place, city, region, and country from visual context, then lets you explore clusters on an interactive map.",
    lead: "Map your archive with AI-inferred locations, even without GPS metadata.",
    bullets: [
      "Infer place, city, region, and country from visual context",
      "Explore geographic clusters in an interactive map view",
      "Refine results with source, detail, and time-range filters",
    ],
    image: "/ai_geoinference/3.png",
    color: "#14b8a6",
    link: "/ai_geo_inference",
  },
];
</script>
