import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Simple Portfolio',
  description: 'Continue to the accessible, simple portfolio.',
  robots: { index: false, follow: true },
};
export default function UnsupportedBrowserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
