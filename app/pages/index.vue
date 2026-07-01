<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div
        class="premium-landing"
        :class="{
          'has-announcement': heroAnnouncement.enabled && showAnnouncement,
        }"
        :style="{ '--announcement-height': announcementHeight + 'px' }"
      >
        <div
          v-if="heroAnnouncement.enabled && showAnnouncement"
          ref="announcementBarRef"
          class="announcement-bar"
        >
          <div class="announcement-content">
            <strong>{{ heroAnnouncement.label }}</strong>
            <span>{{ heroAnnouncement.message }}</span>
            <button class="announcement-link" @click="goToAuth('signup')">
              {{ heroAnnouncement.cta }}
            </button>
          </div>
          <button
            v-if="heroAnnouncement.dismissible"
            class="announcement-close"
            aria-label="Close announcement"
            @click="showAnnouncement = false"
          >
            ×
          </button>
        </div>
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
            <div class="hero-line line-1"></div>
            <div class="hero-line line-2"></div>
          </div>
          <div class="hero-container">
            <div
              class="hero-side hero-side-left"
              :class="{ visible: heroVisible }"
            >
              <img
                class="hero-side-image hero-side-image-left"
                :src="heroSideImages.left"
                alt="Photoreka archive preview"
              />
              <img
                v-if="
                  heroPhoneOverlay.enabled && heroPhoneOverlay.side === 'left'
                "
                class="hero-phone-overlay"
                :src="heroPhoneOverlay.image"
                :style="phoneOverlayStyle"
                alt="Photoreka mobile app"
              />
            </div>
            <div class="hero-content">
              <h1 class="hero-title" :class="{ visible: heroVisible }">
                Make full sense of
                <span class="gradient-text">
                  your photographic body of work</span
                >
              </h1>

              <p class="hero-description" :class="{ visible: heroVisible }">
                Organize, curate and discover patterns in your work with a range
                of <strong>smart tools built for photographers</strong>
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
              <div class="hero-trust" :class="{ visible: heroVisible }">
                <span class="hero-trust-label"
                  >Built for serious photo libraries</span
                >
                <span class="hero-rating">★★★★★</span>
              </div>
              <div class="hero-badge" :class="{ visible: heroVisible }">
                <span class="badge-content">
                  <n-icon size="16"><WalkOutline /></n-icon>Street
                  <n-icon size="16"><BookOpen16Regular /></n-icon>Documentary
                  <n-icon size="16"><ColorPaletteOutline /></n-icon>Artistic
                  <n-icon size="16"><PersonOutline /></n-icon>Lifestyle
                  <!-- <n-icon size="16"><ImageOutline /></n-icon>Travel -->
                  <n-icon size="16"><BriefcaseOutline /></n-icon>Commercial
                </span>
              </div>
            </div>
            <div
              class="hero-side hero-side-right"
              :class="{ visible: heroVisible }"
            >
              <img
                class="hero-side-image hero-side-image-right"
                :src="heroSideImages.right"
                alt="Photoreka workflow preview"
              />
              <img
                v-if="
                  heroPhoneOverlay.enabled && heroPhoneOverlay.side === 'right'
                "
                class="hero-phone-overlay"
                :src="heroPhoneOverlay.image"
                :style="phoneOverlayStyle"
                alt="Photoreka mobile app"
              />
            </div>
            <div
              class="hero-side hero-side-mobile"
              :class="{ visible: heroVisible }"
            >
              <img
                class="hero-side-image hero-side-image-mobile"
                :src="heroSideImages.mobile"
                alt="Photoreka preview"
              />
            </div>
          </div>
        </section>

        <!-- Features Section (componentized, variant-driven) -->
        <FeaturesShowcase
          :variant="featuresVariant"
          section-id="features"
          title="AI tools to organize, search, and curate your photos"
          subtitle="A smart photo organizer built for photographers who take their work seriously. Search with AI, score and rank, explore in 3D, and build portfolios from your photo library."
          :features="features"
        />

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

        <!-- 3d video section -->
        <!-- <section class="reports-hero" ref="reportsHeroSection">
          <div class="reports-hero-background">
            <div class="reports-gradient-orb reports-orb-1"></div>
            <div class="reports-gradient-orb reports-orb-2"></div>
            <div class="reports-gradient-orb reports-orb-3"></div>
          </div>
          <div class="reports-hero-container">
            <div class="reports-hero-layout">
              <div class="reports-hero-content">
                <div
                  class="reports-hero-badge"
                  :class="{ visible: reportsHeroVisible }"
                >
                  <span class="badge-content">
                    <n-icon size="16"><GitNetworkOutline /></n-icon>
                    3D Atlas
                  </span>
                </div>
                <h2
                  class="reports-hero-title"
                  :class="{ visible: reportsHeroVisible }"
                >
                  Explore your entire catalog
                  <span class="reports-gradient-text">in 3D space</span>
                </h2>
                <p
                  class="reports-hero-subtitle"
                  :class="{ visible: reportsHeroVisible }"
                >
                  Folders and grids flatten your work. The
                  <strong>3D Atlas</strong> maps every photo into an interactive
                  space where
                  <strong> visually similar images cluster together </strong>
                  automatically, powered by AI embeddings.<br /><br />
                  Fly through your collection, spot themes and patterns you
                  never noticed, and rediscover forgotten shots by exploring the
                  connections between them, not scrolling endless lists.
                </p>

                <div
                  class="reports-hero-actions"
                  :class="{ visible: reportsHeroVisible }"
                >
                  <n-button type="info" size="large" strong @click="goToDemo">
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Try the Demo
                  </n-button>
                  <n-button
                    strong
                    secondary
                    type="info"
                    size="large"
                    @click="goToSignup"
                  >
                    <template #icon>
                      <n-icon><KeyOutline /></n-icon>
                    </template>
                    {{ signupButtonLabel }}
                  </n-button>
                </div>
              </div>

              <div
                class="reports-hero-visual"
                :class="{ visible: reportsHeroVisible }"
              >
                <div class="reports-video-frame">
                  <video
                    class="reports-hero-video"
                    src="/videos/atlas_1.mp4"
                    poster="/home/video_poster.jpg"
                    ref="reportsHeroVideoRef"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </section> -->

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
  AnalyticsOutline,
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

// Dialog states
const showRequestDialog = ref(false);
const activeFAQ = ref(null);
const showAnnouncement = ref(true);
const announcementBarRef = ref(null);
const announcementHeight = ref(0);
let announcementResizeObserver = null;

const heroAnnouncement = ref({
  enabled: true,
  dismissible: true,
  label: "EARLY ACCESS",
  message:
    "Free starter photo package and usage credits are available for new photographers.",
  cta: "Try for Free",
});

const heroSideImages = {
  left: "/ai_photo_scoring/2.png",
  right: "/home/tag_cloud_poster_detailed.png",
  mobile: "/home/dashboard.png",
};

// ── Phone mockup overlay (the "movil con halo" image) ──────────
// Se superpone sobre una de las imágenes laterales del hero.
// Ajusta aquí posición/tamaño sin tocar el CSS:
//   side     → "left" | "right": sobre qué imagen lateral se superpone
//   width    → ancho del móvil en px
//   offsetX  → desplazamiento horizontal en px (+ derecha / - izquierda)
//   offsetY  → desplazamiento vertical en px (+ abajo / - arriba)
//   rotation → giro en grados
//   anchor   → "bottom" | "center" | "top": punto de anclaje vertical
//
// responsive → overrides por breakpoint. Cada clave es un ANCHO MÁXIMO de
//   viewport (px); cuando la ventana es <= esa clave se fusionan sus valores
//   sobre la config base. Se aplica el breakpoint más ajustado (el menor que
//   siga siendo >= al ancho actual), así el móvil se va encogiendo y
//   arrimándose al lado a medida que la pantalla se estrecha, igual que las
//   fotos laterales.
const heroPhoneOverlay = ref({
  enabled: true,
  side: "right",
  image: "/home/Photoreka_movil(con halo).png",
  width: 240,
  offsetX: -260,
  offsetY: 40,
  rotation: 0,
  anchor: "bottom",
  responsive: {
    1400: { width: 210, offsetX: -190 },
    1200: { width: 180, offsetX: -110 },
    1024: { width: 150, offsetX: -40 },
  },
});

// Ancho de viewport reactivo (SSR-safe: arranca con un valor de escritorio
// y se sincroniza en cliente al montar / al redimensionar).
const viewportWidth = ref(1920);
const syncViewportWidth = () => {
  viewportWidth.value = window.innerWidth;
};

// Config efectiva del móvil = base + override del breakpoint activo.
const activePhoneConfig = computed(() => {
  const base = heroPhoneOverlay.value;
  const bps = base.responsive || {};
  const match = Object.keys(bps)
    .map(Number)
    .sort((a, b) => a - b)
    .find((bp) => viewportWidth.value <= bp);
  return match ? { ...base, ...bps[match] } : base;
});

const phoneOverlayStyle = computed(() => {
  const o = activePhoneConfig.value;
  const style = {
    width: `${o.width}px`,
  };
  if (o.anchor === "top") {
    style.top = "0";
    style.transform = `translate(calc(-50% + ${o.offsetX}px), ${o.offsetY}px) rotate(${o.rotation}deg)`;
  } else if (o.anchor === "center") {
    style.top = "50%";
    style.transform = `translate(calc(-50% + ${o.offsetX}px), calc(-50% + ${o.offsetY}px)) rotate(${o.rotation}deg)`;
  } else {
    style.bottom = "0";
    style.transform = `translate(calc(-50% + ${o.offsetX}px), ${o.offsetY}px) rotate(${o.rotation}deg)`;
  }
  return style;
});

// Intersection observers for animations
const heroSection = ref(null);
const reportsHeroSection = ref(null);
const searchPromoSection = ref(null);
const integrationSection = ref(null);
const sourcesSection = ref(null);
const freeToolsSection = ref(null);
const faqsSection = ref(null);
const reportsHeroVideoRef = ref(null);

const heroVisible = ref(false);
const reportsHeroVisible = ref(false);
const searchPromoVisible = ref(false);
const integrationVisible = ref(false);
const sourcesVisible = ref(false);
const freeToolsVisible = ref(false);
const faqsVisible = ref(false);

// Which layout to render for the features section:
//   "grid"     → original card grid
//   "showcase" → alternating image + copy rows (see reference mockup)
const featuresVariant = ref("showcase");

// Features data
// `lead` + `bullets` + `image` are used by the "showcase" variant.
// If `bullets` is omitted the showcase falls back to splitting `description`.
const features = ref([
  {
    icon: markRaw(SearchOutline),
    title: "Natural Language Search",
    description:
      "Find any photo by describing it. Search for moods, scenes, lighting conditions, cinematic references, or abstract feelings. No keywords, no tagging—just describe what you remember and Photoreka finds it.",
    lead: "Find any photo just by describing it — no keywords, no tagging.",
    bullets: [
      "Search moods, scenes, lighting and cinematic references",
      "Broad, Adaptive and Precise search modes",
      "Just describe what you remember and Photoreka finds it",
    ],
    image: "/ai_photo_scoring/2.png",
    color: "#2563eb",
    link: "/ai_photo_search",
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
    image: "/home/tag_cloud_poster.png",
    color: "#06b6d4",
    link: "/photo_3D_atlas",
  },
  {
    icon: markRaw(Workspace),
    title: "Interactive Canvas",
    description:
      "Drag, arrange, and compose your photos freely on an infinite canvas. Drop any image and Photoreka surfaces visually or narratively similar photos from your archive to help you find the perfect pairing.",
    lead: "Drag, arrange and compose your photos freely on an infinite canvas.",
    bullets: [
      "Compose freely on an infinite canvas",
      "Drop an image to surface visually similar photos",
      "Find the perfect pairing from your archive",
    ],
    image: "/home/canvas_playground.png",
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
    image: "/ai_photo_scoring/5.png",
    color: "#f59e0b",
    link: "/photo_reports",
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
      "Photoreka is built for photographers who want to work with a curated body of work—not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 10,000 photos; up to 20,000 is workable but we recommend keeping it focused. Because the AI tools are built around curation—semantic search, visual clusters, scoring, sequencing—they work best when your archive already has a baseline of intentionality.",
  },
  {
    question: "Can I try Photoreka for free?",
    answer: `Analyzing your photos requires a single batch payment. Afterward, you can use most tools for free, with some daily/total limits, or purchase credits to work unlimitedly. <span style='color:var(--premium-primary);font-weight:var(--font-weight-semibold);'>During the <a href='#' style='color:var(--premium-primary);text-decoration:underline;' onclick='event.preventDefault();window.__goToEarlyAccess && window.__goToEarlyAccess()'>early access</a> phase, a free photo package and usage credits will be offered.</span>`,
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

const goToSignup = () => {
  goToAuth("signup");
};

const onRequestSuccess = () => {};

const onLightroomVideoLoaded = () => {
  const lightroomVideoElement = document.querySelector(".integration-video");
  if (lightroomVideoElement) {
    lightroomVideoElement.playbackRate = 2;
  }
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
    threshold: 0.1,
    rootMargin: "0px 0px 100px 0px",
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroVisible.value = true;
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

  const reportsHeroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reportsHeroVisible.value = true;
        // El video está fuera de pantalla con opacity:0 al cargar, por lo que
        // el autoplay muteado no dispara solo. Lo iniciamos explícitamente
        // cuando la sección entra al viewport.
        reportsHeroVideoRef.value?.play?.().catch(() => {});
      }
    });
  }, observerOptions);

  if (heroSection.value) heroObserver.observe(heroSection.value);
  if (reportsHeroSection.value)
    reportsHeroObserver.observe(reportsHeroSection.value);
  if (searchPromoSection.value)
    searchPromoObserver.observe(searchPromoSection.value);
  if (integrationSection.value)
    integrationObserver.observe(integrationSection.value);
  if (sourcesSection.value) sourcesObserver.observe(sourcesSection.value);
  if (freeToolsSection.value) freeToolsObserver.observe(freeToolsSection.value);
  if (faqsSection.value) faqsObserver.observe(faqsSection.value);
};

// Mantiene --announcement-height sincronizado con el alto real de la barra
// (padding/line-wrap deciden su alto, no un valor fijo), para que el nav y
// el hero no queden desalineados respecto a ella.
const syncAnnouncementHeight = () => {
  announcementHeight.value = announcementBarRef.value?.offsetHeight ?? 0;
};

watch(
  () => heroAnnouncement.value.enabled && showAnnouncement.value,
  (isVisible) => {
    if (!isVisible) {
      announcementHeight.value = 0;
      return;
    }
    nextTick(() => {
      syncAnnouncementHeight();
      if (announcementBarRef.value) {
        announcementResizeObserver?.disconnect();
        announcementResizeObserver = new ResizeObserver(syncAnnouncementHeight);
        announcementResizeObserver.observe(announcementBarRef.value);
      }
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  announcementResizeObserver?.disconnect();
  window.removeEventListener("resize", syncViewportWidth);
});

onMounted(() => {
  // Inicializar tema completo (el plugin ya aplicó las variables básicas)
  initTheme();

  // Hero is immediately visible
  heroVisible.value = true;

  // Sincroniza el ancho de viewport para el responsive del móvil superpuesto
  syncViewportWidth();
  window.addEventListener("resize", syncViewportWidth);

  // Setup scroll animations
  setupScrollAnimations();
});

// Attach goToAuth('signup') to window for FAQ HTML link
if (typeof window !== "undefined") {
  window.__goToEarlyAccess = () => goToAuth("signup");
}
</script>
<style scoped>
/* ── Home Hero Redesign ────────────────────────────────────── */
.premium-landing {
  --announcement-height: 0px;
}

.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  min-height: var(--announcement-height);
  padding: 0.35rem 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8dedb;
  color: #111827;
  font-size: var(--landing-fs-sm);
  line-height: var(--line-height-normal);
}

.announcement-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  text-align: center;
}

.announcement-content strong {
  color: #ff2f55;
  font-weight: var(--landing-fw-strong);
}

.announcement-link,
.announcement-close {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
}

.announcement-link {
  color: #ff2f55;
  font-weight: var(--landing-fw-strong);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.announcement-close {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #111827;
  font-size: var(--fs-xl);
  font-weight: var(--landing-fw-strong);
  line-height: var(--line-height-tight);
}

.premium-nav {
  top: var(--announcement-height);
}

.hero-section {
  min-height: 100vh;
  padding: calc(var(--announcement-height) + 72px) 0 0;
  align-items: stretch;
  overflow: hidden;
  background:
    linear-gradient(115deg, rgba(37, 99, 235, 0.1), transparent 22%),
    linear-gradient(245deg, rgba(6, 182, 212, 0.12), transparent 20%),
    var(--premium-bg);
}

.hero-background {
  opacity: 1;
  pointer-events: none;
}

.hero-line {
  position: absolute;
  width: 520px;
  height: 1px;
  background: var(--premium-border);
  transform-origin: left center;
}

.line-1 {
  left: -5rem;
  top: 12rem;
  transform: rotate(24deg);
}

.line-2 {
  right: -8rem;
  top: 6rem;
  transform: rotate(90deg);
}

.hero-container {
  width: 100%;
  max-width: none;
  min-height: calc(100vh - var(--announcement-height) - 72px - 4.5rem);
  padding: 0;
  display: grid;
  grid-template-columns: minmax(270px, 0.9fr) minmax(620px, 1fr) minmax(
      270px,
      0.9fr
    );
  align-items: center;
  /* gap: 3.5rem; */
}

.hero-content {
  gap: 1.45rem;
  max-width: 600px;
  margin: 0 auto;
}

.hero-badge,
.hero-title,
.hero-description,
.hero-trust,
.hero-side {
  opacity: 1;
  transform: none;
}

.hero-title {
  max-width: 680px;
  font-size: var(--landing-fs-title-hero);
  font-weight: var(--landing-fw-display);
  line-height: var(--landing-lh-title);
  letter-spacing: var(--landing-ls-heading);
  color: var(--premium-text-primary);
}

.hero-description {
  max-width: 620px;
  font-size: var(--landing-fs-body-lg);
  line-height: var(--landing-lh-body);
}

.hero-side {
  position: relative;
  opacity: 1;
  transform: none;
  transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.18s;
}

.hero-side.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.hero-side-left {
  transform: translateX(-15%);
}

.hero-side-right {
  transform: translateX(20%);
}

.hero-side-left.visible {
  opacity: 1;
  transform: translateX(-15%);
}

.hero-side-right.visible {
  opacity: 1;
  transform: translateX(15%);
}

.hero-side-image {
  display: block;
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  border: 1px solid var(--premium-shot-border);
  border-radius: 24px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.22),
    0 0 120px 8px var(--premium-shot-glow);
}

.hero-side-image-left {
  aspect-ratio: 0.9 / 1;
}

.hero-side-image-right {
  aspect-ratio: 0.85 / 1;
}

/* Móvil superpuesto sobre una imagen lateral. Posición/tamaño se
   controlan desde `heroPhoneOverlay` en el script (phoneOverlayStyle). */
.hero-phone-overlay {
  position: absolute;
  left: 50%;
  z-index: 5;
  height: auto;
  pointer-events: none;
  filter: drop-shadow(0 24px 60px rgba(0, 0, 0, 0.45));
}

.hero-side-mobile {
  display: none;
  justify-content: center;
}

.hero-side-image-mobile {
  aspect-ratio: auto;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  margin: 0 auto;
}

.hero-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--premium-text-secondary);
  font-size: var(--landing-fs-sm);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

.hero-trust.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-rating {
  color: #f59e0b;
  /* letter-spacing: 0.08em; */
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
  font-size: var(--landing-fs-caption);
  font-weight: var(--font-weight-bold);
  color: #60a5fa;
  width: fit-content;
}
.search-promo-title {
  font-size: var(--landing-fs-title-promo);
  font-weight: var(--landing-fw-strong);
  line-height: var(--landing-lh-title);
  letter-spacing: var(--landing-ls-heading);
  margin: 0;
}
.gradient-text {
  background: linear-gradient(135deg, #ffffff 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-theme="light"] .gradient-text {
  background: linear-gradient(135deg, #1e40af 0%, #0284c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.search-promo-description {
  font-size: var(--landing-fs-body);
  color: var(--premium-text-secondary);
  line-height: var(--landing-lh-body);
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

/* ── Reports Hero Section ──────────────────────────────────── */
.reports-hero {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;
  background: var(--premium-bg-primary);
}

.reports-hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.reports-hero-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

.reports-hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.reports-hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.reports-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 50px;
  font-size: var(--landing-fs-sm);
  font-weight: var(--font-weight-semibold);
  color: #06b6d4;
  width: fit-content;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reports-hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}

.reports-hero-title {
  font-size: var(--landing-fs-title-reports);
  font-weight: var(--landing-fw-strong);
  margin: 0;
  line-height: var(--landing-lh-title);
  letter-spacing: var(--landing-ls-heading);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reports-hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.reports-hero-subtitle {
  max-width: 580px;
  margin: 0;
  font-size: var(--landing-fs-body-lg);
  color: var(--premium-text-secondary);
  line-height: var(--landing-lh-body);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.reports-hero-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

.reports-hero-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.reports-hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

.reports-hero-visual {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--premium-shot-border);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 120px 8px var(--premium-shot-glow);
}

.reports-hero-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.reports-hero-visual:hover {
  transform: translateY(-8px) scale(1);
}

.reports-video-frame {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
}

.reports-hero-video {
  width: 100%;
  height: auto;
  display: block;
}

.reports-gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

.reports-gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.18;
  animation: reports-float 25s infinite ease-in-out;
  will-change: transform;
}

.reports-orb-1 {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  top: -300px;
  right: -200px;
}

.reports-orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  bottom: -200px;
  left: -250px;
  animation-delay: -10s;
}

.reports-orb-3 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -15s;
}

@keyframes reports-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

@media (max-width: 968px) {
  .hero-container {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 3.5rem;
    padding: 0 1.25rem;
  }

  .hero-section {
    padding-bottom: 3rem;
  }

  .hero-side-left,
  .hero-side-right {
    display: none;
  }

  .hero-side-mobile {
    display: flex;
    order: 2;
    margin: 0;
  }

  .hero-content {
    order: 1;
  }

  .hero-title {
    font-size: 3.6rem;
  }

  .search-promo-title {
    font-size: 2.5rem;
  }

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

  .reports-hero {
    padding: 4rem 1rem;
    min-height: auto;
  }

  .reports-hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .reports-hero-content {
    text-align: center;
    align-items: center;
  }

  .reports-hero-subtitle {
    max-width: 100%;
  }

  .reports-hero-actions {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .announcement-bar {
    display: none;
  }

  .hero-section {
    padding-top: calc(var(--announcement-height) + 64px + 2rem);
  }

  .hero-title {
    font-size: var(--landing-fs-title-hero-mobile);
  }

  .search-promo-title {
    font-size: var(--landing-fs-title-promo-mobile);
  }

  .hero-description {
    font-size: var(--fs-base);
  }

  .hero-trust {
    flex-direction: column;
    gap: 0.35rem;
  }

  .hero-side-image {
    max-height: 360px;
  }
}

.premium-nav {
  position: fixed;
  top: var(--announcement-height);
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
