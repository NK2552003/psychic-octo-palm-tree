"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function FloatingControls({
  toggleTheme,
  isDark,
}: any) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowMenu(window.scrollY > window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const node = (
    <div
      className={`
        fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50
        flex items-center
        rounded-xl
        backdrop-blur-xl

        transition-all duration-500 ease-out
     px-1 py-1 gap-0
      `}
    >
      {/* THEME TOGGLE */}
      <button
        onClick={toggleTheme}
        className="
          w-8 h-8
          flex items-center justify-center
          rounded-xl
          transition-all duration-300
          hover:scale-110
          hover:bg-black/5 dark:hover:bg-white/10
          active:scale-95
        "
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg
            width="18"
            height="18"
            fill="currentColor"
            className="text-teal-300 drop-shadow-[0_0_6px_rgba(94,234,212,0.8)]"
          >
            <circle cx="9" cy="9" r="4" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-800"
          >
            <path d="M10 2a6 6 0 1 0 6 6A5 5 0 0 1 10 2z" />
          </svg>
        )}
      </button>


    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}