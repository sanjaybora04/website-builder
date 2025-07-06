import api from '@/lib/api';
import { Website } from '@/lib/types';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const websitesAtom = atom<{
    loading: boolean,
    data: Website[],
    firstLoad?:boolean
}>({
    loading:true,
    data:[],
    firstLoad:true
})

export default function useWebsites() {
    const [websites, setWebsites] = useAtom(websitesAtom);

    const loadWebsites = async () => {
        setWebsites(prev=>({
            loading:false,
            data:prev.data
        }))
        const res = await api.website.getAll()
        if(res.status==200){
            setWebsites({
                loading:false,
                data:res.data
            })
        }else{
            setWebsites(prev=>({
                loading:false,
                data:prev.data
            }))
        }
    }

    useEffect(()=>{
        if(websites.firstLoad){
            loadWebsites()
        }
    },[])
    return {
        websites,
        loadWebsites
    };
}