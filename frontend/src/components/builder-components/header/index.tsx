import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import Sidebar from "./sidebar"

type HeaderType = {
    title?: string,
    links?: {
        index: number,
        label: string,
        href: string
    }[]
}

export function Component({ config }: { config: HeaderType }) {
    return (
        <>
            <div className="h-20"></div>
            <div className="fixed top-0 left-0 w-screen h-20 flex items-center justify-between gap-5  px-4 sm:px-10 md:px-20 bg-white border-b border-black shadow">
                <div className="text-xl font-semibold font-raleway">{config.title}</div>
                <div className="hidden sm:flex gap-5">
                    {config.links?.map(l =>
                        <Link key={l.index} href={l.href} className="hover:underline">{l.label}</Link>
                    )}
                </div>
                {config.links&&<Sidebar links={config.links}/>}
            </div>
        </>
    )
}

export function Editor({ values, handleSubmit }: { values: HeaderType, handleSubmit: (data: HeaderType) => Promise<boolean> }) {
    return (
        <div className="space-y-2">
            <Label>Title</Label>
            <Input value={values.title} onChange={(e) => handleSubmit({ ...values, title: e.target.value })} />
            <Label>Links</Label>
            {values.links?.map(l =>
                <div key={l.index} className="flex gap-1">
                    <Input placeholder="Ex: About" value={l.label} onChange={(e) => handleSubmit({
                        ...values, links: values.links?.map(f => {
                            if (f.index == l.index) {
                                return { ...f, label: e.target.value }
                            } else return f
                        })
                    })} />
                    <Input placeholder="Ex: /about" value={l.href} onChange={(e) => handleSubmit({
                        ...values, links: values.links?.map(f => {
                            if (f.index == l.index) {
                                return { ...f, href: e.target.value }
                            } else return f
                        })
                    })} />
                    <Button variant='destructive' size='icon' onClick={() => handleSubmit({ ...values, links: values.links?.filter(f => f.index != l.index) })}><Trash2 /></Button>
                </div>
            )}
            <Button size='sm' onClick={() => handleSubmit({ ...values, links: [...(values.links || []), { index: values.links?.length || 0, label: '', href: '' }] })}><Plus />Add</Button>
        </div>
    )
}