<template>
  <!-- A strip of tiny 3:2 frames standing for one stage of a photographer's
       workflow. Inside a v-reveal element every strip starts as faint
       placeholders and lights up left to right at its own time: the shoot
       fills, the filter lights only the keepers, the curation tints them by
       score and the final picks pop in. -->
  <div class="lx-frames" :class="`lx-frames--${kind}`" aria-hidden="true">
    <span
      v-for="(frame, i) in frames"
      :key="i"
      class="lx-frames__frame"
      :class="`is-${frame.state}`"
      :style="{ '--i': i, '--level': frame.level }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  /** raw | filtered | scored | final */
  kind: { type: String, required: true },
});

// Same 36-frame card as the shoot; the first pass keeps about a third of it.
const KEPT = new Set([1, 4, 6, 10, 13, 17, 20, 22, 27, 30, 33, 35]);

// Keepers from many shoots, each tinted by its score.
const LEVELS = [
  0.9, 0.45, 0.7, 1, 0.55, 0.35, 0.8, 0.6, 0.95, 0.4, 0.75, 0.5, 0.65, 1, 0.45,
  0.85, 0.3, 0.7, 0.55, 0.9, 0.4, 0.6, 0.8, 0.5,
];

const build = {
  raw: () => Array.from({ length: 36 }, () => ({ state: "raw" })),
  filtered: () =>
    Array.from({ length: 36 }, (_, i) => ({
      state: KEPT.has(i) ? "kept" : "out",
    })),
  scored: () => LEVELS.map((level) => ({ state: "scored", level })),
  final: () => Array.from({ length: 5 }, () => ({ state: "final" })),
};

const frames = build[props.kind]();
</script>

<style scoped>
/* --start and --step time each strip's wave; a parent can chain strips by
   setting --lx-frames-start. The "to" strips of a pair start later. */
.lx-frames {
  --start: 250ms;
  --step: 12ms;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 4px;
}

.lx-frames--filtered {
  --start: 850ms;
  --step: 14ms;
}

.lx-frames--scored {
  --step: 20ms;
}

.lx-frames--final {
  --start: 850ms;
  --step: 85ms;
  gap: 7px;
}

.lx-frames__frame {
  --at: calc(
    var(--lx-delay, 0ms) + var(--lx-frames-start, var(--start)) + var(--i) *
      var(--step)
  );
  position: relative;
  width: 12px;
  aspect-ratio: 3 / 2;
  border-radius: 2px;
  background-color: var(--lx-line-3);
  transition:
    background-color 0.45s var(--lx-ease),
    box-shadow 0.5s var(--lx-ease);
  transition-delay: var(--at);
}

.lx-frames__frame.is-out,
.lx-frames__frame.is-scored,
.lx-frames__frame.is-final {
  background-color: var(--lx-line);
}

.lx-frames__frame.is-kept {
  background-color: var(--lx-text-3);
}

/* The accent sits on a layer of its own, so it can grow out of the
   placeholder instead of cross-fading from grey. */
.lx-frames__frame.is-scored::before,
.lx-frames__frame.is-final::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--lx-accent-grad);
  transition:
    opacity 0.5s var(--lx-ease),
    transform 0.5s var(--lx-ease);
  transition-delay: var(--at);
}

.lx-frames__frame.is-scored::before {
  opacity: var(--level);
}

.lx-frames__frame.is-final {
  width: 26px;
  border-radius: 3px;
  box-shadow: 0 6px 18px -6px var(--lx-accent);
}

/* Before the strip's turn: every frame is a faint placeholder. */
html.lx-motion [data-reveal]:not(.is-in) .lx-frames__frame {
  background-color: var(--lx-line);
  box-shadow: none;
}

html.lx-motion [data-reveal]:not(.is-in) .lx-frames__frame::before {
  opacity: 0;
  transform: scale(0.5);
}
</style>
