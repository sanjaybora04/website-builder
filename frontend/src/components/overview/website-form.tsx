"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Website } from "@/lib/types"

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    domain: z.string().min(1, { message: "Domain is required" }),
})

type FormType = z.infer<typeof formSchema>

export default function WebsiteForm({
    data,
    onSubmit,
}: {
    data?: Website
    onSubmit: (values: Website) => Promise<boolean>
}) {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: data
            ? {
                  name: data.name,
                  domain: data.domain,
              }
            : {
                  name: "",
                  domain: "",
              },
    })

    const [dnsStatus, setDnsStatus] = useState<"pending" | "valid" | "invalid" | "error" | null>(null)
    const [dnsRecords, setDnsRecords] = useState<string[] | null>(null)

    async function handleSubmit(values: FormType) {
        if (await onSubmit({ ...values })) {
            form.reset()
        }
    }

    async function checkDNS(domain: string) {
        setDnsStatus("pending")
        try {
            const res = await fetch(`/api/check-dns?domain=${domain}`)
            const json = await res.json()
            if (json.isCorrect) {
                setDnsStatus("valid")
            } else {
                setDnsStatus("invalid")
            }
            setDnsRecords(json.records)
        } catch (err) {
            setDnsStatus("error")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter website name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domain Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex. example.com" {...field} />
                            </FormControl>
                            <FormMessage />

                            <Button
                                type="button"
                                variant="secondary"
                                className="mt-2"
                                onClick={() => checkDNS(field.value)}
                            >
                                Check DNS
                            </Button>

                            {dnsStatus === "pending" && (
                                <p className="text-sm text-muted-foreground mt-2">Checking DNS...</p>
                            )}
                            {dnsStatus === "valid" && (
                                <p className="text-sm text-green-600 mt-2">✅ DNS is configured correctly!</p>
                            )}
                            {dnsStatus === "invalid" && (
                                <div className="text-sm text-red-600 mt-2">
                                    ❌ DNS not configured properly.
                                    <div className="text-xs text-muted-foreground mt-1">
                                        Please point your domain to <code>{process.env.NEXT_PUBLIC_SERVER_IP}</code> using an <b>A record</b>.
                                    </div>
                                    {dnsRecords && (
                                        <div className="mt-1 text-xs">
                                            <strong>Current A Records:</strong>{" "}
                                            {dnsRecords.join(", ")}
                                        </div>
                                    )}
                                </div>
                            )}
                            {dnsStatus === "error" && (
                                <p className="text-sm text-red-600 mt-2">⚠️ Error checking DNS. Try again later.</p>
                            )}
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
