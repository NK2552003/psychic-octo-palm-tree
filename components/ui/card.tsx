import React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  // Minimal, theme-agnostic card wrapper. Consumers can override styling via `className`.
  return (
    <div
      {...props}
      className={`rounded-md shadow-sm bg-transparent overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
