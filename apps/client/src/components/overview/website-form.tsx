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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Website } from "@/lib/types"
import { templates } from "@/lib/templates"
import { ArrowUpRight, Trash2 } from "lucide-react"
import Link from "next/link"
import Routes from "@/lib/routes"
import FileSelector from "../storage/fileSelector"
import useAuth from "@/hooks/use-auth"

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    favicon: z.string(),
    domain: z
        .string()
        .trim()
        .min(1, "Domain is required")
        .regex(
            /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
            "Invalid domain format"
        ),
    pages: z.array(z.any())
})

type FormType = z.infer<typeof formSchema>

export default function WebsiteForm({
    data,
    onSubmit,
    hideFavicon
}: {
    data?: Website
    onSubmit: (values: Website) => any
    hideFavicon?: boolean
}) {
    const { user } = useAuth()

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: data
            ? {
                name: data.name,
                domain: data.domain,
                favicon: data.favicon,
                pages: data.pages
            }
            : templates.find(t => t.name === "Blank")?.website
    })

    const [dnsStatus, setDnsStatus] = useState<"pending" | "valid" | "invalid" | "error" | null>(null)
    const [dnsRecords, setDnsRecords] = useState<string[] | null>(null)
    const [domainType, setDomainType] = useState<"subdomain" | "custom">(!data?.domain || data?.domain?.endsWith(process.env.NEXT_PUBLIC_BASE_DOMAIN!) ? "subdomain" : "custom")

    async function handleSubmit(values: FormType) {
        await onSubmit({ ...values })
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

                {!hideFavicon &&
                    <FormField
                        control={form.control}
                        name="favicon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Favicon</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Social share image" {...field} /> */}
                                    {field.value ?
                                        <div className="relative my-2">
                                            <img src={field.value} className="rounded-full w-14 h-14" />
                                            <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                                                onClick={() => {
                                                    field.onChange('')
                                                }}
                                            ><Trash2 /></Button>
                                        </div> :
                                        <div className="flex items-center gap-2">
                                            <FileSelector onSelect={(url: string) => field.onChange(url)} />
                                        </div>
                                    }
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }

                <Tabs value={domainType} onValueChange={(val) => { form.setValue('domain', ''); setDomainType(val as "subdomain" | "custom") }}>
                    <TabsList>
                        <TabsTrigger value="subdomain">Subdomain (Free)</TabsTrigger>
                        <TabsTrigger value="custom">
                            Custom Domain
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="subdomain">
                        <FormField
                            control={form.control}
                            name="domain"
                            render={({ field }) => {
                                const prefix = field.value?.split(".")[0] || ""

                                return (
                                    <FormItem>
                                        <FormLabel>Subdomain</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center">
                                                <Input
                                                    placeholder="Subdomain"
                                                    value={prefix}
                                                    onChange={(e) => {
                                                        const newPrefix = e.target.value.replace(/\s+/g, "").toLowerCase()
                                                        field.onChange(`${newPrefix}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`)
                                                    }}
                                                    className="w-1/2"
                                                />
                                                <span className="ml-2 text-muted-foreground">.{process.env.NEXT_PUBLIC_BASE_DOMAIN}</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </TabsContent>


                    <TabsContent value="custom">
                        {user?.plan != 'PRO' ?
                            <div className="text-sm text-muted-foreground py-5 text-center">
                                <p className="mb-2 text-destructive-foreground">Custom domain support is not available on free plan.</p>
                                <Button asChild>
                                    <Link href={Routes.pricing}>
                                        Upgrade<ArrowUpRight />
                                    </Link>
                                </Button>
                            </div> :
                            <FormField
                                control={form.control}
                                name="domain"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom Domain</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example.com" {...field}
                                                onChange={e => field.onChange(e.target.value.toLowerCase())}
                                            />
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
                                                        <strong>Current A Records:</strong> {dnsRecords.join(", ")}
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
                        }
                    </TabsContent>
                </Tabs>

                <Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}
