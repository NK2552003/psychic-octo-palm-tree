import { applyJellyText } from "./jellyText";

export const observeJellyText = () => {
  // Disable jelly animations on small screens to improve mobile performance
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches) {
    // Ensure text is visible even when we skip the reveal animation
    document.querySelectorAll<HTMLElement>(".hero-jelly").forEach((el) => {
      el.style.visibility = "visible";
    });
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>(".hero-jelly");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // mirror behavior in app/page.tsx: reveal visually then play jelly
          el.style.visibility = "visible";
          const isFast = el.classList.contains("hero-jelly-fast");
          applyJellyText(el, 0, isFast ? 0.012 : 0.035);
          observer.unobserve(entry.target); // reveal once
        }
      });
    },
    {
      threshold: 0.4, // reveal when ~40% visible
    }
  );

  elements.forEach((el) => observer.observe(el));
};
