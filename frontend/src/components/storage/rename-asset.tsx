'use client'

import api from "@/lib/api";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function RenameAsset({key, name, onRename}: {key: string, name: string, onRename?: (newName: string) => void}) {
    const [newName, setNewName] = useState(name)

    const [submitting, setSubmitting] = useState(false)

    async function handleRename() {
        setSubmitting(true)
        const res = await api.user.renameAsset(key, newName)
        setSubmitting(false)
        if (res.status === 200) {
            onRename?.(newName)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                placeholder="New name"
            />
            <Button
                onClick={()=>handleRename()}
                disabled={submitting}
                className={`btn btn-primary ${submitting ? 'loading' : ''}`}
            >
                Rename
            </Button>
        </div>
    )
}