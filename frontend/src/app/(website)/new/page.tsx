'use client'
import { templates } from "@/lib/templates";
import { FolderDown } from "lucide-react";
import { useRef } from "react";
import TemplateCard from "./templateCard";
import useModal from "@/hooks/use-modal";

export default function Page() {
    const {setModal} = useModal()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const json = JSON.parse(text);

            // Optional: validate the structure of json
            if (!json || typeof json !== "object") {
                alert("Invalid template format");
                return;
            }

            setModal({id:'addWebsite',data:{website:json}})
        } catch (error) {
            alert("Error reading file");
            console.error(error);
        }
    };
    return (
        <div className="p-4">
            <div className="text-xl my-5">Select a Template</div>
            <div className="flex justify-center sm:justify-start flex-wrap gap-4">
                <div
                    className="w-64 p-4 border rounded cursor-pointer hover:bg-muted text-center aspect-square flex flex-col items-center justify-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <FolderDown />
                    Import
                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
                {templates.map((t) => (
                    <TemplateCard key={t.id} template={t} />
                ))}
            </div>
        </div>
    )
}