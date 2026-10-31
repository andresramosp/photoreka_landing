<template>
  <!-- All tools in one explorer: a list on the left and the open tool's
       capture on the right (an accordion on phones). -->
  <ToolExplorer
    section-id="features"
    eyebrow="AI tools"
    title="A whole range of AI tools to organize, search, and curate your photos"
    title-accent="curate your photos"
    subtitle="A smart photo organizer built for photographers who take their work seriously. Search with AI, score and rank, explore in 3D, and build portfolios from your photo library."
    :groups="groups"
    :tools="tools"
  />
</template>

<script setup>
import { markRaw } from "vue";
import {
  SearchOutline,
  ChatbubblesOutline,
  CubeOutline,
  BarChartOutline,
  LayersOutline,
  AnalyticsOutline,
} from "@vicons/ionicons5";
import Workspace from "@vicons/carbon/es/Workspace.js";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";

// Same groups as the footer columns.
const groups = ["Find & Organize", "Select & Score", "Create & Locate"];

// Order = display order; the first tool opens on load. Search and Canvas
// carry the copy of the standalone sections they had before.
const tools = [
  {
    group: "Find & Organize",
    icon: markRaw(CubeOutline),
    title: "2D / 3D Atlas",
    lead: "Explore your entire archive as a universe of images mapped in semantic space.",
    bullets: [
      "Navigate your catalog in 2D or immersive 3D",
      "Discover visual clusters and stylistic threads",
      "Surface unexpected connections across your work",
    ],
    video: "/videos/atlas_2d.mp4",
    // 16:9 video in a 16:10 frame: crop the left edge (sidebar), keep the
    // clustering panel on the right.
    videoFocus: "100% 50%",
    image: "/atlas/atlas_2d_poster.jpg",
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
    group: "Find & Organize",
    icon: markRaw(SearchOutline),
    title: "AI Photo Search",
    panelTitle: "Find any photo by describing it",
    panelTitleAccent: "describing it",
    panelHtml:
      "Type what you remember and Photoreka finds it — no tagging, no folders. <strong>Broad</strong> to explore, <strong>Adaptive</strong> for cultural references, <strong>Precise</strong> for exact conditions.",
    video: "/videos/Search.mp4",
    image: "/home/search_results.jpg",
    color: "#2563eb",
    link: "/ai_photo_search",
    demoLinks: [
      {
        label: "Try the Demo",
        link: "/demo/search",
        event: "navigate_to_search_demo",
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
    group: "Select & Score",
    icon: markRaw(Trophy20Regular),
    title: "Rankings & Scores",
    lead: "Score your photos across multiple dimensions and rank your catalog.",
    bullets: [
      "Score aesthetics, composition, narrative and originality",
      "Commercial mode adds product-specific scores",
      "Surface your strongest work automatically",
    ],
    images: ["/ai_photo_scoring/9.png", "/ai_photo_scoring/7.png"],
    color: "#ec4899",
    link: "/photo_scoring",
    demoLinks: [
      { label: "Try demo", link: "/demo/" },
      { label: "Commercial demo", link: "/demo-commercial/", commercial: true },
    ],
  },
  {
    group: "Select & Score",
    icon: markRaw(ChatbubblesOutline),
    title: "Photo Chat Assistant",
    lead: "Talk to your archive and get ranked picks, critique, and catalog insights.",
    bullets: [
      "Ask plain-language questions about your whole library",
      "Get portfolio critique and quality-ranked selections",
      "Track your evolution and discover recurring patterns",
    ],
    images: [
      "/chatlab/dashboard.png",
      "/chatlab/dashboard_empty.png",
      "/canvas/chatlab_2_estrecho.png",
    ],

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
    group: "Select & Score",
    icon: markRaw(BarChartOutline),
    title: "Reports & Patterns",
    lead: "Understand how you shoot — see your work from the outside.",
    bullets: [
      "Surface recurring stylistic and narrative patterns",
      "Reveal cultural references and compositional habits",
      "Analyze your whole archive with AI, not vibes",
    ],
    images: ["/report/1.png", "/report/2.png"],
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
    group: "Create & Locate",
    icon: markRaw(Workspace),
    title: "Interactive Canvas",
    panelTitle: "Storyboard on an infinite canvas",
    panelTitleAccent: "infinite canvas",
    lead: "Storyboard your photos freely on an infinite canvas, with AI beside you.",
    panelHtml:
      "Arrange your photos by hand, or let Photoreka <strong>cluster</strong> them by <strong>narrative</strong>, <strong>color</strong>, <strong>score</strong> and more.",
    bullets: [
      "Compose and sequence freely on an infinite canvas",
      "Drop an image to surface visually similar photos",
      "Ask a chat that sees your board what's missing",
    ],
    images: ["/canvas/levels.png", "/canvas/question.png"],
    color: "#8b5cf6",
    link: "/ai_photo_storyboard",
    demoLinks: [
      {
        label: "Try demo",
        link: "/demo/canvas",
        event: "navigate_to_canvas_demo",
      },
      {
        label: "Commercial demo",
        link: "/demo-commercial/canvas",
        commercial: true,
      },
    ],
  },
  {
    group: "Create & Locate",
    icon: markRaw(LayersOutline),
    title: "AI Portfolio Builder",
    lead: "Turn thousands of photos into a curated, ordered portfolio in minutes.",
    bullets: [
      "Score photos across 8 artistic dimensions",
      "Five coherence modes, from Visual to Narrative",
      "Let AI sequence the final selection for visual flow",
    ],
    // Several images → auto-rotating carousel.
    images: [
      "/portfolio_builder/0.png",
      // "/portfolio_builder/1.png",
      // "/portfolio_builder/2.png",
      // "/portfolio_builder/3.png",
      // "/portfolio_builder/4.png",
      // "/portfolio_builder/5.png",
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
    group: "Create & Locate",
    icon: markRaw(AnalyticsOutline),
    title: "AI Geo Inference",
    lead: "Map your archive with AI-inferred locations, even without GPS metadata.",
    bullets: [
      "Infer place, city, region, and country from visual context",
      "Explore geographic clusters in an interactive map view",
      "Refine results with source, detail, and time-range filters",
    ],
    image: "/ai_geoinference/6.png",
    color: "#14b8a6",
    link: "/ai_geo_inference",
  },
];
</script>
