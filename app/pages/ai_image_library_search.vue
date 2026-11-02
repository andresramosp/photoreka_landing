<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_image_library_search_page" :links="navLinks" />

        <!-- Same hero as the home (HeroShowcaseRight + strip), business copy. -->
        <div class="lx-fold">
          <HeroShowcaseRight
            :images="heroShots"
            :genres="heroIndustries"
            demo-label="Try the Commercial Demo"
            @demo="goToDemo('hero')"
            @signup="goToSignup"
          >
            <template #eyebrow
              >The AI search layer for image libraries</template
            >
            <template #title>
              Find any image in
              <em class="lx-accent">your company's photo library</em>
            </template>
            <template #lead>
              <span>
                <strong>Photoreka</strong> finds any image in your library by
                describing it.
              </span>
              <span>
                <strong>Search</strong> from a brief, <strong>rank</strong> the
                best shots and <strong>clean up</strong> duplicates.
              </span>
              <span>
                On top of <strong>Dropbox</strong>,
                <strong>Google Photos</strong>, <strong>Lightroom</strong> or
                local folders.
              </span>
            </template>
            <template #alt>
              <span>Want to see a general photo library?</span>
              <button class="lx-link" @click="goToStandardDemo('hero')">
                Try the standard demo
                <n-icon size="15"><ArrowForwardOutline /></n-icon>
              </button>
            </template>
          </HeroShowcaseRight>

          <MarqueeStrip :items="heroStrip" :repeat="1" :duration="40" />
        </div>

        <section id="industries" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="By industry" align="center">
              <template #title>
                Built for the image libraries
                <em class="lx-accent">behind your business</em>
              </template>
              <p>
                Every industry asks its archive different questions. These are
                the kind of requests Photoreka answers in seconds, typed exactly
                as a colleague or a client would phrase them.
              </p>
            </SectionIntro>
            <ul class="lib-industries">
              <li
                v-for="(item, i) in industries"
                :key="item.title"
                v-reveal="i * 70"
                class="lib-industry"
              >
                <h3 class="lib-industry__title">
                  <span class="lx-icon-tile" :style="{ color: item.color }">
                    <n-icon size="18"><component :is="item.icon" /></n-icon>
                  </span>
                  {{ item.title }}
                </h3>
                <p class="lib-industry__text">{{ item.description }}</p>
                <ul class="lib-briefs" :aria-label="`${item.title} examples`">
                  <li v-for="brief in item.briefs" :key="brief">
                    “{{ brief }}”
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <ToolExplorer
          section-id="tools"
          eyebrow="Tools"
          title="Everything your image library has been missing"
          title-accent="has been missing"
          subtitle="One analysis pass turns a folder of files into a library you can search, rank and map. Every tool works from that same analysis, so nobody has to tag anything by hand."
          :tools="tools"
        />

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                From scattered folders to
                <em class="lx-accent">a library that answers back</em>
              </template>
              <p>
                No migration project and no tagging sprint. The person who
                manages your images sets it up once.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="vs-dam" class="lx-section">
          <div class="lx-container">
            <div v-reveal class="lx-card lib-dam">
              <div class="lib-dam__copy">
                <h2 class="lx-title lx-title--md">
                  Not another DAM.
                  <em class="lx-accent"
                    >The search your folders are missing.</em
                  >
                </h2>
                <p class="lib-dam__text">
                  Digital asset management platforms ask for a migration
                  project, a monthly subscription, and someone who keywords
                  every upload. Photoreka asks for none of that: it sits on top
                  of the storage you already pay for and makes it searchable by
                  what's actually in each image.
                </p>
                <p class="lib-dam__note">
                  Already running a DAM for permissions, licences, and
                  distribution? Keep it. Photoreka doesn't manage rights or
                  share files — it finds and ranks images.
                </p>
              </div>
              <ul class="lx-list lib-dam__list">
                <li v-for="point in damPoints" :key="point.strong">
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    ><strong>{{ point.strong }}</strong> —
                    {{ point.text }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Questions from
            <em class="lx-accent">agencies and businesses</em>
          </template>
          <p>What teams ask before putting their image library on Photoreka</p>
        </FaqSection>

        <PageCta>
          <template #title>
            The image you need is
            <em class="lx-accent">already in your library.</em>
          </template>
          <p>
            Try the search on our commercial demo catalog, then connect your own
            folders when you're ready.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo('cta')"
              >Try the Commercial Demo</LxButton
            >
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Prefer a general photo library?
            <a @click="goToStandardDemo('cta')">Try the standard demo</a>
            <span class="lx-sep" aria-hidden="true">·</span>
            Shooting the photos yourself?
            <NuxtLink to="/commercial_photography"
              >See Photoreka for commercial photographers</NuxtLink
            >
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
import { markRaw, provide } from "vue";
import {
  AirplaneOutline,
  ArrowForwardOutline,
  BagHandleOutline,
  BedOutline,
  CubeOutline,
  HomeOutline,
  LayersOutline,
  MapOutline,
  MegaphoneOutline,
  SearchOutline,
} from "@vicons/ionicons5";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";
import HeroShowcaseRight from "~/components/hero/HeroShowcaseRight.vue";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";
import { IMAGE_LIBRARY_FAQS } from "~/utils/imageLibraryFaqs";

useSEO("ai_image_library_search");

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

// The strip under the hero is already moving, so the industries row stays
// still (same rule as the home).
provide("heroGenresStatic", true);

const heroShots = [
  {
    src: "/portfolio_builder/7.webp",
    alt: "Photoreka dashboard: world map, scores and patterns of an image library",
  },
  {
    src: "/canvas/chatlab_3.webp",
    alt: "Photoreka dashboard: world map, scores and patterns of an image library",
  },
  {
    src: "/home/portfolio_desktop_4.webp",
    alt: "A selection of images assembled with Photoreka",
  },
];

const heroIndustries = [
  { icon: markRaw(AirplaneOutline), label: "Travel" },
  { icon: markRaw(BagHandleOutline), label: "E-commerce" },
  { icon: markRaw(MegaphoneOutline), label: "Marketing" },
  { icon: markRaw(HomeOutline), label: "Real estate" },
  { icon: markRaw(BedOutline), label: "Hotels" },
];

const heroStrip = [
  { label: "Search by brief" },
  { label: "No tagging" },
  { label: "Best-shot scoring" },
  { label: "Duplicate detection" },
  { label: "Location recovery" },
  { label: "No migration" },
  { label: "Pay per batch" },
  { label: "Selections" },
];

const navLinks = [
  { label: "Industries", target: "industries" },
  { label: "Tools", target: "tools" },
  { label: "How it works", target: "how-it-works" },
  { label: "vs DAM", target: "vs-dam" },
  { label: "FAQ", target: "faq" },
];

const industries = [
  {
    icon: markRaw(AirplaneOutline),
    title: "Travel & tourism",
    description:
      "Travel agencies, tour operators, and tourism boards sit on thousands of destination photos with no captions. Search them by place, mood, and season — and let AI recover where an archive shot was taken when it has no GPS data.",
    briefs: [
      "Turquoise cove with a sailboat, morning light, no people",
      "Old town street at dusk, lanterns, couple walking",
      "Family hiking a mountain trail in autumn",
    ],
    color: "#06b6d4",
  },
  {
    icon: markRaw(BagHandleOutline),
    title: "E-commerce & product",
    description:
      "After a product shoot, the work is choosing. Photoreka ranks every frame on subject clarity and commercial intent, flags near-duplicates from the same setup, and finds lifestyle shots of any product by description.",
    briefs: [
      "White sneakers on a concrete step, side angle",
      "Ceramic mug in hand, cozy kitchen, window light",
      "Flat lay of skincare bottles on a pastel background",
    ],
    color: "#8b5cf6",
  },
  {
    icon: markRaw(MegaphoneOutline),
    title: "Marketing & brand",
    description:
      "Campaign briefs rarely match folder names. Paste the brief and get the images that fit — and find out in a minute whether your library already has the shot or you need a new production.",
    briefs: [
      "Team laughing around a laptop, bright office",
      "Close-up of hands, warm tones, authentic, not staged",
      "Storefront at night, wide shot, neon reflections",
    ],
    color: "#ec4899",
  },
  {
    icon: markRaw(BedOutline),
    title: "Real estate & hotels",
    description:
      "Find the strongest interior and exterior shots across every property you've photographed — bright rooms, clean lines, the view — without opening shoot after shoot.",
    briefs: [
      "Bright living room with a sea view, wide angle",
      "Hotel pool at golden hour, empty loungers",
      "Modern kitchen with an island, white marble",
    ],
    color: "#f59e0b",
  },
];

const tools = [
  {
    icon: markRaw(SearchOutline),
    title: "Search by brief",
    panelTitle: "Find the image straight from the brief",
    panelTitleAccent: "from the brief",
    panelHtml:
      "Describe what you need in plain language — subject, setting, mood, light. <strong>Broad</strong> to explore options, <strong>Precise</strong> when the brief has conditions that must be met.",
    bullets: [
      "No tags, captions, or keywords required",
      "No query length limit — paste the whole brief",
      "One search across every source you connect",
    ],
    video: "/videos/Search.mp4",
    image: "/home/search_results.webp",
    color: "#2563eb",
    link: "/ai_photo_search",
    demoLinks: [
      {
        label: "Commercial demo",
        link: "/demo-commercial/search",
        commercial: true,
      },
      { label: "Standard demo", link: "/demo/search" },
    ],
  },
  {
    icon: markRaw(Trophy20Regular),
    title: "Best-shot scoring",
    lead: "Rank any set of images by quality and by how usable they are commercially.",
    bullets: [
      "Scores subject clarity and commercial intent, plus aesthetics and composition",
      "Pick the best frame of every product or room in seconds",
      "Surface the strongest images of a destination or theme",
    ],
    images: ["/ai_photo_scoring/9.webp", "/ai_photo_scoring/7.webp"],
    color: "#f59e0b",
    link: "/photo_scoring",
    demoLinks: [
      { label: "Commercial demo", link: "/demo-commercial/", commercial: true },
      { label: "Standard demo", link: "/demo/" },
    ],
  },
  {
    icon: markRaw(CubeOutline),
    title: "Library map & duplicates",
    lead: "See the whole library as one map, and clean it up.",
    bullets: [
      "Similar images cluster together automatically",
      "Near-duplicates and over-shot setups are flagged",
      "Spot which destinations, products, or themes lack good images",
    ],
    video: "/videos/atlas_2d.mp4",
    videoFocus: "100% 50%",
    image: "/atlas/atlas_2d_poster.webp",
    color: "#06b6d4",
    link: "/photo_3D_atlas",
    demoLinks: [
      {
        label: "Commercial demo",
        link: "/demo-commercial/2d-atlas",
        commercial: true,
      },
      { label: "Standard demo", link: "/demo/2d-atlas" },
    ],
  },
  {
    icon: markRaw(MapOutline),
    title: "Location recovery",
    lead: "Know where every destination shot was taken, even without GPS.",
    bullets: [
      "Infers place, city, region, and country from what's in the image",
      "Puts the whole library on a world map",
      "Filter by source, detail, and time range",
    ],
    image: "/ai_geoinference/3_estrecho.webp",
    color: "#14b8a6",
    link: "/ai_geo_inference",
  },
  {
    icon: markRaw(LayersOutline),
    title: "Selections",
    lead: "Assemble a selection for a campaign, brochure, or catalog in minutes.",
    bullets: [
      "Build it by score, theme, or visual coherence",
      "Let AI order the set for a clean visual flow",
      "Start from the images that already fit the brief",
    ],
    images: ["/portfolio_builder/0.webp"],
    color: "#22c55e",
    link: "/photography_portfolio_builder",
    demoLinks: [
      {
        label: "Commercial demo",
        link: "/demo-commercial/portfolios",
        commercial: true,
      },
      { label: "Standard demo", link: "/demo/portfolios" },
    ],
  },
];

const steps = [
  {
    title: "Connect the folders you already use",
    description:
      'Link Dropbox or Google Photos, connect a Lightroom Classic catalog through the <a href="/lightroom_search_plugin">official plugin</a>, or upload local files. Photoreka works from compressed previews, so your originals stay where they are.',
    html: true,
  },
  {
    title: "Let the analysis run",
    description:
      "Computer vision reads every image once: subjects, setting, mood, light, quality, and visual similarity. It runs in the background at roughly 1,000 images per hour.",
  },
  {
    title: "Search, rank, and select",
    description:
      "Find images from a brief, clean up duplicates, recover missing locations, and assemble selections. When a new shoot comes in, only the new images need analyzing.",
  },
];

const damPoints = [
  {
    strong: "No migration",
    text: "works on Dropbox, Google Photos, Lightroom Classic, and local folders",
  },
  {
    strong: "No subscription",
    text: "pay once per analyzed batch, with no monthly fee to keep it searchable",
  },
  {
    strong: "No keywording",
    text: "search by what's in the image, not by tags someone forgot to add",
  },
  {
    strong: "Private",
    text: "only reduced previews are stored, and your images are never shared or reused",
  },
];

const faqs = IMAGE_LIBRARY_FAQS;

const config = useRuntimeConfig();
const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo; aquí es la principal y la estándar, la secundaria.
const goToDemo = (where) => {
  trackUserAction("navigate_to_demo", "ai_image_library_search_page", where);
  window.open(`${config.public.appUrl}/demo-commercial/search`, "_blank");
};

const goToStandardDemo = (where) => {
  trackUserAction(
    "navigate_to_demo",
    "ai_image_library_search_page",
    `${where}_standard`,
  );
  window.open(`${config.public.appUrl}/demo/search`, "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "ai_image_library_search_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_image_library_search",
    faq_index: index,
    action: isOpen ? "open" : "close",
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
/* ── Industries: a 2×2 grid of use cases with example briefs ── */
.lib-industries {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(36px, 4.5vw, 64px) clamp(32px, 5vw, 88px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.lib-industry {
  display: grid;
  align-content: start;
  gap: 1rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--lx-line-2);
}

.lib-industry__title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--lx-font-display);
  font-size: 1.4rem;
  font-weight: 380;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lib-industry__text {
  font-size: var(--lx-fs-body);
  line-height: 1.7;
  color: var(--lx-text-2);
}

.lib-briefs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.2rem 0 0;
  padding: 0;
  list-style: none;
}

.lib-briefs li {
  padding: 0.5rem 0.85rem;
  border-radius: var(--lx-radius-sm);
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line);
  font-family: var(--lx-font-display);
  font-style: italic;
  font-weight: 340;
  font-size: 1rem;
  line-height: 1.4;
  color: var(--lx-text-2);
}

@media (max-width: 860px) {
  .lib-industries {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* ── Not a DAM: copy beside the four promises ─────────────── */
.lib-dam {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding: clamp(28px, 4.5vw, 64px);
}

.lib-dam__copy {
  display: grid;
  gap: 1.25rem;
}

.lib-dam__text {
  font-size: var(--lx-fs-body);
  line-height: 1.75;
  color: var(--lx-text-2);
}

.lib-dam__note {
  padding-top: 1.1rem;
  border-top: 1px solid var(--lx-line);
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-3);
}

.lib-dam__list strong {
  font-weight: 600;
}

@media (max-width: 1023px) {
  .lib-dam {
    grid-template-columns: 1fr;
  }
}
</style>
