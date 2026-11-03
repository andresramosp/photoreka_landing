<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_photo_organizer_page" :links="navLinks" />

        <PageHero eyebrow="AI Photo Organizer" showcase>
          <template #title>
            Organize your photo library
            <em class="lx-accent">without moving a single file</em>
          </template>
          <p>
            Photoreka is the
            <strong>AI curation layer for your photo archive</strong>. It sits
            on top of <strong>Lightroom Classic, Google Photos, Dropbox</strong>
            or local folders and analyzes your library once—making it searchable
            in natural language, scored for quality, and mapped by visual
            similarity.
          </p>
          <ul class="lx-list org-notes">
            <li>
              <span class="lx-tick" aria-hidden="true" />
              <span
                >No migration. No new catalog. No subscription—pay per analyzed
                batch.</span
              >
            </li>
            <li>
              <span class="lx-tick" aria-hidden="true" />
              <span
                >100% cloud-based: runs in your browser, no install—works the
                same on Windows, Mac, and Linux.</span
              >
            </li>
          </ul>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #note>
            <span>Shooting commercial work?</span>
            <button class="lx-link" @click="goToCommercialDemo">
              Try the commercial demo
              <n-icon size="15"><ArrowForwardOutline /></n-icon>
            </button>
          </template>
          <template #visual>
            <HeroRotatingShot />
          </template>
        </PageHero>

        <section id="approach" class="lx-section">
          <div class="lx-container lx-beside">
            <SectionIntro eyebrow="The approach" flush>
              <template #title>
                Your storage is fine.
                <em class="lx-accent">Your findability isn't.</em>
              </template>
              <p>
                Most photo organizers ask you to rebuild your library inside
                their system. Photoreka takes the opposite approach: your files
                stay exactly where they are, and the intelligence comes to them.
              </p>
            </SectionIntro>
            <ul v-reveal="120" class="lx-list lx-list--rich">
              <li v-for="item in pillars" :key="item.title">
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

        <section id="explore" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Explore your archive" align="center">
              <template #title>
                Three ways to see
                <em class="lx-accent">your whole archive</em>
              </template>
              <p>
                Once analyzed, your library stops being a grid you scroll. Fly
                through it as a map, navigate it as a vocabulary, or read it as
                a report on your own work.
              </p>
            </SectionIntro>

            <div
              v-reveal="80"
              class="lx-tabs org-tabs"
              role="tablist"
              aria-label="Ways to explore your archive"
            >
              <button
                v-for="view in views"
                :id="`org-tab-${view.key}`"
                :key="view.key"
                type="button"
                role="tab"
                class="lx-tab"
                :class="{ 'is-active': activeView === view.key }"
                :aria-selected="activeView === view.key"
                :aria-controls="`org-panel-${view.key}`"
                @click="selectView(view.key)"
              >
                <n-icon size="16"><component :is="view.icon" /></n-icon>
                {{ view.label }}
              </button>
            </div>

            <!-- Every panel stays in the DOM so all the copy is indexable. -->
            <div
              v-for="view in views"
              v-show="activeView === view.key"
              :id="`org-panel-${view.key}`"
              :key="view.key"
              role="tabpanel"
              :aria-labelledby="`org-tab-${view.key}`"
              class="lx-panel org-view"
            >
              <ShotFrame v-bind="view.media" />
              <div class="org-view__body">
                <div class="org-view__copy">
                  <h3 class="lx-title lx-title--md">
                    {{ view.title }}
                    <em class="lx-accent">{{ view.accent }}</em>
                  </h3>
                  <p class="org-view__text">{{ view.text }}</p>
                  <ul v-if="view.key === 'tag-map'" class="org-groups">
                    <li v-for="group in tagGroups" :key="group.name">
                      <span
                        class="org-groups__dot"
                        :style="{ '--dot': group.color }"
                        aria-hidden="true"
                      />
                      {{ group.name }}
                    </li>
                  </ul>
                  <div>
                    <LxButton
                      variant="ghost"
                      icon="external"
                      @click="openViewDemo(view)"
                    >
                      {{ view.demoLabel }}
                    </LxButton>
                  </div>
                </div>
                <ul class="lx-list org-view__points">
                  <li v-for="point in view.points" :key="point">
                    <span class="lx-tick" aria-hidden="true" />
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="How it works">
              <template #title>
                From folder chaos
                <em class="lx-accent">to organized catalog</em>
              </template>
              <p>
                One analysis pass replaces years of manual tagging, rating, and
                album building.
              </p>
            </SectionIntro>
            <PageSteps :steps="steps" />
          </div>
        </section>

        <section id="features" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Features" align="center">
              <template #title>
                Everything an AI photo organizer
                <em class="lx-accent">should give you</em>
              </template>
              <p>
                Organization is not folders and stars. It's being able to find,
                rank, and understand any part of your archive in seconds.
              </p>
            </SectionIntro>
            <PageGrid :items="features" :columns="3">
              <template #item="{ item }">
                <NuxtLink
                  v-if="item.link"
                  :to="item.link"
                  class="lx-link org-more"
                >
                  Learn more
                  <n-icon size="15"><ArrowForwardOutline /></n-icon>
                </NuxtLink>
              </template>
            </PageGrid>

            <div v-reveal="120" class="lx-card org-alt">
              <div class="org-alt__copy">
                <h3 class="lx-title lx-title--md">
                  Not another DAM.
                  <em class="lx-accent">Not another desktop app.</em>
                </h3>
                <p class="org-alt__text">
                  Excire Foto, Peakto, and Mylio are capable desktop organizers
                  —but each one asks something of you: a new catalog to import
                  into, a Mac-only environment, or a monthly subscription.
                  Photoreka asks for none of it.
                </p>
                <p class="org-alt__note">
                  Deciding between tools?
                  <NuxtLink to="/blog/best-ai-photo-organizer/" class="lx-link"
                    >Read our comparison of the best AI photo organizers</NuxtLink
                  >
                </p>
              </div>
              <ul class="lx-list org-alt__list">
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    ><strong>Cloud-based, runs in the browser</strong> on
                    Windows, Mac, and Linux — unlike Peakto (Mac-only)</span
                  >
                </li>
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    ><strong>Pay per analyzed batch</strong>, not per month —
                    your organized catalog stays organized</span
                  >
                </li>
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    >Goes beyond organizing into <strong>curation</strong>:
                    quality scoring, portfolio sequencing, and an AI assistant
                    for your catalog</span
                  >
                </li>
                <li>
                  <span class="lx-tick" aria-hidden="true" />
                  <span
                    >No query length limit on search — unlike CLIP-based tools
                    like Excire (~77-token cap)</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </section>

        <FaqSection :faqs="faqs" @toggle="onFaqToggle">
          <template #title>
            Frequently asked <em class="lx-accent">questions</em>
          </template>
          <p>What photographers ask before organizing their library with AI</p>
        </FaqSection>

        <PageCta>
          <template #title>
            Your archive,
            <em class="lx-accent">organized by the weekend.</em>
          </template>
          <p>
            Connect your sources, let the analysis run, and open a catalog that
            finally answers back. Your files never move.
          </p>
          <template #actions>
            <LxButton icon="play" @click="goToDemo">Try the Demo</LxButton>
            <LxButton variant="ghost" @click="goToSignup">
              {{ joinButtonLabel }}
            </LxButton>
          </template>
          <template #links>
            Using Lightroom Classic?
            <NuxtLink to="/lightroom_search_plugin"
              >See the official plugin</NuxtLink
            >
            <span class="lx-sep" aria-hidden="true">·</span>
            Shooting product or commercial work?
            <NuxtLink to="/commercial_photography"
              >See Photoreka for commercial photography</NuxtLink
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
import { markRaw } from "vue";
import {
  ArrowForwardOutline,
  SearchOutline,
  PricetagsOutline,
  BarChartOutline,
  GitNetworkOutline,
  CopyOutline,
  MapOutline,
  CloudOutline,
  GlobeOutline,
  FlashOutline,
  WalletOutline,
} from "@vicons/ionicons5";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO
useSEO("ai_photo_organizer");

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
  { label: "Approach", target: "approach" },
  { label: "Explore", target: "explore" },
  { label: "How it works", target: "how-it-works" },
  { label: "Features", target: "features" },
  { label: "FAQ", target: "faq" },
];

// Positioning pillars
const pillars = [
  {
    icon: markRaw(CloudOutline),
    title: "Works on top of your storage",
    description:
      "Lightroom Classic, Google Photos, Dropbox, local folders—Photoreka reads from all of them and organizes across them. Your originals never move, and your folder structure survives untouched.",
    color: "#2563eb",
  },
  {
    icon: markRaw(GlobeOutline),
    title: "Cloud-based, runs on any OS",
    description:
      "No app to install, no OS-specific build. Photoreka is a web-based AI photo organizer that runs in your browser—open the same catalog from Windows, Mac, or Linux.",
    color: "#06b6d4",
  },
  {
    icon: markRaw(FlashOutline),
    title: "Analyze once, organized forever",
    description:
      "A single AI analysis pass extracts tags, quality scores, and visual embeddings from every photo. That intelligence persists—no re-processing, no ongoing maintenance, no manual tagging ever again.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(WalletOutline),
    title: "No subscription",
    description:
      "You pay per analyzed photo batch, once. Most tools charge you monthly to keep accessing your own organization. With Photoreka, an organized catalog is something you own.",
    color: "#22c55e",
  },
];

// How it works steps
const steps = [
  {
    title: "Connect your photo sources",
    description:
      'Link your Lightroom Classic catalog via the <a href="/lightroom_search_plugin/">official plugin</a>, connect Google Photos or Dropbox, or upload local files. Photoreka works from compressed previews—your full-resolution originals stay on your machine.',
    html: true,
  },
  {
    title: "AI analyzes your library once",
    description:
      "Computer vision processes each photo to extract semantic tags, multi-dimensional quality scores, visual embeddings, and near-duplicate signatures. Analysis runs in the background at roughly 1,000 photos per hour.",
  },
  {
    title: "Your catalog becomes navigable",
    description:
      "Search in natural language, sort by quality dimension, browse the tag cloud, fly through the 2D/3D similarity map, or see everything on a world map. Every view is generated automatically—zero manual organization.",
  },
  {
    title: "Curate from an organized base",
    description:
      'Once organized, the real work starts: cull the weak frames, surface hidden gems, and build sequenced selections with the <a href="/photography_portfolio_builder/">Portfolio Builder</a>—for exhibitions, photobooks, or client delivery.',
    html: true,
  },
];

// Features
const features = [
  {
    icon: markRaw(SearchOutline),
    title: "Natural Language Search",
    description:
      "Find any photo by describing it—subject, mood, light, or cinematic reference. Three search modes, no query length limit, no tagging required.",
    color: "#06b6d4",
    link: "/ai_photo_search/",
  },
  {
    icon: markRaw(PricetagsOutline),
    title: "Automatic AI Tagging",
    description:
      "Every photo receives semantic tags across mood, environment, subjects, weather, and more—browsable as an interactive 2D tag map of your whole vocabulary.",
    color: "#8b5cf6",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Quality Scoring & Ranking",
    description:
      "9+ scoring dimensions—aesthetics, composition, narrative, originality—rank your entire catalog so your strongest work surfaces automatically.",
    color: "#f59e0b",
    link: "/photo_scoring/",
  },
  {
    icon: markRaw(GitNetworkOutline),
    title: "2D/3D Visual Maps",
    description:
      "See your whole archive as a navigable space where similar photos cluster together. Spot themes, gaps, and stylistic shifts no grid can reveal.",
    color: "#2563eb",
  },
  {
    icon: markRaw(CopyOutline),
    title: "Duplicate Detection",
    description:
      "Near-duplicate detection flags over-shot sequences and redundant frames, so your organized catalog starts from an intentional body of work.",
    color: "#ec4899",
  },
  {
    icon: markRaw(MapOutline),
    title: "World Map & Geo Recovery",
    description:
      "Photos with GPS land on your world map automatically—and AI geo-inference recovers locations for the archive shots that never had GPS metadata.",
    color: "#22c55e",
    link: "/ai_geo_inference/",
  },
];

// Explore block: the former /photo_3D_atlas/, /photo_tag_cloud/ and
// /photo_reports/ pages, which now redirect here.
const views = [
  {
    key: "atlas",
    label: "2D & 3D Atlas",
    icon: markRaw(GitNetworkOutline),
    media: {
      video: "/videos/atlas_1.mp4",
      poster: "/home/video_poster.webp",
      alt: "Photoreka 3D Atlas: a whole photo catalog clustered by visual similarity in navigable 3D space",
      label: "Photoreka — 3D Atlas",
      ratio: "16 / 9",
    },
    title: "Your entire archive,",
    accent: "in one image",
    text: "Every photo you own takes its place on a single map, in 2D or in 3D, clustered by what the images actually are—composition, color, subject, mood—not by the folder they landed in. Dense continents are the work you keep returning to. The dark space between them is the work you haven't made yet.",
    points: [
      "Fly through thousands of photos in real-time 3D, or read them on a flat, zoomable 2D map",
      "Clusters come from visual embeddings projected with UMAP, so neighbors really look alike",
      "Switch between contextual, narrative, visual-accent and overall-style views",
      "Select photos in space to start a sequence, a portfolio or an exhibition",
      "Runs in the browser with WebGL: no install, no special hardware",
    ],
    demoLabel: "Open the Atlas demo",
    demoPath: "/demo/atlas",
  },
  {
    key: "tag-map",
    label: "Tag map",
    icon: markRaw(PricetagsOutline),
    media: {
      src: "/home/tag_cloud_poster_detailed.webp",
      alt: "Photoreka tag map: thousands of photo tags arranged by meaning, with matching photos appearing as you navigate",
      label: "Photoreka — Tag map",
      ratio: "16 / 9",
    },
    title: "Your photo vocabulary,",
    accent: "mapped by meaning",
    text: "Thousands of tags from your photos—people, places, moods, objects, weather—placed on an interactive map where tags that share meaning sit together. The map is also a search: pan into the \"melancholy urban\" cluster and the photos that match appear as you move.",
    points: [
      "Tags are extracted automatically, typically 20–50 per photo—no manual tagging",
      "Dynamic search turns the visible part of the map into a live query",
      "Drag a rectangle over any area to combine its tags into one search",
      "Expand dense clusters and filter by group to keep the map readable",
      "Renders tens of thousands of tags smoothly, with touch support on mobile",
    ],
    demoLabel: "Open the tag map demo",
    demoPath: "/demo/tagcloud",
  },
  {
    key: "reports",
    label: "Reports",
    icon: markRaw(BarChartOutline),
    media: {
      src: "/report/1.webp",
      alt: "Photoreka report: narrative patterns detected across a photo catalog, each with its strength and example photos",
      label: "Photoreka — Reports",
      ratio: "16 / 9",
      focus: "0% 0%",
    },
    title: "Your photography,",
    accent: "seen from the outside",
    text: "Reports on your style, patterns, strengths and evolution, generated from the analysis of your whole catalog. Each one combines charts, your own photos as examples and plain-language takeaways on what you're great at and what to shoot next.",
    points: [
      "Quality distribution: how scores spread across the catalog, and your top percentile",
      "Evolution: score trends by month and year, dimension by dimension",
      "Style: dominant color profiles, moods and recurring motifs",
      "Strengths and gaps across the scoring dimensions, with suggestions",
      "Patterns and clusters, plus the outliers that stand apart",
      "Session analysis: keeper rate and the conditions of your best work",
    ],
    demoLabel: "Open a sample report",
    demoPath: "/demo/report",
  },
];

// Colors match the tag groups in the app.
const tagGroups = [
  { name: "Mood & Atmosphere", color: "#a78bfa" },
  { name: "Environment & Place", color: "#10b981" },
  { name: "Objects & Things", color: "#60a5fa" },
  { name: "People & Figures", color: "#f472b6" },
  { name: "Weather & Light", color: "#38bdf8" },
  { name: "Animals", color: "#fbbf24" },
  { name: "Geographic Names", color: "#34d399" },
  { name: "Symbols & Signs", color: "#f87171" },
  { name: "Abstract Concepts", color: "#c084fc" },
  { name: "Other", color: "#9ca3af" },
];

const activeView = ref(views[0].key);

// FAQs
const faqs = [
  {
    question: "Is Photoreka a DAM or photo management software?",
    answer:
      "Photoreka is the layer most DAMs are missing: intelligence. It doesn't store your originals or replace your folder structure—it analyzes your library and gives you semantic search, quality scores, automatic tags, and visual maps on top of the storage you already use (Lightroom, Google Photos, Dropbox, or local files).",
  },
  {
    question: "Do I have to migrate my photo library or rebuild my catalog?",
    answer:
      "No. Your files stay exactly where they are. Photoreka reads your existing sources—including your Lightroom Classic catalog via the official plugin—and builds its analysis from compressed previews. Nothing is moved, renamed, or reorganized.",
  },
  {
    question: "How is Photoreka different from Excire Foto or Peakto?",
    answer:
      "Excire Foto and Peakto are desktop apps (Peakto is Mac-only, subscription-based). Photoreka runs in the browser on any OS, is paid per analyzed photo batch instead of a subscription, and goes beyond organization into curation: multi-dimensional quality scoring, three-mode semantic search with no query length limit, portfolio sequencing, and an AI assistant for your catalog.",
  },
  {
    question: "Does Photoreka replace Lightroom?",
    answer:
      "No—it complements it. Lightroom remains your editor and catalog of record. Photoreka adds what Lightroom doesn't have: natural language search, AI quality scoring, style reports, and visual maps of your whole archive. The Lightroom Classic plugin keeps both in sync.",
  },
  {
    question: "What is the 3D Atlas and how are photos placed on it?",
    answer:
      "The Atlas shows your entire catalog as a navigable 2D or 3D map. Photoreka extracts a visual embedding from every photo—composition, colors, subjects, mood and lighting as numbers—and projects them with UMAP, a dimensionality-reduction technique that keeps similar photos close together. The clusters that form reveal your recurring themes and how your work has evolved.",
  },
  {
    question: "Do I need special hardware to use the 3D Atlas?",
    answer:
      "No. The Atlas runs in modern browsers using WebGL, and any computer with reasonably recent graphics—even integrated graphics from the last five years—can navigate thousands of photos smoothly. There's nothing to install.",
  },
  {
    question: "How is the tag map different from a tag list or a word cloud?",
    answer:
      "A word cloud shows tags by frequency and a tag list sorts them alphabetically. The tag map places them by meaning: tags that share meaning or appear in the same kind of scene sit close together, using UMAP on AI-generated semantic embeddings. Click a tag, drag a rectangle over several, or turn on dynamic search to browse your photos by moving across the map.",
  },
  {
    question:
      "What do the photography reports show, and how many photos do I need?",
    answer:
      "Reports are built from the AI scores of every photo plus metadata such as date, camera settings and detected subjects. They cover quality distribution, evolution over time, style, strengths and gaps, patterns, and individual sessions. You get basic insights from about 50 photos; for meaningful trends, 200 or more spread over time works best. Reports update as your catalog grows.",
  },
  {
    question: "How many photos can I organize with Photoreka?",
    answer:
      "The sweet spot is a catalog of up to 20,000 photos, with up to 50,000 tested and workable. Photoreka is built for a curated body of work rather than a raw dump of every file ever captured—duplicate detection is built in to help you get there.",
  },
  {
    question: "What happens to my photos and who can see them?",
    answer:
      "Photoreka only stores a reduced version of your images on secure servers for analysis. Your photos are not shared with anyone and you retain 100% of the rights to your work. Analysis uses proprietary and third-party services under agreements that prevent retaining or reusing your photos.",
  },
  {
    question: "Do I need to keep paying to keep my library organized?",
    answer:
      "No. Analysis is a one-time batch payment per set of photos. After that, most tools are usable for free with daily limits, or with credits for unlimited access. There is no monthly fee to keep what's already analyzed.",
  },
  {
    question:
      "Is Photoreka a cloud photo organizer, and does it work on Windows?",
    answer:
      "Yes. Photoreka is a cloud-based AI photo organizer: it runs entirely in your web browser, with no software to install and no OS-specific build. That means it works the same way on Windows, Mac, and Linux—unlike desktop organizers such as Peakto, which is Mac-only.",
  },
];

// Runtime config
const config = useRuntimeConfig();

const { isOpenMode, joinButtonLabel } = useRegistrationMode();

// Navigation
const goToDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_organizer_page");
  window.open("https://app.photoreka.com/demo", "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_organizer_page", "commercial");
  window.open("https://app.photoreka.com/demo-commercial", "_blank");
};

const goToSignup = () => {
  trackUserAction("open_signup", "ai_photo_organizer_page");
  if (isOpenMode.value) {
    window.open(`${config.public.appUrl}/auth`, "_blank");
  } else {
    showRequestDialog.value = true;
  }
};

const onRequestSuccess = () => {
  showRequestDialog.value = false;
};

const selectView = (key) => {
  activeView.value = key;
  trackUserAction("switch_explore_view", "ai_photo_organizer_page", key);
};

const openViewDemo = (view) => {
  trackUserAction("navigate_to_demo", "ai_photo_organizer_page", view.key);
  window.open(`${config.public.appUrl}${view.demoPath}`, "_blank");
};

const onFaqToggle = (index, isOpen) => {
  trackEvent("faq_toggle", {
    page: "ai_photo_organizer",
    faq_index: index,
    action: isOpen ? "open" : "close",
  });
};

onMounted(() => {
  initTheme();
  smoothScroll.enable();
  // Links such as /ai_photo_organizer/#reports open their tab.
  const hashKey = window.location.hash.slice(1);
  if (views.some((view) => view.key === hashKey)) {
    activeView.value = hashKey;
    nextTick(() => smoothScroll.scrollTo("#explore", -24));
  }
  trackEvent("page_view", {
    page: "ai_photo_organizer",
    page_title:
      "AI Photo Organizer — No Migration, No Subscription | Photoreka",
  });
});

onBeforeUnmount(() => {
  smoothScroll.disable();
});
</script>

<style scoped>
.org-notes {
  margin-top: 0.25rem;
  font-size: var(--lx-fs-sm);
}

.org-notes > li {
  padding: 0.7rem 0;
  color: var(--lx-text-2);
}

/* Below 601px .lx-tabs becomes a scrolling row; centering it would clip the
   first tab. */
@media (min-width: 601px) {
  .org-tabs {
    justify-content: center;
  }
}

.org-view {
  gap: clamp(28px, 3.5vw, 48px);
}

.org-view__body {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;
}

.org-view__copy {
  display: grid;
  gap: 1.25rem;
}

.org-view__text {
  font-size: var(--lx-fs-body);
  line-height: 1.75;
  color: var(--lx-text-2);
}

.org-view__points {
  font-size: var(--lx-fs-sm);
}

.org-view__points > li {
  color: var(--lx-text-2);
}

.org-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.org-groups li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--lx-line);
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-2);
}

.org-groups__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dot);
}

.org-more {
  align-self: flex-start;
  margin-top: auto;
  font-size: var(--lx-fs-sm);
}

.org-alt {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  margin-top: clamp(40px, 5vw, 64px);
  padding: clamp(28px, 4.5vw, 64px);
}

.org-alt__copy {
  display: grid;
  gap: 1.25rem;
}

.org-alt__text {
  font-size: var(--lx-fs-body);
  line-height: 1.75;
  color: var(--lx-text-2);
}

.org-alt__note {
  padding-top: 1.1rem;
  border-top: 1px solid var(--lx-line);
  font-size: var(--lx-fs-sm);
  line-height: 1.7;
  color: var(--lx-text-3);
}

.org-alt__list strong {
  font-weight: 600;
}

@media (max-width: 1023px) {
  .org-alt,
  .org-view__body {
    grid-template-columns: 1fr;
  }
}
</style>
