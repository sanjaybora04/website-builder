'use client'

import useAuth from "@/hooks/use-auth";
import api from "@/lib/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Check, LayoutGrid, LogOut, Moon, PcCase, Settings, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Routes from "@/lib/routes";
import { useRouter } from "next/navigation";

export default function Signin() {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}>
            <Component />
        </GoogleOAuthProvider>
    )
}

function Component() {
    const router = useRouter()
    const { user, authorize, unauthorize } = useAuth()
    const { theme, setTheme } = useTheme()

    const handleGoogleSignin = useGoogleLogin({
        onSuccess: async (tokenResponse: any) => {
            const id = toast.loading('Logging in...');
            const response = await api.user.signin(tokenResponse.access_token)
            if (response.status === 200) {
                if([Routes.home,Routes.about,Routes.feedback,Routes.pricing,Routes.support].includes(window.location.pathname)){
                    router.push(Routes.overview)
                }
                toast.success('Logged In', { id });
                authorize(response.data);
            } else {
                toast.dismiss(id)
            }
        }
    })
    return (
        <>
            {user ? <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar><AvatarFallback className="capitalize">{user.name[0]}</AvatarFallback></Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link href={Routes.overview}>
                                <LayoutGrid />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={Routes.settings}>
                                <Settings />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <span>Theme</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                                        <Moon />
                                        <span>Dark</span>
                                        {theme == 'dark' && <Check />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('light')}>
                                        <Sun />
                                        <span>Light</span>
                                        {theme == 'light' && <Check />}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => unauthorize()}>
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> :
                <Button id="signin" onClick={() => handleGoogleSignin()}>
                    <img src="/images/google.svg" className="w-5 h-5" />
                    Signin
                </Button>
            }
        </>
    )
}