"use client"

import { useState } from "react"
import { Check, Minus, MessageCircle, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import Routes from "@/lib/routes"
import useAuth from "@/hooks/use-auth"

const plans = [
  {
    name: "Free",
    price: { monthly: "₹0", yearly: "₹0" },
    description: "Perfect for hobby projects and testing.",
    features: {
      websites: "5",
      storage: "100MB",
      support: "Community only",
      branding: false,
      customDomain: false,
    },
  },
  {
    name: "Pro",
    price: { monthly: "₹200", yearly: "₹2,000" },
    description: "For freelancers and solo makers.",
    features: {
      websites: "5",
      storage: "1GB",
      support: "Email",
      branding: true,
      customDomain: true,
    },
  },
  {
    name: "Agency",
    price: { monthly: "₹1000", yearly: "₹10,000" },
    description: "Best for small agencies and teams.",
    features: {
      websites: "20",
      storage: "5GB",
      support: "Priority",
      branding: true,
      customDomain: true,
    },
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">

      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple pricing for all builders</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you&apos;re a hobbyist, freelancer, or agency — get started for free or upgrade anytime.
        </p>
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium">
          <Rocket className="h-4 w-4" /> We’re now live! Choose your plan below.
        </div>
      </section>

      {/* Pricing Switcher */}
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Plans</h2>
          <p className="text-muted-foreground">Upgrade as your needs grow</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing">Monthly</Label>
          <Switch id="billing" checked={isYearly} onCheckedChange={setIsYearly} />
          <Label htmlFor="billing">Yearly</Label>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-muted-foreground">{plan.description}</p>
              <p className="text-4xl font-bold mt-4">
                {isYearly ? plan.price.yearly : plan.price.monthly}
                <span className="text-base font-medium text-muted-foreground ml-1">
                  /{isYearly ? "year" : "month"}
                </span>
              </p>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />{plan.features.websites} Websites</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />{plan.features.storage} Storage</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" />{plan.features.support} Support</li>
                <li className="flex items-center">
                  {plan.features.customDomain ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Minus className="h-4 w-4 mr-2 text-gray-400" />}
                  Custom Domain
                </li>
                <li className="flex items-center">
                  {plan.features.branding ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Minus className="h-4 w-4 mr-2 text-gray-400" />}
                  Remove Branding
                </li>
              </ul>
              <Button className="w-full mt-6" asChild>
                {plan.name === "Free" ? (
                  user ? (
                    <Link href={Routes.overview}>Get Started</Link>
                  ) : (
                    <label htmlFor="signin">Get Started</label>
                  )
                ) : (
                  <Link href={`${Routes.contact}?plan=${plan.name.toLowerCase()}`}>
                    Contact us to upgrade
                  </Link>
                )}
              </Button>

            </CardContent>
          </Card>
        ))}
      </section>

      {/* Why Us */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Why choose us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 border rounded-xl shadow-sm space-y-2">
            <h3 className="text-xl font-semibold">Fast setup</h3>
            <p className="text-muted-foreground">Create websites in minutes with our intuitive builder.</p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm space-y-2">
            <h3 className="text-xl font-semibold">Customizable</h3>
            <p className="text-muted-foreground">Use powerful components to match your unique style and brand.</p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm space-y-2">
            <h3 className="text-xl font-semibold">Affordable</h3>
            <p className="text-muted-foreground">Generous free plan with transparent, predictable pricing.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="1">
            <AccordionTrigger>Is the tool free forever?</AccordionTrigger>
            <AccordionContent>
              Yes! The free plan will remain free forever. Paid plans offer extra features for power users.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>How can I give feedback?</AccordionTrigger>
            <AccordionContent>
              We love feedback! Scroll down to the support section and let us know how we can improve.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>Do I need to add a credit card?</AccordionTrigger>
            <AccordionContent>
              Nope. You can start using the free plan immediately—no credit card required.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Support & Feedback */}
      <section className="bg-muted py-12 rounded-xl text-center space-y-4">
        <h2 className="text-2xl font-bold">Need help or want to share feedback?</h2>
        <p className="text-muted-foreground">We&apos;re constantly improving. Reach out and help shape the future of this tool.</p>
        <Button variant="outline" size="lg" asChild>
          <Link href={Routes.contact}>
            <MessageCircle className="h-4 w-4 mr-2" /> Contact Support
          </Link>
        </Button>
      </section>

    </div>
  )
}
