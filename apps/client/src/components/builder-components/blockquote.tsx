import { PaintBucket, Type } from "lucide-react"
import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"

type ComponentType = {
    container?: ContainerConfig,
    blockquote?: {
        color?: string
        backgroundColor?: string
    },
    content?: {
        title?: string,
        paragraph?: string,
        button?: ButtonConfig
    }
}

export function Component({ config }: { config: ComponentType }) {
    return (
        <Container config={config.container}>
            <div>
                <div className="text-2xl sm:text-3xl font-bold font-raleway" ><RenderHtml html={config.content?.title} /></div>
                <div className="px-4 sm:px-6 py-4 border-l my-2"
                    style={{
                        background:config.blockquote?.backgroundColor,
                        color:config.blockquote?.color,
                        borderColor: config.blockquote?.color
                    }}
                ><RenderHtml html={config.content?.paragraph} /></div>
                <ButtonComponent config={config.content?.button} />
            </div>
        </Container>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    return (
        <>
            <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

            <Panel title="BlockQuote" defaultOpen={false}>
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.blockquote?.color} onChange={(v) => handleSubmit({ blockquote: { color: v } })} />
                    <ColorPicker icon={<PaintBucket />} color={values.blockquote?.backgroundColor} onChange={(v) => handleSubmit({ blockquote: { backgroundColor: v } })} />
                </div>
            </Panel>

            <Panel title="Content">
                <RichTextEditor
                    label="Title"
                    value={values.content?.title}
                    onChange={(v) => handleSubmit({ content: { title: v } })}
                    showAlignment
                    showBackgroundColor
                    showHeading
                    showLink
                />

                <RichTextEditor
                    label="Paragraph"
                    value={values.content?.paragraph}
                    onChange={(v) => handleSubmit({ content: { paragraph: v } })}
                    showAlignment
                    showBackgroundColor
                    showHeading
                    showLink
                    showList
                />


                <ButtonEditor label="Button" value={values.content?.button} onChange={(v) => handleSubmit({content:{button:v}})} />
            </Panel>

        </>
    )
}