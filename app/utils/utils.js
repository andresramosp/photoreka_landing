export function isMobileDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    // SSR: no hay acceso a window o navigator
    return false;
  }
  const userAgent = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Check if it's a mobile device but not a tablet
  const isMobile =
    /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet =
    /ipad|android(?!.*mobile)|tablet|playbook|silk/i.test(userAgent) ||
    (screenWidth >= 768 && screenHeight >= 1024) ||
    (screenWidth >= 1024 && screenHeight >= 768);

  // Also check screen size - mobile phones typically have smaller screens
  const isSmallScreen = screenWidth < 768;

  // Additional check for touch devices with small screens
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return (isMobile || (isSmallScreen && isTouchDevice)) && !isTablet;
}
