<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="premium-landing">
        <!-- Navigation Header -->
        <nav class="premium-nav">
          <div class="nav-container">
            <div class="nav-brand">
              <AppLogo
                :layout="isMobileDevice() ? 'horizontal' : 'horizontal'"
                size="small"
              />
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
                v-if="!isMobileDevice()"
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
              <div
                v-if="true"
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
              <h1 class="hero-title" :class="{ visible: heroVisible }">
                Make full sense of your
                <span class="gradient-text"> photographic body of work</span>
              </h1>

              <p class="hero-description" :class="{ visible: heroVisible }">
                <strong>Photoreka</strong> is a
                <strong>Curation Lab</strong> for photographers who care about
                their archive.<br />
                See how your images relate to each other and understand your
                work as a whole.
                <br />Search in natural language, create meaningful sequences,
                and explore your catalog in 3D.
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
              <n-button type="info" size="large" @click="goToAuth('signup')">
                <template #icon>
                  <n-icon><KeyOutline /></n-icon>
                </template>
                <!-- Join the Waiting List -->
                Request Early Access
              </n-button>
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
              <h2 class="section-title">Connect your photos from anywhere</h2>
              <p class="section-subtitle">
                Photoreka works seamlessly with multiple photo sources. Import
                your images from wherever they live and start curating
                immediately.
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

        <!-- Free Tools Section -->
        <section id="tools" class="free-tools-section" ref="freeToolsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: freeToolsVisible }">
              <div class="tools-badge">
                <n-icon size="16"><Workspace /></n-icon>
                <span>Free Forever</span>
              </div>
              <h2 class="section-title">Try our free tools</h2>
              <p class="section-subtitle">
                No account needed. Start creating and experimenting right now
                with our professional-grade tools.
              </p>
            </div>

            <div class="tools-showcase" :class="{ visible: freeToolsVisible }">
              <!-- Free Framer Card -->
              <div class="tool-card tool-card-large tool-card-framer">
                <div class="tool-visual framer-visual">
                  <div class="tool-screenshot-wrapper">
                    <img
                      src="/home/free_framer.png"
                      alt="Free Framer Screenshot"
                      class="tool-screenshot"
                    />
                  </div>
                </div>
                <div class="tool-card-content">
                  <div class="tool-header">
                    <div class="tool-icon tool-icon-framer gradient-framer">
                      <n-icon size="28"><StopOutline /></n-icon>
                    </div>
                    <div class="tool-meta">
                      <h3 class="tool-title">Free Framer</h3>
                      <span class="tool-tag">Photo Framing Tool</span>
                    </div>
                  </div>
                  <p class="tool-description">
                    Add professional frames and borders to your photos
                    instantly. Perfect for presentations, portfolios, and social
                    media. Choose from multiple styles and customize colors to
                    match your vision.
                  </p>
                  <ul class="tool-features">
                    <li>
                      <n-icon size="16"><ColorPaletteOutline /></n-icon>
                      <span>Multiple frame styles and borders</span>
                    </li>
                    <li>
                      <n-icon size="16"><ImagesOutline /></n-icon>
                      <span>Customizable colors and sizes</span>
                    </li>
                    <li>
                      <n-icon size="16"><DownloadOutline /></n-icon>
                      <span>Batch export photos without limits</span>
                    </li>
                  </ul>
                  <n-button
                    type="warning"
                    size="large"
                    @click="goToFreeFramer"
                    class="tool-cta"
                  >
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Try Framer
                  </n-button>
                </div>
              </div>
              <!-- Canvas Playground Card -->
              <div class="tool-card tool-card-large">
                <div class="tool-card-content">
                  <div class="tool-header">
                    <div class="tool-icon gradient-canvas">
                      <n-icon size="32"><Workspace /></n-icon>
                    </div>
                    <div class="tool-meta">
                      <h3 class="tool-title">Canvas Playground</h3>
                      <span class="tool-tag">Interactive Design Tool</span>
                    </div>
                  </div>
                  <p class="tool-description">
                    Create stunning photo layouts and compositions with complete
                    creative freedom. Drag, drop, and arrange your photos to
                    tell your visual story. With a Photoreka account, find
                    related images from your collection.
                  </p>
                  <ul class="tool-features">
                    <li>
                      <n-icon size="16"><ColorPaletteOutline /></n-icon>
                      <span>Drop unlimited images</span>
                    </li>
                    <li>
                      <n-icon size="16"><ImagesOutline /></n-icon>
                      <span
                        >Find images by narrative or chromatic similarity</span
                      >
                    </li>
                    <li>
                      <n-icon size="16"><DownloadOutline /></n-icon>
                      <span>Intuitive drag and drop interface</span>
                    </li>
                  </ul>
                  <n-button
                    type="primary"
                    size="large"
                    @click="goToPlayground"
                    class="tool-cta"
                  >
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Launch Canvas
                  </n-button>
                </div>
                <div class="tool-visual canvas-visual">
                  <div class="tool-screenshot-wrapper">
                    <img
                      src="/home/canvas_playground.png"
                      alt="Canvas Playground Screenshot"
                      class="tool-screenshot"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQs Section -->
        <section id="faq" class="faqs-section" ref="faqsSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqsVisible }">
              <h2 class="section-title">Frequently asked questions</h2>
              <p class="section-subtitle">
                Find answers to the most common questions about Photoreka
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
  SunnyOutline,
  MoonOutline,
  WalkOutline,
  PersonOutline,
  ImageOutline,
  ColorPaletteOutline,
  SyncOutline,
  ChatbubblesOutline,
  ShareSocialOutline,
  DownloadOutline,
  StopOutline,
  PlayCircleOutline,
  ChevronDownOutline,
  KeyOutline,
} from "@vicons/ionicons5";
import { Workspace } from "@vicons/carbon";
import { BookOpen16Regular, Trophy20Regular } from "@vicons/fluent";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("home");

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
const integrationSection = ref(null);
const sourcesSection = ref(null);
const freeToolsSection = ref(null);
const faqsSection = ref(null);

const heroVisible = ref(false);
const featuresVisible = ref(false);
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
    delaySeconds: 2.2,
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
    icon: markRaw(SearchOutline),
    title: "Semantic Search",
    description:
      'Find photos instantly using natural language. Look for exact matches ("children playing"), or figurative ones ("Blade Runner-style photos").',
    color: "#2563eb",
  },
  {
    icon: markRaw(Workspace),
    title: "Canvas",
    description:
      "Create stunning photo layouts and compositions with our intuitive canvas tool. Drag, drop, resize, and arrange your photos to tell your story.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(Trophy20Regular),
    title: "Score Rankings",
    description:
      "Get automatic ratings of your photos and classify them according to different aesthetic criteria (composition, mood, originality, etc.)",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ImagesOutline),
    title: "Smart Curation",
    description:
      "Compile photos of specific themes or styles with the help of our smart curator. Get feedback on each photo and discover hidden insights and connections.",
    color: "#22c55e",
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
    icon: markRaw(LinkOutline),
    name: "More Integrations",
    description:
      "iCloud Photos, Dropbox, OneDrive, and more cloud storage providers coming soon.",
    color: "#6b7280",
    comingSoon: true,
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "What is Photoreka and who is it for?",
    answer:
      "Photoreka is a smart photo curation lab to help street, documentary, and artistic photographers organize, analyze, and understand their photographic body of work. It's ideal for professional and amateur photographers managing large volumes of images.",
  },
  {
    question: "How does Photoreka work?",
    answer:
      "Our pipeline of computer vision algorithms analyzes your photographs, identifying narrative and stylistic elements. This enables intelligent organization, advanced semantic searches, and the creation of visual connections between your images to facilitate the selection of your work. For detailed information on our image processing policies, please see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Is Photoreka a storage platform?",
    answer:
      "Photoreka is currently in a testing phase and focuses mainly on playful interaction and exploration with your photos. At this stage, it is not a full storage service. However, a centralized storage feature may be included in the future to help photographers fully manage and centralize their body of work. For details about how we handle your images, see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Does Photoreka create or transform images?",
    answer:
      "No. Photoreka is dedicated exclusively to the analysis and organization of photographic images. The platform does not generate synthetic images, alter, or transform your photos in any way. We do not support or endorse the creation or use of synthetic or manipulated images within Photoreka.",
  },
  {
    question: "What happens to my photos and who can see them?",
    answer:
      "We only store a reduced version of your images on secure servers—sufficient to facilitate searches and for common social media uses, but not for any other purpose. The analysis is performed using proprietary and third-party services under agreements that prevent retaining or reusing your photos. They are not shared with anyone and you always retain 100% of the rights to your work. For complete details, please read our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Can I try Photoreka for free?",
    answer: `Analyzing your photos requires a single batch payment. Afterward, you can use most tools for free, with some daily/total limits, or purchase credits to work unlimitedly. <span style='color:var(--premium-primary);font-weight:600;'>During the <a href='#' style='color:var(--premium-primary);text-decoration:underline;' onclick='event.preventDefault();window.__goToEarlyAccess && window.__goToEarlyAccess()'>early access</a> phase, a free photo package and usage credits will be offered.</span>`,
    hasHtml: true,
  },
]);

// Get runtime config
const config = useRuntimeConfig();

// Navigation methods
const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_page_premium", mode);
  if (mode === "signup") {
    showRequestDialog.value = true;
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
          }, 5000);
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

  if (heroSection.value) heroObserver.observe(heroSection.value);
  if (featuresSection.value) featuresObserver.observe(featuresSection.value);
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
    }, 10000);
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
.gradient-framer {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
}

.gradient-canvas {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
}
</style>
