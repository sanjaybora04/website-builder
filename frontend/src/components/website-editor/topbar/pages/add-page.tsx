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
import { Page, Website } from "@/lib/types"


const formSchema = z.object({
    path: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string()
})

type formType = z.infer<typeof formSchema>

export default function PageForm({ data, onSubmit }: { data?: Page, onSubmit: (values: Page) => Promise<boolean> }) {
    // 1. Define your form.
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: data ? {
            path: data.path,
            title: data.title,
            description: data.description,
            image: data.image
        } : {
            path: "",
            title: "",
            description: "",
            image: ""
        },
    })

    async function handleSubmit(values: formType) {
        if (await onSubmit({...values,components:[]})) {
            form.reset()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="path"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Path</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter path of page" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title of page" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter seo description of page" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Social share image" {...field} />
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