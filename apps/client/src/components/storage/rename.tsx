import api from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Rename({ type, id, onRename, children }: { type: 'asset' | 'folder', id: string; onRename: any, children: any }) {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newName, setNewName] = useState('');

    async function onSubmit() {
        const toastId = toast.loading('Renaming...');
        setSubmitting(true);

        let res;
        if (type === 'asset') {
            res = await api.user.renameAsset(id, newName);
        } else {
            res = await api.user.renameFolder(id, newName);
        }

        setSubmitting(false);

        if (res.status === 200) {
            toast.success('Renamed successfully', { id: toastId });
            onRename();
            setOpen(false);
        } else {
            toast.dismiss(toastId);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(e)=>{e.preventDefault();e.stopPropagation();setOpen(true);}}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Rename {type}</DialogTitle>
                </DialogHeader>
                <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={`New ${type} name`}
                    className="w-full p-2 border rounded mb-4"
                />
                <Button disabled={submitting} onClick={onSubmit}>
                    Rename
                </Button>
            </DialogContent>
        </Dialog>
    );
}