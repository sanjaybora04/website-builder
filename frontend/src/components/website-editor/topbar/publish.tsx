import { Button } from "@/components/ui/button";
import useWebsiteEditor from "@/hooks/use-website-editor";
import api from "@/lib/api";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function PublishWebsiteButton(){
    const {websiteEditor} = useWebsiteEditor()

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