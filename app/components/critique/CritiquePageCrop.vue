<template>
  <div ref="frame" class="cpc">
    <div class="cpc__zoom">
      <img
        :src="src"
        :alt="alt"
        :width="PAGE_W"
        :height="PAGE_H"
        :style="style"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>

<script setup>
// One region of a report page, filling its frame whatever the frame's shape:
// the page is scaled so the region covers the frame and centred on it, without
// ever showing past the edge of the paper.
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  /** The region to show, as fractions of the page: [x, y, width, height]. */
  focus: { type: Array, required: true },
});

const PAGE_W = 1100;
const PAGE_H = 1557;

const frame = ref(null);
// Hidden until measured, so the page never flashes at full size.
const style = ref({ opacity: 0 });
let observer = null;

function place() {
  const el = frame.value;
  if (!el) return;
  const fw = el.clientWidth;
  const fh = el.clientHeight;
  if (!fw || !fh) return;
  const [x, y, w, h] = props.focus;
  const pw = fw;
  const ph = (fw * PAGE_H) / PAGE_W;
  const scale = Math.max(fw / (w * pw), fh / (h * ph));
  const tx = clamp(fw / 2 - (x + w / 2) * pw * scale, fw - pw * scale, 0);
  const ty = clamp(fh / 2 - (y + h / 2) * ph * scale, fh - ph * scale, 0);
  style.value = {
    width: `${pw}px`,
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
  };
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

onMounted(() => {
  place();
  observer = new ResizeObserver(place);
  observer.observe(frame.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.cpc {
  position: relative;
  overflow: hidden;
  background: #fff;
}

.cpc__zoom {
  position: absolute;
  inset: 0;
  transition: transform 0.9s var(--lx-ease);
}

.cpc img {
  position: absolute;
  top: 0;
  left: 0;
  max-width: none;
  height: auto;
  transform-origin: 0 0;
  transition: opacity 0.4s ease;
}
</style>
