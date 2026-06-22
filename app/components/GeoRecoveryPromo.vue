<template>
  <section class="grp-section" ref="sectionRef">
    <!-- Subtle radial glow -->
    <div class="grp-bg-glow" aria-hidden="true"></div>

    <div class="grp-container">
      <div class="grp-inner" :class="{ visible: sectionVisible }">
        <!-- ── Left: promo copy ─────────────────────────────── -->
        <div class="grp-left">
          <div class="grp-badge">
            <n-icon size="16"><LocationOutline /></n-icon>
            <span>Geo Recovery</span>
          </div>

          <h2 class="grp-title">
            Add GPS to your photos.
            <span class="grp-gradient">No account needed.</span>
          </h2>

          <p class="grp-desc">
            Upload a batch of photos lacking GPS data, let AI identify where
            each shot was taken, review every pin on an interactive map, and
            download your originals with GPS coordinates embedded directly in
            EXIF. One-time payment — no subscription, no sign-up, no strings
            attached.
          </p>

          <div class="grp-features">
            <div class="grp-feature">
              <n-icon size="20" color="#22c55e"
                ><CheckmarkCircleOutline
              /></n-icon>
              <span>One-time flat payment per batch</span>
            </div>
            <div class="grp-feature">
              <n-icon size="20" color="#22c55e"
                ><CheckmarkCircleOutline
              /></n-icon>
              <span>Originals never leave your browser</span>
            </div>
            <div class="grp-feature">
              <n-icon size="20" color="#22c55e"
                ><CheckmarkCircleOutline
              /></n-icon>
              <span>GPS coordinates embedded in EXIF on download</span>
            </div>
            <div class="grp-feature">
              <n-icon size="20" color="#22c55e"
                ><CheckmarkCircleOutline
              /></n-icon>
              <span>No account or subscription required</span>
            </div>
          </div>

          <div class="grp-actions">
            <n-button
              type="success"
              size="large"
              strong
              @click="goToGeoRecovery"
            >
              <template #icon>
                <n-icon><LocationOutline /></n-icon>
              </template>
              Try Geo Recovery Free
            </n-button>
            <span class="grp-note">No registration required</span>
          </div>
        </div>

        <!-- ── Right: slideshow + mini info ─────────────────── -->
        <div class="grp-right">
          <!-- Slideshow -->
          <div class="grp-slideshow">
            <div
              v-for="(img, i) in slideshowImages"
              :key="i"
              class="grp-slide"
              :class="{ active: currentSlide === i }"
              :style="{
                backgroundImage: `url(${img.src})`,
                transform: slideTransforms[i],
              }"
              role="img"
              :aria-label="img.alt"
            ></div>
            <div class="grp-slideshow-overlay" aria-hidden="true"></div>
            <div class="grp-dots" aria-hidden="true">
              <span
                v-for="(_, i) in slideshowImages"
                :key="i"
                class="grp-dot"
                :class="{ active: currentSlide === i }"
                @click="jumpToSlide(i)"
              ></span>
            </div>
          </div>

          <!-- Mini info cards -->
          <div class="grp-mini-info">
            <div class="grp-mini-item">
              <div class="grp-mini-icon">
                <n-icon size="18" color="#22c55e"
                  ><ShieldCheckmarkOutline
                /></n-icon>
              </div>
              <div class="grp-mini-text">
                <strong>Your originals stay private</strong>
                <p>
                  Only lightweight thumbnails are sent for AI analysis.
                  Full-resolution files never leave your device.
                </p>
              </div>
            </div>

            <div class="grp-mini-item">
              <div class="grp-mini-icon">
                <n-icon size="18" color="#06b6d4"><GlobeOutline /></n-icon>
              </div>
              <div class="grp-mini-text">
                <strong>AI reads visual context</strong>
                <p>
                  Architecture, signage, landscape and lighting cues identify
                  location to city or district precision.
                </p>
              </div>
            </div>

            <div class="grp-mini-item">
              <div class="grp-mini-icon">
                <n-icon size="18" color="#f59e0b"><DownloadOutline /></n-icon>
              </div>
              <div class="grp-mini-text">
                <strong>Map, review, then download</strong>
                <p>
                  Correct any marker manually before exporting. Your corrections
                  always override the AI result.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick } from "vue";
import {
  LocationOutline,
  CheckmarkCircleOutline,
  ShieldCheckmarkOutline,
  GlobeOutline,
  DownloadOutline,
} from "@vicons/ionicons5";

// ── Slideshow ──────────────────────────────────────────────────
const slideshowImages = [
  { src: "/ai_geoinference/1.png", alt: "Geo Recovery – upload photos" },
  { src: "/ai_geoinference/2.png", alt: "Geo Recovery – AI processing" },
  { src: "/ai_geoinference/3.png", alt: "Geo Recovery – map review" },
  { src: "/ai_geoinference/4.png", alt: "Geo Recovery – results with GPS" },
  { src: "/ai_geoinference/5.png", alt: "Geo Recovery – download with EXIF" },
];

const currentSlide = ref(0);
const slideTransforms = ref(slideshowImages.map(() => "scale(1.0)"));
let slideshowTimer = null;

const activateSlide = (idx) => {
  slideTransforms.value[idx] = "scale(1.0)";
  nextTick(() => {
    slideTransforms.value[idx] = "scale(1.1)";
  });
};

const deactivateSlide = (idx) => {
  setTimeout(() => {
    slideTransforms.value[idx] = "scale(1.0)";
  }, 1100);
};

const jumpToSlide = (idx) => {
  if (idx === currentSlide.value) return;
  deactivateSlide(currentSlide.value);
  currentSlide.value = idx;
  activateSlide(idx);
  // restart auto-play timer
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    startSlideshow();
  }
};

const startSlideshow = () => {
  slideshowTimer = setInterval(() => {
    const prev = currentSlide.value;
    const next = (prev + 1) % slideshowImages.length;
    deactivateSlide(prev);
    currentSlide.value = next;
    activateSlide(next);
  }, 3333);
};

// ── Scroll animation ──────────────────────────────────────────
const sectionRef = ref(null);
const sectionVisible = ref(false);

// ── Navigation ────────────────────────────────────────────────
const goToGeoRecovery = () => {
  navigateTo("/ai_geo_recovery");
};

// ── Lifecycle ─────────────────────────────────────────────────
onMounted(() => {
  activateSlide(0);
  startSlideshow();

  if (sectionRef.value) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) sectionVisible.value = true;
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    ).observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
});
</script>

<style scoped>
/* ── Section shell ─────────────────────────────────────────── */
.grp-section {
  position: relative;
  overflow: hidden;
  background: var(--premium-bg-primary);
  padding: 5rem 2rem;
}

.grp-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 50%,
    rgba(34, 197, 94, 0.07),
    transparent 70%
  );
  pointer-events: none;
}

.grp-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Animated wrapper ────────────────────────────────────────── */
.grp-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
  padding: 3rem;
  background: var(--premium-bg-card);
  border: 2px solid rgba(34, 197, 94, 0.25);
  border-radius: 24px;
  box-shadow:
    0 0 0 1px rgba(34, 197, 94, 0.08),
    0 24px 48px -12px rgba(34, 197, 94, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(36px);
  transition: all 0.85s cubic-bezier(0.4, 0, 0.2, 1);
}

.grp-inner.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Left column ─────────────────────────────────────────────── */
.grp-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grp-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #22c55e;
  width: fit-content;
}

.grp-title {
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  font-weight: 800;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.grp-gradient {
  background: linear-gradient(135deg, #22c55e, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grp-desc {
  font-size: 1rem;
  color: var(--premium-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.grp-features {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.grp-feature {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.grp-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.grp-note {
  font-size: 0.85rem;
  color: var(--premium-text-secondary);
  font-style: italic;
}

/* ── Right column ────────────────────────────────────────────── */
.grp-right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Slideshow ───────────────────────────────────────────────── */
.grp-slideshow {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  overflow: hidden;
  background: var(--premium-bg-secondary);
  box-shadow:
    0 0 0 1px rgba(34, 197, 94, 0.15),
    0 12px 32px rgba(0, 0, 0, 0.35);
}

.grp-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1);
  transition:
    opacity 0.93s ease,
    transform 3.5s ease;
}

.grp-slide.active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .grp-slide {
    transition: opacity 0.93s ease;
  }
}

.grp-slideshow-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 55%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
}

.grp-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.grp-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.grp-dot.active {
  background: #22c55e;
  transform: scale(1.3);
}

/* ── Mini info cards ─────────────────────────────────────────── */
.grp-mini-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.grp-mini-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.85rem 1rem;
  background: rgba(34, 197, 94, 0.04);
  border: 1px solid rgba(34, 197, 94, 0.12);
  border-radius: 10px;
  transition: border-color 0.2s ease;
}

.grp-mini-item:hover {
  border-color: rgba(34, 197, 94, 0.28);
}

.grp-mini-icon {
  margin-top: 2px;
  flex-shrink: 0;
}

.grp-mini-text {
  flex: 1;
}

.grp-mini-text strong {
  font-size: 0.9rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.2rem;
}

.grp-mini-text p {
  font-size: 0.83rem;
  color: var(--premium-text-secondary);
  line-height: 1.55;
  margin: 0;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .grp-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2rem;
  }
}

@media (max-width: 600px) {
  .grp-section {
    padding: 3.5rem 1.25rem;
  }

  .grp-inner {
    padding: 1.5rem;
    border-radius: 18px;
  }

  .grp-title {
    font-size: 1.6rem;
  }

  .grp-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
