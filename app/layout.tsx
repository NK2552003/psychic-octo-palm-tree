import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google"
import "./globals.scss"
import AppInitializer from "../components/AppInitializer"
import DoodleOverlay from "@/components/DoodleOverlay"
import { Toaster } from "sonner"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nitishkr.fun"),
  title: {
    default: "Nitish - Developer & Photographer",
    template: "%s | Nitish",
  },
  description:
    "Full-Stack Developer, Photographer, and Undergraduate Student crafting digital experiences through code and lens.",
  generator: "v0.app",
  applicationName: "Nitish - Developer & Photographer",
  authors: [{ name: "Nitish", url: "https://nitishkr.fun" }],
  keywords: ["Full-Stack Developer", "Photographer", "Portfolio", "Nitish"],
  alternates: {
    canonical: "https://nitishkr.fun",
  },
  openGraph: {
    title: "Nitish - Developer & Photographer",
    description:
      "Full-Stack Developer, Photographer, and Undergraduate Student crafting digital experiences through code and lens.",
    url: "https://nitishkr.fun/",
    siteName: "Nitish",
    images: [
      {
        url: new URL("/profile.jpg", "https://nitishkr.fun").toString(),
        width: 1200,
        height: 630,
        alt: "Nitish — Developer & Photographer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish - Developer & Photographer",
    description:
      "Full-Stack Developer, Photographer, and Undergraduate Student crafting digital experiences through code and lens.",
    images: [new URL("/profile.jpg", "https://nitishkr.fun").toString()],
  },
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.svg",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const ldJson = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Nitish",
      "url": "https://nitishkr.fun",
      "jobTitle": "Full-Stack Developer & Photographer",
      "description": "Full-Stack Developer, Photographer, and Undergraduate Student crafting digital experiences through code and lens.",
      "sameAs": [
        "https://github.com/nk2552003",
        "https://www.linkedin.com/in/nk2552003/",
        "https://www.instagram.com/natur_hacks/",
        "https://uiverse.io/nk2552003"
      ],
      "image": new URL('/profile.jpg', 'https://nitishkr.fun').toString()
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://nitishkr.fun",
      "name": "Nitish - Developer & Photographer",
      "publisher": {
        "@type": "Organization",
        "name": "Nitish",
        "logo": new URL('/apple-icon.png', 'https://nitishkr.fun').toString()
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://nitishkr.fun/?s={search_term}",
        "query-input": "required name=search_term"
      }
    }
  ]

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="canonical" href="https://nitishkr.fun" />
        <link rel="alternate" hrefLang="en-US" href="https://nitishkr.fun/" />
        <link rel="alternate" hrefLang="en" href="https://nitishkr.fun/" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nitish" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <meta name="description" content="Full-Stack Developer & Photographer — portfolio site showcasing projects, photography and contact information." />
        <meta name="author" content="Nitish" />
        <meta name="keywords" content="Full-Stack Developer, Photographer, Portfolio, Web Developer, React, Next.js, TypeScript, Photography, UI/UX, Frontend Developer, Backend Developer, JAMstack, Portfolio site, Personal website" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="rating" content="general" />
        <meta name="publisher" content="Nitish" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nitish - Developer & Photographer" />
        <meta property="og:description" content="Full-Stack Developer, Photographer, and Undergraduate Student crafting digital experiences through code and lens." />
        <meta property="og:url" content="https://nitishkr.fun/" />
        <meta property="og:image" content={new URL('/profile.jpg','https://nitishkr.fun').toString()} />
        <meta property="og:image:alt" content="Nitish — Developer & Photographer" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nk2552003" />
        <meta name="twitter:creator" content="@nk2552003" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      </head>
      <body className="font-display antialiased relative">
        <DoodleOverlay />
        <AppInitializer>{children}</AppInitializer>
        <Toaster 
          position="top-right" 
          richColors
          toastOptions={{
            style: {
              background: 'var(--background)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
            className: 'font-display',
          }}
        />
      </body>
    </html>
  )
}
