// Prerendered at build time: the contests as the build saw them, served from the
// static host. A client-side navigation renders from this copy at once and then
// refreshes from the API, so a slow API never holds the page back.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  return await $fetch("/api/contests", { baseURL: config.public.mainApiBaseUrl });
});
