"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function MenuOverlay({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const node = (
    <div
      onClick={close}
      className={`fixed inset-0 z-40 bg-black/40 transition backdrop-blur-xl ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <nav
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center h-full gap-6 text-4xl font-bold text-white"
      >
        {[
          "About",
          "Skills",
          "Projects",
          "Photography",
          "Experience",
          "Contact",
        ].map((item) => (
          <Link key={item} href="/" className="menu-link">
            {item}
          </Link>
        ))}
      </nav>
    </div>
  );

  if (typeof document === "undefined") return null;
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    const origTouch = document.body.style.touchAction;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = origOverflow || "";
      document.body.style.touchAction = origTouch || "";
    }

    return () => {
      document.body.style.overflow = origOverflow || "";
      document.body.style.touchAction = origTouch || "";
    };
  }, [open]);

  return createPortal(node, document.body);
}
