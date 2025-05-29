import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageForm from "./page-form";
import { useAtom } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";
import { Page } from "@/lib/types";
import { useState } from "react";
import { Edit } from "lucide-react";

export default function EditPage({ page }: { page: Page }) {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)
    const [open, setOpen] = useState(false)

    async function editPage(path: string, data: Page) {
        // TODO: check if path already exists
        setWebsiteEditor((prev: any) => ({
            ...prev, website: {
                ...prev?.website,
                pages: prev?.website?.pages?.map((p: any) => {
                    if (p.path != path) return p;
                    return data
                })
            }
        }))
        setOpen(false)
        return true
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