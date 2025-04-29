import React, { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';
import { buttonVariants } from '../ui/button';
import { Loader, Upload } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);

    const compressImage = async (file: File): Promise<File> => {
        const allowedTypes = [ // allowed types for compression
            'image/jpeg',
            'image/png',
            'image/webp'
        ];
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

        setUploading(true);
        setUploadProgress(0);

        try {
            const { data } = await api.user.getUploadUrl();
            const { url, key } = data

            const isImage = file.type.startsWith('image/');
            const fileToUpload = isImage ? await compressImage(file) : file;

            // return console.log(file)

            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url, true);
            xhr.setRequestHeader('Content-Type', fileToUpload.type);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    setUploadProgress(Math.round(percent));
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    setUploadProgress(0);
                    window.location.reload()
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
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <input id='fileupload' type="file" content='image' onChange={handleFileChange} disabled={uploading}
                className='hidden' />
            <label htmlFor='fileupload' className={buttonVariants()}>
                <Upload />Upload
            </label>

            {uploading||uploadProgress>0 &&
                <div className='fixed top-0 left-0 w-screen h-screen z-[999] bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='w-full max-w-80 p-2 border rounded bg-accent'>
                        <div><Loader className='inline w-4 h-4 mr-1 animate-spin'/>Uploading-{uploadProgress}%</div>
                        <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                            <div
                                className="bg-blue-500 h-2 rounded transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default FileUploadComponent;
