import builderComponents from "@/lib/builder-components"

export default async function Page({params}:{params:Promise<any>}){
    const {id} = await params
    const Component = builderComponents.find(b=>b.id==id)
    if(!Component) return <></>
    return (
        <>
        <Component.component config={Component.examples[0]}/>
        </>
    )
}
