<template>
  <header class="lx-nav" :class="{ 'is-scrolled': scrolled }">
    <div class="lx-nav__bar">
      <NuxtLink to="/" class="lx-nav__brand" aria-label="Photoreka home">
        <AppLogo layout="horizontal" :height="34" />
      </NuxtLink>

      <nav
        v-if="links.length"
        ref="linksRef"
        class="lx-nav__links"
        :class="{ 'has-active': !!active }"
        aria-label="Page sections"
      >
        <span class="lx-nav__pill" :style="pillStyle" aria-hidden="true" />
        <a
          v-for="link in links"
          :key="link.target"
          :ref="(el) => (linkEls[link.target] = el)"
          :href="`#${link.target}`"
          class="lx-nav__link"
          :class="{ 'is-active': active === link.target }"
          @click.prevent="go(link)"
          >{{ link.label }}</a
        >
      </nav>

      <div class="lx-nav__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup>
// Floating navigation shared by lx landing pages: transparent over the
// hero, it condenses into a glass pill once the page scrolls, and a sliding
// highlight follows the section currently in view.
const props = defineProps({
  /** [{ label, target }] — target is the id of a section on the page. */
  links: { type: Array, default: () => [] },
  /** Extra offset applied when scrolling to a section. */
  offset: { type: Number, default: -24 },
});

const emit = defineEmits(["navigate"]);

const { scrollTo } = useSmoothScroll();

const scrolled = ref(false);
const active = ref(null);
const linksRef = ref(null);
const linkEls = reactive({});
const pill = reactive({ x: 0, w: 0 });

const pillStyle = computed(() => ({
  width: `${pill.w}px`,
  transform: `translateX(${pill.x}px)`,
}));

const placePill = () => {
  const el = active.value ? linkEls[active.value] : null;
  if (!el) return;
  pill.x = el.offsetLeft;
  pill.w = el.offsetWidth;
};

watch(active, () => nextTick(placePill));

const go = (link) => {
  emit("navigate", link.target);
  scrollTo(`#${link.target}`, props.offset);
};

const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};

let spy = null;
const visible = new Set();

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", placePill);

  // A section counts as current while it crosses a thin band just above
  // the middle of the viewport.
  spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      active.value =
        props.links.map((l) => l.target).find((id) => visible.has(id)) ?? null;
    },
    { rootMargin: "-42% 0px -52% 0px" },
  );
  for (const link of props.links) {
    const section = document.getElementById(link.target);
    if (section) spy.observe(section);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", placePill);
  spy?.disconnect();
});
</script>

<style scoped>
.lx-nav {
  position: fixed;
  top: var(--announcement-height, 0px);
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 12px var(--lx-gutter) 0;
  pointer-events: none;
  transition: top 0.35s ease;
}

.lx-nav__bar {
  pointer-events: auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  height: var(--lx-nav-h);
  max-width: var(--lx-container);
  margin-inline: auto;
  padding: 0 8px 0 16px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  transition:
    max-width 0.9s var(--lx-ease),
    background-color 0.5s ease,
    border-color 0.5s ease,
    box-shadow 0.9s var(--lx-ease),
    backdrop-filter 0.5s ease;
}

.lx-nav.is-scrolled .lx-nav__bar {
  max-width: 1120px;
  background: var(--lx-glass);
  border-color: var(--lx-line-2);
  box-shadow: var(--lx-shadow-md);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
}

.lx-nav__brand {
  display: inline-flex;
  align-items: center;
  justify-self: start;
}

.lx-nav__brand :deep(.photoreka-logo) {
  opacity: 1;
}

.lx-nav__links {
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--lx-line);
  background: color-mix(in srgb, var(--lx-surface) 55%, transparent);
  transition:
    border-color 0.5s ease,
    background-color 0.5s ease;
}

.lx-nav.is-scrolled .lx-nav__links {
  border-color: transparent;
  background: transparent;
}

.lx-nav__link {
  position: relative;
  z-index: 1;
  padding: 8px 15px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--lx-text-2);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.35s ease;
}

.lx-nav__link:hover {
  color: var(--lx-text);
}

.lx-nav__link.is-active {
  color: var(--lx-btn-fg);
}

.lx-nav__pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  border-radius: 999px;
  background: var(--lx-btn-bg);
  opacity: 0;
  transition:
    transform 0.7s var(--lx-ease),
    width 0.7s var(--lx-ease),
    opacity 0.35s ease;
}

.lx-nav__links.has-active .lx-nav__pill {
  opacity: 1;
}

.lx-nav__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}

@media (max-width: 1080px) {
  .lx-nav__bar {
    grid-template-columns: 1fr auto;
  }

  .lx-nav__links {
    display: none;
  }
}

@media (max-width: 640px) {
  .lx-nav {
    padding-top: 8px;
  }

  .lx-nav__bar {
    height: 56px;
    padding: 0 6px 0 12px;
  }
}
</style>
