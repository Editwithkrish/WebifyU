"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioCardProps {
  title: string
  description: string
  image: string
  url: string
  isDarkMode?: boolean
}

export default function PortfolioCard({ title, description, image, url, isDarkMode = false }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={cn("object-cover transition-transform duration-500", isHovered && "scale-110")}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
          )}
        >
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 mb-4">{description}</p>
            <Link
              href={url}
              target="_blank"
              className="inline-flex items-center text-white bg-primary/90 hover:bg-primary px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Visit Website
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className={cn("p-4 md:p-6", isDarkMode ? "bg-gray-900" : "bg-background")}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

