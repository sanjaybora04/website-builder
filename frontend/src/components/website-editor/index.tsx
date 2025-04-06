'use client'
import { ChevronRight, Edit, LaptopMinimal, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { websiteEditorAtom } from "@/lib/atoms";
import { useAtom, useAtomValue } from "jotai";
import Preview from "./preview";
import EditorLeftBar from "./leftbar";
import EditorTopBar from "./topbar";
import EditorRightBar from "./rightbar";
import api from "@/lib/api";

export default function WebsiteEditor({ websiteId }: { websiteId: string }) {

    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)

    async function loadWebsite(){
        const res = await api.website.get(websiteId)
        setWebsiteEditor({
            website:res.data,
            activePage: res.data.pages?.[0]?.path,
            leftSidebarOpen:true,
            previewSize:'desktop'
        })
    }

    useEffect(() => {
        loadWebsite()
    }, [])

    // show warning before navigation
    useEffect(() => {
        const interceptNavigation = (event: MouseEvent) => {
            const target = event.target as HTMLAnchorElement;
            if (target.tagName === "A" && target.href) {
                const confirmLeave = window.confirm("You have unsaved changes. Do you really want to leave?");
                if (!confirmLeave) {
                    event.preventDefault(); // Prevent link click navigation
                    event.stopPropagation();
                }
            }
        };

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ""; // Necessary for Chrome
        };

        const handlePopState = () => {
            const confirmLeave = window.confirm("You might have unsaved changes. Do you really want to leave?");
            if (!confirmLeave) {
                history.pushState(null, "", window.location.href); // Push state back to prevent navigation
            } else {
                window.removeEventListener("popstate", handlePopState); // Allow navigation after confirmation
            }
        };

        // Push a dummy state to prevent initial back navigation
        history.pushState(null, "", window.location.href);

        document.addEventListener("click", interceptNavigation, true);
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            document.removeEventListener("click", interceptNavigation, true);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    if(!websiteEditor) return <div>Loading...</div>

    return (
        <>
            <div className={cn("fixed z-30 left-0 top-14 bg-sidebar-accent border h-[calc(100vh-56px)] w-full sm:w-80 duration-300 p-2", websiteEditor?.leftSidebarOpen ? "translate-x-0" : "-translate-x-full")}>
                <button className={cn("absolute z-10 cursor-pointer top-1/2 border bg-secondary text-secondary-foreground duration-300", websiteEditor?.leftSidebarOpen ? "right-0 sm:-right-3 rotate-180" : "-right-5 rotate-0")} onClick={() => setWebsiteEditor((prev: any) => ({ ...prev, leftSidebarOpen: !prev?.leftSidebarOpen }))}>
                    <ChevronRight className='w-5 h-5' />
                </button>
                <EditorLeftBar />
            </div>
            <div className={cn(
                "h-[calc(100vh-56px)] flex-grow border transition-all duration-300",
                websiteEditor?.leftSidebarOpen ? "ml-64 sm:ml-80" : "ml-0",
                websiteEditor?.activeComponent ? "mr-64 sm:mr-80" : "mr-0"
            )}>
                <EditorTopBar/>
                <div className="w-full h-[calc(100%-40px)]">
                    <Preview />
                </div>

            </div>
            <div className={cn("fixed z-40 right-0 top-14 bg-sidebar-accent border h-[calc(100vh-56px)] w-full sm:w-80 duration-300 p-2", websiteEditor?.activeComponent ? "translate-x-0" : "translate-x-full")}>
                <EditorRightBar/>
            </div>
        </>
    )
}