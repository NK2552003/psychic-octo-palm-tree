"use client"

import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"
import { useEffect, useState } from "react"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

export function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setCurrentTheme(isDark ? "dark" : "light")
    }

    // Initialize from DOM state
    updateTheme()

    // Listen to custom theme-toggled events (e.g., from FloatingControls / page toggle)
    window.addEventListener("theme-toggled", updateTheme)

    // Observe changes to <html> class attribute for instant reactive syncing
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      window.removeEventListener("theme-toggled", updateTheme)
      observer.disconnect()
    }
  }, [resolvedTheme])

  return (
    <SonnerToaster
      theme={currentTheme}
      position="top-right"
      richColors
      className="toaster group font-display"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg font-display",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "sonner-action-button font-medium transition-all duration-200",
          cancelButton:
            "sonner-cancel-button font-medium transition-all duration-200",
          closeButton:
            "sonner-close-button transition-all duration-200",
        },
      }}
      {...props}
    />
  )
}
