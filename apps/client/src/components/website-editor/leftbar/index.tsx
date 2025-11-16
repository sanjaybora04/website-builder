import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Routes from "@/lib/routes";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import PageComponents from "./page-components";
import useWebsiteEditor from "@/hooks/use-website-editor";

export default function EditorLeftBar() {
    const editor = useWebsiteEditor()
    return (
        <ScrollArea className="h-full">
            <div className="sticky z-10 top-0 pb-1 bg-accent border-b flex justify-between items-center">
                <div>Editing - {editor?.website?.name}</div>
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