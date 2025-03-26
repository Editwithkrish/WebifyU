"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Clock, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface CounterItemProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  color: "primary" | "secondary" | "accent"
  delay?: number
  isDarkMode?: boolean
}

function CounterItem({ icon, value, label, suffix = "", color, delay = 0, isDarkMode = false }: CounterItemProps) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const duration = 2000
      const increment = value / (duration / 16)
      let currentCount = 0

      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, 16)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, value, delay])

  return (
    <div ref={counterRef} className="text-center">
      <div
        className={cn(
          "h-16 w-16 rounded-full mx-auto flex items-center justify-center mb-4",
          color === "primary" && "bg-primary/10",
          color === "secondary" && "bg-secondary/10",
          color === "accent" && "bg-accent/10",
        )}
      >
        <div className={colorClasses[color]}>{icon}</div>
      </div>
      <div className={cn("text-4xl font-bold mb-2", colorClasses[color])}>
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

export default function CounterSection({ isDarkMode = false }) {
  return (
    <section className={cn("py-16 border-y", isDarkMode ? "border-gray-800" : "")}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CounterItem
            icon={<Users className="h-8 w-8" />}
            value={60}
            label="Happy Clients"
            suffix="+"
            color="primary"
            delay={0}
            isDarkMode={isDarkMode}
          />
          <CounterItem
            icon={<Zap className="h-8 w-8" />}
            value={95}
            label="Projects Completed"
            suffix="+"
            color="secondary"
            delay={200}
            isDarkMode={isDarkMode}
          />
          <CounterItem
            icon={<Clock className="h-8 w-8" />}
            value={3}
            label="Years Experience"
            suffix="+"
            color="accent"
            delay={400}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </section>
  )
}

