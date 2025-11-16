// packages/api-client/factory.ts
import axios from "axios";
export const createApiClient = (options) => {
    const apiClient = axios.create({
        baseURL: options.baseURL,
        headers: { "Content-Type": "application/json" },
    });
    // attach token
    apiClient.interceptors.request.use((config) => {
        const token = options.getToken?.();
        if (token)
            config.headers["token"] = token;
        return config;
    });
    // centralized error handling
    apiClient.interceptors.response.use((res) => res, (error) => {
        return options.onError?.(error);
    });
    return {
        client: apiClient,
        api: {
            user: {
                signin: async (token) => await apiClient.post('/user/signin', { token }),
                getUser: async () => await apiClient.get('/user'),
                updateUser: async (data) => await apiClient.put('/user', data),
                getUploadUrl: async () => await apiClient.get(`/user/storage/uploadurl`),
                getUsage: async () => await apiClient.get('/user/storage/usage'),
                getAssets: async (folderId) => await apiClient.get('/user/storage/assets?folderId=' + folderId),
                addAsset: async (key, filename, parentId) => await apiClient.post('/user/storage/assets/add', { key, filename, parentId }),
                moveAsset: async (key, folderId) => await apiClient.post('/user/storage/assets/move', { key, folderId: folderId || null }),
                renameAsset: async (key, newName) => await apiClient.post('/user/storage/assets/rename', { key, newName }),
                deleteAsset: async (key) => await apiClient.post(`/user/storage/assets/delete`, { key }),
                getFolders: async (folderId) => await apiClient.get('/user/storage/folder?folderId=' + folderId),
                addFolder: async (name, parentId) => await apiClient.post('/user/storage/folder/add', { name, parentId }),
                deleteFolder: async (folderId) => await apiClient.post('/user/storage/folder/delete', { folderId }),
                moveFolder: async (folderId, newParentId) => await apiClient.post('/user/storage/folder/move', { folderId, newParentId: newParentId || null }),
                renameFolder: async (folderId, newName) => await apiClient.post('/user/storage/folder/rename', { folderId, newName }),
            },
            website: {
                get: async (websiteId) => await apiClient.get(`/website/${websiteId}`),
                getAll: async () => await apiClient.get('/website'),
                create: async (data) => await apiClient.post('/website', data),
                update: async (websiteId, data) => await apiClient.put(`/website/${websiteId}`, data),
                delete: async (websiteId) => await apiClient.delete(`/website/${websiteId}`),
                getDraft: async (websiteId) => await apiClient.get(`/website/draft/${websiteId}`),
                setDraft: async (websiteId, data) => await apiClient.put(`/website/draft/${websiteId}`, data),
                checkDomain: async (websiteId) => await apiClient.get(`/website/domain/${websiteId}`),
                setDomain: async (websiteId, data) => await apiClient.put(`/website/domain/${websiteId}`, data),
            },
            form: {
                get: async (websiteId, path, from, to, limit, page) => {
                    const params = new URLSearchParams();
                    if (websiteId)
                        params.append("websiteId", websiteId);
                    if (path)
                        params.append("path", path);
                    if (from)
                        params.append("from", from);
                    if (to)
                        params.append("to", to);
                    if (limit)
                        params.append("limit", limit);
                    if (page !== undefined && page !== null)
                        params.append("page", page.toString());
                    return await apiClient.get(`/form?${params.toString()}`);
                },
                submit: async (data) => await apiClient.post(`/form`, {
                    data: { ...data,
                        referrerUrl: document.referrer
                    },
                    page: window.location.pathname,
                }),
            }
        }
    };
};
