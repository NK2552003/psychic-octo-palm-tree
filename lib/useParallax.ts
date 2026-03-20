import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { shouldDisableParallax } from './deviceDetection';

interface ParallaxElement {
  element: HTMLElement;
  depth: number; // 0.1 to 1.0 (0.1 = slow, 1.0 = fast)
  baseY: number;
  isLetter?: boolean;
  letterIndex?: number;
}

export const useParallax = (containerRef: React.RefObject<HTMLElement | null>, enabled = true) => {
  const elementsRef = useRef<ParallaxElement[]>([]);
  const scrollYRef = useRef(0);
  const smoothScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable parallax on low-performance or specific device types
    const shouldDisable = shouldDisableParallax() || !enabled;
    
    if (shouldDisable || !containerRef.current) return;

    // Initialize parallax elements
    const initParallax = () => {
      const container = containerRef.current;
      if (!container) return;

      elementsRef.current = [];

      // Select all parallax-enabled elements
      const parallaxElements = container.querySelectorAll<HTMLElement>('[data-parallax]');
      
      parallaxElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-parallax') || '0.5');
        const rect = el.getBoundingClientRect();
        const baseY = window.scrollY + rect.top;

        elementsRef.current.push({
          element: el,
          depth,
          baseY,
          isLetter: el.classList.contains('jelly-letter') || el.classList.contains('parallax-letter'),
          letterIndex: el.dataset.letterIndex ? parseInt(el.dataset.letterIndex) : 0,
        });
      });

      // After a delay, also select jelly-letters that may have been created
      setTimeout(() => {
        const letterElements = container.querySelectorAll<HTMLElement>('.jelly-letter');
        letterElements.forEach((el) => {
          // Skip if already in our list
          const isInList = elementsRef.current.some(item => item.element === el);
          if (isInList) return;

          const depth = parseFloat(el.getAttribute('data-parallax') || '0.5');
          const rect = el.getBoundingClientRect();
          const baseY = window.scrollY + rect.top;
          const letterIndex = el.dataset.letterIndex ? parseInt(el.dataset.letterIndex) : 0;

          elementsRef.current.push({
            element: el,
            depth,
            baseY,
            isLetter: true,
            letterIndex,
          });
        });
      }, 100);
    };

    // Scroll handler
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // Animation loop with lerp smoothing
    const updateParallax = () => {
      // Lerp scroll value for smooth animation
      const targetY = scrollYRef.current;
      smoothScrollYRef.current += (targetY - smoothScrollYRef.current) * 0.08; // 0.08 = smoothing factor

      elementsRef.current.forEach(({ element, depth, baseY, isLetter, letterIndex = 0 }) => {
        // Calculate parallax offset: only moves as user scrolls
        // When scrollY < baseY (element not yet reached), offset = 0
        // When scrollY > baseY (scrolled past element), offset is proportional to scroll distance
        const scrollDistance = Math.max(0, smoothScrollYRef.current - baseY);
        const parallaxStrength = (depth - 1) * 0.3; // Subtle effect: multiply by 0.3
        const offset = scrollDistance * parallaxStrength;

        gsap.to(element, {
          y: offset,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      rafRef.current = requestAnimationFrame(updateParallax);
    };

    // Initialize and start animation
    initParallax();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Start animation loop
    rafRef.current = requestAnimationFrame(updateParallax);

    // Re-initialize on window resize
    const handleResize = () => {
      initParallax();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, containerRef]);
};

/**
 * Applies parallax depth to child text elements
 * This function wraps each letter span with parallax data attributes
 */
export const applyParallaxDepth = (
  element: HTMLElement,
  baseDepth = 0.3,
  depthVariation = 0.3
) => {
  if (!element) return;

  let letterIndex = 0;

  // Process all letter-level spans
  const letters = element.querySelectorAll<HTMLElement>('.jelly-letter');
  
  letters.forEach((letter) => {
    // Calculate depth with variation for staggered effect
    const depth = baseDepth + (Math.sin(letterIndex * 0.5) * depthVariation);
    
    letter.setAttribute('data-parallax', Math.max(0.1, Math.min(1, depth)).toString());
    letter.setAttribute('data-letter-index', letterIndex.toString());
    letter.classList.add('parallax-letter');
    
    letterIndex++;
  });

  // Also apply to buttons and images
  const buttons = element.querySelectorAll<HTMLElement>('button, a.group');
  buttons.forEach((btn, idx) => {
    btn.setAttribute('data-parallax', (baseDepth + idx * 0.1).toString());
  });

  const images = element.querySelectorAll<HTMLElement>('img');
  images.forEach((img, idx) => {
    img.setAttribute('data-parallax', (baseDepth + 0.2 + idx * 0.15).toString());
  });
};
