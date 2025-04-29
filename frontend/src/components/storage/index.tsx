'use client'

import { Trash, Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Stats from "./stats";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import FileUploader from "./fileuploader";
import { toast } from "sonner";

export default function Storage() {
    const [state, setState] = useState({
        usage: {
            storageLimit: 1,
            usedStorage: 0
        },
        assets: []
    })

    async function loadData() {
        const res = await api.user.getAssets()
        if (res.data) {
            setState(res.data)
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    async function onDelete(assetId: string) {
        const id = toast.loading('Deleting asset...')
        const res = await api.user.deleteAsset(assetId)
        if (res.status == 200) {
            toast.success('Asset Deleted', { id })
            window.location.reload()
        } else {
            toast.dismiss(id)
        }
    }
    return (
        <div className="p-5 sm:px-10">
            <Stats usage={state?.usage} />
            <div className="flex gap-2">
                <Input placeholder="search assets" />
                <FileUploader />
            </div>
            <div className="flex flex-wrap gap-5 mt-10">
                {state?.assets?.map((a: any, index: any) =>
                    <div key={index} className="w-52 h-52 rounded overflow-hidden relative">
                        <button onClick={() => onDelete(a.id)} className="absolute top-2 right-2 text-red-500 cursor-pointer"><Trash2 className="w-5 h-5" /></button>
                        <img key={index} src={a.url} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
        </div>
    )
}