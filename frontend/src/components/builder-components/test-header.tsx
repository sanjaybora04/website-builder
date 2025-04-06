import { Input } from "../ui/input"
import { Label } from "../ui/label"

type TestType = {
    companyName?: string,
}

export function Component({ config }: { config: TestType }) {
    return (
        <>
        <div className="h-20"></div>
        <div className="fixed top-0 left-0 w-screen h-20 flex items-center gap-5  px-4 sm:px-10 md:px-20 bg-white border-b border-black shadow">
            <div className="text-xl font-semibold font-raleway">{config.companyName}</div>
            
        </div>
        </>
    )
}

export function Editor({ values, handleSubmit }: { values: TestType, handleSubmit: (data: TestType) => Promise<boolean> }) {

    return (
        <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={values.companyName} onChange={(e) => handleSubmit({ companyName: e.target.value })} />
        </div>
    )
}