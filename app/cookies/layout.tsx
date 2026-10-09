import type { Metadata } from "next";

export const metadata: Metadata = {"title": "Cookie Policy", "description": "Cookie preferences and local storage used by this portfolio.", "alternates": {"canonical": "https://nitishkr.fun/cookies"}};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
