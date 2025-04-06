'use client'

import { Edit, Ellipsis, Plus, Settings2, Trash2 } from "lucide-react"
import DashboardHeader from "../dashboard-header"
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

const websitesAtom = atom<Website[]>()

export default function Overview() {
    const [websites, setWebsites] = useAtom(websitesAtom)

    async function loadWebsites(){
        const res = await api.website.getAll()
        setWebsites(res.data)
    }
    useEffect(()=>{
        loadWebsites()
    },[])
    async function addWebsite(data: Website) {
        try{
            await api.website.create(data)
            loadWebsites()
            return true
        }catch{
            return false
        }
    }
    return (
        <>
            <DashboardHeader />
            <div className="p-5 sm:px-10 md:px-20">
                <div className="flex gap-3">
                    <Input placeholder="Search websites..." />
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
                <div className="grid grid-cols-4 gap-5 my-5">
                    {websites?websites.map(w =>
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
                                    <DropdownMenuItem>
                                        <Edit />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings2 />
                                        Configure Domain
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trash2 />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ):<div>...loading</div>}
                </div>
            </div>
        </>
    )
}