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
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Frame
                  <span class="gradient-text"> your photos beautifully </span>-
                  all at once
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Tired of framing photos one by one? Free Framer handles
                  unlimited batch processing. Upload dozens or hundreds of
                  photos, apply professional frames to all of them instantly,
                  and export in bulk. No limits. No watermarks. Completely free.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button
                    type="warning"
                    size="large"
                    strong
                    @click="goToFreeTool"
                  >
                    <template #icon>
                      <n-icon><RocketOutline /></n-icon>
                    </template>
                    Launch Free Framer
                  </n-button>
                  <span class="cta-note">No signup required</span>
                </div>
              </div>

              <!-- Right: Image -->
              <div class="hero-visual" :class="{ visible: heroVisible }">
                <img
                  src="/home/free_framer.png"
                  alt="Free Framer interface preview"
                  class="hero-image"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">Stop framing photos one by one</h2>
              <p class="section-subtitle">
                Process hundreds of photos at once, not one at a time. The only
                free tool with truly unlimited batch processing.
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

        <!-- Final CTA Section -->
        <section class="cta-section" ref="ctaSection">
          <div class="section-container">
            <div class="cta-content" :class="{ visible: ctaVisible }">
              <h2 class="cta-title">
                Stop wasting time on one photo at a time
              </h2>
              <p class="cta-description">
                Frame your entire photo collection in minutes, not hours. Upload
                as many photos as you want, apply professional frames in bulk,
                and export everything at once. Zero limits. Zero cost.
              </p>
              <n-button
                type="warning"
                size="large"
                strong
                @click="goToFreeTool"
              >
                <template #icon>
                  <n-icon><RocketOutline /></n-icon>
                </template>
                Launch Free Framer Now
              </n-button>
              <div class="cta-extra">
                <p>
                  Want more powerful tools?
                  <a @click="goToHome" class="cta-link"
                    >Explore Photoreka's full platform</a
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
} from "@vicons/ionicons5";
import { Workspace } from "@vicons/carbon";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("framer");

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
const demoSection = ref(null);
const featuresSection = ref(null);
const howSection = ref(null);
const usecasesSection = ref(null);
const gallerySection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

const heroVisible = ref(false);
const demoVisible = ref(false);
const featuresVisible = ref(false);
const howVisible = ref(false);
const usecasesVisible = ref(false);
const galleryVisible = ref(false);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);

// Features data
const features = ref([
  {
    icon: markRaw(ImagesOutline),
    title: "Unlimited Batch Processing",
    description:
      "Upload 10, 50, or 500 photos — no limits. Apply frames to all of them at once and export in bulk. What takes hours in other tools takes seconds here. Completely free with zero restrictions.",
    color: "#22c55e",
  },
  {
    icon: markRaw(StopOutline),
    title: "Multiple Frame Styles",
    description:
      "Choose from classic borders, modern minimalist frames, polaroid style, and more. Each style is designed to enhance your photos.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(ColorPaletteOutline),
    title: "Custom Colors",
    description:
      "Pick any color for your frames to match your brand or aesthetic. Full color picker with presets and recent colors.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(ResizeOutline),
    title: "Flexible Sizing",
    description:
      "Adjust frame width, padding, and aspect ratios. Create exactly the look you want with precise controls.",
    color: "#2563eb",
  },
  {
    icon: markRaw(DownloadOutline),
    title: "High Quality Export",
    description:
      "Download your framed photos in full resolution. Supports JPEG and PNG formats with quality settings.",
    color: "#ec4899",
  },
  {
    icon: markRaw(SpeedometerOutline),
    title: "Instant Preview",
    description:
      "See changes in real-time as you adjust frame styles and colors. No waiting, no rendering delays.",
    color: "#06b6d4",
  },
]);

// Steps data
const steps = ref([
  {
    title: "Upload Your Photos",
    description:
      "Click to upload or drag and drop your images. Supports all common image formats including JPEG, PNG, and TIFF.",
  },
  {
    title: "Choose Frame Style",
    description:
      "Browse through our collection of frame styles. From minimal borders to artistic frames, find the perfect match.",
  },
  {
    title: "Customize & Adjust",
    description:
      "Pick colors, adjust sizes, and fine-tune the look. See changes instantly with our real-time preview.",
  },
  {
    title: "Download & Share",
    description:
      "Export your framed photos in high quality. Download individually or as a batch — ready to share anywhere.",
  },
]);

// Use cases data
const usecases = ref([
  {
    icon: markRaw(LogoInstagram),
    title: "Social Media",
    description:
      "Create eye-catching posts for Instagram, Facebook, and other platforms. Frames make your photos stand out.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
  },
  {
    icon: markRaw(BriefcaseOutline),
    title: "Portfolio",
    description:
      "Present your work professionally. Add consistent frames to your portfolio images for a cohesive look.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
  },
  {
    icon: markRaw(BookOutline),
    title: "Photo Books",
    description:
      "Prepare photos for printing in albums and books. Frames add a polished, finished appearance.",
    gradient: "linear-gradient(135deg, #2563eb 0%, #0284c7 100%)",
  },
  {
    icon: markRaw(ShareSocialOutline),
    title: "Presentations",
    description:
      "Enhance slides and presentations with framed photos. Professional frames elevate your visual storytelling.",
    gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  },
]);

// Gallery items
const galleryItems = ref([
  {
    image: "/home/free_framer.png",
    alt: "Classic frame example",
    label: "Classic Border",
  },
  {
    image: "/home/free_framer.png",
    alt: "Modern frame example",
    label: "Modern Minimal",
  },
  {
    image: "/home/free_framer.png",
    alt: "Polaroid style frame",
    label: "Polaroid Style",
  },
  {
    image: "/home/free_framer.png",
    alt: "Custom color frame",
    label: "Custom Colors",
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "Is Free Framer really free?",
    answer:
      "Yes, completely free. No hidden costs, no subscriptions, no account required. All features are available to everyone at no charge.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed. Simply visit the tool, upload your photos, and start framing. Your work is private and stays in your browser.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Free Framer supports all common image formats including JPEG, PNG, TIFF, WebP, and more. Upload photos from any camera or device.",
  },
  {
    question: "Can I use framed photos commercially?",
    answer:
      "Yes. The frames we add don't impose any copyright. You retain all rights to your photos and can use them for any purpose, including commercial projects.",
  },
  {
    question: "How many photos can I frame at once?",
    answer:
      "There's no limit. Upload 10, 50, 100, or even 500 photos at once. Unlike other tools that charge for batch processing or limit you to a handful of images, Free Framer handles unlimited bulk framing completely free. For optimal performance, we process them efficiently in batches, but you can queue as many as you need.",
  },
  {
    question: "Are my photos stored on your servers?",
    answer:
      "No. All processing happens in your browser. Your photos are never uploaded to our servers. Once you close the page, everything is cleared from memory.",
  },
  {
    question: "Can I undo changes?",
    answer:
      "Yes. You can undo frame applications and revert to the original image at any time before downloading.",
  },
  {
    question:
      "Why is batch processing free here when other tools charge for it?",
    answer:
      "Most photo framing tools limit batch processing to paid plans because it's a premium feature. We believe photographers shouldn't have to pay or waste time editing photos one by one. Free Framer is built to handle bulk operations efficiently, and we're keeping it completely free for everyone.",
  },
  {
    question: "What quality are the exported images?",
    answer:
      "Exported images maintain the original photo quality. You can download in full resolution with your choice of JPEG or PNG format.",
  },
]);

// Runtime config
const config = useRuntimeConfig();

// Navigation methods
const goToHome = () => {
  trackUserAction("navigate_to_home", "framer_page");
  navigateTo("/");
};

const goToFreeTool = () => {
  trackUserAction("navigate_to_free_tool", "framer_page", "framer");
  const toolUrl = `${config.public.appUrl}/free-framer`;
  window.open(toolUrl, "_blank");
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
  createObserver(demoSection, demoVisible);
  createObserver(featuresSection, featuresVisible);
  createObserver(howSection, howVisible);
  createObserver(usecasesSection, usecasesVisible);
  createObserver(gallerySection, galleryVisible);
  createObserver(faqSection, faqVisible);
  createObserver(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();

  trackEvent("page_view", {
    page: "framer",
    page_title: "Free Framer - Professional Photo Frames",
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
