"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  company: string
  quote: string
  avatar: string
  location: string
  projectImage: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Sharma",
    company: "Tech Innovations Pvt Ltd",
    location: "Mumbai",
    quote:
      "WebifyU transformed our outdated website into a modern, user-friendly platform that perfectly represents our brand. The team was responsive, creative, and delivered ahead of schedule. Our conversion rate has increased by 40% since the launch!",
    avatar: "/placeholder.svg?height=100&width=100&text=RS",
    projectImage: "/placeholder.svg?height=300&width=500&text=Tech+Innovations+Website",
  },
  {
    id: 2,
    name: "Priya Patel",
    company: "Spice Route Restaurants",
    location: "Delhi",
    quote:
      "As a restaurant chain, we needed a website that would showcase our food and allow for easy online ordering. WebifyU delivered exactly that and more. Their attention to detail and strategic approach to design helped us increase our online orders by 65%.",
    avatar: "/placeholder.svg?height=100&width=100&text=PP",
    projectImage: "/placeholder.svg?height=300&width=500&text=Spice+Route+Website",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    company: "Global Textiles Ltd",
    location: "Ahmedabad",
    quote:
      "We've worked with several web developers in the past, but none have matched the quality and service provided by WebifyU. They truly understand how to create websites that not only look great but also convert visitors into customers.",
    avatar: "/placeholder.svg?height=100&width=100&text=VM",
    projectImage: "/placeholder.svg?height=300&width=500&text=Global+Textiles+Website",
  },
  {
    id: 4,
    name: "Ananya Desai",
    company: "Wellness Yoga Studio",
    location: "Bangalore",
    quote:
      "The team at WebifyU created a beautiful website for our yoga studio that perfectly captures our peaceful and welcoming atmosphere. The class booking system they implemented has streamlined our operations and improved the experience for our students.",
    avatar: "/placeholder.svg?height=100&width=100&text=AD",
    projectImage: "/placeholder.svg?height=300&width=500&text=Wellness+Yoga+Website",
  },
  {
    id: 5,
    name: "Suresh Reddy",
    company: "Innovative Solutions",
    location: "Hyderabad",
    quote:
      "WebifyU's expertise in web development is unmatched. They created a custom web application for our business that has automated many of our processes and saved us countless hours. Their ongoing support has been exceptional.",
    avatar: "/placeholder.svg?height=100&width=100&text=SR",
    projectImage: "/placeholder.svg?height=300&width=500&text=Innovative+Solutions+Website",
  },
]

export default function TestimonialSlider({ isDarkMode = false }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  const goToPrevious = () => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-5xl mx-auto">
      <div
        className={cn(
          "overflow-hidden relative rounded-xl p-8 shadow-lg",
          isDarkMode ? "bg-gray-900" : "bg-background",
        )}
      >
        <div
          className={cn(
            "transition-transform duration-500 ease-in-out flex",
            isAnimating && direction === "right" && "-translate-x-[100%]",
            isAnimating && direction === "left" && "translate-x-[100%]",
          )}
        >
          <div className="min-w-full">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={testimonials[currentIndex].projectImage || "/placeholder.svg"}
                  alt={`${testimonials[currentIndex].company} Website`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-sm font-medium">{testimonials[currentIndex].company}</div>
                  <div className="text-white/80 text-xs">{testimonials[currentIndex].location}</div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-6 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
                <p className="text-lg md:text-xl italic mb-6">"{testimonials[currentIndex].quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" onClick={goToPrevious} disabled={isAnimating} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30",
              )}
              onClick={() => {
                if (isAnimating) return
                setDirection(index > currentIndex ? "right" : "left")
                setIsAnimating(true)
                setCurrentIndex(index)
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={goToNext} disabled={isAnimating} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}

