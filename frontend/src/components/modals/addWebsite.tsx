import { toast } from "sonner";
import WebsiteForm from "../overview/website-form";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import api from "@/lib/api";
import useAuth from "@/hooks/use-auth";
import useWebsites from "@/hooks/use-websites";
import { useRouter } from "next/navigation";
import Routes from "@/lib/routes";
import useModal from "@/hooks/use-modal";

export default function AddWebsite({website}:{website:any}) {
    const {user, authorize} = useAuth()
    const {loadWebsites} = useWebsites()
    const router = useRouter()

    const {setModal} = useModal()

    const addWebsite = async (data: any, force=false) => {
        if (!user&&!force) {
            handleGoogleSignin(); // triggers login, will resume via onSuccess
            return;
        }

        const id = toast.loading('Creating Website...');
        const res = await api.website.create(data);

        if (res.status === 200) {
            loadWebsites()
            router.push(Routes.websiteEditor(res.data.id))
            toast.success('Website created', { id });
            setModal({id:''})
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
                    addWebsite(website,true);
                    
            } else {
                toast.dismiss(id);
                toast.error('Login failed');
            }
        }
    });
    return (
        <>
            <DialogHeader>
                <DialogTitle>Create Website</DialogTitle>
            </DialogHeader>
            <WebsiteForm data={website} onSubmit={addWebsite} hideFavicon />
        </>
    )
}