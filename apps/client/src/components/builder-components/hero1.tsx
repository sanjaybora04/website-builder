
import RichTextEditor from "../ui/editor/rich-text-editor"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import Panel from "../ui/editor/panel"
import {MediaInput,MediaComponent, MediaConfig } from "../ui/editor/media-input"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"

type ComponentType = {
    container?: ContainerConfig
    content?: {
        title?: string,
        paragraph?: string,
        button?: ButtonConfig,
        image?: MediaConfig
    }
}

export function Component({ config }: { config: ComponentType }) {

    return (
        <Container config={config.container} className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <div className="sm:w-1/2 flex flex-col justify-center gap-5">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium font-raleway"><RenderHtml html={config.content?.title} /></div>
                <div><RenderHtml html={config.content?.paragraph} /></div>
                <ButtonComponent config={config.content?.button} />
            </div>
            {config.content?.image && <MediaComponent config={config.content?.image} 
            imageClassname="sm:w-1/2 max-h-[50vh] sm:max-h-[90vh]"
            youtubeClassname="sm:w-1/2 max-h-[50vh] sm:max-h-[90vh] aspect-video"
            />}
        </Container>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: Partial<ComponentType>) => Promise<boolean> }) {

    return (
        <>
            <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

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

                <MediaInput value={values.content?.image} allowYouTube onChange={(v) => handleSubmit({ content: { image: v } })} />
            </Panel>
        </>
    )
}