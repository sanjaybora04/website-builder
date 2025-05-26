"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import Routes from "@/lib/routes";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
    const pathname = usePathname()
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
                    <Link href={Routes.settings}>Settings</Link>
                </Button>
                {pathname == Routes.settings &&
                    <div className="h-0.5 w-full bg-primary"></div>
                }
            </div>
            <div>
                <Button variant='ghost' asChild>
                    <Link href={Routes.plan}>Plan</Link>
                </Button>
                {pathname == Routes.plan &&
                    <div className="h-0.5 w-full bg-primary"></div>
                }
            </div>

        </header>
    )
}