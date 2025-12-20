import { gsap } from "gsap";

export const applyJellyText = (
  element: HTMLElement,
  baseDelay = 0,
  letterDelay = 0.035
) => {
  // Disable heavy per-letter animations on small screens to improve performance
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches) {
    element.dataset.jellyPlayed = "true";
    element.classList.add("jelly-revealed");
    element.style.visibility = "visible";
    return;
  }

  // prevent re-running
  if (element.dataset.jellyPlayed === "true") return;
  element.dataset.jellyPlayed = "true";
  // mark revealed (useful hooks for CSS/JS draw effects)
  element.classList.add("jelly-revealed");

  const originalNodes = Array.from(element.childNodes);
  element.innerHTML = "";

  let charIndex = 0;

  const animateInline = (node: HTMLElement, indexForDelay?: number) => {
    const i = typeof indexForDelay === "number" ? indexForDelay : charIndex++;
    node.style.opacity = node.style.opacity || "0";
    node.style.transform = node.style.transform || "translateY(24px)";
    gsap.to(node, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: baseDelay + i * letterDelay,
      ease: "back.out(1.8)",
      onComplete: () => {
        gsap.to(node, {
          y: -6,
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        });
      },
    });
  };

  const processTextNode = (text: string, parent: Node) => {
    // Split into tokens (words + whitespace) so words don't break mid-word.
    const tokens = text.split(/(\s+)/);
    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        parent.appendChild(document.createTextNode(" "));
        return;
      }

      const wordSpan = document.createElement("span");
      wordSpan.className = "jelly-word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      token.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block jelly-letter";
        span.style.opacity = "0";
        span.style.transform = "translateY(24px)";
        wordSpan.appendChild(span);

        const i = charIndex++;
        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: baseDelay + i * letterDelay,
          ease: "back.out(1.8)",
          onComplete: () => {
            gsap.to(span, {
              y: -6,
              duration: 0.6,
              yoyo: true,
              repeat: 1,
              ease: "sine.inOut",
            });
          },
        });
      });

      parent.appendChild(wordSpan);
    });
  };

  const processNode = (node: Node, parent: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node.textContent || "", parent);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();

      // Preserve and animate images, svgs, and elements marked as icons
      if (tag === "img" || tag === "svg" || el.classList.contains("icon")) {
        const clone = el.cloneNode(true) as HTMLElement;
        // keep inline layout
        if (!clone.style.display) clone.style.display = "inline-block";
        clone.style.opacity = "0";
        clone.style.transform = "translateY(24px)";
        parent.appendChild(clone);
        animateInline(clone);
        return;
      }

      // Keep anchors but animate their inner text per-letter
      if (tag === "a") {
        const a = document.createElement("a");
        // copy attributes
        Array.from(el.attributes).forEach((attr) => a.setAttribute(attr.name, attr.value));
        a.style.display = "inline-block";
        a.style.whiteSpace = "nowrap";
        Array.from(el.childNodes).forEach((child) => processNode(child, a));
        parent.appendChild(a);
        return;
      }

      // Fallback: clone other elements and animate as a single inline unit
      const clone = el.cloneNode(true) as HTMLElement;
      if (!clone.style.display) clone.style.display = "inline-block";
      clone.style.opacity = "0";
      clone.style.transform = "translateY(24px)";
      parent.appendChild(clone);
      animateInline(clone);
      return;
    }
  };

  // Process original child nodes in order so images/anchors are preserved
  originalNodes.forEach((n) => processNode(n, element));

  // If the element contains any `.draw-behind` spans (used for background
  // draw animations), animate them now by scaling X from 0 -> 1. This uses
  // inline style so Tailwind transition classes still apply.
  setTimeout(() => {
    const draws = Array.from(element.querySelectorAll<HTMLElement>(".draw-behind"));
    draws.forEach((d) => {
      d.style.transform = "scaleX(1)";
    });
  }, baseDelay + 30);
};
