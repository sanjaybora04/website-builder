import { ScrollArea } from "@/components/ui/scroll-area";
import { websiteEditorAtom } from "@/lib/atoms";
import builderComponents from "@/lib/builder-components";
import { useAtom } from "jotai";
import { Edit, X } from "lucide-react";
import { useMemo } from "react";

export default function EditorRightBar() {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)

    const activeComponent = useMemo(() => {
        return websiteEditor?.website?.pages
            ?.find(p => p.path == websiteEditor?.activePage)
            ?.components?.find(c => c.dndId == websiteEditor?.activeComponent);
    }, [websiteEditor]);

    const ConfigInput = useMemo(() => {
        return activeComponent
            ? builderComponents.find(b => b.id == activeComponent.id)?.configInput
            : null;
    }, [activeComponent]);
    return (
        <ScrollArea className="h-full">
            <div className="sticky top-0 flex justify-between pb-2 mb-3 border-b bg-accent z-10">
                <div className="flex items-center gap-1">
                    <div className=" max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">
                        {activeComponent?.name}
                    </div>
                    <Edit className="w-5 h-5" />
                </div>
                <button className=' cursor-pointer' onClick={() => setWebsiteEditor((prev: any) => ({ ...prev, activeComponent: undefined }))}>
                    <X />
                </button>
            </div>
            {websiteEditor?.activeComponent &&
                <ConfigInput values={activeComponent?.config} handleSubmit={(config: any) => {
                    console.log(activeComponent?.config)
                    setWebsiteEditor((prev: any) => ({
                        ...prev,
                        website: {
                            ...prev.website,
                            pages: prev.website.pages.map((p: any) => {
                                if (p.path === prev.activePage) {
                                    return {
                                        ...p,
                                        components: p.components.map((comp: any) =>
                                            comp.dndId === prev?.activeComponent ? { ...comp, config: { ...comp.config, ...config } } : comp
                                        ),
                                    };
                                }
                                return p;
                            }),
                        },
                    }));
                }} />
            }
        </ScrollArea>
    )
}