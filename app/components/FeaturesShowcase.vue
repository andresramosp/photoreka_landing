<template>
  <section
    :id="sectionId"
    class="features-showcase"
    :class="`features-showcase--${variant}`"
    ref="sectionRef"
  >
    <div class="fs-container">
      <!-- Section header -->
      <div v-if="title || subtitle" class="fs-header" :class="{ visible }">
        <h2 v-if="title" class="fs-section-title">{{ title }}</h2>
        <p v-if="subtitle" class="fs-section-subtitle">{{ subtitle }}</p>
      </div>

      <!-- ── Variant 1: Grid of cards ─────────────────────────── -->
      <div v-if="variant === 'grid'" class="fs-grid">
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
        <component
          :is="feature.link ? 'a' : 'div'"
          v-for="(feature, index) in features"
          :key="index"
          :href="feature.link || undefined"
          :target="feature.link ? '_blank' : undefined"
          :rel="feature.link ? 'noopener noreferrer' : undefined"
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

            <span v-if="feature.link" class="fs-row-link">
              Learn more
              <n-icon size="16"><ArrowForwardOutline /></n-icon>
            </span>
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
        </component>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckmarkCircle, ArrowForwardOutline } from "@vicons/ionicons5";

const props = defineProps({
  /** "grid" (current card layout) | "showcase" (alternating rows) */
  variant: {
    type: String,
    default: "grid",
    validator: (v) => ["grid", "showcase"].includes(v),
  },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  sectionId: { type: String, default: "features" },
  features: { type: Array, required: true },
});

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

// ── Scroll-reveal animation ────────────────────────────────────
const sectionRef = ref(null);
const visible = ref(false);
let observer = null;

onMounted(() => {
  if (!sectionRef.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.value = true;
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -100px 0px" },
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
  margin-top: 0.5rem;
  font-size: var(--landing-fs-body);
  font-weight: var(--font-weight-semibold);
  color: var(--premium-primary);
  transition: gap 0.25s ease;
}

.fs-row:hover .fs-row-link {
  gap: 0.65rem;
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
