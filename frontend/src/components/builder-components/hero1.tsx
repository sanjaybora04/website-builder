import { Brush, Trash2, Type, X } from "lucide-react"
import FileSelector from "../storage/fileSelector"
import FileUploadComponent from "../storage/fileuploader"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import RichTextEditor from "../ui/editor/rich-text-editor"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import Panel from "../ui/editor/panel"
import { Input } from "../ui/input"
import ColorPicker from "../ui/editor/color-picker"

type ComponentType = {
    layout?: {
        id?: string,
        color?: string
        backgroundColor?: string
    },
    content?: {
        title?: string,
        paragraph?: string,
        button?: ButtonConfig,
        image?: string
    }
}

export function Component({ config }: { config: ComponentType }) {
    return (
        <div id={config.layout?.id} className="px-4 py-10 sm:px-10 md:px-20 flex flex-col sm:flex-row gap-5 sm:gap-10" style={{ backgroundColor: config.layout?.backgroundColor, color: config.layout?.color }}>
            <div className="sm:w-1/2 flex flex-col justify-center gap-5">
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold font-raleway" dangerouslySetInnerHTML={{ __html: config.content?.title || '' }} />
                <div dangerouslySetInnerHTML={{ __html: config.content?.paragraph || '' }} />
                <ButtonComponent config={config.content?.button} />
            </div>
            <img src={config.content?.image} className="sm:w-1/2 object-cover" />
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: Partial<ComponentType>) => Promise<boolean> }) {

    return (
        <>
            <Panel title="Layout" defaultOpen={false}>
                <Input value={values.layout?.id} onChange={(e) => handleSubmit({ layout: { id: e.target.value } })} placeholder="Component Id" />
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.layout?.color || "#000"} onChange={(v) => handleSubmit({ layout: { color: v } })} />
                    <ColorPicker icon={<Brush />} color={values.layout?.backgroundColor || "#fff"} onChange={(v) => handleSubmit({ layout: { backgroundColor: v } })} />
                </div>

            </Panel>

            <Panel title="Content">
                <RichTextEditor
                    label="Title"
                    value={values.content?.title ?? ''}
                    onChange={(v) => handleSubmit({ content: { title: v } })}
                    showAlignment
                    showBackgroundColor
                    showHeading
                    showLink
                />

                <RichTextEditor
                    label="Paragraph"
                    value={values.content?.paragraph ?? ''}
                    onChange={(v) => handleSubmit({ content: { paragraph: v } })}
                    showAlignment
                    showBackgroundColor
                    showHeading
                    showLink
                    showList
                />

                <ButtonEditor label="Button" value={values.content?.button} onChange={(v) => handleSubmit({ ...values, content: { button: v } })} />

                <Label>Image</Label>
                {values.content?.image ?
                    <div className="relative">
                        <img src={values.content?.image} />
                        <Button variant='destructive' size='icon' className="absolute top-2 right-2"
                            onClick={() => {
                                handleSubmit({ content: { image: undefined } })
                            }}
                        ><Trash2 /></Button>
                    </div>
                    : <div className="flex gap-2">
                        <FileUploadComponent onUpload={(url: any) => handleSubmit({ content: { image: url } })} />
                        <FileSelector onSelect={(url: any) => handleSubmit({ content: { image: url } })} />
                    </div>
                }
            </Panel>

        </>
    )
}