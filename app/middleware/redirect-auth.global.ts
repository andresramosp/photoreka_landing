export default defineNuxtRouteMiddleware((to, from) => {
  // Rutas que requieren redirección
  const redirectPaths = ["/auth", "/workspace", "/dashboard"];
  if (redirectPaths.includes(to.path)) {
    // Detecta el host actual
    const host = import.meta.server
      ? useRequestHeaders()["host"]
      : window.location.host;

    if (host && host.startsWith("www.")) {
      const newHost = host.replace("www.", "app.");
      const protocol = import.meta.server
        ? useRequestHeaders()["x-forwarded-proto"] || "https"
        : window.location.protocol.replace(":", "");
      const newUrl = `${protocol}://${newHost}${to.fullPath}`;
      if (import.meta.server) {
        return navigateTo(newUrl, { external: true });
      } else {
        window.location.href = newUrl;
      }
    }
  }
});
