'use client'
import api from "@/lib/api";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";
import { useEffect, useState } from "react";
import { Folder, Loader, X } from "lucide-react";
import StorageTopBar from "./storageTopBar";
import { Button } from "../ui/button";
import Storage from ".";

export default function FileSelector({ onSelect }: { onSelect?: any }) {
    const [open, setOpen] = useState(false);
    const [folderPath, setFolderPath] = useState<any>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadData() {
        setLoading(true);
        const assetsRes = await api.user.getAssets(folderPath.length > 0 ? folderPath[folderPath.length - 1]?.id : '');
        const foldersRes = await api.user.getFolders(folderPath.length > 0 ? folderPath[folderPath.length - 1]?.id : '');

        if (assetsRes.status === 200 && foldersRes.status === 200) {
            setAssets(assetsRes.data);
            setFolders(foldersRes.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [folderPath]);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="left">
            <DrawerTrigger asChild>
                <Button>
                    <Folder/> Select File
                </Button>
            </DrawerTrigger>
            <DrawerContent className="!w-full !max-w-2xl">
                
                <button className="absolute top-2 right-2 cursor-pointer z-10"
                    onClick={()=>setOpen(false)}
                ><X className="w-5 h-5"/></button>
                <Storage onFileSelect={(url:string)=>onSelect(url)}/>
            </DrawerContent>
        </Drawer>
    );
}