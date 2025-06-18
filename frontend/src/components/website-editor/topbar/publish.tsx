import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { websiteEditorAtom } from "@/lib/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function PublishWebsiteButton(){
    const websiteEditor = useAtomValue(websiteEditorAtom)

    async function publish(){
        const id = toast.loading('Publishing website...')
        try{
            await api.website.update(websiteEditor?.website?.id,{pages:websiteEditor?.website?.pages})
            toast.success('Website Published!!!',{id})
        }catch{
            toast.dismiss(id)
        }
        
    }
    return (
        <Button onClick={()=>publish()}><Upload/>Publish</Button>
    )
}