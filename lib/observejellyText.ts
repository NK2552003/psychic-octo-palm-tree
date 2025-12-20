import { applyJellyText } from "./jellyText";

export const observeJellyText = () => {
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
