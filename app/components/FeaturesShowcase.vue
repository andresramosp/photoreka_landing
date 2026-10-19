<template>
  <section
    :id="sectionId"
    class="features-showcase"
    :class="`features-showcase--${variant}`"
    ref="sectionRef"
  >
    <div :class="variant === 'stack' ? 'lx-container' : 'fs-container'">
      <!-- Section header -->
      <SectionIntro
        v-if="variant === 'stack' && (title || subtitle)"
        :eyebrow="eyebrow"
        :index="index"
        :lead="subtitle"
        align="center"
      >
        <template #title>
          {{ titleParts.before
          }}<em v-if="titleParts.accent" class="lx-accent">{{
            titleParts.accent
          }}</em
          >{{ titleParts.after }}
        </template>
      </SectionIntro>
      <div
        v-else-if="title || subtitle"
        class="fs-header"
        :class="{ visible }"
      >
        <h2 v-if="title" class="fs-section-title">{{ title }}</h2>
        <p v-if="subtitle" class="fs-section-subtitle">{{ subtitle }}</p>
      </div>

      <!-- ── Variant 3: Sticky stacking cards (lx system) ─────── -->
      <div v-if="variant === 'stack'" ref="stackRef" class="fs-stack">
        <article
          v-for="(feature, index) in features"
          :key="index"
          class="fs-stack-card"
          :style="{ '--i': index }"
        >
          <div class="fs-stack-inner">
            <div v-reveal class="fs-stack-copy">
              <div class="fs-stack-meta">
                <span class="fs-stack-icon" :style="{ color: feature.color }">
                  <n-icon size="20">
                    <component :is="feature.icon" />
                  </n-icon>
                </span>
                <span class="fs-stack-count">
                  {{ pad(index + 1) }}
                  <span>/ {{ pad(features.length) }}</span>
                </span>
              </div>
              <h3 class="fs-stack-title">{{ feature.title }}</h3>
              <p v-if="feature.lead" class="fs-stack-lead">
                {{ feature.lead }}
              </p>
              <ul class="lx-list fs-stack-bullets">
                <li v-for="(bullet, bi) in featureBullets(feature)" :key="bi">
                  <span class="lx-tick" aria-hidden="true" />
                  <span>{{ bullet }}</span>
                </li>
              </ul>
              <div
                v-if="feature.link || featureDemos(feature).length"
                class="fs-stack-actions"
              >
                <LxButton
                  v-for="(demo, di) in featureDemos(feature)"
                  :key="di"
                  size="sm"
                  :variant="demo.commercial ? 'warm' : 'ghost'"
                  icon="external"
                  :href="demo.href"
                  target="_blank"
                  >{{ demo.label }}</LxButton
                >
                <a
                  v-if="feature.link"
                  :href="feature.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="lx-link"
                >
                  Learn more
                  <n-icon size="15"><ArrowForwardOutline /></n-icon>
                </a>
              </div>
            </div>

            <div
              v-reveal="{ variant: 'scale', delay: 120 }"
              class="fs-stack-visual"
            >
              <div
                class="fs-stack-glow"
                :style="{ background: feature.color }"
                aria-hidden="true"
              />
              <!-- A single capture sets the frame's shape; a carousel mixes
                   shapes, so it gets a fixed frame and fits each one inside. -->
              <ShotFrame
                :label="feature.title"
                :ratio="featureImages(feature).length > 1 ? '16 / 10.4' : 'auto'"
              >
                <FeatureCarousel
                  :images="featureImages(feature)"
                  :alt="feature.title"
                  fit="contain"
                />
              </ShotFrame>
            </div>

            <div class="fs-stack-shade" aria-hidden="true" />
          </div>
        </article>
      </div>

      <!-- ── Variant 1: Grid of cards ─────────────────────────── -->
      <div v-else-if="variant === 'grid'" class="fs-grid">
        <component
          :is="feature.link ? 'NuxtLink' : 'div'"
          v-for="(feature, index) in features"
          :key="index"
          :to="feature.link || undefined"
          class="fs-card"
          :class="{ visible }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="fs-card-bg-icon" :style="{ color: feature.color }">
            <n-icon size="90">
              <component :is="feature.icon" />
            </n-icon>
          </div>
          <div class="fs-card-content">
            <div
              class="fs-card-accent"
              :style="{ background: feature.color }"
            ></div>
            <h3 class="fs-card-title">{{ feature.title }}</h3>
            <p class="fs-card-description">{{ feature.description }}</p>
          </div>
        </component>
      </div>

      <!-- ── Variant 2: Alternating showcase rows ─────────────── -->
      <div v-else class="fs-rows">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="fs-row"
          :class="{ visible, 'fs-row--reversed': index % 2 === 1 }"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <!-- Copy -->
          <div class="fs-row-copy">
            <div class="fs-row-icon" :style="{ color: feature.color }">
              <n-icon size="26">
                <component :is="feature.icon" />
              </n-icon>
            </div>
            <h3 class="fs-row-title">{{ feature.title }}</h3>
            <p class="fs-row-lead" v-if="feature.lead">{{ feature.lead }}</p>

            <ul class="fs-row-bullets">
              <li
                v-for="(bullet, bi) in featureBullets(feature)"
                :key="bi"
                class="fs-row-bullet"
              >
                <n-icon
                  size="20"
                  class="fs-row-check"
                  :style="{ color: feature.color }"
                >
                  <CheckmarkCircle />
                </n-icon>
                <span>{{ bullet }}</span>
              </li>
            </ul>

            <div
              v-if="feature.link || featureDemos(feature).length"
              class="fs-row-actions"
            >
              <a
                v-if="feature.link"
                :href="feature.link"
                target="_blank"
                rel="noopener noreferrer"
                class="fs-row-link"
              >
                Learn more
                <n-icon size="16"><ArrowForwardOutline /></n-icon>
              </a>
              <a
                v-for="(demo, di) in featureDemos(feature)"
                :key="di"
                :href="demo.href"
                target="_blank"
                rel="noopener noreferrer"
                class="fs-row-demo"
                :class="{ 'fs-row-demo--commercial': demo.commercial }"
              >
                {{ demo.label }}
                <n-icon size="16"><ArrowForwardOutline /></n-icon>
              </a>
            </div>
          </div>

          <!-- Visual -->
          <div class="fs-row-visual">
            <div
              class="fs-row-glow"
              :style="{ background: feature.color }"
              aria-hidden="true"
            ></div>
            <div class="fs-row-frame">
              <FeatureCarousel
                :images="featureImages(feature)"
                :alt="feature.title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckmarkCircle, ArrowForwardOutline } from "@vicons/ionicons5";

const props = defineProps({
  /**
   * "grid" (card grid) | "showcase" (alternating rows) |
   * "stack" (lx system: sticky cards that pile up while scrolling)
   */
  variant: {
    type: String,
    default: "grid",
    validator: (v) => ["grid", "showcase", "stack"].includes(v),
  },
  title: { type: String, default: "" },
  /** Part of `title` set in the italic accent (stack variant). */
  titleAccent: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  /** Eyebrow label and section number (stack variant). */
  eyebrow: { type: String, default: "" },
  index: { type: String, default: "" },
  sectionId: { type: String, default: "features" },
  features: { type: Array, required: true },
});

const titleParts = computed(() => {
  const at = props.titleAccent ? props.title.indexOf(props.titleAccent) : -1;
  if (at < 0) return { before: props.title, accent: "", after: "" };
  return {
    before: props.title.slice(0, at),
    accent: props.titleAccent,
    after: props.title.slice(at + props.titleAccent.length),
  };
});

const pad = (n) => String(n).padStart(2, "0");

const config = useRuntimeConfig();

const buildDemoHref = (demoLink) => {
  if (!demoLink) return "#";
  if (/^https?:\/\//i.test(demoLink)) return demoLink;
  const appUrl = config.public.appUrl || "https://app.photoreka.com";
  const normalizedPath = demoLink.startsWith("/") ? demoLink : `/${demoLink}`;
  return `${appUrl}${normalizedPath}`;
};

// Una feature puede exponer una demo (`demoLink`) o varias (`demoLinks`, con
// entradas `{ label, link, commercial }`). El caso de las dos es el catálogo
// comercial, que corre sobre /demo-commercial y no es una ruta dentro de /demo.
const featureDemos = (feature) => {
  if (Array.isArray(feature.demoLinks) && feature.demoLinks.length) {
    return feature.demoLinks
      .filter((demo) => demo && demo.link)
      .map((demo) => ({
        label: demo.label || "Try demo",
        href: buildDemoHref(demo.link),
        commercial: Boolean(demo.commercial),
      }));
  }
  return feature.demoLink
    ? [{ label: "Try demo", href: buildDemoHref(feature.demoLink) }]
    : [];
};

// Normalize a feature's imagery into an array for FeatureCarousel.
// Accepts `images` (array of srcs / { src, alt }) or a single `image` string.
// One entry → static image; more than one → auto-rotating carousel.
const featureImages = (feature) => {
  if (Array.isArray(feature.images) && feature.images.length) {
    return feature.images;
  }
  return feature.image ? [feature.image] : [];
};

// Build bullet list for the showcase variant. Prefer explicit `bullets`,
// otherwise fall back to splitting the description into sentences.
const featureBullets = (feature) => {
  if (Array.isArray(feature.bullets) && feature.bullets.length) {
    return feature.bullets;
  }
  return (feature.description || "")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
};

// ── Stack variant: covered cards recede ───────────────────────
// Each sticky card measures how far the next card has slid over it and
// writes that as --cover (0..1); CSS scales and darkens it accordingly.
// Written straight to the DOM so scrolling never triggers a re-render.
const stackRef = ref(null);
let stackFrame = 0;

const measureStack = () => {
  stackFrame = 0;
  const cards = stackRef.value?.querySelectorAll(".fs-stack-card");
  if (!cards?.length) return;
  const stacked = window.innerWidth >= 1024;
  cards.forEach((card, i) => {
    const inner = card.firstElementChild;
    const next = cards[i + 1];
    let cover = 0;
    if (stacked && next) {
      const rect = card.getBoundingClientRect();
      const nextTop = next.getBoundingClientRect().top;
      cover = (rect.top + rect.height - nextTop) / (rect.height * 0.9);
      cover = Math.max(0, Math.min(1, cover));
    }
    inner.style.setProperty("--cover", cover.toFixed(3));
  });
};

const onStackScroll = () => {
  if (!stackFrame) stackFrame = requestAnimationFrame(measureStack);
};

onMounted(() => {
  if (props.variant !== "stack") return;
  measureStack();
  window.addEventListener("scroll", onStackScroll, { passive: true });
  window.addEventListener("resize", onStackScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onStackScroll);
  window.removeEventListener("resize", onStackScroll);
  if (stackFrame) cancelAnimationFrame(stackFrame);
});

// ── Scroll-reveal animation ────────────────────────────────────
const sectionRef = ref(null);
const visible = ref(false);
let observer = null;

onMounted(() => {
  if (!sectionRef.value || props.variant === "stack") return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true;
          // La sección es muy alta en móvil (6 filas apiladas): un threshold
          // alto nunca se alcanzaría porque su 15% supera el viewport y las
          // filas se quedarían invisibles. Con threshold 0 basta con que
          // cualquier parte entre; desconectamos tras revelar.
          observer?.disconnect();
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -100px 0px" },
  );
  observer.observe(sectionRef.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ── Component-scoped tokens ────────────────────────────────────
   Local aliases → global landing tokens (global.scss / theme).
   Tweak spacing/scale here without touching individual rules. */
.features-showcase {
  --fs-section-pad-y: 4rem;
  --fs-section-pad-x: 2rem;
  --fs-container-max: 1200px;
  --fs-card-radius: 20px;
  --fs-gap: 1.5rem;
}

.features-showcase {
  padding: var(--fs-section-pad-y) var(--fs-section-pad-x);
  background: var(--premium-bg-primary);
}

.fs-container {
  max-width: var(--fs-container-max);
  margin: 0 auto;
}

/* ── Section header ─────────────────────────────────────────── */
.fs-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 3rem;
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.fs-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.fs-section-title {
  font-size: var(--landing-fs-title-promo, var(--fs-4xl));
  font-weight: var(--landing-fw-strong);
  line-height: var(--landing-lh-title);
  letter-spacing: var(--landing-ls-heading);
  color: var(--premium-text-primary);
  margin: 0 0 1rem;
}

.fs-section-subtitle {
  font-size: var(--landing-fs-body-lg);
  color: var(--premium-text-secondary);
  line-height: var(--landing-lh-body);
  margin: 0;
}

/* ══════════════════════════════════════════════════════════════
   VARIANT 1 — GRID OF CARDS
   ══════════════════════════════════════════════════════════════ */
.fs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--fs-gap);
}

.fs-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 200px;
  padding: 2rem;
  overflow: hidden;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-border);
  border-radius: var(--fs-card-radius);
  text-decoration: none;
  color: inherit;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fs-card.visible {
  opacity: 1;
  transform: translateY(0);
}

a.fs-card:hover {
  border-color: var(--premium-border-hover, var(--premium-primary));
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}

.fs-card-bg-icon {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.35;
  pointer-events: none;
  line-height: var(--line-height-tight);
}

.fs-card-content {
  position: relative;
  z-index: 1;
}

.fs-card-accent {
  width: 32px;
  height: 3px;
  border-radius: 2px;
  margin-bottom: 0.85rem;
  opacity: 0.85;
}

.fs-card-title {
  font-size: var(--landing-fs-title-card);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-normal);
  margin: 0 0 0.6rem;
  color: var(--premium-text-primary);
}

.fs-card-description {
  font-size: var(--landing-fs-sm);
  color: var(--premium-text-secondary);
  line-height: var(--landing-lh-body);
  margin: 0;
}

/* ══════════════════════════════════════════════════════════════
   VARIANT 2 — ALTERNATING SHOWCASE ROWS
   ══════════════════════════════════════════════════════════════ */
.fs-rows {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.fs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  opacity: 0;
  transform: translateY(36px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fs-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.fs-row--reversed .fs-row-copy {
  order: 2;
}

.fs-row--reversed .fs-row-visual {
  order: 1;
}

/* Copy column */
.fs-row-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fs-row-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
}

.fs-row-title {
  font-size: var(--fs-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--landing-ls-heading);
  color: var(--premium-text-primary);
  margin: 0;
}

.fs-row-lead {
  font-size: var(--landing-fs-body-lg);
  color: var(--premium-text-secondary);
  line-height: var(--landing-lh-body);
  margin: 0;
}

.fs-row-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
}

.fs-row-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: var(--landing-fs-body);
  line-height: var(--line-height-relaxed);
  color: var(--premium-text-primary);
}

.fs-row-check {
  flex-shrink: 0;
  margin-top: 2px;
}

.fs-row-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--landing-fs-body);
  font-weight: var(--font-weight-semibold);
  color: var(--premium-primary);
  text-decoration: none;
}

.fs-row-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.fs-row-demo {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--premium-primary) 45%, transparent);
  color: var(--premium-text-primary);
  font-size: var(--landing-fs-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}

/* Variante comercial: el mismo botón en el acento cálido de
   /commercial_photography, para que se lea como otra rama y no como un
   duplicado del anterior. */
.fs-row-demo--commercial {
  border-color: rgba(245, 158, 11, 0.5);
  background: rgba(245, 158, 11, 0.08);
}

.fs-row-demo--commercial:hover {
  border-color: rgba(245, 158, 11, 0.8);
  background: rgba(245, 158, 11, 0.14);
}

/* Visual column */
.fs-row-visual {
  position: relative;
}

.fs-row-glow {
  position: absolute;
  inset: 12% 12%;
  filter: blur(70px);
  opacity: 0.22;
  border-radius: 50%;
  pointer-events: none;
}

.fs-row-frame {
  position: relative;
  border-radius: var(--fs-card-radius);
  overflow: hidden;
  background: var(--premium-bg-card);
  border: 1px solid var(--premium-shot-border);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.28),
    0 0 120px 8px var(--premium-shot-glow);
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

a.fs-row:hover .fs-row-frame {
  transform: translateY(-6px);
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.34),
    0 0 130px 10px var(--premium-shot-glow);
}

/* ══════════════════════════════════════════════════════════════
   VARIANT 3 — STICKY STACK (lx landing system)
   Cards stick under the nav with a small step, so the previous ones peek
   out above like a deck; --cover (set in JS) recedes the covered card.
   ══════════════════════════════════════════════════════════════ */
.features-showcase--stack {
  padding: var(--lx-section-y) 0;
  background: transparent;
  scroll-margin-top: 40px;
}

.fs-stack {
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 7vh, 72px);
}

.fs-stack-card {
  position: sticky;
  top: calc(var(--lx-nav-offset) + var(--i) * 14px);
}

.fs-stack-inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(32px, 4.5vw, 72px);
  align-items: center;
  min-height: min(620px, calc(100vh - var(--lx-nav-offset) - 130px));
  padding: clamp(28px, 3.6vw, 52px);
  border-radius: 32px;
  background: var(--lx-surface);
  border: 1px solid var(--lx-line-2);
  box-shadow: var(--lx-shadow-lg), var(--lx-highlight);
  overflow: hidden;
  transform-origin: 50% 0%;
  transform: scale(calc(1 - var(--cover, 0) * 0.05));
}

.fs-stack-shade {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  border-radius: inherit;
  background: var(--lx-bg);
  opacity: calc(var(--cover, 0) * 0.62);
}

.fs-stack-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.fs-stack-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fs-stack-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 26%, transparent);
}

.fs-stack-count {
  font-family: var(--lx-font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text);
}

.fs-stack-count span {
  color: var(--lx-text-3);
}

.fs-stack-title {
  margin: 0.4rem 0 0;
  font-family: var(--lx-font-display);
  font-size: var(--lx-fs-h3);
  font-weight: 360;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--lx-text);
}

.fs-stack-lead {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.fs-stack-bullets {
  margin-top: 0.2rem;
}

.fs-stack-bullets > li {
  font-size: 0.95rem;
  padding: 0.8rem 0;
}

.fs-stack-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.1rem;
  margin-top: 0.4rem;
}

.fs-stack-visual {
  position: relative;
  z-index: 1;
}

.fs-stack-glow {
  position: absolute;
  inset: 8% 4%;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.2;
  pointer-events: none;
}

.fs-stack-visual :deep(.feat-carousel) {
  aspect-ratio: auto;
  height: 100%;
  background: transparent;
}

@media (max-width: 1023px) {
  .fs-stack-card {
    position: relative;
    top: auto;
  }

  .fs-stack-inner {
    grid-template-columns: 1fr;
    min-height: 0;
    transform: none;
  }

  .fs-stack-shade {
    display: none;
  }
}

@media (max-width: 600px) {
  .fs-stack-inner {
    padding: 20px;
    gap: 28px;
    border-radius: 24px;
  }
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .fs-row,
  .fs-row--reversed {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* Image always below copy on mobile for consistent rhythm */
  .fs-row-copy,
  .fs-row--reversed .fs-row-copy {
    order: 1;
  }

  .fs-row-visual,
  .fs-row--reversed .fs-row-visual {
    order: 2;
  }

  .fs-rows {
    gap: 3.5rem;
  }
}

@media (max-width: 600px) {
  .features-showcase {
    --fs-section-pad-x: 1.25rem;
  }

  .fs-header {
    margin-bottom: 2.25rem;
  }

  .fs-row-title {
    font-size: var(--fs-2xl);
  }

  .fs-section-title {
    font-size: var(--landing-fs-title-promo-mobile, var(--fs-3xl));
  }
}
</style>
