import { Folder } from "lucide-react";

export default function FolderCard({folder}:{folder:any}){
    return (
        <div className="w-40 h-48 rounded overflow-hidden flex gap-2 flex-col justify-between border p-1 cursor-pointer hover:bg-accent">
            <Folder className="w-full h-32 text-muted-foreground fill-current" />
            <div className="line-clamp-1 text-center" title={folder.name}>
                {folder.name}
            </div>
        </div>
    )
}