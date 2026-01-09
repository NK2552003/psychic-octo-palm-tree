// Device and performance detection helpers for animation throttling

export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent || "");
}

export function isLowPerformanceDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  // Mobile detection (safe access)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || ""
  );

  // Check CPU cores (ensure it's a number)
  const lowCPU = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency <= 4 : false;

  // Check device memory API (may be undefined)
  const lowMemory = typeof (navigator as any).deviceMemory === "number" ? (navigator as any).deviceMemory <= 4 : false;

  return Boolean(isMobile || lowCPU || lowMemory);
}

export function shouldReduceAnimations(): boolean {
  if (typeof window === "undefined") return false;

  // Respect user's OS-level reduced motion preference (safe access)
  const prefersReducedMotion = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const isLowPerf = isLowPerformanceDevice();

  return Boolean(prefersReducedMotion || isLowPerf || isAndroid());
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  // Ensure we return a boolean and guard missing properties
  return ("ontouchstart" in window) || (((navigator as any).maxTouchPoints ?? 0) > 0);
}
