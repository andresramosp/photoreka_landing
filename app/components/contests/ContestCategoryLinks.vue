<template>
  <ul class="pc-cats">
    <li v-for="item in items" :key="item.slug">
      <NuxtLink
        :to="contestCategoryPath(item.slug)"
        class="pc-cats__link"
        :class="{ 'is-current': item.slug === current }"
        :aria-current="item.slug === current ? 'page' : undefined"
        :style="{ '--c': item.color }"
      >
        <span class="pc-cats__name"><i aria-hidden="true" />{{ item.name }}</span>
        <span class="pc-cats__meta">
          {{ item.total }} {{ item.total === 1 ? "contest" : "contests" }}
          <template v-if="item.live"> · <b>{{ item.live }} open or opening</b></template>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { contestGenre, contestStatus } from "~/utils/contests";
import { CONTEST_CATEGORIES, contestCategoryPath, contestsInCategory } from "~/utils/contestCategories";

const props = defineProps({
  /** Every contest, unfiltered. */
  contests: { type: Array, required: true },
  today: { type: String, required: true },
  /** Slug of the category page this list sits on. */
  current: { type: String, default: "" },
});

const items = computed(() =>
  CONTEST_CATEGORIES.map((category) => {
    const inCategory = contestsInCategory(props.contests, category);
    return {
      slug: category.slug,
      name: category.name,
      color: category.genre ? contestGenre(category.genre).color : "var(--lx-ok)",
      total: inCategory.length,
      live: inCategory.filter((c) => ["open", "upcoming"].includes(contestStatus(c, props.today))).length,
    };
  }).filter((item) => item.total),
);
</script>

<style scoped>
.pc-cats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 16px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.pc-cats__link {
  display: grid;
  gap: 0.4rem;
  height: 100%;
  padding: clamp(16px, 1.6vw, 22px);
  border-radius: var(--lx-radius);
  border: 1px solid var(--lx-line-2);
  background: var(--pc-panel);
  text-decoration: none;
  transition:
    border-color 0.3s ease,
    transform 0.5s var(--lx-ease);
}

.pc-cats__link:hover {
  border-color: color-mix(in srgb, var(--c) 70%, transparent);
  transform: translateY(-2px);
}

.pc-cats__link.is-current {
  border-color: color-mix(in srgb, var(--c) 70%, transparent);
  background: color-mix(in srgb, var(--c) 9%, var(--pc-panel));
}

.pc-cats__name {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  font-weight: 650;
  line-height: 1.25;
  color: var(--lx-text);
}

.pc-cats__name i {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c);
  transform: translateY(-1px);
}

.pc-cats__meta {
  font-size: var(--lx-fs-sm);
  color: var(--lx-text-3);
}

.pc-cats__meta b {
  font-weight: 600;
  color: var(--lx-ok);
}

@media (max-width: 1023px) {
  .pc-cats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .pc-cats {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pc-cats__link {
    transition: none;
  }

  .pc-cats__link:hover {
    transform: none;
  }
}
</style>
