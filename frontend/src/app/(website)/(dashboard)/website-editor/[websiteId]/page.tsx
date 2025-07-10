import WebsiteEditor from "@/components/website-editor"

export default async function Page({ params }: { params: any }) {
    const { websiteId } = await params
    
    return (
        <>
            <WebsiteEditor websiteId={websiteId} />
        </>
    )
}