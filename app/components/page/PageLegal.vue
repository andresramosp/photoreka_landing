<template>
  <div class="lx-legal">
    <header class="lx-legal__header lx-container">
      <p v-if="eyebrow" v-reveal class="lx-eyebrow">
        <span class="lx-eyebrow__dot" aria-hidden="true" />
        <span>{{ eyebrow }}</span>
      </p>
      <h1 v-split="80" class="lx-title lx-legal__title">
        <slot name="title" />
      </h1>
      <p v-if="updated" v-reveal="200" class="lx-legal__updated">
        Last updated: {{ updated }}
      </p>
    </header>

    <div class="lx-legal__body lx-container">
      <nav v-if="toc.length" class="lx-legal__toc" aria-label="Contents">
        <p class="lx-legal__toc-label">Contents</p>
        <ol>
          <li v-for="item in toc" :key="item.id">
            <a
              :href="`#${item.id}`"
              :class="{ 'is-active': active === item.id }"
              @click.prevent="scrollTo(`#${item.id}`, -112)"
            >
              <span class="lx-legal__toc-num">{{ item.num }}</span>
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ol>
      </nav>

      <article ref="articleRef" v-reveal="120" class="lx-legal__article">
        <slot />
      </article>
    </div>
  </div>
</template>

<script setup>
// Reading layout shared by the legal pages: a short header and a narrow
// column of numbered sections (`<section><h2>N. Title</h2>…</section>`),
// with a sticky table of contents built from those headings on wide screens.
defineProps({
  eyebrow: { type: String, default: "Legal" },
  /** Shown as "Last updated: …". */
  updated: { type: String, default: "" },
});

const smoothScroll = useSmoothScroll();
const { scrollTo } = smoothScroll;

const articleRef = ref(null);
const toc = ref([]);
const active = ref(null);
let spy = null;

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

onMounted(() => {
  smoothScroll.enable();

  const sections = articleRef.value?.querySelectorAll(":scope > section") ?? [];
  const items = [];
  sections.forEach((section) => {
    const heading = section.querySelector("h2");
    if (!heading) return;
    const text = heading.textContent.trim();
    if (!section.id) section.id = slugify(text);
    const match = text.match(/^(\d+)\.\s*(.*)$/);
    items.push({
      id: section.id,
      num: match ? match[1].padStart(2, "0") : "",
      label: match ? match[2] : text,
    });
  });
  toc.value = items;

  // The current section is the one crossing a band near the top of the view.
  spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id;
      }
    },
    { rootMargin: "-20% 0px -70% 0px" },
  );
  sections.forEach((section) => spy.observe(section));
});

onBeforeUnmount(() => {
  spy?.disconnect();
  smoothScroll.disable();
});
</script>

<style>
/* Not scoped: the sections come from each page's slot, and links inside
   them are rendered by NuxtLink, which scoped styles can't reach. */
.lx-legal__header {
  display: grid;
  justify-items: start;
  gap: 1.4rem;
  padding-top: calc(
    var(--announcement-height, 0px) + clamp(128px, 17svh, 176px)
  );
  padding-bottom: clamp(48px, 6vw, 80px);
}

.lx-legal__title {
  font-size: clamp(2.6rem, 5.4vw, 4.6rem);
}

.lx-legal__updated {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.lx-legal__body {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 760px);
  justify-content: space-between;
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
  padding-top: clamp(40px, 5vw, 64px);
  padding-bottom: var(--lx-section-y);
  /* A hairline over the content only, not across the gutters. */
  background: linear-gradient(var(--lx-line), var(--lx-line)) top center /
    calc(100% - 2 * var(--lx-gutter)) 1px no-repeat;
}

/* ── Table of contents ─────────────────────────────────────── */
.lx-legal__toc {
  position: sticky;
  top: calc(var(--lx-nav-offset) + 24px);
  max-height: calc(100vh - var(--lx-nav-offset) - 48px);
  overflow-y: auto;
}

.lx-legal .lx-legal__toc-label {
  margin-bottom: 1rem;
  font-size: var(--lx-fs-eyebrow);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lx-text-3);
}

.lx-legal__toc ol {
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: 1px solid var(--lx-line-2);
}

.lx-legal__toc a {
  position: relative;
  display: flex;
  gap: 0.7rem;
  padding: 0.42rem 0 0.42rem 1rem;
  font-size: 0.84rem;
  line-height: 1.4;
  color: var(--lx-text-3);
  text-decoration: none;
  transition: color 0.3s ease;
}

.lx-legal__toc a:hover {
  color: var(--lx-text-2);
}

.lx-legal__toc a.is-active {
  color: var(--lx-text);
}

.lx-legal__toc a.is-active::before {
  content: "";
  position: absolute;
  left: -1px;
  top: 0.35rem;
  bottom: 0.35rem;
  width: 1px;
  background: var(--lx-accent-grad);
  box-shadow: 0 0 10px var(--lx-accent);
}

.lx-legal__toc-num {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  color: var(--lx-text-3);
}

/* ── Article ───────────────────────────────────────────────── */
.lx-legal .lx-legal__article {
  display: grid;
  gap: clamp(40px, 4.5vw, 56px);
}

.lx-legal .lx-legal__article > section {
  scroll-margin-top: calc(var(--lx-nav-offset) + 8px);
}

.lx-legal .lx-legal__article h2 {
  margin-bottom: 1.1rem;
  font-family: var(--lx-font-display);
  font-size: clamp(1.45rem, 2vw, 1.8rem);
  font-weight: 380;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--lx-text);
}

.lx-legal .lx-legal__article p,
.lx-legal .lx-legal__article li {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--lx-text-2);
}

.lx-legal .lx-legal__article p + p,
.lx-legal .lx-legal__article p + ul,
.lx-legal .lx-legal__article ul + p {
  margin-top: 1rem;
}

.lx-legal .lx-legal__article ul {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.lx-legal .lx-legal__article li {
  position: relative;
  padding-left: 1.4rem;
}

.lx-legal .lx-legal__article li::before {
  content: "";
  position: absolute;
  left: 0.15rem;
  top: 0.78em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lx-accent-grad);
}

.lx-legal .lx-legal__article strong {
  color: var(--lx-text);
  font-weight: 600;
}

.lx-legal .lx-legal__article a {
  color: var(--lx-text);
  text-decoration: underline;
  text-decoration-color: var(--lx-line-3);
  text-underline-offset: 0.22em;
  transition: text-decoration-color 0.3s ease;
}

.lx-legal .lx-legal__article a:hover {
  text-decoration-color: var(--lx-accent);
}

@media (max-width: 1099px) {
  .lx-legal__body {
    grid-template-columns: minmax(0, 760px);
    justify-content: start;
  }

  .lx-legal__toc {
    display: none;
  }
}

@media (max-width: 640px) {
  .lx-legal__title {
    font-size: clamp(2.3rem, 10vw, 2.8rem);
  }

  .lx-legal .lx-legal__article p,
  .lx-legal .lx-legal__article li {
    font-size: 0.96rem;
  }
}
</style>
