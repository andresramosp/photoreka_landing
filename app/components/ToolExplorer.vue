<template>
  <section :id="sectionId" ref="rootRef" class="lx-section tx">
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

      <div v-reveal class="tx-body">
        <!-- Every panel stays in the DOM so all the copy is indexable. -->
        <div class="tx-list">
          <div v-for="group in groupedTools" :key="group.name" class="tx-group">
            <p v-if="group.name" class="tx-group__name">{{ group.name }}</p>
            <div
              v-for="tool in group.tools"
              :key="tool.index"
              class="tx-item"
              :class="{ 'tx-item--active': active === tool.index }"
            >
              <button
                :id="`tx-tab-${tool.index}`"
                type="button"
                class="tx-item__head"
                :aria-expanded="active === tool.index"
                :aria-controls="`tx-panel-${tool.index}`"
                @click="select(tool.index)"
              >
                <span class="tx-item__icon" :style="{ color: tool.color }">
                  <n-icon size="18"><component :is="tool.icon" /></n-icon>
                </span>
                <span class="tx-item__name">{{ tool.title }}</span>
                <n-icon size="16" class="tx-item__chevron">
                  <ChevronDownOutline />
                </n-icon>
              </button>

              <!-- Collapsed panels animate their height to 0 (grid 0fr → 1fr)
                   and are inert, so hidden links are not focusable. -->
              <div
                :id="`tx-panel-${tool.index}`"
                class="tx-item__collapse"
                role="region"
                :aria-labelledby="`tx-tab-${tool.index}`"
                :inert="active !== tool.index"
              >
                <div class="tx-item__panel">
                  <div class="tx-item__visual">
                    <ShotFrame
                      :label="tool.title"
                      ratio="16 / 10"
                      fit="cover"
                      :focus="tool.videoFocus || '50% 50%'"
                    >
                      <video
                        v-if="tool.video"
                        :data-tool="tool.index"
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

                  <h3 v-if="tool.panelTitle" class="tx-item__title">
                    {{ panelTitleParts(tool).before
                    }}<em v-if="panelTitleParts(tool).accent" class="lx-accent">{{
                      panelTitleParts(tool).accent
                    }}</em
                    >{{ panelTitleParts(tool).after }}
                  </h3>
                  <p v-if="tool.lead" class="tx-item__lead">{{ tool.lead }}</p>
                  <!-- eslint-disable-next-line vue/no-v-html -- static copy from this repo -->
                  <p v-if="tool.panelHtml" class="tx-item__text" v-html="tool.panelHtml" />
                  <ul v-if="tool.bullets?.length" class="lx-list tx-item__bullets">
                    <li v-for="(bullet, bi) in tool.bullets" :key="bi">
                      <span class="lx-tick" aria-hidden="true" />
                      <span>{{ bullet }}</span>
                    </li>
                  </ul>
                  <div class="tx-item__actions">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop stage: the active tool's capture, crossfading. -->
        <div class="tx-stage" aria-hidden="true">
          <div
            v-for="(tool, i) in tools"
            :key="i"
            class="tx-stage__slide"
            :class="{ 'tx-stage__slide--active': active === i }"
          >
            <div class="tx-stage__glow" :style="{ background: tool.color }" />
            <!-- Same 16:10 frame for videos and captures; a video fills it
                 (cover) instead of leaving bands. -->
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
  </section>
</template>

<script setup>
import { ArrowForwardOutline, ChevronDownOutline } from "@vicons/ionicons5";
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
  /**
   * { title, group, icon, color, image | images, panelTitle?,
   *   video? (plays in the frame; `image` is its poster),
 *   videoFocus? (object-position when the video is cropped to 16:10),
 *   panelTitleAccent?, lead?, panelHtml?, bullets?, link?,
   *   demoLinks?: [{ label, link, commercial?, event? }] }
   */
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

const groupedTools = computed(() => {
  const indexed = props.tools.map((tool, index) => ({ ...tool, index }));
  if (!props.groups.length) return [{ name: "", tools: indexed }];
  return props.groups.map((name) => ({
    name,
    tools: indexed.filter((tool) => tool.group === name),
  }));
});

const active = ref(0);

// A tool video plays only while its tool is open, the section is on screen
// and its frame is rendered (stage on desktop, panel on phones); opening the
// tool restarts it so the payoff is always seen.
const rootRef = ref(null);
const onScreen = ref(false);
let screenObserver = null;

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

const onResize = () => syncVideos();

onMounted(() => {
  screenObserver = new IntersectionObserver(
    ([entry]) => (onScreen.value = entry.isIntersecting),
    { threshold: 0.1 },
  );
  screenObserver.observe(rootRef.value);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  screenObserver?.disconnect();
  window.removeEventListener("resize", onResize);
});

const select = (index) => {
  active.value = index;
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
.tx-body {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  gap: clamp(32px, 4.5vw, 72px);
  align-items: start;
}

/* ── List ─────────────────────────────────────────────────── */
.tx-list {
  display: grid;
  gap: 1.6rem;
}

.tx-group__name {
  margin-bottom: 0.4rem;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.tx-item {
  border-bottom: 1px solid var(--lx-line);
}

.tx-group .tx-item:first-of-type {
  border-top: 1px solid var(--lx-line);
}

.tx-item__head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  padding: 0.8rem 0;
  border: 0;
  background: none;
  color: var(--lx-text-2);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: color 0.3s ease;
}

.tx-item__head:hover,
.tx-item--active .tx-item__head {
  color: var(--lx-text);
}

.tx-item__head:focus-visible {
  outline: 2px solid var(--lx-accent);
  outline-offset: 2px;
  border-radius: 6px;
}

.tx-item__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 12%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 26%, transparent);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.tx-item--active .tx-item__icon {
  opacity: 1;
}

.tx-item__name {
  flex: 1;
  font-family: var(--lx-font-display);
  font-size: 1.3rem;
  font-weight: 380;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.tx-item__chevron {
  color: var(--lx-text-3);
  transition: transform 0.3s var(--lx-ease);
}

.tx-item--active .tx-item__chevron {
  transform: rotate(180deg);
}

/* ── Panel (copy of the open tool) ───────────────────────── */
.tx-item__collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.6s var(--lx-ease);
}

.tx-item--active .tx-item__collapse {
  grid-template-rows: 1fr;
}

.tx-item__panel {
  display: grid;
  gap: 1rem;
  min-height: 0;
  overflow: hidden;
  padding: 0 0 0 calc(34px + 0.85rem);
  opacity: 0;
  transform: translate3d(0, -8px, 0);
  transition:
    opacity 0.3s ease,
    transform 0.5s var(--lx-ease),
    padding 0.6s var(--lx-ease);
}

.tx-item--active .tx-item__panel {
  padding-top: 0.2rem;
  padding-bottom: 1.4rem;
  opacity: 1;
  transform: none;
  transition:
    opacity 0.5s ease 0.15s,
    transform 0.6s var(--lx-ease) 0.1s,
    padding 0.6s var(--lx-ease);
}

@media (prefers-reduced-motion: reduce) {
  .tx-item__collapse,
  .tx-item__panel {
    transition: none;
  }
}

.tx-item__visual {
  display: none;
}

.tx-item__title {
  font-family: var(--lx-font-display);
  font-size: 1.6rem;
  font-weight: 360;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--lx-text);
}

.tx-item__lead,
.tx-item__text {
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--lx-text-2);
}

.tx-item__text :deep(strong) {
  color: var(--lx-text);
  font-weight: 600;
}

.tx-item__bullets > li {
  font-size: 0.85rem;
  padding: 0.65rem 0;
}

.tx-item__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.1rem;
  margin-top: 0.2rem;
}

/* ── Stage (desktop) ─────────────────────────────────────── */
.tx-stage {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 24px);
  display: grid;
}

.tx-stage__slide {
  position: relative;
  grid-area: 1 / 1;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(0, 12px, 0) scale(0.985);
  transition:
    opacity 0.5s var(--lx-ease),
    transform 0.6s var(--lx-ease),
    visibility 0s linear 0.5s;
}

.tx-stage__slide--active {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition:
    opacity 0.5s var(--lx-ease),
    transform 0.6s var(--lx-ease),
    visibility 0s;
}

.tx-stage__glow {
  position: absolute;
  inset: 10% 6%;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.2;
  pointer-events: none;
}

/* ── Phones and tablets: accordion, capture above the copy ─ */
@media (max-width: 1023px) {
  .tx-body {
    grid-template-columns: 1fr;
  }

  .tx-stage {
    display: none;
  }

  .tx-item__panel,
  .tx-item--active .tx-item__panel {
    padding-left: 0;
  }

  .tx-item__visual {
    display: block;
    margin-bottom: 0.4rem;
  }
}
</style>
