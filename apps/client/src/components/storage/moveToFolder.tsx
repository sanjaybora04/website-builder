'use client'

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Folder } from "lucide-react";
import StorageTopBar from "./storageTopBar";
import FolderCard from "./folderCard";

export default function MoveToFolder({ type, id, onMove, children }: { type:'asset'|'folder',id: string; onMove: any, children: any }) {
    const [open, setOpen] = useState(false);
    const [folderPath, setFolderPath] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [folders, setFolders] = useState<any>({
        loading: true,
        data: []
    });

    async function loadFolders() {
        setFolders((prev:any) => ({ ...prev, loading: true }));
        const res = await api.user.getFolders(folderPath.length > 0 ? folderPath[folderPath?.length - 1]?.id : '');
        if (res.status === 200) {
            setFolders({
                loading: false,
                data: res.data
            });
        }
        setFolders((prev:any) => ({ ...prev, loading: false }));
    }

    useEffect(()=>{
        loadFolders();
    },[folderPath])

    async function onSubmit() {
        const toastId = toast.loading('Moving...');
        setSubmitting(true);
        const targetFolderId = folderPath[folderPath?.length - 1]?.id;

        let res;
        if (type === 'asset') {
            res = await api.user.moveAsset(id, targetFolderId);
        } else {
            res = await api.user.moveFolder(id, targetFolderId);
        }

        setSubmitting(false);

        if (res.status === 200) {
            toast.success('Moved successfully', { id: toastId });
            onMove();
        } else {
            toast.dismiss(toastId);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(e)=>{e.preventDefault();e.stopPropagation();setOpen(true);}}>
                {children}
            </DialogTrigger>
            <DialogContent>
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Select Destination folder</h2>
                    <StorageTopBar folderPath={folderPath} setFolderPath={setFolderPath} reload={()=>{loadFolders()}} enableUploadFile={false}/>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {folders.loading ? (
                            <p>Loading folders...</p>
                        ) : (
                            // dont show the folder that is being moved if type is folder
                            folders.data.filter((d:any)=>type=='asset'||d.id!=id).map((folder: any) => (
                                <button
                                    key={folder.id}
                                    onClick={() => setFolderPath([...folderPath, folder])}
                                >
                                    <FolderCard folder={folder}/>
                                </button>
                            ))
                        )}
                    </div>
                    <Button
                        onClick={onSubmit}
                        disabled={submitting}
                        className="w-full"
                    >
                        {submitting ? 'Moving...' : 'Move Here'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}