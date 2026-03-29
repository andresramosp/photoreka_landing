<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="framer-page">
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
              <n-button text @click="goToHome" class="back-link">
                <template #icon>
                  <n-icon><ArrowBackOutline /></n-icon>
                </template>
                Back to Home
              </n-button>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="framer-hero" ref="heroSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout">
              <div class="hero-content">
                <div class="hero-badge" :class="{ visible: heroVisible }">
                  <span class="badge-content">
                    <n-icon size="16"><ShieldCheckmarkOutline /></n-icon>
                    Google Photos Alternative
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Your photos deserve
                  <span class="gradient-text">a smarter home</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Google Photos stores your memories—but it doesn't understand
                  them. Photoreka goes beyond storage to offer
                  <strong
                    >AI scoring, 3D exploration, intelligent search, and
                    conversational curation</strong
                  >
                  built specifically for photographers who care about their
                  craft.<br /><br />
                  If you've ever felt limited by consumer photo apps, it's time
                  for a tool that treats your work as art, not just files.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
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
                    {{ joinButtonLabel }}
                  </n-button>
                </div>
              </div>

              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/atlas_1.mp4"
                    poster="/home/video_poster.jpg"
                    ref="videoRef"
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

        <!-- Comparison Section -->
        <section class="comparison-section" ref="comparisonSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: comparisonVisible }">
              <h2 class="section-title">Beyond consumer photo storage</h2>
              <p class="section-subtitle">
                Google Photos is great for casual snapshots. But if photography
                is your craft, you need tools that understand quality—not just
                pixels.
              </p>
            </div>

            <div
              class="comparison-table-wrapper"
              :class="{ visible: comparisonVisible }"
            >
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>
                      <span class="competitor-label">Google Photos</span>
                    </th>
                    <th>
                      <span class="photoreka-label">Photoreka</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in comparisonRows"
                    :key="i"
                    :style="{ transitionDelay: `${i * 60}ms` }"
                  >
                    <td class="feature-name">{{ row.feature }}</td>
                    <td class="competitor-cell">
                      <n-icon
                        size="20"
                        :color="row.google ? '#22c55e' : '#ef4444'"
                      >
                        <component
                          :is="
                            row.google
                              ? CheckmarkCircleOutline
                              : CloseCircleOutline
                          "
                        />
                      </n-icon>
                      <span v-if="row.googleNote" class="cell-note">{{
                        row.googleNote
                      }}</span>
                    </td>
                    <td class="photoreka-cell">
                      <n-icon size="20" color="#22c55e">
                        <CheckmarkCircleOutline />
                      </n-icon>
                      <span v-if="row.photorekaNote" class="cell-note">{{
                        row.photorekaNote
                      }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- How It Works Section -->
        <section class="how-section" ref="howSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="section-container" style="position: relative; z-index: 1">
            <div class="section-header" :class="{ visible: howVisible }">
              <h2 class="section-title">Make the switch in minutes</h2>
              <p class="section-subtitle">
                Photoreka works alongside your existing photo library—no
                migration headaches.
              </p>
            </div>

            <div class="steps-container" :class="{ visible: howVisible }">
              <div
                v-for="(step, i) in steps"
                :key="i"
                class="step-card"
                :style="{ transitionDelay: `${i * 120}ms` }"
              >
                <div class="step-number" :style="{ background: step.color }">
                  {{ i + 1 }}
                </div>
                <div class="step-content">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Grid Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">Everything Google Photos can't do</h2>
              <p class="section-subtitle">
                Photoreka was designed from the ground up for people who take
                photography seriously.
              </p>
            </div>

            <div class="features-grid">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="feature-card"
                :class="{ visible: featuresVisible }"
                :style="{ transitionDelay: `${index * 100}ms` }"
              >
                <div class="feature-icon" :style="{ color: feature.color }">
                  <n-icon size="32">
                    <component :is="feature.icon" />
                  </n-icon>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section" ref="faqSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: faqVisible }">
              <h2 class="section-title">Frequently Asked Questions</h2>
              <p class="section-subtitle">
                Switching from Google Photos? Here's what you need to know.
              </p>
            </div>

            <div class="faqs-container" :class="{ visible: faqVisible }">
              <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="faq-item"
                :class="{ active: activeFAQ === index }"
              >
                <button class="faq-question" @click="toggleFAQ(index)">
                  <span>{{ faq.question }}</span>
                  <n-icon
                    size="20"
                    class="faq-icon"
                    :class="{ rotated: activeFAQ === index }"
                  >
                    <ChevronDownOutline />
                  </n-icon>
                </button>
                <div v-if="activeFAQ === index" class="faq-answer">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Final CTA Section -->
        <section class="cta-section" ref="ctaSection">
          <div class="section-container">
            <div class="cta-content" :class="{ visible: ctaVisible }">
              <h2 class="cta-title">
                Ready for a photo app that respects your craft?
              </h2>
              <p class="cta-description">
                Stop settling for consumer tools. Photoreka gives you AI-powered
                scoring, search, curation, and visualization that actually
                understand your photography.
              </p>
              <div class="cta-buttons">
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
                  {{ joinButtonLabel }}
                </n-button>
              </div>
              <div class="cta-extra">
                <p>
                  Explore what makes Photoreka different:
                  <a @click="goToSearch" class="cta-link">AI Photo Search</a>
                  &middot;
                  <a @click="goToAtlas" class="cta-link">3D Photo Atlas</a>
                </p>
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
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  PlayCircleOutline,
  KeyOutline,
  ChevronDownOutline,
  ShieldCheckmarkOutline,
  CheckmarkCircleOutline,
  CloseCircleOutline,
  SearchOutline,
  BarChartOutline,
  ChatbubblesOutline,
  CubeOutline,
  LayersOutline,
  EyeOutline,
  LockClosedOutline,
  SpeedometerOutline,
  ColorPaletteOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("google_photos_alternative");

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

const toggleTheme = () => baseToggleTheme();

// Refs
const heroSection = ref(null);
const comparisonSection = ref(null);
const howSection = ref(null);
const featuresSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);
const videoRef = ref(null);

const heroVisible = ref(false);
const comparisonVisible = ref(false);
const howVisible = ref(false);
const featuresVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Comparison table
const comparisonRows = ref([
  {
    feature: "AI photo quality scoring",
    google: false,
    googleNote: "",
    photorekaNote: "Multi-dimensional scoring",
  },
  {
    feature: "Natural-language photo search",
    google: true,
    googleNote: "Basic object recognition",
    photorekaNote: "Deep semantic understanding",
  },
  {
    feature: "3D photo visualization",
    google: false,
    googleNote: "",
    photorekaNote: "Interactive 3D Atlas",
  },
  {
    feature: "Conversational AI assistant",
    google: false,
    googleNote: "",
    photorekaNote: "Full curation dialogue",
  },
  {
    feature: "Automatic best-photo selection",
    google: false,
    googleNote: "",
    photorekaNote: "Score-based culling",
  },
  {
    feature: "Portfolio sequencing & curation",
    google: false,
    googleNote: "",
    photorekaNote: "Narrative-aware ordering",
  },
  {
    feature: "Photography style analysis",
    google: false,
    googleNote: "",
    photorekaNote: "Reports & insights",
  },
  {
    feature: "Lightroom integration",
    google: false,
    googleNote: "",
    photorekaNote: "Native plugin",
  },
  {
    feature: "Privacy-first architecture",
    google: true,
    googleNote: "Cloud-only storage",
    photorekaNote: "Your data, your control",
  },
]);

// How it works steps
const steps = ref([
  {
    title: "Connect your photo library",
    description:
      "Import from Lightroom, Dropbox, a local folder, or other cloud storage. Photoreka works with your existing workflow—no lock-in, no forced migration.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "AI analyzes every photo",
    description:
      "Each image is scored across aesthetics, composition, narrative strength, originality, and more. You get a deep understanding of your entire archive in minutes.",
    color: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    title: "Search, explore, and curate",
    description:
      "Use natural-language search to find anything. Explore patterns in 3D space. Chat with the AI assistant to curate collections, build portfolios, or discover hidden gems.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Level up your photography",
    description:
      "Get reports on your style evolution, strengths, and areas to improve. Photoreka is the only photo platform that actively helps you grow as a photographer.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(BarChartOutline),
    title: "Multi-Dimensional Scoring",
    description:
      "Google Photos can't tell you which of your photos is actually good. Photoreka scores every image across aesthetics, composition, narrative, originality, and technical quality.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(SearchOutline),
    title: "Truly Intelligent Search",
    description:
      "Go beyond 'cat' or 'beach'. Search by mood, style, composition, or complex descriptions like 'moody street photos with leading lines taken at golden hour'.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(CubeOutline),
    title: "3D Photo Atlas",
    description:
      "See your entire library as an interactive 3D map. Discover clusters, outliers, and connections between photos that flat grids can never reveal.",
    color: "#2563eb",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "AI Photo Assistant",
    description:
      "Have a conversation about your photos. Ask questions, request curations, get portfolio suggestions—all in natural language with a model that knows your archive.",
    color: "#22c55e",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "Automatic Culling",
    description:
      "After a big shoot, instantly separate the keepers from the rest. Score-based culling replaces hours of manual review with one intelligent pass.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(LockClosedOutline),
    title: "Privacy by Design",
    description:
      "Your photos aren't used to train ad models. Photoreka is built for photographers, not advertisers—your data stays yours.",
    color: "#ec4899",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "Can I use Photoreka alongside Google Photos?",
    answer:
      "Absolutely. Photoreka doesn't replace your storage—it adds intelligence on top. You can keep Google Photos for backup and use Photoreka for scoring, search, and curation. Many users run both.",
  },
  {
    question: "How does the search compare to Google Photos?",
    answer:
      "Google Photos search is basic object recognition—you can find 'dog' or 'sunset'. Photoreka understands photographic concepts: 'high-contrast black and white portraits with shallow depth of field' or 'my best compositions from the last 6 months'. It's search built for photographers, not consumers.",
  },
  {
    question: "Is my data used to train AI models?",
    answer:
      "No. Your photos are analyzed to give you insights and tools, but they are never used to train third-party models. Privacy is a core design principle, not an afterthought.",
  },
  {
    question: "Do I need to migrate all my photos?",
    answer:
      "No migration required. Import from Lightroom, connect Dropbox, point to a local folder, or use other cloud storage. Photoreka works with your existing library and workflow.",
  },
  {
    question: "What about free storage?",
    answer:
      "Photoreka isn't a storage service—it's an intelligence layer for your photos. Your files stay where they are (Lightroom, Dropbox, local drive, or any other cloud). Photoreka adds scoring, search, and AI tools on top without duplicating your library.",
  },
  {
    question: "Is it only for professional photographers?",
    answer:
      "No. Anyone who cares about their photos will benefit. That said, Photoreka is designed with serious photography in mind—hobbyists who shoot RAW, enthusiasts building portfolios, and professionals managing large archives all find value.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "google_photos_alternative_page");
  navigateTo("/");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "google_photos_alternative_page");
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "google_photos_alternative_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToSearch = () => {
  trackUserAction("navigate_to_search", "google_photos_alternative_page");
  navigateTo("/ai_photo_search");
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "google_photos_alternative_page");
  navigateTo("/photo_3D_atlas");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "google_photos_alternative",
    faq_index: index,
    action: wasOpen ? "close" : "open",
  });
};

// Scroll animations
const setupScrollAnimations = () => {
  const opts = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
  const watch = (section, flag) => {
    if (!section.value) return;
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) flag.value = true;
      });
    }, opts).observe(section.value);
  };
  watch(heroSection, heroVisible);
  watch(comparisonSection, comparisonVisible);
  watch(howSection, howVisible);
  watch(featuresSection, featuresVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", { page: "google_photos_alternative" });
});
</script>

<style scoped>
/* ── Layout & Base ─────────────────────────────────────────── */
.framer-page {
  min-height: 100vh;
  background: var(--premium-bg-primary);
  color: var(--premium-text-primary);
}

/* ── Nav ───────────────────────────────────────────────────── */
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
.nav-brand a {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  color: var(--premium-text-primary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle:hover {
  background: var(--premium-bg-hover);
}
.back-link {
  font-size: 0.95rem;
}

/* ── Hero ──────────────────────────────────────────────────── */
.framer-hero {
  position: relative;
  padding: 8rem 2rem 6rem;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}
.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #06b6d4;
  width: fit-content;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}
.badge-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-subtitle {
  max-width: 580px;
  margin: 0;
  font-size: 17px;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}
.hero-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-visual {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--premium-border);
}
.hero-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.hero-visual:hover {
  transform: translateY(-8px) scale(1);
}
.video-frame {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: var(--premium-bg-card);
}
.hero-video {
  width: 100%;
  height: auto;
  display: block;
}
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.18;
  animation: float 25s infinite ease-in-out;
  will-change: transform;
}
.orb-1 {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  top: -300px;
  right: -200px;
}
.orb-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  bottom: -200px;
  left: -250px;
  animation-delay: -10s;
}
.orb-3 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -15s;
}
@keyframes float {
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

/* ── Section shell ─────────────────────────────────────────── */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
}
.section-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 3rem;
  text-align: center;
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}
.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--premium-text-secondary);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Comparison Table ──────────────────────────────────────── */
.comparison-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.comparison-table-wrapper {
  max-width: 900px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: auto;
}
.comparison-table-wrapper.visible {
  opacity: 1;
  transform: translateY(0);
}
.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  overflow: hidden;
}
.comparison-table thead th {
  padding: 1.25rem 1.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--premium-border);
  background: var(--premium-bg-primary);
}
.comparison-table thead th:first-child {
  text-align: left;
  width: 45%;
}
.competitor-label {
  color: var(--premium-text-secondary);
}
.photoreka-label {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}
.comparison-table tbody td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--premium-border);
  vertical-align: middle;
}
.comparison-table tbody tr:last-child td {
  border-bottom: none;
}
.feature-name {
  font-weight: 600;
  font-size: 0.97rem;
}
.competitor-cell,
.photoreka-cell {
  text-align: center;
}
.cell-note {
  display: block;
  font-size: 0.8rem;
  color: var(--premium-text-secondary);
  margin-top: 0.25rem;
}

/* ── How It Works Section ──────────────────────────────────── */
.how-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}
.steps-container {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.steps-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.step-card {
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s ease;
}
.step-card:hover {
  transform: translateX(6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.step-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.97rem;
}

/* ── Features Section ──────────────────────────────────────── */
.features-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.feature-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.feature-icon {
  margin-bottom: 1.5rem;
}
.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.feature-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
  font-size: 0.97rem;
}

/* ── FAQ Section ───────────────────────────────────────────── */
.faq-section {
  padding: 6rem 2rem;
}
.faqs-container {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.faqs-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.faq-item {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}
.faq-item:hover,
.faq-item.active {
  border-color: var(--premium-primary);
}
.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--premium-text-primary);
  font-size: 1.05rem;
  font-weight: 600;
  text-align: left;
  gap: 1rem;
}
.faq-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--premium-text-secondary);
}
.faq-icon.rotated {
  transform: rotate(180deg);
}
.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  animation: fadeIn 0.3s ease;
  font-size: 0.97rem;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── CTA Section ───────────────────────────────────────────── */
.cta-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}
.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.cta-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.cta-description {
  font-size: 1.15rem;
  color: var(--premium-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.7;
}
.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.cta-extra {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--premium-border);
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
}
.cta-link {
  color: var(--premium-primary);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cta-link:hover {
  text-decoration: underline;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-content {
    text-align: center;
    align-items: center;
  }
  .hero-subtitle {
    max-width: 100%;
  }
  .hero-actions {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  .framer-hero {
    padding: 6rem 1rem 3rem;
    min-height: auto;
  }
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  .section-title {
    font-size: 1.8rem;
  }
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .comparison-table thead th {
    padding: 1rem;
    font-size: 0.85rem;
  }
  .comparison-table tbody td {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  .how-section {
    padding: 4rem 1rem;
  }
  .comparison-section,
  .features-section,
  .faq-section,
  .cta-section {
    padding: 4rem 1rem;
  }
  .step-card {
    flex-direction: column;
  }
  .step-number {
    margin: 0 auto;
  }
}
</style>
