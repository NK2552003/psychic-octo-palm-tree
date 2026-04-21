import { useEffect, useRef } from "react";
import { useParallax, applyParallaxDepth } from "@/lib/useParallax";
import { isMobile } from "@/lib/deviceDetection";
import Link from "next/link";

export default function HeroLeft() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const debugWidthContainerRef = useRef<HTMLDivElement>(null);
  const parallaxInitRef = useRef(false);
  
  const debugRef = useRef<HTMLSpanElement | null>(null)
  const drawRef = useRef<HTMLSpanElement | null>(null)

  const updateDrawWidth = () => {
    if (!debugWidthContainerRef.current) return

    // Find the current live elements inside the container (jellyText may replace nodes)
    const currentDebug = debugWidthContainerRef.current.querySelector('[data-i18n="hero.left.3"]') as HTMLElement | null
    const currentDraw = debugWidthContainerRef.current.querySelector('.draw-behind') as HTMLElement | null

    if (!currentDebug || !currentDraw) return

    debugRef.current = currentDebug
    drawRef.current = currentDraw

    const pad = 10
    const textWidth = Math.ceil(currentDebug.getBoundingClientRect().width) + pad * 2
    const maxWidth = Math.floor(debugWidthContainerRef.current.getBoundingClientRect().width)
    const finalWidth = Math.min(textWidth, maxWidth)
    currentDraw.style.width = `${finalWidth}px`
  }

  useEffect(() => {
    // Update when preferred language changes, storage (other tabs) or window resizes
    const onPref = () => setTimeout(updateDrawWidth, 40)
    window.addEventListener('preferredLangChange', onPref)
    window.addEventListener('storage', onPref)
    window.addEventListener('resize', updateDrawWidth)

    // Observe changes inside the container (jellyText will replace nodes)
    const mo = new MutationObserver(() => {
      setTimeout(updateDrawWidth, 20)
      // Apply parallax depth to newly created letter elements
      if (!parallaxInitRef.current && heroContainerRef.current) {
        applyParallaxDepth(heroContainerRef.current, 0.4, 0.2);
        parallaxInitRef.current = true;
      }
    })
    if (debugWidthContainerRef.current) mo.observe(debugWidthContainerRef.current, { childList: true, subtree: true, characterData: true })

    // initial sizing (delay to allow fonts/translations and jelly anim to apply)
    setTimeout(updateDrawWidth, 70)

    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
      window.removeEventListener('resize', updateDrawWidth)
      mo.disconnect()
    }
  }, [])

  // Initialize parallax effect for hero-left (disabled on mobile)
  const parallaxEnabled = typeof window !== 'undefined' ? !isMobile() : true
  useParallax(heroContainerRef, parallaxEnabled);

  return (
    <div ref={heroContainerRef} className=" pl-4 md:pl-0 relative pt-5 sm:-top-12">
      <h1 className="font-extrabold leading-[0.95] text-stone-900 dark:text-teal-200
                     text-[4rem] ms:text-[4.2rem] md:text-[5rem] lg:text-[6.5rem] ">
        <div className="hero-jelly" data-i18n="hero.left.1" data-parallax="0.3">IMAGINE.</div>
        <div className="hero-jelly" data-i18n="hero.left.2" data-parallax="0.35">SKETCH.</div>
        <div ref={debugWidthContainerRef} className="hero-jelly relative overflow-hidden w-[15.5rem] md:w-[19.5rem] lg:w-[25.5rem]" data-parallax="0.4">
          <span
            ref={drawRef}
            className={`draw-behind absolute left-0 top-0 bottom-0 origin-left bg-blue-300/30 dark:bg-teal-700/30`}
            style={{ transform: "scaleX(0)", transition: "transform 700ms ease-out", width: '0px' }}
          />
          <span ref={debugRef} className="relative z-10 inline-block px-1" data-i18n="hero.left.3">DEBUG.</span>
        </div>
          <div className="hero-jelly" data-i18n="hero.left.4" data-parallax="0.45">WOW.</div>
      </h1>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-parallax="0.5">
        <Link
          href="/pricing"
          scroll
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }
          }}
          className="hero-jelly hero-jelly-fast inline-flex items-center gap-2 rounded-full border border-stone-700/50 px-5 py-2 text-sm font-semibold tracking-wide text-stone-900 transition-colors hover:bg-stone-900 hover:text-stone-100 dark:border-teal-400 dark:text-teal-200 dark:hover:bg-teal-400 dark:hover:text-black"
        >
          <span>Pricing</span>
          <span>→</span>
        </Link>

        <a
          href="#projects"
          className="group relative inline-block cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={e => {
            e.preventDefault();
            const el = document.getElementById("projects");
            if (el) {
              const yOffset = -60; // Offset in px
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }}
        >
          <span className="hero-jelly hero-jelly-fast inline-flex items-center gap-2 text-[0.82rem] font-bold tracking-[0.12em] text-stone-900 dark:text-teal-200 transition-colors duration-300 group-hover:text-teal-500 dark:group-hover:text-teal-300">
            <span data-i18n="hero.view_work">View My Work</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </span>

          {/* Animated underline */}
          {/* Colored accent (drawn) */}
          <span
            className={
              "pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out bg-teal-300 dark:bg-teal-400 group-hover:scale-x-100"
            }
          />

          {/* Foreground neutral underline that grows on hover */}
          <span
            className={
              "view-work-border absolute left-0 -bottom-1 h-[2px] w-full bg-current origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
            }
          />
        </a>
      </div>

    </div>
  );
}
