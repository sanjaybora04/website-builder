"use client"

import { atom, useAtom } from "jotai"
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { Plus } from "lucide-react"
import SelectTemplate from "./select-template"
import WebsiteForm from "../website-form"
import { Website } from "@/lib/types"
import { toast } from "sonner"
import api from "@/lib/api"
import { useState } from "react"

export default function AddWebsite({loadWebsites}:{loadWebsites:any}){
    const [step,setStep] = useState(0)  
    const [data,setData] = useState<Website>()

    async function addWebsite(data: Website) {
        const id = toast.loading('Creating Website...')
        try {
            await api.website.create(data)
            loadWebsites()
            setStep(0)
            toast.success('Website created', { id })
            return true
        } catch {
            toast.dismiss(id)
            return false
        }
    }
    
    let component;

    switch (step) {
        case 1:
            component = <SelectTemplate setStep={setStep} setData={setData}/>
            break;
        case 2:
            component = <WebsiteForm data={data} onSubmit={addWebsite}/>
        default:
            break;
    }
    return (
        <Dialog open={step!=0} onOpenChange={(v)=>setStep(v?1:0)}>
            <DialogTrigger asChild>
                <Button>
                    <Plus/>
                    Add Website
                </Button>
            </DialogTrigger>
            <DialogContent>
                {component}
            </DialogContent>
        </Dialog>
    )
}