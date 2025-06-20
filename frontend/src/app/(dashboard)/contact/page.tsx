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
import { CheckCircle, Mail, Send } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import axios from "axios"

const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Page() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = (data: ContactFormData) => {
    axios.post("/api/contact", {
      name: data.name,
      email: data.email,
      message: data.message,
      referrerUrl: document.referrer || "Direct",
      sourceUrl: window.location.href || "Unknown",
    })
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
                          placeholder="Share your experience with SiteCraft..."
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
                  Submit
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      <section className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-4">Join our community</h3>
        <p className="text-muted-foreground mb-2">Connect with other users on:</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://reddit.com/r/SiteCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            <img src="/images/reddit.png" className="w-6 h-6" />
          </a>
          <a
            href="https://chat.whatsapp.com/Kge9YOIGdmz1k0BjAofvpP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            <img src="/images/whatsapp.png" className="h-6 w-6" />
          </a>
        </div>
      </section>

      <section className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Prefer email?</h3>
        <p className="text-muted-foreground text-sm">
          You can also reach us at{" "}
          <a
            href="mailto:contact@sitecraft.in"
            className="text-blue-600 underline"
          >
            <Mail className="inline mx-1 w-5 h-5"/>
            contact@sitecraft.in
          </a>
        </p>
      </section>

    </main>
  )
}
