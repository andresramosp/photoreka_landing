<template>
  <Transition name="cc">
    <section
      v-if="isOpen"
      class="cc"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cc-title"
      aria-describedby="cc-text"
    >
      <div class="cc__copy">
        <h2 id="cc-title" class="cc__title">
          Cookies, <span class="lx-accent">only if you say so</span>.
        </h2>
        <p id="cc-text" class="cc__text">
          Analytics and ad cookies tell us which campaigns work.
          <span class="cc__links">
            <NuxtLink to="/privacy" class="lx-inline-link">Privacy policy</NuxtLink>
            <template v-if="!isCustomizing">
              <span aria-hidden="true">·</span>
              <button
                type="button"
                class="lx-inline-link cc__customize"
                @click="startCustomizing"
              >
                Customize
              </button>
            </template>
          </span>
        </p>
      </div>

      <div class="cc__actions">
        <LxButton variant="ghost" size="sm" icon="none" @click="rejectAll">
          Reject all
        </LxButton>
        <LxButton
          v-if="isCustomizing"
          variant="primary"
          size="sm"
          icon="none"
          @click="saveDraft"
        >
          Save choices
        </LxButton>
        <LxButton
          v-else
          variant="primary"
          size="sm"
          icon="none"
          @click="acceptAll"
        >
          Accept all
        </LxButton>
      </div>

      <Transition name="cc-options">
        <ul v-if="isCustomizing" class="cc__options">
          <li v-for="option in options" :key="option.key">
            <label class="cc__option" :class="{ 'is-locked': option.locked }">
              <span class="cc__option-name">{{ option.name }}</span>
              <input
                v-if="option.locked"
                type="checkbox"
                role="switch"
                class="cc__switch-input"
                checked
                disabled
              />
              <input
                v-else
                v-model="draft[option.key]"
                type="checkbox"
                role="switch"
                class="cc__switch-input"
              />
              <span class="cc__switch" aria-hidden="true" />
              <span class="cc__option-desc">{{ option.description }}</span>
            </label>
          </li>
        </ul>
      </Transition>
    </section>
  </Transition>
</template>

<script setup>
// Lets the hero settle before the banner slides in.
const APPEAR_DELAY_MS = 700;

const options = [
  {
    key: "essential",
    name: "Essential",
    description: "Keeps your theme and this choice. Always on.",
    locked: true,
  },
  {
    key: "analytics",
    name: "Analytics",
    description: "Google Analytics: which pages get read.",
  },
  {
    key: "ads",
    name: "Advertising",
    description: "Google Ads: which ad brought you here.",
  },
];

const {
  isOpen,
  isCustomizing,
  draft,
  askIfUndecided,
  startCustomizing,
  acceptAll,
  rejectAll,
  saveDraft,
} = useCookieConsent();

let appearTimer = null;

onMounted(() => {
  appearTimer = window.setTimeout(askIfUndecided, APPEAR_DELAY_MS);
});

onBeforeUnmount(() => {
  window.clearTimeout(appearTimer);
});
</script>

<style scoped>
/* Wide screens: a low bar over the right half, which is where the hero's
   media ends early; the left half keeps the hero copy and CTAs clear. */
.cc {
  position: fixed;
  right: var(--lx-gutter);
  bottom: 16px;
  z-index: 1200;
  width: min(860px, calc(50vw - var(--lx-gutter)));
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "copy actions"
    "options options";
  align-items: center;
  column-gap: 24px;
  padding: 12px 12px 12px 24px;
  border: 1px solid var(--lx-line-2);
  border-radius: var(--lx-radius-lg);
  background:
    radial-gradient(120% 90% at 100% 0%, var(--lx-glow-1), transparent 60%),
    var(--lx-surface);
  box-shadow: var(--lx-shadow-lg), var(--lx-highlight);
  color: var(--lx-text);
  font-family: var(--lx-font-sans);
}

.cc__copy {
  grid-area: copy;
  display: grid;
  gap: 2px;
}

.cc__title {
  margin: 0;
  font-family: var(--lx-font-display);
  font-size: 1.2rem;
  font-weight: 360;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.cc__text {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--lx-text-2);
  text-wrap: pretty;
}

.cc__links {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4em;
  white-space: nowrap;
}

.cc__customize {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  cursor: pointer;
}

.cc__actions {
  grid-area: actions;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.cc__options {
  grid-area: options;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  list-style: none;
  margin: 12px 12px 4px 0;
  padding: 12px 0 0;
  border-top: 1px solid var(--lx-line);
}

.cc__option {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "name switch"
    "desc desc";
  align-items: center;
  column-gap: 12px;
  row-gap: 4px;
  cursor: pointer;
}

.cc__option.is-locked {
  cursor: default;
}

.cc__option-name {
  grid-area: name;
  font-size: var(--lx-fs-sm);
  font-weight: 600;
  color: var(--lx-text);
}

.cc__option-desc {
  grid-area: desc;
  font-size: var(--lx-fs-xs);
  line-height: 1.5;
  color: var(--lx-text-3);
}

/* The real checkbox stays in the accessibility tree; the track is drawn on a
   sibling because pseudo-elements on inputs are unreliable across browsers. */
.cc__switch-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
}

.cc__switch {
  grid-area: switch;
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid var(--lx-line-2);
  background: var(--lx-surface-3);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.cc__switch::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--lx-text-3);
  transition:
    transform 0.5s var(--lx-ease),
    background-color 0.3s ease;
}

.cc__switch-input:checked + .cc__switch {
  border-color: transparent;
  background: var(--lx-accent-grad);
}

.cc__switch-input:checked + .cc__switch::before {
  transform: translateX(16px);
  background: #fff;
}

.cc__switch-input:disabled + .cc__switch {
  opacity: 0.5;
}

.cc__switch-input:focus-visible + .cc__switch {
  outline: 2px solid var(--lx-accent);
  outline-offset: 2px;
}

.cc-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.9s var(--lx-ease);
}

.cc-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--lx-ease-io);
}

.cc-enter-from,
.cc-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
}

.cc-options-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.6s var(--lx-ease);
}

.cc-options-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

/* Half the screen is too narrow for one row: a compact card instead. */
@media (max-width: 1200px) {
  .cc {
    width: min(460px, calc(100vw - 2 * var(--lx-gutter)));
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "copy"
      "options"
      "actions";
    padding: 16px 16px 14px 20px;
  }

  .cc__options {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    margin-right: 0;
  }

  .cc__actions {
    margin-top: 12px;
  }
}

@media (max-width: 560px) {
  .cc {
    left: 12px;
    right: 12px;
    bottom: 12px;
    width: auto;
    border-radius: var(--lx-radius);
  }

  .cc__actions :deep(.lx-btn) {
    flex: 1 1 0;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cc-enter-active,
  .cc-leave-active,
  .cc-options-enter-active {
    transition: opacity 0.2s ease;
  }

  .cc-enter-from,
  .cc-leave-to,
  .cc-options-enter-from {
    transform: none;
  }
}
</style>
