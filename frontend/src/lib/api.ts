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

    const token = user && user !== 'undefined' ? JSON.parse(user)?.token : null;
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
        return error
    }
);

// API object with methods for user and website management
const api = {
    user: {
        signin: async (token: any) => await apiClient.post('/user/signin', { token }),
        getUser: async () => await apiClient.get('/user'),
        updateUser: async (data: object) => await apiClient.put('/user', data),

        getUploadUrl: async () => await apiClient.get(`/user/storage/uploadurl`),
        getUsage: async () => await apiClient.get('/user/storage/usage'),
        getAssets: async (folderId?: string) => await apiClient.get('/user/storage/assets?folderId=' + folderId),
        addAsset: async (key: string, filename: string, parentId?: string) => await apiClient.post('/user/storage/assets/add', { key, filename, parentId }),
        moveAsset: async (key: any, folderId?: string) => await apiClient.post('/user/storage/assets/move', { key, folderId: folderId || null }),
        renameAsset: async (key: any, newName: string) => await apiClient.post('/user/storage/assets/rename', { key, newName }),
        deleteAsset: async (key: any) => await apiClient.post(`/user/storage/assets/delete`, { key }),

        getFolders: async (folderId: string) => await apiClient.get('/user/storage/folder?folderId=' + folderId),
        addFolder: async (name: string, parentId: string) => await apiClient.post('/user/storage/folder/add', { name, parentId }),
        deleteFolder: async (folderId: string) => await apiClient.post('/user/storage/folder/delete', { folderId }),
        moveFolder: async (folderId: string, newParentId?: string) => await apiClient.post('/user/storage/folder/move', { folderId, newParentId: newParentId || null }),
        renameFolder: async (folderId: string, newName: string) => await apiClient.post('/user/storage/folder/rename', { folderId, newName }),
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
    },
    form: {
        get: async (websiteId?: string, path?: string, limit?: string, page?: any) => {
            const params = new URLSearchParams()

            if (websiteId) params.append("websiteId", websiteId)
            if (path) params.append("path", path)
            if (limit) params.append("limit", limit)
            if (page !== undefined && page !== null) params.append("page", page.toString())

            return await apiClient.get(`/form?${params.toString()}`)
        },
        submit: async (data: any) => await apiClient.post(`/form`, data),
    }
};

export default api;
