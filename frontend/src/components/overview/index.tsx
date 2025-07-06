'use client'

import DashboardHeader from "../layout/dashboard-header"
import { atom, useAtom } from "jotai"
import { Website } from "@/lib/types"
import { useEffect } from "react"
import api from "@/lib/api"
import WebsiteCard from "./website-card"
import AddWebsite from "./add-website"
import { buttonVariants } from "../ui/button"
import useWebsites from "@/hooks/use-websites"
import { Loader } from "lucide-react"



export default function Overview() {
    const { websites, loadWebsites } = useWebsites()
    return (
        <>
            <DashboardHeader />
            <div className="p-5 sm:px-10 md:px-20">
                <div className="flex justify-between items-center gap-3">
                    {/* <Input placeholder="Search websites..." /> */}
                    <div className="text-lg sm:text-xl font-raleway font-semibold">
                        Start Building Your Online Presence
                    </div>
                    <AddWebsite loadWebsites={loadWebsites} />
                </div>
                {websites.loading ? <div className="mt-28 flex flex-col gap-2 items-center"><Loader className="animate-spin"/>Loading...</div> :
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-7">
                        {websites.data.map(w =>
                            <WebsiteCard key={w.id} website={w} loadWebsites={loadWebsites} />
                        )}
                    </div>
                }
                {!websites.loading && websites.data?.length == 0 &&
                    <div className="mt-20 flex flex-col items-center gap-3 w-full">
                        <div className="text-lg">Create Your first Website</div>
                        <label htmlFor="addWebsiteButton" className={buttonVariants()}>
                            Add Website
                        </label>
                    </div>
                }
            </div>
        </>
    )
}