"use client"
import useWebsiteEditor from "@/hooks/use-website-editor";
import builderComponents from "@/lib/builder-components";
import { useMemo } from "react";

export default function Page() {
    const editor = useWebsiteEditor()

    const activePage =
        useMemo(() =>
            editor?.website?.pages?.find(p => p.path === editor.activePage)
            , [editor.activePage,editor.website?.pages]
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