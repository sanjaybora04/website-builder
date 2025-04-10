'use client'

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Stats from "./stats";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ImageUploader from "./imageuploader";

export default function Storage() {
    const [state,setState] = useState({
        usage:{
            storageLimit:1,
            usedStorage:0
        },
        assets:[]
    })

    async function loadData(){
        const res = await api.user.getAssets()
        if(res.data){
            setState(res.data)
        }
    }
    useEffect(()=>{
        loadData()
    },[])
    return (
        <div className="p-5 sm:px-10">
            <ImageUploader/>
            <Stats usage={state?.usage} />
            <div className="flex gap-2">
                <Input placeholder="search assets"/>
                <Button><Upload/>Upload</Button>
            </div>
            <div className="flex flex-wrap gap-5 mt-10">
                {state?.assets?.map((a:any,index:any)=>
                    <img key={index} src={a.url} className="w-52 h-52 rounded"/>
                )}
            </div>
        </div>
    )
}