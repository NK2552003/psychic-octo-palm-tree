import type { Metadata } from "next";

export const metadata: Metadata = {"robots": {"index": false, "follow": true},"title": "Recover Access", "description": "Recover access to the portfolio or continue to its simple view.", "alternates": {"canonical": "https://nitishkr.fun/error-recovery"}};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
