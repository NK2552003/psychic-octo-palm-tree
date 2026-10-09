"use client";

/**
 * Shutter Transition System matching Ultimate Media Downloader.
 * 
 * Animates 5 horizontal strips sweeping across the screen from left to right,
 * performs an action (route change or theme change), and sweeps strips out to the right.
 * 
 * In light mode: uses the exact text color (oklch(0.25 0.02 40) / var(--foreground)).
 * In dark mode: uses dark teal/black (#061614).
 */

export const LIGHT_SHUTTER_COLOR = "oklch(0.25 0.02 40)"; // Exact text color in light mode
export const DARK_SHUTTER_COLOR = "#061614"; // Dark mode shutter color

export function getShutterColor(isDark?: boolean): string {
  if (typeof document === "undefined") return LIGHT_SHUTTER_COLOR;
  const dark =
    isDark !== undefined
      ? isDark
      : document.documentElement.classList.contains("dark");
  return dark ? DARK_SHUTTER_COLOR : LIGHT_SHUTTER_COLOR;
}

export function triggerRouteTransition(
  navigateFn: () => void,
  isSamePage: boolean = false
) {
  if (typeof window === "undefined") return;

  // Prevent multiple simultaneous transitions
  if (document.querySelector(".transition-link-strips")) return;

  const shutterColor = getShutterColor();

  const container = document.createElement("div");
  container.className =
    "transition-link-strips fixed inset-0 z-[99999] pointer-events-none";
  container.style.display = "grid";
  container.style.gridTemplateRows = "repeat(5, 1fr)";

  for (let i = 0; i < 5; i++) {
    const strip = document.createElement("div");
    strip.style.width = "100%";
    strip.style.height = "calc(100% + 1px)";
    strip.style.marginBottom = "-1px";
    strip.style.transformOrigin = "left";
    strip.style.transform = "scaleX(0)";
    strip.style.backgroundColor = shutterColor;
    strip.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

    // Stagger IN animation
    setTimeout(() => {
      strip.style.transform = "scaleX(1)";
    }, i * 80);

    container.appendChild(strip);
  }

  document.body.appendChild(container);

  // Wait for the IN animation to finish before navigating (max 4*80ms + 500ms = 820ms)
  setTimeout(() => {
    navigateFn();
    window.scrollTo(0, 0);

    let animatedOut = false;
    const animateOut = () => {
      if (animatedOut) return;
      animatedOut = true;

      if (!document.body.contains(container)) return;

      // Animate strips OUT to the right
      Array.from(container.children).forEach((stripNode, index) => {
        const strip = stripNode as HTMLElement;
        strip.style.transformOrigin = "right";
        setTimeout(() => {
          strip.style.transform = "scaleX(0)";
        }, index * 80);
      });

      // Clean up after OUT animation finishes
      setTimeout(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 850);
    };

    if (isSamePage) {
      setTimeout(animateOut, 60);
    } else {
      // Listen for routeChangeComplete
      const onRouteComplete = () => {
        window.removeEventListener("routeChangeComplete", onRouteComplete);
        setTimeout(animateOut, 60);
      };

      window.addEventListener("routeChangeComplete", onRouteComplete, {
        once: true,
      });

      // Safety fallback in case event doesn't fire
      setTimeout(() => {
        window.removeEventListener("routeChangeComplete", onRouteComplete);
        animateOut();
      }, 1500);
    }
  }, 850);
}

export function triggerThemeTransition(
  changeThemeFn: () => void,
  _targetTheme?: "dark" | "light"
) {
  if (typeof window === "undefined") return;

  // Prevent multiple simultaneous transitions
  if (document.querySelector(".transition-link-strips")) return;

  // Exact text color in light mode (oklch(0.25 0.02 40)) used when changing theme
  const shutterColor = LIGHT_SHUTTER_COLOR;

  const container = document.createElement("div");
  container.className =
    "transition-link-strips fixed inset-0 z-[99999] pointer-events-none";
  container.style.display = "grid";
  container.style.gridTemplateRows = "repeat(5, 1fr)";

  for (let i = 0; i < 5; i++) {
    const strip = document.createElement("div");
    strip.style.width = "100%";
    strip.style.height = "calc(100% + 1px)";
    strip.style.marginBottom = "-1px";
    strip.style.transformOrigin = "left";
    strip.style.transform = "scaleX(0)";
    strip.style.backgroundColor = shutterColor;
    strip.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

    // Stagger IN animation
    setTimeout(() => {
      strip.style.transform = "scaleX(1)";
    }, i * 80);

    container.appendChild(strip);
  }

  document.body.appendChild(container);

  // When fully covered, switch theme and sweep OUT
  setTimeout(() => {
    changeThemeFn();

    // Small delay to allow theme CSS classes & background to apply
    setTimeout(() => {
      Array.from(container.children).forEach((stripNode, index) => {
        const strip = stripNode as HTMLElement;
        strip.style.transformOrigin = "right";
        setTimeout(() => {
          strip.style.transform = "scaleX(0)";
        }, index * 80);
      });

      setTimeout(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 850);
    }, 80);
  }, 850);
}
