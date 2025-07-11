'use client'

import { templates } from "@/lib/templates";
import { FolderDown } from "lucide-react";
import { useRef, useState } from "react";
import TemplateCard from "./templateCard";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";
import useWebsites from "@/hooks/use-websites";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import api from "@/lib/api";
import Routes from "@/lib/routes";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WebsiteForm from "@/components/overview/website-form";
import { Website } from "@/lib/types";

export default function Page() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { user, authorize } = useAuth();
    const { loadWebsites } = useWebsites()
    const router = useRouter()

    const pendingWebsiteData = useRef(null)

    // Use ref to hold the pending website data when login is needed
    const [websiteModal,setWebsiteModal] = useState<{
        open:boolean,
        data?:Website
    }>({
        open:false,
    });

    const addWebsite = async (data: any, force = false) => {
        if (!user && !force) {
            // Store data to use after login
            pendingWebsiteData.current = data;
            handleGoogleSignin(); // triggers login, will resume via onSuccess
            return;
        }

        const id = toast.loading('Creating Website...');
        const res = await api.website.create(data);

        if (res.status === 200) {
            loadWebsites()
            router.push(Routes.websiteEditor(res.data.id))
            toast.success('Website created', { id });
        } else {
            toast.dismiss(id);
        }
    };

    const handleGoogleSignin = useGoogleLogin({
        onSuccess: async (tokenResponse: any) => {
            const id = toast.loading('Logging in...');
            const response = await api.user.signin(tokenResponse.access_token);

            if (response.status === 200) {
                toast.success('Logged In', { id });
                authorize(response.data);

                // Continue website creation if it was deferred
                if (pendingWebsiteData.current) {
                    addWebsite(pendingWebsiteData.current, true);
                    pendingWebsiteData.current = null;
                }
            } else {
                toast.dismiss(id);
                toast.error('Login failed');
            }
        }
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        try {
            const text = await file.text();
            const json = JSON.parse(text);

            // Optional: validate the structure of json
            if (!json || typeof json !== "object") {
                toast.error("Invalid template format");
                return;
            }

            setWebsiteModal({open:true,data:json})
        } catch (error) {
            toast.error("Error reading file");
            console.error(error);
        }
    };
    return (
        <div className="p-4">
            <Dialog open={websiteModal.open} onOpenChange={(v)=>setWebsiteModal({open:v})}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Website</DialogTitle>
                    </DialogHeader>
                    <WebsiteForm data={websiteModal.data} onSubmit={addWebsite} hideFavicon />
                </DialogContent>
            </Dialog>
            <div className="text-xl my-5">Select a Template</div>
            <div className="flex justify-center sm:justify-start flex-wrap gap-4">
                <div
                    className="w-64 p-4 border rounded cursor-pointer hover:bg-muted text-center aspect-square flex flex-col items-center justify-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <FolderDown />
                    Import
                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
                {templates.map((t) => (
                    <TemplateCard key={t.id} template={t} setWebsiteModal={setWebsiteModal} />
                ))}
            </div>
        </div>
    )
}