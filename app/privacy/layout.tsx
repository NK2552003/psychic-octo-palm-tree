import type { Metadata } from "next";

export const metadata: Metadata = {"title": "Privacy Policy", "description": "How this portfolio handles your data and privacy.", "alternates": {"canonical": "https://nitishkr.fun/privacy"}};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
