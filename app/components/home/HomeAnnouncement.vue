<template>
  <div
    v-if="visible"
    ref="barRef"
    class="announcement-bar"
    :class="{ 'announcement-bar--hidden': hiddenByScroll }"
    :aria-hidden="hiddenByScroll"
  >
    <div class="announcement-content">
      <strong>{{ announcement.label }}</strong>
      <span>{{ announcement.message }}</span>
      <button class="announcement-link" @click="emit('signup')">
        {{ announcement.cta }}
      </button>
    </div>
    <button
      v-if="announcement.dismissible"
      class="announcement-close"
      aria-label="Close announcement"
      @click="dismissed = true"
    >
      ×
    </button>
  </div>
</template>

<script setup>
// Emite `height`: el alto que el nav y el hero reservan para la barra. Vale 0
// si está desactivada, cerrada u oculta por scroll, para que suban con transición.
const emit = defineEmits(["signup", "height"]);

const announcement = {
  enabled: false,
  dismissible: true,
  label: "EARLY ACCESS",
  message:
    "Free starter photo package and usage credits are available for new photographers.",
  cta: "Try for Free",
};

const SCROLL_DELTA = 8;

const barRef = ref(null);
const dismissed = ref(false);
const barHeight = ref(0);
const hiddenByScroll = ref(false);
const visible = computed(() => announcement.enabled && !dismissed.value);

let resizeObserver = null;
let lastScrollY = 0;
let scrollTicking = false;

// El alto depende del padding y del line-wrap, no de un valor fijo.
const syncHeight = () => {
  barHeight.value = barRef.value?.offsetHeight ?? 0;
};

const updateScrollVisibility = () => {
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;

  if (currentY <= barHeight.value) {
    hiddenByScroll.value = false;
  } else if (delta > SCROLL_DELTA) {
    hiddenByScroll.value = true;
  } else if (delta < -SCROLL_DELTA) {
    hiddenByScroll.value = false;
  }

  lastScrollY = currentY;
  scrollTicking = false;
};

const onScroll = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollVisibility);
};

watch(
  visible,
  (isVisible) => {
    resizeObserver?.disconnect();
    if (!isVisible) {
      barHeight.value = 0;
      return;
    }
    nextTick(() => {
      syncHeight();
      if (!barRef.value) return;
      resizeObserver = new ResizeObserver(syncHeight);
      resizeObserver.observe(barRef.value);
    });
  },
  { immediate: true },
);

watch(
  () => (hiddenByScroll.value ? 0 : barHeight.value),
  (height) => emit("height", height),
  { immediate: true },
);

onMounted(() => {
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  min-height: var(--announcement-height);
  padding: 0.35rem 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fde9c8;
  color: #111827;
  font-size: var(--lx-fs-sm);
  line-height: 1.4;
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}

.announcement-bar--hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.announcement-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  text-align: center;
}

.announcement-content strong {
  color: #b45309;
  font-weight: 700;
}

.announcement-link,
.announcement-close {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
}

.announcement-link {
  color: #b45309;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.announcement-close {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #111827;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.2;
}

@media (max-width: 640px) {
  .announcement-bar {
    display: none;
  }
}
</style>
