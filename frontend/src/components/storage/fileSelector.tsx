'use client'
import api from "@/lib/api";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";
import { useEffect, useState } from "react";
import { Folder, Loader } from "lucide-react";
import StorageTopBar from "./storageTopBar";
import { Button } from "../ui/button";

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
                <div className="p-5 space-y-5">
                    <StorageTopBar folderPath={folderPath} setFolderPath={setFolderPath} reload={()=>loadData()} />
                    <div className="flex flex-wrap gap-5 mb-5">
                        {loading && <div className="w-full h-52 flex items-center justify-center"><Loader className="w-10 h-10 animate-spin text-primary" /></div>}
                        {!loading && folders.map((f: any, index: any) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setFolderPath((prev: any) => ([...prev, f]));
                                }}
                                className="hover:bg-accent cursor-pointer"
                            >
                                <FolderCard folder={f} />
                            </button>
                        ))}
                        {!loading && assets.map((a: any, index: any) => (
                            <button key={index} className="hover:bg-accent cursor-pointer"
                                onClick={() => {
                                    if (onSelect) {
                                        onSelect(process.env.NEXT_PUBLIC_S3_URL + '/' + a.key)
                                    }
                                    setOpen(false);
                                }}
                            >
                                <FileCard file={a} />
                            </button>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}