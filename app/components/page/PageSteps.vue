<template>
  <ol
    class="lx-steps"
    :class="{ 'lx-steps--five': steps.length === 5 }"
    :style="{ '--cols': Math.min(steps.length, 5) }"
  >
    <li
      v-for="(step, index) in steps"
      :key="step.title"
      v-reveal="index * 110"
      class="lx-step"
    >
      <span class="lx-step__num">{{ String(index + 1).padStart(2, "0") }}</span>
      <h3 class="lx-step__title">{{ step.title }}</h3>
      <p v-if="step.html" class="lx-step__desc" v-html="step.description" />
      <p v-else class="lx-step__desc">{{ step.description }}</p>
    </li>
  </ol>
</template>

<script setup>
// Numbered sequence read left to right, each step hanging from a shared
// rail. Step: { title, description, html? }; `html: true` renders the
// description as markup, for internal links written in the page's own data.
defineProps({
  steps: { type: Array, required: true },
});
</script>

<style scoped>
.lx-steps {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  gap: clamp(28px, 3vw, 48px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.lx-step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--lx-line-2);
}

/* A short lit segment of the rail marks where each step begins. */
.lx-step::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 44px;
  height: 1px;
  background: var(--lx-accent-grad);
  box-shadow: 0 0 12px var(--lx-accent);
}

.lx-step__num {
  font-family: var(--lx-font-display);
  font-size: clamp(2.6rem, 3.6vw, 3.4rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  background: var(--lx-accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.lx-step__title {
  font-family: var(--lx-font-display);
  font-weight: 380;
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-step__desc {
  font-size: 0.94rem;
  line-height: 1.75;
  color: var(--lx-text-2);
}

.lx-step__desc :deep(a) {
  color: var(--lx-text);
  text-decoration: underline;
  text-decoration-color: var(--lx-line-3);
  text-underline-offset: 0.22em;
  transition: text-decoration-color 0.3s ease;
}

.lx-step__desc :deep(a:hover) {
  text-decoration-color: var(--lx-accent);
}

/* Five steps fit one row only on wide screens. */
@media (max-width: 1199px) {
  .lx-steps--five {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 3rem;
  }
}

@media (max-width: 1023px) {
  .lx-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 3rem;
  }
}

@media (max-width: 640px) {
  .lx-steps {
    grid-template-columns: 1fr;
    row-gap: 2.5rem;
  }
}
</style>
