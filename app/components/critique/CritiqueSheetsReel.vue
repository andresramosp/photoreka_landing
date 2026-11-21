<template>
  <!-- The pages of a report passing like prints slid across a table. On a wide
       screen the block stays pinned while scrolling moves the pages sideways;
       on a phone, or with reduced motion, it is a plain swipeable row. -->
  <div
    ref="root"
    class="csr"
    :class="{ 'csr--pinned': pinned }"
    :style="pinned && runway ? { height: `${runway}px` } : null"
  >
    <div class="csr__sticky">
      <div v-if="$slots.head" class="lx-container csr__head">
        <slot name="head" />
      </div>

      <div ref="stage" class="csr__stage">
        <ol ref="track" class="csr__track" aria-label="Pages of the sample report">
          <li
            v-for="(page, index) in pages"
            :key="page.src"
            ref="cards"
            class="csr__card"
            :class="{ 'is-zoomed': zoomed === index }"
            @pointerenter="hover(index, $event)"
            @pointerleave="hover(-1, $event)"
          >
            <span class="csr__tag">{{ page.label }}</span>
            <component
              :is="page.href ? 'a' : 'button'"
              :type="page.href ? undefined : 'button'"
              :href="page.href"
              :target="page.href ? '_blank' : undefined"
              :rel="page.href ? 'noopener' : undefined"
              class="csr__sheet"
              :aria-label="`Open page ${index + 1}, ${page.label}`"
              @click="emit('open', index)"
            >
              <img
                :src="page.src"
                alt=""
                width="1100"
                height="1557"
                loading="lazy"
                decoding="async"
              />
            </component>
          </li>
        </ol>
      </div>

      <div v-if="pinned" class="csr__foot" aria-hidden="true">
        <span class="csr__count">
          <strong>{{ String(active + 1).padStart(2, "0") }}</strong>
          / {{ String(pages.length).padStart(2, "0") }}
        </span>
        <span class="csr__bar"><span :style="{ transform: `scaleX(${progress})` }" /></span>
        <span class="csr__hint">Hover over a page to enlarge it</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  /** [{ src, label, href? }] in reading order; with href a page is a link. */
  pages: { type: Array, required: true },
});
const emit = defineEmits(["open"]);

const root = ref(null);
const stage = ref(null);
const track = ref(null);
const cards = ref([]);

const pinned = ref(false);
const runway = ref(0);
const active = ref(0);
const progress = ref(0);
// The page under the mouse is shown straight and as large as the screen allows,
// but only while the reel is still: any movement puts it back in line, and it
// grows again once scrolling has stopped for SETTLE_MS.
const zoomed = ref(-1);
const SETTLE_MS = 220;
let hovered = -1;
let zoomScale = 1;
let settleTimer = 0;
let lastProgress = -1;

function hover(index, event) {
  if (!pinned.value || event.pointerType !== "mouse") return;
  hovered = index;
  if (index < 0) setZoom(-1);
  else if (!settleTimer) setZoom(index);
}

/** True while the block is stuck to the screen, the only time a page may grow. */
function engaged() {
  if (!root.value) return false;
  const rect = root.value.getBoundingClientRect();
  return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
}

function setZoom(index) {
  if (index >= 0 && !engaged()) index = -1;
  if (zoomed.value === index) return;
  zoomed.value = index;
  if (index >= 0) {
    // The sheet alone (its label hides while zoomed) fills the height under the nav.
    const sheet = cards.value[index].querySelector(".csr__sheet");
    zoomScale = Math.min(2.3, (window.innerHeight - navOffset() - 16) / sheet.offsetHeight);
  }
  schedule();
}

function onMove() {
  zoomed.value = -1;
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    settleTimer = 0;
    if (hovered >= 0) setZoom(hovered);
  }, SETTLE_MS);
}

const navOffset = () =>
  parseFloat(getComputedStyle(root.value).getPropertyValue("--lx-nav-offset")) || 96;

// How much vertical scroll each pixel of sideways travel costs.
const PACE = 0.9;
let span = 0;
let frame = 0;
let wide = null;
let still = null;

function measure() {
  if (!pinned.value || !cards.value.length) return;
  const first = cards.value[0];
  const last = cards.value[cards.value.length - 1];
  span = last.offsetLeft - first.offsetLeft;
  runway.value = Math.round(window.innerHeight + span * PACE);
}

function update() {
  frame = 0;
  if (!pinned.value || !root.value || !stage.value) return;
  const travel = root.value.offsetHeight - window.innerHeight;
  const p = travel > 0 ? clamp(-root.value.getBoundingClientRect().top / travel, 0, 1) : 0;
  if (lastProgress >= 0 && Math.abs(p - lastProgress) > 0.0001) onMove();
  lastProgress = p;
  if (zoomed.value >= 0 && !engaged()) zoomed.value = -1;
  const half = stage.value.clientWidth / 2;
  const first = cards.value[0];
  const x = half - (first.offsetLeft + first.offsetWidth / 2) - p * span;
  track.value.style.transform = `translate3d(${x}px, 0, 0)`;

  let nearest = 0;
  let nearestD = Infinity;
  cards.value.forEach((card, index) => {
    const d = (card.offsetLeft + card.offsetWidth / 2 + x - half) / half;
    const ad = Math.min(1, Math.abs(d));
    if (Math.abs(d) < nearestD) {
      nearestD = Math.abs(d);
      nearest = index;
    }
    // Centred on the screen's middle row, where the nav cannot cover it.
    card.style.transform =
      zoomed.value === index
        ? `translateY(${navShift()}px) scale(${zoomScale})`
        : `translateY(${ad * 26}px) rotate(${d * 6}deg) scale(${1.1 - ad * 0.26})`;
    card.style.setProperty("--tag", String(Math.max(0, 1 - ad * 2.2)));
  });
  active.value = nearest;
  progress.value = p;
}

/** Vertical move that centres the zoomed page between the nav and the bottom of the screen. */
function navShift() {
  const card = cards.value[zoomed.value];
  if (!card || !track.value) return 0;
  const nav = navOffset();
  const target = nav + (window.innerHeight - nav) / 2;
  const centre = track.value.getBoundingClientRect().top + card.offsetTop + card.offsetHeight / 2;
  // The card scales about its centre; the sheet sits half a label below it.
  const sheet = card.querySelector(".csr__sheet");
  const below = (card.offsetHeight - sheet.offsetHeight) / 2;
  return Math.round(target - centre - below * zoomScale);
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(update);
};

function relayout() {
  measure();
  update();
}

function setMode() {
  const next = wide.matches && !still.matches;
  if (next === pinned.value) return;
  pinned.value = next;
  if (!next) {
    track.value?.style.removeProperty("transform");
    cards.value.forEach((card) => card.style.removeProperty("transform"));
  }
  nextTick(relayout);
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

onMounted(() => {
  wide = window.matchMedia("(min-width: 761px)");
  still = window.matchMedia("(prefers-reduced-motion: reduce)");
  wide.addEventListener("change", setMode);
  still.addEventListener("change", setMode);
  setMode();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", relayout);
});

onBeforeUnmount(() => {
  wide?.removeEventListener("change", setMode);
  still?.removeEventListener("change", setMode);
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", relayout);
  if (frame) cancelAnimationFrame(frame);
  clearTimeout(settleTimer);
});

watch(() => props.pages.length, () => nextTick(relayout));
</script>

<style scoped>
.csr__head {
  width: 100%;
}

/* The section heading's own bottom margin would sit between the button and the pages:
   the stage's padding is the only gap here. */
.csr__head :deep(.lx-intro) {
  margin-bottom: 0;
}

.csr__track {
  position: relative;
  flex: none;
  display: flex;
  align-items: center;
  gap: clamp(28px, 4vw, 56px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.csr__card {
  position: relative;
  flex: none;
  --tag: 1;
}

.csr__sheet {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 3px;
  background: #fff;
  box-shadow:
    0 40px 80px -44px rgba(24, 24, 48, 0.6),
    0 0 0 1px var(--lx-line);
  cursor: pointer;
  overflow: hidden;
}

.csr__sheet img {
  display: block;
  width: 100%;
  height: auto;
}

.csr__sheet:focus-visible {
  outline: 2px solid var(--pc-gold-ink);
  outline-offset: 4px;
}

/* Above the page, like a heading over the print it names. */
.csr__tag {
  display: block;
  margin-bottom: 14px;
  text-align: center;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--lx-text-3);
  opacity: var(--tag);
}

/* ── Pinned (wide screens) ─────────────────────────────────── */

.csr--pinned .csr__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  /* The track is far wider than the screen: without minmax(0, …) it would
     widen the column and push the heading off to the side. */
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr) auto;
  padding-top: var(--lx-nav-offset);
  overflow: hidden;
}

.csr--pinned .csr__stage {
  display: flex;
  /* Right under the heading: the room left over goes above the foot, not above the pages. */
  align-items: flex-start;
  padding-top: clamp(28px, 5vh, 56px);
  min-width: 0;
  min-height: 0;
  /* The pages read this height (cqh) to shrink only when it is too short for them. */
  container-type: size;
  /* Being a size container makes the stage its own layer: lifted above the foot, so a
     zoomed page covers the progress bar instead of passing under it. */
  position: relative;
  z-index: 2;
}

.csr--pinned .csr__track {
  will-change: transform;
}

.csr--pinned .csr__card {
  /* As large as the stage allows (cqh): the page is 1.41 times as tall as wide, under
     a label and the stage's top padding, and the centred one grows by 10 %; what is
     left keeps it clear of the foot. */
  width: clamp(140px, min(22vw, calc(67cqh - 40px)), 400px);
  transition: transform 0.3s ease-out;
}

.csr--pinned .csr__card.is-zoomed {
  z-index: 3;
  transition: transform 0.45s var(--lx-ease);
}

.csr__card.is-zoomed .csr__sheet {
  box-shadow:
    0 60px 120px -50px rgba(24, 24, 48, 0.55),
    0 0 0 1px var(--lx-line);
}

.csr__card.is-zoomed .csr__tag {
  opacity: 0;
}

.csr--pinned .csr__tag {
  color: var(--pc-gold-ink);
}

.csr__foot {
  display: grid;
  grid-template-columns: auto minmax(0, 260px) auto;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding-block: 20px 4vh;
  font-size: var(--lx-fs-xs);
  color: var(--lx-text-3);
  font-variant-numeric: tabular-nums;
}

.csr__count strong {
  color: var(--lx-text);
  font-weight: 600;
}

.csr__bar {
  height: 2px;
  border-radius: 2px;
  background: var(--lx-line-2);
  overflow: hidden;
}

.csr__bar span {
  display: block;
  height: 100%;
  background: var(--pc-gold);
  transform-origin: 0 50%;
}

/* ── Swipeable row (phones, reduced motion) ────────────────── */

.csr:not(.csr--pinned) .csr__stage {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 8px var(--lx-gutter) 24px;
}

.csr:not(.csr--pinned) .csr__stage::-webkit-scrollbar {
  display: none;
}

.csr:not(.csr--pinned) .csr__card {
  width: min(62vw, 260px);
  scroll-snap-align: center;
}

.csr:not(.csr--pinned) .csr__head {
  margin-bottom: 8px;
}
</style>
