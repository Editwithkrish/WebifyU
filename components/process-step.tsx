import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  icon: ReactNode
  color: "primary" | "secondary" | "accent"
  reverse?: boolean
  isDarkMode?: boolean
}

export default function ProcessStep({
  number,
  title,
  description,
  icon,
  color,
  reverse = false,
  isDarkMode = false,
}: ProcessStepProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/30",
    secondary: "bg-secondary/10 text-secondary border-secondary/30",
    accent: "bg-accent/10 text-accent border-accent/30",
  }

  return (
    <div className={cn("flex items-center gap-8 mb-16 relative", reverse && "flex-row-reverse")}>
      {/* Connector line */}
      {number < 5 && (
        <div
          className={cn(
            "absolute top-16 bottom-0 w-0.5 bg-gradient-to-b",
            color === "primary" && "from-primary/50 to-transparent",
            color === "secondary" && "from-secondary/50 to-transparent",
            color === "accent" && "from-accent/50 to-transparent",
            reverse ? "right-12" : "left-12",
          )}
        ></div>
      )}

      {/* Number and icon */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={cn(
            "h-24 w-24 rounded-full flex items-center justify-center text-3xl font-bold border-2",
            colorClasses[color],
          )}
        >
          {number}
        </div>
        <div className={cn("h-12 w-12 rounded-full flex items-center justify-center mt-4 border", colorClasses[color])}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "rounded-xl p-6 shadow-md max-w-lg",
          reverse ? "text-right" : "text-left",
          isDarkMode ? "bg-gray-900" : "bg-background",
        )}
      >
        <h3
          className={cn(
            "text-xl font-bold mb-2",
            color === "primary" && "text-primary",
            color === "secondary" && "text-secondary",
            color === "accent" && "text-accent",
          )}
        >
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

