import Sidebar from "./sidebar"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "@/components/ui/editor/button"
import Panel from "@/components/ui/editor/panel"
import RichTextEditor from "@/components/ui/editor/rich-text-editor"
import { RepeaterEditor } from "@/components/ui/editor/repeater"
import RenderHtml from "@/components/ui/editor/rich-text-editor/render-html"
import { Container, ContainerConfig, ContainerPanel } from "@/components/ui/editor/container"

export type ComponentType = {
    container?: ContainerConfig
    content?: {
        title?: string,
        logo?: string,
        buttons?: ButtonConfig[]
    }
}



export function Component({ config }: { config: ComponentType }) {
    return (
        <Container 
        config={config.container} 
        className="sticky top-0 left-0 z-50 h-20 flex items-center justify-between gap-5 border-b shadow"
        >
            <div className="flex gap-2 items-center">
                <img src={config.content?.logo} />
                <div className="text-xl sm:text-2xl font-semibold font-raleway"><RenderHtml html={config.content?.title} /></div>
            </div>
            <div className="hidden sm:flex items-center gap-5 sm:gap-7">
                {config.content?.buttons?.map((b, index) =>
                    <ButtonComponent key={index} config={b} />
                )}
            </div>
            {config.content?.buttons && <Sidebar config={config} />}
        </Container>
    )
}

export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
    return (
        <>
            <ContainerPanel config={values.container} onChange={(v)=>handleSubmit({container:v})} enable={{backgroundImage:false}}/>

            <Panel title="Content" defaultOpen={true}>
                <RichTextEditor
                    label="Title"
                    value={values.content?.title ?? ''}
                    onChange={(v) => handleSubmit({ content: { title: v } })}
                />
                <hr />

                <RepeaterEditor<ButtonConfig>
                    label="Links"
                    itemLabel="Link"
                    value={values.content?.buttons || []}
                    onChange={(buttons) => { console.log(buttons); handleSubmit({ content: { buttons } }) }}
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