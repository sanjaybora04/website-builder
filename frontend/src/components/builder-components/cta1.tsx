import { Trash2 } from "lucide-react"
import FileSelector from "../storage/fileSelector"
import FileUploadComponent from "../storage/fileuploader"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import ParagraphEditor from "./paragraph-editor"

type TestType = {
    title?: string,
    paragraph?: string,
    image1?: string
    image2?: string
    image3?: string
}

export function Component({ config }: { config: TestType }) {
    return (
        <div className="px-4 py-10 sm:px-10 md:px-20">
            <div>
                <div className="text-2xl sm:text-3xl font-semibold font-raleway text-center">{config.title}</div>
                <div className="mt-2" dangerouslySetInnerHTML={{__html:config.paragraph}} />
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-5">
                <img src={config.image1} className="sm:w-1/3 object-cover" />
                <img src={config.image2} className="sm:w-1/3 object-cover" />
                <img src={config.image3} className="sm:w-1/3 object-cover" />
            </div>
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: TestType, handleSubmit: (data: TestType) => Promise<boolean> }) {

    return (
        <div className="space-y-2">
            <Label>Title</Label>
            <Input value={values.title} onChange={(e) => handleSubmit({ title: e.target.value })} />
            <Label>Paragraph</Label>
            <ParagraphEditor value={values.paragraph ?? ''} onChange={(v) => handleSubmit({ paragraph: v })} />
            <Label>Image1</Label>
            {values.image1 ?
                <div className="relative">
                    <img src={values.image1} />
                    <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                        onClick={() => {
                            handleSubmit({ image1: undefined })
                        }}
                    ><Trash2 /></Button>
                </div>
                :<div className="flex gap-2">
                    <FileUploadComponent onUpload={(url: any) => handleSubmit({ image1: url })} />
                    <FileSelector onSelect={(url: any) => handleSubmit({ image1: url })} />
                </div>
            }
            <Label>Image2</Label>
            {values.image2 ?
                <div className="relative">
                    <img src={values.image2} />
                    <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                        onClick={() => {
                            handleSubmit({ image2: undefined })
                        }}
                    ><Trash2 /></Button>
                </div>
                :<div className="flex gap-2">
                    <FileUploadComponent onUpload={(url: any) => handleSubmit({ image2: url })} />
                    <FileSelector onSelect={(url: any) => handleSubmit({ image2: url })} />
                </div>
            }
            <Label>Image3</Label>
            {values.image3 ?
                <div className="relative">
                    <img src={values.image3} />
                    <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                        onClick={() => {
                            handleSubmit({ image3: undefined })
                        }}
                    ><Trash2 /></Button>
                </div>
                :<div className="flex gap-2">
                    <FileUploadComponent onUpload={(url: any) => handleSubmit({ image3: url })} />
                    <FileSelector onSelect={(url: any) => handleSubmit({ image3: url })} />
                </div>
            }
        </div>
    )
}