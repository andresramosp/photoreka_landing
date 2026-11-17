<template>
  <header class="pc-head">
    <div class="pc-head__text">
      <h2 class="pc-head__title">
        {{ title }}<span v-if="count !== null" class="pc-head__count">{{ count }}</span>
      </h2>
      <p v-if="$slots.default" class="pc-head__note"><slot /></p>
    </div>
    <div v-if="$slots.aside" class="pc-head__aside"><slot name="aside" /></div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: null },
});
</script>

<style scoped>
.pc-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.8rem 2rem;
  margin-bottom: clamp(20px, 2.4vw, 32px);
  padding-top: 1.1rem;
  border-top: 1px solid var(--lx-line-2);
}

.pc-head__text {
  display: grid;
  gap: 0.45rem;
  max-width: 46em;
}

.pc-head__title {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  margin: 0;
  font-family: var(--lx-font-sans);
  font-size: clamp(1.4rem, 2vw, 1.85rem);
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.pc-head__count {
  font-size: var(--lx-fs-sm);
  font-weight: 500;
  letter-spacing: 0;
  color: var(--lx-text-3);
}

.pc-head__note {
  margin: 0;
  font-size: var(--lx-fs-sm);
  line-height: 1.6;
  color: var(--lx-text-2);
}
</style>
