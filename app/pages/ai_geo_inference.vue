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
                    <n-icon size="16"><GlobeOutline /></n-icon>
                    AI Geo-Inference for existing libraries
                  </span>
                </div>
                <h1 class="hero-title" :class="{ visible: heroVisible }">
                  Your photos know where they were taken.
                  <span class="gradient-text">Let AI find out.</span>
                </h1>
                <p class="hero-subtitle" :class="{ visible: heroVisible }">
                  Trying to fix missing GPS metadata in your existing photo
                  library? Most travel and documentary shots lack coordinates
                  but still carry location cues in every pixel. Photoreka's AI
                  engine inspects your untagged photos, reads visual context
                  (architecture, signage, landscapes, lighting), and
                  <strong>places them on the map</strong> with city or
                  district-level precision. It is AI geotagging for DSLR and
                  archive libraries that were shot without GPS.<br /><br />
                  This workflow is built for your own catalog inside Photoreka,
                  not for OSINT-style investigation of third-party photos.
                  <br /><br />
                  A geolocatability forecast shows you the expected success rate
                  before you spend a single credit. Only confident matches land
                  on your map.
                </p>

                <div class="hero-actions" :class="{ visible: heroVisible }">
                  <n-button type="info" size="large" strong @click="goToApp">
                    <template #icon>
                      <n-icon><MapOutline /></n-icon>
                    </template>
                    Open the Map
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
                <!--
                  Temporary placeholder slideshow.
                  TODO: replace with geo-inference product screenshots.
                -->
                <div class="video-frame hero-slideshow">
                  <div
                    v-for="(img, i) in slideshowImages"
                    :key="i"
                    class="hero-slide"
                    :class="{ active: currentSlide === i }"
                    :style="{
                      backgroundImage: `url(${img.src})`,
                      transform: slideTransforms[i],
                    }"
                    role="img"
                    :aria-label="img.alt"
                  ></div>
                  <div class="hero-slideshow-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Use Cases Section -->
        <section class="examples-section" ref="usecasesSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: usecasesVisible }">
              <h2 class="section-title">
                Who needs to recover missing GPS metadata
              </h2>
              <p class="section-subtitle">
                Whether you've been shooting for years without GPS or just want
                to fill in the blanks in your archive — geo-inference puts your
                story on the map.
              </p>
            </div>

            <div class="usecases-grid" :class="{ visible: usecasesVisible }">
              <div
                v-for="(uc, i) in usecases"
                :key="i"
                class="usecase-card"
                :style="{ transitionDelay: `${i * 100}ms` }"
              >
                <div class="usecase-icon" :style="{ color: uc.color }">
                  <n-icon size="28">
                    <component :is="uc.icon" />
                  </n-icon>
                </div>
                <h3 class="usecase-title">{{ uc.title }}</h3>
                <p class="usecase-description">{{ uc.description }}</p>
              </div>
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
              <h2 class="section-title">How geo-inference works</h2>
              <p class="section-subtitle">
                From opening the map to AI geotagging your photos — four steps
                and you're done, even if it takes a while to process.
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

        <!-- Geo Recovery Alternative Section -->
        <section class="geo-recovery-section" ref="geoRecoverySection">
          <div class="section-container">
            <div
              class="geo-recovery-content"
              :class="{ visible: geoRecoveryVisible }"
            >
              <div class="geo-recovery-badge">
                <n-icon size="18"><DownloadOutline /></n-icon>
                <span>Alternative Option</span>
              </div>
              <h2 class="geo-recovery-title">
                No Photoreka account?
                <span class="gradient-text-green">Try Geo Recovery</span>
              </h2>
              <p class="geo-recovery-description">
                If you just need a one-time geolocation service without a full
                Photoreka account,
                <strong>Geo Recovery</strong> is the perfect solution. Upload
                any batch of photos, pay once, and download your originals with
                GPS coordinates embedded directly in the EXIF. No sign-up
                required, no subscription, no strings attached.
              </p>
              <div class="geo-recovery-features">
                <div class="geo-recovery-feature">
                  <n-icon size="24" color="#22c55e"
                    ><CheckmarkCircleOutline
                  /></n-icon>
                  <span>One-time payment per batch</span>
                </div>
                <div class="geo-recovery-feature">
                  <n-icon size="24" color="#22c55e"
                    ><CheckmarkCircleOutline
                  /></n-icon>
                  <span>No account or subscription needed</span>
                </div>
                <div class="geo-recovery-feature">
                  <n-icon size="24" color="#22c55e"
                    ><CheckmarkCircleOutline
                  /></n-icon>
                  <span>GPS embedded in original files</span>
                </div>
                <!-- <div class="geo-recovery-feature">
                  <n-icon size="24" color="#22c55e"><CheckmarkCircleOutline /></n-icon>
                  <span>Download and keep forever</span>
                </div> -->
              </div>
              <div class="geo-recovery-actions">
                <n-button
                  type="success"
                  size="large"
                  strong
                  @click="goToGeoRecovery"
                >
                  <template #icon>
                    <n-icon><DownloadOutline /></n-icon>
                  </template>
                  Try Geo Recovery Free
                </n-button>
                <span class="geo-recovery-note">No registration required</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Grid Section -->
        <section class="features-section" ref="featuresSection">
          <div class="section-container">
            <div class="section-header" :class="{ visible: featuresVisible }">
              <h2 class="section-title">
                Built for accuracy, designed for trust
              </h2>
              <p class="section-subtitle">
                Not every photo can be geolocated or geotagged — and we tell you
                that upfront. Every design decision prioritises reliability over
                recall.
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

        <!-- Map Section (world map visual + copy) -->
        <section class="atlas-section" ref="mapSection">
          <div class="hero-background">
            <div class="gradient-orb orb-1" style="animation-delay: -5s"></div>
            <div class="gradient-orb orb-2" style="animation-delay: -12s"></div>
          </div>
          <div class="hero-container">
            <div class="hero-layout">
              <!-- Left: Map screenshot -->
              <div class="hero-visual" :class="{ visible: mapVisible }">
                <div class="video-frame">
                  <img
                    src="/ai_geoinference/4.png"
                    alt="Geo-inference interactive map"
                    class="map-screenshot"
                  />
                </div>
              </div>

              <!-- Right: Content -->
              <div
                class="hero-content atlas-content"
                :class="{ visible: mapVisible }"
              >
                <div
                  class="hero-badge atlas-badge"
                  :class="{ visible: mapVisible }"
                >
                  <span class="badge-content">
                    <n-icon size="18"><MapOutline /></n-icon>
                    Interactive Map
                  </span>
                </div>
                <h2
                  class="hero-title atlas-title"
                  :class="{ visible: mapVisible }"
                >
                  Every photo. Every location.
                  <span class="gradient-text">One map.</span>
                </h2>
                <p class="hero-subtitle" :class="{ visible: mapVisible }">
                  Once geo-inference completes, your photos appear as clustered,
                  geotagged markers on a full-screen interactive map. Click any
                  cluster to explore what was shot there. Filter by GPS
                  confidence, AI inference quality, or granularity (city,
                  region, country). Correct any misplaced photo directly from
                  its marker — manual precision always wins over AI.
                </p>

                <div class="hero-actions" :class="{ visible: mapVisible }">
                  <n-button type="primary" size="large" strong @click="goToApp">
                    <template #icon>
                      <n-icon><MapOutline /></n-icon>
                    </template>
                    Explore the Map
                  </n-button>
                  <span class="cta-note"
                    >Available in the Photoreka web platform</span
                  >
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
                Everything you need to know about AI geo-inference
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
                Your archive holds more geography than you think.
              </h2>
              <p class="cta-description">
                Stop guessing where your photos were taken. Let Photoreka's AI
                read the visual evidence and put them on the map — city by city,
                memory by memory.
              </p>
              <div class="cta-buttons">
                <n-button type="info" size="large" strong @click="goToApp">
                  <template #icon>
                    <n-icon><MapOutline /></n-icon>
                  </template>
                  Open the Map
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
                  Want to explore your photos visually?
                  <a @click="goToAtlas" class="cta-link">See 3D Atlas</a>
                  &middot;
                  <a @click="goToPortfolio" class="cta-link"
                    >Build a Portfolio</a
                  >
                  &middot;
                  <a @click="goToGeoRecovery" class="cta-link"
                    >Geotag photos with AI</a
                  >
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
import { markRaw, nextTick } from "vue";
import {
  SunnyOutline,
  MoonOutline,
  ArrowBackOutline,
  KeyOutline,
  ChevronDownOutline,
  GlobeOutline,
  MapOutline,
  LocationOutline,
  SparklesOutline,
  EyeOutline,
  CheckmarkCircleOutline,
  AlertCircleOutline,
  CloudOutline,
  CreateOutline,
  FlashOutline,
  CameraOutline,
  PeopleOutline,
  LeafOutline,
  TrendingUpOutline,
  InformationCircleOutline,
  FilterOutline,
  DownloadOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_geo_inference");

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

// Section refs
const heroSection = ref(null);
const usecasesSection = ref(null);
const howSection = ref(null);
const geoRecoverySection = ref(null);
const featuresSection = ref(null);
const mapSection = ref(null);
const faqSection = ref(null);
const ctaSection = ref(null);

// Visibility flags
const heroVisible = ref(false);
const usecasesVisible = ref(false);
const howVisible = ref(false);
const geoRecoveryVisible = ref(false);
const featuresVisible = ref(false);
const mapVisible = ref(true);
const faqVisible = ref(false);
const ctaVisible = ref(false);

const activeFAQ = ref(null);
const showRequestDialog = ref(false);

// Hero slideshow — placeholder images (same as portfolio builder for now)
// TODO: replace with geo-inference / world-map product screenshots
const slideshowImages = [
  { src: "/ai_geoinference/1.png", alt: "Geo-inference map view - step 1" },
  { src: "/ai_geoinference/2.png", alt: "Geo-inference map view - step 2" },
  { src: "/ai_geoinference/3.png", alt: "Geo-inference map view - step 3" },
  { src: "/ai_geoinference/4.png", alt: "Geo-inference map view - step 4" },
];
const currentSlide = ref(0);
const slideTransforms = ref(slideshowImages.map(() => "scale(1.0)"));
let slideshowTimer = null;

const activateSlide = (idx) => {
  slideTransforms.value[idx] = "scale(1.0)";
  nextTick(() => {
    slideTransforms.value[idx] = "scale(1.1)";
  });
};

const deactivateSlide = (idx) => {
  setTimeout(() => {
    slideTransforms.value[idx] = "scale(1.0)";
  }, 1100);
};

// Use cases
const usecases = ref([
  {
    icon: markRaw(CameraOutline),
    title: "Travel Photographers",
    description:
      "Shot thousands of frames across a dozen countries before GPS was standard? Geo-inference reads landmarks, architecture, and signage to recover the geography your old camera never stored.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(EyeOutline),
    title: "Documentary & Street",
    description:
      "Urban environments, street signs, and architectural details are rich visual cues. Wide-frame, well-lit outdoor shots achieve the highest inference accuracy — exactly the kind street and documentary work produces.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(LeafOutline),
    title: "Nature & Landscape",
    description:
      "Distinctive terrain, flora, and lighting conditions often reveal region or country. Outdoor shots in natural light are the strongest candidates for successful geolocation.",
    color: "#22c55e",
  },
  {
    icon: markRaw(TrendingUpOutline),
    title: "Archive Researchers",
    description:
      "Working with digitized film archives or inherited photo collections with no metadata? AI geo-inference provides a first-pass geographic classification for large, untagged batches.",
    color: "#f59e0b",
  },
]);

// How it works steps
const steps = ref([
  {
    title: "Open the World Map",
    description:
      "Navigate to the World Map in the Photoreka web platform. Your photos with real GPS coordinates are already plotted. Photos without location data are counted and ready for analysis.",
    color: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
  {
    title: "Review the geolocatability forecast",
    description:
      "Before committing any credits, the AI scores each photo across genre, lighting, framing, focus, depth of field, and palette. A three-tier forecast (Good / Possible / Unlikely) shows you how many photos are worth analyzing — so you can decide whether to proceed.",
    color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    title: "Start inference in the background",
    description:
      "Click Start Inference. Photoreka sends each photo to a vision AI that reads visual context, infers the most likely city or region, and filters out low-confidence guesses. You can close the dialog — processing continues in the background and you'll receive an email when the map is updated.",
    color: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  {
    title: "Explore, filter, and correct",
    description:
      "New markers appear on the map with a distinct glow. Filter by inference confidence, granularity (place / city / region / country), or visual aspects. Any marker can be manually corrected — click the edit button, drag the pin to the exact location, and your correction is permanently stored.",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
]);

// Features
const features = ref([
  {
    icon: markRaw(TrendingUpOutline),
    title: "Geolocatability Forecast",
    description:
      "Before you spend any credits, a heuristic scoring algorithm evaluates each photo's genre, lighting, framing, palette and focus. The three-tier forecast (Good / Possible / Unlikely) sets honest expectations and warns you if your batch has low success potential. Ideal before you start geotagging a large archive.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(CheckmarkCircleOutline),
    title: "Confidence Gating",
    description:
      "Only high-confidence inferences land on the map. Photos where the AI cannot identify a reliable location are explicitly marked as unknown — they never produce phantom pins that mislead you.",
    color: "#22c55e",
  },
  {
    icon: markRaw(MapOutline),
    title: "City or District Precision",
    description:
      "Results are delivered at city or district level — realistic and useful for archiving and storytelling. The system doesn't guess street-level coordinates it can't support, but accurately places your photo in the right metropolitan area.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(CloudOutline),
    title: "Background Processing",
    description:
      "Large batches can take time. Once you start an inference job you can close the dialog, navigate elsewhere, or close the browser entirely. Photoreka processes in the background and emails you when the map update is ready.",
    color: "#f59e0b",
  },
  {
    icon: markRaw(CreateOutline),
    title: "Manual Correction",
    description:
      "Every AI-inferred marker displays a pencil button. Click it to open a correction panel, adjust the coordinates (city or precise pin), and save. Your correction replaces the AI result permanently — you always have the final word.",
    color: "#ec4899",
  },
  {
    icon: markRaw(FilterOutline),
    title: "Rich Map Filtering",
    description:
      "Filter your map markers by GPS source (real GPS, AI-inferred, or manually corrected), confidence level, geographic granularity, or any combination of visual aspects (genre, lighting, framing…). Explore your archive the way you want to.",
    color: "#0891b2",
  },
]);

// FAQs
const faqs = ref([
  {
    question: "How to geotag photos already taken in an existing library?",
    answer:
      "Open the world map in your existing Photoreka catalog, run AI Geo-Inference on photos without GPS metadata, review confidence-based placements, and correct any marker manually before using those locations in your workflow.",
  },
  {
    question: "What kinds of photos work best?",
    answer:
      "Outdoor photos in natural light with wide or medium framing yield the highest success rates. Architectural details, street signage, distinctive landscapes, and recognizable landmarks are the strongest cues. Studio, portrait, abstract, and macro shots score poorly because they carry little geographic information. If your DSLR archive has many outdoor travel frames, geo-inference usually performs best.",
  },
  {
    question: "Is this photo geotagging or EXIF GPS writing?",
    answer:
      "It is AI photo geotagging on the Photoreka world map, so you can organize your library by place. If you need GPS written into EXIF metadata for download, use Geo Recovery.",
  },
  {
    question: "What does the geolocatability forecast actually measure?",
    answer:
      "It scores each photo using its analyzed visual aspects — genre, focus, lighting, framing, depth of field, palette, and stylistic traits — against a heuristic table calibrated for geolocation probability. The score determines which tier (Good ≥60, Possible 35–59, Unlikely <35 out of 100) a photo falls into. The forecast runs instantly and costs no credits.",
  },
  {
    question: "Are credits charged for photos that can't be located?",
    answer:
      "Yes. Credits are charged per photo analyzed, regardless of whether a confident location is found. The geolocatability forecast is specifically designed to help you make an informed decision before starting — if most of your batch falls in the Unlikely tier, we explicitly warn you.",
  },
  {
    question: "How precise are the results?",
    answer:
      "Results are typically at city or district level. Street-level precision is rare and never guaranteed. Several photos shot in the same city may cluster at the same point when finer context isn't available. The system aims for geographic truth, not exact GPS coordinates.",
  },
  {
    question: "Can I correct wrong placements?",
    answer:
      "Yes, always. Every AI-inferred marker shows a pencil icon. Clicking it opens a correction panel where you can type a city name or drag the pin to the exact position. Corrections are stored permanently and override the AI result.",
  },
  {
    question: "Do photos already analyzed in a previous run get skipped?",
    answer:
      'Yes. The inference engine only processes photos that still lack a location and have not been explicitly marked as "location cannot be inferred" from a prior run. Running the analysis again after uploading new photos is safe and efficient.',
  },
  {
    question: "Does this work with photos imported from Lightroom?",
    answer:
      "Yes. Any photo in your Photoreka catalog — whether uploaded through the web app or synced via the Lightroom Plugin — is eligible for geo-inference, provided it has been analyzed and lacks a GPS location.",
  },
]);

// Runtime config
const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToHome = () => {
  trackUserAction("navigate_to_home", "ai_geo_inference_page");
  navigateTo("/");
};

const goToApp = () => {
  trackUserAction("navigate_to_app_map", "ai_geo_inference_page");
  window.open("https://app.photoreka.com/demo/world-map", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "ai_geo_inference_page");
  if (isOpenMode.value) {
    window.open("https://www.photoreka.com/auth", "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "ai_geo_inference_page");
  navigateTo("/photo_3D_atlas");
};

const goToPortfolio = () => {
  trackUserAction("navigate_to_portfolio", "ai_geo_inference_page");
  navigateTo("/photography_portfolio_builder");
};

const goToGeoRecovery = () => {
  trackUserAction("navigate_to_geo_recovery", "ai_geo_inference_page");
  navigateTo("/ai_geo_recovery");
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  trackEvent("faq_toggle", {
    page: "ai_geo_inference",
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
  watch(usecasesSection, usecasesVisible);
  watch(howSection, howVisible);
  watch(geoRecoverySection, geoRecoveryVisible);
  watch(featuresSection, featuresVisible);
  watch(mapSection, mapVisible);
  watch(faqSection, faqVisible);
  watch(ctaSection, ctaVisible);
};

onMounted(() => {
  initTheme();
  heroVisible.value = true;
  setupScrollAnimations();
  trackEvent("page_view", { page: "ai_geo_inference" });

  activateSlide(0);

  slideshowTimer = setInterval(() => {
    const prev = currentSlide.value;
    const next = (prev + 1) % slideshowImages.length;
    deactivateSlide(prev);
    currentSlide.value = next;
    activateSlide(next);
  }, 3333);
});

onUnmounted(() => {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
});
</script>

<style scoped>
/* ── Geo-inference accent color ──────────────────────────────── */
:root,
[data-theme="dark"],
[data-theme="light"] {
  --geo-accent: #06b6d4;
}

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
    0 0 0 1px rgba(6, 182, 212, 0.15),
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(6, 182, 212, 0.08);
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

/* ── Hero slideshow ─────────────────────────────────────────── */
.hero-slideshow {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--premium-bg-card);
}
.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1);
  transition:
    opacity 0.93s ease,
    transform 3.5s ease;
}
.hero-slide.active {
  opacity: 1;
}
.hero-slideshow-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.35) 100%
  );
  border-radius: 20px;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    transition: opacity 0.93s ease;
  }
}

.map-screenshot {
  width: 100%;
  height: auto;
  display: block;
}

/* ── Gradient text & orbs ─────────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-green {
  background: linear-gradient(135deg, #22c55e, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}
.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #06b6d4, transparent);
  top: -20%;
  left: -10%;
  animation: float 20s ease-in-out infinite;
}
.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #8b5cf6, transparent);
  top: 30%;
  right: -10%;
  animation: float 25s ease-in-out infinite reverse;
}
.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #0891b2, transparent);
  bottom: -15%;
  left: 40%;
  animation: float 18s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

/* ── Section shell ─────────────────────────────────────────── */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
}
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}
.section-subtitle {
  font-size: 1.1rem;
  color: var(--premium-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Use Cases Section ─────────────────────────────────────── */
.examples-section {
  background: var(--premium-bg-secondary);
}
.usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.usecases-grid.visible {
  opacity: 1;
  transform: translateY(0);
}
.usecase-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.usecase-card:hover {
  transform: translateY(-4px);
  border-color: rgba(6, 182, 212, 0.4);
}
.usecase-icon {
  margin-bottom: 1rem;
}
.usecase-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}
.usecase-description {
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ── How It Works Section ──────────────────────────────────── */
.how-section {
  position: relative;
  overflow: hidden;
}
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.steps-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.step-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.step-card:hover {
  transform: translateX(8px);
  border-color: rgba(6, 182, 212, 0.3);
}
.step-number {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.4rem;
}
.step-description {
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
  line-height: 1.65;
  margin: 0;
}

/* ── Features Section ──────────────────────────────────────── */
.features-section {
  background: var(--premium-bg-secondary);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.feature-card {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 16px;
  padding: 1.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(6, 182, 212, 0.3);
}
.feature-icon {
  margin-bottom: 1rem;
}
.feature-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}
.feature-description {
  font-size: 0.92rem;
  color: var(--premium-text-secondary);
  line-height: 1.65;
  margin: 0;
}

/* ── Map section (same layout as atlas in portfolio builder) ── */
.atlas-section {
  position: relative;
  overflow: hidden;
  padding: 5rem 2rem;
}
.atlas-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.atlas-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.atlas-title {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem) !important;
}
.atlas-badge {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.atlas-badge.visible {
  opacity: 1;
  transform: translateY(0);
}
.cta-note {
  font-size: 0.88rem;
  color: var(--premium-text-secondary);
  align-self: center;
}

/* ── FAQ Section ───────────────────────────────────────────── */
.faq-section {
  background: var(--premium-bg-secondary);
}
.faqs-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.faqs-container.visible {
  opacity: 1;
  transform: translateY(0);
}
.faq-item {
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.faq-item:hover,
.faq-item.active {
  border-color: rgba(6, 182, 212, 0.4);
}
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: var(--premium-text-primary);
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
  padding: 0 1.5rem 1.2rem;
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  animation: fadeIn 0.25s ease both;
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
  background: var(--premium-bg-primary);
}
.cta-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.cta-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}
.cta-description {
  font-size: 1.1rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  margin: 0 0 2rem;
}
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.cta-extra {
  font-size: 0.95rem;
  color: var(--premium-text-secondary);
}
.cta-extra p {
  margin: 0;
}
.cta-link {
  color: #06b6d4;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
}
.cta-link:hover {
  opacity: 0.8;
}
.cta-link--accent {
  color: #22c55e;
}

/* ── Geo Recovery Section ──────────────────────────────────── */
.geo-recovery-section {
  background: var(--premium-bg-primary);
  position: relative;
  overflow: hidden;
}
.geo-recovery-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% 50%,
    rgba(34, 197, 94, 0.08),
    transparent
  );
  pointer-events: none;
}
.geo-recovery-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  background: var(--premium-bg-card);
  border: 2px solid rgba(34, 197, 94, 0.3);
  border-radius: 24px;
  box-shadow:
    0 0 0 1px rgba(34, 197, 94, 0.1),
    0 20px 40px -10px rgba(34, 197, 94, 0.15);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.geo-recovery-content.visible {
  opacity: 1;
  transform: translateY(0);
}
.geo-recovery-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 1.5rem;
}
.geo-recovery-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.geo-recovery-description {
  font-size: 1.05rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  margin: 0 0 2rem;
}
.geo-recovery-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: left;
}
.geo-recovery-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.05);
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
}
.geo-recovery-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.geo-recovery-note {
  font-size: 0.88rem;
  color: var(--premium-text-secondary);
  font-style: italic;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 968px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero-visual {
    order: -1;
  }
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  .atlas-section .hero-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .framer-hero {
    padding: 6rem 1.5rem 4rem;
    min-height: unset;
  }
  .section-container {
    padding: 3.5rem 1.5rem;
  }
  .atlas-section {
    padding: 3.5rem 1.5rem;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .usecases-grid {
    grid-template-columns: 1fr 1fr;
  }
  .nav-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .usecases-grid {
    grid-template-columns: 1fr;
  }
  .hero-actions {
    flex-direction: column;
  }
  .geo-recovery-content {
    padding: 2rem 1.5rem;
  }
  .geo-recovery-features {
    grid-template-columns: 1fr;
  }
}
</style>
