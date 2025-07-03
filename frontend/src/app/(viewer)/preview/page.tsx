"use client"
import useWebsiteEditor from "@/hooks/use-website-editor";
import builderComponents from "@/lib/builder-components";
import { useAtomValue } from "jotai"
import { useMemo } from "react";

export default function Page() {
    const { websiteEditor } = useWebsiteEditor()

    const activePage =
        useMemo(() =>
            websiteEditor?.website?.pages?.find(p => p.path === websiteEditor.activePage)
            , [websiteEditor]
        );
    return (
        <>
            {activePage?.components?.map((c, index) => {
                const Comp = builderComponents.find(b => b.id == c.id)?.component
                return <Comp key={index} config={c.config} />
            }
            )}
        </>
    )
}