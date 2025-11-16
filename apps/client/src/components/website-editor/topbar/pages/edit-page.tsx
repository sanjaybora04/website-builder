import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageForm from "./page-form";
import { Page } from "@/lib/types";
import { useState } from "react";
import { Edit } from "lucide-react";
import useWebsiteEditor from "@/hooks/use-website-editor";

export default function EditPage({ page }: { page: Page }) {
    const editor = useWebsiteEditor()
    const [open, setOpen] = useState(false)

    function editPage(path: string, data: Page) {
        // TODO: check if path already exists
        if(editor.updatePage(path,data)){
            setOpen(false)
            return true
        }
        else{
            return false
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full">
                <Button variant='ghost' className="justify-start"><Edit />Edit</Button>
            </DialogTrigger>
            <DialogContent><PageForm data={page} onSubmit={(v) => editPage(page.path, v)} /></DialogContent>
        </Dialog>
    )
}