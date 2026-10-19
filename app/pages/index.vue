<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div
        class="lx-page lx-home"
        :class="{
          'has-announcement': heroAnnouncement.enabled && showAnnouncement,
        }"
        :style="{ '--announcement-height': announcementLayoutHeight + 'px' }"
      >
        <div
          v-if="heroAnnouncement.enabled && showAnnouncement"
          ref="announcementBarRef"
          class="announcement-bar"
          :class="{ 'announcement-bar--hidden': announcementHiddenByScroll }"
          :aria-hidden="announcementHiddenByScroll"
        >
          <div class="announcement-content">
            <strong>{{ heroAnnouncement.label }}</strong>
            <span>{{ heroAnnouncement.message }}</span>
            <button class="announcement-link" @click="goToAuth('signup')">
              {{ heroAnnouncement.cta }}
            </button>
          </div>
          <button
            v-if="heroAnnouncement.dismissible"
            class="announcement-close"
            aria-label="Close announcement"
            @click="showAnnouncement = false"
          >
            ×
          </button>
        </div>

        <!-- Navigation -->
        <LandingNav :links="navLinks" @navigate="onNavNavigate">
          <template #actions>
            <button
              v-if="canToggleTheme(true)"
              class="lx-icon-btn"
              aria-label="Toggle theme"
              @click="toggleTheme"
            >
              <n-icon size="18">
                <component
                  :is="themeMode === 'dark' ? SunnyOutline : MoonOutline"
                />
              </n-icon>
            </button>
            <LxButton variant="ghost" size="sm" @click="goToAuth('login')">
              Sign in
            </LxButton>
          </template>
        </LandingNav>

        <!-- Hero -->
        <section id="hero" class="lx-hero">
          <div class="lx-hero__aura" aria-hidden="true" />

          <div class="lx-container lx-hero__grid">
            <div class="lx-hero__heading">
              <p v-reveal class="lx-eyebrow lx-hero__trust">
                <span class="lx-eyebrow__dot" aria-hidden="true" />
                <span>The AI curation layer for your photo archive</span>
                <span class="lx-hero__stars">★★★★★</span>
              </p>
              <h1
                v-split="100"
                class="lx-title lx-title--display lx-hero__title"
              >
                Make full sense of
                <em class="lx-accent">your photographic body of work</em>
              </h1>
              <div class="lx-hero__atlas-box" aria-hidden="true">
                <img
                  class="lx-hero__atlas"
                  src="/home/hero_atlas_17.jpg"
                  alt=""
                  decoding="async"
                />
                <img
                  v-for="(src, i) in heroFeatures2d"
                  :key="src"
                  class="lx-hero__feature"
                  :class="`is-${i}`"
                  :src="src"
                  alt=""
                  decoding="async"
                />
              </div>
              <div
                v-if="showHeroPrints"
                v-reveal="{ variant: 'fade', delay: 700 }"
                class="lx-hero__prints"
                aria-hidden="true"
              >
                <div class="lx-hero__prints-set">
                  <span
                    v-for="(src, i) in heroPrints"
                    :key="src"
                    class="lx-hero__print"
                    :class="`is-${i}`"
                  >
                    <svg class="lx-hero__clip" viewBox="0 0 14 40">
                      <path
                        d="M5 12 V30 A2.5 2.5 0 0 0 10 30 V7 A4 4 0 0 0 2 7 V32 A5 5 0 0 0 12 32 V14"
                      />
                    </svg>
                    <img :src="src" alt="" decoding="async" />
                  </span>
                </div>
              </div>
            </div>

            <div class="lx-hero__aside">
              <div v-reveal="420" class="lx-hero__intro">
                <p class="lx-lead lx-hero__lead">
                  <span>
                    <strong>Photoreka</strong> is a suite of smart tools to help
                    you curate your photos.
                  </span>
                  <span>
                    <strong>Search</strong> in natural language,
                    <strong>rank</strong> your photos or
                    <strong>chat</strong> with your library.
                  </span>
                  <span>
                    Upload a <strong>project</strong>, a curated
                    <strong>selection</strong> or your entire
                    <strong>catalog</strong>.
                  </span>
                </p>
                <div class="lx-hero__tools">
                  <div class="lx-hero__tools-track">
                    <ul
                      v-for="copy in 2"
                      :key="copy"
                      class="lx-hero__tools-set"
                      :aria-hidden="copy === 2 ? 'true' : undefined"
                    >
                      <li v-for="(genre, i) in heroGenreChips" :key="i">
                        <n-icon size="16"
                          ><component :is="genre.icon"
                        /></n-icon>
                        {{ genre.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="lx-hero__cta">
                <div v-reveal="520" class="lx-actions">
                  <LxButton icon="play" @click="goToDemo"
                    >Try the Demo</LxButton
                  >
                  <LxButton variant="ghost" @click="goToAuth('signup')">
                    {{ signupButtonLabel }}
                  </LxButton>
                </div>
                <p v-reveal="600" class="lx-hero__alt">
                  <span>Shooting commercial work?</span>
                  <button class="lx-link" @click="goToCommercialDemo">
                    Try the commercial demo
                    <n-icon size="15"><ArrowForwardOutline /></n-icon>
                  </button>
                </p>
              </div>
            </div>
          </div>

          <!-- Product stage: three static captures (see heroStage).
               Tilted back at load, the whole set straightens as you scroll. -->
          <div
            v-scroll-progress="{
              mode: 'scroll',
              distance: 0.45,
              disableBelow: 760,
            }"
            class="lx-hero__stage"
          >
            <div class="lx-container">
              <div v-reveal="{ variant: 'scale', delay: 380 }" class="lx-stage">
                <div class="lx-stage__scene">
                  <div
                    class="lx-stage__deck"
                    :class="{ 'is-turning': heroStageTurning }"
                  >
                    <div
                      v-for="(shot, index) in heroStage"
                      :key="shot.src"
                      class="lx-stage__slot"
                      :class="`is-${heroStagePosition(index)}`"
                    >
                      <ShotFrame
                        :src="shot.src"
                        :alt="shot.alt"
                        :label="shot.label"
                        ratio="auto"
                        loading="eager"
                      />
                      <span
                        class="lx-stage__phone"
                        :aria-hidden="heroStagePosition(index) !== 'center'"
                      >
                        <img
                          :src="heroStagePhone"
                          alt="Photoreka mobile app"
                          loading="eager"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MarqueeStrip :items="heroFeatures" :repeat="1" :duration="40" />

        <!-- Search Promo Section -->
        <section id="ai_search" class="lx-section">
          <div class="lx-container lx-split lx-split--media">
            <div class="lx-split__copy">
              <SectionIntro index="01" eyebrow="AI Photo Search" flush>
                <template #title>
                  Find any photo by <em class="lx-accent">describing it</em>
                </template>
                <p>
                  Type what you remember and Photoreka finds it — no tagging, no
                  folders. Three modes: <strong>Broad</strong> for open
                  exploration, <strong>Adaptive</strong> for metaphorical and
                  cultural references, <strong>Precise</strong> for conditions
                  that need to be verified, not just approximated.
                </p>
              </SectionIntro>

              <div v-reveal="200" class="lx-actions">
                <LxButton icon="play" @click="goToSearchDemo">
                  Try the Demo
                </LxButton>
                <NuxtLink to="/ai_photo_search" class="lx-link">
                  Learn more
                  <n-icon size="15"><ArrowForwardOutline /></n-icon>
                </NuxtLink>
              </div>
            </div>

            <div
              v-reveal="{ variant: 'scale', delay: 120 }"
              v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
              class="lx-split__visual"
            >
              <ShotFrame
                class="lx-zoom"
                video="/videos/Search.mp4"
                poster="/home/video_poster.jpg"
                alt="Photoreka AI photo search by natural language"
                ratio="16 / 9"
                bare
              />
            </div>
          </div>
        </section>

        <!-- Features Section (sticky stacking cards) -->
        <FeaturesShowcase
          :variant="featuresVariant"
          section-id="features"
          index="02"
          eyebrow="AI tools"
          title="AI tools to organize, search, and curate your photos"
          title-accent="curate your photos"
          subtitle="A smart photo organizer built for photographers who take their work seriously. Search with AI, score and rank, explore in 3D, and build portfolios from your photo library."
          :features="features"
        />

        <!-- 3d video section -->
        <!-- <section class="reports-hero" ref="reportsHeroSection">
          <div class="reports-hero-background">
            <div class="reports-gradient-orb reports-orb-1"></div>
            <div class="reports-gradient-orb reports-orb-2"></div>
            <div class="reports-gradient-orb reports-orb-3"></div>
          </div>
          <div class="reports-hero-container">
            <div class="reports-hero-layout">
              <div class="reports-hero-content">
                <div
                  class="reports-hero-badge"
                  :class="{ visible: reportsHeroVisible }"
                >
                  <span class="badge-content">
                    <n-icon size="16"><GitNetworkOutline /></n-icon>
                    3D Atlas
                  </span>
                </div>
                <h2
                  class="reports-hero-title"
                  :class="{ visible: reportsHeroVisible }"
                >
                  Explore your entire catalog
                  <span class="reports-gradient-text">in 3D space</span>
                </h2>
                <p
                  class="reports-hero-subtitle"
                  :class="{ visible: reportsHeroVisible }"
                >
                  Folders and grids flatten your work. The
                  <strong>3D Atlas</strong> maps every photo into an interactive
                  space where
                  <strong> visually similar images cluster together </strong>
                  automatically, powered by AI embeddings.<br /><br />
                  Fly through your collection, spot themes and patterns you
                  never noticed, and rediscover forgotten shots by exploring the
                  connections between them, not scrolling endless lists.
                </p>

                <div
                  class="reports-hero-actions"
                  :class="{ visible: reportsHeroVisible }"
                >
                  <n-button type="info" size="large" strong @click="goToDemo">
                    <template #icon>
                      <n-icon><PlayCircleOutline /></n-icon>
                    </template>
                    Try the Demo
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
                    {{ signupButtonLabel }}
                  </n-button>
                </div>
              </div>

              <div
                class="reports-hero-visual"
                :class="{ visible: reportsHeroVisible }"
              >
                <div class="reports-video-frame">
                  <video
                    class="reports-hero-video"
                    src="/videos/atlas_1.mp4"
                    poster="/home/video_poster.jpg"
                    ref="reportsHeroVideoRef"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </section> -->

        <!-- Photoreka Picks Promo -->
        <PicksPromo id="picks" source="home" immersive index="03" />

        <!-- Canvas Section (mirrors the search section, video on the left) -->
        <section id="canvas" class="lx-section">
          <div class="lx-container lx-split lx-split--media lx-split--reverse">
            <div
              v-reveal="{ variant: 'scale', delay: 120 }"
              v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
              class="lx-split__visual"
            >
              <!-- Each frame only plays while visible, so the hidden one
                   never starts. -->
              <ShotFrame
                class="lx-zoom lx-canvas-video--desktop"
                video="/videos/canvas_desktop.mp4"
                alt="Photoreka infinite canvas clustering photos automatically"
                ratio="16 / 9"
                bare
              />
              <ShotFrame
                class="lx-canvas-video--mobile"
                video="/videos/canvas_mobile.mp4"
                alt="Photoreka infinite canvas clustering photos automatically"
                ratio="4 / 5"
                bare
              />
            </div>

            <div class="lx-split__copy">
              <SectionIntro index="04" eyebrow="Interactive Canvas" flush>
                <template #title>
                  Storyboard on an <em class="lx-accent">infinite canvas</em>
                </template>
                <p>
                  Drag, arrange and sequence your photos freely, or let
                  Photoreka <strong>cluster</strong> them automatically by
                  <strong>narrative</strong>, <strong>color</strong>,
                  <strong>score</strong> and more. Drop any image to surface
                  similar shots from your archive, while a chat docked to the
                  board tells you what the sequence is missing.
                </p>
              </SectionIntro>

              <div v-reveal="200" class="lx-actions">
                <LxButton icon="play" @click="goToCanvasDemo">
                  Try the Demo
                </LxButton>
                <NuxtLink to="/ai_photo_storyboard" class="lx-link">
                  Learn more
                  <n-icon size="15"><ArrowForwardOutline /></n-icon>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- Data Sources Section -->
        <section id="sources" class="lx-section">
          <div class="lx-container">
            <SectionIntro index="05" eyebrow="Import" align="center">
              <template #title>
                Import and organize photos
                <em class="lx-accent">from anywhere</em>
              </template>
              <p>
                Photoreka works with your existing photo sources. Import your
                images from Lightroom, Google Photos, Dropbox, or local files
                and start curating with AI immediately. It's a
                <NuxtLink to="/ai_photo_organizer"
                  >cloud-based AI photo organizer</NuxtLink
                >
                that runs in your browser on Windows, Mac, or Linux—nothing to
                install.
              </p>
            </SectionIntro>

            <div class="lx-sources">
              <article
                v-for="(source, index) in dataSources"
                :key="index"
                v-reveal="index * 90"
                class="lx-source"
              >
                <div class="lx-source__logo">
                  <n-icon v-if="!source.logo" size="28" :color="source.color">
                    <component :is="source.icon" />
                  </n-icon>
                  <img v-else :src="source.logo" :alt="source.name" />
                </div>
                <h3 class="lx-source__name">{{ source.name }}</h3>
                <p class="lx-source__desc">{{ source.description }}</p>
                <span
                  class="lx-status"
                  :class="{ 'lx-status--soon': source.comingSoon }"
                >
                  {{ source.comingSoon ? "Coming Soon" : "Available Now" }}
                </span>
              </article>
            </div>
          </div>
        </section>

        <!-- Lightroom Integration Section -->
        <section id="lightroom_plugin" class="lx-section">
          <div class="lx-container lx-split lx-split--reverse">
            <div
              v-reveal="{ variant: 'scale' }"
              v-scroll-progress="{ from: 1, to: 0.3, disableBelow: 760 }"
              class="lx-split__visual"
            >
              <ShotFrame
                class="lx-zoom"
                :video="lightroomVideoUrl"
                poster="/home/video_lr_poster.jpg"
                :playback-rate="2"
                alt="Photoreka plugin running inside Adobe Lightroom Classic"
                label="Lightroom Classic — Photoreka plugin"
                ratio="auto"
              />
            </div>

            <div class="lx-split__copy">
              <div v-reveal class="lx-lr-badge">
                <img src="/logos/lightroom_logo.png" alt="Adobe Lightroom" />
              </div>
              <SectionIntro index="06" eyebrow="Official Plugin" flush>
                <template #title>
                  Lightroom <em class="lx-accent">Integration</em>
                </template>
                <p>
                  Seamlessly connect Photoreka with Adobe Lightroom Classic.
                  Sync your catalog, search by natural language directly from
                  Lightroom, and bring the power of intelligent curation to your
                  existing workflow.
                </p>
              </SectionIntro>

              <ul v-reveal="200" class="lx-list lx-lr-list">
                <li v-for="item in lightroomFeatures" :key="item.label">
                  <span class="lx-lr-list__icon" aria-hidden="true">
                    <n-icon size="16"><component :is="item.icon" /></n-icon>
                  </span>
                  <span>{{ item.label }}</span>
                </li>
              </ul>

              <div v-reveal="280" class="lx-actions">
                <LxButton icon="download" @click="goToAuth('signup')">
                  Get the Plugin
                </LxButton>
                <span class="lx-note">Free with Photoreka account</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing Section -->
        <section id="pricing" class="lx-section">
          <div class="lx-container">
            <SectionIntro index="07" eyebrow="Pricing" align="center">
              <template #title>
                Simple, <em class="lx-accent">one-time</em> pricing
              </template>
              <p>
                Pay once to analyze your photos — no subscription. Slide to size
                your package: the more you analyze, the less you pay per photo.
                Slots never expire.
              </p>
            </SectionIntro>
            <div v-reveal="120">
              <PricingSlider
                :visible="true"
                @get-started="goToAuth('signup')"
              />
            </div>
          </div>
        </section>

        <!-- FAQs Section -->
        <section id="faq" class="lx-section">
          <div class="lx-container lx-faq-grid">
            <div class="lx-faq-grid__intro">
              <SectionIntro index="08" eyebrow="FAQ" flush>
                <template #title>
                  Frequently asked questions
                  <em class="lx-accent">about Photoreka</em>
                </template>
                <p>
                  Everything you need to know about using AI to curate and
                  organize your photos
                </p>
              </SectionIntro>
            </div>

            <div v-reveal="150" class="lx-faq">
              <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="lx-faq__item"
                :class="{ 'is-open': activeFAQ === index }"
              >
                <button
                  class="lx-faq__q"
                  :aria-expanded="activeFAQ === index"
                  @click="toggleFAQ(index)"
                >
                  <span class="lx-faq__num">{{
                    String(index + 1).padStart(2, "0")
                  }}</span>
                  <span class="lx-faq__text">{{ faq.question }}</span>
                  <span class="lx-faq__icon" aria-hidden="true" />
                </button>
                <div class="lx-faq__a">
                  <div class="lx-faq__a-inner">
                    <p v-if="faq.hasHtml" v-html="faq.answer"></p>
                    <p v-else-if="!faq.hasLink">{{ faq.answer }}</p>
                    <p v-else>
                      {{ faq.answer.split("Terms and Image Policy")[0] }}
                      <a @click="goToTerms" class="lx-inline-link"
                        >Terms and Image Policy</a
                      >
                      {{
                        faq.answer
                          .split("Terms and Image Policy")
                          .slice(1)
                          .join("Terms and Image Policy")
                      }}
                    </p>
                  </div>
                </div>
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
  CloudUploadOutline,
  CubeOutline,
  LinkOutline,
  LogoDropbox,
  SunnyOutline,
  MoonOutline,
  SyncOutline,
  ChatbubblesOutline,
  ShareSocialOutline,
  InformationCircleOutline,
  BarChartOutline,
  LayersOutline,
  AnalyticsOutline,
  ArrowForwardOutline,
  WalkOutline,
  ColorPaletteOutline,
  PersonOutline,
  BriefcaseOutline,
} from "@vicons/ionicons5";
import Workspace from "@vicons/carbon/es/Workspace.js";
import Trophy20Regular from "@vicons/fluent/es/Trophy20Regular.js";
import BookOpen16Regular from "@vicons/fluent/es/BookOpen16Regular.js";
import RequestAccessDialog from "~/components/RequestAccessDialog.vue";
import { trackEvent, trackUserAction } from "~/utils/analytics";

// SEO Configuration
useSEO("home");

// Inyectar script inline para prevenir FOUC
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

// Wrapper para toggle con tracking
const toggleTheme = () => {
  baseToggleTheme();
  // trackEvent("theme_toggle", { mode: themeMode.value });
};

// Scroll suave (Lenis) mientras la página está montada
const smoothScroll = useSmoothScroll();

// Dialog states
const showRequestDialog = ref(false);
const activeFAQ = ref(null);
const showAnnouncement = ref(true);
const announcementBarRef = ref(null);
const announcementHeight = ref(0);
const announcementHiddenByScroll = ref(false);
let announcementResizeObserver = null;
let lastScrollY = 0;
let scrollTicking = false;

const heroAnnouncement = ref({
  enabled: false,
  dismissible: true,
  label: "EARLY ACCESS",
  message:
    "Free starter photo package and usage credits are available for new photographers.",
  cta: "Try for Free",
});

// Secciones que aparecen en la barra de navegación (target = id de sección)
const navLinks = [
  { label: "Search", target: "ai_search" },
  { label: "Tools", target: "features" },
  { label: "Picks", target: "picks" },
  { label: "Sources", target: "sources" },
  { label: "Pricing", target: "pricing" },
  { label: "FAQ", target: "faq" },
];

const heroGenres = [
  { icon: markRaw(WalkOutline), label: "Street" },
  { icon: markRaw(BookOpen16Regular), label: "Documentary" },
  { icon: markRaw(ColorPaletteOutline), label: "Artistic" },
  { icon: markRaw(PersonOutline), label: "Lifestyle" },
  { icon: markRaw(BriefcaseOutline), label: "Commercial" },
];
// Repeated so each half of the rolling track is wider than the column;
// otherwise a gap shows before the loop restarts.
const heroGenreChips = [...heroGenres, ...heroGenres];

// Hidden while trying the atlas on its own; true brings the prints back.
const showHeroPrints = false;
// Photos shown enlarged over the atlas, as on hover in the 2D viewer.
const heroFeatures2d = [];
const heroPrints = [
  "/picks/photos/2.jpg",
  "/picks/photos/5.jpg",
  "/picks/photos/1.jpg",
];

const heroFeatures = [
  { label: "Natural-language search" },
  { label: "Chat Assistant" },
  { label: "Multi-score ranking" },
  { label: "Smart culling" },
  { label: "2D/3D clustering" },
  { label: "Storyboarding" },
  { label: "Portfolio builder" },
  { label: "Style patterns" },
  { label: "Evolution tracking" },
  { label: "Geo-Location" },
];

// ── Escenario del hero ─────────────────────────────────────────
// Tres capturas que rotan entre las posiciones `center` (delante) y `left` /
// `right` (detrás, más pequeñas y atenuadas); en móvil solo se ve `center`.
// La primera del array empieza en el centro.
//
// Cada marco adopta la proporción de su captura, así que se ven enteras sin
// recorte. Tamaños y posiciones de cada hueco viven en el CSS
// (.lx-stage__slot.is-*).
//
// `heroStagePhone`: captura móvil adosada a la esquina inferior derecha de
// la captura que esté en el centro. El CSS recorta el halo de
// photoreka_mobile_halo.png, así que otra imagen con distinto encuadre
// necesitaría ajustar el clip-path de .lx-stage__phone img.
const heroStage = [
  {
    src: "/canvas/chatlab.png",
    label: "Photoreka — Portfolio",
    alt: "AI photo portfolio built with Photoreka",
  },
  {
    src: "/home/portfolio_desktop_4.jpg",
    label: "Photoreka — Dashboard",
    alt: "Photoreka AI photo curation and organizer dashboard",
  },
  {
    src: "/home/tag_cloud_poster_detailed.jpg",
    label: "Photoreka — Tag Cloud",
    alt: "AI-generated photo tag cloud in 2D semantic space",
  },
];

const heroStagePhone = "/home/photoreka_mobile_halo.png";

// Cada turno: derecha → centro, centro → izquierda, izquierda → derecha.
const HERO_STAGE_POSITIONS = ["center", "left", "right"];
// Milisegundos entre cambios; 0 deja las capturas fijas.
const HERO_STAGE_INTERVAL = 0;
const HERO_STAGE_TRANSITION = 1100;
const heroStageTurn = ref(0);
const heroStageTurning = ref(false);
const heroStagePosition = (index) =>
  HERO_STAGE_POSITIONS[(index + heroStageTurn.value) % HERO_STAGE_POSITIONS.length];

let heroStageTimer = null;
let heroStageTurningTimer = null;

// La transición solo se activa durante el cambio para que el resto del
// tiempo las capturas sigan al scroll sin retraso.
const advanceHeroStage = () => {
  heroStageTurning.value = true;
  heroStageTurn.value += 1;
  clearTimeout(heroStageTurningTimer);
  heroStageTurningTimer = setTimeout(() => {
    heroStageTurning.value = false;
  }, HERO_STAGE_TRANSITION);
};

const lightroomVideoUrl = "/videos/lr_plugin.mp4";

const lightroomFeatures = [
  { icon: markRaw(SyncOutline), label: "Direct sync from Lightroom catalog" },
  {
    icon: markRaw(ChatbubblesOutline),
    label: "Search by natural language integrated",
  },
  {
    icon: markRaw(ShareSocialOutline),
    label: "One-click photo transfer to Photoreka",
  },
  {
    icon: markRaw(LinkOutline),
    label: "Compatible with Photoreka web workflow",
  },
  {
    icon: markRaw(InformationCircleOutline),
    label: "Lightroom Classic 13.0+ · RAW, JPEG, PNG, TIFF",
  },
];

// Which layout to render for the features section:
//   "grid"     → original card grid
//   "showcase" → alternating image + copy rows
//   "stack"    → sticky cards that pile up while scrolling (lx system)
const featuresVariant = ref("stack");

// Features data
// `lead` + `bullets` + `image` are used by the "showcase" and "stack" variants.
// If `bullets` is omitted they fall back to splitting `description`.
const features = ref([
  // {
  //   icon: markRaw(SearchOutline),
  //   title: "Natural Language Search",
  //   description:
  //     "Find any photo by describing it. Search for moods, scenes, lighting conditions, cinematic references, or abstract feelings. No keywords, no tagging—just describe what you remember and Photoreka finds it.",
  //   lead: "Find any photo just by describing it — no keywords, no tagging.",
  //   bullets: [
  //     "Search moods, scenes, lighting and cinematic references",
  //     "Broad, Adaptive and Precise search modes",
  //     "Just describe what you remember and Photoreka finds it",
  //   ],
  //   image: "/ai_photo_scoring/2.png",
  //   color: "#2563eb",
  //   link: "/ai_photo_search",
  // },
  {
    icon: markRaw(ChatbubblesOutline),
    title: "Photo Chat Assistant",
    description:
      "Chat with your photo library to find your strongest images, request honest critique, detect patterns across your catalog, and curate meaningful selections in plain language.",
    lead: "Talk to your archive and get ranked picks, critique, and catalog insights.",
    bullets: [
      "Ask natural-language questions about your full photo library",
      "Get portfolio critique and quality-ranked selections",
      "Track your evolution and discover recurring patterns",
    ],
    image: "/chatlab/1.png",
    color: "#8b5cf6",
    link: "/photo_chat",
    demoLinks: [
      { label: "Try demo", link: "/demo/chat-lab" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/chat-lab",
        commercial: true,
      },
    ],
  },
  {
    icon: markRaw(CubeOutline),
    title: "2D / 3D Atlas",
    description:
      "Explore your entire archive as an universe of images mapped in semantic space. Navigate in 2D or immersive 3D to discover visual clusters, stylistic threads, and unexpected connections across your catalog.",
    lead: "Explore your entire archive as a universe of images mapped in semantic space.",
    bullets: [
      "Navigate your catalog in 2D or immersive 3D",
      "Discover visual clusters and stylistic threads",
      "Surface unexpected connections across your work",
    ],
    image: "/atlas/2d.png",
    color: "#06b6d4",
    link: "/photo_3D_atlas",
    // /2d-atlas en vez de /atlas?mode=2d: el guard de demo de la app reconstruye
    // el destino desde `to.path` y pierde el query, así que el modo tiene que
    // viajar en la ruta. /2d-atlas ya redirige a /atlas?mode=2d.
    demoLinks: [
      { label: "Try demo", link: "/demo/2d-atlas" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/2d-atlas",
        commercial: true,
      },
    ],
  },

  {
    icon: markRaw(Trophy20Regular),
    title: "Rankings & Scores",
    description:
      "Score your photos across multiple dimensions: aesthetics, composition, narrative strength, originality, visual wit, humor, and more. Commercial mode adds product-specific scores like subject clarity and commercial intent. Rank your catalog and surface your strongest work automatically.",
    lead: "Score your photos across multiple dimensions and rank your catalog.",
    bullets: [
      "Score aesthetics, composition, narrative and originality",
      "Commercial mode adds product-specific scores",
      "Surface your strongest work automatically",
    ],
    image: "/ai_photo_scoring/1.png",
    color: "#ec4899",
    link: "/photo_scoring",
    demoLinks: [
      { label: "Try demo", link: "/demo/workspace" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/workspace",
        commercial: true,
      },
    ],
  },
  {
    icon: markRaw(Workspace),
    title: "Interactive Canvas",
    description:
      "Drag, arrange, and storyboard your photos freely on an infinite canvas. Drop any image and Photoreka surfaces visually or narratively similar photos from your archive — and a chat docked to the board reads the arrangement, tells you what the sequence is missing, and finds it in your library.",
    lead: "Storyboard your photos freely on an infinite canvas, with AI beside you.",
    bullets: [
      "Compose and sequence freely on an infinite canvas",
      "Drop an image to surface visually similar photos",
      "Ask a chat that sees your board what the sequence is missing",
    ],
    image: "/canvas/levels.png",
    color: "#8b5cf6",
    link: "/ai_photo_storyboard",
    demoLinks: [
      { label: "Try demo", link: "/demo/canvas" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/canvas",
        commercial: true,
      },
    ],
  },
  // {
  //   icon: markRaw(GitNetworkOutline),
  //   title: "Tag Cloud",
  //   description:
  //     "Every AI-extracted tag from your photos mapped in 2D semantic space. Similar concepts cluster together. Navigate the map to browse, select a region to search, or enable dynamic mode for real-time photo discovery.",
  //   color: "#a78bfa",
  //   link: "/photo_tag_cloud",
  // },
  {
    icon: markRaw(LayersOutline),
    title: "AI Portfolio Builder",
    description:
      "Turn thousands of photos into a curated, ordered portfolio in minutes. Photoreka scores your catalog across 8 artistic dimensions, selects your strongest work under one of five coherence modes, and sequences the final set for visual flow.",
    lead: "Turn thousands of photos into a curated, ordered portfolio in minutes.",
    bullets: [
      "Score photos across 8 artistic dimensions",
      "Choose from five coherence modes: Visual, Chromatic, Narrative, Heterogeneous, Free",
      "Let AI sequence the final selection for visual flow",
    ],
    // Multiple images → rendered as an auto-rotating carousel.
    // Single-image features just use `image` below.
    images: [
      "/portfolio_builder/0.png",
      "/portfolio_builder/1.png",
      "/portfolio_builder/2.png",
      "/portfolio_builder/3.png",
      "/portfolio_builder/4.png",
      "/portfolio_builder/5.png",
    ],
    color: "#22c55e",
    link: "/photography_portfolio_builder",
    demoLinks: [
      { label: "Try demo", link: "/demo/portfolios" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/portfolios",
        commercial: true,
      },
    ],
  },
  {
    icon: markRaw(BarChartOutline),
    title: "Reports & Patterns",
    description:
      "Understand how you shoot. Photoreka surfaces recurring stylistic patterns, narrative tendencies, cultural references, and compositional habits across your archive—helping you see your work from the outside.",
    lead: "Understand how you shoot — see your work from the outside.",
    bullets: [
      "Surface recurring stylistic and narrative patterns",
      "Reveal cultural references and compositional habits",
      "Analyze your whole archive with AI, not vibes",
    ],
    image: "/report/3.png",
    color: "#f59e0b",
    link: "/photo_reports",
    demoLinks: [
      { label: "Try demo", link: "/demo/report" },
      {
        label: "Commercial demo",
        link: "/demo-commercial/report",
        commercial: true,
      },
    ],
  },

  {
    icon: markRaw(AnalyticsOutline),
    title: "AI Geo Inference",
    description:
      "Map your archive by inferred location, even when GPS data is missing. Photoreka estimates place, city, region, and country from visual context, then lets you explore clusters on an interactive map.",
    lead: "Map your archive with AI-inferred locations, even without GPS metadata.",
    bullets: [
      "Infer place, city, region, and country from visual context",
      "Explore geographic clusters in an interactive map view",
      "Refine results with source, detail, and time-range filters",
    ],
    image: "/ai_geoinference/3.png",
    color: "#14b8a6",
    link: "/ai_geo_inference",
  },
]);

// Data sources
const dataSources = ref([
  {
    icon: markRaw(CloudUploadOutline),
    name: "Local Files",
    description:
      "Upload photos directly from your computer. Supports all major image formats (JPEG, PNG, TIFF).",
    color: "#22c55e",
    comingSoon: false,
  },
  {
    logo: "/logos/google_photos.png",
    name: "Google Photos",
    description:
      "Sync your entire Google Photos library with one click. Keep your photos organized across platforms.",
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
      "Sync your Dropbox photo folders directly with Photoreka. Works with any folder structure you already have.",
    color: "#0061FF",
    comingSoon: false,
  },
]);

// FAQs data
const faqs = ref([
  {
    question: "What is Photoreka and who is it for?",
    answer:
      "Photoreka is an AI-powered app to curate and organize your photos. Upload a specific project, a curated selection, or a significant portion of your archive—then search in natural language, score and rank your images, find patterns across your work, and explore your catalog in 3D. Built for street, documentary, artistic, portrait, landscape, and commercial photographers who take their work seriously.",
  },
  {
    question: "How does Photoreka organize and curate photos with AI?",
    answer:
      "Photoreka uses computer vision AI to analyze your photographs, identifying narrative and stylistic elements. This enables intelligent organization, advanced semantic search by natural language, automatic photo scoring and ranking, 3D catalog visualization, and AI-assisted portfolio curation—all without manual tagging. For detailed information on our image processing policies, please see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Does Photoreka work for commercial and product photography?",
    answer:
      "Yes. Alongside the artistic dimensions, commercial mode activates two extra scores: subject clarity—how cleanly the main subject reads—and commercial intent—how usable a frame is for a brand, catalog, or campaign. Commercial photographers use it to search an archive from a client brief, rank a shoot by what's actually sellable, and assemble a client-ready selection, across product, fashion, architecture, lifestyle, and wedding work. A separate commercial demo runs on its own catalog.",
  },
  {
    question: "Is Photoreka a storage platform?",
    answer:
      "Photoreka is an AI photo curation and organization tool, not a storage service. It focuses on helping you understand, search, score, and curate your photo library. It works alongside your existing storage—Lightroom Classic, Google Photos, Dropbox, or local files. For details about how we handle your images, see our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "Does Photoreka create or transform images?",
    answer:
      "No. Photoreka is dedicated exclusively to the analysis, organization, and curation of your photographic images. The platform does not generate synthetic images, alter, or transform your photos in any way. We do not support or endorse the creation or use of synthetic or manipulated images within Photoreka.",
  },
  {
    question: "What happens to my photos and who can see them?",
    answer:
      "We only store a reduced version of your images on secure servers—sufficient to facilitate searches and for common social media uses, but not for any other purpose. The analysis is performed using proprietary and third-party services under agreements that prevent retaining or reusing your photos. They are not shared with anyone and you always retain 100% of the rights to your work. For complete details, please read our Terms and Image Policy.",
    hasLink: true,
  },
  {
    question: "What kind of photo catalog works best with Photoreka?",
    answer:
      "Photoreka is built for photographers who want to work with a curated body of work—not a raw dump of every file ever captured. Think of it as a studio, not a warehouse. The sweet spot is a catalog of up to 20,000 photos; up to 50,000 is workable but we recommend keeping it focused. Because the AI tools are built around curation—semantic search, visual clusters, scoring, sequencing—they work best when your archive already has a baseline of intentionality.",
  },
  {
    question: "Can I try Photoreka for free?",
    answer: `Analyzing your photos requires a single batch payment. Afterward, you can use most tools for free, with some daily/total limits, or purchase credits to work unlimitedly. <span style='color:var(--lx-accent);font-weight:600;'>During the <a href='#' style='color:inherit;text-decoration:underline;' onclick='event.preventDefault();window.__goToEarlyAccess && window.__goToEarlyAccess()'>early access</a> phase, a free photo package and usage credits will be offered.</span>`,
    hasHtml: true,
  },
]);

// Get runtime config
const config = useRuntimeConfig();

const { isOpenMode, signupButtonLabel } = useRegistrationMode();

// Navigation methods
const goToAuth = (mode = "login") => {
  trackUserAction("navigate_to_auth", "landing_page_premium", mode);
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

const goToTerms = () => {
  trackUserAction("navigate_to_terms", "landing_page_premium");
  navigateTo("/terms");
};

const goToDemo = () => {
  trackUserAction("navigate_to_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/workspace", "_blank");
};

const goToCanvasDemo = () => {
  trackUserAction("navigate_to_canvas_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/canvas", "_blank");
};

const goToSearchDemo = () => {
  trackUserAction("navigate_to_search_demo", "landing_page_premium");
  window.open("https://app.photoreka.com/demo/search", "_blank");
};

// La demo comercial corre sobre su propio catálogo (/demo-commercial), no es
// una ruta dentro de /demo. Ver app/pages/commercial_photography.vue.
const goToCommercialDemo = () => {
  trackUserAction("navigate_to_demo", "landing_page_premium", "commercial");
  window.open("https://app.photoreka.com/demo-commercial/workspace", "_blank");
};

const onRequestSuccess = () => {};

// Clicks en la barra de navegación. Pricing conserva su evento de siempre.
const onNavNavigate = (target) => {
  if (target === "pricing") {
    trackUserAction("navigate_to_pricing", "landing_page_premium");
  } else {
    trackUserAction("navigate_to_section", "landing_page_premium", target);
  }
};

// FAQ methods
const toggleFAQ = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = activeFAQ.value === index ? null : index;
  trackEvent("faq_toggle", {
    faq_index: index,
    action: wasOpen ? "close" : "open",
    question:
      faqs.value[index]?.question?.substring(0, 50) + "..." || `FAQ ${index}`,
  });
};

// Mantiene --announcement-height sincronizado con el alto real de la barra
// (padding/line-wrap deciden su alto, no un valor fijo), para que el nav y
// el hero no queden desalineados respecto a ella.
const syncAnnouncementHeight = () => {
  announcementHeight.value = announcementBarRef.value?.offsetHeight ?? 0;
};

// Alto efectivo que reservan el nav y el hero: 0 cuando el anuncio está
// oculto por scroll, para que suban y ocupen el espacio con transición.
const announcementLayoutHeight = computed(() =>
  announcementHiddenByScroll.value ? 0 : announcementHeight.value,
);

// Oculta el anuncio al bajar y lo reaparece al subir (o cerca del top),
// con un pequeño umbral para evitar parpadeos por scroll mínimo.
const ANNOUNCEMENT_SCROLL_DELTA = 8;

const updateAnnouncementVisibility = () => {
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;

  if (currentY <= announcementHeight.value) {
    announcementHiddenByScroll.value = false;
  } else if (delta > ANNOUNCEMENT_SCROLL_DELTA) {
    announcementHiddenByScroll.value = true;
  } else if (delta < -ANNOUNCEMENT_SCROLL_DELTA) {
    announcementHiddenByScroll.value = false;
  }

  lastScrollY = currentY;
  scrollTicking = false;
};

const onAnnouncementScroll = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateAnnouncementVisibility);
};

watch(
  () => heroAnnouncement.value.enabled && showAnnouncement.value,
  (isVisible) => {
    if (!isVisible) {
      announcementHeight.value = 0;
      return;
    }
    nextTick(() => {
      syncAnnouncementHeight();
      if (announcementBarRef.value) {
        announcementResizeObserver?.disconnect();
        announcementResizeObserver = new ResizeObserver(syncAnnouncementHeight);
        announcementResizeObserver.observe(announcementBarRef.value);
      }
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  announcementResizeObserver?.disconnect();
  window.removeEventListener("scroll", onAnnouncementScroll);
  smoothScroll.disable();
  clearInterval(heroStageTimer);
  clearTimeout(heroStageTurningTimer);
});

onMounted(() => {
  // Inicializar tema completo (el plugin ya aplicó las variables básicas)
  initTheme();

  smoothScroll.enable();

  // Muestra/oculta el anuncio del top según la dirección del scroll
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", onAnnouncementScroll, { passive: true });

  if (
    HERO_STAGE_INTERVAL > 0 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    heroStageTimer = setInterval(advanceHeroStage, HERO_STAGE_INTERVAL);
  }
});

// Attach goToAuth('signup') to window for FAQ HTML link
if (typeof window !== "undefined") {
  window.__goToEarlyAccess = () => goToAuth("signup");
}
</script>

<style scoped>
/* ── Announcement bar (disabled by default, see heroAnnouncement) ── */
.lx-home {
  --announcement-height: 0px;
}

.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  min-height: var(--announcement-height);
  padding: 0.35rem 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fde9c8;
  color: #111827;
  font-size: var(--lx-fs-sm);
  line-height: 1.4;
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}

.announcement-bar--hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.announcement-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  text-align: center;
}

.announcement-content strong {
  color: #b45309;
  font-weight: 700;
}

.announcement-link,
.announcement-close {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
}

.announcement-link {
  color: #b45309;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.announcement-close {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #111827;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.2;
}

/* ── Hero ───────────────────────────────────────────────────── */
.lx-hero {
  position: relative;
  padding-top: calc(var(--announcement-height) + clamp(152px, 22svh, 230px));
  padding-bottom: clamp(16px, 3vw, 40px);
  transition: padding-top 0.35s ease;
}

/* Soft brand light falling from the top, behind the headline. */
.lx-hero__aura {
  position: absolute;
  inset: 0 0 auto;
  height: 1200px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(48% 42% at 34% 4%, var(--lx-glow-1), transparent 72%),
    radial-gradient(34% 34% at 10% 16%, var(--lx-glow-2), transparent 72%),
    radial-gradient(60% 40% at 50% 62%, var(--lx-glow-1), transparent 70%);
}

/* The headline spans the full width; everything else sits in a band
   below it, so the supporting copy never competes with it side by side.
   Vertical sizes follow the viewport height so the product stage always
   peeks above the fold. */
.lx-hero__grid {
  display: grid;
  gap: clamp(28px, 4svh, 48px);
}

.lx-hero__heading {
  position: relative;
  display: grid;
  gap: 1.9rem;
}

.lx-hero__title {
  font-size: clamp(3rem, min(6.9vw, 11.6svh), 6.5rem);
}

/* Loose prints beside the end of the headline, kept fully opaque.
   Below 1280px the headline reaches them, so they go. */
.lx-hero__prints {
  --lx-prints-bleed: 56px;
  position: absolute;
  z-index: 0;
  top: calc(var(--lx-prints-bleed) * -1);
  right: calc(var(--lx-prints-bleed) * -1);
  bottom: calc(var(--lx-prints-bleed) * -1);
  width: calc(min(31%, 420px) + var(--lx-prints-bleed));
  pointer-events: none;
}

.lx-hero__prints-set {
  position: absolute;
  inset: var(--lx-prints-bleed) var(--lx-prints-bleed) var(--lx-prints-bleed) 0;
  container-type: size;
}

/* Thin paper border at the photos' own 3:2. Dimmed rather than
   translucent, so overlapping prints don't show through each other. */
.lx-hero__print {
  position: absolute;
  top: var(--y);
  right: var(--x);
  /* Capped by the headline's height too, so on short screens the stack
     stays clear of the divider. */
  width: min(56cqw, 76cqh);
  padding: 2.5%;
  background: #ebe7de;
  border-radius: 1px;
  filter: brightness(0.7) saturate(0.8);
  box-shadow: 0 22px 40px -18px rgba(0, 0, 0, 0.85);
  transform: translate(var(--dx, 0), var(--dy, 0))
    rotate(calc(var(--r) + var(--dr, 0deg)));
  pointer-events: auto;
  transition:
    filter 0.5s ease,
    transform 0.7s var(--lx-ease);
}

[data-theme="light"] .lx-hero__print {
  background: #ffffff;
  filter: brightness(0.7) saturate(0.25);
  box-shadow: 0 18px 34px -18px rgba(13, 13, 16, 0.35);
}

.lx-hero__print img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.lx-hero__print.is-0 {
  --x: 2%;
  --y: 0%;
  --r: 6deg;
}

.lx-hero__print.is-1 {
  --x: 40%;
  --y: 16%;
  --r: -7deg;
}

.lx-hero__print.is-2 {
  --x: 15%;
  --y: 36%;
  --r: 2.5deg;
}

/* Hovering any print lifts the dimming on all three and fans them out. */
.lx-hero__prints-set:has(.lx-hero__print:hover) .lx-hero__print {
  filter: none;
}

.lx-hero__prints-set:has(.lx-hero__print:hover) .is-0 {
  --dx: 10px;
  --dy: -6px;
  --dr: 2deg;
}

.lx-hero__prints-set:has(.lx-hero__print:hover) .is-1 {
  --dx: -12px;
  --dy: -2px;
  --dr: -2deg;
}

.lx-hero__prints-set:has(.lx-hero__print:hover) .is-2 {
  --dx: 2px;
  --dy: 8px;
  --dr: -1.5deg;
}

/* The 2D atlas as a far-off universe behind the prints. Screen blending
   drops the capture's black background, so only the photos and their glow
   remain; the radial mask dissolves its edges. */
/* From 40% of the heading to the viewport's right edge, rising above the
   eyebrow and ending at the divider. The left side fades under the headline
   through the mask. No z-index here: a stacking context would stop the
   screen blend reaching the page background. */
.lx-hero__atlas-box {
  position: absolute;
  top: -48%;
  bottom: -16%;
  left: 40%;
  right: calc((100% - 100vw) / 2);
  pointer-events: none;
}

.lx-hero__atlas {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  mix-blend-mode: screen;
  filter: brightness(0.85);
  -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.18) 22%,
      rgba(0, 0, 0, 0.55) 42%,
      #000 62%
    ),
    linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.18) 22%,
      rgba(0, 0, 0, 0.55) 42%,
      #000 62%
    ),
    linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%);
  mask-composite: intersect;
  animation: lx-atlas-in 2s 0.6s ease-out both;
}

/* One photo of the atlas shown enlarged, as on hover in the 2D viewer. */
.lx-hero__feature {
  position: absolute;
  z-index: 0;
  object-fit: cover;
  border-radius: 2px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 16px 34px -12px rgba(0, 0, 0, 0.9);
  filter: brightness(0.92);
  pointer-events: auto;
  transition: filter 0.5s ease;
  animation: lx-feature-in 0.9s var(--lx-feature-delay, 1.4s) var(--lx-ease)
    both;
}

/* Centred on the cores of the upper and right clusters of the atlas image
   (57%/28% and 86%/42% of the box). Heights are in box units: the box is
   2.45 times wider than tall. */
.lx-hero__feature.is-0 {
  left: 52.75%;
  top: 17.6%;
  width: 8.5%;
  aspect-ratio: 1;
}

.lx-hero__feature.is-1 {
  left: 82.5%;
  top: 29.2%;
  width: 7%;
  aspect-ratio: 2 / 3;
  --lx-feature-delay: 1.7s;
}

.lx-hero__feature:hover {
  filter: none;
}

@keyframes lx-feature-in {
  from {
    opacity: 0;
    transform: scale(0.35);
  }
}

@keyframes lx-atlas-in {
  from {
    opacity: 0;
  }
}

[data-theme="light"] .lx-hero__atlas,
[data-theme="light"] .lx-hero__feature {
  display: none;
}

/* Paper clip slid over a corner of each print. */
.lx-hero__clip {
  position: absolute;
  z-index: 1;
  top: -15px;
  width: 13px;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.55));
}

.lx-hero__clip path {
  fill: none;
  stroke: #dfe3e8;
  stroke-width: 1.5;
  stroke-linecap: round;
}

.lx-hero__print.is-0 .lx-hero__clip {
  right: 9%;
  transform: rotate(28deg);
}

.lx-hero__print.is-1 .lx-hero__clip {
  left: 9%;
  transform: rotate(-28deg);
}

.lx-hero__print.is-2 .lx-hero__clip {
  right: 12%;
  transform: rotate(22deg);
}

@media (max-width: 1279px) {
  .lx-hero__prints,
  .lx-hero__atlas,
  .lx-hero__feature {
    display: none;
  }
}

.lx-hero__title .lx-accent {
  font-weight: 360;
}

.lx-hero__stars {
  color: var(--lx-warm);
  letter-spacing: 0.12em;
}

.lx-hero__aside {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lx-line-2);
}

.lx-hero__intro {
  display: grid;
  gap: 1rem;
  justify-self: start;
  min-width: 0;
}

.lx-hero__cta {
  display: grid;
  gap: 0.9rem;
  justify-items: end;
}

.lx-hero__lead {
  font-size: 1.04rem;
  line-height: 1.7;
}

.lx-hero__lead > span {
  display: block;
  text-wrap: balance;
}

/* Contained so the endless track adds no width: the row takes the lead's. */
.lx-hero__tools {
  contain: inline-size;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 6%,
    #000 88%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 6%,
    #000 88%,
    transparent
  );
}

.lx-hero__tools-track {
  display: flex;
  width: max-content;
  animation: lx-hero-tools 80s linear infinite;
}

.lx-hero__tools:hover .lx-hero__tools-track {
  animation-play-state: paused;
}

/* The trailing padding equals the gap so the -50% loop has no seam. */
.lx-hero__tools-set {
  display: flex;
  gap: 0.5rem;
  margin: 0;
  padding: 0 0.5rem 0 0;
  list-style: none;
}

@keyframes lx-hero-tools {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lx-hero__tools-track {
    animation: none;
  }
}

.lx-hero__tools li {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.85rem 0.3rem 0.7rem;
  border: 1px solid var(--lx-line);
  border-radius: 999px;
  color: var(--lx-text-2);
  font-size: var(--lx-fs-sm);
  font-weight: 500;
}

.lx-hero__tools .n-icon {
  color: color-mix(in srgb, var(--lx-accent) 60%, transparent);
}

.lx-hero__alt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.7rem;
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.lx-hero__alt .lx-link {
  font-size: var(--lx-fs-sm);
}

/* ── Hero stage ─────────────────────────────────────────────────
   .lx-stage__deck follows the scroll (--p, 0..1 over the first ~45% of a
   viewport): the whole set leans back at load and stands upright. The
   three captures share one grid cell and are placed with transforms. */
.lx-hero__stage {
  margin-top: clamp(32px, 5svh, 64px);
}

.lx-stage {
  position: relative;
}

.lx-stage__scene {
  position: relative;
  perspective: 2200px;
  perspective-origin: 50% 0%;
  padding-bottom: 6%;
}

.lx-stage__scene::before {
  content: "";
  position: absolute;
  inset: 6% 0 -4%;
  pointer-events: none;
  background: radial-gradient(closest-side, var(--lx-glow-1), transparent);
  filter: blur(30px);
}

.lx-stage__deck {
  /* Extra side offset on wide screens, pulled in a little on narrow ones
     so the side captures don't fall off the viewport. */
  --lx-stage-spread: clamp(-64px, calc((100vw - 1440px) * 0.3), 180px);
  position: relative;
  display: grid;
  width: min(74%, 940px);
  margin-inline: auto;
  transform-origin: 50% 0%;
  transform: rotateX(calc((1 - var(--p, 1)) * 20deg))
    scale(calc(0.92 + var(--p, 1) * 0.08));
  will-change: transform;
}

.lx-stage__slot {
  grid-area: 1 / 1;
  align-self: start;
  position: relative;
  z-index: 1;
}

.lx-stage__slot.is-center {
  z-index: 3;
  transform: none;
}

/* The capture wrapping from left to right passes behind the other two. */
.lx-stage__slot.is-right {
  z-index: 0;
}

.lx-stage__deck.is-turning .lx-stage__slot {
  transition: transform 1.1s cubic-bezier(0.65, 0, 0.35, 1);
}

.lx-stage__deck.is-turning .lx-stage__slot::after {
  transition: opacity 1.1s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Side captures fan out like an open hand of cards (tops leaning outward)
   and close as --p reaches 1. */
.lx-stage__slot.is-left,
.lx-stage__slot.is-right {
  --lx-stage-fan: calc((1 - var(--p, 1)) * 6deg);
}

.lx-stage__slot.is-right {
  transform: translate3d(calc(47% + var(--lx-stage-spread)), 7%, 0) scale(0.68)
    rotate(var(--lx-stage-fan));
}

.lx-stage__slot.is-left {
  transform: translate3d(calc(-47% - var(--lx-stage-spread)), 7%, 0) scale(0.68)
    rotate(calc(var(--lx-stage-fan) * -1));
}

/* A veil of the page colour dims the captures while the stage is tilted
   (--p < 1) and lifts as it straightens; the side ones keep part of it. */
.lx-stage__slot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--lx-radius);
  background: var(--lx-bg);
  opacity: calc((1 - var(--p, 1)) * 0.5);
  pointer-events: none;
}

.lx-stage__slot.is-left::after,
.lx-stage__slot.is-right::after {
  opacity: calc(0.45 + (1 - var(--p, 1)) * 0.3);
}

/* Optional phone hanging off the capture's bottom-right corner; it rises
   slightly as the stage straightens on scroll.
   The asset has a cyan halo baked in; clip-path trims the image to the
   phone body (insets measured on photoreka_mobile_halo.png) and the
   wrapper adds a neutral shadow, which a clipped element can't cast. */
.lx-stage__phone {
  position: absolute;
  z-index: 5;
  right: -4.5%;
  bottom: -13%;
  width: 21%;
  pointer-events: none;
  filter: brightness(calc(1 - (1 - var(--p, 1)) * 0.5))
    drop-shadow(0 28px 40px rgba(0, 0, 0, 0.6))
    drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
  transform: translate3d(0, calc((1 - var(--p, 1)) * 14%), 0);
  will-change: transform;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lx-stage__slot.is-center .lx-stage__phone {
  opacity: 1;
  transition-delay: 0.6s;
}

.lx-stage__phone img {
  display: block;
  width: 100%;
  height: auto;
  clip-path: inset(6.5% 13.5% 6.5% 16% round 10% / 5.9%);
}

/* ── Split layout (copy + visual) ───────────────────────────── */
.lx-split {
  display: grid;
  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
  gap: clamp(40px, 6vw, 104px);
  align-items: start;
}

.lx-split--reverse {
  grid-template-columns: minmax(0, 1.16fr) minmax(0, 0.84fr);
}

.lx-split__copy {
  display: grid;
  gap: 2.2rem;
}

/* The capture stays pinned beside the copy while the copy is read. */
.lx-split__visual {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 12vh);
}

/* Media-led variant: wider visual, both columns centred on each other and
   the visual scrolls with the page instead of pinning. */
.lx-split--media {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: clamp(40px, 5vw, 80px);
  align-items: center;
}

/* The visual may overhang the container on the right by up to 72px, never
   closer than the page gutter to the screen edge, so it can match the
   height of the copy beside it. */
.lx-split--media .lx-split__visual {
  position: relative;
  top: auto;
  margin-right: calc(
    -1 * clamp(0px, (100vw - var(--lx-container)) / 2 - var(--lx-gutter), 72px)
  );
}

/* Mirrored: visual on the left, overhanging the container on that side. */
.lx-split--media.lx-split--reverse {
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
}

.lx-split--media.lx-split--reverse .lx-split__visual {
  margin-right: 0;
  margin-left: calc(
    -1 * clamp(0px, (100vw - var(--lx-container)) / 2 - var(--lx-gutter), 72px)
  );
}

/* Canvas video: 16:9 cut on desktop, 4:5 cut on phones. */
.lx-canvas-video--mobile {
  display: none;
}

@media (max-width: 760px) {
  .lx-canvas-video--desktop {
    display: none;
  }

  .lx-canvas-video--mobile {
    display: block;
  }
}

@media (max-width: 1023px) {
  .lx-split--media.lx-split--reverse {
    grid-template-columns: 1fr;
  }

  .lx-split--media .lx-split__visual,
  .lx-split--media.lx-split--reverse .lx-split__visual {
    margin-right: 0;
    margin-left: 0;
  }
}

/* The capture grows into place as it travels up the viewport. */
.lx-zoom {
  transform-origin: 50% 100%;
  transform: translate3d(0, calc((1 - var(--p, 1)) * 48px), 0)
    scale(calc(0.9 + var(--p, 1) * 0.1));
}

/* ── Sources ────────────────────────────────────────────────── */
.lx-sources {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid var(--lx-line-2);
  background: var(--lx-line-2);
  box-shadow: var(--lx-shadow-md);
}

.lx-source {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: clamp(24px, 2.6vw, 38px);
  background: var(--lx-surface);
  transition: background-color 0.4s ease;
}

.lx-source:hover {
  background: var(--lx-surface-2);
}

.lx-source__logo {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 0.9rem;
  border-radius: 16px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

.lx-source__logo img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.lx-source__name {
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-source__desc {
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.lx-status--soon::before {
  background: var(--lx-text-3);
  box-shadow: none;
}

/* ── Lightroom ──────────────────────────────────────────────── */
.lx-lr-badge {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line-2);
  box-shadow: var(--lx-shadow-md);
}

.lx-lr-badge img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.lx-lr-list__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--lx-surface-2);
  border: 1px solid var(--lx-line);
  color: var(--lx-text-2);
}

.lx-note {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

/* ── FAQ ────────────────────────────────────────────────────── */
.lx-faq-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(40px, 6vw, 104px);
  align-items: start;
}

.lx-faq-grid__intro {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 32px);
}

.lx-faq {
  border-top: 1px solid var(--lx-line-2);
}

.lx-faq__item {
  border-bottom: 1px solid var(--lx-line-2);
}

.lx-faq__q {
  display: grid;
  grid-template-columns: 2.6rem minmax(0, 1fr) 30px;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.55rem 0;
  border: 0;
  background: none;
  color: var(--lx-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.lx-faq__num {
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text-3);
}

.lx-faq__text {
  font-family: var(--lx-font-display);
  font-size: clamp(1.15rem, 1.6vw, 1.42rem);
  font-weight: 380;
  line-height: 1.3;
  letter-spacing: -0.015em;
  transition: transform 0.6s var(--lx-ease);
}

.lx-faq__q:hover .lx-faq__text {
  transform: translateX(4px);
}

.lx-faq__icon {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--lx-line-2);
  color: var(--lx-text);
  transition:
    transform 0.6s var(--lx-ease),
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.lx-faq__icon::before,
.lx-faq__icon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 11px;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  transform: translate(-50%, -50%);
}

.lx-faq__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.lx-faq__item.is-open .lx-faq__icon {
  transform: rotate(135deg);
  background: var(--lx-btn-bg);
  border-color: transparent;
  color: var(--lx-btn-fg);
}

.lx-faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.7s var(--lx-ease);
}

.lx-faq__item.is-open .lx-faq__a {
  grid-template-rows: 1fr;
}

.lx-faq__a-inner {
  overflow: hidden;
  padding-left: 3.6rem;
}

.lx-faq__a-inner p {
  max-width: 46em;
  padding-bottom: 1.7rem;
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--lx-text-2);
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 1023px) {
  .lx-hero__aside,
  .lx-split,
  .lx-split--reverse,
  .lx-faq-grid {
    grid-template-columns: 1fr;
  }

  .lx-hero__aside {
    gap: 1.6rem;
    align-items: start;
  }

  .lx-hero__cta {
    justify-items: stretch;
    width: 100%;
    max-width: 460px;
  }

  /* Both buttons share the row and wrap to full-width rows when they
     don't fit side by side. */
  .lx-hero__cta .lx-btn {
    flex: 1 1 auto;
    justify-content: space-between;
  }

  .lx-hero__alt {
    justify-content: center;
    text-align: center;
  }

  .lx-split__visual {
    position: relative;
    top: auto;
  }

  .lx-split--reverse .lx-split__visual {
    order: 2;
  }

  .lx-faq-grid__intro {
    position: static;
  }

  .lx-sources {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  /* No room for the sides on phones: only the centre capture shows. */
  .lx-stage__deck {
    width: 100%;
  }

  .lx-stage__slot.is-left,
  .lx-stage__slot.is-right {
    display: none;
  }

  .lx-stage__phone {
    right: -2%;
    bottom: -10%;
    width: 30%;
  }

  .lx-sources {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .announcement-bar {
    display: none;
  }

  .lx-hero {
    padding-top: clamp(88px, 12svh, 112px);
  }

  .lx-hero__heading {
    gap: 1.25rem;
  }

  /* The eyebrow wraps as running text, stars trailing the last word. */
  .lx-hero__trust {
    display: block;
    line-height: 1.7;
  }

  .lx-hero__trust .lx-eyebrow__dot {
    display: inline-block;
    vertical-align: 0.15em;
    margin-right: 0.6rem;
  }

  .lx-hero__stars {
    margin-left: 0.5rem;
    white-space: nowrap;
  }

  .lx-hero__title {
    font-size: clamp(2.5rem, 11vw, 3rem);
  }

  .lx-hero__aside {
    gap: 1.25rem;
    padding-top: 1.25rem;
  }

  /* Tight enough for both buttons to share a row on a 390px phone. */
  .lx-hero__cta .lx-actions {
    gap: 0.5rem;
  }

  .lx-hero__cta .lx-btn {
    gap: 0.5rem;
    padding-left: 1rem;
    font-size: 0.88rem;
  }

  /* One flowing paragraph on phones: the three sentences as separate
     blocks would each break into two short lines. */
  .lx-hero__lead > span {
    display: inline;
  }

  .lx-faq__q {
    grid-template-columns: 2rem minmax(0, 1fr) 28px;
    gap: 0.75rem;
    padding: 1.3rem 0;
  }

  .lx-faq__a-inner {
    padding-left: 2.75rem;
  }
}
</style>
