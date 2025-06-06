import { Brush, Type } from "lucide-react"
import { Input } from "../ui/input"
import { useDebouncedCallback } from 'use-debounce'
import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import ImageInput, { ImageComponent, ImageInputValue } from "../ui/editor/image-input"
import { layoutStyleGenerator } from "@/lib/utils"
import { RepeaterEditor } from "../ui/editor/repeater"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import { Label } from "../ui/label"

type cardType = {
    image?: ImageInputValue,
    title?: string,
    description?: string,
    button?: ButtonConfig
}

type ComponentType = {
    layout?: {
        id?: string,
        color?: string
        backgroundColor?: string
        backgroundImage?: ImageInputValue
        card?:{
            backgroundColor?:string
        }
    },
    content?: {
        title?: string,
        paragraph?: string,
        cards?: cardType[]
    }
}

export function Component({ config }: { config: ComponentType }) {
    return (
        <div className="px-4 py-10 sm:px-10 md:px-20"
            id={config.layout?.id}
            style={layoutStyleGenerator(config.layout)}
        >
            <div>
                <div className="text-2xl sm:text-3xl font-semibold font-raleway" ><RenderHtml html={config.content?.title} /></div>
                <div className="mt-2"><RenderHtml html={config.content?.paragraph} /></div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
                {config.content?.cards?.map(c=>
                    <div className="w-full max-w-96 sm:w-96 border rounded shadow p-4" style={{backgroundColor:config.layout?.card?.backgroundColor}}>
                        <ImageComponent config={c.image} className="aspect-video w-full"/>
                        <div className="mt-2 text-lg sm:text-xl font-semibold"><RenderHtml html={c.title}/></div>
                        <div className="mt-2"><RenderHtml html={c.description}/></div>
                        <ButtonComponent config={c.button} className="mt-2"/>
                    </div>
                )}
            </div>
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    return (
        <>
            <Panel title="Layout" defaultOpen={false}>
                <Input value={values.layout?.id} onChange={(e) => handleSubmit({ layout: { id: e.target.value } })} placeholder="Component Id" />
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.layout?.color} onChange={(v) => handleSubmit({ layout: { color: v } })} />
                    <ColorPicker icon={<Brush />} color={values.layout?.backgroundColor} onChange={(v) => handleSubmit({ layout: { backgroundColor: v } })} />
                </div>
                <ImageInput label="Background Image" value={values.layout?.backgroundImage} onChange={(v) => handleSubmit({ layout: { backgroundImage: v } })} />
                
                <hr/>

                <Label>Card</Label>
                <ColorPicker icon={<Brush />} color={values.layout?.card?.backgroundColor} onChange={(v) => handleSubmit({ layout: {card:{ backgroundColor: v }} })} />
                <hr/>

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
                                label="Description"
                                value={card.description}
                                onChange={(v) => onChange({description:v})}
                                showAlignment
                                showBackgroundColor
                                showHeading
                                showLink
                                showList
                            />
                            <ImageInput label="Image" value={card.image} onChange={(v)=>onChange({image:v})}/>
                            <ButtonEditor label="Button" value={card.button} onChange={(v)=>onChange({button:v})}/>
                        </>
                    )}
                />
            </Panel>

        </>
    )
}