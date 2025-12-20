import { gsap } from "gsap";

export const applyTitleZoom = (
  element: HTMLElement,
  baseDelay = 0,
  letterDelay = 0.05
) => {
  // prevent re-running
  if (element.dataset.jellyPlayed === "true") return;
  element.dataset.jellyPlayed = "true";

  const text = element.textContent || "";
  
  // Store original styles before clearing
  const originalFontSize = element.style.fontSize || window.getComputedStyle(element).fontSize;
  
  element.innerHTML = "";
  element.style.display = "inline-block"; // Ensure proper display

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.fontSize = originalFontSize; // Apply original font size to each char
    span.style.visibility = "visible"; // Make sure it's visible
    
    // Set initial state - START INVISIBLE
    gsap.set(span, {
      opacity: 0,
      y: 24,
      scale: 0.8
    });
    
    element.appendChild(span);

    // Animate in with delay
    gsap.to(span, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: baseDelay + (i * letterDelay),
    });
  });
};