import { PaintBucket, Type } from "lucide-react"
import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import { MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"

type ComponentType = {
    container?: ContainerConfig,
    content?: {
        title?: string,
        paragraph?: string,
        items?: MediaConfig[]
    }
}

export function Component({ config }: { config: ComponentType }) {
    return (
        <Container config={config.container}>
            <div>
                <div className="text-2xl sm:text-3xl font-semibold font-raleway" ><RenderHtml html={config.content?.title} /></div>
                <div className="mt-2"><RenderHtml html={config.content?.paragraph} /></div>
            </div>
            <div className="gap-3 sm:columns-2 lg:columns-4 space-y-4 mt-5">
                {
                    config.content?.items?.map((item, index) => (
                        <div key={index}>
                            <MediaComponent config={item} 
                            imageClassname="w-full object-cover"
                            youtubeClassname="w-full aspect-video"
                            />
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    return (
        <>
            <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

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

                <RepeaterEditor<MediaConfig>
                    label="Items"
                    itemLabel="Item"
                    value={values.content?.items || []}
                    onChange={(items) => handleSubmit({ content: { items } })}
                    max={20}
                    createNewItem={() => ({ type:"image"})}
                    renderEditor={(card, onChange) => (
                        <>
                            <MediaInput
                                label="Item"
                                value={card}
                                onChange={(v) => onChange(v||{})}
                                allowYouTube
                            />
                        </>
                    )}
                />
            </Panel>

        </>
    )
}