<template>
  <div class="lx-grid">
    <div class="lx-grid__inner" :style="{ '--cols': columns }">
      <article
        v-for="(item, index) in items"
        :key="item.title"
        v-reveal="(index % columns) * 90"
        class="lx-grid__item"
        :style="index === items.length - 1 && { '--span': lastSpan }"
      >
        <span
          v-if="item.icon"
          class="lx-grid__icon"
          :style="{ color: item.color }"
          aria-hidden="true"
        >
          <n-icon size="24"><component :is="item.icon" /></n-icon>
        </span>
        <span
          v-if="item.kicker"
          class="lx-grid__kicker"
          :style="{ color: item.color }"
          >{{ item.kicker }}</span
        >
        <h3 class="lx-grid__title">{{ item.title }}</h3>
        <p v-if="item.description" class="lx-grid__desc">
          {{ item.description }}
        </p>
        <slot name="item" :item="item" :index="index" />
      </article>
    </div>
  </div>
</template>

<script setup>
// Panel of cards sharing one outline, split by hairlines (the look of the
// home's sources block). Item: { icon, kicker, title, description, color };
// the `item` slot adds anything else below the text.
const props = defineProps({
  items: { type: Array, required: true },
  /** Columns on desktop; tablets get two and phones one. */
  columns: { type: Number, default: 3 },
});

// The last card stretches over whatever its row leaves empty, so the panel
// never shows a bare cell.
const lastSpan = computed(
  () => props.columns - ((props.items.length - 1) % props.columns),
);
</script>

<style scoped>
.lx-grid {
  overflow: hidden;
  border-radius: var(--lx-radius-lg);
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface);
  box-shadow: var(--lx-shadow-md);
}

/* Each card draws its hairlines inside its right and bottom edges; the
   inner grid overhangs the panel by 1px so the ones along the panel's own
   border are clipped. Cards still waiting to reveal leave plain surface
   behind, never a grey slab. */
.lx-grid__inner {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  margin: 0 -1px -1px 0;
}

.lx-grid__item {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: clamp(26px, 2.8vw, 40px);
  background: var(--lx-surface);
  box-shadow:
    inset -1px 0 0 var(--lx-line-2),
    inset 0 -1px 0 var(--lx-line-2);
  transition: background-color 0.4s ease;
}

.lx-grid__item:last-child {
  grid-column: span var(--span, 1);
}

.lx-grid__item:hover {
  background: var(--lx-surface-2);
}

.lx-grid__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 0.9rem;
  border-radius: 15px;
  background: var(--lx-surface-3);
  border: 1px solid var(--lx-line);
}

.lx-grid__kicker {
  font-size: var(--lx-fs-eyebrow);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.lx-grid__title {
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.45rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-grid__desc {
  font-size: 0.94rem;
  line-height: 1.7;
  color: var(--lx-text-2);
}

@media (max-width: 1023px) {
  .lx-grid__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lx-grid__item:last-child {
    grid-column: auto;
  }

  .lx-grid__item:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }
}

@media (max-width: 760px) {
  .lx-grid__inner {
    grid-template-columns: 1fr;
  }
}
</style>
