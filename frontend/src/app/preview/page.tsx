"use client"

import Branding from "@/components/builder-components/branding";
import { websiteEditorAtom } from "@/lib/atoms"
import builderComponents from "@/lib/builder-components";
import { useAtomValue } from "jotai"
import { useMemo } from "react";

export default function Page() {
    const websiteEditor = useAtomValue(websiteEditorAtom)
    const activePage = 
    useMemo(() =>
        websiteEditor?.website?.pages?.find(p => p.path === websiteEditor.activePage)
        ,[websiteEditor]
    );
    return (
        <>
            {activePage?.components?.map((c,index) => {
                const Comp = builderComponents.find(b => b.id == c.id)?.component
                return <Comp key={index} config={c.config}/>
            }
            )}
        </>
    )
}