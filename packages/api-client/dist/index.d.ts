import { AxiosError } from "axios";
export interface ApiClientOptions {
    baseURL: string;
    getToken?: () => string | null;
    onError?: (error: AxiosError) => void;
}
export declare const createApiClient: (options: ApiClientOptions) => {
    client: import("axios").AxiosInstance;
    api: {
        user: {
            signin: (token: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getUser: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
            updateUser: (data: object) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getUploadUrl: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getUsage: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getAssets: (folderId?: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            addAsset: (key: string, filename: string, parentId?: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            moveAsset: (key: any, folderId?: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            renameAsset: (key: any, newName: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            deleteAsset: (key: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getFolders: (folderId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            addFolder: (name: string, parentId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            deleteFolder: (folderId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            moveFolder: (folderId: string, newParentId?: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            renameFolder: (folderId: string, newName: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
        };
        website: {
            get: (websiteId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getAll: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
            create: (data: object) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            update: (websiteId: any, data: object) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            delete: (websiteId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            getDraft: (websiteId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            setDraft: (websiteId: string, data: object) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            checkDomain: (websiteId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            setDomain: (websiteId: string, data: object) => Promise<import("axios").AxiosResponse<any, any, {}>>;
        };
        form: {
            get: (websiteId?: string, path?: string, from?: string, to?: string, limit?: string, page?: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
            submit: (data: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
        };
    };
};
