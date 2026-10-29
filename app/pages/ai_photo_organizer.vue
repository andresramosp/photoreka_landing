<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="lx-page lx-numbered">
        <PageNav source="ai_photo_organizer_page" :links="navLinks" />

        <PageHero eyebrow="AI Photo Organizer">
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
            <ShotFrame
              src="/home/dashboard.png"
              alt="Photoreka AI photo organizer dashboard showing an analyzed photo catalog"
              label="Photoreka — Workspace"
              ratio="auto"
              loading="eager"
            />
          </template>
        </PageHero>

        <section id="approach" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="The approach" align="center">
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
            <PageGrid :items="pillars" :columns="4" />
          </div>
        </section>

        <section id="atlas" class="lx-section">
          <div class="lx-container">
            <SectionIntro eyebrow="Atlas" align="center">
              <template #title>
                Your entire archive,
                <em class="lx-accent">in one image</em>
              </template>
              <p>
                Once analyzed, every photo you own takes its place on a single
                map—clustered by what the images actually are, not by the folder
                they landed in. Dense continents are the work you keep returning
                to. The dark space between them is the work you haven't made
                yet.
              </p>
            </SectionIntro>

            <div
              v-reveal="{ variant: 'scale', delay: 120 }"
              v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
            >
              <ShotFrame
                class="lx-zoom"
                src="/atlas/2d.png"
                alt="Photoreka 2D Atlas: an entire photo library organized into visual similarity clusters on a single navigable map"
                label="Photoreka — 2D Atlas"
                ratio="auto"
              />
            </div>

            <p v-reveal="160" class="org-caption">
              This is organization as a whole, not a folder at a time.
              <NuxtLink to="/photo_3D_atlas" class="lx-link">
                Explore the 2D &amp; 3D Atlas
                <n-icon size="15"><ArrowForwardOutline /></n-icon>
              </NuxtLink>
            </p>
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
                  Deciding between tools? We’ll publish a full comparison once
                  the blog is ready.
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
  { label: "Atlas", target: "atlas" },
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
      'Link your Lightroom Classic catalog via the <a href="/lightroom_search_plugin">official plugin</a>, connect Google Photos or Dropbox, or upload local files. Photoreka works from compressed previews—your full-resolution originals stay on your machine.',
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
      'Once organized, the real work starts: cull the weak frames, surface hidden gems, and build sequenced selections with the <a href="/photography_portfolio_builder">Portfolio Builder</a>—for exhibitions, photobooks, or client delivery.',
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
    link: "/ai_photo_search",
  },
  {
    icon: markRaw(PricetagsOutline),
    title: "Automatic AI Tagging",
    description:
      "Every photo receives semantic tags across mood, environment, subjects, weather, and more—browsable as an interactive 2D tag map of your whole vocabulary.",
    color: "#8b5cf6",
    link: "/photo_tag_cloud",
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Quality Scoring & Ranking",
    description:
      "9+ scoring dimensions—aesthetics, composition, narrative, originality—rank your entire catalog so your strongest work surfaces automatically.",
    color: "#f59e0b",
    link: "/photo_scoring",
  },
  {
    icon: markRaw(GitNetworkOutline),
    title: "2D/3D Visual Maps",
    description:
      "See your whole archive as a navigable space where similar photos cluster together. Spot themes, gaps, and stylistic shifts no grid can reveal.",
    color: "#2563eb",
    link: "/photo_3D_atlas",
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
    link: "/ai_geo_inference",
  },
];

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
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "ai_photo_organizer_page", "commercial");
  window.open("https://app.photoreka.com/demo-commercial/search", "_blank");
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

.org-caption {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.4rem 1rem;
  margin-top: clamp(28px, 3vw, 40px);
  text-align: center;
  font-size: var(--lx-fs-body);
  color: var(--lx-text-2);
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
  .org-alt {
    grid-template-columns: 1fr;
  }
}
</style>
