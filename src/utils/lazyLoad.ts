/**
 * Performance utility functions
 */

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  // Simple heuristics for low-end devices
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for mobile devices
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  // Check for older browsers
  const isOldBrowser = /msie|trident/i.test(userAgent);

  // Check for low-end devices based on screen size and touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const smallScreen = window.innerWidth < 768;

  return isMobile || isOldBrowser || (hasTouch && smallScreen);
};

export const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
};
