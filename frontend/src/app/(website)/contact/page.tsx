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
  name: z.string().min(1, "Name is required"),
  contact: z.string().min(1,"Contact Info is required"),
  message: z.string().min(1,"Message is required"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Page() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      contact: "",
      message: "",
    },
  })

  const onSubmit = (data: ContactFormData) => {
    axios.post("/api/contact", {
      name: data.name,
      contact: data.contact,
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
          <CardTitle className="text-2xl">
            Contact Us
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            We value your feedback and inquiries. Please fill out the form below to get in touch with us.
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
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Contact Info</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email/Phone" {...field} />
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
                      <FormLabel>Your message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your message"
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

    </main>
  )
}
