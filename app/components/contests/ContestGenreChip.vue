<template>
  <span class="pc-genre" :style="{ '--c': genre.color }">
    <i aria-hidden="true" />{{ genre.label }}
  </span>
</template>

<script setup>
import { contestGenre } from "~/utils/contests";

const props = defineProps({
  genre: { type: String, required: true },
});

const genre = computed(() => contestGenre(props.genre));
</script>

<style scoped>
.pc-genre {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  /* Darkened on the page; photo overlays set --pc-chip-mix to white. */
  --chip: color-mix(in srgb, var(--c) 62%, var(--pc-chip-mix, #1a1a1f));
  color: var(--chip);
}

.pc-genre i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--chip);
}
</style>
