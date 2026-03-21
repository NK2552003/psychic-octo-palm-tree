"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { isSafari, isMacOS } from "@/lib/deviceDetection";

export default function BrowserSupport() {
  const router = useRouter();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (redirectedRef.current) return;

    const checkBrowser = () => {
      if (isSafari() && isMacOS()) {
        redirectedRef.current = true;
        router.replace("/unsupported-browser");
      }
    };

    checkBrowser();
  }, [router]);

  return null;
}
