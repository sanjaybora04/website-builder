import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import Sidebar from "./sidebar"
import FileUploadComponent from "@/components/storage/fileuploader"
import FileSelector from "@/components/storage/fileSelector"

type HeaderType = {
    websiteName?: string,
    logo?: string,
    links?: {
        index: number,
        label: string,
        href: string
    }[]
}

export function Component({ config }: { config: HeaderType }) {
    return (
        <>
            <div className="sticky top-0 left-0 h-20 flex items-center justify-between gap-5  px-4 sm:px-10 md:px-20 bg-white border-b shadow">
                <div className="flex gap-2 items-center">
                    <img src={config.logo} />
                    <div className="text-xl font-semibold font-raleway">{config.websiteName}</div>
                </div>
                <div className="hidden sm:flex gap-5">
                    {config.links?.map(l =>
                        <Link key={l.index} href={l.href} className="hover:underline">{l.label}</Link>
                    )}
                </div>
                {config.links && <Sidebar links={config.links} />}
            </div>
        </>
    )
}

export function Editor({ values, handleSubmit }: { values: HeaderType, handleSubmit: (data: HeaderType) => Promise<boolean> }) {
    return (
        <div className="space-y-2">
            <Label>Logo/Favicon</Label>
            {values.logo ?
                <div className="relative">
                    <img src={values.logo} />
                    <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                        onClick={() => {
                            handleSubmit({ logo: undefined })
                        }}
                    ><Trash2 /></Button>
                </div>
                : <div className="flex gap-2">
                    <FileUploadComponent onUpload={(url: any) => handleSubmit({ logo: url })} />
                    <FileSelector onSelect={(url: any) => handleSubmit({ logo: url })} />
                </div>
            }

            <Label>Website Name</Label>
            <Input value={values.websiteName} onChange={(e) => handleSubmit({ ...values, websiteName: e.target.value })} />

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