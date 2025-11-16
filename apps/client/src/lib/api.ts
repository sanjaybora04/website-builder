import { toast } from 'sonner';

// src/lib/api.ts
import { createApiClient } from "@sitecraft/api-client";

const { api } = createApiClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    getToken: () => {
        if (typeof window === 'undefined') return null; // safe on server
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user)?.token : null;
    },
    onError: (error: any) => {
        if (error.response?.data?.unauthorized) {
            localStorage.clear();
            return { status: 444 };
        } else {
            console.error(error);
            const res = error.response?.data;
            if (res?.error) toast.error(res.error);
            else if (res?.warning) toast.warning(res.warning);
            else if (res?.info) toast.info(res.info);
            else toast.error(res?.message || error.message);
        }
        return error
    }

});

export default api;