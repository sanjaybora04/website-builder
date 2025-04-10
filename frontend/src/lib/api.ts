import axios from 'axios';
import { toast } from 'sonner';
import Routes from './routes';

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set token dynamically before each request
apiClient.interceptors.request.use((config) => {
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    
    const token = user&&user!=='undefined' ? JSON.parse(user)?.token : null;
    if (token) {
        config.headers['token'] = token;
    }
    return config;
});

// Global error handler
apiClient.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response?.data?.unauthorized) {
            localStorage.clear();
            window.location.href = Routes.home;
            return { status: 444 };
        } else {
            console.error(error);
            const res = error.response?.data;
            if (res?.error) toast.error(res.error);
            else if (res?.warning) toast.warning(res.warning);
            else if (res?.info) toast.info(res.info);
            else toast.error(res?.message || error.message);
        }
        return Promise.reject(error);
    }
);

// API object with methods for user and website management
const api = {
    user: {
        signin: async (token: any) => await apiClient.post('/user/signin', { token }),
        getUploadUrl: async () => await apiClient.get('/user/storage/uploadurl'),
        getAssets: async () => await apiClient.get('/user/storage/assets'),
        deleteAsset: async (assetId: any) => await apiClient.delete(`/user/storage/asset/${assetId}`),
    },
    website: {
        get: async (websiteId: string) => await apiClient.get(`/website/${websiteId}`),
        getAll: async () => await apiClient.get('/website'),
        create: async (data: object) => await apiClient.post('/website', data),
        update: async (websiteId: any, data: object) => await apiClient.put(`/website/${websiteId}`, data),
        delete: async (websiteId: string) => await apiClient.delete(`/website/${websiteId}`),

        getDraft: async (websiteId: string) => await apiClient.get(`/website/draft/${websiteId}`),
        setDraft: async (websiteId: string, data: object) => await apiClient.put(`/website/draft/${websiteId}`, data),

        checkDomain: async (websiteId: string) => await apiClient.get(`/website/domain/${websiteId}`),
        setDomain: async (websiteId: string, data: object) => await apiClient.put(`/website/domain/${websiteId}`, data),
    }
};

export default api;
