import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    name: z.string().min(1, { message: "Name is required", }),
    domain: z.string(),
})

type formType = z.infer<typeof formSchema>

export default function WebsiteForm({ data, onSubmit }: { data?: Website, onSubmit: (values: Website) => Promise<boolean> }) {
    // 1. Define your form.
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: data ? {
            name: data.name,
            domain: data.domain,
        } : {
            name: "",
        },
    })

    async function handleSubmit(values: formType) {
        if (await onSubmit({ ...values })) {
            form.reset()
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
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}