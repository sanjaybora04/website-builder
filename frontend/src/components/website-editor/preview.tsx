import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";
import Routes from "@/lib/routes";
const mobileWidth = 360
const mobileHeight = 640
const desktopWidth = 1920
const desktopHeight = 1080
const desktopRatio = desktopWidth/desktopHeight
const mobileRatio = mobileWidth/mobileHeight

export default function Preview() {
    const websiteEditor = useAtomValue(websiteEditorAtom)
    const selectedDevice = useMemo(()=>websiteEditor?.previewSize,[websiteEditor])
    const [zoom, setZoom] = useState("1");
    const [height, setHeight] = useState("100%");
    const [width, setWidth] = useState("100%");

    useEffect(() => {
        const previewContainer = document.getElementById('previewContainer')
        if (!previewContainer) return

        const observer = new ResizeObserver(() => {
            const containerWidth = previewContainer.clientWidth
            const containerHeight = previewContainer.clientHeight
            const containerRatio = containerWidth/containerHeight
            if (selectedDevice == 'desktop') {
                const zoom = containerRatio<desktopRatio?previewContainer.clientWidth / desktopWidth:previewContainer.clientHeight/desktopHeight
                setZoom(`${zoom}`)
                if(containerRatio>desktopRatio){
                    setHeight(`${(containerHeight)/zoom}px`)
                    setWidth(`${(containerHeight*desktopRatio)/zoom}px`)
                }else{
                    setWidth(`${(containerWidth)/zoom}px`)
                    setHeight(`${(containerWidth/desktopRatio)/zoom}px`)
                }
            } else {
                const zoom = containerRatio<mobileRatio?previewContainer.clientWidth / mobileWidth:previewContainer.clientHeight/mobileHeight
                setZoom(`${zoom}`)

                if(containerRatio>mobileRatio){
                    setHeight(`${(containerHeight)/zoom}px`)
                    setWidth(`${(containerHeight*mobileRatio)/zoom}px`)
                }else{
                    setWidth(`${(containerWidth)/zoom}px`)
                    setHeight(`${(containerWidth/mobileRatio)/zoom}px`)
                }

            }
        })

        observer.observe(previewContainer!)
        return () => observer.disconnect()
    }, [selectedDevice]);

    return (
        <div id="previewContainer" className="flex justify-center items-center w-full h-full p-4">
            <iframe src={Routes.preview} className={cn("border shadow-lg duration-200",)} style={{ zoom, height, width }}/>
        </div>
    );
}