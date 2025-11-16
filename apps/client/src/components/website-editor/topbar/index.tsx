import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LaptopMinimal, ScanEye, Smartphone } from "lucide-react"
import Pages from "./pages"
import { PublishWebsiteButton } from "./publish"
import Routes from "@/lib/routes"
import useWebsiteEditor from "@/hooks/use-website-editor"

export default function EditorTopBar() {
    const editor = useWebsiteEditor()
    return (
        <div className="bg-accent h-10 w-full border sticky top-0 flex justify-between items-center p-3">
            <div className="flex h-full items-center gap-1">
                <LaptopMinimal className={cn(editor?.previewSize == 'desktop' && "bg-primary/20", "hover:bg-primary/20 p-2 h-8 w-8 rounded")} onClick={() => editor.setPreviewSize('desktop')} />
                <Smartphone className={cn(editor?.previewSize == "mobile" && "bg-primary/20", "hover:bg-primary/20 p-2 h-8 w-8 rounded")} onClick={() => editor.setPreviewSize('mobile')} />
            </div>
            <Pages />
            <div className="flex gap-2">
            <Button size='icon' variant='ghost' asChild>
                <a target="_blank" href={Routes.preview} title='Live Preview'>
                <ScanEye/>
                </a>
            </Button>
            <PublishWebsiteButton/>
            </div>
        </div>
    )
}