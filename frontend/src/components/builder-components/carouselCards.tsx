'use client'
import { PaintBucket, Type } from "lucide-react"
import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import { MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input"
import { RepeaterEditor } from "../ui/editor/repeater"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

type cardType = {
    image?: MediaConfig,
    title?: string,
    paragraph?: string,
    button?: ButtonConfig
}

type ComponentType = {
    container?: ContainerConfig,
    carousel?: {
        color?: string
        backgroundColor?: string
        autoplay?: boolean
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

            <Carousel className="mt-5"
                opts={{ loop: true }}
                plugins={config.carousel?.autoplay ? [Autoplay({ delay: 2000 })] : []}
            >
                <CarouselContent className="px-5">
                    {config.content?.cards?.map((c, index) =>
                        <CarouselItem key={index} className="sm:basis-80 mx-2 border rounded shadow p-4" style={{ backgroundColor: config.carousel?.backgroundColor, color: config.carousel?.color }}>
                            <MediaComponent config={c.image}
                                imageClassname="aspect-video w-full"
                                youtubeClassname="aspect-video w-full"
                            />
                            <div className="mt-2 text-lg sm:text-xl font-semibold"><RenderHtml html={c.title} /></div>
                            <div className="mt-2"><RenderHtml html={c.paragraph} /></div>
                            <ButtonComponent config={c.button} className="mt-2" />
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselNext className="-right-0" />
                <CarouselPrevious className="-left-0" />
            </Carousel>
        </Container>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    return (
        <>
            <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

            <Panel title="Carousel" defaultOpen={false}>
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.carousel?.color} onChange={(v) => handleSubmit({ carousel: { color: v } })} />
                    <ColorPicker icon={<PaintBucket />} color={values.carousel?.backgroundColor} onChange={(v) => handleSubmit({ carousel: { backgroundColor: v } })} />
                </div>
                <div className="flex gap-2">
                    <Label>Autoplay</Label>
                    <Checkbox
                        id="autoplay"
                        checked={values.carousel?.autoplay ?? false}
                        onCheckedChange={(checked) =>
                            handleSubmit({ carousel: { autoplay: checked === true } })
                        }
                    />
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
                    max={20}
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