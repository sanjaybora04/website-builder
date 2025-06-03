'use client'
import api from "@/lib/api";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export default function FileSelector({ onSelect }: { onSelect?: any }) {
    const [assets, setAssets] = useState<any>([])

    async function loadData() {
        const res = await api.user.getAssets()
        if (res.data) {
            console.log(res.data.assets)
            setAssets(res.data.assets)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Select</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select an Image</DialogTitle>
                </DialogHeader>
                {/* <Input placeholder="Search..." /> */}
                <ScrollArea className="max-h-[80vh]">
                    <div className="grid gap-5 grid-cols-2 ">
                    {assets.map((a: any) =>
                        <button
                        key={a.key}
                        onClick={() => {
                            onSelect(process.env.NEXT_PUBLIC_S3_URL + '/' + a.key)
                        }}
                        className="cursor-pointer w-full border rounded bg-accent">
                            <img src={process.env.NEXT_PUBLIC_S3_URL + '/' + a.key} className="w-full aspect-square object-contain" />
                        </button>
                    )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}