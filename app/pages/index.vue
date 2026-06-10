<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="premium-landing">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <AppLogo layout="horizontal" :height="45" />
            </div>
            <div class="nav-actions">
              <button
                v-if="canToggleTheme(true)"
                class="theme-toggle"
                @click="toggleTheme"
                aria-label="Toggle theme"
              >
                <n-icon size="20">
                  <component
                    :is="themeMode === 'dark' ? SunnyOutline : MoonOutline"
                  />
                </n-icon>
              </button>
              <n-button strong secondary type="info" @click="goToAuth('login')"
                >Sign in
              </n-button>
              <!-- <n-button
                v-if="!isMobile"
                type="info"
                size="large"
                @click="goToAuth('signup')"
              >
                <template #icon>
                  <n-icon><RocketOutline /></n-icon>
                </template>
                Request Access
              </n-button> -->
            </div>
          </div>
        </nav>
        <!-- Hero Section -->
        <section id="hero" class="hero-section" ref="heroSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
          </div>
          <div class="hero-container">
            <div class="hero-content">
              <div class="hero-badge" :class="{ visible: heroVisible }">
                <span class="badge-content">
                  <n-icon size="16"><WalkOutline /></n-icon>Street
                  <n-icon size="16"><BookOpen16Regular /></n-icon>Documentary
                  <n-icon size="16"><ColorPaletteOutline /></n-icon>Artistic
                  <!-- <n-icon size="16"><PersonOutline /></n-icon>Portrait -->
                  <n-icon size="16"><ImageOutline /></n-icon>Travel
                  <n-icon size="16"><BriefcaseOutline /></n-icon>Commercial
                </span>
              </div>
              <h1 class="hero-title" :class="{ visible: heroVisible }">
                Make full sense of your
                <span class="gradient-text"> photographic body of work</span>
              </h1>

              <p class="hero-description" :class="{ visible: heroVisible }">
                <strong>Photoreka</strong> is a suite of intelligent tools to
                help you organize and curate your photo library.<br />
                You can search by <strong>natural language</strong>, rank your
                photos or explore your catalog in <strong>3D</strong>.<br />
                Upload a specific project, a refined selection or your whole
                <strong>body of work</strong>.
              </p>
              <div
                v-if="false"
                class="hero-badge"
                :class="{ visible: heroVisible }"
              >
                <span class="badge-content">
                  <n-icon size="16"><WalkOutline /></n-icon>Street
                  <n-icon size="16"><BookOpen16Regular /></n-icon>Documentary
                  <n-icon size="16"><ColorPaletteOutline /></n-icon>Artistic
                  <n-icon size="16"><PersonOutline /></n-icon>Portrait
                  <n-icon size="16"><ImageOutline /></n-icon>Landscape
                </span>
              </div>
              <div style="display: inline-flex; gap: 1rem">
                <n-button type="info" size="large" @click="goToDemo">
                  <template #icon>
                    <n-icon><PlayCircleOutline /></n-icon>
                  </template>
                  <!-- Explore Demo -->
                  Try the Demo
                </n-button>
                <n-button
                  strong
                  secondary
                  type="info"
                  size="large"
                  @click="goToAuth('signup')"
                >
                  <template #icon>
                    <n-icon><KeyOutline /></n-icon>
                  </template>
                  {{ signupButtonLabel }}
                </n-button>
              </div>
              <!-- Video Demo Section -->
              <div class="hero-demo" :class="{ visible: heroVisible }">
                <div v-if="videoTabs.length > 1" class="demo-tabs">
                  <button
                    v-for="(tab, index) in videoTabs"
                    :key="index"
                    class="demo-tab"
                    :class="{ active: activeTab === index }"
                    @click="setActiveTab(index, false)"
                  >
                    <n-icon size="18">
                      <component :is="tab.icon" />
                    </n-icon>
                    <span>{{ tab.title }}</span>
                    <div class="tab-indicator" v-if="activeTab === index">
                      <div
                        class="progress"
                        :style="{ width: `${videoProgress}%` }"
                      ></div>
                    </div>
                  </button>
                </div>

                <div class="demo-video-container" ref="videoContainer">
                  <video
                    ref="videoPlayer"
                    class="demo-video"
                    poster="/home/video_poster.jpg"
                    :src="videoTabs[activeTab].videoUrl"
                    @timeupdate="updateProgress"
                    @ended="onVideoEnded"
                    @play="onVideoPlay"
                    @loadeddata="onVideoLoaded"
                    muted
                    preload="metadata"
                  ></video>
                  <!-- <div
                    class="video-play-overlay"
                    v-if="!videoPlaying && autoPlayTriggered"
                    @click="playVideo"
                  >
                    <div class="play-button">
                      <n-icon size="48" color="white">
                        <PlayCircleOutline />
                      </n-icon>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Grid Section -->
        <section
          id="features"
          class="index-features-section"
          ref="featuresSection"
        >
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                AI tools to organize, search, and curate your photos
              </h2>
              <p class="section-subtitle">
                A smart photo organizer built for photographers who take their
                work seriously. Search with AI, score and rank, explore in 3D,
                and build portfolios from your photo library.
              </p>
            </div>

            <div class="index-features-grid">
              <component
                :is="feature.link ? 'NuxtLink' : 'div'"
                v-for="(feature, index) in features"
                :key="index"
                :to="feature.link || undefined"
                class="index-feature-card"
                :class="{ visible: featuresVisible }"
                :style="{ transitionDelay: `${index * 100}ms` }"
              >
                <div
                  class="index-feature-bg-icon"
                  :style="{ color: feature.color }"
                >
                  <n-icon size="90">
                    <component :is="feature.icon" />
                  </n-icon>
                </div>
                <div class="index-feature-content">
                  <div
                    class="index-feature-accent"
                    :style="{ background: feature.color }"
                  ></div>
                  <h3 class="index-feature-title">{{ feature.title }}</h3>
                  <p class="index-feature-description">
                    {{ feature.description }}
                  </p>
                </div>
              </component>
            </div>
          </div>
        </section>

        <!-- Search Promo Section -->
        <section
          id="ai_search"
          class="search-promo-section"
          ref="searchPromoSection"
        >
          <div class="search-promo-bg">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div
              class="search-promo-layout"
              :class="{ visible: searchPromoVisible }"
            >
              <!-- Left: content -->
              <div class="search-promo-content">
                <div class="search-promo-badge">
                  <n-icon size="15"><SearchOutline /></n-icon>
                  AI Photo Search
                </div>
                <h2 class="search-promo-title">
                  Find any photo by
                  <span class="gradient-text">describing it</span>
                </h2>
                <p class="search-promo-description">
                  Type what you remember and Photoreka finds it — no tagging, no
                  folders. Three modes: <strong>Broad</strong> for open
                  exploration, <strong>Adaptive</strong> for metaphorical and
                  cultural references, <strong>Precise</strong> for conditions
                  that need to be verified, not just approximated.
                </p>
                <div class="search-promo-actions">
                  <n-button
                    type="info"
                    size="large"
                    strong
                    @click="goToSearchDemo"
                  >
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Try the Demo
                  </n-button>
                  <n-button
                    text
                    type="info"
                    size="large"
                    tag="a"
                    href="/ai_photo_search"
                  >
                    Learn more →
                  </n-button>
                </div>
              </div>
              <!-- Right: video -->
              <div class="search-promo-visual">
                <div class="video-frame">
                  <video
                    class="search-promo-video"
                    src="/videos/Search.mp4"
                    poster="/home/video_poster.jpg"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Data Sources Section -->
        <section id="sources" class="sources-section" ref="sourcesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: sourcesVisible }">
              <h2 class="section-title">
                Import and organize photos from anywhere
              </h2>
              <p class="section-subtitle">
                Photoreka works with your existing photo sources. Import your
                images from Lightroom, Google Photos, Dropbox, or local files
                and start curating with AI immediately.
              </p>
            </div>

            <div class="sources-grid">
              <div
                v-for="(source, index) in dataSources"
                :key="index"
                class="source-card"
                :class="{
                  visible: sourcesVisible,
                  'coming-soon': source.comingSoon,
                }"
                :style="{ transitionDelay: `${index * 100}ms` }"
              >
                <div class="source-icon">
                  <n-icon v-if="!source.logo" size="40" :color="source.color">
                    <component :is="source.icon" />
                  </n-icon>
                  <img
                    v-else
                    :src="source.logo"
                    :alt="source.name"
                    class="source-logo-img"
                  />
                </div>
                <h3 class="source-name">{{ source.name }}</h3>
                <p class="source-description">{{ source.description }}</p>
                <div
                  class="source-badge"
                  :class="{
                    available: !source.comingSoon,
                    soon: source.comingSoon,
                  }"
                >
                  {{ source.comingSoon ? "Coming Soon" : "Available Now" }}
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Lightroom Integration Section -->
        <section
          id="lightroom_plugin"
          class="integration-section"
          ref="integrationSection"
        >
          <div class="section-container">
            <div class="integration-layout">
              <div
                class="integration-visual"
                :class="{ visible: integrationVisible }"
              >
                <div class="video-frame">
                  <video
                    class="integration-video"
                    :src="lightroomVideoUrl"
                    poster="/home/video_lr_poster.jpg"
                    @loadeddata="onLightroomVideoLoaded"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>

              <div
                class="integration-content"
                :class="{ visible: integrationVisible }"
              >
                <div class="integration-badge">
                  <span>Official Plugin</span>
                </div>
                <div class="integration-header">
                  <img
                    src="/logos/lightroom_logo.png"
                    alt="Adobe Lightroom"
                    class="integration-logo"
                  />
                  <h2 class="integration-title">Lightroom Integration</h2>
                </div>
                <p class="integration-description">
                  Seamlessly connect Photoreka with Adobe Lightroom Classic.
                  Sync your catalog, search by natural language directly from
                  Lightroom, and bring the power of intelligent curation to your
                  existing workflow.
                </p>

                <ul class="integration-features">
                  <li>
                    <div class="feature-icon-wrapper" style="color: #2563eb">
                      <n-icon size="18"><SyncOutline /></n-icon>
                    </div>
                    <span>Direct sync from Lightroom catalog</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #8b5cf6">
                      <n-icon size="28"><ChatbubblesOutline /></n-icon>
                    </div>
                    <span>Search by natural language integrated</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #f59e0b">
                      <n-icon size="18"><ShareSocialOutline /></n-icon>
                    </div>
                    <span>One-click photo transfer to Photoreka</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #22c55e">
                      <n-icon size="18"><LinkOutline /></n-icon>
                    </div>
                    <span>Compatible with Photoreka web workflow</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #6b7280">
                      <n-icon size="18"><InformationCircleOutline /></n-icon>
                    </div>
                    <span>Lightroom Classic 13.0+ · RAW, JPEG, PNG, TIFF </span>
                  </li>
                </ul>

                <div class="integration-cta">
                  <n-button
                    type="primary"
                    size="large"
                    @click="goToAuth('signup')"
                  >
                    <template #icon>
                      <n-icon><DownloadOutline /></n-icon>
                    </template>
                    Get the Plugin
                  </n-button>
                  <span class="cta-note">Free with Photoreka account</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQs Section -->
        <section id="faq" class="faqs-section" ref="faqsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqsVisible }">
              <h2 class="section-title">
                Frequently asked questions about Photoreka
              </h2>
              <p class="section-subtitle">
                Everything you need to know about using AI to curate and
                organize your photos
              </p>
            </div>

            <div class="faqs-container" :class="{ visible: faqsVisible }">
              <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="faq-item"
                :class="{ active: activeFAQ === index }"
              >
                <button class="faq-question" @click="toggleFAQ(index)">
                  <span class="faq-q">{{ faq.question }}</span>
                  <n-icon
                    size="20"
                    class="faq-icon"
                    :class="{ rotated: activeFAQ === index }"
                  >
                    <ChevronDownOutline />
                  </n-icon>
                </button>
                <div class="faq-answer" v-show="activeFAQ === index">
                  <p v-if="faq.hasHtml" v-html="faq.answer"></p>
                  <p v-else-if="!faq.hasLink">{{ faq.answer }}</p>
                  <p v-else>
                    {{ faq.answer.split("Terms and Image Policy")[0] }}
                    <a @click="goToTerms" class="faq-link"
                      >Terms and Image Policy</a
                    >
                    {{
                      faq.answer
                        .split("Terms and Image Policy")
                        .slice(1)
                        .join("Terms and Image Policy")
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- Request Access Dialog -->
      <RequestAccessDialog
        v-model:show="showRequestDialog"
        @success="onRequestSuccess"
      />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { markRaw } from "vue";
import {
  RocketOutline,
  SearchOutline,
  ImagesOutline,
  CloudUploadOutline,
  CubeOutline,
  LinkOutline,
  LogoDropbox,
  SunnyOutline,
  MoonOutline,
  WalkOutline,
  PersonOutline,
  ImageOutline,
  ColorPaletteOutline,
  BriefcaseOutline,
  SyncOutline,
  ChatbubblesOutline,
  ShareSocialOutline,
  DownloadOutline,
  StopOutline,
  PlayCircleOutline,
  ChevronDownOutline,
  KeyOutline,
  InformationCircleOutline,
  GridOutline,
  BarChartOutline,
  LayersOutline,
  SpeedometerOutline,
  EyeOutline,
  GitNetworkOutline,
} from "@vicons/ionicons5";
import { Workspace } from "@vicons/carbon";
import { BookOpen16Regular, Trophy20Regular } from "@vicons/fluent";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("home");

const { isMobile } = useMobileDevice();

// Inyectar script inline para prevenir FOUC
useHead({
  script: [
    {
      children: `(function(){try{const t=localStorage.getItem('photoreka-theme-mode')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
      tagPosition: "head",
      type: "text/javascript",
    },
  ],
});

const {
  naiveTheme: currentTheme,
  naiveThemeOverrides: themeOverrides,
  themeMode,
  toggleTheme: baseToggleTheme,
  canToggleTheme,
  initTheme,
} = useTheme();

// Wrapper para toggle con tracking
const toggleTheme = () => {
  baseToggleTheme();
  // trackEvent("theme_toggle", { mode: themeMode.value });
};

// Video demo management
const videoPlayer = ref(null);
const videoContainer = ref(null);
const videoPlaying = ref(false);
const activeTab = ref(0);
const videoProgress = ref(0);
const autoPlayTriggered = ref(false);
const isAutoSwitching = ref(false);
const observer = ref(null);
const fallbackTimeout = ref(null);

// Dialog states
const showRequestDialog = ref(false);
const activeFAQ = ref(null);

// Intersection observers for animations
const heroSection = ref(null);
const featuresSection = ref(null);
const searchPromoSection = ref(null);
const integrationSection = ref(null);
const sourcesSection = ref(null);
const freeToolsSection = ref(null);
const faqsSection = ref(null);

const heroVisible = ref(false);
const featuresVisible = ref(false);
const searchPromoVisible = ref(false);
const integrationVisible = ref(false);
const sourcesVisible = ref(false);
const freeToolsVisible = ref(false);
const faqsVisible = ref(false);

// Video tabs data
const videoTabs = ref([
  {
    title: "3D Atlas",
    icon: markRaw(CubeOutline),
    videoUrl: "/videos/atlas_1.mp4",
    speed: 1.5,
    delaySeconds: 0,
    endSeconds: 39, // Puedes poner un número aquí si quieres cortar antes
  },
  // {
  //   title: "Canvas",
  //   icon: ColorPaletteOutline,
  //   videoUrl: new URL("@/assets/videos/canvas_1.mp4", import.meta.url).href,
  //   speed: 1.2,
  //   delaySeconds: 0,
  //   endSeconds: undefined, // Puedes poner un número aquí si quieres cortar antes
  // },
  // {
  //   title: "Search",
  //   icon: SearchOutline,
  //   videoUrl: new URL("@/assets/videos/explorer_1.mp4", import.meta.url).href,
  //   speed: 1.5,
  //   delaySeconds: 0,
  // },
  // {
  //   title: "Project Builder",
  //   icon: ImagesOutline,
  //   videoUrl: new URL("@/assets/videos/project_builder_1.mp4", import.meta.url)
  //     .href,
  //   speed: 2.8,
  //   delaySeconds: 0,
  // },
  // {
  //   title: "Score Ranking",
  //   icon: Trophy20Regular,
  //   videoUrl: new URL("@/assets/videos/visual_scores_1.mp4", import.meta.url)
  //     .href,
  //   speed: 2,
  //   delaySeconds: 0,
  // },
]);

// Lightroom video
const lightroomVideoUrl = "/videos/lr_plugin.mp4";

// Features data
const features = ref([
  {
    icon: markRaw(CubeOutline),
    title: "2D / 3D Atlas",
    description:
      "Explore your entire archive as an universe of images mapped in semantic space. Navigate in 2D or immersive 3D to discover visual clusters, stylistic threads, and unexpected connections across your catalog.",
    color: "#06b6d4",
    link: "/photo_3D_atlas",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Natural Language Search",
    description:
      "Find any photo by describing it. Search for moods, scenes, lighting conditions, cinematic references, or abstract feelings. No keywords, no tagging—just describe what you remember and Photoreka finds it.",
    color: "#2563eb",
    link: "/ai_photo_search",
  },
  {
    icon: markRaw(Workspace),
    title: "Interactive Canvas",
    description:
      "Drag, arrange, and compose your photos freely on an infinite canvas. Drop any image and Photoreka surfaces visually or narratively similar photos from your archive to help you find the perfect pairing.",
    color: "#8b5cf6",
    link: null,
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
    title: "Series & Sequencing",
    description:
      "Build cohesive sequences and storyboards from your catalog. Organize images into narrative arcs, editorial spreads, or visual series—and let the AI suggest continuations based on compositional and tonal flow.",
    color: "#22c55e",
    link: "/photography_portfolio_builder",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Reports & Patterns",
    description:
      "Understand how you shoot. Photoreka surfaces recurring stylistic patterns, narrative tendencies, cultural references, and compositional habits across your archive—helping you see your work from the outside.",
    color: "#f59e0b",
    link: "/photo_reports",
  },
  {
    icon: markRaw(Trophy20Regular),
    title: "Rankings & Scores",
    description:
      "Score your photos across multiple dimensions: aesthetics, composition, narrative strength, originality, visual wit, humor, and more. Commercial mode adds product-specific scores like subject clarity and commercial intent. Rank your catalog and surface your strongest work automatically.",
    color: "#ec4899",
    link: "/photo_scoring",
  },
]);

// Data sources
const dataSources = ref([
  {
    icon: markRaw(CloudUploadOutline),
    name: "Local Files",
    description:
      "Upload photos directly from your computer. Supports all major image formats (JPEG, PNG, TIFF).",
    color: "#22c55e",
    comingSoon: false,
  },
  {
    logo: "/logos/google_photos.png",
    name: "Google Photos",
    description:
      "Sync your entire Google Photos library with one click. Keep your photos organized across platforms.",
    comingSoon: false,
  },
  {
    logo: "/logos/lightroom_logo.png",
    name: "Adobe Lightroom",
    description:
      "Connect directly with your Lightroom Classic catalog through our official plugin.",
    comingSoon: false,
  },
  {
    icon: markRaw(LogoDropbox),
    name: "Dropbox",
    description:
      "Sync your Dropbox photo folders directly with Photoreka. Works with any folder structure you already have.",
    color: "#0061FF",
    comingSoon: false,
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "What is Photoreka and who is it for?",
    answer:
      "Photoreka is an AI-powered app to curate and organize your photos. Upload a specific project, a curated selection, or a significant portion of your archive—then search in natural language, score and rank your images, find patterns across your work, and explore your catalog in 3D. Built for street, documentary, artistic, portrait, landscape, and commercial photographers who take their work seriously.",
  },
  {
    question: "How does Photoreka organize and curate photos with AI?",
    answer:
      "Photoreka uses computer vision AI to analyze your photographs, identifying narrative and stylistic elements. This enables intelligent organization, advanced semantic search by natural language, automatic photo scoring and ranking, 3D catalog visualization, and AI-assisted portfolio curation—all without manual tagging. For detailed information on our image processing policies, please see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Is Photoreka a storage platform?",
    answer:
      "Photoreka is an AI photo curation and organization tool, not a storage service. It focuses on helping you understand, search, score, and curate your photo library. It works alongside your existing storage—Lightroom Classic, Google Photos, Dropbox, or local files. For details about how we handle your images, see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Does Photoreka create or transform images?",
    answer:
      "No. Photoreka is dedicated exclusively to the analysis, organization, and curation of your photographic images. The platform does not generate synthetic images, alter, or transform your photos in any way. We do not support or endorse the creation or use of synthetic or manipulated images within Photoreka.",
  },
  {
    question: "What happens to my photos and who can see them?",
    answer:
      "We only store a reduced version of your images on secure servers—sufficient to facilitate searches and for common social media uses, but not for any other purpose. The analysis is performed using proprietary and third-party services under agreements that prevent retaining or reusing your photos. They are not shared with anyone and you always retain 100% of the rights to your work. For complete details, please read our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "What kind of photo catalog works best with Photoreka?",
    answer:
      "Photoreka is built for photographers who want to work with a curated body of work—not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 5,000 photos; up to 10,000 is workable but we recommend keeping it focused. Because the AI tools are built around curation—semantic search, visual clusters, scoring, sequencing—they work best when your archive already has a baseline of intentionality.",
  },
  {
    question: "Can I try Photoreka for free?",
    answer: `Analyzing your photos requires a single batch payment. Afterward, you can use most tools for free, with some daily/total limits, or purchase credits to work unlimitedly. <span style='color:var(--premium-primary);font-weight:600;'>During the <a href='#' style='color:var(--premium-primary);text-decoration:underline;' onclick='event.preventDefault();window.__goToEarlyAccess && window.__goToEarlyAccess()'>early access</a> phase, a free photo package and usage credits will be offered.</span>`,
    hasHtml: true,
  },
]);

// Get runtime config
const config = useRuntimeConfig();

const { isOpenMode, signupButtonLabel } = useRegistrationMode();

// Navigation methods
const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_page_premium", mode);
  if (mode === "signup") {
    if (isOpenMode.value) {
      window.open(`${config.public.appUrl}/auth`, "_blank");
    } else {
      showRequestDialog.value = true;
    }
  } else {
    const authUrl = `${config.public.appUrl}/auth?mode=${mode}`;
    window.location.assign(authUrl);
  }
};

const goToTerms = () => {
  trackUserAction("navigate_to_terms", "landing_page_premium");
  navigateTo("/terms");
};

const goToPlayground = () => {
  trackUserAction("navigate_to_playground", "landing_page_premium", "canvas");
  const playgroundUrl = `${config.public.appUrl}/canvas-playground`;
  window.open(playgroundUrl, "_blank");
};

const goToFreeFramer = () => {
  trackUserAction("navigate_to_playground", "landing_page_premium", "framer");
  const playgroundUrl = `${config.public.appUrl}/free-framer`;
  window.open(playgroundUrl, "_blank");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/dashboard", "_blank");
};

const goToSearchDemo = () => {
  trackUserAction("navigate_to_search_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

const onRequestSuccess = () => {};

// Video methods
const setActiveTab = (index, isAutoSwitch = false) => {
  if (!isAutoSwitch) {
    const tabName = videoTabs.value[index]?.title || `tab_${index}`;
    trackEvent("video_tab_change", {
      tab_name: tabName.toLowerCase().replace(" ", "_"),
      tab_index: index,
      previous_tab: activeTab.value,
      is_manual: true,
    });
  }

  activeTab.value = index;
  videoProgress.value = 0;
  videoPlaying.value = false;
  autoPlayTriggered.value = false;
  isAutoSwitching.value = isAutoSwitch;

  if (fallbackTimeout.value) {
    clearTimeout(fallbackTimeout.value);
    fallbackTimeout.value = null;
  }

  if (observer.value) {
    observer.value.disconnect();
    observer.value = null;
  }

  if (videoPlayer.value) {
    videoPlayer.value.currentTime = 0;
    videoPlayer.value.load();

    if (isAutoSwitch) {
      setTimeout(() => {
        startVideoPlayback();
      }, 200);
    } else {
      nextTick(() => {
        setTimeout(() => {
          setupIntersectionObserver();
          fallbackTimeout.value = setTimeout(() => {
            if (!autoPlayTriggered.value) {
              startVideoPlayback();
            }
          }, 1000);
        }, 100);
      });
    }
  }
};

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value
      .play()
      .then(() => {
        videoPlaying.value = true;
      })
      .catch(console.log);
  }
};

const onVideoPlay = () => {
  videoPlaying.value = true;
};

const onVideoLoaded = () => {
  if (videoPlayer.value) {
    const currentTab = videoTabs.value[activeTab.value];
    videoPlayer.value.playbackRate = currentTab.speed || 1.0;
    // Empieza el video en el segundo indicado por delaySeconds (default 0)
    const delay =
      typeof currentTab.delaySeconds === "number" ? currentTab.delaySeconds : 0;
    videoPlayer.value.currentTime = delay;
  }
};

const onLightroomVideoLoaded = () => {
  const lightroomVideoElement = document.querySelector(".integration-video");
  if (lightroomVideoElement) {
    lightroomVideoElement.playbackRate = 2;
  }
};

const updateProgress = () => {
  if (videoPlayer.value) {
    const currentTab = videoTabs.value[activeTab.value];
    let end = videoPlayer.value.duration;
    if (
      typeof currentTab.endSeconds === "number" &&
      currentTab.endSeconds > 0 &&
      currentTab.endSeconds < end
    ) {
      end = currentTab.endSeconds;
    }
    const progress =
      ((videoPlayer.value.currentTime - (currentTab.delaySeconds || 0)) /
        (end - (currentTab.delaySeconds || 0))) *
      100;
    videoProgress.value = Math.max(0, Math.min(progress, 100)) || 0;
    // Si llegó al final deseado, disparar onVideoEnded
    if (
      typeof currentTab.endSeconds === "number" &&
      videoPlayer.value.currentTime >= currentTab.endSeconds
    ) {
      videoPlayer.value.pause();
      videoPlayer.value.currentTime = end;
      onVideoEnded();
    }
  }
};

const onVideoEnded = () => {
  videoProgress.value = 100;
  videoPlaying.value = false;
  const nextTab = (activeTab.value + 1) % videoTabs.value.length;
  setTimeout(() => {
    setActiveTab(nextTab, true);
  }, 300);
};

const startVideoPlayback = () => {
  if (autoPlayTriggered.value) return;
  autoPlayTriggered.value = true;

  if (fallbackTimeout.value) {
    clearTimeout(fallbackTimeout.value);
    fallbackTimeout.value = null;
  }

  if (videoPlayer.value) {
    const playPromise = videoPlayer.value.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          videoPlaying.value = true;
        })
        .catch((error) => {
          console.log("Error playing video:", error);
          autoPlayTriggered.value = false;
        });
    }
  }
};

const setupIntersectionObserver = () => {
  if (!videoPlayer.value) return;

  if (observer.value) {
    observer.value.disconnect();
    observer.value = null;
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const isFullyVisible = entry.intersectionRatio === 1.0;
        const boundingRect = entry.boundingClientRect;
        const rootBounds = entry.rootBounds;

        const isCompletelyInView =
          boundingRect.top >= (rootBounds?.top || 0) &&
          boundingRect.left >= (rootBounds?.left || 0) &&
          boundingRect.bottom <= (rootBounds?.bottom || window.innerHeight) &&
          boundingRect.right <= (rootBounds?.right || window.innerWidth);

        const finallyVisible = isFullyVisible && isCompletelyInView;

        if (finallyVisible && !autoPlayTriggered.value) {
          setTimeout(() => {
            startVideoPlayback();
          }, 750);
        }
      });
    },
    {
      threshold: 1.0,
      rootMargin: "0px",
    },
  );

  observer.value.observe(videoPlayer.value);
};

// FAQ methods
const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = activeFAQ.value === index ? null : index;
  trackEvent("faq_toggle", {
    faq_index: index,
    action: wasOpen ? "close" : "open",
    question:
      faqs.value[index]?.question?.substring(0, 50) + "..." || `FAQ ${index}`,
  });
};

// Scroll-based animations
const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroVisible.value = true;
      }
    });
  }, observerOptions);

  const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        featuresVisible.value = true;
      }
    });
  }, observerOptions);

  const integrationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        integrationVisible.value = true;
      }
    });
  }, observerOptions);

  const sourcesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sourcesVisible.value = true;
      }
    });
  }, observerOptions);

  const freeToolsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        freeToolsVisible.value = true;
      }
    });
  }, observerOptions);

  const faqsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        faqsVisible.value = true;
      }
    });
  }, observerOptions);

  const searchPromoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        searchPromoVisible.value = true;
      }
    });
  }, observerOptions);

  if (heroSection.value) heroObserver.observe(heroSection.value);
  if (featuresSection.value) featuresObserver.observe(featuresSection.value);
  if (searchPromoSection.value)
    searchPromoObserver.observe(searchPromoSection.value);
  if (integrationSection.value)
    integrationObserver.observe(integrationSection.value);
  if (sourcesSection.value) sourcesObserver.observe(sourcesSection.value);
  if (freeToolsSection.value) freeToolsObserver.observe(freeToolsSection.value);
  if (faqsSection.value) faqsObserver.observe(faqsSection.value);
};

onMounted(() => {
  // Inicializar tema completo (el plugin ya aplicó las variables básicas)
  initTheme();

  // Hero is immediately visible
  heroVisible.value = true;

  // Load video
  if (videoPlayer.value) {
    videoPlayer.value.load();
  }

  nextTick(() => {
    setTimeout(() => {
      setupIntersectionObserver();
    }, 100);

    fallbackTimeout.value = setTimeout(() => {
      if (!autoPlayTriggered.value) {
        startVideoPlayback();
      }
    }, 7000);
  });

  // Setup scroll animations
  setupScrollAnimations();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
    observer.value = null;
  }
  if (fallbackTimeout.value) {
    clearTimeout(fallbackTimeout.value);
    fallbackTimeout.value = null;
  }
});

// Attach goToAuth('signup') to window for FAQ HTML link
if (typeof window !== "undefined") {
  window.__goToEarlyAccess = () => goToAuth("signup");
}
</script>
<style scoped>
/* ── Index Features Section ────────────────────────────────── */
.index-features-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-primary);
}

.index-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.index-feature-card {
  position: relative;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 20px;
  padding: 2rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 200px;
  text-decoration: none;
  color: inherit;
  display: block;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.index-feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.index-feature-bg-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 0.35;
  pointer-events: none;
  line-height: 1;
}

.index-feature-content {
  position: relative;
  z-index: 1;
}

.index-feature-accent {
  width: 32px;
  height: 3px;
  border-radius: 2px;
  margin-bottom: 0.85rem;
  opacity: 0.85;
}

.index-feature-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--premium-text-primary);
}

.index-feature-description {
  color: var(--premium-text-secondary);
  line-height: 1.65;
  font-size: 0.93rem;
}

.gradient-framer {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
}

.gradient-canvas {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
}

/* ── Search Promo Section ──────────────────────────────────── */
.search-promo-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  background: var(--premium-bg-secondary);
}
.search-promo-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.search-promo-layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}
.search-promo-layout.visible {
  opacity: 1;
  transform: translateY(0);
}
.search-promo-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.search-promo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.9rem;
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.35);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #60a5fa;
  width: fit-content;
  letter-spacing: 0.02em;
}
.search-promo-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0;
}
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.search-promo-description {
  font-size: 1rem;
  color: var(--premium-text-secondary);
  line-height: 1.75;
  margin: 0;
  max-width: 540px;
}
.search-promo-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.search-promo-visual {
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  transition: transform 0.4s ease;
}
.search-promo-visual:hover {
  transform: translateY(-6px);
}
.search-promo-video {
  width: 100%;
  height: auto;
  display: block;
}
@media (max-width: 968px) {
  .search-promo-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .search-promo-description {
    max-width: 100%;
  }
  .search-promo-section {
    padding: 4rem 1rem;
  }
}

.premium-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--premium-bg-nav);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--premium-border);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}
</style>
