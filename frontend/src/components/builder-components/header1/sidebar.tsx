'use client'

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, Menu as MenuIcon } from 'lucide-react';
import Routes from '@/lib/routes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ButtonComponent, ButtonConfig } from '@/components/ui/editor/button';

export default function MobileNav({ links }: { links:ButtonConfig[]}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()

    useEffect(()=>{
        setOpen(false)
    },[pathname])
    return (
        <Sheet open={open} onOpenChange={setOpen}>

            {/* This button will trigger open the mobile sheet menu */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden" aria-label='Mobile menu button'>
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <div className="space-y-3 mt-16 px-4">
                    {links.map(l=>
                    <ButtonComponent config={l} className=" w-full"/>
                    )}
                </div>
            </SheetContent>

        </Sheet >
    );
}