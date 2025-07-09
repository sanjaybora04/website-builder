"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import Routes from "@/lib/routes";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";

export default function DashboardHeader() {
    const pathname = usePathname()
    const {user} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!user){
            router.push(Routes.home)
        }
    },[])
    return (
        <header className="sticky top-14 left-0 z-50 h-10 w-screen border-b flex gap-2 items-center justify-center bg-background px-5">
            <div>
                <Button variant='ghost' asChild>
                    <Link href={Routes.overview}>Overview</Link>
                </Button>
                {pathname == Routes.overview &&
                    <div className="h-0.5 w-full bg-primary"></div>
                }
            </div>
            <div>
                <Button variant='ghost' asChild>
                    <Link href={Routes.storage}>Storage</Link>
                </Button>
                {pathname == Routes.storage &&
                    <div className="h-0.5 w-full bg-primary"></div>
                }
            </div>
            <div>
                <Button variant='ghost' asChild>
                    <Link href={Routes.formData}>Form Data</Link>
                </Button>
                {pathname == Routes.formData &&
                    <div className="h-0.5 w-full bg-primary"></div>
                }
            </div>
            <div>
                <Button variant='ghost' asChild>
                    <Link href={Routes.settings}>Settings</Link>
                </Button>
                {pathname == Routes.settings &&
                    <div className="h-0.5 w-full bg-primary"></div>
                }
            </div>

        </header>
    )
}