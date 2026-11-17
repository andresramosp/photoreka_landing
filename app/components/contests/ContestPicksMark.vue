<template>
  <img
    src="/logos/marca/icon-light.webp"
    alt=""
    class="pc-mark"
    :class="{ 'pc-mark--chip': dark }"
    :style="{ height: `${size}px`, width: dark ? `${size}px` : 'auto' }"
  />
</template>

<script setup>
// The Photoreka mark that opens every "Rank my photos" button.
defineProps({
  /** On a dark button or over a photo: the mark sits on a white chip, so its spiral shows. */
  dark: { type: Boolean, default: false },
  size: { type: Number, default: 20 },
});
</script>

<style>
.pc-mark {
  display: block;
  flex-shrink: 0;
}

.pc-mark--chip {
  box-sizing: border-box;
  padding: 2px;
  border-radius: 50%;
  background: #fff;
  object-fit: contain;
}

/* The button label lines the mark up with its text. */
.pc .lx-btn__label:has(> .pc-mark) {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
