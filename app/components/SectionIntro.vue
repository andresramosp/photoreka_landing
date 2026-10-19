<template>
  <header
    class="lx-intro"
    :class="[`lx-intro--${align}`, flush && 'lx-intro--flush']"
  >
    <p v-if="eyebrow" v-reveal class="lx-eyebrow">
      <span v-if="index" class="lx-eyebrow__num">{{ index }}</span>
      <span v-if="index" class="lx-eyebrow__rule" aria-hidden="true" />
      <span v-else class="lx-eyebrow__dot" aria-hidden="true" />
      <span>{{ eyebrow }}</span>
    </p>
    <component
      :is="tag"
      v-split="80"
      class="lx-title"
      :class="size !== 'lg' && `lx-title--${size}`"
    >
      <slot name="title">{{ title }}</slot>
    </component>
    <div v-if="$slots.default || lead" v-reveal="180" class="lx-lead">
      <slot>
        <p>{{ lead }}</p>
      </slot>
    </div>
    <div v-if="$slots.actions" v-reveal="260" class="lx-actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: "" },
  /** Optional section number shown before the eyebrow ("01"). */
  index: { type: String, default: "" },
  title: { type: String, default: "" },
  lead: { type: String, default: "" },
  /** left | center */
  align: { type: String, default: "left" },
  /** display | lg | md */
  size: { type: String, default: "lg" },
  tag: { type: String, default: "h2" },
  /** Drop the bottom margin when the intro is not followed by content. */
  flush: { type: Boolean, default: false },
});
</script>
