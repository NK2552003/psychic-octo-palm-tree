"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function SplashScreen({ onLoaded }: { onLoaded: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const signatureRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ongoingRef = useRef({ ended: 0, total: 0 });

  useEffect(() => {
    const container = signatureRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll(".signature-path")) as SVGPathElement[];
    ongoingRef.current.total = paths.length;
    ongoingRef.current.ended = 0;

    const onPathEnd = () => {
      ongoingRef.current.ended += 1;
      // when all paths finished drawing, proceed to animate away the splash
      if (ongoingRef.current.ended >= ongoingRef.current.total) {
        // small pause so user can see completed signature
        setTimeout(() => {
          // don't mark minimized yet — wait until GSAP finishes to avoid
          // CSS scaling interfering with the overlay animation

          // Use GSAP timeline for an expressive exit animation
          try {
            const sigEl = signatureRef.current;
            const overlayEl = overlayRef.current;
            if (sigEl && overlayEl && typeof window !== "undefined") {
              // Keep signature centered; zoom it out from center rather than moving it.
              const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

              // 1) scale the signature down (zoom out) from its center
              tl.to(sigEl, {
                duration: 0.9,
                scale: 0,
                transformOrigin: "50% 50%",
                opacity: 0.95,
                rotation: 0,
              });

              // let the app mount children once the signature is tucked
              tl.add(() => {
                try {
                  onLoaded();
                } catch (e) {
                  /* noop */
                }
              });

              // 2) fade the overlay out to reveal the app underneath
              tl.to(
                overlayEl,
                {
                  duration: 0.8,
                  opacity: 0,
                  ease: "power2.out",
                },
                ">-=0.2"
              );

              // mark minimized (CSS fallback) and hide overlay after animation
              tl.add(() => setIsMinimized(true));
              tl.add(() => setIsVisible(false));
            } else {
              // fallback: call onLoaded and hide overlay
              try {
                onLoaded();
              } catch (e) {
                /* noop */
              }
              setIsVisible(false);
            }
          } catch (e) {
            // fallback safety
            try {
              onLoaded();
            } catch (er) {
              /* noop */
            }
            setIsVisible(false);
          }
        }, 400);
      }
    };

    paths.forEach((p) => p.addEventListener("animationend", onPathEnd));

    return () => {
      paths.forEach((p) => p.removeEventListener("animationend", onPathEnd));
    };
  }, [onLoaded]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } z-50`}
    >
      <div
        ref={signatureRef}
        className={`absolute transition-all duration-700 ${
          isMinimized
            ? "top-4 left-4 scale-50 origin-top-left"
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        <svg
          className={`signature-svg ${isMinimized ? "minimized" : ""}`}
          viewBox="0 0 160 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path className="signature-path letter-n1" d="M2 45C3 39 12 23 20 14C18 37 22 43 25 43C28 43 33 31 43 5" />
          <path className="signature-path letter-i1" d="M4 23C3 24 0 30 2 29C4 28 6 26 8 25" transform="translate(40,0)" />
          <path className="signature-path letter-t" d="M1 16C7 14 16 14 23 16C12 14 16 10 18 6C10 17 0 37 2 37C3 37 9 29 14 25" transform="translate(42,0)" />
          <path className="signature-path letter-i2" d="M4 23C3 24 0 30 2 29C4 28 6 26 8 25" transform="translate(54,0)" />
          <path className="signature-path letter-s" d="M9 23C8 22 6 24 6 29C6 34 1 35 1 33C1 31 4 32 13 25" transform="translate(56,0)" />
          <path className="signature-path letter-h" d="M15 6C9 16 6 21 1 29C2 27 7 24 9 24C10 24 8 27 10 28C11 28 16 25 16 25" transform="translate(64,0)" />
          <path className="signature-path letter-k" d="M31 6C21 19 15 29 6 46C23 13 40 12 53 10C65 8 51 20 51 20C81 -7 -1 24 1 38C2 45 37 36 37 36" transform="translate(78,0)" />
          <path className="signature-path letter-u" d="M4 23C3 23 1 27 1 28C2 29 8 23 8 23C8 23 5 27 6 28C7 29 11 25 12 24" transform="translate(114,0)" />
          <path className="signature-path letter-m" d="M4 24L1 29C4 26 7 23 9 22C7 25 6 28 7 28C7 28 8 28 13 25C12 26 11 27 12 27C12 28 13 27 17 25" transform="translate(122,0)" />
          <path className="signature-path letter-a" d="M6 25C6 21 2 26 1 28C1 31 8 23 8 23C4 27 3 31 4 31C5 31 12 25 12 25" transform="translate(136,0)" />
          <path className="signature-path letter-r" d="M4 23L1 30C7 23 12 20 11 24" transform="translate(146,0)" />
        </svg>
      </div>
    </div>
  );
}