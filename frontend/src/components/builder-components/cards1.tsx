import { PaintBucket, Type } from "lucide-react"
import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import { MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input"
import { RepeaterEditor } from "../ui/editor/repeater"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"

type cardType = {
    image?: MediaConfig,
    title?: string,
    paragraph?: string,
    button?: ButtonConfig
}

type ComponentType = {
    container?: ContainerConfig,
    card?: {
        color?: string
        backgroundColor?: string
    },
    content?: {
        title?: string,
        paragraph?: string,
        cards?: cardType[]
    }
}

export function Component({ config }: { config: ComponentType }) {
    return (
        <Container config={config.container}>
            <div>
                <div className="text-2xl sm:text-3xl font-semibold font-raleway" ><RenderHtml html={config.content?.title} /></div>
                <div className="mt-2"><RenderHtml html={config.content?.paragraph} /></div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
                {config.content?.cards?.map((c, index) =>
                    <div key={index} className="w-full max-w-96 sm:w-96 border rounded shadow p-4" style={{ backgroundColor: config.card?.backgroundColor, color: config.card?.color }}>
                        <MediaComponent config={c.image}
                            imageClassname="aspect-video w-full"
                            youtubeClassname="aspect-video w-full"
                        />
                        <div className="mt-2 text-lg sm:text-xl font-semibold"><RenderHtml html={c.title} /></div>
                        <div className="mt-2"><RenderHtml html={c.paragraph} /></div>
                        <ButtonComponent config={c.button} className="mt-2" />
                    </div>
                )}
            </div>
        </Container>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    return (
        <>
            <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

            <Panel title="Card" defaultOpen={false}>
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.card?.color} onChange={(v) => handleSubmit({ card: { color: v } })} />
                    <ColorPicker icon={<PaintBucket />} color={values.card?.backgroundColor} onChange={(v) => handleSubmit({ card: { backgroundColor: v } })} />
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

                <RepeaterEditor<cardType>
                    label="Cards"
                    itemLabel="Card"
                    value={values.content?.cards || []}
                    onChange={(cards) => handleSubmit({ content: { cards } })}
                    max={5}
                    createNewItem={() => ({ title: "Title", description: "description", button: { label: "Clcik Me" } })}
                    renderEditor={(card, onChange) => (
                        <>
                            <RichTextEditor
                                label="Title"
                                value={card.title}
                                onChange={(v) => onChange({ title: v })}
                                showAlignment
                                showBackgroundColor
                                showHeading
                                showLink
                            />
                            <RichTextEditor
                                label="Paragraph"
                                value={card.paragraph}
                                onChange={(v) => onChange({ paragraph: v })}
                                showAlignment
                                showBackgroundColor
                                showHeading
                                showLink
                                showList
                            />
                            <MediaInput label="Image" allowYouTube value={card.image} onChange={(v) => onChange({ image: v })} />
                            <ButtonEditor label="Button" value={card.button} onChange={(v) => onChange({ button: v })} />
                        </>
                    )}
                />
            </Panel>

        </>
    )
}