import React, { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';
import { Button, buttonVariants } from '../ui/button';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

const FileUploadComponent: React.FC = () => {
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedFileURL, setUploadedFileURL] = useState<string | null>(null);

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
                    setUploadedFileURL(url.split('?')[0]);
                    setUploadProgress(100);
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
        <Dialog>
            <input id='fileupload' type="file" onChange={handleFileChange} disabled={uploading}
                className='hidden' />
            <label htmlFor='fileupload' className={buttonVariants()}>
                <Upload />Upload
            </label>
            <DialogContent>
                <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                        className="bg-blue-500 h-2 rounded transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>

                {uploadedFileURL && (
                    <div className="mt-2">
                        <p className="text-green-600">File uploaded successfully!</p>
                        <a
                            href={uploadedFileURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-600"
                        >
                            View File
                        </a>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadComponent;
