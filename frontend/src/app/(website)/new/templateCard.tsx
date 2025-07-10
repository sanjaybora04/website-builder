'use client'
import WebsiteForm from "@/components/overview/website-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAuth from "@/hooks/use-auth";
import api from "@/lib/api";
import { Template } from "@/lib/templates";
import { useGoogleLogin } from "@react-oauth/google";
import { ArrowUpRight, Edit } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Routes from "@/lib/routes";
import useWebsites from "@/hooks/use-websites";

export default function TemplateCard({ template }: { template: Template }) {
    const { user, authorize } = useAuth();
    const { loadWebsites } = useWebsites()
    const router = useRouter()

    // Use ref to hold the pending website data when login is needed
    const pendingWebsiteData = useRef<any>(null);

    const addWebsite = async (data: any, force=false) => {
        if (!user&&!force) {
            // Store data to use after login
            pendingWebsiteData.current = data;
            handleGoogleSignin(); // triggers login, will resume via onSuccess
            return;
        }

        const id = toast.loading('Creating Website...');
        const res = await api.website.create(data);

        if (res.status === 200) {
            loadWebsites()
            router.push(Routes.overview)
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
                    addWebsite(pendingWebsiteData.current,true);
                    pendingWebsiteData.current = null;
                }
            } else {
                toast.dismiss(id);
                toast.error('Login failed');
            }
        }
    });

    return (
        <div className="w-64 p-3 border aspect-square rounded flex flex-col items-center justify-center gap-2 relative">
            <img src={template.image} className="w-full object-cover" />
            {template.name}
            <div className="w-full flex gap-3 justify-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm"><Edit />Use</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Website</DialogTitle>
                        </DialogHeader>
                        <WebsiteForm data={template.website} onSubmit={addWebsite} hideFavicon />
                    </DialogContent>
                </Dialog>

                {template.previewUrl &&
                    <Button size='sm' asChild>
                        <a href={template.previewUrl} target="_blank">
                            <ArrowUpRight />Live Preview
                        </a>
                    </Button>
                }
            </div>
        </div>
    );
}
