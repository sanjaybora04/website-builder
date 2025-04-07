'use client'

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, Menu as MenuIcon } from 'lucide-react';
import Routes from '@/lib/routes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileNav({ links }: { links:{index:number,label:string,href:string}[] }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()

    useEffect(()=>{
        setOpen(false)
    },[pathname])
    return (
        <Sheet open={open} onOpenChange={setOpen}>

            {/* This button will trigger open the mobile sheet menu */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label='Mobile menu button'>
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <div className="flex flex-col items-start gap-3 mt-10">
                    {links.map(l=>
                    <Button key={l.index} variant="ghost" className='md:hidden w-full justify-start' asChild>
                        <Link href={l.href}>{l.label}</Link>
                    </Button>
                    )}
                </div>
            </SheetContent>

        </Sheet >
    );
}