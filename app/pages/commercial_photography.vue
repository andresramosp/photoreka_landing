<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="premium-landing commercial-landing">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <NuxtLink to="/">
                <AppLogo layout="horizontal" :height="45" />
              </NuxtLink>
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
                src="/ai_photo_scoring/1.png"
                alt="Commercial photo scoring with subject clarity and commercial intent in Photoreka"
              />
            </div>
            <div class="hero-content">
              <div class="hero-eyebrow" :class="{ visible: heroVisible }">
                <n-icon size="15"><BriefcaseOutline /></n-icon>
                For commercial photographers
              </div>
              <h1 class="hero-title" :class="{ visible: heroVisible }">
                Make full sense of
                <span class="gradient-text"> your commercial catalog</span>
              </h1>

              <p class="hero-description" :class="{ visible: heroVisible }">
                <strong>Photoreka</strong> is a suite of smart tools built for
                the way commercial photographers actually work.<br />

                <strong>Search</strong> your archive from a client brief,
                <strong>score</strong> shots for commercial intent, and
                <strong>assemble</strong> client-ready decks in minutes.<br />
                From a single <strong>campaign</strong> to your entire
                <strong>stock library</strong>.
              </p>

              <div class="hero-actions" :class="{ visible: heroVisible }">
                <n-button type="info" size="large" @click="goToDemo">
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
                  >AI curation built for commercial work</span
                >
                <span class="hero-rating">★★★★★</span>
              </div>

              <div class="hero-badge" :class="{ visible: heroVisible }">
                <span class="badge-content">
                  <n-icon size="16"><ShirtOutline /></n-icon>Fashion
                  <n-icon size="16"><BusinessOutline /></n-icon>Architecture
                  <n-icon size="16"><CafeOutline /></n-icon>Lifestyle
                  <n-icon size="16"><BagHandleOutline /></n-icon>Product
                  <n-icon size="16"><HeartOutline /></n-icon>Wedding
                </span>
              </div>
            </div>
            <div
              class="hero-side hero-side-right"
              :class="{ visible: heroVisible }"
            >
              <img
                class="hero-side-image hero-side-image-right"
                src="/portfolio_builder/2.png"
                alt="Client-ready commercial portfolio built with Photoreka AI"
              />
            </div>
            <div
              class="hero-side hero-side-mobile"
              :class="{ visible: heroVisible }"
            >
              <img
                class="hero-side-image hero-side-image-mobile"
                src="/home/dashboard.png"
                alt="Photoreka AI photo curation dashboard for commercial photographers"
              />
            </div>
          </div>
        </section>

        <!-- Commercial Genres Section (page-defining) -->
        <section id="genres" class="genres-section" ref="genresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: genresVisible }">
              <h2 class="section-title">Built for every commercial genre</h2>
              <p class="section-subtitle">
                Different briefs, different eyes. Photoreka adapts its scoring
                and curation to the commercial work you actually shoot — so the
                right frames rise to the top, whatever the assignment.
              </p>
            </div>

            <div class="genres-grid">
              <div
                v-for="(genre, index) in genres"
                :key="index"
                class="genre-card"
                :class="{ visible: genresVisible }"
                :style="{
                  transitionDelay: `${index * 90}ms`,
                  '--genre-color': genre.color,
                }"
              >
                <div class="genre-icon">
                  <n-icon size="26">
                    <component :is="genre.icon" />
                  </n-icon>
                </div>
                <h3 class="genre-name">{{ genre.name }}</h3>
                <p class="genre-description">{{ genre.description }}</p>
                <div class="genre-tags">
                  <span
                    v-for="(tag, ti) in genre.tags"
                    :key="ti"
                    class="genre-tag"
                    >{{ tag }}</span
                  >
                </div>
              </div>
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
              <div class="search-promo-content">
                <div class="search-promo-badge">
                  <n-icon size="15"><SearchOutline /></n-icon>
                  Brief-to-shot search
                </div>
                <h2 class="search-promo-title">
                  Pull the hero shot straight from
                  <span class="gradient-text">the client brief</span>
                </h2>
                <p class="search-promo-description">
                  A client asks for “warm, candid, natural light, product in
                  frame but not centered.” Type it. Photoreka reads your whole
                  archive and returns the frames that match — no tagging, no
                  scrubbing through folders. <strong>Broad</strong> for mood
                  boards, <strong>Adaptive</strong> for referenced looks, and
                  <strong>Precise</strong> when a brief has conditions that must
                  be verified, not approximated.
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
              <div class="search-promo-visual">
                <div class="video-frame">
                  <video
                    class="search-promo-video"
                    :src="'/videos/Search.mp4'"
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

        <!-- Features Section (commercial-tailored) -->
        <FeaturesShowcase
          variant="showcase"
          section-id="features"
          title="AI tools that move commercial work forward"
          subtitle="Score for commercial intent, build client-ready selections, and understand which of your styles actually lands the job — all on top of your existing library."
          :features="features"
        />

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
                    src="/videos/lr_plugin.mp4"
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
                  <h2 class="integration-title">Straight from your catalog</h2>
                </div>
                <p class="integration-description">
                  Commercial work lives in Lightroom Classic — so Photoreka
                  meets it there. Sync a shoot, search it by brief, and push
                  your selects to Photoreka without breaking the delivery
                  workflow your clients already expect.
                </p>

                <ul class="integration-features">
                  <li>
                    <div class="feature-icon-wrapper" style="color: #f59e0b">
                      <n-icon size="18"><SyncOutline /></n-icon>
                    </div>
                    <span>Sync a full shoot or a single campaign</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #ec4899">
                      <n-icon size="28"><ChatbubblesOutline /></n-icon>
                    </div>
                    <span>Search by brief in natural language</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #8b5cf6">
                      <n-icon size="18"><ShareSocialOutline /></n-icon>
                    </div>
                    <span>One-click selects transfer to Photoreka</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #22c55e">
                      <n-icon size="18"><LinkOutline /></n-icon>
                    </div>
                    <span>Fits your existing client delivery flow</span>
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

        <!-- Data Sources Section -->
        <section id="sources" class="sources-section" ref="sourcesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: sourcesVisible }">
              <h2 class="section-title">
                Bring in work from wherever it lives
              </h2>
              <p class="section-subtitle">
                Campaigns, stock, client galleries — Photoreka connects to the
                sources you already use. Import from Lightroom, Google Photos,
                Dropbox, or local files and start curating with AI immediately.
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

        <!-- FAQs Section -->
        <section id="faq" class="faqs-section" ref="faqsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqsVisible }">
              <h2 class="section-title">
                Questions from commercial photographers
              </h2>
              <p class="section-subtitle">
                How Photoreka fits into a paid, deadline-driven workflow
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
                  <p>{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
  SearchOutline,
  CloudUploadOutline,
  CubeOutline,
  LinkOutline,
  LogoDropbox,
  SunnyOutline,
  MoonOutline,
  BriefcaseOutline,
  ShirtOutline,
  BusinessOutline,
  CafeOutline,
  BagHandleOutline,
  HeartOutline,
  DiamondOutline,
  StorefrontOutline,
  SyncOutline,
  ChatbubblesOutline,
  ShareSocialOutline,
  DownloadOutline,
  PlayCircleOutline,
  ChevronDownOutline,
  KeyOutline,
  InformationCircleOutline,
  BarChartOutline,
  LayersOutline,
  AnalyticsOutline,
} from "@vicons/ionicons5";
import { Trophy20Regular } from "@vicons/fluent";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("commercial_photography", {
  robots: "noindex, nofollow, noarchive",
});

const { isMobile } = useMobileDevice();

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

const toggleTheme = () => {
  baseToggleTheme();
};

const showRequestDialog = ref(false);
const activeFAQ = ref(null);

// Commercial genres — the page-defining block.
const genres = ref([
  {
    icon: markRaw(ShirtOutline),
    name: "Fashion",
    description:
      "Cut editorial and lookbook shoots down to the frames with the strongest styling, pose, and light — before the retouch queue.",
    tags: ["Editorial", "Lookbook", "Campaign"],
    color: "#ec4899",
  },
  {
    icon: markRaw(BusinessOutline),
    name: "Architecture",
    description:
      "Surface the cleanest lines, best verticals, and most sellable angles across an interiors or exteriors set in seconds.",
    tags: ["Interiors", "Real estate", "Spaces"],
    color: "#06b6d4",
  },
  {
    icon: markRaw(CafeOutline),
    name: "Lifestyle",
    description:
      "Find the authentic, in-the-moment frames brands buy — candid warmth scored above the staged and the stiff.",
    tags: ["Candid", "Brand", "Stock"],
    color: "#f59e0b",
  },
  {
    icon: markRaw(BagHandleOutline),
    name: "Product",
    description:
      "Rank shots on subject clarity and commercial intent, so the packshot that actually converts rises to the top.",
    tags: ["Packshot", "E-commerce", "Catalog"],
    color: "#8b5cf6",
  },
  {
    icon: markRaw(HeartOutline),
    name: "Wedding",
    description:
      "Turn a 3,000-frame wedding into a tight, emotional gallery — first selects done before the couple even asks.",
    tags: ["Gallery", "Album", "Delivery"],
    color: "#22c55e",
  },
]);

// Features — reframed around commercial deliverables.
const features = ref([
  {
    icon: markRaw(Trophy20Regular),
    title: "Commercial Scoring",
    description:
      "Score every frame for commercial intent and subject clarity, alongside aesthetics and composition.",
    lead: "Score every frame the way a client would — then rank the set automatically.",
    bullets: [
      "Commercial mode adds subject clarity and commercial intent scores",
      "Rank a full shoot by what's actually sellable",
      "Surface the packshot or hero frame without hunting",
    ],
    image: "/ai_photo_scoring/1.png",
    color: "#f59e0b",
    link: "/photo_scoring",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Client-Ready Portfolios",
    description:
      "Turn a full shoot into a curated, sequenced deck for the client in minutes.",
    lead: "Turn a shoot into a client-ready, sequenced selection in minutes.",
    bullets: [
      "Score across artistic and commercial dimensions",
      "Pick a coherence mode: visual, chromatic, narrative and more",
      "Let AI sequence the deck for a clean pitch flow",
    ],
    images: [
      "/portfolio_builder/0.png",
      "/portfolio_builder/1.png",
      "/portfolio_builder/2.png",
      "/portfolio_builder/3.png",
      "/portfolio_builder/4.png",
      "/portfolio_builder/5.png",
    ],
    color: "#ec4899",
    link: "/photography_portfolio_builder",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Photo Chat for Selects",
    description:
      "Ask your archive for the strongest frames of a look, get honest critique, and build a selection in plain language.",
    lead: "Talk to your archive to build selects and get an honest second eye.",
    bullets: [
      "Ask for the best frames of a style, product or setup",
      "Get evidence-based critique before you send to a client",
      "Assemble curated selections conversationally",
    ],
    image: "/chatlab/1.png",
    color: "#8b5cf6",
    link: "/photo_chat",
    demoLink: "/demo/chatlab",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "What Style Sells",
    description:
      "See the recurring looks, palettes, and compositions across your commercial archive — and which ones win work.",
    lead: "Understand which of your styles actually lands the job.",
    bullets: [
      "Surface recurring looks, palettes and framing habits",
      "See your commercial signature from the outside",
      "Spot the gaps between what you shoot and what sells",
    ],
    image: "/report/3.png",
    color: "#06b6d4",
    link: "/photo_reports",
  },
  {
    icon: markRaw(CubeOutline),
    title: "Stock Library Atlas",
    description:
      "Map a large stock or campaign archive into 2D/3D space where similar frames cluster automatically.",
    lead: "Navigate a big stock library as a map, not an endless grid.",
    bullets: [
      "Cluster similar frames across thousands of shots",
      "Spot near-duplicates and over-shot setups fast",
      "Rediscover sellable frames buried in the archive",
    ],
    image: "/atlas/2d.png",
    color: "#14b8a6",
    link: "/photo_3D_atlas",
    demoLink: "/demo/2d-atlas",
  },
]);

// Data sources (shared with the main landing).
const dataSources = ref([
  {
    icon: markRaw(CloudUploadOutline),
    name: "Local Files",
    description:
      "Upload a shoot directly from your computer. Supports all major image formats (JPEG, PNG, TIFF).",
    color: "#22c55e",
    comingSoon: false,
  },
  {
    logo: "/logos/google_photos.png",
    name: "Google Photos",
    description:
      "Sync client galleries and shared libraries with one click. Keep campaigns organized across platforms.",
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
      "Sync Dropbox delivery folders directly with Photoreka. Works with any structure you already use.",
    color: "#0061FF",
    comingSoon: false,
  },
]);

// FAQs — commercial-specific.
const faqs = ref([
  {
    question: "What does Photoreka do for commercial photographers?",
    answer:
      "Photoreka helps you curate faster on paid work. It scores your frames for commercial intent and subject clarity, ranks a shoot by what's actually sellable, lets you search an archive from a client brief in natural language, and assembles sequenced, client-ready selections — across fashion, architecture, lifestyle, product, and wedding work.",
  },
  {
    question: "What is commercial scoring and how is it different?",
    answer:
      "On top of the standard artistic dimensions (aesthetics, composition, narrative, originality), commercial mode activates two extra scores: subject clarity — how clean and readable the main subject is — and commercial intent — how usable a frame is for a brand, catalog, or campaign. That means a technically sharp packshot ranks above a moody frame that would never pass a client review.",
  },
  {
    question: "Can it handle a full wedding or a large stock library?",
    answer:
      "Yes. Photoreka is built to take a few thousand frames from a wedding or campaign and surface your strongest selects, with near-duplicate detection to cut the over-shot setups. The sweet spot is a curated body of work up to about 20,000 photos, with up to 50,000 workable.",
  },
  {
    question: "Does Photoreka retouch, generate, or alter my images?",
    answer:
      "No. Photoreka only analyzes, organizes, and curates your existing photographs. It never generates synthetic images or edits your files. It's a curation engine that works alongside your editing and delivery tools — not a replacement for them.",
  },
  {
    question: "Who owns the rights to the work I upload?",
    answer:
      "You do — 100%. We only store reduced versions of your images to power search and curation, analyzed under agreements that prevent retaining or reusing your photos. Your work is never shared, and you keep full rights and client confidentiality.",
  },
  {
    question: "Can I try it before paying?",
    answer:
      "Yes. During the early access phase a free photo package and usage credits are available. Analyzing a batch requires a single payment, after which most tools are free within daily limits, or unlimited with credits.",
  },
]);

const config = useRuntimeConfig();
const { isOpenMode, signupButtonLabel } = useRegistrationMode();

const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_commercial", mode);
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

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "landing_commercial");
  window.open("https://app.photoreka.com/demo/dashboard", "_blank");
};

const goToSearchDemo = () => {
  trackUserAction("navigate_to_search_demo", "landing_commercial");
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

const onRequestSuccess = () => {};

const onLightroomVideoLoaded = () => {
  const el = document.querySelector(".integration-video");
  if (el) el.playbackRate = 2;
};

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

// Scroll-reveal
const heroSection = ref(null);
const genresSection = ref(null);
const searchPromoSection = ref(null);
const integrationSection = ref(null);
const sourcesSection = ref(null);
const faqsSection = ref(null);

const heroVisible = ref(false);
const genresVisible = ref(false);
const searchPromoVisible = ref(false);
const integrationVisible = ref(false);
const sourcesVisible = ref(false);
const faqsVisible = ref(false);

const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px 100px 0px",
  };

  const make = (flag) =>
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) flag.value = true;
      });
    }, observerOptions);

  const observers = [
    [heroSection, make(heroVisible)],
    [genresSection, make(genresVisible)],
    [searchPromoSection, make(searchPromoVisible)],
    [integrationSection, make(integrationVisible)],
    [sourcesSection, make(sourcesVisible)],
    [faqsSection, make(faqsVisible)],
  ];

  observers.forEach(([elRef, obs]) => {
    if (elRef.value) obs.observe(elRef.value);
  });
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
});
</script>

<style scoped>
/* ══════════════════════════════════════════════════════════════
   COMMERCIAL LANDING — warm-accent variation of the main hero.
   Theme touch: a gold → rose accent replaces the blue/cyan of the
   primary landing, scoped entirely to this page.
   ══════════════════════════════════════════════════════════════ */
.commercial-landing {
  --c-gold: #f59e0b;
  --c-rose: #ec4899;
  --c-warm: #d97706;
}

/* Warm gradient text overrides the global blue/cyan one (page-scoped) */
.commercial-landing .gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-theme="light"] .commercial-landing .gradient-text {
  background: linear-gradient(135deg, #b45309 0%, #be185d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-rating {
  color: var(--c-gold);
}

/* ── Hero (3-column layout, mirrors the main landing) ──────────── */
.premium-nav {
  position: fixed;
  top: 0;
}

.hero-section {
  min-height: 100vh;
  padding: 72px 0 0;
  align-items: stretch;
  overflow: hidden;
  background:
    linear-gradient(115deg, rgba(245, 158, 11, 0.12), transparent 22%),
    linear-gradient(245deg, rgba(236, 72, 153, 0.12), transparent 20%),
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
  min-height: calc(100vh - 72px - 4.5rem);
  padding: 0;
  display: grid;
  grid-template-columns: minmax(270px, 0.9fr) minmax(620px, 1fr) minmax(
      270px,
      0.9fr
    );
  align-items: center;
}

.hero-content {
  gap: 1.45rem;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: var(--c-gold);
  font-size: var(--landing-fs-caption, 0.75rem);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

[data-theme="light"] .hero-eyebrow {
  color: var(--c-warm);
}

@media (max-width: 1280px) {
  .hero-container {
    grid-template-columns: minmax(220px, 0.75fr) minmax(540px, 1fr) minmax(
        220px,
        0.75fr
      );
  }

  .hero-content {
    max-width: 560px;
    padding-inline: 0.5rem;
  }

  .hero-side-left {
    transform: translateX(-6%);
  }

  .hero-side-right {
    transform: translateX(12%);
  }

  .hero-title {
    max-width: 460px;
  }

  .hero-description {
    max-width: 560px;
  }
}

.hero-title {
  max-width: 500px;
  font-size: var(--landing-fs-title-hero);
  font-weight: var(--landing-fw-display);
  line-height: var(--landing-lh-title);
  letter-spacing: var(--landing-ls-heading);
  color: var(--premium-text-primary);
  opacity: 1;
  transform: none;
  margin: 0;
}

.hero-description {
  max-width: 620px;
  font-size: var(--landing-fs-body-lg);
  line-height: var(--landing-lh-body);
  opacity: 1;
  transform: none;
}

.hero-actions {
  display: inline-flex;
  gap: 1rem;
}

.hero-side {
  position: relative;
  opacity: 1;
  transform: none;
  transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.18s;
}

.hero-side-left {
  transform: translateX(-10%);
}

.hero-side-right {
  transform: translateX(17%);
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
    0 0 120px 8px rgba(245, 158, 11, 0.12);
}

.hero-side-image-left {
  aspect-ratio: 0.9 / 1;
}

.hero-side-image-right {
  aspect-ratio: 0.85 / 1;
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
}

/* Warm badge tint (overrides the global blue badge) */
.commercial-landing .hero-badge {
  background: linear-gradient(
    120deg,
    rgba(245, 158, 11, 0.14),
    rgba(236, 72, 153, 0.08)
  );
  border: 1px solid rgba(245, 158, 11, 0.28);
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.06);
}

/* ── Genres Section ────────────────────────────────────────────── */
.genres-section {
  padding: 6rem 2rem;
  background: var(--premium-bg);
}

.genres-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.genre-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.75rem;
  background: var(--premium-bg-card, var(--premium-surface));
  border: 1px solid var(--premium-border);
  border-radius: 20px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.genre-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.genre-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--genre-color);
  opacity: 0.9;
}

.genre-card:hover {
  border-color: color-mix(in srgb, var(--genre-color) 45%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.2);
}

.genre-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 14px;
  color: var(--genre-color);
  background: color-mix(in srgb, var(--genre-color) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--genre-color) 30%, transparent);
}

.genre-name {
  font-size: var(--fs-xl, 1.25rem);
  font-weight: var(--font-weight-bold);
  color: var(--premium-text-primary);
  margin: 0;
}

.genre-description {
  font-size: var(--landing-fs-sm, 0.9rem);
  color: var(--premium-text-secondary);
  line-height: var(--landing-lh-body, 1.6);
  margin: 0;
  flex-grow: 1;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.genre-tag {
  font-size: 0.7rem;
  font-weight: var(--font-weight-semibold);
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  color: var(--premium-text-secondary);
  background: color-mix(in srgb, var(--genre-color) 10%, transparent);
  border: 1px solid var(--premium-border);
}

/* ── Search Promo Section ──────────────────────────────────────── */
.search-promo-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  background: var(--premium-bg-secondary, var(--premium-surface));
}

.search-promo-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.commercial-landing .search-promo-bg .orb-1 {
  background: radial-gradient(
    circle,
    rgba(245, 158, 11, 0.5) 0%,
    transparent 70%
  );
}

.commercial-landing .search-promo-bg .orb-2 {
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.4) 0%,
    transparent 70%
  );
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
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 50px;
  font-size: var(--landing-fs-caption, 0.75rem);
  font-weight: var(--font-weight-bold);
  color: var(--c-gold);
  width: fit-content;
}

[data-theme="light"] .search-promo-badge {
  color: var(--c-warm);
}

.search-promo-title {
  font-size: var(--landing-fs-title-promo);
  font-weight: var(--landing-fw-strong);
  line-height: var(--landing-lh-title);
  letter-spacing: var(--landing-ls-heading);
  margin: 0;
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
  overflow: visible;
  transition: transform 0.4s ease;
}

.search-promo-visual:hover {
  transform: translateY(-6px);
}

.search-promo-visual .video-frame {
  transform: scale(1.1);
}

.search-promo-video {
  width: 100%;
  height: auto;
  display: block;
}

/* ── Responsive ────────────────────────────────────────────────── */
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

  .search-promo-section,
  .genres-section {
    padding: 4rem 1rem;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding-top: calc(64px + 2rem);
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
</style>
