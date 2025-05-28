import { Trash2 } from "lucide-react"
import FileSelector from "../storage/fileSelector"
import FileUploadComponent from "../storage/fileuploader"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import Link from "next/link"

type TestType = {
    title?: string,
    paragraph?: string,
    link?: {
        label?:string,
        href?:string
    },
    image?: string
}

export function Component({ config }: { config: TestType }) {
    return (
        <div className="px-4 py-10 sm:px-10 md:px-20 flex flex-col sm:flex-row gap-5 sm:gap-10">
            <div className="sm:w-1/2 flex flex-col justify-center gap-5">
                <h1 className="text-3xl sm:text-6xl font-bold font-raleway">{config.title}</h1>
                <p>{config.paragraph}</p>
                <div>
                <Link href={config.link?.href||'#'} className=" cursor-pointer bg-blue-500 text-white p-2 px-3 rounded">{config.link?.label}</Link>
                </div>
            </div>
            <img src={config.image} className="sm:w-1/2 object-cover"/>
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: TestType, handleSubmit: (data: TestType) => Promise<boolean> }) {

    return (
        <div className="space-y-2">
            <Label>Title</Label>
            <Input value={values.title} onChange={(e) => handleSubmit({ title: e.target.value })} />
            <Label>Paragraph</Label>
            <Textarea value={values.paragraph} onChange={(e) => handleSubmit({ paragraph: e.target.value })} />
            <Label>Image</Label>
            {values.image ?
                <div className="relative">
                    <img src={values.image} />
                    <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                        onClick={() => {
                            handleSubmit({ image: undefined })
                        }}
                    ><Trash2 /></Button>
                </div>
                :<div className="flex gap-2">
                    <FileUploadComponent onUpload={(url: any) => handleSubmit({ image: url })} />
                    <FileSelector onSelect={(url: any) => handleSubmit({ image: url })} />
                </div>
            }
            <Label>Link</Label>
            <div className="flex gap-2">
                <Input value={values.link?.label} placeholder="label" onChange={(e)=>handleSubmit({link:{href:values.link?.href,label:e.target.value}})}/>
                <Input value={values.link?.href} placeholder="href" onChange={(e)=>handleSubmit({link:{href:e.target.value,label:values.link?.label}})}/>
            </div>
            
        </div>
    )
}