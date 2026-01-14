import { useEffect, useState, useRef } from "react";

export default function HeroLeft() {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return (localStorage.getItem('preferredLang') as string) || 'en'
  })

  useEffect(() => {
    const onPref = (e: any) => setLang(((e && e.detail) as string) || (localStorage.getItem('preferredLang') as string) || 'en')
    window.addEventListener('preferredLangChange', onPref)
    window.addEventListener('storage', onPref)
    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
    }
  }, [])

  const debugRef = useRef<HTMLSpanElement | null>(null)
  const drawRef = useRef<HTMLSpanElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const updateDrawWidth = () => {
    if (!containerRef.current) return

    // Find the current live elements inside the container (jellyText may replace nodes)
    const currentDebug = containerRef.current.querySelector('[data-i18n="hero.left.3"]') as HTMLElement | null
    const currentDraw = containerRef.current.querySelector('.draw-behind') as HTMLElement | null

    if (!currentDebug || !currentDraw) return

    debugRef.current = currentDebug
    drawRef.current = currentDraw

    const pad = 10
    const textWidth = Math.ceil(currentDebug.getBoundingClientRect().width) + pad * 2
    const maxWidth = Math.floor(containerRef.current.getBoundingClientRect().width)
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
    const mo = new MutationObserver(() => setTimeout(updateDrawWidth, 20))
    if (containerRef.current) mo.observe(containerRef.current, { childList: true, subtree: true, characterData: true })

    // initial sizing (delay to allow fonts/translations and jelly anim to apply)
    setTimeout(updateDrawWidth, 70)

    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
      window.removeEventListener('resize', updateDrawWidth)
      mo.disconnect()
    }
  }, [])

  return (
    <div className=" pl-4 md:pl-0 relative pt-5 sm:-top-12">
      <h1 className="font-extrabold leading-[0.95] text-stone-900 dark:text-teal-200
                     text-[4rem] ms:text-[4.2rem] md:text-[5rem] lg:text-[6.5rem] ">
        <div className="hero-jelly" data-i18n="hero.left.1">IMAGINE.</div>
        <div className="hero-jelly" data-i18n="hero.left.2">SKETCH.</div>
        <div ref={containerRef} className="hero-jelly relative overflow-hidden w-[15.5rem] md:w-[19.5rem] lg:w-[25.5rem]">
          <span
            ref={drawRef}
            className={`draw-behind absolute left-0 top-0 bottom-0 origin-left bg-blue-300/30 dark:bg-teal-700/30`}
            style={{ transform: "scaleX(0)", transition: "transform 700ms ease-out", width: '0px' }}
          />
          <span ref={debugRef} className="relative z-10 inline-block px-1" data-i18n="hero.left.3">DEBUG.</span>
        </div>
          <div className="hero-jelly" data-i18n="hero.left.4">WOW.</div>
      </h1>

      <a
        href="#projects"
        className="group relative inline-block mt-8 cursor-pointer hover:text-teal-400"
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
        <span className="hero-jelly hero-jelly-fast text-lg tracking-wide group inline-flex items-center gap-1">
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
  );
}
