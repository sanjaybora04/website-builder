"use client"
import React, { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';
import { buttonVariants } from '../ui/button';
import { Loader, Upload } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function FileUploadComponent({onUpload}:{onUpload?:any}){
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);
    const [compressing, setCompressing] = useState<boolean>(false);

    const compressImage = async (file: File): Promise<File> => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) return file;

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: file.type
        };

        return await imageCompression(file, options);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCompressing(true);
        try {
            const isImage = file.type.startsWith('image/');
            const fileToUpload = isImage ? await compressImage(file) : file;
            setCompressing(false);

            setUploading(true);
            setUploadProgress(0);

            const { data } = await api.user.getUploadUrl();
            const { url,key } = data;

            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url, true);
            xhr.setRequestHeader('Content-Type', fileToUpload.type);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    setUploadProgress(Math.round(percent));
                }
            };

            xhr.onload = async() => {
                if (xhr.status === 200) {
                    await api.user.addAsset(key)
                    onUpload?.(process.env.NEXT_PUBLIC_S3_URL+'/'+key)
                    setUploadProgress(0);
                    setUploading(false);
                } else {
                    throw new Error('Upload failed');
                }
            };

            xhr.onerror = () => {
                throw new Error('Upload failed');
            };

            xhr.send(fileToUpload);
        } catch (err) {
            console.error(err);
            alert('Upload failed.');
            setCompressing(false);
            setUploading(false);
        }
    };

    return (
        <>
            <input
                id="fileupload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading || compressing}
                className="hidden"
            />
            <label htmlFor="fileupload" className={buttonVariants({size:'sm'})}>
                <Upload className="mr-1" />
                Upload
            </label>

            {(compressing || uploading) && createPortal(
                <div className="fixed top-0 left-0 w-screen h-screen z-[999] bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-full max-w-80 p-4 border rounded bg-accent text-center">
                        <div className="flex items-center">
                            <Loader className="inline w-4 h-4 mr-2 animate-spin" />
                            {compressing ? 'Optimizing image...' : `Uploading - ${uploadProgress}%`}
                        </div>
                        {!compressing && (
                            <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                                <div
                                    className="bg-blue-500 h-2 rounded transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};