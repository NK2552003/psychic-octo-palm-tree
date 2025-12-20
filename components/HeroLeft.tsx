export default function HeroLeft() {
  return (
    <div className=" pl-4 md:pl-0 relative pt-5 sm:-top-12">
      <h1 className="font-extrabold leading-[0.95] text-stone-900 dark:text-teal-200
                     text-[4rem] ms:text-[4.2rem] md:text-[5rem] lg:text-[6.5rem] ">
        <div className="hero-jelly">IMAGINE.</div>
        <div className="hero-jelly">SKETCH.</div>
        <div className="hero-jelly relative overflow-hidden w-[15.5rem] md:w-[19.5rem] lg:w-[25.5rem]">
          <span
            className="draw-behind absolute left-0 top-0 bottom-0 w-full origin-left bg-blue-300/30 dark:bg-teal-700/30"
            style={{ transform: "scaleX(0)", transition: "transform 700ms ease-out" }}
          />
          <span className="relative z-10 inline-block px-1">DEBUG.</span>
        </div>
          <div className="hero-jelly">WOW.</div>
      </h1>

       <a
  href="#work"
  className="group relative inline-block mt-8 cursor-pointer hover:text-teal-400"
>
 <span className="hero-jelly hero-jelly-fast text-lg tracking-wide group inline-flex items-center gap-1">
  View My Work
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
