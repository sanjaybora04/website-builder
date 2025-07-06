'use client'

import { Edit, EllipsisVertical, FolderInput, Loader, SquareArrowOutUpRight, Trash2, Upload } from "lucide-react";
import Stats from "./stats";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import MoveToFolder from "./moveToFolder";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";
import StorageTopBar from "./storageTopBar";
import Rename from "./rename";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { buttonVariants } from "../ui/button";

export default function Storage({ onFileSelect }: { onFileSelect?: any }) {
    const [usage, setUsage] = useState({
        loading: true,
        data: {
            storageLimit: 1,
            usedStorage: 0
        }
    })

    const [folderPath, setFolderPath] = useState<any>([])

    const [data, setData] = useState({
        folders: [],
        assets: [],
        loading: true
    })

    async function loadUsage() {
        setUsage(prev => ({ ...prev, loading: true }))

        const res = await api.user.getUsage()
        if (res.status == 200) {
            setUsage({
                loading: false,
                data: res.data
            })
        } else {
            setUsage(prev => ({ ...prev, loading: false }))
        }
    }

    async function loadData() {
        setData(prev => ({ ...prev, loading: true }))

        const assets = await api.user.getAssets(folderPath.length > 0 ? folderPath[folderPath.length - 1]?.id : '')
        const folders = await api.user.getFolders(folderPath.length > 0 ? folderPath[folderPath.length - 1]?.id : '')

        if (assets.status == 200 && folders.status == 200) {
            setData({
                loading: false,
                assets: assets.data,
                folders: folders.data
            })
        } else {
            setData(prev => ({ ...prev, loading: false }))
        }
    }

    useEffect(() => {
        loadData()
    }, [folderPath])

    useEffect(() => {
        loadUsage()
    }, [])

    async function onDeleteAsset(key: string) {
        const id = toast.loading('Deleting asset...')
        const res = await api.user.deleteAsset(key)
        if (res.status == 200) {
            toast.success('Asset Deleted', { id })
            loadData()
        } else {
            toast.dismiss(id)
        }
    }

    async function onDeletefolder(folderId: string) {
        const id = toast.loading('Deleting folder...')
        const res = await api.user.deleteFolder(folderId)
        if (res.status == 200) {
            toast.success('Folder Deleted', { id })
            loadData()
        } else {
            toast.dismiss(id)
        }
    }

    return (
        <ScrollArea className="p-5 sm:px-10 relative h-full">
            <div className="sticky top-0 bg-background z-10 pb-2">
            <Stats usage={usage.data} />
            <StorageTopBar folderPath={folderPath} setFolderPath={setFolderPath} reload={() => loadData()} />
            </div>
            <div className="flex flex-wrap gap-5 mt-10">
                {data.loading && <div className="w-full flex flex-col items-center gap-2 mt-20"><Loader className="animate-spin" />Loading...</div>}
                {!data.loading && data?.folders?.map((f: any, index: any) =>
                    <div className="relative" key={index}>
                        <button
                            onClick={() => {
                                setFolderPath((prev: any) => ([...prev, f]))
                            }}
                        >
                            <FolderCard folder={f} />
                        </button>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="absolute top-2 right-2 text-primary bg-background/50 rounded p-1 cursor-pointer">
                                <EllipsisVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Rename type="folder" id={f.id} onRename={() => loadData()}>
                                    <DropdownMenuItem>
                                        <Edit className="w-5 h-5 mr-2" />
                                        Rename
                                    </DropdownMenuItem>
                                </Rename>
                                <MoveToFolder type="folder" id={f.id} onMove={() => loadData()}>
                                    <DropdownMenuItem>
                                        <FolderInput className="w-5 h-5 mr-2" />
                                        Move
                                    </DropdownMenuItem>
                                </MoveToFolder>
                                <DropdownMenuItem onClick={(e) => { onDeletefolder(f.id) }} className="text-red-500">
                                    <Trash2 className="w-5 h-5 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
                {!data.loading && data?.assets?.map((a: any, index: any) =>
                    <div key={index} className={cn('relative', onFileSelect && "cursor-pointer hover:bg-accent")}>
                        <div
                            onClick={() => onFileSelect(process.env.NEXT_PUBLIC_S3_URL + '/' + a.key)}
                        >
                            <FileCard file={a} />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="absolute top-2 right-2 text-primary bg-background/50 rounded p-1 cursor-pointer">
                                <EllipsisVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => window.open(process.env.NEXT_PUBLIC_S3_URL + '/' + a.key, '_blank')}>
                                    <SquareArrowOutUpRight className="w-5 h-5 mr-2" />
                                    View
                                </DropdownMenuItem>
                                <Rename type="asset" id={a.key} onRename={() => loadData()}>
                                    <DropdownMenuItem>
                                        <Edit className="w-5 h-5 mr-2" />
                                        Rename
                                    </DropdownMenuItem>
                                </Rename>
                                <MoveToFolder type="asset" id={a.key} onMove={() => loadData()}>
                                    <DropdownMenuItem>
                                        <FolderInput className="w-5 h-5 mr-2" />
                                        Move
                                    </DropdownMenuItem>
                                </MoveToFolder>
                                <DropdownMenuItem onClick={() => onDeleteAsset(a.key)} className="text-red-500">
                                    <Trash2 className="w-5 h-5 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
                {!data.loading && data?.folders.length==0 && data?.assets.length==0 &&
                    <div className="mt-20 flex flex-col items-center gap-3 w-full">
                    <div className="text-lg">This folder is empty</div>
                    <label htmlFor="fileUploadButton" className={buttonVariants()}>
                        Upload File
                        <Upload/>
                    </label>
                </div>
                }
            </div>
        </ScrollArea>
    )
}