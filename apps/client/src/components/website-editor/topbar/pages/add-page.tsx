import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageForm from "./page-form";
import { Page } from "@/lib/types";
import { useState } from "react";
import useWebsiteEditor from "@/hooks/use-website-editor";

export default function AddPage() {
    const editor = useWebsiteEditor()
    const [open,setOpen] = useState(false)

    function addPage(data: Page) {
        if(editor.addPage(data)){
            setOpen(false)
            return true
        }else{
            return false
        }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full p-1">
                <Button className="w-full">Add Page</Button>
            </DialogTrigger>
            <DialogContent><PageForm onSubmit={(v) => addPage(v)} /></DialogContent>
        </Dialog>
    )
}