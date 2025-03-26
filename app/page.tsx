"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Code,
  Smartphone,
  Zap,
  MessageSquare,
  CheckCircle,
  Sparkles,
  ChevronDown,
  Star,
  PenTool,
  Layers,
  Settings,
  Users,
  Moon,
  Sun,
  Play,
  Pause,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import TestimonialSlider from "@/components/testimonial-slider"
import PortfolioCard from "@/components/portfolio-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ProcessStep from "@/components/process-step"
import CounterSection from "@/components/counter-section"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        // Play returns a promise that might be rejected
        const playPromise = videoRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing video:", error)
              // Don't update state if play fails
            })
        }
      }
    }
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    const headerHeight = headerRef.current?.offsetHeight || 0

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={cn("flex min-h-screen flex-col", isDarkMode ? "dark bg-gray-950 text-gray-100" : "")}>
      {/* Navigation */}
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 w-full backdrop-blur transition-all duration-300",
          isScrolled
            ? isDarkMode
              ? "bg-gray-900/95 border-b border-gray-800 shadow-sm"
              : "bg-background/95 border-b shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-pulse-glow"></div>
              <Zap className="h-8 w-8 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift bg-300%">
              WebifyU
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="mr-2">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
            <Link
              href="https://tidycal.com/adityahjain10/30-minute-meeting"
              target="_blank"
              className="hidden md:inline-flex"
            >
              <Button className="relative overflow-hidden group">
                <span className="relative z-10">Book a Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </>
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isDarkMode ? "bg-gray-900 border-gray-800" : "bg-background border-border",
            mobileMenuOpen ? "max-h-[400px] py-4 border-b" : "max-h-0",
          )}
        >
          <nav className="container flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Link href="https://tidycal.com/adityahjain10/30-minute-meeting" target="_blank" className="py-2">
              <Button className="w-full">Book a Call</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div
            className={cn(
              "absolute inset-0",
              isDarkMode ? "bg-grid-pattern-dark bg-[size:30px_30px]" : "bg-grid-pattern bg-[size:30px_30px]",
            )}
          ></div>
          <div
            className={cn(
              "absolute inset-0",
              isDarkMode
                ? "bg-gradient-to-br from-primary/20 via-gray-950 to-gray-950"
                : "bg-gradient-to-br from-primary/10 via-background to-background",
            )}
          ></div>

          {/* Animated shapes */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="container relative z-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Premium Web Development Agency</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Turning Ideas Into</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift bg-300%">
                    Digital Reality
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  We craft cutting-edge websites that blend creativity, speed, and quality to elevate your brand's
                  online presence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="https://tidycal.com/adityahjain10/30-minute-meeting" target="_blank">
                    <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                      <span className="relative z-10">Book a Call</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto group"
                    onClick={() => scrollToSection("portfolio")}
                  >
                    View Our Work
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow opacity-70"></div>
                <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl">
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=800&width=800"
                      onEnded={() => setIsVideoPlaying(false)}
                      onCanPlay={() => videoRef.current?.pause()}
                      preload="metadata"
                      muted
                    >
                      <source src="/videos/darm-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={toggleVideo}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                    >
                      <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center">
                        {isVideoPlaying ? (
                          <Pause className="h-8 w-8 text-white" />
                        ) : (
                          <Play className="h-8 w-8 text-white ml-1" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-xl bg-gradient-to-r from-primary to-secondary p-1 shadow-xl animate-float">
                  <div
                    className={cn(
                      "h-full w-full rounded-lg flex items-center justify-center",
                      isDarkMode ? "bg-gray-900" : "bg-background",
                    )}
                  >
                    <Star className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className={cn("py-12 border-y", isDarkMode && "border-gray-800")}>
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-lg font-medium text-muted-foreground">Trusted by innovative companies across India</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative h-12 w-32 grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                >
                  <Image
                    src={`/placeholder.svg?height=100&width=200&text=Brand${i}`}
                    alt={`Brand ${i}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={cn("py-20", isDarkMode ? "bg-gray-900/50" : "bg-muted/30")}>
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Our Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Why Choose Us?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine technical expertise with creative design to deliver websites that stand out and perform.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div
                className={cn(
                  "rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden",
                  isDarkMode ? "bg-gray-900" : "bg-background",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  Fast Delivery
                </h3>
                <p className="text-muted-foreground">
                  We understand the importance of time. Our streamlined process ensures quick turnaround without
                  compromising quality.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">2-4 weeks delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Agile development process</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Regular progress updates</span>
                  </li>
                </ul>
              </div>
              <div
                className={cn(
                  "rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden",
                  isDarkMode ? "bg-gray-900" : "bg-background",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <PenTool className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors duration-300">
                  Custom Designs
                </h3>
                <p className="text-muted-foreground">
                  Every business is unique. We create tailor-made designs that reflect your brand identity and business
                  goals.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Unique brand-aligned designs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Modern UI/UX principles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Conversion-focused layouts</span>
                  </li>
                </ul>
              </div>
              <div
                className={cn(
                  "rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden",
                  isDarkMode ? "bg-gray-900" : "bg-background",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Smartphone className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  Responsive & SEO
                </h3>
                <p className="text-muted-foreground">
                  Our websites look great on all devices and are optimized for search engines to increase your online
                  visibility.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">Mobile-first approach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">SEO best practices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">Fast loading speeds</span>
                  </li>
                </ul>
              </div>
              <div
                className={cn(
                  "rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden",
                  isDarkMode ? "bg-gray-900" : "bg-background",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  Ongoing Support
                </h3>
                <p className="text-muted-foreground">
                  Our relationship doesn't end at launch. We provide continuous support to ensure your website evolves
                  with your business.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">30-day support included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Maintenance packages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Regular updates & backups</span>
                  </li>
                </ul>
              </div>
              <div
                className={cn(
                  "rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden",
                  isDarkMode ? "bg-gray-900" : "bg-background",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Layers className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors duration-300">
                  E-commerce Solutions
                </h3>
                <p className="text-muted-foreground">
                  Transform your business with powerful online stores that drive sales and provide seamless shopping
                  experiences.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">WooCommerce & Shopify</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Payment gateway integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Inventory management</span>
                  </li>
                </ul>
              </div>
              <div
                className={cn(
                  "rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden",
                  isDarkMode ? "bg-gray-900" : "bg-background",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  Custom Web Apps
                </h3>
                <p className="text-muted-foreground">
                  We build tailored web applications that automate processes and solve specific business challenges.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">React & Next.js development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">API integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm">Custom dashboards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Counter Section */}
        <CounterSection isDarkMode={isDarkMode} />

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Our Work</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Recent Projects</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Check out some of our recent projects that showcase our expertise and creativity.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <PortfolioCard
                title="Vista Modulars"
                description="Interior design firm & Modular furniture showroom in Bangalore & Yehalanka"
                image="/images/vista-modulars.jpg"
                url="https://vistamodulars.com"
                isDarkMode={isDarkMode}
              />
              <PortfolioCard
                title="Darm Ventures"
                description="Commercial Architecture & Interior firm in West Bengal Kolkata"
                image="/images/darm-ventures.jpg"
                url="https://darmventures.com"
                isDarkMode={isDarkMode}
              />
              <PortfolioCard
                title="Bhagwati Concepts"
                description="Premium Interior design and architecture firm in Delhi NCR"
                image="/images/bhagwati-concepts.jpg"
                url="https://bhagwaticoncepts.com"
                isDarkMode={isDarkMode}
              />
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">View All Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className={cn("py-20", isDarkMode ? "bg-gray-900/50" : "bg-muted/30")}>
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Our Process</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How We Work</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our proven development process ensures quality results and a smooth experience from start to finish.
              </p>
            </div>
            <div className="mt-16">
              <ProcessStep
                number={1}
                title="Discovery & Planning"
                description="We start by understanding your business, goals, and target audience to create a strategic plan."
                icon={<Users className="h-6 w-6" />}
                color="primary"
                isDarkMode={isDarkMode}
              />
              <ProcessStep
                number={2}
                title="Design & Prototyping"
                description="Our designers create wireframes and visual designs that align with your brand and business objectives."
                icon={<PenTool className="h-6 w-6" />}
                color="secondary"
                reverse
                isDarkMode={isDarkMode}
              />
              <ProcessStep
                number={3}
                title="Development"
                description="Our developers bring the designs to life with clean, efficient code and modern technologies."
                icon={<Code className="h-6 w-6" />}
                color="accent"
                isDarkMode={isDarkMode}
              />
              <ProcessStep
                number={4}
                title="Testing & Refinement"
                description="We thoroughly test across devices and browsers, making refinements to ensure everything works perfectly."
                icon={<Settings className="h-6 w-6" />}
                color="primary"
                reverse
                isDarkMode={isDarkMode}
              />
              <ProcessStep
                number={5}
                title="Launch & Support"
                description="After launch, we provide training and ongoing support to ensure your continued success."
                icon={<Zap className="h-6 w-6" />}
                color="secondary"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Testimonials</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">What Our Clients Say</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients across India have to say about working with us.
              </p>
            </div>
            <TestimonialSlider isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className={cn("py-20", isDarkMode ? "bg-gray-900/50" : "bg-muted/30")}>
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our web development services.
              </p>
            </div>
            <div className="max-w-3xl mx-auto mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does it take to build a website?</AccordionTrigger>
                  <AccordionContent>
                    Our typical timeline ranges from 2-6 weeks depending on the complexity and scope of your project.
                    Basic websites can be completed in 2 weeks, while more complex e-commerce sites or custom web
                    applications may take 4-6 weeks. We'll provide you with a specific timeline during our initial
                    consultation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do you provide website maintenance services?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer various maintenance packages to keep your website secure, updated, and performing
                    optimally. Our maintenance services include regular updates, security monitoring, backups,
                    performance optimization, and technical support. We recommend ongoing maintenance for all websites
                    to ensure they remain secure and up-to-date.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What is your payment structure?</AccordionTrigger>
                  <AccordionContent>
                    We typically require a 50% deposit to begin work, with the remaining 50% due upon project
                    completion. For larger projects, we may structure payments in three installments: 40% upfront, 30%
                    at the midpoint, and 30% upon completion. We accept payments via bank transfer, UPI, and major
                    credit cards.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Do you help with domain registration and hosting?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we can assist with domain registration and recommend reliable hosting solutions based on your
                    specific needs. We'll help you select the right hosting package that balances performance, security,
                    and cost. We can also handle the technical setup and configuration of your hosting environment.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can you redesign my existing website?</AccordionTrigger>
                  <AccordionContent>
                    We specialize in website redesigns that improve both aesthetics and performance. Our redesign
                    process begins with a thorough analysis of your current website to identify strengths, weaknesses,
                    and opportunities for improvement. We'll then create a modern, user-friendly design that better
                    serves your business goals while preserving your brand identity.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Do you provide content for the website?</AccordionTrigger>
                  <AccordionContent>
                    While we primarily focus on design and development, we can recommend professional copywriters who
                    specialize in creating engaging, SEO-friendly content for websites. For an additional fee, we can
                    coordinate content creation as part of your project to ensure a cohesive and compelling website.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={cn(
            "py-20 relative overflow-hidden",
            isDarkMode
              ? "bg-gradient-to-br from-primary/20 via-gray-950 to-gray-950"
              : "bg-gradient-to-br from-primary/10 via-background to-background",
          )}
        >
          <div
            className={cn(
              "absolute inset-0",
              isDarkMode ? "bg-grid-pattern-dark bg-[size:30px_30px]" : "bg-grid-pattern bg-[size:30px_30px]",
            )}
          ></div>
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl"></div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Ready to Transform Your Online Presence?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's create something amazing together. Book a free consultation call today and take the first step
                towards a website that truly represents your brand.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="https://tidycal.com/adityahjain10/30-minute-meeting" target="_blank">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                    <span className="relative z-10">Book a Free Consultation</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                  Let's Create Something Amazing Together
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to elevate your online presence? Get in touch with us today to discuss your project.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">+91 86053 21365</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Adityahjain10@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Koramangala, Bangalore, India</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="https://tidycal.com/adityahjain10/30-minute-meeting" target="_blank">
                    <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                      <span className="relative z-10">Book a Call</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur-md"></div>
                <div className={cn("p-8 rounded-lg shadow-lg relative", isDarkMode ? "bg-gray-900" : "bg-background")}>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <Input id="phone" placeholder="Your phone number" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Tell us about your project" rows={4} />
                    </div>
                    <Button type="submit" className="w-full group relative overflow-hidden">
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={cn("border-t py-12", isDarkMode ? "bg-gray-900/50 border-gray-800" : "bg-muted/30")}>
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-pulse"></div>
                  <Zap className="h-8 w-8 text-primary relative z-10" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift bg-300%">
                  WebifyU
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                We craft cutting-edge websites that blend creativity, speed, and quality to elevate your brand's online
                presence.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Website Design
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    E-commerce Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Custom Web Applications
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    SEO Optimization
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Website Maintenance
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("process")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("portfolio")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Our Work
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={cn(
              "border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4",
              isDarkMode ? "border-gray-800" : "",
            )}
          >
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} WebifyU. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Designed and developed with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

