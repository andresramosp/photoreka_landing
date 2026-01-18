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
                  Navigate your entire catalog as a
                  <span class="gradient-text"> 3D universe</span>
                </h2>
                <p class="hero-subtitle" :class="{ visible: atlasVisible }">
                  Photoreka's 3D Atlas is a revolutionary way to explore your
                  photographic body of work. Your photos are automatically
                  positioned in an immersive 3D space based on visual
                  similarity, creating dynamic clusters that reveal hidden
                  patterns, stylistic evolution, and thematic connections you
                  never knew existed. Experience your catalog as a cohesive
                  whole, not just as individual images.
                </p>

                <!-- <ul class="atlas-features" :class="{ visible: atlasVisible }">
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
                </ul> -->

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
                    Access 3D Atlas
                  </n-button>
                  <!-- <span class="cta-note">Launch in Photoreka web platform</span> -->
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">See your work like never before</h2>
              <p class="section-subtitle">
                The 3D Atlas transforms how you understand and curate your
                photographic archive. Explore relationships, discover patterns,
                and gain insights impossible in traditional grid views.
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
                Everything you need to know about the 3D Atlas
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
                Experience your catalog in a new dimension
              </h2>
              <p class="cta-description">
                Stop viewing your photos one at a time in endless grids. Explore
                your entire photographic body of work as a cohesive universe.
                Discover patterns, build sequences, and understand your
                evolution as a photographer. The 3D Atlas changes everything.
              </p>
              <n-button type="warning" size="large" strong @click="goToAtlas">
                <template #icon>
                  <n-icon><CubeOutline /></n-icon>
                </template>
                Access 3D Atlas Now
              </n-button>
              <div class="cta-extra">
                <p>
                  Want to learn more?
                  <a @click="goToHome" class="cta-link"
                    >Explore all Photoreka features</a
                  >
                </p>
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
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";

// SEO Configuration
useSEO("photo_3d_atlas");

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

const heroVisible = ref(false);
const featuresVisible = ref(false);
const atlasVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);

// Features data
const features = ref([
  {
    icon: markRaw(CubeOutline),
    title: "Immersive 3D Navigation",
    description:
      "Fly through your catalog in real-time 3D space. Zoom, rotate, and explore your photos from any angle. The intuitive controls make navigating thousands of images feel natural and effortless.",
    color: "#2563eb",
  },
  {
    icon: markRaw(GridOutline),
    title: "Intelligent Clustering",
    description:
      "Photos are automatically grouped by visual similarity using advanced AI. Similar compositions, colors, subjects, and moods naturally cluster together, revealing your photographic patterns and evolution.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(NavigateOutline),
    title: "Multi-Dimensional Views",
    description:
      "Switch between contextual, narrative, and aesthetic navigation modes. See your work organized by time, by story, or by visual characteristics. Each view offers unique insights into your archive.",
    color: "#22c55e",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Pattern Discovery",
    description:
      "Uncover hidden relationships in your work. Find recurring themes, color palettes, and compositional styles you didn't realize defined your photography. See your evolution as a photographer over time.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ShareSocialOutline),
    title: "Sequence Building",
    description:
      "Create meaningful photo sequences by exploring spatial relationships. Build stories, portfolios, and exhibitions by discovering which images naturally belong together in 3D space.",
    color: "#ec4899",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "Real-Time Performance",
    description:
      "Navigate thousands of photos smoothly with optimized rendering. The 3D Atlas handles large catalogs effortlessly, providing instant feedback as you explore your archive.",
    color: "#06b6d4",
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "What is the 3D Atlas?",
    answer:
      "The 3D Atlas is an immersive visualization tool that displays your entire photo catalog in a navigable 3D space. Photos are positioned based on visual similarity, creating clusters that reveal patterns and relationships in your work that traditional grid views can't show.",
  },
  {
    question: "How does the clustering work?",
    answer:
      "Our AI analyzes the visual content of each photo—composition, colors, subjects, mood, lighting. Photos with similar characteristics are automatically positioned close to each other in 3D space, creating natural clusters. This reveals your photographic patterns and evolution over time.",
  },
  {
    question: "Can I navigate large catalogs smoothly?",
    answer:
      "Yes. The 3D Atlas is optimized to handle catalogs with thousands of photos. We use progressive loading and level-of-detail techniques to ensure smooth navigation even with very large archives. The experience remains fluid regardless of catalog size.",
  },
  {
    question: "What are the different navigation modes?",
    answer:
      "The Atlas offers three modes: Contextual (organized by content and subject matter), Narrative (arranged by time and story), Visual Accents (highlighting key visual elements) and Overall Style. Each mode offers unique insights into your photographic body of work.",
  },
  {
    question: "Can I use this for sequence building?",
    answer:
      "Absolutely. The 3D Atlas is perfect for discovering which photos naturally belong together. You can select photos in 3D space to create sequences, portfolios, or exhibitions based on their visual relationships and spatial proximity.",
  },
  {
    question: "Is this included with Photoreka?",
    answer:
      "Yes, the 3D Atlas is a core feature of Photoreka. It's available to all users as part of the platform. You can access it directly through the web interface after uploading or syncing your catalog.",
  },
  {
    question: "Do I need special hardware to run it?",
    answer:
      "The 3D Atlas runs in modern web browsers using WebGL. Any computer with a decent graphics card (even integrated graphics from the last 5 years) can run it smoothly. No special hardware or installation required.",
  },
  {
    question: "Can I export or share what I discover?",
    answer:
      "Yes. You can save specific views, export sequences you've created, and share links to particular clusters or arrangements. This makes it easy to show others the patterns and relationships you've discovered in your work.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

// Dialog states
const showRequestDialog = ref(false);

// Navigation methods
const goToHome = () => {
  trackUserAction("navigate_to_home", "photo_3d_atlas_page");
  navigateTo("/");
};

const goToAtlas = () => {
  trackUserAction("launch_atlas", "photo_3d_atlas_page");
  showRequestDialog.value = true;
};

// FAQ methods
const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = activeFAQ.value === index ? null : index;
  trackEvent("faq_toggle", {
    page: "photo_3d_atlas",
    faq_index: index,
    action: wasOpen ? "close" : "open",
  });
};

// Request success callback
const onRequestSuccess = () => {
  trackEvent("access_request_submitted", {
    page: "photo_3d_atlas",
  });
  showRequestDialog.value = false;
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

  trackEvent("page_view", {
    page: "photo_3d_atlas",
    page_title: "3D Atlas - Navigate Your Catalog in 3D | Photoreka",
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
  grid-template-columns: 1.2fr 0.8fr;
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
  font-size: 16px;
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
