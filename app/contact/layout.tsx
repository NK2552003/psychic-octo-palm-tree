import type { Metadata } from "next";

export const metadata: Metadata = {"title": "Contact", "description": "Contact Nitish Kumar about web development, mobile applications, and creative projects.", "alternates": {"canonical": "https://nitishkr.fun/contact"}};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
