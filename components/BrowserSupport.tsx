"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isSafari, isMacOS } from "@/lib/deviceDetection";

export default function BrowserSupport() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Only the animated home page needs this compatibility fallback.
    // Never trap visitors in a redirect loop or block supporting pages.
    if (pathname === "/" && isSafari() && isMacOS()) router.replace("/simple");
  }, [router, pathname]);
  return null;
}
