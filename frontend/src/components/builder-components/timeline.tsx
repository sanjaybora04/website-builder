import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import { MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import { cn } from "@/lib/utils"
import ColorPicker from "../ui/editor/color-picker"
import { PaintBucket } from "lucide-react"
import { Label } from "../ui/label"

type TimelineItem = {
    title?: string
    paragraph?: string
    media?: MediaConfig
}

type TimelineConfig = {
    container?: ContainerConfig
    timeline?: {
        color?: string
    }
    content?: {
        title?: string
        paragraph?: string
        items?: TimelineItem[]
    }
}

export function Component({ config }: { config: TimelineConfig }) {
    return (
        <Container config={config.container}>
            <div className="max-w-7xl mx-auto">

                <div>
                    <div className="text-2xl sm:text-3xl font-semibold font-raleway">
                        <RenderHtml html={config.content?.title} />
                    </div>
                    <div className="mt-2">
                        <RenderHtml html={config.content?.paragraph} />
                    </div>
                </div>

                <div className="relative mt-8">
                    {/* Vertical timeline line - center for md+, left for small */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full border-l-2 border-current/30"
                        style={{
                            color: config.timeline?.color
                        }}
                    />

                    <div className="flex flex-col">
                        {config.content?.items?.map((item, index) => {
                            const isLeft = index % 2 === 0

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "relative flex flex-col md:flex-row items-start gap-4",
                                        isLeft ? "md:justify-start" : "md:justify-end"
                                    )}
                                >
                                    {/* Dot on the line */}
                                    <div className="absolute top-2 left-3 md:-translate-x-1/2 md:left-1/2 w-2.5 h-2.5 rounded-full z-10"
                                        style={{
                                            backgroundColor: config.timeline?.color
                                        }}
                                    />

                                    {/* Content box */}
                                    <div
                                        className={cn(
                                            "w-full md:w-1/2 py-4 px-8 rounded",
                                            isLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
                                        )}
                                    >
                                        {item.media && (
                                            <MediaComponent
                                                config={item.media}
                                                imageClassname="w-full max-w-80 max-h-52 rounded mb-2"
                                                youtubeClassname="w-full max-w-xs mb-2"
                                            />
                                        )}
                                        <div className="text-lg font-semibold">
                                            <RenderHtml html={item.title} />
                                        </div>
                                        <div className="text-sm">
                                            <RenderHtml html={item.paragraph} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}



export function Editor({ values, handleSubmit }: { values: TimelineConfig, handleSubmit: (data: TimelineConfig) => Promise<boolean> }) {
    return (
        <>
            <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

            <Panel title="Timeline" defaultOpen={false}>
                <Label>Timeline Color</Label>
                <ColorPicker icon={<PaintBucket />} color={values.timeline?.color} onChange={(v) => handleSubmit({ timeline: { color: v } })} />
            </Panel>

            <Panel title="Content">
                <RichTextEditor
                    label="Title"
                    value={values.content?.title}
                    onChange={(v) => handleSubmit({ content: { ...values.content, title: v } })}
                    showAlignment
                    showHeading
                    showBackgroundColor
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

                <RepeaterEditor<TimelineItem>
                    label="Items"
                    itemLabel="Item"
                    value={values.content?.items || []}
                    onChange={(items) => handleSubmit({ content: { ...values.content, items } })}
                    max={10}
                    createNewItem={() => ({ title: "Step Title", description: "Step description" })}
                    renderEditor={(item, onChange) => (
                        <>
                            <RichTextEditor
                                label="Title"
                                value={item.title}
                                onChange={(v) => onChange({ ...item, title: v })}
                                showHeading
                                showAlignment
                            />
                            <RichTextEditor
                                label="Description"
                                value={item.paragraph}
                                onChange={(v) => onChange({ ...item, paragraph: v })}
                                showAlignment
                                showBackgroundColor
                                showHeading
                                showLink
                                showList
                            />
                            <MediaInput label="Optional Image/Video" value={item.media} onChange={(v) => onChange({ ...item, media: v })} allowYouTube />
                        </>
                    )}
                />
            </Panel>
        </>
    )
}
