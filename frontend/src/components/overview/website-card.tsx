import Routes from "@/lib/routes";
import { Website } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import WebsiteForm from "./website-form";
import { toast } from "sonner";
import api from "@/lib/api";

export default function WebsiteCard({ website, loadWebsites }: { website: Website, loadWebsites: any }) {
    async function deleteWebsite() {
        const prompt = window.prompt('Are you sure you want to delete this website?\nType DELETE to confirm')
        if (prompt != "DELETE") return

        const id = toast.loading('Deleting website...')
        try {
            await api.website.delete(website.id!)
            toast.success('Website Deleted', { id })
            loadWebsites()
        } catch {
            toast.dismiss(id)
        }
    }

    async function editWebsite(data: Website) {
        const id = toast.loading('Updating Website...')
        try {
            await api.website.update(website.id,data)
            loadWebsites()
            toast.success('Website updated', { id })
            return true
        } catch {
            toast.dismiss(id)
            return false
        }
    }
    return (
        <div key={website.id} className="relative">
            <Link href={Routes.websiteEditor(website.id!)}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {website.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {website.domain}
                    </CardContent>
                </Card>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger className=" absolute right-5 top-5 p-1">
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='ghost' className="w-full justify-start">
                                <Edit />
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <WebsiteForm data={website} onSubmit={editWebsite} />
                        </DialogContent>
                    </Dialog>
                    {/* <DropdownMenuItem>
                                        <Settings2 />
                                        Configure Domain
                                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => deleteWebsite()}>
                        <Trash2 />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}