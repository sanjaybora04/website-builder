// packages/api-client/factory.ts
import axios, { AxiosError } from "axios";

export interface ApiClientOptions {
  baseURL: string;
  getToken?: () => string | null;         // optional callback for token
  onError?: (error: AxiosError) => void;  // optional error handler
}

export const createApiClient = (options: ApiClientOptions) => {
  const apiClient = axios.create({
    baseURL: options.baseURL,
    headers: { "Content-Type": "application/json" },
  });

  // attach token
  apiClient.interceptors.request.use((config: any) => {
    const token = options.getToken?.();
    if (token) config.headers["token"] = token;
    return config;
  });

  // centralized error handling
  apiClient.interceptors.response.use(
    (res: any) => res,
    (error: AxiosError) => {
      return options.onError?.(error);
    }
  );

  return {
    client: apiClient,
    api: {
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
        get: async (websiteId?: string, path?: string, from?: string, to?: string, limit?: string, page?: any) => {
            const params = new URLSearchParams()

            if (websiteId) params.append("websiteId", websiteId)
            if (path) params.append("path", path)
            if (from) params.append("from", from)
            if (to) params.append("to", to)
            if (limit) params.append("limit", limit)
            if (page !== undefined && page !== null) params.append("page", page.toString())

            return await apiClient.get(`/form?${params.toString()}`)
        },
        submit: async (data: any) => await apiClient.post(`/form`, {
            data:{...data,
                referrerUrl:document.referrer
            },
            page:window.location.pathname,
        }),
    }
    }
  };
};
