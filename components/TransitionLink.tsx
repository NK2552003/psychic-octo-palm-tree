"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { triggerRouteTransition } from "@/lib/shutter-transition";

type HrefType = string | { pathname: string; query?: Record<string, string | number | undefined> };

export default function TransitionLink({ 
  href, 
  children, 
  className,
  style,
  onClick,
  title,
  "aria-label": ariaLabel,
  target,
  rel,
}: { 
  href: HrefType; 
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  title?: string;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}) {
  const router = useRouter();

  const resolvedHref = typeof href === "string" 
    ? href 
    : `${href.pathname}${href.query ? `?${new URLSearchParams(Object.entries(href.query).filter(([_, v]) => v !== undefined).map(([k, v]) => [k, String(v)])).toString()}` : ""}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's a modified click (new tab, new window, etc.) or external link, let browser handle normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === "_blank") {
      if (onClick) onClick(e);
      return;
    }

    if (resolvedHref.startsWith("http://") || resolvedHref.startsWith("https://") || resolvedHref.startsWith("mailto:") || resolvedHref.startsWith("//")) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);

    const isSamePage = resolvedHref === window.location.pathname || resolvedHref.startsWith(window.location.pathname + '#') || (resolvedHref.startsWith('#') && !resolvedHref.startsWith('#/'));

    triggerRouteTransition(() => {
      router.push(resolvedHref);
    }, isSamePage);
  };

  return (
    <a 
      href={resolvedHref} 
      onClick={handleClick} 
      className={className} 
      style={style}
      title={title}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
