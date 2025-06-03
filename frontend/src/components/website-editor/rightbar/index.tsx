import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { websiteEditorAtom } from "@/lib/atoms";
import builderComponents from "@/lib/builder-components";
import { useAtom } from "jotai";
import { Edit, X } from "lucide-react";
import { useMemo } from "react";
import { deepMergeWithDeletion } from "@/lib/utils";

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
        <div className="h-full">

            <div className="sticky top-0 flex justify-between pb-2 border-b bg-accent z-10">
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

            <ScrollArea className="h-full relative">
                {websiteEditor?.activeComponent &&
                    <ConfigInput values={activeComponent?.config} handleSubmit={(config: any) => {
                        setWebsiteEditor((prev: any) => ({
                            ...prev,
                            website: {
                                ...prev.website,
                                pages: prev.website.pages.map((p: any) => {
                                    if (p.path === prev.activePage) {
                                        return {
                                            ...p,
                                            components: p.components.map((comp: any) =>
                                                comp.dndId === prev.activeComponent
                                                    ? {
                                                        ...comp,
                                                        config: deepMergeWithDeletion(comp.config, config),
                                                    }
                                                    : comp
                                            ),
                                        };
                                    }
                                    return p;
                                }),
                            },
                        }));
                    }} />
                }
                <div className="h-20" />
                <ScrollBar className="z-40" />
            </ScrollArea>
        </div>
    )
}