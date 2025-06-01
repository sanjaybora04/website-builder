import { Trash2 } from "lucide-react"
import FileSelector from "../storage/fileSelector"
import FileUploadComponent from "../storage/fileuploader"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useDebouncedCallback } from 'use-debounce'
import RichTextEditor from "./rich-text-editor"

type TestType = {
    title?: string,
    paragraph?: string,
    image1?: string
    image2?: string
    image3?: string
}

export function Component({ config }: { config: TestType }) {
    return (
        <div className="px-4 py-10 sm:px-10 md:px-20">
            <div>
                <div className="text-2xl sm:text-3xl font-semibold font-raleway" dangerouslySetInnerHTML={{__html:config.title||''}}/>
                <div className="mt-2" dangerouslySetInnerHTML={{__html:config.paragraph||''}} />
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-5">
                <img src={config.image1} className="sm:w-1/3 object-cover" />
                <img src={config.image2} className="sm:w-1/3 object-cover" />
                <img src={config.image3} className="sm:w-1/3 object-cover" />
            </div>
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: TestType, handleSubmit: (data: TestType) => Promise<boolean> }) {
    const debouncedUpdate = useDebouncedCallback((partialUpdate: Partial<TestType>) => {
        handleSubmit({ ...values, ...partialUpdate })
    }, 200) // 200ms debounce delay

    return (
        <div className="space-y-2">
            <RichTextEditor
                label="Title"
                value={values.title ?? ''}
                onChange={(v) => debouncedUpdate({ title: v })}
                showAlignment
                showBackgroundColor
                showHeading
                showLink
                showList
            />

            <RichTextEditor
                label="Paragraph"
                value={values.paragraph ?? ''}
                onChange={(v) => debouncedUpdate({ paragraph: v })}
                showAlignment
                showBackgroundColor
                showHeading
                showLink
                showList
            />

            {[1, 2, 3].map((num) => {
                const key = `image${num}` as keyof TestType
                const imageValue = values[key]
                return (
                    <div key={key}>
                        <Label>{`Image${num}`}</Label>
                        {imageValue ? (
                            <div className="relative">
                                <img src={imageValue} />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={() => handleSubmit({ [key]: undefined } as TestType)}
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <FileUploadComponent onUpload={(url:any) => handleSubmit({ [key]: url } as TestType)} />
                                <FileSelector onSelect={(url:any) => handleSubmit({ [key]: url } as TestType)} />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}