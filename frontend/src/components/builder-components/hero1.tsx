import { Trash2 } from "lucide-react"
import FileSelector from "../storage/fileSelector"
import FileUploadComponent from "../storage/fileuploader"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import Link from "next/link"
import { useDebouncedCallback } from "use-debounce"
import RichTextEditor from "../ui/editor/rich-text-editor"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"

type ComponentType = {
    title?: string,
    paragraph?: string,
    button?: ButtonConfig,
    image?: string
}

export function Component({ config }: { config: ComponentType }) {
    return (
        <div className="px-4 py-10 sm:px-10 md:px-20 flex flex-col sm:flex-row gap-5 sm:gap-10">
            <div className="sm:w-1/2 flex flex-col justify-center gap-5">
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold font-raleway" dangerouslySetInnerHTML={{ __html: config.title || '' }} />
                <div dangerouslySetInnerHTML={{ __html: config.paragraph || '' }} />
                <ButtonComponent config={config.button}/>
            </div>
            <img src={config.image} className="sm:w-1/2 object-cover" />
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    const debouncedUpdate = useDebouncedCallback((partialUpdate: Partial<ComponentType>) => {
        handleSubmit({ ...values, ...partialUpdate })
    }, 200) // 200ms debounce delay
    return (
        <div className="space-y-5">
            <RichTextEditor
                label="Title"
                value={values.title ?? ''}
                onChange={(v) => debouncedUpdate({ title: v })}
                showAlignment
                showBackgroundColor
                showHeading
                showLink
            />

            <RichTextEditor
                label="Paragraph"
                value={values.paragraph ?? ''}
                onChange={(v) => debouncedUpdate({ paragraph: v })}
                showAlignment
                showBackgroundColor
                showHeading
                showLink
                showList
            />

            <ButtonEditor value={values.button} onChange={(v) => debouncedUpdate({ button: v })} />

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
                : <div className="flex gap-2">
                    <FileUploadComponent onUpload={(url: any) => handleSubmit({ image: url })} />
                    <FileSelector onSelect={(url: any) => handleSubmit({ image: url })} />
                </div>
            }

        </div>
    )
}