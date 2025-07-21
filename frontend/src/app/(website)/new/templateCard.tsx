'use client'
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/templates";
import { ArrowUpRight, Edit } from "lucide-react";
import useModal from "@/hooks/use-modal";

export default function TemplateCard({ template }: { template: Template }) {
    const {setModal} = useModal()

    return (
        <div className="w-64 p-3 border aspect-square rounded flex flex-col items-center justify-center gap-2 relative">
            <img src={template.image} className="w-full object-cover" />
            {template.name}
            <div className="w-full flex gap-3 justify-center">
                <Button size='sm' onClick={()=>setModal({id:'addWebsite',data:{website:template.website}})}><Edit/>Use</Button>

                {template.previewUrl &&
                    <Button size='sm' asChild>
                        <a href={template.previewUrl} target="_blank">
                            <ArrowUpRight />Live Preview
                        </a>
                    </Button>
                }
            </div>
        </div>
    );
}