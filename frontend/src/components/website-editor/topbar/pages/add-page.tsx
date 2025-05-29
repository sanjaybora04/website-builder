import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageForm from "./page-form";
import { useAtom } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";
import { Page } from "@/lib/types";
import { useState } from "react";

export default function AddPage() {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)
    const [open,setOpen] = useState(false)

    async function addPage(data: Page) {
        // TODO: check if path already exists
        setWebsiteEditor((prev: any) => ({
            ...prev,
            website: {
                ...prev?.website,
                pages: [...prev?.website?.pages || [], data]
            }
        }))
        setOpen(false)
        return true
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