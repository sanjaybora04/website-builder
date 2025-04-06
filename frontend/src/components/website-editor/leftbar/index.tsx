import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { websiteEditorAtom } from "@/lib/atoms";
import Routes from "@/lib/routes";
import { useAtom } from "jotai";
import { ArrowBigLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import PageComponents from "./page-components";

export default function EditorLeftBar() {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)
    return (
        <ScrollArea className="h-full">
            <div className="sticky z-10 top-0 pb-1 bg-accent border-b flex justify-between items-center">
                <div>Editing - {websiteEditor?.website?.name}</div>
                <Button size='sm' variant='outline' className="h-7" asChild>
                    <Link href={Routes.overview}>
                        <ArrowBigLeft className="fill-current" />
                    </Link>
                </Button>
            </div>
            <PageComponents />
        </ScrollArea>
    )
}