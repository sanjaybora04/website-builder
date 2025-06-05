import { Brush, Type } from "lucide-react"
import RichTextEditor from "../ui/editor/rich-text-editor"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import Panel from "../ui/editor/panel"
import { Input } from "../ui/input"
import ColorPicker from "../ui/editor/color-picker"
import ImageInput from "../ui/editor/image-input"
// import RenderHtml from "../ui/editor/rich-text-editor/render-html"

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
        <div className="px-4 py-10 sm:px-10 md:px-20 flex flex-col sm:flex-row gap-5 sm:gap-10"
        id={config.layout?.id} 
        style={{ backgroundColor: config.layout?.backgroundColor, color: config.layout?.color }}
        >
            <div className="sm:w-1/2 flex flex-col justify-center gap-5">
                {/* <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-raleway"><RenderHtml html={config.content?.title}/></div> */}
                {/* <div><RenderHtml html={config.content?.paragraph}/></div> */}
                <ButtonComponent config={config.content?.button} />
            </div>
            <img src={config.content?.image} className="sm:w-1/2 object-contain max-h-[50vh] sm:max-h-[90vh]" />
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: Partial<ComponentType>) => Promise<boolean> }) {

    return (
        <>
            <Panel title="Layout" defaultOpen={false}>
                <Input value={values.layout?.id} onChange={(e) => handleSubmit({ layout: { id: e.target.value } })} placeholder="Component Id" />
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.layout?.color} onChange={(v) => handleSubmit({ layout: { color: v } })} />
                    <ColorPicker icon={<Brush />} color={values.layout?.backgroundColor} onChange={(v) => handleSubmit({ layout: { backgroundColor: v } })} />
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

                <ImageInput value={values.content?.image} onChange={(v)=>handleSubmit({content:{image:v}})}/>
            </Panel>

        </>
    )
}