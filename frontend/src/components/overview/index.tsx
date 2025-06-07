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
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { toast } from "sonner"
import WebsiteCard from "./website-card"
import AddWebsite from "./add-website"

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
    return (
        <>
            <DashboardHeader />
            <div className="p-5 sm:px-10 md:px-20">
                <div className="flex justify-between items-center gap-3">
                    {/* <Input placeholder="Search websites..." /> */}
                    <div className="text-lg sm:text-xl font-raleway font-semibold">
                        Start Building Your Online Presence
                    </div>
                    <AddWebsite loadWebsites={loadWebsites}/>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-7">
                    {websites ? websites.map(w =>
                        <WebsiteCard key={w.id} website={w} loadWebsites={loadWebsites}/>
                    ) : <div>...loading</div>}
                </div>
            </div>
        </>
    )
}