"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Send } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const feedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FeedbackFormData = z.infer<typeof feedbackSchema>

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = (data: FeedbackFormData) => {
    console.log("Feedback submitted:", data)
    // TODO: send to backend or 3rd party service
    setSubmitted(true)
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">We’d love your feedback</CardTitle>
          <p className="text-muted-foreground text-sm">
            Help us improve the builder. Share what you love or what could be better.
          </p>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center space-y-4 py-8">
              <CheckCircle className="text-green-500 w-8 h-8" />
              <h2 className="text-lg font-semibold">Thank you!</h2>
              <p className="text-muted-foreground text-center text-sm">
                Your feedback helps shape the future of this product.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email (optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your experience with the builder..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
