import { PaintBucket, Type } from "lucide-react"
import { Input } from "../input"
import ColorPicker from "./color-picker"
import ImageInput, { ImageInputValue } from "./image-input"
import Panel from "./panel"

export type ContainerConfig = {
    id?: string
    color?: string
    backgroundColor?: string
    backgroundImage?: ImageInputValue
}

type ContainerProps = {
    config?: ContainerConfig
    children: React.ReactNode
    className?: string
}

type ContainerEditorProps = {
    config?: ContainerConfig
    onChange: (value:ContainerConfig)=>void
    enable?: {
        backgroundImage?:boolean
    }
}

export function Container({ config, children, className}: ContainerProps) {
    const style: React.CSSProperties = {
        color: config?.color,
        backgroundColor: config?.backgroundColor,
        backgroundImage: config?.backgroundImage?.url
            ? `url(${config.backgroundImage.url})`
            : undefined,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    const defaultClass = [
        'px-4 py-10 sm:px-10 md:px-20',
        className ?? '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div id={config?.id} className={defaultClass} style={style}>
            {children}
        </div>
    )
}


export function ContainerPanel({ config,onChange, enable }: ContainerEditorProps) {
    return (
        <Panel title="Container" defaultOpen={false}>
            <Input value={config?.id} onChange={(e) => onChange({ id: e.target.value })} placeholder="Component Id" />
            <div className="flex gap-1">
                <ColorPicker icon={<Type />} color={config?.color} onChange={(v) => onChange({color: v })} />
                <ColorPicker icon={<PaintBucket />} color={config?.backgroundColor} onChange={(v) => onChange({ backgroundColor: v })} />
            </div>
            {enable?.backgroundImage!=false&&<ImageInput label="Background Image" value={config?.backgroundImage} onChange={(v) => onChange({ backgroundImage: v })} />}
            <hr />

        </Panel>
    )
}