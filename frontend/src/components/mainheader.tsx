"use client"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun, Wrench } from "lucide-react";
import Routes from "@/lib/routes";
import Link from "next/link";
import Signin from "./layout/signin";

export default function MainHeader(){
    const {theme,setTheme} = useTheme()
    return (
        <header className="z-50 h-14 w-full sticky top-0 left-0 bg-background flex px-5 items-center justify-between">
            <Link href={Routes.overview} className="flex items-center gap-2 font-bold">
            <Wrench/>
            SiteCraft
            </Link>
            <div className="flex gap-5 text-sm items-center">
                <div className="hover:underline font-semibold">About</div>
                <div className="hover:underline font-semibold">Pricing</div>
                <div className="hover:underline font-semibold">Feedback</div>
                <div className="hover:underline font-semibold">Support</div>
            <Button size='icon' onClick={()=>theme=='dark'?setTheme('light'):setTheme('dark')}>
                {theme=="dark"?<Sun/>:<Moon/>}
            </Button>
            <Signin/>
            </div>
        </header>
    )
}