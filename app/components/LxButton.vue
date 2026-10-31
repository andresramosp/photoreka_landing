<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    class="lx-btn"
    :class="[
      `lx-btn--${variant}`,
      size === 'sm' && 'lx-btn--sm',
      block && 'lx-btn--block',
      icon !== 'none' && (iconLeft ? 'lx-btn--icon-left' : 'lx-btn--has-icon'),
    ]"
  >
    <span v-if="icon !== 'none' && iconLeft" class="lx-btn__icon" aria-hidden="true">
      <svg v-for="n in 2" :key="n" viewBox="0 0 24 24" v-html="paths[icon]" />
    </span>
    <span class="lx-btn__label"><slot /></span>
    <span v-if="icon !== 'none' && !iconLeft" class="lx-btn__icon" aria-hidden="true">
      <svg v-for="n in 2" :key="n" viewBox="0 0 24 24" v-html="paths[icon]" />
    </span>
  </component>
</template>

<script setup>
const props = defineProps({
  /** primary | ghost | warm */
  variant: { type: String, default: "primary" },
  /** md | sm */
  size: { type: String, default: "md" },
  /** arrow | external | play | download | down | none */
  icon: { type: String, default: "arrow" },
  iconLeft: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  to: { type: String, default: "" },
  href: { type: String, default: "" },
  target: { type: String, default: "" },
});

const NuxtLink = resolveComponent("NuxtLink");

const tag = computed(() => (props.to ? NuxtLink : props.href ? "a" : "button"));

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to, target: props.target || undefined };
  if (props.href) {
    return {
      href: props.href,
      target: props.target || undefined,
      rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
    };
  }
  return { type: "button" };
});

const stroke =
  'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const paths = {
  arrow: `<path ${stroke} d="M5 12h14M13 6l6 6-6 6"/>`,
  external: `<path ${stroke} d="M7 17 17 7M8 7h9v9"/>`,
  down: `<path ${stroke} d="M12 5v14M6 13l6 6 6-6"/>`,
  download: `<path ${stroke} d="M12 4v11M7 10l5 5 5-5M5 20h14"/>`,
  play: '<path fill="currentColor" d="M8 5.6v12.8a.6.6 0 0 0 .9.5l10.2-6.4a.6.6 0 0 0 0-1L8.9 5.1a.6.6 0 0 0-.9.5Z"/>',
};
</script>
