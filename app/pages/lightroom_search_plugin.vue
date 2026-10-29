<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="lightroom_plugin_page" :links="navLinks" />

        <PageHero eyebrow="Official Plugin">
          <template #eyebrow-icon>
            <img
              src="/logos/lightroom_classic_logo.svg"
              alt="Adobe Lightroom Classic"
              class="lr-hero-logo"
            />
          </template>
          <template #title>
            Natural language search
            <em class="lx-accent">for Lightroom Classic</em>
          </template>
          <p>
            Find any photo by describing it—without manual tagging. Our official
            plugin brings AI-powered <strong>semantic search</strong> directly
            into Lightroom Classic: type what you remember and get instant
            results based on actual visual content, not just keywords.
          </p>
          <p>
            Compatible with Lightroom Classic 13.0+ · RAW, CR2, NEF, ARW, JPEG,
            PNG, TIFF · All AI processing runs locally.
          </p>
          <template #actions>
            <LxButton icon="download" @click="goToPlugin">
              Get the Plugin
            </LxButton>
            <span class="lx-status">Free with Photoreka account</span>
          </template>
          <template #visual>
            <ShotFrame
              video="/videos/lr_plugin.mp4"
              poster="/home/video_lr_poster.jpg"
              alt="Photoreka search panel inside Adobe Lightroom Classic"
              label="Lightroom Classic — Photoreka"
              ratio="16 / 9"
              :playback-rate="1.8"
            />
          </template>
        </PageHero>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Your Lightroom workflow,
                <em class="lx-accent">supercharged</em>
              </template>
              <p>
                Work faster and smarter with AI-powered search and analysis
                built right into Lightroom Classic. Plus full 3D Atlas and
                Canvas through web.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3" />
          </div>
        </section>

        <MediaSplitSection
          id="atlas"
          eyebrow="3D Atlas"
          video="/videos/atlas_1.mp4"
          poster="/home/video_poster.jpg"
          alt="Photoreka 3D Atlas clustering a photo catalog by visual similarity"
          label="Photoreka — 3D Atlas"
          reverse
        >
          <template #title>
            From Lightroom to <em class="lx-accent">3D exploration</em>
          </template>
          <p>
            Launch the 3D Atlas directly from Lightroom Classic to see your
            entire catalog as a stunning navigable universe. Your photos are
            automatically positioned in 3D space based on visual similarity,
            creating clusters that reveal hidden patterns and connections you
            never knew existed. Navigate your work contextually, narratively, or
            aesthetically to understand your photographic body of work as a
            cohesive whole.
          </p>
          <ul class="lx-list lr-atlas">
            <li v-for="item in atlasPoints" :key="item.text">
              <span class="lr-atlas__icon" :style="{ color: item.color }">
                <n-icon size="17"><component :is="item.icon" /></n-icon>
              </span>
              <span>{{ item.text }}</span>
            </li>
          </ul>
          <template #actions>
            <LxButton icon="external" @click="goToAtlas">Open 3D Atlas</LxButton>
            <span class="lx-status">Launch in Photoreka web platform</span>
          </template>
        </MediaSplitSection>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>Everything you need to know about the Lightroom plugin</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Transform your Lightroom workflow
            <em class="lx-accent">today</em>
          </template>
          <p>
            Stop manually tagging and organizing. Let AI understand your photos
            and help you find exactly what you need in seconds. Download the
            plugin and start searching smarter, not harder.
          </p>
          <template #actions>
            <LxButton icon="download" @click="goToPlugin">
              Download Plugin Now
            </LxButton>
          </template>
          <template #links>
            New to Photoreka?
            <a @click="goToHome">Explore the full platform</a>
          </template>
        </PageCta>
      </div>
    </n-message-provider>
    <RequestAccessDialog
      :show="showRequestAccessDialog"
      @update:show="showRequestAccessDialog = $event"
    />
  </n-config-provider>
</template>

<script setup>
import { markRaw } from "vue";
import {
  ShareSocialOutline,
  SpeedometerOutline,
  LockClosedOutline,
  LinkOutline,
  SyncOutline,
  ChatbubblesOutline,
  GridOutline,
  NavigateOutline,
  EyeOutline,
} from "@vicons/ionicons5";
import { trackEvent, trackUserAction } from "~/utils/analytics";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";

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
  initTheme,
} = useTheme();

const smoothScroll = useSmoothScroll();

const showRequestAccessDialog = ref(false);

const navLinks = [
  { label: "Features", target: "features" },
  { label: "3D Atlas", target: "atlas" },
  { label: "FAQ", target: "faq" },
];

// Features data
const features = [
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
];

const atlasPoints = [
  {
    icon: markRaw(GridOutline),
    color: "#2563eb",
    text: "Automatic clustering by visual similarity",
  },
  {
    icon: markRaw(NavigateOutline),
    color: "#8b5cf6",
    text: "Navigate by context, narrative, or aesthetics",
  },
  {
    icon: markRaw(EyeOutline),
    color: "#22c55e",
    text: "Discover hidden patterns in your work",
  },
];

// FAQs data
const faqs = [
  {
    question: "Is the plugin really free?",
    answer:
      "Yes, the Lightroom plugin is completely free with any Photoreka account. No additional costs beyond your Photoreka subscription.",
  },
  {
    question: "Which version of Lightroom is supported?",
    answer:
      "The plugin works with Adobe Lightroom Classic 13.0 and above (desktop version). It's not compatible with the cloud-based Lightroom CC at this time.",
  },
  {
    question: "How is this different from Lightroom's built-in search?",
    answer:
      "Lightroom's native search relies on manually entered keywords, star ratings, and metadata. Photoreka's plugin uses computer vision AI to understand the actual visual content of your photos—you can search for 'golden hour portrait with shallow depth of field' even if you never tagged a single image. It's the difference between searching a filing cabinet by label and describing a memory.",
  },
  {
    question: "How does Photoreka compare to the Excire Search plugin?",
    answer:
      "Excire Search is a well-known Lightroom plugin built on CLIP-based embeddings, which works well for short keyword prompts. Its main constraint is the model's context window (~77 tokens, roughly 50 words): long or detailed descriptions get silently truncated, and there's only one search mode — so all results are associative by proximity, with no way to enforce genuinely specific conditions. Photoreka's plugin connects to the full Photoreka platform, giving you three search modes — Broad (direct embedding similarity), Adaptive (for cultural and stylistic references: automatically expands your query with the right visual nuances), and Precise (logical inference that actually verifies conditions) — with no query length limit. Results can be enriched with AI insights, and you can continue refining through ChatLab's LLM vision layer. The plugin also unlocks the 3D Atlas and full curation toolset.",
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
  {
    question: "What kind of photo catalog is Photoreka designed for?",
    answer:
      "Photoreka is built for photographers who want to work with a curated body of work—not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 20,000 photos; up to 50,000 is workable but we recommend keeping it focused. Because analysis runs in the cloud and the tools are built around curation—sequences, semantic search, visual clusters, scores—they work best when your archive already has a baseline of intentionality: duplicates removed, clearly failed shots discarded. There is duplicate detection built in, but the value of every feature increases the more curated your starting point is.",
  },
];

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode } = useRegistrationMode();

// Navigation methods
const goToHome = () => {
  trackUserAction("navigate_to_home", "lightroom_plugin_page");
  navigateTo("/");
};

const goToPlugin = () => {
  trackUserAction("request_plugin_access", "lightroom_plugin_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestAccessDialog.value = true;
  }
};

const goToAtlas = () => {
  trackUserAction("navigate_to_atlas", "lightroom_plugin_page");
  const atlasUrl = `${config.public.appUrl}/demo/atlas?mode=3d`;
  window.open(atlasUrl, "_blank");
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "lightroom_plugin_page",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  trackEvent("page_view", {
    page: "lightroom_plugin",
    page_title: "Lightroom Classic Plugin - Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.lr-hero-logo {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.lr-atlas {
  margin-top: 1.5rem;
}

.lr-atlas__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}
</style>
