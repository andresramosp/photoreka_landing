<template>
  <section :id="sectionId" ref="rootRef" class="lx-section ts">
    <div class="lx-container">
      <SectionIntro :eyebrow="eyebrow" :lead="subtitle" align="center">
        <template #title>
          {{ titleParts.before
          }}<em v-if="titleParts.accent" class="lx-accent">{{
            titleParts.accent
          }}</em
          >{{ titleParts.after }}
        </template>
      </SectionIntro>

      <div class="ts-body">
        <!-- One step per tool; scrolling past a step makes it the active one. -->
        <div class="ts-steps">
          <article
            v-for="(tool, i) in tools"
            :key="i"
            ref="stepRefs"
            class="ts-step"
            :class="{ 'ts-step--active': active === i }"
          >
            <p class="ts-step__meta">
              <span class="ts-step__num">{{ pad(i + 1) }}</span>
              <span class="ts-step__rule" aria-hidden="true" />
              <span>{{ tool.group }}</span>
            </p>

            <h3 class="ts-step__name">
              <span class="ts-step__icon" :style="{ color: tool.color }">
                <n-icon size="18"><component :is="tool.icon" /></n-icon>
              </span>
              {{ tool.title }}
            </h3>

            <div class="ts-step__visual">
              <ShotFrame
                :label="tool.title"
                ratio="16 / 10"
                fit="cover"
                :focus="tool.videoFocus || '50% 50%'"
              >
                <video
                  v-if="tool.video"
                  :data-tool="i"
                  :src="tool.video"
                  :poster="tool.image || undefined"
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  :aria-label="tool.title"
                />
                <FeatureCarousel
                  v-else
                  :images="toolImages(tool)"
                  :alt="tool.title"
                  fit="contain"
                />
              </ShotFrame>
            </div>

            <p v-if="tool.panelTitle" class="ts-step__tagline">
              {{ panelTitleParts(tool).before
              }}<em v-if="panelTitleParts(tool).accent" class="lx-accent">{{
                panelTitleParts(tool).accent
              }}</em
              >{{ panelTitleParts(tool).after }}
            </p>
            <p v-if="tool.lead" class="ts-step__lead">{{ tool.lead }}</p>
            <!-- eslint-disable-next-line vue/no-v-html -- static copy from this repo -->
            <p v-if="tool.panelHtml" class="ts-step__text" v-html="tool.panelHtml" />
            <ul v-if="tool.bullets?.length" class="lx-list ts-step__bullets">
              <li v-for="(bullet, bi) in tool.bullets" :key="bi">
                <span class="lx-tick" aria-hidden="true" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
            <div class="ts-step__actions">
              <LxButton
                v-for="(demo, di) in toolDemos(tool)"
                :key="di"
                size="sm"
                :variant="demo.commercial ? 'warm' : 'ghost'"
                icon="external"
                :href="demo.href"
                target="_blank"
                @click="demo.event && trackUserAction(demo.event, 'landing_page_premium')"
                >{{ demo.label }}</LxButton
              >
              <a
                v-if="tool.link"
                :href="tool.link"
                target="_blank"
                rel="noopener noreferrer"
                class="lx-link"
              >
                Learn more
                <n-icon size="15"><ArrowForwardOutline /></n-icon>
              </a>
            </div>
          </article>
        </div>

        <!-- Desktop stage: stays pinned while the steps scroll past it. -->
        <div class="ts-stage">
          <nav class="ts-rail" aria-label="AI tools">
            <div v-for="group in groupedTools" :key="group.name" class="ts-rail__group">
              <button
                v-for="tool in group.tools"
                :key="tool.index"
                type="button"
                class="ts-rail__btn"
                :class="{ 'ts-rail__btn--active': active === tool.index }"
                :style="{ color: tool.color }"
                :title="tool.title"
                :aria-label="tool.title"
                :aria-current="active === tool.index ? 'step' : undefined"
                @click="goTo(tool.index)"
              >
                <n-icon size="17"><component :is="tool.icon" /></n-icon>
              </button>
            </div>
            <span class="ts-rail__count">
              <strong>{{ pad(active + 1) }}</strong> / {{ pad(tools.length) }}
            </span>
          </nav>
          <div class="ts-rail__progress" aria-hidden="true">
            <span :style="{ transform: `scaleX(${(active + 1) / tools.length})` }" />
          </div>

          <div ref="framesRef" class="ts-frames" aria-hidden="true">
            <div
              v-for="(tool, i) in tools"
              :key="i"
              class="ts-frame"
              :class="{ 'ts-frame--active': active === i }"
            >
              <div class="ts-frame__glow" :style="{ background: tool.color }" />
              <ShotFrame
                :label="tool.title"
                ratio="16 / 10"
                fit="cover"
                :focus="tool.videoFocus || '50% 50%'"
              >
                <video
                  v-if="tool.video"
                  :data-tool="i"
                  :src="tool.video"
                  :poster="tool.image || undefined"
                  muted
                  loop
                  playsinline
                  preload="metadata"
                />
                <FeatureCarousel
                  v-else
                  :images="toolImages(tool)"
                  :alt="tool.title"
                  fit="contain"
                />
              </ShotFrame>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowForwardOutline } from "@vicons/ionicons5";
import { trackUserAction } from "~/utils/analytics";

const props = defineProps({
  sectionId: { type: String, default: "features" },
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "" },
  /** Part of `title` set in the italic accent. */
  titleAccent: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  /** Group names in display order; each tool names its `group`. */
  groups: { type: Array, default: () => [] },
  /** Same tool shape as ToolExplorer. */
  tools: { type: Array, required: true },
});

const splitAccent = (text, accent) => {
  const at = accent ? text.indexOf(accent) : -1;
  if (at < 0) return { before: text, accent: "", after: "" };
  return {
    before: text.slice(0, at),
    accent,
    after: text.slice(at + accent.length),
  };
};

const titleParts = computed(() => splitAccent(props.title, props.titleAccent));
const panelTitleParts = (tool) =>
  splitAccent(tool.panelTitle, tool.panelTitleAccent);

const pad = (n) => String(n).padStart(2, "0");

const groupedTools = computed(() => {
  const indexed = props.tools.map((tool, index) => ({ ...tool, index }));
  if (!props.groups.length) return [{ name: "", tools: indexed }];
  return props.groups.map((name) => ({
    name,
    tools: indexed.filter((tool) => tool.group === name),
  }));
});

const active = ref(0);
const rootRef = ref(null);
const stepRefs = ref([]);
const onScreen = ref(false);
let screenObserver = null;
let frame = 0;

const framesRef = ref(null);

// Viewport y of the pinned capture's centre; steps line up their centre with
// it. On phones the stage is hidden, so the viewport middle is used.
const focusLine = () => {
  const frames = framesRef.value;
  if (!frames?.offsetHeight) return window.innerHeight * 0.5;
  const navOffset =
    parseFloat(getComputedStyle(rootRef.value).getPropertyValue("--lx-nav-offset")) || 0;
  return navOffset + frames.offsetTop + frames.offsetHeight / 2;
};

const updateActive = () => {
  frame = 0;
  const line = focusLine();
  let next = 0;
  let best = Infinity;
  stepRefs.value.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - line);
    if (d < best) {
      best = d;
      next = i;
    }
  });
  active.value = next;
};

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(updateActive);
};

// Only the active tool's video plays, and only while the section is on
// screen and its frame is rendered (stage on desktop, step on phones).
const syncVideos = (restart = false) => {
  rootRef.value?.querySelectorAll("video[data-tool]").forEach((video) => {
    const shouldPlay =
      onScreen.value &&
      Number(video.dataset.tool) === active.value &&
      video.offsetParent !== null;
    if (shouldPlay) {
      if (restart) video.currentTime = 0;
      video.play?.().catch(() => {});
    } else {
      video.pause?.();
    }
  });
};

watch(active, () => syncVideos(true));
watch(onScreen, () => syncVideos());

const onResize = () => {
  onScroll();
  syncVideos();
};

onMounted(() => {
  screenObserver = new IntersectionObserver(
    ([entry]) => (onScreen.value = entry.isIntersecting),
    { threshold: 0.05 },
  );
  screenObserver.observe(rootRef.value);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  updateActive();
});

onBeforeUnmount(() => {
  screenObserver?.disconnect();
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  if (frame) cancelAnimationFrame(frame);
});

const { scrollTo } = useSmoothScroll();

const goTo = (index) => {
  const el = stepRefs.value[index];
  if (!el) return;
  scrollTo(el, -(focusLine() - el.offsetHeight / 2));
  trackUserAction(
    "select_tool",
    "landing_page_premium",
    props.tools[index]?.title,
  );
};

const config = useRuntimeConfig();
const buildDemoHref = (link) => {
  if (/^https?:\/\//i.test(link)) return link;
  const appUrl = config.public.appUrl || "https://app.photoreka.com";
  return `${appUrl}${link.startsWith("/") ? link : `/${link}`}`;
};

const toolDemos = (tool) =>
  (tool.demoLinks || [])
    .filter((demo) => demo?.link)
    .map((demo) => ({
      label: demo.label || "Try demo",
      href: buildDemoHref(demo.link),
      commercial: Boolean(demo.commercial),
      event: demo.event || "",
    }));

const toolImages = (tool) =>
  Array.isArray(tool.images) && tool.images.length
    ? tool.images
    : tool.image
      ? [tool.image]
      : [];
</script>

<style scoped>
.ts-body {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(32px, 4.5vw, 72px);
}

/* ── Steps ───────────────────────────────────────────────── */
/* Lets the first and last steps centre on the capture while the stage is
   still pinned: (100vh - nav - step height) / 2, shifted by the rail above
   the frame. */
.ts-steps {
  padding-top: calc(18vh - 10px);
  padding-bottom: max(0px, calc(18vh - 86px));
}

.ts-step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  min-height: 64vh;
  padding-block: 2.5rem;
  opacity: 0.28;
  transition: opacity 0.5s var(--lx-ease);
}

.ts-step--active {
  opacity: 1;
}

.ts-step__meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.ts-step__num {
  color: var(--lx-text);
  font-variant-numeric: tabular-nums;
}

.ts-step__rule {
  width: 22px;
  height: 1px;
  background: var(--lx-line-3);
}

.ts-step__name {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-family: var(--lx-font-display);
  font-size: clamp(1.7rem, 2.4vw, 2.2rem);
  font-weight: 360;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--lx-text);
}

.ts-step__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 26%, transparent);
}

.ts-step__visual {
  display: none;
}

.ts-step__tagline {
  font-family: var(--lx-font-display);
  font-size: 1.25rem;
  font-weight: 360;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--lx-text);
}

.ts-step__lead,
.ts-step__text {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.ts-step__text :deep(strong) {
  color: var(--lx-text);
  font-weight: 600;
}

.ts-step__bullets > li {
  font-size: 0.88rem;
  padding: 0.6rem 0;
}

.ts-step__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.1rem;
  margin-top: 0.3rem;
}

/* ── Stage (desktop) ─────────────────────────────────────── */
.ts-stage {
  position: sticky;
  top: var(--lx-nav-offset);
  align-self: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.9rem;
  height: calc(100vh - var(--lx-nav-offset));
}

.ts-rail {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.ts-rail__group {
  display: flex;
  gap: 0.35rem;
}

.ts-rail__group + .ts-rail__group {
  padding-left: 1.1rem;
  border-left: 1px solid var(--lx-line-2);
}

.ts-rail__btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--lx-line-2);
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.45;
  transition:
    opacity 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s var(--lx-ease);
}

.ts-rail__btn:hover {
  opacity: 0.85;
}

.ts-rail__btn--active {
  opacity: 1;
  background: color-mix(in srgb, currentColor 14%, transparent);
  border-color: color-mix(in srgb, currentColor 45%, transparent);
  transform: translateY(-1px);
}

.ts-rail__btn:focus-visible {
  outline: 2px solid var(--lx-accent);
  outline-offset: 2px;
}

.ts-rail__count {
  margin-left: auto;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text-3);
}

.ts-rail__count strong {
  color: var(--lx-text);
  font-weight: 600;
}

.ts-rail__progress {
  height: 2px;
  border-radius: 2px;
  background: var(--lx-line);
  overflow: hidden;
}

.ts-rail__progress span {
  display: block;
  height: 100%;
  background: var(--lx-accent-grad);
  transform-origin: left;
  transition: transform 0.6s var(--lx-ease);
}

.ts-frames {
  display: grid;
  margin-top: 0.6rem;
}

.ts-frame {
  position: relative;
  grid-area: 1 / 1;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(0, 14px, 0) scale(0.985);
  transition:
    opacity 0.5s var(--lx-ease),
    transform 0.6s var(--lx-ease),
    visibility 0s linear 0.5s;
}

.ts-frame--active {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition:
    opacity 0.5s var(--lx-ease),
    transform 0.6s var(--lx-ease),
    visibility 0s;
}

.ts-frame__glow {
  position: absolute;
  inset: 10% 6%;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.2;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ts-step,
  .ts-frame,
  .ts-rail__progress span {
    transition: none;
  }
}

/* ── Phones and tablets: every tool stacked, capture above the copy ─ */
@media (max-width: 1023px) {
  .ts-body {
    grid-template-columns: 1fr;
  }

  .ts-stage {
    display: none;
  }

  .ts-steps {
    padding-block: 0;
  }

  .ts-step {
    min-height: 0;
    padding-block: 2.2rem;
    border-top: 1px solid var(--lx-line);
    opacity: 1;
  }

  .ts-step__visual {
    display: block;
    margin-block: 0.4rem;
  }
}
</style>
