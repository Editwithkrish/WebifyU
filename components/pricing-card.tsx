import { Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-background p-6 shadow-md transition-all duration-300 hover:shadow-xl",
        popular && "border-primary/50 shadow-lg",
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </div>
      )}
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {!price.includes("+") && <span className="text-muted-foreground"> /project</span>}
      </div>
      <p className="mb-6 text-muted-foreground">{description}</p>
      <Link href="https://tidycal.com/adityahjain10/30-minute-meeting" target="_blank" className="block mb-6">
        <Button
          className={cn(
            "w-full group relative overflow-hidden",
            popular ? "" : "bg-muted hover:bg-muted/80 text-foreground",
          )}
          variant={popular ? "default" : "outline"}
        >
          <span className="relative z-10">{buttonText}</span>
          {popular && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </Button>
      </Link>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className={cn("h-5 w-5 shrink-0 mt-0.5", popular ? "text-primary" : "text-muted-foreground")} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

