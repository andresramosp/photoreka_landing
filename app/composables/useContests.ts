import type { Contest, ContestsResponse } from "~/utils/contests";
import { todayIso } from "~/utils/contests";

/**
 * Contests from the API: baked into the prerendered page at build time, then
 * refreshed in the browser. `today` starts as the build day, so server and
 * client render the same markup, and moves to the visitor's day once mounted.
 */
export async function useContests() {
  const config = useRuntimeConfig();
  const today = useState("contests-today", () => todayIso());
  // After a client-side navigation the data below is already fresh.
  const prerendered = Boolean(useNuxtApp().isHydrating);

  const load = () =>
    $fetch<ContestsResponse>("/api/contests", {
      baseURL: config.public.mainApiBaseUrl,
    });

  // Registered before the await below, while the component instance is still current.
  onMounted(async () => {
    today.value = todayIso();
    if (!prerendered) return;
    try {
      const fresh = await load();
      if (fresh?.contests?.length) data.value = fresh;
    } catch {
      // The prerendered data stays on screen.
    }
  });

  const { data, error } = await useAsyncData<ContestsResponse>("contests", load);

  // A build without contests must fail: the host then keeps the previous deploy.
  if (import.meta.prerender && (error.value || !data.value?.contests?.length)) {
    throw createError({
      statusCode: 500,
      statusMessage: `Contests API unreachable at ${config.public.mainApiBaseUrl}/api/contests`,
      fatal: true,
    });
  }

  const contests = computed<Contest[]>(() => data.value?.contests ?? []);
  const failed = computed(() => Boolean(error.value) && !contests.value.length);

  return { contests, today, failed };
}
