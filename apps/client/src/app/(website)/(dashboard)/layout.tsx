'use client'

import useAuth from "@/hooks/use-auth";
import Routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, isUserHydrated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isUserHydrated && !user) {
            router.push(Routes.home)
        }
    }, [user, isUserHydrated])
    
    return (
        <>
            {children}
        </>
    );
}
