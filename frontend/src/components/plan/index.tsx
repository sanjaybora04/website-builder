"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Minus, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const plans = {
  monthly: [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for hobby projects and testing.",
      features: {
        websites: "5",
        storage: "100MB",
        support: "Community only",
        branding: false,
        customDomain: false,
      },
      comingSoon: false,
    },
    {
      name: "Pro",
      price: "₹200",
      description: "For freelancers and solo makers.",
      features: {
        websites: "5",
        storage: "1GB",
        support: "Email",
        branding: true,
        customDomain: true,
      },
      comingSoon: true,
    },
    {
      name: "Agency",
      price: "₹1000",
      description: "Best for small agencies and teams.",
      features: {
        websites: "20",
        storage: "5GB",
        support: "Priority",
        branding: true,
        customDomain: true,
      },
      comingSoon: true,
    },
  ],
}

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false)
  const activePlans = plans.monthly // Only one plan tier right now

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Choose your plan</h1>
            <p className="text-muted-foreground">Upgrade as you grow.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="billing">Monthly</Label>
            <Switch id="billing" checked={isYearly} onCheckedChange={setIsYearly} disabled />
            <Label htmlFor="billing" className="opacity-50">Yearly</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePlans.map((plan, i) => {
            const isFree = plan.name === "Free"
            return (
              <Card key={i} className="relative flex flex-col">
                {plan.comingSoon && (
                  <div className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Coming Soon
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <p className="text-4xl font-bold mt-4">{plan.price}</p>
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

                  {plan.comingSoon ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button disabled className="w-full mt-6 opacity-60 cursor-not-allowed">Coming Soon</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This plan is launching soon. Stay tuned!</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button className="w-full mt-6">{isFree ? "Currently Active" : "Upgrade"}</Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
