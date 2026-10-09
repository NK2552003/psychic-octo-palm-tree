import type { Metadata } from "next";

export const metadata: Metadata = {"title": "Pricing", "description": "Explore Nitish’s design and development services and project pricing.", "alternates": {"canonical": "https://nitishkr.fun/pricing"}};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
