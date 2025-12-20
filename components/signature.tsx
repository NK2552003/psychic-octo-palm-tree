// components/Signature.tsx
"use client";

import { useEffect, useState } from "react";

export default function Signature() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="scale-70 h-[200px] sm:scale-30 origin-top-left transition-opacity duration-500">
      <svg 
        className="signature-svg"
        viewBox="0 0 160 60" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
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
  );
}