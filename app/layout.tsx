import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google"
import "./globals.scss"
import AppInitializer from "../components/AppInitializer"

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
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <body className="font-display antialiased">
        <AppInitializer>{children}</AppInitializer>
      </body>
    </html>
  )
}
