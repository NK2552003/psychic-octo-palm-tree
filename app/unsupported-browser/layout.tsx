import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsupported Browser",
  description: "Safari is not supported. Please use Chrome, Firefox, Brave, or Edge.",
};

export default function UnsupportedBrowserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
