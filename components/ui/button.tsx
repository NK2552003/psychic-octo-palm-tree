import React from "react"

export type ButtonVariant = "default" | "outline"
export type ButtonSize = "default" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-md transition-all"
    const variantClass =
      variant === "outline"
        ? "border border-current bg-transparent"
        : "bg-foreground text-background"

    const sizeClass =
      size === "lg" ? "px-6 py-3 text-base" : size === "icon" ? "p-2" : "px-4 py-2 text-sm"

    return (
      <button ref={ref} className={`${base} ${variantClass} ${sizeClass} ${className}`} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
