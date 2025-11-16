import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import builderComponents from "@/lib/builder-components";
import { X } from "lucide-react";
import { useMemo } from "react";
import useWebsiteEditor from "@/hooks/use-website-editor";

export default function EditorRightBar() {
    const editor = useWebsiteEditor()

    const activeComponent = useMemo(() => {
        return editor?.website?.pages
            ?.find(p => p.path == editor?.activePage)
            ?.components?.find(c => c.dndId == editor?.activeComponent);
    }, [editor.website?.pages, editor.activePage, editor.activeComponent]);

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
                </div>
                <button className=' cursor-pointer' onClick={() => editor.setActiveComponent(undefined)}>
                    <X />
                </button>
            </div>

            <ScrollArea className="h-full relative">
                {editor?.activeComponent &&
                    <ConfigInput values={activeComponent?.config} handleSubmit={(config: any) => editor.updateComponent(config)} />
                }
                <div className="h-20" />
                <ScrollBar className="z-40" />
            </ScrollArea>
        </div>
    )
}