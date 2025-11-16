'use client'

import { FolderPlus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import api from "@/lib/api"
import { Input } from "../ui/input"
import { toast } from "sonner"

export default function AddFolder({parentId,onFolderAdd}:{parentId:string,onFolderAdd?:any}) {
    const [folderName, setFolderName] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [open, setOpen] = useState(false)
    
    async function onSubmit(){
        if(folderName.trim() === '') return;
        
        const id = toast.loading('Creating folder...')
        
        setSubmitting(true)
        const res = await api.user.addFolder(folderName, parentId)
        setSubmitting(false)
        
        if(res.status === 200){
            toast.success('Folder created successfully', { id })
            setOpen(false)
            onFolderAdd(folderName)
            return
        }
        toast.dismiss(id)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='icon' title="Add Folder"><FolderPlus/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Folder</DialogTitle>
                    <Input value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Folder Name" />
                    <Button className="mt-4" onClick={()=>onSubmit()} disabled={submitting}>Create</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}