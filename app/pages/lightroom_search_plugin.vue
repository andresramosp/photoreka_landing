<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="framer-page">
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
              <!-- Left: Content -->
              <div class="hero-content">
                <div class="hero-badge" :class="{ visible: heroVisible }">
                  <span class="badge-content">
                    <img
                      src="/logos/lightroom_logo.png"
                      alt="Adobe Lightroom"
                      style="height: 20px; width: 20px; object-fit: contain"
                    />
                    Official Plugin
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Bring Photoreka's
                  <span class="gradient-text"> intelligent curation </span>
                  directly to Lightroom Classic
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Search your catalog in natural language, analyze your photos
                  with AI, and sync seamlessly with Photoreka—all without
                  leaving Lightroom Classic. Our official plugin transforms your
                  workflow with powerful semantic search and intelligent
                  organization.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button
                    type="warning"
                    size="large"
                    strong
                    @click="goToPlugin"
                  >
                    <template #icon>
                      <n-icon><DownloadOutline /></n-icon>
                    </template>
                    Get the Plugin
                  </n-button>
                  <span class="cta-note">Free with Photoreka account</span>
                </div>
              </div>

              <!-- Right: Video -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/lr_plugin.mp4"
                    poster="/home/video_lr_poster.png"
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

        <!-- Features Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                Your Lightroom workflow, supercharged
              </h2>
              <p class="section-subtitle">
                Work faster and smarter with AI-powered search and analysis
                built right into Lightroom Classic. Plus full 3D Atlas and
                Canvas through web.
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

        <!-- 3D Atlas Section -->
        <section class="atlas-section" ref="atlasSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout">
              <!-- Left: Video -->
              <div class="hero-visual" :class="{ visible: atlasVisible }">
                <div class="video-frame">
                  <video
                    class="hero-video"
                    src="/videos/atlas_1.mp4"
                    poster="/home/video_lr_poster.png"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>

              <!-- Right: Content -->
              <div
                class="hero-content atlas-content"
                :class="{ visible: atlasVisible }"
              >
                <div
                  class="hero-badge atlas-badge"
                  :class="{ visible: atlasVisible }"
                >
                  <span class="badge-content">
                    <n-icon size="18"><CubeOutline /></n-icon>
                    3D Atlas
                  </span>
                </div>
                <h2
                  class="hero-title atlas-title"
                  :class="{ visible: atlasVisible }"
                >
                  From Lightroom to
                  <span class="gradient-text"> 3D exploration</span>
                </h2>
                <p class="hero-subtitle" :class="{ visible: atlasVisible }">
                  Launch the 3D Atlas directly from Lightroom Classic to see
                  your entire catalog as a stunning navigable universe. Your
                  photos are automatically positioned in 3D space based on
                  visual similarity, creating clusters that reveal hidden
                  patterns and connections you never knew existed. Navigate your
                  work contextually, narratively, or aesthetically to understand
                  your photographic body of work as a cohesive whole.
                </p>

                <ul class="atlas-features" :class="{ visible: atlasVisible }">
                  <li>
                    <div class="feature-icon-wrapper" style="color: #2563eb">
                      <n-icon size="20"><GridOutline /></n-icon>
                    </div>
                    <span>Automatic clustering by visual similarity</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #8b5cf6">
                      <n-icon size="20"><NavigateOutline /></n-icon>
                    </div>
                    <span>Navigate by context, narrative, or aesthetics</span>
                  </li>
                  <li>
                    <div class="feature-icon-wrapper" style="color: #22c55e">
                      <n-icon size="20"><EyeOutline /></n-icon>
                    </div>
                    <span>Discover hidden patterns in your work</span>
                  </li>
                </ul>

                <div class="hero-actions" :class="{ visible: atlasVisible }">
                  <n-button
                    type="primary"
                    size="large"
                    strong
                    @click="goToAtlas"
                  >
                    <template #icon>
                      <n-icon><CubeOutline /></n-icon>
                    </template>
                    Open 3D Atlas
                  </n-button>
                  <span class="cta-note">Launch in Photoreka web platform</span>
                </div>
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
                Everything you need to know about the Lightroom plugin
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
              <h2 class="cta-title">Transform your Lightroom workflow today</h2>
              <p class="cta-description">
                Stop manually tagging and organizing. Let AI understand your
                photos and help you find exactly what you need in seconds.
                Download the plugin and start searching smarter, not harder.
              </p>
              <n-button type="warning" size="large" strong @click="goToPlugin">
                <template #icon>
                  <n-icon><DownloadOutline /></n-icon>
                </template>
                Download Plugin Now
              </n-button>
              <div class="cta-extra">
                <p>
                  New to Photoreka?
                  <a @click="goToHome" class="cta-link"
                    >Explore the full platform</a
                  >
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
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
  RocketOutline,
  StopOutline,
  ColorPaletteOutline,
  ImagesOutline,
  DownloadOutline,
  CloudDownloadOutline,
  ResizeOutline,
  LayersOutline,
  ShareSocialOutline,
  BriefcaseOutline,
  LogoInstagram,
  BookOutline,
  ChevronDownOutline,
  SpeedometerOutline,
  LockClosedOutline,
  LinkOutline,
  SyncOutline,
  ChatbubblesOutline,
  CubeOutline,
  GridOutline,
  NavigateOutline,
  EyeOutline,
} from "@vicons/ionicons5";
import { Workspace } from "@vicons/carbon";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("lightroom_plugin");

// Inject inline script to prevent FOUC
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

// Wrapper for toggle with tracking
const toggleTheme = () => {
  baseToggleTheme();
};

// Section refs and visibility
const heroSection = ref(null);
const featuresSection = ref(null);
const atlasSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const videoRef = ref(null);

const heroVisible = ref(false);
const featuresVisible = ref(false);
const atlasVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);

// Features data
const features = ref([
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Natural Language Search",
    description:
      "Search your entire Lightroom catalog using everyday language. Find 'photos of sunset over water' or 'portraits with warm lighting' instantly. No more endless scrolling or complex keyword tagging.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(SyncOutline),
    title: "Direct Catalog Sync",
    description:
      "Connect directly to your Lightroom Classic catalog. The plugin reads your existing library structure, respecting your collections, folders, and metadata without modifying anything.",
    color: "#2563eb",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "AI-Powered Analysis",
    description:
      "Automatically analyze your photos to understand content, composition, mood, and style. The AI learns your photographic patterns and helps you discover hidden gems in your archive.",
    color: "#22c55e",
  },
  {
    icon: markRaw(ShareSocialOutline),
    title: "One-Click Transfer",
    description:
      "Send photos from Lightroom to Photoreka with a single click. Create sequences, explore in 3D, or use advanced curation tools without re-importing your images.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(LinkOutline),
    title: "Seamless Integration",
    description:
      "Works within your existing Lightroom workflow. Access Photoreka's features through familiar Lightroom panels and menus. No learning curve, no workflow disruption.",
    color: "#ec4899",
  },
  {
    icon: markRaw(LockClosedOutline),
    title: "Privacy First",
    description:
      "Your photos stay on your computer. The plugin only analyzes locally and sends minimal metadata to Photoreka. You maintain complete control over your catalog and files.",
    color: "#06b6d4",
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "Is the plugin really free?",
    answer:
      "Yes, the Lightroom plugin is completely free with any Photoreka account. No additional costs beyond your Photoreka subscription.",
  },
  {
    question: "Which version of Lightroom is supported?",
    answer:
      "The plugin works with Adobe Lightroom Classic (desktop version). It's not compatible with the cloud-based Lightroom CC at this time.",
  },
  {
    question: "Will the plugin modify my catalog or photos?",
    answer:
      "No. The plugin only reads your catalog and metadata. It never modifies your original files, catalog structure, or existing metadata. Your Lightroom library remains completely intact.",
  },
  {
    question: "How does the natural language search work?",
    answer:
      "The plugin uses AI to analyze your photos' visual content. You can search using everyday language like 'sunset photos with mountains' or 'black and white portraits' and it will find relevant images based on their actual content, not just keywords.",
  },
  {
    question: "Do my photos get uploaded to the cloud?",
    answer:
      "Your full-resolution photos stay on your computer. The plugin only sends small previews and metadata to Photoreka for analysis. You maintain complete control over your original files.",
  },
  {
    question: "Can I use the plugin offline?",
    answer:
      "Initial analysis and search require an internet connection. However, once your photos are analyzed, you can browse previously analyzed content offline within Lightroom.",
  },
  {
    question: "How long does the initial analysis take?",
    answer:
      "Analysis speed depends on your catalog size and internet connection. Typically, the plugin processes around 1000 photos in one hour. You can continue working in Lightroom while analysis runs in the background.",
  },
  {
    question: "What happens if I move or rename photos in Lightroom?",
    answer:
      "The synchronization works on your unique identifiers, which means changes in file names or locations are tracked and updated automatically.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

// Navigation methods
const goToHome = () => {
  trackUserAction("navigate_to_home", "lightroom_plugin_page");
  navigateTo("/");
};

const goToPlugin = () => {
  trackUserAction("download_plugin", "lightroom_plugin_page");
  // Download the plugin zip file
  const link = document.createElement("a");
  link.href = "/Photoreka.lrplugin.zip";
  link.download = "Photoreka.lrplugin.zip";
  link.click();
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "lightroom_plugin_page");
  const atlasUrl = `${config.public.appUrl}/atlas`;
  window.open(atlasUrl, "_blank");
};

// FAQ methods
const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = activeFAQ.value === index ? null : index;
  trackEvent("faq_toggle", {
    page: "framer",
    faq_index: index,
    action: wasOpen ? "close" : "open",
  });
};

// Scroll-based animations
const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const createObserver = (section, visibleRef) => {
    if (!section.value) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleRef.value = true;
        }
      });
    }, observerOptions);
    observer.observe(section.value);
  };

  createObserver(heroSection, heroVisible);
  createObserver(featuresSection, featuresVisible);
  createObserver(atlasSection, atlasVisible);
  createObserver(faqSection, faqVisible);
  createObserver(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();

  // Set video playback rate to 1.5x
  if (videoRef.value) {
    videoRef.value.playbackRate = 1.8;
  }

  trackEvent("page_view", {
    page: "lightroom_plugin",
    page_title: "Lightroom Classic Plugin - Photoreka",
  });
});
</script>

<style scoped>
/* Page Container */
.framer-page {
  min-height: 100vh;
  background: var(--premium-bg-primary);
  color: var(--premium-text-primary);
}

/* Navigation */
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
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #8b5cf6;
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
  max-width: 600px;
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
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.hero-actions.visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-note {
  font-size: 0.9rem;
  color: var(--premium-text-secondary);
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
  box-shadow:
    0 35px 70px -15px rgba(0, 0, 0, 0.5),
    0 0 0 1px var(--premium-border);
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
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

@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-content {
    text-align: center;
    align-items: center;
  }

  .hero-actions {
    align-items: center;
  }

  .hero-subtitle {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .framer-hero {
    padding: 6rem 1rem 3rem;
    min-height: auto;
  }

  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.2;
  animation: float 25s infinite ease-in-out;
  will-change: transform;
}

.orb-1 {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
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
  width: 550px;
  height: 550px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
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

.gradient-badge {
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1),
    rgba(249, 115, 22, 0.1)
  );
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
}

.gradient-text {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline;
}

.benefit-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.15),
    rgba(249, 115, 22, 0.15)
  );
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 10px;
  color: #f59e0b;
}

.benefit-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.benefit-text strong {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--premium-text-primary);
}

.benefit-text span {
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
  line-height: 1.5;
}

.cta-note {
  font-size: 0.85rem;
  color: var(--premium-text-secondary);

  gap: 0.5rem;
}

.visual-wrapper {
  position: relative;
  width: 100%;
  perspective: 1000px;
}

.visual-frame {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--premium-border);
  background: var(--premium-bg-card);
  transform: rotateY(-5deg) rotateX(2deg);
  transition: transform 0.4s ease;
}

.visual-frame:hover {
  transform: rotateY(0deg) rotateX(0deg);
}

.visual-image {
  width: 100%;
  height: auto;
  display: block;
}

.visual-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--premium-text-primary);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: fadeInFloat 0.8s ease forwards;
  opacity: 0;
}

.badge-1 {
  top: 10%;
  right: -5%;
  animation-delay: 0.5s;
  color: #22c55e;
}

.badge-2 {
  bottom: 25%;
  left: -8%;
  animation-delay: 0.7s;
  color: #8b5cf6;
}

.badge-3 {
  bottom: 8%;
  right: 5%;
  animation-delay: 0.9s;
  color: #f59e0b;
}

@keyframes fadeInFloat {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Demo Section */
.demo-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
}

.demo-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.demo-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--premium-text-secondary);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.video-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
}

.demo-video {
  width: 100%;
  display: block;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
}

.section-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 3rem;
}

.section-header.visible {
  opacity: 1;
  transform: translateY(0);
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
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
}

/* 3D Atlas Section */
.atlas-section {
  position: relative;
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
  overflow: hidden;
}

.atlas-content {
  opacity: 1 !important;
  transform: none !important;
}

.atlas-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
}

.atlas-badge {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
}

.atlas-features {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 1 !important;
  transform: none !important;
}

.atlas-features.visible {
  opacity: 1;
  transform: translateY(0);
}

.atlas-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--premium-text-primary);
  font-size: 0.95rem;
}

.feature-icon-wrapper {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 8px;
}

.video-frame {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: var(--premium-bg-card);
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* How It Works Section */
.how-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.steps-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step-card {
  display: flex;
  gap: 2rem;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-card.visible {
  opacity: 1;
  transform: translateX(0);
}

.step-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
}

/* Use Cases Section */
.usecases-section {
  padding: 6rem 2rem;
}

.usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.usecase-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.usecase-card.visible {
  opacity: 1;
  transform: scale(1);
}

.usecase-card:hover {
  transform: scale(1.05);
}

.usecase-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border-radius: 16px;
  color: white;
}

.usecase-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.usecase-description {
  color: var(--premium-text-secondary);
  line-height: 1.7;
}

/* Gallery Section */
.gallery-section {
  padding: 6rem 2rem;
  background: var(--premium-bg-secondary);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.gallery-grid.visible {
  opacity: 1;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-grid.visible .gallery-item {
  transform: translateY(0);
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-label {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

/* FAQ Section */
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
  font-size: 1.1rem;
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
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA Section */
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
}

.cta-description {
  font-size: 1.2rem;
  color: var(--premium-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.cta-extra {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--premium-border);
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

/* Responsive */
@media (max-width: 968px) {
  .visual-frame {
    transform: none;
  }

  .visual-badge {
    font-size: 0.75rem;
    padding: 0.5rem 0.9rem;
  }

  .badge-1 {
    top: 5%;
    right: 2%;
  }

  .badge-2 {
    bottom: 20%;
    left: 2%;
  }

  .badge-3 {
    bottom: 5%;
    right: 2%;
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

  .benefit-icon {
    width: 36px;
    height: 36px;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid,
  .usecases-grid,
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .step-card {
    flex-direction: column;
    text-align: center;
  }

  .step-number {
    margin: 0 auto;
  }

  .visual-badge {
    display: none;
  }
}
</style>
