import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { templates } from "@/lib/templates";
import { Import, Upload } from "lucide-react";
import { useRef } from "react";

export default function SelectTemplate({ setStep, setData }: { setStep: any, setData: any }) {
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

            setData(json);
            setStep(2);
        } catch (error) {
            alert("Error reading file");
            console.error(error);
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Select Template</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div
                    className="p-4 border rounded cursor-pointer hover:bg-muted text-center aspect-square flex flex-col items-center justify-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Import/>
                    Import
                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
                {templates.map((t, i) => (
                    <div
                        key={i}
                        className="p-4 border aspect-square rounded cursor-pointer flex flex-col items-center justify-center gap-2 relative"
                        onClick={() => {
                            setData(t.website);
                            setStep(2);
                        }}
                    >
                        <img src={t.image} className="w-full object-cover"/>
                        <div className="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 duration-200 hover:bg-primary/80 text-primary-foreground font-bold flex items-center justify-center">
                            Use
                        </div>
                        {t.name}
                    </div>
                ))}
            </div>
        </>
    );
}
