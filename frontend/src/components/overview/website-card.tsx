import Routes from "@/lib/routes";
import { Website } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DownloadIcon, Edit, Ellipsis, Settings, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import WebsiteForm from "./website-form";
import { toast } from "sonner";
import api from "@/lib/api";
import { useState } from "react";

export default function WebsiteCard({ website, loadWebsites }: { website: Website, loadWebsites: any }) {
    const [editWebsiteFormOpen, setEditWebsiteFormOpen] = useState(false)

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
            await api.website.update(website.id, data)
            loadWebsites()
            setEditWebsiteFormOpen(false)
            toast.success('Website updated', { id })
            return true
        } catch {
            toast.dismiss(id)
            return false
        }
    }

    async function exportWebsite() {
        const id = toast.loading('Exporting website...')
        try {
            const res = await api.website.get(website.id!) // Fetch full exportable data
    
            // Remove `id` and `domain` from the data
            const { id: _, domain, draftPages, ...cleanedData } = res.data
    
            const blob = new Blob([JSON.stringify(cleanedData, null, 2)], {
                type: 'application/json',
            })
            const url = URL.createObjectURL(blob)
    
            const link = document.createElement('a')
            link.href = url
            link.download = `${website.name || 'website'}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
    
            toast.success('Export complete', { id })
        } catch {
            toast.error('Failed to export website', { id })
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

                    <Dialog open={editWebsiteFormOpen} onOpenChange={setEditWebsiteFormOpen}>
                        <DialogTrigger asChild>
                            <Button variant='ghost' className="w-full justify-start">
                                <Settings />
                                Settings
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

                    <DropdownMenuItem onClick={exportWebsite}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Export
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}