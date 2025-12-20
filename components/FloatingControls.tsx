"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function FloatingControls({
  toggleTheme,
  isDark,
  toggleMenu,
  menuOpen,
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
        rounded-full
        backdrop-blur-xl

        transition-all duration-500 ease-out
        ${showMenu ? "px-1.5 py-1.5 md:px-2 md:py-2 gap-1" : "px-1 py-1 gap-0"}
      `}
    >
      {/* THEME TOGGLE */}
      <button
        onClick={toggleTheme}
        className="
          w-8 h-8 md:w-10 md:h-10
          flex items-center justify-center
          rounded-full
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

      {/* EXPANDING MENU */}
      <div
        className={`
          flex items-center overflow-hidden
          transition-all duration-500 ease-out
          ${showMenu ? "max-w-[120px] opacity-100 ml-1" : "max-w-0 opacity-0 ml-0"}
        `}
      >
        {/* DIVIDER */}
        <span
          className={`
            w-px h-6 bg-black/10 dark:bg-white/20
            transition-all duration-300
            ${showMenu ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}
          `}
        />

        {/* MENU BUTTON */}
        <button
          onClick={toggleMenu}
          className={`
            relative w-8 h-8 md:w-10 md:h-10 ml-1
            flex flex-col items-center justify-center
            rounded-full
            transition-all duration-300 ease-out
            hover:bg-black/5 dark:hover:bg-white/10
            active:scale-95

            ${showMenu
              ? "scale-100 opacity-100 blur-0"
              : "scale-75 opacity-0 blur-sm"}
          `}
          aria-label="Toggle menu"
        >
          <span
            className={`
              w-5 h-[2px] md:w-6 bg-current rounded
              transition-all duration-300
              ${menuOpen ? "rotate-45 translate-y-[5px] md:translate-y-[6px]" : ""}
            `}
          />
          <span
            className={`
              w-5 h-[2px] md:w-6 bg-current rounded my-1
              transition-all duration-300
              ${menuOpen ? "opacity-0 scale-0" : ""}
            `}
          />
          <span
            className={`
              w-5 h-[2px] md:w-6 bg-current rounded
              transition-all duration-300
              ${menuOpen ? "-rotate-45 -translate-y-[5px] md:-translate-y-[6px]" : ""}
            `}
          />
        </button>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}