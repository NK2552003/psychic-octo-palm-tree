import type { Metadata } from "next";

export const metadata: Metadata = {"title": "How I Work", "description": "How Nitish plans, designs, builds, and delivers projects.", "alternates": {"canonical": "https://nitishkr.fun/process"}};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
