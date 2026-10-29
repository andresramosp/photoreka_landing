<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered com-page">
        <PageNav source="landing_commercial" :links="navLinks" />

        <PageHero eyebrow="For commercial photographers">
          <template #eyebrow-icon>
            <n-icon size="15" class="com-eyebrow-icon"
              ><BriefcaseOutline
            /></n-icon>
          </template>
          <template #title>
            Make full sense of
            <em class="lx-accent">your commercial catalog</em>
          </template>
          <p class="com-lead">
            <span>
              <strong>Photoreka</strong> is a suite of smart tools built for
              the way commercial photographers actually work.
            </span>
            <span>
              <strong>Search</strong> your archive from a client brief,
              <strong>score</strong> shots for commercial intent, and
              <strong>assemble</strong> client-ready decks in minutes.
            </span>
            <span>
              From a single <strong>campaign</strong> to your entire
              <strong>stock library</strong>.
            </span>
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToAuth('signup')">
              {{ signupButtonLabel }}
            </LxButton>
          </template>
          <template #note>
            <div class="com-trust">
              <span>AI curation built for commercial work</span>
              <span class="com-trust__stars">★★★★★</span>
            </div>
            <ul class="com-genres">
              <li v-for="genre in heroGenres" :key="genre.label">
                <n-icon size="15"><component :is="genre.icon" /></n-icon>
                {{ genre.label }}
              </li>
            </ul>
          </template>
          <template #visual>
            <ShotFrame label="Photoreka — Commercial" ratio="16 / 10.4">
              <FeatureCarousel :images="heroImages" fit="contain" />
            </ShotFrame>
          </template>
        </PageHero>

        <section id="genres" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Genres" align="center">
              <template #title>
                Built for every
                <em class="lx-accent">commercial genre</em>
              </template>
              <p>
                Different briefs, different eyes. Photoreka adapts its scoring
                and curation to the commercial work you actually shoot — so the
                right frames rise to the top, whatever the assignment.
              </p>
            </SectionIntro>
            <PageGrid :items="genreItems" :columns="5">
              <template #item="{ item }">
                <ul class="com-tags">
                  <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
                </ul>
              </template>
            </PageGrid>
          </div>
        </section>

        <MediaSplitSection
          id="ai_search"
          eyebrow="Brief-to-shot search"
          video="/videos/Search.mp4"
          poster="/home/video_poster.jpg"
          alt="Photoreka searching a commercial archive from a client brief"
          label="Photoreka — Search"
          learn-more-to="/ai_photo_search"
          @demo="goToSearchDemo"
        >
          <template #title>
            Pull the hero shot straight from
            <em class="lx-accent">the client brief</em>
          </template>
          <p>
            A client asks for “warm, candid, natural light, product in frame but
            not centered.” Type it. Photoreka reads your whole archive and
            returns the frames that match — no tagging, no scrubbing through
            folders. <strong>Broad</strong> for mood boards,
            <strong>Adaptive</strong> for referenced looks, and
            <strong>Precise</strong> when a brief has conditions that must be
            verified, not approximated.
          </p>
        </MediaSplitSection>

        <FeaturesShowcase
          variant="stack"
          section-id="features"
          eyebrow="AI tools"
          title="AI tools that move commercial work forward"
          title-accent="commercial work forward"
          subtitle="Score for commercial intent, build client-ready selections, and understand which of your styles actually lands the job — all on top of your existing library."
          :features="features"
        />

        <MediaSplitSection
          id="lightroom_plugin"
          eyebrow="Official Plugin"
          video="/videos/lr_plugin.mp4"
          poster="/home/video_lr_poster.jpg"
          alt="Photoreka search panel inside Adobe Lightroom Classic"
          label="Lightroom Classic — Photoreka"
          :playback-rate="2"
          reverse
        >
          <template #title>
            Straight from <em class="lx-accent">your catalog</em>
          </template>
          <p>
            Commercial work lives in Lightroom Classic — so Photoreka meets it
            there. Sync a shoot, search it by brief, and push your selects to
            Photoreka without breaking the delivery workflow your clients
            already expect.
          </p>
          <ul class="lx-list com-lr">
            <li v-for="item in lightroomPoints" :key="item.text">
              <span class="com-lr__icon" :style="{ color: item.color }">
                <n-icon size="17"><component :is="item.icon" /></n-icon>
              </span>
              <span>{{ item.text }}</span>
            </li>
          </ul>
          <template #actions>
            <LxButton icon="download" @click="goToAuth('signup')">
              Get the Plugin
            </LxButton>
            <span class="lx-status">Free with Photoreka account</span>
          </template>
        </MediaSplitSection>

        <section id="sources" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Import" align="center">
              <template #title>
                Bring in work from
                <em class="lx-accent">wherever it lives</em>
              </template>
              <p>
                Campaigns, stock, client galleries — Photoreka connects to the
                sources you already use. Import from Lightroom, Google Photos,
                Dropbox, or local files and start curating with AI immediately.
              </p>
            </SectionIntro>
            <PageGrid :items="sourceItems" :columns="4">
              <template #item="{ item }">
                <span
                  class="lx-status com-source-status"
                  :class="{ 'is-soon': item.comingSoon }"
                >
                  {{ item.comingSoon ? "Coming Soon" : "Available Now" }}
                </span>
              </template>
            </PageGrid>
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Questions from
            <em class="lx-accent">commercial photographers</em>
          </template>
          <p>How Photoreka fits into a paid, deadline-driven workflow</p>
        </FaqSection>
      </div>

      <RequestAccessDialog
        v-model:show="showRequestDialog"
        @success="onRequestSuccess"
      />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { h, markRaw } from "vue";
import {
  CloudUploadOutline,
  CubeOutline,
  LinkOutline,
  LogoDropbox,
  BriefcaseOutline,
  ShirtOutline,
  BusinessOutline,
  CafeOutline,
  BagHandleOutline,
  HeartOutline,
  SyncOutline,
  ChatbubblesOutline,
  ShareSocialOutline,
  InformationCircleOutline,
  BarChartOutline,
  LayersOutline,
} from "@vicons/ionicons5";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("commercial_photography", {
  robots: "noindex, nofollow, noarchive",
});

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
  { label: "Genres", target: "genres" },
  { label: "Search", target: "ai_search" },
  { label: "Features", target: "features" },
  { label: "Lightroom", target: "lightroom_plugin" },
  { label: "Sources", target: "sources" },
  { label: "FAQ", target: "faq" },
];

const heroImages = [
  {
    src: "/ai_photo_scoring/1.png",
    alt: "Commercial photo scoring with subject clarity and commercial intent in Photoreka",
  },
  {
    src: "/portfolio_builder/2.png",
    alt: "Client-ready commercial portfolio built with Photoreka AI",
  },
];

const heroGenres = [
  { icon: markRaw(ShirtOutline), label: "Fashion" },
  { icon: markRaw(BusinessOutline), label: "Architecture" },
  { icon: markRaw(CafeOutline), label: "Lifestyle" },
  { icon: markRaw(BagHandleOutline), label: "Product" },
  { icon: markRaw(HeartOutline), label: "Wedding" },
];

const lightroomPoints = [
  {
    icon: markRaw(SyncOutline),
    color: "#f59e0b",
    text: "Sync a full shoot or a single campaign",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    color: "#ec4899",
    text: "Search by brief in natural language",
  },
  {
    icon: markRaw(ShareSocialOutline),
    color: "#8b5cf6",
    text: "One-click selects transfer to Photoreka",
  },
  {
    icon: markRaw(LinkOutline),
    color: "#22c55e",
    text: "Fits your existing client delivery flow",
  },
  {
    icon: markRaw(InformationCircleOutline),
    color: "#6b7280",
    text: "Lightroom Classic 13.0+ · RAW, JPEG, PNG, TIFF",
  },
];

// Commercial genres — the page-defining block.
const genres = ref([
  {
    icon: markRaw(ShirtOutline),
    name: "Fashion",
    description:
      "Cut editorial and lookbook shoots down to the frames with the strongest styling, pose, and light — before the retouch queue.",
    tags: ["Editorial", "Lookbook", "Campaign"],
    color: "#ec4899",
  },
  {
    icon: markRaw(BusinessOutline),
    name: "Architecture",
    description:
      "Surface the cleanest lines, best verticals, and most sellable angles across an interiors or exteriors set in seconds.",
    tags: ["Interiors", "Real estate", "Spaces"],
    color: "#06b6d4",
  },
  {
    icon: markRaw(CafeOutline),
    name: "Lifestyle",
    description:
      "Find the authentic, in-the-moment frames brands buy — candid warmth scored above the staged and the stiff.",
    tags: ["Candid", "Brand", "Stock"],
    color: "#f59e0b",
  },
  {
    icon: markRaw(BagHandleOutline),
    name: "Product",
    description:
      "Rank shots on subject clarity and commercial intent, so the packshot that actually converts rises to the top.",
    tags: ["Packshot", "E-commerce", "Catalog"],
    color: "#8b5cf6",
  },
  {
    icon: markRaw(HeartOutline),
    name: "Wedding",
    description:
      "Turn a 3,000-frame wedding into a tight, emotional gallery — first selects done before the couple even asks.",
    tags: ["Gallery", "Album", "Delivery"],
    color: "#22c55e",
  },
]);

// Features — reframed around commercial deliverables.
const features = ref([
  {
    icon: markRaw(Trophy20Regular),
    title: "Commercial Scoring",
    description:
      "Score every frame for commercial intent and subject clarity, alongside aesthetics and composition.",
    lead: "Score every frame the way a client would — then rank the set automatically.",
    bullets: [
      "Commercial mode adds subject clarity and commercial intent scores",
      "Rank a full shoot by what's actually sellable",
      "Surface the packshot or hero frame without hunting",
    ],
    image: "/ai_photo_scoring/1.png",
    color: "#f59e0b",
    link: "/photo_scoring",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Client-Ready Portfolios",
    description:
      "Turn a full shoot into a curated, sequenced deck for the client in minutes.",
    lead: "Turn a shoot into a client-ready, sequenced selection in minutes.",
    bullets: [
      "Score across artistic and commercial dimensions",
      "Pick a coherence mode: visual, chromatic, narrative and more",
      "Let AI sequence the deck for a clean pitch flow",
    ],
    images: [
      "/portfolio_builder/0.png",
      "/portfolio_builder/1.png",
      "/portfolio_builder/2.png",
      "/portfolio_builder/3.png",
      "/portfolio_builder/4.png",
      "/portfolio_builder/5.png",
    ],
    color: "#ec4899",
    link: "/photography_portfolio_builder",
  },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Photo Chat for Selects",
    description:
      "Ask your archive for the strongest frames of a look, get honest critique, and build a selection in plain language.",
    lead: "Talk to your archive to build selects and get an honest second eye.",
    bullets: [
      "Ask for the best frames of a style, product or setup",
      "Get evidence-based critique before you send to a client",
      "Assemble curated selections conversationally",
    ],
    image: "/chatlab/1.png",
    color: "#8b5cf6",
    link: "/photo_chat",
    demoLink: "/demo-commercial/chatlab",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "What Style Sells",
    description:
      "See the recurring looks, palettes, and compositions across your commercial archive — and which ones win work.",
    lead: "Understand which of your styles actually lands the job.",
    bullets: [
      "Surface recurring looks, palettes and framing habits",
      "See your commercial signature from the outside",
      "Spot the gaps between what you shoot and what sells",
    ],
    image: "/report/3.png",
    color: "#06b6d4",
    link: "/photo_reports",
  },
  {
    icon: markRaw(CubeOutline),
    title: "Stock Library Atlas",
    description:
      "Map a large stock or campaign archive into 2D/3D space where similar frames cluster automatically.",
    lead: "Navigate a big stock library as a map, not an endless grid.",
    bullets: [
      "Cluster similar frames across thousands of shots",
      "Spot near-duplicates and over-shot setups fast",
      "Rediscover sellable frames buried in the archive",
    ],
    image: "/atlas/2d.png",
    color: "#14b8a6",
    link: "/photo_3D_atlas",
    demoLink: "/demo-commercial/atlas?mode=2d",
  },
]);

// Data sources (shared with the main landing).
const dataSources = ref([
  {
    icon: markRaw(CloudUploadOutline),
    name: "Local Files",
    description:
      "Upload a shoot directly from your computer. Supports all major image formats (JPEG, PNG, TIFF).",
    color: "#22c55e",
    comingSoon: false,
  },
  {
    logo: "/logos/google_photos.png",
    name: "Google Photos",
    description:
      "Sync client galleries and shared libraries with one click. Keep campaigns organized across platforms.",
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
    icon: markRaw(LogoDropbox),
    name: "Dropbox",
    description:
      "Sync Dropbox delivery folders directly with Photoreka. Works with any structure you already use.",
    color: "#0061FF",
    comingSoon: false,
  },
]);

// FAQs — commercial-specific.
const faqs = ref([
  {
    question: "What does Photoreka do for commercial photographers?",
    answer:
      "Photoreka helps you curate faster on paid work. It scores your frames for commercial intent and subject clarity, ranks a shoot by what's actually sellable, lets you search an archive from a client brief in natural language, and assembles sequenced, client-ready selections — across fashion, architecture, lifestyle, product, and wedding work.",
  },
  {
    question: "What is commercial scoring and how is it different?",
    answer:
      "On top of the standard artistic dimensions (aesthetics, composition, narrative, originality), commercial mode activates two extra scores: subject clarity — how clean and readable the main subject is — and commercial intent — how usable a frame is for a brand, catalog, or campaign. That means a technically sharp packshot ranks above a moody frame that would never pass a client review.",
  },
  {
    question: "Can it handle a full wedding or a large stock library?",
    answer:
      "Yes. Photoreka is built to take a few thousand frames from a wedding or campaign and surface your strongest selects, with near-duplicate detection to cut the over-shot setups. The sweet spot is a curated body of work up to about 20,000 photos, with up to 50,000 workable.",
  },
  {
    question: "Does Photoreka retouch, generate, or alter my images?",
    answer:
      "No. Photoreka only analyzes, organizes, and curates your existing photographs. It never generates synthetic images or edits your files. It's a curation engine that works alongside your editing and delivery tools — not a replacement for them.",
  },
  {
    question: "Who owns the rights to the work I upload?",
    answer:
      "You do — 100%. We only store reduced versions of your images to power search and curation, analyzed under agreements that prevent retaining or reusing your photos. Your work is never shared, and you keep full rights and client confidentiality.",
  },
  {
    question: "Can I try it before paying?",
    answer:
      "Yes. During the early access phase a free photo package and usage credits are available. Analyzing a batch requires a single payment, after which most tools are free within daily limits, or unlimited with credits.",
  },
]);

// PageGrid reads `title` and an icon component; brand logos are wrapped as
// tiny image components so they sit in the same icon tile.
const genreItems = computed(() =>
  genres.value.map((genre) => ({ ...genre, title: genre.name })),
);

const logoIcon = (src, alt) =>
  markRaw({
    render: () =>
      h("img", {
        src,
        alt,
        style: "width: 28px; height: 28px; object-fit: contain",
      }),
  });

const sourceItems = computed(() =>
  dataSources.value.map((source) => ({
    ...source,
    title: source.name,
    icon: source.logo ? logoIcon(source.logo, source.name) : source.icon,
  })),
);

const config = useRuntimeConfig();
const { isOpenMode, signupButtonLabel } = useRegistrationMode();

const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_commercial", mode);
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

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "landing_commercial");
  window.open("https://app.photoreka.com/demo-commercial/dashboard", "_blank");
};

const goToSearchDemo = () => {
  trackUserAction("navigate_to_search_demo", "landing_commercial");
  window.open("https://app.photoreka.com/demo-commercial/search", "_blank");
};

const onRequestSuccess = () => {};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    faq_index: index,
    action: isOpen ? "open" : "close",
    question:
      faqs.value[index]?.question?.substring(0, 50) + "..." || `FAQ ${index}`,
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
/* The commercial branch keeps its warm gold-to-rose accent: every lx piece
   reads its accent from these tokens. */
.com-page {
  --lx-accent: #f5a524;
  --lx-accent-2: #f472b6;
  --lx-accent-grad: linear-gradient(100deg, #fbbf24 0%, #f472b6 100%);
  --lx-glow-1: rgba(245, 158, 11, 0.16);
  --lx-glow-2: rgba(236, 72, 153, 0.1);
}

[data-theme="light"] .com-page {
  --lx-accent: #b45309;
  --lx-accent-2: #be185d;
  --lx-accent-grad: linear-gradient(100deg, #b45309 0%, #be185d 100%);
  --lx-glow-1: rgba(180, 83, 9, 0.1);
  --lx-glow-2: rgba(190, 24, 93, 0.07);
}

.com-eyebrow-icon {
  color: var(--lx-warm);
}

.com-lead span {
  display: block;
}

/* ── Hero note: trust line + genres ───────────────────────── */
.com-trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
}

.com-trust__stars {
  color: var(--lx-warm);
  letter-spacing: 0.12em;
}

.com-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.4rem 0 0;
  padding: 0;
  list-style: none;
}

.com-genres li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: color-mix(in srgb, var(--lx-surface) 55%, transparent);
  font-size: var(--lx-fs-xs);
  font-weight: 500;
  color: var(--lx-text-2);
}

/* ── Genre tags ───────────────────────────────────────────── */
.com-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: auto 0 0;
  padding: 0.6rem 0 0;
  list-style: none;
}

.com-tags li {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-2);
}

/* ── Lightroom list ───────────────────────────────────────── */
.com-lr {
  margin-top: 1.5rem;
}

.com-lr__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

/* ── Sources ──────────────────────────────────────────────── */
.com-source-status {
  margin-top: auto;
  padding-top: 0.4rem;
}

.com-source-status.is-soon::before {
  background: var(--lx-text-3);
  box-shadow: none;
}
</style>
