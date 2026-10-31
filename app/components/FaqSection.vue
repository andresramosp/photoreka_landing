<template>
  <section :id="sectionId" class="lx-section">
    <div class="lx-container lx-faq-grid">
      <div class="lx-faq-grid__intro">
        <SectionIntro :eyebrow="eyebrow" flush>
          <template #title><slot name="title" /></template>
          <slot />
        </SectionIntro>
      </div>

      <div v-reveal="150" class="lx-faq">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="lx-faq__item"
          :class="{ 'is-open': activeFAQ === index }"
        >
          <button
            class="lx-faq__q"
            :aria-expanded="activeFAQ === index"
            @click="toggle(index)"
          >
            <span class="lx-faq__num">{{
              String(index + 1).padStart(2, "0")
            }}</span>
            <span class="lx-faq__text">{{ faq.question }}</span>
            <span class="lx-faq__icon" aria-hidden="true" />
          </button>
          <div class="lx-faq__a">
            <div class="lx-faq__a-inner">
              <slot name="answer" :faq="faq" :index="index">
                <p>{{ faq.answer }}</p>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// FAQ accordion with a sticky intro beside it. Answers render as plain text
// unless the `answer` slot is used. Emits `toggle(index, isOpen)` so each
// page can track it with its own analytics payload.
defineProps({
  /** [{ question, answer }] */
  faqs: { type: Array, required: true },
  eyebrow: { type: String, default: "FAQ" },
  sectionId: { type: String, default: "faq" },
});

const emit = defineEmits(["toggle"]);

const activeFAQ = ref(null);

const toggle = (index) => {
  const wasOpen = activeFAQ.value === index;
  activeFAQ.value = wasOpen ? null : index;
  emit("toggle", index, !wasOpen);
};
</script>

<style scoped>
.lx-faq-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(40px, 6vw, 104px);
  align-items: start;
}

.lx-faq-grid__intro {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 32px);
}

.lx-faq {
  border-top: 1px solid var(--lx-line-2);
}

.lx-faq__item {
  border-bottom: 1px solid var(--lx-line-2);
}

.lx-faq__q {
  display: grid;
  grid-template-columns: 2.6rem minmax(0, 1fr) 30px;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.55rem 0;
  border: 0;
  background: none;
  color: var(--lx-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.lx-faq__num {
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text-3);
}

.lx-faq__text {
  font-family: var(--lx-font-display);
  font-size: clamp(1.15rem, 1.6vw, 1.42rem);
  font-weight: 380;
  line-height: 1.3;
  letter-spacing: -0.015em;
  transition: transform 0.6s var(--lx-ease);
}

.lx-faq__q:hover .lx-faq__text {
  transform: translateX(4px);
}

.lx-faq__icon {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--lx-line-2);
  color: var(--lx-text);
  transition:
    transform 0.6s var(--lx-ease),
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.lx-faq__icon::before,
.lx-faq__icon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 11px;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  transform: translate(-50%, -50%);
}

.lx-faq__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.lx-faq__item.is-open .lx-faq__icon {
  transform: rotate(135deg);
  background: var(--lx-btn-bg);
  border-color: transparent;
  color: var(--lx-btn-fg);
}

.lx-faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.7s var(--lx-ease);
}

.lx-faq__item.is-open .lx-faq__a {
  grid-template-rows: 1fr;
}

.lx-faq__a-inner {
  overflow: hidden;
  padding-left: 3.6rem;
}

.lx-faq__a-inner :slotted(p),
.lx-faq__a-inner > p {
  max-width: 46em;
  padding-bottom: 1.7rem;
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--lx-text-2);
}

@media (max-width: 1023px) {
  .lx-faq-grid {
    grid-template-columns: 1fr;
  }

  .lx-faq-grid__intro {
    position: static;
  }
}

@media (max-width: 640px) {
  .lx-faq__q {
    grid-template-columns: 2rem minmax(0, 1fr) 28px;
    gap: 0.75rem;
    padding: 1.3rem 0;
  }

  .lx-faq__a-inner {
    padding-left: 2.75rem;
  }
}
</style>
