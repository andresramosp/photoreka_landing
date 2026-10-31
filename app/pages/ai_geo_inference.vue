<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_geo_inference_page" :links="navLinks" />

        <PageHero eyebrow="AI Geo-Inference for existing libraries">
          <template #title>
            Your photos know where they were taken.
            <em class="lx-accent">Let AI find out.</em>
          </template>
          <p>
            Trying to fix missing GPS metadata in your existing photo library?
            Most travel and documentary shots lack coordinates but still carry
            location cues in every pixel. Photoreka's AI engine inspects your
            untagged photos, reads visual context (architecture, signage,
            landscapes, lighting), and <strong>places them on the map</strong>
            with city or district-level precision. It is AI geotagging for DSLR
            and archive libraries that were shot without GPS.
          </p>
          <p>
            This workflow is built for your own catalog inside Photoreka, not
            for OSINT-style investigation of third-party photos.
          </p>
          <p>
            A geolocatability forecast shows you the expected success rate
            before you spend a single credit. Only confident matches land on
            your map.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToApp">Open the Map</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #visual>
            <ShotFrame label="Photoreka — World Map" ratio="4 / 3">
              <FeatureCarousel :images="slideshowImages" />
            </ShotFrame>
          </template>
        </PageHero>

        <section id="use-cases" class="lx-section">
          <div class="lx-container lx-beside">
            <SectionIntro
              eyebrow="Use cases"
              flush
            >
              <template #title>
                Who needs to recover
                <em class="lx-accent">missing GPS metadata</em>
              </template>
              <p>
                Whether you've been shooting for years without GPS or just want
                to fill in the blanks in your archive — geo-inference puts your
                story on the map.
              </p>
            </SectionIntro>
            <ul v-reveal="120" class="lx-list lx-list--rich">
              <li v-for="item in usecases" :key="item.title">
                <span class="lx-icon-tile" :style="{ color: item.color }">
                  <n-icon size="18"><component :is="item.icon" /></n-icon>
                </span>
                <span class="lx-list__copy">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.description }}</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <MediaSplitSection
          id="map"
          eyebrow="Interactive Map"
          src="/ai_geoinference/3.png"
          alt="Geo-inference interactive map"
          label="Photoreka — World Map"
          ratio="4 / 3"
          focus="100% 50%"
          reverse
        >
          <template #title>
            Every photo. Every location.
            <em class="lx-accent">One map.</em>
          </template>
          <p>
            Once geo-inference completes, your photos appear as clustered,
            geotagged markers on a full-screen interactive map. Click any
            cluster to explore what was shot there. Filter by GPS confidence, AI
            inference quality, or granularity (city, region, country). Correct
            any misplaced photo directly from its marker — manual precision
            always wins over AI.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToApp">Explore the Map</LxButton>
            <span class="lx-status">Available in the Photoreka web platform</span>
          </template>
        </MediaSplitSection>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                How <em class="lx-accent">geo-inference</em> works
              </template>
              <p>
                From opening the map to AI geotagging your photos — four steps
                and you're done, even if it takes a while to process.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Built for accuracy,
                <em class="lx-accent">designed for trust</em>
              </template>
              <p>
                Not every photo can be geolocated or geotagged — and we tell you
                that upfront. Every design decision prioritises reliability over
                recall.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <GeoRecoveryPromo
          eyebrow="Alternative option"
          source="ai_geo_inference_page"
          :points="geoRecoveryPoints"
        >
          <template #title>
            No Photoreka account?
            <em class="lx-accent">Try Geo Recovery</em>
          </template>
          <p>
            If you just need a one-time geolocation service without a full
            Photoreka account, <strong>Geo Recovery</strong> is the perfect
            solution. Upload any batch of photos, pay once, and download your
            originals with GPS coordinates embedded directly in the EXIF. No
            sign-up required, no subscription, no strings attached.
          </p>
        </GeoRecoveryPromo>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about AI geo-inference</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Your archive holds more geography
            <em class="lx-accent">than you think.</em>
          </template>
          <p>
            Stop guessing where your photos were taken. Let Photoreka's AI read
            the visual evidence and put them on the map — city by city, memory
            by memory.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToApp">Open the Map</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Want to explore your photos visually?
            <a @click="goToAtlas">See 3D Atlas</a>
            <span class="lx-sep" aria-hidden="true">·</span>
            <a @click="goToPortfolio">Build a Portfolio</a>
            <span class="lx-sep" aria-hidden="true">·</span>
            <a @click="goToGeoRecovery">Geotag photos with AI</a>
          </template>
        </PageCta>
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
  MapOutline,
  EyeOutline,
  CheckmarkCircleOutline,
  CloudOutline,
  CreateOutline,
  CameraOutline,
  LeafOutline,
  TrendingUpOutline,
  FilterOutline,
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const showRequestDialog = ref(false);

const navLinks = [
  { label: "Use cases", target: "use-cases" },
  { label: "Map", target: "map" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "FAQ", target: "faq" },
];

// Hero slideshow
// TODO: replace with geo-inference / world-map product screenshots
const slideshowImages = [
  { src: "/ai_geoinference/1.png", alt: "Geo-inference map view - step 1" },
  { src: "/ai_geoinference/2.png", alt: "Geo-inference map view - step 2" },
  { src: "/ai_geoinference/3.png", alt: "Geo-inference map view - step 3" },
  { src: "/ai_geoinference/4.png", alt: "Geo-inference map view - step 4" },
];

const geoRecoveryPoints = [
  "One-time payment per batch",
  "No account or subscription needed",
  "GPS embedded in original files",
];

// Use cases
const usecases = [
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
];

// How it works steps
const steps = [
  {
    title: "Open the World Map",
    description:
      "Navigate to the World Map in the Photoreka web platform. Your photos with real GPS coordinates are already plotted. Photos without location data are counted and ready for analysis.",
  },
  {
    title: "Review the geolocatability forecast",
    description:
      "Before committing any credits, the AI scores each photo across genre, lighting, framing, focus, depth of field, and palette. A three-tier forecast (Good / Possible / Unlikely) shows you how many photos are worth analyzing — so you can decide whether to proceed.",
  },
  {
    title: "Start inference in the background",
    description:
      "Click Start Inference. Photoreka sends each photo to a vision AI that reads visual context, infers the most likely city or region, and filters out low-confidence guesses. You can close the dialog — processing continues in the background and you'll receive an email when the map is updated.",
  },
  {
    title: "Explore, filter, and correct",
    description:
      "New markers appear on the map with a distinct glow. Filter by inference confidence, granularity (place / city / region / country), or visual aspects. Any marker can be manually corrected — click the edit button, drag the pin to the exact location, and your correction is permanently stored.",
  },
];

// Features
const features = [
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
];

// FAQs
const faqs = [
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
];

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
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

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_geo_inference",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", { page: "ai_geo_inference" });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>
