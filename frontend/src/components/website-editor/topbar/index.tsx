import { Button } from "@/components/ui/button"
import { websiteEditorAtom } from "@/lib/atoms"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"
import { LaptopMinimal, Smartphone } from "lucide-react"
import Pages from "./pages"
import { PublishWebsiteButton } from "./publish"

export default function EditorTopBar() {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)
    return (
        <div className="bg-accent h-10 w-full border sticky top-0 flex justify-between items-center p-3">
            <div className="flex h-full items-center gap-1">
                <LaptopMinimal className={cn(websiteEditor?.previewSize == 'desktop' && "bg-primary/20", "hover:bg-primary/20 p-2 h-8 w-8 rounded")} onClick={() => setWebsiteEditor((prev: any) => ({ ...prev, previewSize: 'desktop' }))} />
                <Smartphone className={cn(websiteEditor?.previewSize == "mobile" && "bg-primary/20", "hover:bg-primary/20 p-2 h-8 w-8 rounded")} onClick={() => setWebsiteEditor((prev: any) => ({ ...prev, previewSize: 'mobile' }))} />
            </div>
            <Pages />
            <PublishWebsiteButton/>
        </div>
    )
}