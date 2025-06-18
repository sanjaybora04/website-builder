import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container";
import RenderHtml from "../ui/editor/rich-text-editor/render-html";
import Panel from "../ui/editor/panel";
import RichTextEditor from "../ui/editor/rich-text-editor";
import { RepeaterEditor } from "../ui/editor/repeater";
import {MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input";

type Card = {
    icon?: MediaConfig; // Lucide icon name
    title?: string;
    paragraph?: string;
};

type ComponentType = {
    container?: ContainerConfig;
    content?: {
        title?: string;
        paragraph?: string;
        cards?: Card[];
    };
};



export function Component({ config }: { config: ComponentType }) {
    return (
        <Container config={config.container}>
            <div className="text-center max-w-3xl mx-auto">
                <div className="text-2xl sm:text-3xl font-semibold font-raleway">
                    <RenderHtml html={config.content?.title} />
                </div>
                <div className="mt-2">
                    <RenderHtml html={config.content?.paragraph} />
                </div>
            </div>
            <div className="flex flex-wrap gap-5 sm:gap-10 lg:gap-20 justify-center max-w-5xl mx-auto mt-5">
                {config.content?.cards?.map((c, index) => {
                    return (
                        <div key={index} className="p-4 rounded text-center">
                            <MediaComponent config={c.icon} imageClassname="w-14 h-14 mx-auto mb-3" />
                            <div className="text-lg font-semibold">
                                <RenderHtml html={c.title} />
                            </div>
                            <div className="text-sm mt-1">
                                <RenderHtml html={c.paragraph} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
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
                    showHeading
                    showLink
                />

                <RichTextEditor
                    label="Paragraph"
                    value={values.content?.paragraph}
                    onChange={(v) => handleSubmit({ content: { paragraph: v } })}
                    showAlignment
                    showLink
                    showList
                />

                <RepeaterEditor<Card>
                    label="Items"
                    itemLabel="Item"
                    value={values.content?.cards || []}
                    onChange={(cards) => handleSubmit({ content: { cards } })}
                    max={6}
                    createNewItem={() => ({ title: "Feature title", paragraph: "Short description" })}
                    renderEditor={(feature, onChange) => (
                        <>
                            <MediaInput
                                label="Icon"
                                value={feature.icon}
                                onChange={(icon) => onChange({ icon })}
                            />

                            <RichTextEditor
                                label="Title"
                                value={feature.title}
                                onChange={(v) => onChange({ title: v })}
                                showAlignment
                                showLink
                                showHeading
                            />
                            <RichTextEditor
                                label="Paragraph"
                                value={feature.paragraph}
                                onChange={(v) => onChange({ paragraph: v })}
                                showAlignment
                                showList
                            />
                        </>
                    )}
                />
            </Panel>
        </>
    );
}