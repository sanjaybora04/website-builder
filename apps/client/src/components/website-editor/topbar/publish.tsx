import { Button } from "@/components/ui/button";
import useWebsiteEditor from "@/hooks/use-website-editor";
import { Upload } from "lucide-react";

export function PublishWebsiteButton(){
    const editor = useWebsiteEditor()
    return (
        <Button onClick={()=>editor.publish()}><Upload/>Publish</Button>
    )
}