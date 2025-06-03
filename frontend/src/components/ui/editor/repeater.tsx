import { Button } from "@/components/ui/button"
import { AlertTriangle, Plus, Trash2 } from "lucide-react"
import { JSX, useState } from "react"
import { Label } from "@/components/ui/label"

type RepeaterEditorProps<T> = {
    label: string
    value: T[]
    onChange: (value: T[]) => void
    min?: number
    max?: number
    renderEditor: (item: T, onChange: (item: T) => void, index: number) => JSX.Element
    createNewItem: () => T
}

export function RepeaterEditor<T>({
    label,
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
                <div key={index} className="relative pt-8 rounded-md">
                    {renderEditor(item, (newItem) => {
                        const updated = [...value]
                        updated[index] = newItem
                        onChange(updated)
                    }, index)}
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeItem(index)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
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
