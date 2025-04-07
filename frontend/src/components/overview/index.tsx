'use client'

import { Edit, Ellipsis, Plus, Settings2, Trash2 } from "lucide-react"
import DashboardHeader from "../layout/dashboard-header"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import WebsiteForm from "./website-form"
import { atom, useAtom } from "jotai"
import { Website } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import Routes from "@/lib/routes"
import { useEffect } from "react"
import api from "@/lib/api"
import { toast } from "sonner"

const websitesAtom = atom<Website[]>()

export default function Overview() {
    const [websites, setWebsites] = useAtom(websitesAtom)

    async function loadWebsites() {
        const res = await api.website.getAll()
        setWebsites(res.data)
    }
    useEffect(() => {
        loadWebsites()
    }, [])

    async function addWebsite(data: Website) {
        const id = toast.loading('Creating Website...')
        try {
            await api.website.create(data)
            loadWebsites()
            toast.success('Website created', { id })
            return true
        } catch {
            toast.dismiss(id)
            return false
        }
    }

    async function deleteWebsite(websiteId: any) {
        const prompt = window.prompt('Are you sure you want to delete this website?\nType DELETE to confirm')
        if (prompt != "DELETE") return

        const id = toast.loading('Deleting website...')
        try {
            await api.website.delete(websiteId)
            toast.success('Website Deleted', { id })
            loadWebsites()
        } catch {
            toast.dismiss(id)
        }
    }
    return (
        <>
            <DashboardHeader />
            <div className="p-5 sm:px-10 md:px-20">
                <div className="flex justify-between items-center gap-3">
                    {/* <Input placeholder="Search websites..." /> */}
                    <div className="text-lg sm:text-xl font-raleway font-semibold">
                        Start Building Your Online Presence
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus />
                                Add Website
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <WebsiteForm onSubmit={addWebsite} />
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-7">
                    {websites ? websites.map(w =>
                        <div key={w.id} className="relative">
                            <Link href={Routes.websiteEditor(w.id!)}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {w.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {w.domain}
                                    </CardContent>
                                </Card>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className=" absolute right-5 top-5">
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
                                            <WebsiteForm data={w} onSubmit={addWebsite} />
                                        </DialogContent>
                                    </Dialog>
                                    {/* <DropdownMenuItem>
                                        <Settings2 />
                                        Configure Domain
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem onClick={() => deleteWebsite(w.id)}>
                                        <Trash2 />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : <div>...loading</div>}
                </div>
            </div>
        </>
    )
}