// Device and performance detection helpers for animation throttling

export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent || "");
}

export function isWindows(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Windows|Win32|Win64|WinCE/i.test(navigator.userAgent || "");
}

export function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || ""
  );
}

export function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Safari/i.test(ua) && !/Chrome|Edge|Opera|Firefox/i.test(ua);
}

export function isMacOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Macintosh|MacPPC|MacIntel|Mac_PowerPC|Macintosh/i.test(navigator.userAgent || "");
}

export type DeviceTier = 'low' | 'mid' | 'high';

/**
 * Detect device performance tier based on CPU cores and memory
 */
export function getDeviceTier(): DeviceTier {
  if (typeof navigator === "undefined") return 'mid';

  // Check CPU cores
  const cpuCores = typeof navigator.hardwareConcurrency === "number" 
    ? navigator.hardwareConcurrency 
    : 4;

  // Check device memory
  const deviceMemory = typeof (navigator as any).deviceMemory === "number" 
    ? (navigator as any).deviceMemory 
    : 4;

  // Low tier: ≤2 cores or ≤2GB RAM
  if (cpuCores <= 2 || deviceMemory <= 2) {
    return 'low';
  }

  // Mid tier: ≤4 cores or ≤4GB RAM
  if (cpuCores <= 4 || deviceMemory <= 4) {
    return 'mid';
  }

  return 'high';
}

export function isLowPerformanceDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  // Mobile detection (safe access)
  const mobile = isMobile();

  // Check device tier
  const tier = getDeviceTier();

  return Boolean(mobile || tier === 'low');
}

export function shouldReduceAnimations(): boolean {
  if (typeof window === "undefined") return false;

  // Respect user's OS-level reduced motion preference (safe access)
  const prefersReducedMotion = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const isLowPerf = isLowPerformanceDevice();

  return Boolean(prefersReducedMotion || isLowPerf);
}

export function shouldDisableParallax(): boolean {
  if (typeof navigator === "undefined") return false;

  // Disable parallax on mobile
  if (isMobile()) return true;

  // Disable parallax on Windows low and mid tier devices
  if (isWindows()) {
    const tier = getDeviceTier();
    if (tier === 'low' || tier === 'mid') return true;
  }

  return false;
}

export function shouldDisableLenisScroll(): boolean {
  if (typeof navigator === "undefined") return false;

  // Disable Lenis on mobile
  if (isMobile()) return true;

  // Disable Lenis on Windows low and mid tier devices
  if (isWindows()) {
    const tier = getDeviceTier();
    if (tier === 'low' || tier === 'mid') return true;
  }

  return false;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  // Ensure we return a boolean and guard missing properties
  return ("ontouchstart" in window) || (((navigator as any).maxTouchPoints ?? 0) > 0);
}
