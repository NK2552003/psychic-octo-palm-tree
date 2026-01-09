import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, User, Layers, Award, Grid, Folder, Code2, Mail } from "lucide-react";

const sectionIds = [
  { id: "hero", icon: <Home className="w-4 h-4 md:w-5 md:h-5" /> },
  { id: "about", icon: <User className="w-4 h-4 md:w-5 md:h-5" /> },
  { id: "skills", icon: <Layers className="w-4 h-4 md:w-5 md:h-5" /> },
  { id: "qualifications", icon: <Award className="w-4 h-4 md:w-5 md:h-5"  /> },
  { id: "photography", icon: <Grid className="w-4 h-4 md:w-5 md:h-5" /> },
  { id: "projects", icon: <Folder className="w-4 h-4 md:w-5 md:h-5"  /> },
  { id: "contact", icon: <Mail className="w-4 h-4 md:w-5 md:h-5"  /> },
];

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Robust scroll to element that works with the custom SmoothScroll container
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // compute document top for the element and add a small offset so headers don't overlap
      const rect = el.getBoundingClientRect();
      const target = Math.max(0, Math.round(window.scrollY + rect.top - 20));
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      // fallback: go to top for hero or unknown ids
      if (id === "hero" || id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false); // close after navigation
  };

  // Show the floating nav when the user has scrolled ~40% down the page
  // Use rAF to avoid layout thrashing and include a viewport-based fallback
  useEffect(() => {
    if (typeof window === "undefined") return;
    let rafId = 0;

    const check = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = window.scrollY / total;
        // Also show if user has scrolled 40% of the viewport height (helps with SmoothScroll timing)
        const byViewport = window.scrollY >= window.innerHeight * 0.4;
        setVisible(progress >= 0.4 || byViewport);
      });
    };

    check();
    // run a delayed check in case SmoothScroll or other layout changes update heights after mount
    const delayed = setTimeout(check, 250);

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("load", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.removeEventListener("load", check);
      clearTimeout(delayed);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    // keep menu hover text in sync when `open` changes while the user is hovering the menu
    if (hoverTarget === "menu") {
      setHoverText(open ? "Close" : "Open");
    }
  }, [open, hoverTarget]);

  const node = (
    <AnimatePresence>
      {(visible || open) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed left-4 bottom-4 md:left-5 md:bottom-5 z-60 flex flex-col items-center"
        >
          {/* Animated Nav Icons (render above the button so they expand upward) */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="mb-2 flex flex-col gap-2"
              >
                {sectionIds.map((section, index) => (
                  <div key={section.id} className="relative">
                    <motion.button
                      onMouseEnter={() => {
                        setHoverTarget(section.id);
                        setHoverText(section.id.charAt(0).toUpperCase() + section.id.slice(1));
                      }}
                      onMouseLeave={() => {
                        setHoverTarget(null);
                        setHoverText(null);
                      }}
                      onFocus={() => {
                        setHoverTarget(section.id);
                        setHoverText(section.id.charAt(0).toUpperCase() + section.id.slice(1));
                      }}
                      onBlur={() => {
                        setHoverTarget(null);
                        setHoverText(null);
                      }}
                      onClick={() => scrollToSection(section.id)}
                      aria-label={`Go to ${section.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl transition-all duration-150
                        hover:bg-stone-100 dark:hover:bg-white/10
                        text-stone-800 dark:text-white
                        bg-white/95 dark:bg-[#031412]
                        border border-stone-200/60 dark:border-white/20 shadow-sm`}
                    >
                      {section.icon}
                    </motion.button>

                    <AnimatePresence>
                      {hoverTarget === section.id && hoverText && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.14 }}
                          className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap px-3 py-1 rounded-md bg-stone-900 text-white text-xs shadow-md"
                          aria-hidden
                        >
                          {hoverText}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                ))} 
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Menu Button (stay in place) */}
          <div className="relative">
            <button
              onMouseEnter={() => {
                setHoverTarget("menu");
                setHoverText(open ? "Close" : "Open");
              }}
              onMouseLeave={() => {
                setHoverTarget(null);
                setHoverText(null);
              }}
              onFocus={() => {
                setHoverTarget("menu");
                setHoverText(open ? "Close" : "Open");
              }}
              onBlur={() => {
                setHoverTarget(null);
                setHoverText(null);
              }}
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl backdrop-blur-xl transition-all duration-200
                text-stone-800 dark:text-white
                bg-white/90 dark:bg-[#031412]
                hover:bg-stone-100 dark:hover:bg-white/10
                border border-stone-200/60 dark:border-white/20
                shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300`}
            >
              <Menu className="w-4 h-4 md:w-5 md:h-5 text-stone-800 dark:text-white" />
            </button>

            <AnimatePresence>
              {hoverTarget === "menu" && hoverText && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.14 }}
                  className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap px-3 py-1 rounded-md bg-stone-900 text-white text-xs shadow-md"
                  aria-hidden
                >
                  {hoverText}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render via portal so it's not affected by parent layout or stacking
  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}