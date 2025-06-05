'use client'

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ButtonComponent } from '@/components/ui/editor/button';
import { ComponentType } from '.';
import { layoutStyleGenerator } from '@/lib/utils';

export default function MobileNav({ config }: { config:ComponentType}) {
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

            <SheetContent side="left" style={layoutStyleGenerator(config.layout)}>
                <div className="space-y-3 mt-16 px-4">
                    {config.content?.buttons?.map((l,index)=>
                    <ButtonComponent key={index} config={l} className=" w-full"/>
                    )}
                </div>
            </SheetContent>

        </Sheet >
    );
}