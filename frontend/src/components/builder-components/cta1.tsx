import { Brush, Type } from "lucide-react"
import { Input } from "../ui/input"
import { useDebouncedCallback } from 'use-debounce'
import RichTextEditor from "../ui/editor/rich-text-editor"
// import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import ImageInput from "../ui/editor/image-input"

type TestType = {
    layout?: {
        id?: string,
        color?: string
        backgroundColor?: string
    },
    content?: {
        title?: string,
        paragraph?: string,
        image1?: string,
        image2?: string,
        image3?: string
    }
}

export function Component({ config }: { config: TestType }) {
    return (
        <div className="px-4 py-10 sm:px-10 md:px-20"
            id={config.layout?.id}
            style={{ backgroundColor: config.layout?.backgroundColor, color: config.layout?.color }}
        >
            <div>
                {/* <div className="text-2xl sm:text-3xl font-semibold font-raleway" ><RenderHtml html={config.content?.title}/></div> */}
                {/* <div className="mt-2"><RenderHtml html={config.content?.paragraph}/></div> */}
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-5">
                <img src={config.content?.image1} className="sm:w-1/3 object-cover" />
                <img src={config.content?.image2} className="sm:w-1/3 object-cover" />
                <img src={config.content?.image3} className="sm:w-1/3 object-cover" />
            </div>
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: TestType, handleSubmit: (data: TestType) => Promise<boolean> }) {
    const debouncedUpdate = useDebouncedCallback((partialUpdate: Partial<TestType>) => {
        handleSubmit({ ...values, ...partialUpdate })
    }, 200) // 200ms debounce delay

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

                <ImageInput label="Image1" value={values.content?.image1} onChange={(v) => handleSubmit({ content: { image1: v } })} />
                <ImageInput label="Image2" value={values.content?.image2} onChange={(v) => handleSubmit({ content: { image2: v } })} />
                <ImageInput label="Image3" value={values.content?.image3} onChange={(v) => handleSubmit({ content: { image3: v } })} />
            </Panel>

        </>
    )
}