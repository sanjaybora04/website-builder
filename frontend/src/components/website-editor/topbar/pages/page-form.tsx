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
import { Page } from "@/lib/types"
import { useAtom } from "jotai"
import { toast } from "sonner"
import FileSelector from "@/components/storage/fileSelector"
import { Trash2 } from "lucide-react"
import useWebsiteEditor from "@/hooks/use-website-editor"


const formSchema = z.object({
    path: z
        .string()
        .min(1, "Path is required")
        .regex(/^\/[a-zA-Z0-9\-_\/]*$/, "Path must start with '/' and contain valid characters"),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    components: z.array(z.any())
})

type formType = z.infer<typeof formSchema>

export default function PageForm({ data, onSubmit }: { data?: Page, onSubmit: (values: Page) => Promise<boolean> }) {
    const {websiteEditor} = useWebsiteEditor()
    // 1. Define your form.
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: data ? {
            path: data.path,
            title: data.title,
            description: data.description,
            image: data.image,
            components: data.components
        } : {
            path: "",
            title: "",
            description: "",
            image: "",
            components: []
        },
    })

    async function handleSubmit(values: formType) {
        // check if path already exists
        if (values.path != data?.path) {//if path is being edited or added
            if (websiteEditor?.website.pages?.some(p => p.path == values.path)) {
                return toast.error("Path already exists.\nPlease add a different path")
            }
        }
        if (await onSubmit({ ...values })) {
            // console.log('form submitted')
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
                                {/* <Input placeholder="Social share image" {...field} /> */}
                                {field.value ?
                                    <div className="relative">
                                        <img src={field.value} className="max-w-80 max-h-80 mx-auto" />
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

                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}