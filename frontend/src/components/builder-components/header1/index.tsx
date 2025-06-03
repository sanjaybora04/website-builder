import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Brush, Plus, Trash2, Type } from "lucide-react"
import Sidebar from "./sidebar"
import FileUploadComponent from "@/components/storage/fileuploader"
import FileSelector from "@/components/storage/fileSelector"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "@/components/ui/editor/button"
import Panel from "@/components/ui/editor/panel"
import ColorPicker from "@/components/ui/editor/color-picker"
import RichTextEditor from "@/components/ui/editor/rich-text-editor"
import { RepeaterEditor } from "@/components/ui/editor/repeater"

type HeaderType = {
    layout?: {
        id?: string,
        color?: string
        backgroundColor?: string
    },
    content?: {
        title?: string,
        logo?: string,
        buttons?: ButtonConfig[]
    }
}

export function Component({ config }: { config: HeaderType }) {
    return (
        <>
            <div className="sticky top-0 left-0 h-20 flex items-center justify-between gap-5  px-4 sm:px-10 md:px-20 bg-white border-b shadow"
                style={{ color: config.layout?.color, backgroundColor: config.layout?.backgroundColor }}
            >
                <div className="flex gap-2 items-center">
                    <img src={config.content?.logo} />
                    <div className="text-xl sm:text-2xl font-semibold font-raleway" dangerouslySetInnerHTML={{ __html: config.content?.title || "" }} />
                </div>
                <div className="hidden sm:flex gap-5">
                    {config.content?.buttons?.map(b =>
                        <ButtonComponent config={b} />
                    )}
                </div>
                {config.content?.buttons && <Sidebar links={config.content?.buttons} />}
            </div>
        </>
    )
}

export function Editor({ values, handleSubmit }: { values: HeaderType, handleSubmit: (data: HeaderType) => Promise<boolean> }) {
    return (
        <>
            <Panel title="Layout" defaultOpen={false}>
                <Input value={values.layout?.id} onChange={(e) => handleSubmit({ layout: { id: e.target.value } })} placeholder="Component Id" />
                <div className="flex gap-1">
                    <ColorPicker icon={<Type />} color={values.layout?.color || "#000"} onChange={(v) => handleSubmit({ layout: { color: v } })} />
                    <ColorPicker icon={<Brush />} color={values.layout?.backgroundColor || "#fff"} onChange={(v) => handleSubmit({ layout: { backgroundColor: v } })} />
                </div>
            </Panel>

            <Panel title="Content" defaultOpen={true}>
                <RichTextEditor
                    label="Title"
                    value={values.content?.title ?? ''}
                    onChange={(v) => handleSubmit({ content: { title: v } })}
                />
                <hr/>
                
                <RepeaterEditor<ButtonConfig>
                    label="Links"
                    value={values.content?.buttons || []}
                    onChange={(buttons) => {console.log(buttons);handleSubmit({ content: { buttons } })}}
                    max={5}
                    createNewItem={() => ({ label: "Click Me", link: "#" })}
                    renderEditor={(button, onChange) => (
                        <ButtonEditor
                            label="Link"
                            value={button}
                            onChange={onChange}
                        />
                    )}
                />

            </Panel>
        </>
    )
}