'use client'
import { Button } from "@/components/ui/button"
import { AlertTriangle, Plus, Trash2 } from "lucide-react"
import { JSX, useState } from "react"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"
import { deepMergeWithDeletion } from "@/lib/utils"

type RepeaterEditorProps<T> = {
    label: string
    itemLabel: string
    value: T[]
    onChange: (value: T[]) => void
    min?: number
    max?: number
    renderEditor: (item: T, onChange: (item: T) => void, index: number) => JSX.Element
    createNewItem: () => T
}

export function RepeaterEditor<T>({
    label,
    itemLabel,
    value,
    onChange,
    min = 0,
    max = Infinity,
    renderEditor,
    createNewItem,
}: RepeaterEditorProps<T>) {
    const [warnings, setWarnings] = useState<string | null>(null)

    const addItem = () => {
        if (value.length >= max) {
            setWarnings(`Maximum of ${max} items allowed.`)
            return
        }
        setWarnings(null)
        onChange([...value, createNewItem()])
    }

    const removeItem = (index: number) => {
        if (value.length <= min) {
            setWarnings(`At least ${min} items required.`)
            return
        }
        setWarnings(null)
        const newValue = [...value]
        newValue.splice(index, 1)
        onChange(newValue)
    }

    return (
        <div className="space-y-4">
            <Label>{label}</Label>
            {value.map((item, index) => (
                <Collapsible key={index}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center p-2 rounded bg-primary/10 border-y">
                        <Label>{itemLabel} {index+1}</Label>
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeItem(index)}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 py-4">
                    {renderEditor(item, (v) => {
                        const newItem = deepMergeWithDeletion(item,v)
                        const updated = [...value]
                        updated[index] = newItem
                        onChange(updated)
                    }, index)}
                    </CollapsibleContent>
                </Collapsible>
            ))}

            {warnings && (
                <div className="text-yellow-600 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> {warnings}
                </div>
            )}

            <Button
                onClick={addItem}
                disabled={value.length >= max}
                className="flex items-center gap-2"
            >
                <Plus size={16} /> Add
            </Button>
        </div>
    )
}
