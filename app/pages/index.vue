<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="home-landing">
        <nav class="home-nav">
          <div class="home-nav-inner">
            <NuxtLink to="/" class="home-brand" aria-label="Photoreka home">
              <AppLogo layout="horizontal" :height="42" />
            </NuxtLink>

            <div class="home-nav-links" aria-label="Primary navigation">
              <a href="#features">Platform</a>
              <a href="#lightroom_plugin">Lightroom</a>
              <a href="#sources">Sources</a>
              <a href="#tools">Free tools</a>
              <a href="#faq">FAQ</a>
            </div>

            <div class="home-nav-actions">
              <button
                v-if="canToggleTheme(true)"
                class="theme-toggle home-icon-button"
                type="button"
                @click="toggleTheme"
                aria-label="Toggle theme"
              >
                <n-icon size="18">
                  <component
                    :is="themeMode === 'dark' ? SunnyOutline : MoonOutline"
                  />
                </n-icon>
              </button>
              <n-button quaternary type="info" @click="goToAuth('login')">
                Sign in
              </n-button>
              <n-button type="info" @click="goToAuth('signup')">
                {{ signupButtonLabel }}
              </n-button>
            </div>
          </div>
        </nav>

        <main>
          <section id="hero" ref="heroSection" class="home-hero">
            <div class="home-hero-grid" aria-hidden="true"></div>
            <div class="home-container hero-shell">
              <div class="hero-copy">
                <div class="home-kicker" :class="{ visible: heroVisible }">
                  <span>AI curation lab</span>
                  <span>Built for working photographers</span>
                </div>

                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Make full sense of your photographic body of work
                </h1>

                <p class="hero-description" :class="{ visible: heroVisible }">
                  <strong>Photoreka</strong> is a suite of
                  <strong>smart tools</strong> to help you
                  <strong>curate your photos</strong>. Upload a
                  <strong>specific project</strong>, a
                  <strong>curated selection</strong>, or your whole
                  <strong>photo library</strong>. Search in
                  <strong>natural language</strong>, rank by
                  <strong>aesthetics</strong>, and explore your catalog in
                  <strong>3D</strong>.
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

                <div class="discipline-strip" :class="{ visible: heroVisible }">
                  <div
                    v-for="discipline in disciplines"
                    :key="discipline.label"
                    class="discipline-chip"
                  >
                    <n-icon size="16"
                      ><component :is="discipline.icon"
                    /></n-icon>
                    <span>{{ discipline.label }}</span>
                  </div>
                </div>

                <div class="hero-metrics" :class="{ visible: heroVisible }">
                  <div
                    v-for="metric in heroMetrics"
                    :key="metric.label"
                    class="hero-metric"
                  >
                    <strong>{{ metric.value }}</strong>
                    <span>{{ metric.label }}</span>
                  </div>
                </div>
              </div>

              <div class="hero-product" :class="{ visible: heroVisible }">
                <div class="product-window">
                  <div class="product-topbar">
                    <div class="window-controls" aria-hidden="true">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="product-path">Photoreka / archive atlas</div>
                    <div class="product-status">
                      <span></span>
                      Live analysis
                    </div>
                  </div>

                  <div class="product-body">
                    <aside class="product-sidebar">
                      <div class="sidebar-heading">Project</div>
                      <div
                        v-for="item in sidebarItems"
                        :key="item.label"
                        class="sidebar-item"
                        :class="{ active: item.active }"
                      >
                        <n-icon size="16"><component :is="item.icon" /></n-icon>
                        <span>{{ item.label }}</span>
                      </div>
                    </aside>

                    <div class="product-stage">
                      <div class="query-panel">
                        <span>Natural language search</span>
                        <strong
                          >quiet street scenes with reflected light</strong
                        >
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
                          playsinline
                          preload="metadata"
                        ></video>
                        <div class="video-progress-rail" aria-hidden="true">
                          <span :style="{ width: `${videoProgress}%` }"></span>
                        </div>
                      </div>

                      <div class="analysis-strip">
                        <div
                          v-for="signal in archiveSignals"
                          :key="signal.label"
                          class="analysis-signal"
                        >
                          <span>{{ signal.label }}</span>
                          <strong>{{ signal.value }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="workflow-section">
            <div class="home-container workflow-grid">
              <div class="workflow-copy">
                <span class="section-eyebrow">Studio pipeline</span>
                <h2>From archive intake to editorial decisions.</h2>
                <p>
                  Photoreka behaves less like generic cloud storage and more
                  like a professional review room for photographic work.
                </p>
              </div>

              <div class="workflow-steps">
                <div
                  v-for="(step, index) in workflowSteps"
                  :key="step.title"
                  class="workflow-step"
                >
                  <span>{{ String(index + 1).padStart(2, "0") }}</span>
                  <div>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" ref="featuresSection" class="home-section">
            <div class="home-container feature-layout">
              <div
                class="section-header align-left"
                :class="{ visible: featuresVisible }"
              >
                <span class="section-eyebrow">AI tools</span>
                <h2 class="section-title">
                  Organize, search, and curate your photos with technical
                  control
                </h2>
                <p class="section-subtitle">
                  A smart photo organizer built for photographers who take their
                  work seriously. Search with AI, score and rank, explore in 3D,
                  and build portfolios from your photo library.
                </p>
              </div>

              <div class="feature-grid">
                <component
                  :is="feature.link ? 'NuxtLink' : 'div'"
                  v-for="(feature, index) in features"
                  :key="feature.title"
                  :to="feature.link || undefined"
                  class="feature-card"
                  :class="[
                    `tone-${feature.tone}`,
                    { visible: featuresVisible, clickable: feature.link },
                  ]"
                  :style="{ transitionDelay: `${index * 70}ms` }"
                >
                  <div class="feature-card-top">
                    <div class="feature-glyph">
                      <n-icon size="22"
                        ><component :is="feature.icon"
                      /></n-icon>
                    </div>
                    <span>{{ feature.scope }}</span>
                  </div>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </component>
              </div>
            </div>
          </section>

          <section
            id="lightroom_plugin"
            ref="integrationSection"
            class="home-section integration-section"
          >
            <div class="home-container integration-grid">
              <div
                class="integration-preview"
                :class="{ visible: integrationVisible }"
              >
                <div class="product-window compact-window">
                  <div class="product-topbar">
                    <div class="window-controls" aria-hidden="true">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="product-path">Lightroom Classic / Plugin</div>
                  </div>
                  <div class="integration-video-frame">
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
              </div>

              <div
                class="integration-content"
                :class="{ visible: integrationVisible }"
              >
                <span class="section-eyebrow">Official plugin</span>
                <div class="integration-heading">
                  <img
                    src="/logos/lightroom_logo.png"
                    alt="Adobe Lightroom"
                    class="integration-logo"
                  />
                  <h2>Lightroom Integration</h2>
                </div>
                <p>
                  Seamlessly connect Photoreka with Adobe Lightroom Classic.
                  Sync your catalog, search by natural language directly from
                  Lightroom, and bring intelligent curation to your existing
                  workflow.
                </p>

                <ul class="integration-feature-list">
                  <li
                    v-for="item in integrationFeatures"
                    :key="item.label"
                    :class="`tone-${item.tone}`"
                  >
                    <div class="feature-icon-wrapper">
                      <n-icon size="18"><component :is="item.icon" /></n-icon>
                    </div>
                    <span>{{ item.label }}</span>
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
                  <span>Free with Photoreka account</span>
                </div>
              </div>
            </div>
          </section>

          <section
            id="sources"
            ref="sourcesSection"
            class="home-section sources-section"
          >
            <div class="home-container">
              <div class="section-header" :class="{ visible: sourcesVisible }">
                <span class="section-eyebrow">Ingestion</span>
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
                  :key="source.name"
                  class="source-card"
                  :class="[
                    `tone-${source.tone}`,
                    {
                      visible: sourcesVisible,
                      'coming-soon': source.comingSoon,
                    },
                  ]"
                  :style="{ transitionDelay: `${index * 80}ms` }"
                >
                  <div class="source-icon">
                    <n-icon v-if="!source.logo" size="30">
                      <component :is="source.icon" />
                    </n-icon>
                    <img
                      v-else
                      :src="source.logo"
                      :alt="source.name"
                      class="source-logo-img"
                    />
                  </div>
                  <div>
                    <h3>{{ source.name }}</h3>
                    <p>{{ source.description }}</p>
                  </div>
                  <span class="source-badge">
                    {{ source.comingSoon ? "Coming Soon" : "Available Now" }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            id="tools"
            ref="freeToolsSection"
            class="home-section tools-section"
          >
            <div class="home-container">
              <div
                class="section-header"
                :class="{ visible: freeToolsVisible }"
              >
                <span class="section-eyebrow">Free forever</span>
                <h2 class="section-title">Try our free tools</h2>
                <p class="section-subtitle">
                  No account needed. Start creating and experimenting right now
                  with professional-grade tools.
                </p>
              </div>

              <div
                class="tools-showcase"
                :class="{ visible: freeToolsVisible }"
              >
                <article
                  v-for="tool in freeTools"
                  :key="tool.title"
                  class="tool-card"
                  :class="[{ reverse: tool.reverse }, `tone-${tool.tone}`]"
                >
                  <div class="tool-visual">
                    <img :src="tool.image" :alt="tool.alt" />
                  </div>
                  <div class="tool-content">
                    <div class="tool-heading">
                      <div class="tool-icon">
                        <n-icon size="24"><component :is="tool.icon" /></n-icon>
                      </div>
                      <div>
                        <h3>{{ tool.title }}</h3>
                        <span>{{ tool.tag }}</span>
                      </div>
                    </div>
                    <p>{{ tool.description }}</p>
                    <ul>
                      <li v-for="item in tool.features" :key="item">
                        <n-icon size="15"><InformationCircleOutline /></n-icon>
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                    <n-button
                      :type="tool.buttonType"
                      size="large"
                      class="tool-cta"
                      @click="tool.action"
                    >
                      <template #icon>
                        <n-icon><PlayCircleOutline /></n-icon>
                      </template>
                      {{ tool.cta }}
                    </n-button>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="faq" ref="faqsSection" class="home-section faqs-section">
            <div class="home-container faq-grid">
              <div
                class="section-header align-left"
                :class="{ visible: faqsVisible }"
              >
                <span class="section-eyebrow">Questions</span>
                <h2 class="section-title">
                  Frequently asked questions about Photoreka
                </h2>
                <p class="section-subtitle">
                  Everything you need to know about using AI to curate and
                  organize your photos.
                </p>
              </div>

              <div class="faqs-container" :class="{ visible: faqsVisible }">
                <div
                  v-for="(faq, index) in faqs"
                  :key="faq.question"
                  class="faq-item"
                  :class="{ active: activeFAQ === index }"
                >
                  <button
                    class="faq-question"
                    type="button"
                    @click="toggleFAQ(index)"
                  >
                    <span>{{ faq.question }}</span>
                    <n-icon
                      size="20"
                      class="faq-icon"
                      :class="{ rotated: activeFAQ === index }"
                    >
                      <ChevronDownOutline />
                    </n-icon>
                  </button>
                  <div v-show="activeFAQ === index" class="faq-answer">
                    <p v-if="faq.hasEarlyAccess">
                      Analyzing your photos requires a single batch payment.
                      Afterward, you can use most tools for free, with some
                      daily/total limits, or purchase credits to work
                      unlimitedly. During the
                      <button
                        class="inline-link"
                        type="button"
                        @click="goToAuth('signup')"
                      >
                        early access
                      </button>
                      phase, a free photo package and usage credits will be
                      offered.
                    </p>
                    <p v-else-if="!faq.hasLink">{{ faq.answer }}</p>
                    <p v-else>
                      {{ faq.answer.split("Terms and Image Policy")[0] }}
                      <button
                        class="inline-link"
                        type="button"
                        @click="goToTerms"
                      >
                        Terms and Image Policy
                      </button>
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
        </main>
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
  InformationCircleOutline,
  BarChartOutline,
  LayersOutline,
  GitNetworkOutline,
} from "@vicons/ionicons5";
import { Workspace } from "@vicons/carbon";
import { BookOpen16Regular, Trophy20Regular } from "@vicons/fluent";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

useSEO("home");

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

const videoPlayer = ref(null);
const videoContainer = ref(null);
const videoPlaying = ref(false);
const activeTab = ref(0);
const videoProgress = ref(0);
const autoPlayTriggered = ref(false);
const observer = ref(null);
const fallbackTimeout = ref(null);

const showRequestDialog = ref(false);
const activeFAQ = ref(null);

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

const config = useRuntimeConfig();
const { isOpenMode, signupButtonLabel } = useRegistrationMode();

const disciplines = ref([
  { label: "Street", icon: markRaw(WalkOutline) },
  { label: "Documentary", icon: markRaw(BookOpen16Regular) },
  { label: "Artistic", icon: markRaw(ColorPaletteOutline) },
  { label: "Portrait", icon: markRaw(PersonOutline) },
  { label: "Landscape", icon: markRaw(ImageOutline) },
]);

const heroMetrics = ref([
  { value: "5k", label: "ideal focused catalog" },
  { value: "2D/3D", label: "semantic atlas" },
  { value: "RAW+", label: "pro workflow ready" },
]);

const sidebarItems = ref([
  { label: "Atlas", icon: markRaw(CubeOutline), active: true },
  { label: "Search", icon: markRaw(SearchOutline), active: false },
  { label: "Scores", icon: markRaw(Trophy20Regular), active: false },
  { label: "Reports", icon: markRaw(BarChartOutline), active: false },
]);

const archiveSignals = ref([
  { label: "visual clusters", value: "128" },
  { label: "candidate sequence", value: "24" },
  { label: "curation score", value: "91" },
]);

const workflowSteps = ref([
  {
    title: "Ingest a focused body of work",
    description:
      "Upload a project, curated selection, or working archive from the sources you already use.",
  },
  {
    title: "Analyze narrative and visual structure",
    description:
      "Computer vision extracts semantic, stylistic, compositional, and aesthetic signals without manual tagging.",
  },
  {
    title: "Search, score, sequence, and review",
    description:
      "Move from discovery to editorial decisions with search, 3D maps, ranking, reports, and portfolio tools.",
  },
]);

const videoTabs = ref([
  {
    title: "3D Atlas",
    icon: markRaw(CubeOutline),
    videoUrl: "/videos/atlas_1.mp4",
    speed: 1.5,
    delaySeconds: 0,
    endSeconds: 39,
  },
]);

const lightroomVideoUrl = "/videos/lr_plugin.mp4";

const features = ref([
  {
    icon: markRaw(CubeOutline),
    title: "2D / 3D Atlas",
    scope: "Archive map",
    description:
      "Explore your entire archive as an universe of images mapped in semantic space. Navigate in 2D or immersive 3D to discover visual clusters, stylistic threads, and unexpected connections across your catalog.",
    tone: "cyan",
    link: "/photo_3D_atlas",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Natural Language Search",
    scope: "Semantic retrieval",
    description:
      "Find any photo by describing it. Search for moods, scenes, lighting conditions, cinematic references, or abstract feelings. No keywords, no tagging, just describe what you remember and Photoreka finds it.",
    tone: "primary",
    link: "/ai_photo_search",
  },
  {
    icon: markRaw(Workspace),
    title: "Interactive Canvas",
    scope: "Visual planning",
    description:
      "Drag, arrange, and compose your photos freely on an infinite canvas. Drop any image and Photoreka surfaces visually or narratively similar photos from your archive to help you find the perfect pairing.",
    tone: "accent",
    link: null,
  },
  {
    icon: markRaw(GitNetworkOutline),
    title: "Tag Cloud",
    scope: "Concept topology",
    description:
      "Every AI-extracted tag from your photos mapped in 2D semantic space. Similar concepts cluster together. Navigate the map to browse, select a region to search, or enable dynamic mode for real-time photo discovery.",
    tone: "violet",
    link: "/photo_tag_cloud",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Series & Sequencing",
    scope: "Editorial flow",
    description:
      "Build cohesive sequences and storyboards from your catalog. Organize images into narrative arcs, editorial spreads, or visual series, and let the AI suggest continuations based on compositional and tonal flow.",
    tone: "success",
    link: "/photography_portfolio_builder",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Reports & Patterns",
    scope: "Style intelligence",
    description:
      "Understand how you shoot. Photoreka surfaces recurring stylistic patterns, narrative tendencies, cultural references, and compositional habits across your archive, helping you see your work from the outside.",
    tone: "warning",
    link: "/photo_reports",
  },
  {
    icon: markRaw(Trophy20Regular),
    title: "Rankings & Scores",
    scope: "Curation metrics",
    description:
      "Score your photos across multiple dimensions: aesthetics, composition, narrative strength, originality, visual wit, humor, and more. Rank your catalog and surface your strongest work automatically.",
    tone: "rose",
    link: "/photo_scoring",
  },
]);

const integrationFeatures = ref([
  {
    icon: markRaw(SyncOutline),
    label: "Direct sync from Lightroom catalog",
    tone: "primary",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    label: "Search by natural language integrated",
    tone: "accent",
  },
  {
    icon: markRaw(ShareSocialOutline),
    label: "One-click photo transfer to Photoreka",
    tone: "warning",
  },
  {
    icon: markRaw(LinkOutline),
    label: "Compatible with Photoreka web workflow",
    tone: "success",
  },
  {
    icon: markRaw(InformationCircleOutline),
    label: "Lightroom Classic 13.0+ · RAW, JPEG, PNG, TIFF",
    tone: "neutral",
  },
]);

const dataSources = ref([
  {
    icon: markRaw(CloudUploadOutline),
    name: "Local Files",
    description:
      "Upload photos directly from your computer. Supports all major image formats (JPEG, PNG, TIFF).",
    tone: "success",
    comingSoon: false,
  },
  {
    logo: "/logos/google_photos.png",
    name: "Google Photos",
    description:
      "Sync your entire Google Photos library with one click. Keep your photos organized across platforms.",
    tone: "primary",
    comingSoon: false,
  },
  {
    logo: "/logos/lightroom_logo.png",
    name: "Adobe Lightroom",
    description:
      "Connect directly with your Lightroom Classic catalog through our official plugin.",
    tone: "cyan",
    comingSoon: false,
  },
  {
    icon: markRaw(LogoDropbox),
    name: "Dropbox",
    description:
      "Sync your Dropbox photo folders directly with Photoreka. Works with any folder structure you already have.",
    tone: "primary",
    comingSoon: false,
  },
]);

const freeTools = computed(() => [
  {
    title: "Free Framer",
    tag: "Photo framing tool",
    description:
      "Add professional frames and borders to your photos instantly. Perfect for presentations, portfolios, and social media. Choose from multiple styles and customize colors to match your vision.",
    features: [
      "Multiple frame styles and borders",
      "Customizable colors and sizes",
      "Batch export photos without limits",
    ],
    image: "/home/free_framer.png",
    alt: "Free Framer Screenshot",
    icon: markRaw(StopOutline),
    tone: "warning",
    cta: "Try Framer",
    buttonType: "warning",
    action: goToFreeFramer,
    reverse: false,
  },
  {
    title: "Canvas Playground",
    tag: "Interactive design tool",
    description:
      "Create stunning photo layouts and compositions with complete creative freedom. Drag, drop, and arrange your photos to tell your visual story. With a Photoreka account, find related images from your collection.",
    features: [
      "Drop unlimited images",
      "Find images by narrative or chromatic similarity",
      "Intuitive drag and drop interface",
    ],
    image: "/home/canvas_playground.png",
    alt: "Canvas Playground Screenshot",
    icon: markRaw(Workspace),
    tone: "accent",
    cta: "Launch Canvas",
    buttonType: "primary",
    action: goToPlayground,
    reverse: true,
  },
]);

const faqs = ref([
  {
    question: "What is Photoreka and who is it for?",
    answer:
      "Photoreka is an AI-powered app to curate and organize your photos. Upload a specific project, a curated selection, or a significant portion of your archive, then search in natural language, score and rank your images, find patterns across your work, and explore your catalog in 3D. Built for street, documentary, artistic, portrait, and landscape photographers who take their work seriously.",
  },
  {
    question: "How does Photoreka organize and curate photos with AI?",
    answer:
      "Photoreka uses computer vision AI to analyze your photographs, identifying narrative and stylistic elements. This enables intelligent organization, advanced semantic search by natural language, automatic photo scoring and ranking, 3D catalog visualization, and AI-assisted portfolio curation, all without manual tagging. For detailed information on our image processing policies, please see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Is Photoreka a storage platform?",
    answer:
      "Photoreka is an AI photo curation and organization tool, not a storage service. It focuses on helping you understand, search, score, and curate your photo library. It works alongside your existing storage, Lightroom Classic, Google Photos, Dropbox, or local files. For details about how we handle your images, see our Terms and Image Policy.",
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
      "We only store a reduced version of your images on secure servers, sufficient to facilitate searches and for common social media uses, but not for any other purpose. The analysis is performed using proprietary and third-party services under agreements that prevent retaining or reusing your photos. They are not shared with anyone and you always retain 100% of the rights to your work. For complete details, please read our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "What kind of photo catalog works best with Photoreka?",
    answer:
      "Photoreka is built for photographers who want to work with a curated body of work, not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 5,000 photos; up to 10,000 is workable but we recommend keeping it focused. Because the AI tools are built around curation, semantic search, visual clusters, scoring, sequencing, they work best when your archive already has a baseline of intentionality.",
  },
  {
    question: "Can I try Photoreka for free?",
    hasEarlyAccess: true,
  },
]);

const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_page_technical", mode);
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
  trackUserAction("navigate_to_terms", "landing_page_technical");
  navigateTo("/terms");
};

const goToPlayground = () => {
  trackUserAction("navigate_to_playground", "landing_page_technical", "canvas");
  window.open(`${config.public.appUrl}/canvas-playground`, "_blank");
};

const goToFreeFramer = () => {
  trackUserAction("navigate_to_playground", "landing_page_technical", "framer");
  window.open(`${config.public.appUrl}/free-framer`, "_blank");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "landing_page_technical");
  window.open("https://app.photoreka.com/demo/workspace", "_blank");
};

const onRequestSuccess = () => {};

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

const onVideoPlay = () => {
  videoPlaying.value = true;
};

const onVideoLoaded = () => {
  if (videoPlayer.value) {
    const currentTab = videoTabs.value[activeTab.value];
    videoPlayer.value.playbackRate = currentTab.speed || 1.0;
    const delay =
      typeof currentTab.delaySeconds === "number" ? currentTab.delaySeconds : 0;
    videoPlayer.value.currentTime = delay;
  }
};

const onLightroomVideoLoaded = (event) => {
  event.target.playbackRate = 2;
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
        if (entry.intersectionRatio >= 0.75 && !autoPlayTriggered.value) {
          setTimeout(() => {
            startVideoPlayback();
          }, 500);
        }
      });
    },
    {
      threshold: 0.75,
      rootMargin: "0px",
    },
  );

  observer.value.observe(videoPlayer.value);
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

const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.18,
    rootMargin: "0px 0px -80px 0px",
  };

  const reveal = (target, state) => {
    const targetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          state.value = true;
        }
      });
    }, observerOptions);

    if (target.value) targetObserver.observe(target.value);
  };

  reveal(featuresSection, featuresVisible);
  reveal(integrationSection, integrationVisible);
  reveal(sourcesSection, sourcesVisible);
  reveal(freeToolsSection, freeToolsVisible);
  reveal(faqsSection, faqsVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;

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
    }, 5000);
  });

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
</script>

<style scoped>
.home-landing {
  min-height: 100vh;
  background:
    var(--premium-hero-grid),
    linear-gradient(180deg, var(--premium-bg), var(--premium-bg-secondary));
  color: var(--premium-text-primary);
  overflow-x: hidden;
}

.home-container {
  width: min(100% - 48px, 1240px);
  margin: 0 auto;
}

.home-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--premium-border);
  background: var(--premium-bg-nav);
  backdrop-filter: blur(18px) saturate(160%);
}

.home-nav-inner {
  width: min(100% - 48px, 1360px);
  height: 72px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 28px;
}

.home-brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.home-nav-links {
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-glass);
}

.home-nav-links a {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  color: var(--premium-text-secondary);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-fast);
}

.home-nav-links a:hover {
  background: var(--premium-bg-hover);
  color: var(--premium-text-primary);
}

.home-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.home-icon-button {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-surface);
  color: var(--premium-text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.home-icon-button:hover {
  border-color: var(--premium-border-strong);
  background: var(--premium-bg-hover);
  color: var(--premium-primary);
}

.home-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 112px 0 72px;
  overflow: hidden;
}

.home-hero-grid {
  position: absolute;
  inset: 72px 0 auto;
  height: 72%;
  pointer-events: none;
  mask-image: linear-gradient(180deg, var(--premium-bg), transparent);
  opacity: 0.7;
}

.hero-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(560px, 1.1fr);
  gap: 52px;
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.home-kicker,
.hero-title,
.hero-description,
.hero-actions,
.discipline-strip,
.hero-metrics,
.hero-product,
.section-header,
.feature-card,
.integration-preview,
.integration-content,
.source-card,
.tools-showcase,
.faqs-container {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-kicker.visible,
.hero-title.visible,
.hero-description.visible,
.hero-actions.visible,
.discipline-strip.visible,
.hero-metrics.visible,
.hero-product.visible,
.section-header.visible,
.feature-card.visible,
.integration-preview.visible,
.integration-content.visible,
.source-card.visible,
.tools-showcase.visible,
.faqs-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.home-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-glass);
  color: var(--premium-text-secondary);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.home-kicker span:first-child {
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  background: var(--premium-primary-soft);
  color: var(--premium-primary);
}

.home-kicker span:last-child {
  padding-right: 8px;
}

.hero-title {
  max-width: 720px;
  margin: 0;
  font-size: clamp(46px, 6vw, 84px);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: 0;
  color: var(--premium-text-primary);
}

.hero-description {
  max-width: 680px;
  margin: 0;
  color: var(--premium-text-secondary);
  font-size: 17px;
  line-height: 1.72;
}

.hero-description strong {
  color: var(--hero-strong-text-color);
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.discipline-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.discipline-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 34px;
  padding: 0 11px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-surface);
  color: var(--premium-text-secondary);
  font-size: 13px;
  font-weight: 600;
}

.discipline-chip .n-icon {
  color: var(--premium-primary);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(100%, 640px);
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-glass);
}

.hero-metric {
  min-width: 0;
  padding: 18px;
  border-right: 1px solid var(--premium-border);
}

.hero-metric:last-child {
  border-right: 0;
}

.hero-metric strong,
.analysis-signal strong {
  display: block;
  margin-bottom: 4px;
  color: var(--premium-text-primary);
  font-size: 24px;
  line-height: 1;
}

.hero-metric span,
.analysis-signal span {
  color: var(--premium-text-tertiary);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.hero-product {
  transition-delay: 0.16s;
}

.product-window {
  overflow: hidden;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-lg);
  background: var(--premium-bg-card);
  box-shadow: var(--premium-shadow-xl);
}

.product-topbar {
  min-height: 46px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border-bottom: 1px solid var(--premium-border);
  background: var(--premium-chrome);
}

.window-controls {
  display: flex;
  gap: 7px;
}

.window-controls span {
  width: 9px;
  height: 9px;
  border-radius: var(--radius-round);
  background: var(--premium-border-strong);
}

.product-path,
.product-status {
  color: var(--premium-text-tertiary);
  font-size: 12px;
  font-weight: 700;
}

.product-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.product-status span {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-round);
  background: var(--premium-success);
  box-shadow: 0 0 0 4px var(--premium-success-soft);
}

.product-body {
  display: grid;
  grid-template-columns: 156px 1fr;
  min-height: 560px;
}

.product-sidebar {
  padding: 18px 12px;
  border-right: 1px solid var(--premium-border);
  background: var(--premium-bg-secondary);
}

.sidebar-heading {
  padding: 0 9px 10px;
  color: var(--premium-text-tertiary);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 36px;
  padding: 0 9px;
  border-radius: var(--radius-sm);
  color: var(--premium-text-secondary);
  font-size: 13px;
  font-weight: 650;
}

.sidebar-item.active {
  background: var(--premium-primary-soft);
  color: var(--premium-primary);
}

.product-stage {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  background: var(--premium-stage-bg);
}

.query-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-glass);
}

.query-panel span {
  color: var(--premium-text-tertiary);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.query-panel strong {
  color: var(--premium-text-primary);
  font-size: 13px;
}

.demo-video-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-video-bg);
}

.demo-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.video-progress-rail {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--premium-border);
}

.video-progress-rail span {
  display: block;
  height: 100%;
  background: var(--premium-primary);
  transition: width 0.1s linear;
}

.analysis-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.analysis-signal {
  padding: 14px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-surface);
}

.workflow-section,
.home-section {
  padding: 86px 0;
}

.workflow-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 56px;
  align-items: start;
  padding: 28px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-lg);
  background: var(--premium-bg-card);
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-primary-soft);
  color: var(--premium-primary);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.workflow-copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.workflow-copy h2,
.integration-heading h2 {
  margin: 0;
  color: var(--premium-text-primary);
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.05;
  letter-spacing: 0;
}

.workflow-copy p,
.integration-content p {
  margin: 0;
  color: var(--premium-text-secondary);
  font-size: 16px;
  line-height: 1.7;
}

.workflow-steps {
  display: grid;
  gap: 12px;
}

.workflow-step {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 18px;
  padding: 18px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-surface);
}

.workflow-step > span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: var(--premium-bg-secondary);
  color: var(--premium-primary);
  font-size: 12px;
  font-weight: 800;
}

.workflow-step h3,
.feature-card h3,
.source-card h3,
.tool-heading h3 {
  margin: 0;
  color: var(--premium-text-primary);
  font-size: 18px;
  line-height: 1.25;
}

.workflow-step p,
.feature-card p,
.source-card p,
.tool-content p,
.tool-content li {
  margin: 7px 0 0;
  color: var(--premium-text-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.feature-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.42fr) minmax(0, 1fr);
  gap: 42px;
  align-items: start;
}

.section-header {
  max-width: 760px;
  margin: 0 auto 44px;
  text-align: center;
}

.section-header.align-left {
  position: sticky;
  top: 108px;
  margin: 0;
  text-align: left;
}

.section-header .section-eyebrow {
  margin-bottom: 16px;
}

.section-title {
  margin: 0;
  color: var(--premium-text-primary);
  font-size: clamp(34px, 4.4vw, 58px);
  line-height: 1.05;
  letter-spacing: 0;
}

.section-subtitle {
  margin: 16px auto 0;
  color: var(--premium-text-secondary);
  font-size: 16px;
  line-height: 1.72;
}

.align-left .section-subtitle {
  margin-left: 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.feature-card {
  min-height: 254px;
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-bg-card);
  color: inherit;
  text-decoration: none;
}

.feature-card.clickable:hover,
.source-card:hover,
.tool-card:hover,
.faq-item:hover {
  border-color: var(--tone-color, var(--premium-border-strong));
  background: var(--premium-bg-hover);
}

.feature-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: auto;
}

.feature-card-top span,
.tool-heading span {
  color: var(--premium-text-tertiary);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.feature-glyph,
.feature-icon-wrapper,
.source-icon,
.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--tone-border, var(--premium-border));
  border-radius: var(--radius-sm);
  background: var(--tone-soft, var(--premium-bg-secondary));
  color: var(--tone-color, var(--premium-primary));
}

.feature-glyph {
  width: 42px;
  height: 42px;
}

.feature-card h3 {
  margin-top: 24px;
}

.feature-card p {
  font-size: 13.5px;
}

.integration-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
  gap: 54px;
  align-items: center;
}

.compact-window {
  border-radius: var(--radius-lg);
}

.integration-video-frame {
  padding: 14px;
  background: var(--premium-stage-bg);
}

.integration-video {
  width: 100%;
  display: block;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-video-bg);
}

.integration-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.integration-heading {
  display: flex;
  align-items: center;
  gap: 16px;
}

.integration-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.integration-feature-list {
  width: 100%;
  display: grid;
  gap: 10px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.integration-feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-sm);
  background: var(--premium-surface);
  color: var(--premium-text-secondary);
  font-size: 14px;
  font-weight: 600;
}

.feature-icon-wrapper {
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
}

.integration-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}

.integration-cta span {
  color: var(--premium-text-tertiary);
  font-size: 13px;
  font-weight: 600;
}

.sources-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.source-card {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 20px;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-bg-card);
}

.source-icon {
  width: 52px;
  height: 52px;
  margin-bottom: 24px;
}

.source-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.source-card p {
  margin-top: 10px;
}

.source-badge {
  width: fit-content;
  margin-top: auto;
  padding: 6px 9px;
  border: 1px solid var(--tone-border, var(--premium-border));
  border-radius: var(--radius-sm);
  background: var(--tone-soft, var(--premium-bg-secondary));
  color: var(--tone-color, var(--premium-primary));
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.tools-showcase {
  display: grid;
  gap: 18px;
}

.tool-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.74fr);
  overflow: hidden;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-lg);
  background: var(--premium-bg-card);
}

.tool-card.reverse {
  grid-template-columns: minmax(340px, 0.74fr) minmax(0, 1fr);
}

.tool-card.reverse .tool-visual {
  order: 2;
}

.tool-card.reverse .tool-content {
  order: 1;
}

.tool-visual {
  min-height: 420px;
  padding: 18px;
  background: var(--tone-soft, var(--premium-bg-secondary));
}

.tool-visual img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-surface);
  box-shadow: var(--premium-shadow-md);
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 34px;
}

.tool-heading {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tool-icon {
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
}

.tool-content p {
  margin: 0;
  font-size: 15px;
}

.tool-content ul {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tool-content li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin: 0;
}

.tool-content li .n-icon {
  margin-top: 3px;
  color: var(--tone-color, var(--premium-primary));
  flex: 0 0 auto;
}

.tool-cta {
  width: 100%;
  margin-top: auto;
}

.faq-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.42fr) minmax(0, 1fr);
  gap: 42px;
  align-items: start;
}

.faqs-container {
  display: grid;
  gap: 10px;
}

.faq-item {
  overflow: hidden;
  border: 1px solid var(--premium-border);
  border-radius: var(--radius-md);
  background: var(--premium-bg-card);
  transition: var(--transition-normal);
}

.faq-item.active {
  border-color: var(--premium-primary);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 20px;
  border: 0;
  background: transparent;
  color: var(--premium-text-primary);
  text-align: left;
  cursor: pointer;
}

.faq-question span {
  font-size: 15px;
  font-weight: 700;
}

.faq-icon {
  color: var(--premium-text-tertiary);
  transition: transform 0.2s ease;
  flex: 0 0 auto;
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 20px 18px;
}

.faq-answer p {
  margin: 0;
  color: var(--premium-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.inline-link {
  display: inline;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--premium-primary);
  font: inherit;
  font-weight: 800;
  text-decoration: underline;
  cursor: pointer;
}

.tone-primary {
  --tone-color: var(--premium-primary);
  --tone-soft: var(--premium-primary-soft);
  --tone-border: var(--premium-primary-border);
}

.tone-cyan {
  --tone-color: var(--premium-info);
  --tone-soft: var(--premium-info-soft);
  --tone-border: var(--premium-info-border);
}

.tone-accent,
.tone-violet {
  --tone-color: var(--premium-accent);
  --tone-soft: var(--premium-accent-soft);
  --tone-border: var(--premium-accent-border);
}

.tone-success {
  --tone-color: var(--premium-success);
  --tone-soft: var(--premium-success-soft);
  --tone-border: var(--premium-success-border);
}

.tone-warning {
  --tone-color: var(--premium-warning);
  --tone-soft: var(--premium-warning-soft);
  --tone-border: var(--premium-warning-border);
}

.tone-rose {
  --tone-color: var(--premium-danger);
  --tone-soft: var(--premium-danger-soft);
  --tone-border: var(--premium-danger-border);
}

.tone-neutral {
  --tone-color: var(--premium-text-tertiary);
  --tone-soft: var(--premium-bg-secondary);
  --tone-border: var(--premium-border);
}

@media (max-width: 1120px) {
  .home-nav-links {
    display: none;
  }

  .home-nav-inner {
    grid-template-columns: auto auto;
  }

  .hero-shell,
  .feature-layout,
  .integration-grid,
  .faq-grid,
  .workflow-grid {
    grid-template-columns: 1fr;
  }

  .section-header.align-left {
    position: static;
    max-width: 780px;
  }

  .sources-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .home-container,
  .home-nav-inner {
    width: min(100% - 32px, 1240px);
  }

  .home-nav-actions :deep(.n-button:nth-of-type(1)) {
    display: none;
  }

  .home-hero {
    padding-top: 98px;
  }

  .hero-title {
    font-size: 46px;
  }

  .hero-metrics,
  .analysis-strip,
  .feature-grid,
  .sources-grid,
  .tool-card,
  .tool-card.reverse {
    grid-template-columns: 1fr;
  }

  .hero-metric {
    border-right: 0;
    border-bottom: 1px solid var(--premium-border);
  }

  .hero-metric:last-child {
    border-bottom: 0;
  }

  .product-body {
    grid-template-columns: 1fr;
  }

  .product-sidebar {
    display: none;
  }

  .product-status {
    display: none;
  }

  .tool-card.reverse .tool-visual,
  .tool-card.reverse .tool-content {
    order: initial;
  }
}

@media (max-width: 560px) {
  .home-nav-actions :deep(.n-button:nth-of-type(2)) {
    display: none;
  }

  .home-kicker {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-description,
  .section-subtitle {
    font-size: 15px;
  }

  .product-topbar {
    grid-template-columns: auto 1fr;
  }

  .product-stage,
  .workflow-grid,
  .tool-content {
    padding: 18px;
  }

  .tool-visual {
    min-height: 280px;
  }

  .workflow-section,
  .home-section {
    padding: 58px 0;
  }
}
</style>
