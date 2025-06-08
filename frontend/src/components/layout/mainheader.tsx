"use client"
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Menu, Moon, Route, Sun, Wrench } from "lucide-react";
import Routes from "@/lib/routes";
import Link from "next/link";
import Signin from "./signin";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export default function MainHeader() {
    const { theme, setTheme } = useTheme()
    return (
        <header className="z-50 h-14 w-full sticky top-0 left-0 bg-background flex px-5 items-center justify-between">
            <Link href={Routes.overview} className="flex items-center gap-2 font-bold">
                <img src="/images/logo.png" className="h-6 w-6"/>
                SiteCraft
            </Link>
            <div className="flex gap-5 text-sm items-center">
                <div className="hidden sm:flex gap-5 items-center">
                    <Link href={Routes.home} className="hover:underline font-semibold">Home</Link>
                    <Link href={Routes.about} className="hover:underline font-semibold">About</Link>
                    <Link href={Routes.pricing} className="hover:underline font-semibold">Pricing</Link>
                    <Link href={Routes.feedback} className="hover:underline font-semibold">Feedback</Link>
                    {/* <Link href={Routes.support} className="hover:underline font-semibold">Support</Link> */}
                </div>
                <Button size='icon' onClick={() => theme == 'dark' ? setTheme('light') : setTheme('dark')}>
                    {theme == "dark" ? <Sun /> : <Moon />}
                </Button>
                <Signin />
                <Drawer>
                    <DrawerTrigger className="sm:hidden"><Menu /></DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="flex justify-center gap-2"><Wrench />SiteCraft</DrawerTitle>
                            <DrawerDescription className="text-center">Start building your online presence</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-2">
                            <Button variant='ghost' className="w-full">
                                <Link href={Routes.home}>
                                    Home
                                </Link>
                            </Button>
                            <Button variant='ghost' className="w-full">
                                <Link href={Routes.about}>
                                    About
                                </Link>
                            </Button>
                            <Button variant='ghost' className="w-full" asChild>
                                <Link href={Routes.pricing}>
                                    Pricing
                                </Link>
                            </Button>
                            <Button variant='ghost' className="w-full">
                                <Link href={Routes.feedback}>
                                    Feedback
                                </Link>
                            </Button>
                            {/* <Button variant='ghost' className="w-full">Support</Button> */}
                        </div>
                        <DrawerClose className="m-4 mt-40" asChild>
                            <Button className="min-w-80 mx-auto">Close</Button>
                        </DrawerClose>
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    )
}