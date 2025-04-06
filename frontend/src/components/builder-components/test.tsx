import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

type TestType = {
    title?: string,
    paragraph?: string,
}

export function Component({ config }: { config: TestType }) {
    return (
        <div className="p-4 py-10 sm:p-10 md:px-20 border border-black bg-stone-100">
            <div className="max-w-3xl mx-auto">
                <div className="text-2xl sm:text-3xl font-semibold font-raleway text-center">{config.title}</div>
                <div className="text-center mt-2">{config.paragraph}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
                <img src="/images/test.svg" className="sm:w-1/3"/>
                <img src="/images/test.svg" className="sm:w-1/3"/>
                <img src="/images/test.svg" className="sm:w-1/3"/>
            </div>
        </div>
    )
}

export function Editor({ values, handleSubmit }: { values: TestType, handleSubmit: (data: TestType) => Promise<boolean> }) {

    return (
        <div className="space-y-2">
            <Label>Title</Label>
            <Input value={values.title} onChange={(e) => handleSubmit({ title: e.target.value })} />
            <Label>Paragraph</Label>
            <Textarea value={values.paragraph} onChange={(e) => handleSubmit({ paragraph: e.target.value })} />
        </div>
    )
}