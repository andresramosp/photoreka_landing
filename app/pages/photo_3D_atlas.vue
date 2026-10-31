<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="photo_3d_atlas_page" :links="navLinks" />

        <PageHero eyebrow="3D Atlas">
          <template #title>
            Navigate your entire catalog as a
            <em class="lx-accent">3D universe</em>
          </template>
          <p>
            Traditional grid views show 50 photos at a time. You have thousands.
            The 3D Atlas uses AI and dimensionality reduction to position your
            entire catalog in navigable 3D space based on visual
            similarity—creating clusters that reveal hidden patterns, stylistic
            evolution, and thematic connections you never knew existed. See your
            archive as a cohesive whole, not an endless scroll.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToAtlas">
              Access 3D Atlas Demo
            </LxButton>
          </template>
          <template #visual>
            <ShotFrame
              video="/videos/atlas_1.mp4"
              poster="/home/video_poster.jpg"
              alt="Photoreka 3D Atlas mapping a photo catalog by visual similarity"
              label="Photoreka — 3D Atlas"
              ratio="16 / 9"
            />
          </template>
        </PageHero>

        <section id="features" class="lx-section">
          <div class="lx-container atlas-features">
            <!-- The intro and the 2D view stay pinned while the list is read. -->
            <div class="atlas-features__side">
              <SectionIntro eyebrow="Features" flush>
                <template #title>
                  See your work
                  <em class="lx-accent">like never before</em>
                </template>
                <p>
                  The 3D Atlas transforms how you understand and curate your
                  photographic archive. Explore relationships, discover
                  patterns, and gain insights impossible in traditional grid
                  views.
                </p>
              </SectionIntro>
              <div v-reveal="{ variant: 'scale', delay: 120 }">
                <ShotFrame
                  video="/videos/atlas_2d.mp4"
                  poster="/atlas/atlas_2d_poster.jpg"
                  alt="Photoreka 2D Atlas: photos clustered by visual similarity on a flat, zoomable map"
                  label="Photoreka — 2D Atlas"
                  ratio="16 / 10"
                  focus="100% 50%"
                />
              </div>
            </div>
            <ul class="lx-list lx-list--rich">
              <li v-for="item in features" :key="item.title">
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

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about the 3D Atlas</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Experience your catalog
            <em class="lx-accent">in a new dimension</em>
          </template>
          <p>
            Stop viewing your photos one at a time in endless grids. Explore
            your entire photographic body of work as a cohesive universe.
            Discover patterns, build sequences, and understand your evolution as
            a photographer. The 3D Atlas changes everything.
          </p>
          <template #actions>
            <LxButton icon="external" @click="goToAtlas">
              Access 3D Atlas Demo
            </LxButton>
          </template>
          <template #links>
            Want to learn more?
            <a @click="goToHome">Explore all Photoreka features</a>
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
  ShareSocialOutline,
  SpeedometerOutline,
  CubeOutline,
  GridOutline,
  NavigateOutline,
  EyeOutline,
} from "@vicons/ionicons5";
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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const navLinks = [
  { label: "Features", target: "features" },
  { label: "FAQ", target: "faq" },
];

// Features data
const features = [
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
];

// FAQs data
const faqs = [
  {
    question: "What is the 3D Atlas?",
    answer:
      "The 3D Atlas is an immersive visualization tool that displays your entire photo catalog in a navigable 3D space. Photos are positioned based on visual similarity, creating clusters that reveal patterns and relationships in your work that traditional grid views can't show.",
  },
  {
    question: "How does the clustering work?",
    answer:
      "Our AI extracts high-dimensional visual embeddings from each photo—capturing composition, colors, subjects, mood, and lighting as numerical vectors. These are then projected into 3D space using UMAP (Uniform Manifold Approximation and Projection), a dimensionality reduction technique that preserves the relationships between images. Photos with similar visual characteristics end up close to each other, forming natural clusters that reveal your photographic patterns and evolution over time.",
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
];

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
  window.open(`${config.public.appUrl}/demo/atlas`, "_blank");
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "photo_3d_atlas",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

// Request success callback
const onRequestSuccess = () => {
  trackEvent("access_request_submitted", {
    page: "photo_3d_atlas",
  });
  showRequestDialog.value = false;
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", {
    page: "photo_3d_atlas",
    page_title: "3D Atlas - Navigate Your Catalog in 3D | Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.atlas-features {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 88px);
  align-items: start;
}

.atlas-features__side {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 24px);
  display: grid;
  gap: clamp(28px, 3vw, 40px);
}

@media (max-width: 1023px) {
  .atlas-features {
    grid-template-columns: minmax(0, 1fr);
  }

  .atlas-features__side {
    position: relative;
    top: auto;
  }
}
</style>
