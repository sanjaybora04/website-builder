import { ArrowUpRight } from "lucide-react";

export default function Branding() {
    return (
        <a href={process.env.NEXT_PUBLIC_BASE_URL} target="_blank" className="fixed bottom-0 right-0 group hover:border">
            <img src={process.env.NEXT_PUBLIC_BASE_URL+`/images/logo.svg`} className="w-10 h-10 group-hover:rotate-180 group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:-translate-x-full group-hover:-translate-y-full duration-300"/>
            <div className="hidden group-hover:block bg-white p-2 shadow-lg whitespace-nowrap">
                <div className="text-xl font-bold font-raleway underline flex gap-2">
                    Powered by SiteCraft <ArrowUpRight/>
                </div>
            </div>
        </a>
    );
}