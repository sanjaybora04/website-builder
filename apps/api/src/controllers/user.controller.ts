import dotenv from 'dotenv';
import prisma from '../lib/prisma';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import * as Minio from 'minio'
import crypto from 'crypto'
dotenv.config();

class User {
    minio: Minio.Client
    constructor() {
        // Initialize MinIO client
        this.minio = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT!,
            useSSL: true,
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY
        });
    }

    async signin(req: any, res: any) {
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { "Authorization": `Bearer ${req.body.token}` }
        })

        const googleOauthId = response.data.sub;
        const firstName = response.data.given_name;
        const email = response.data.email;

        const user = await prisma.user.findFirst({
            where: { googleOauthId }
        })

        if (user) {
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, process.env.JWT_SECRET!, { expiresIn: "24d" })

            return res.json({
                token,
                name: user.name,
                email: user.email,
                plan: user.plan,
            })
        } else {
            const newUser = await prisma.user.create({
                data: {
                    name: firstName,
                    googleOauthId,
                    email
                }
            })

            const token = jwt.sign({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            }, process.env.JWT_SECRET!, { expiresIn: "24d" })

            return res.json({
                token,
                name: newUser.name,
                email: newUser.email,
                plan: newUser.plan,
            })
        }

    }

    async getUser(req: any, res: any) {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                storageLimit: true,
                usedStorage: true
            }
        })

        if (!user) return res.status(404).json({ error: "User not found" })

        return res.json(user)
    }

    async updateUser(req: any, res: any) {
        const { name, email } = req.body;

        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: { name, email }
        })

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET!, { expiresIn: "24d" })

        return res.json({
            token,
            name: user.name,
            email: user.email,
            plan: user.plan,
        })
    }

    getUploadUrl = async (req: any, res: any) => {
        // Check if user exists and has not exceeded storage limit
        const user = await prisma.user.findUnique({ where: { id: req.user.id } })
        if (!user) return res.status(404).json({ error: "User not found" })
        if (user.usedStorage >= user.storageLimit) return res.status(413).json({ error: "You've reached your storage limit. Please delete files or upgrade your plan to continue uploading." })

        const filepath = `${req.user.id}/${crypto.randomUUID()}`
        const presignedUrl = await this.minio.presignedPutObject(process.env.MINIO_BUCKET!, filepath, 60 * 60);// valid for 1 hour
        return res.json({ url: presignedUrl, key: process.env.MINIO_BUCKET + '/' + filepath });
    }

    getUsage = async (req: any, res: any) => {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                storageLimit: true,
                usedStorage: true
            }
        })
        if (!user) return res.status(404).json({ error: "User not found" })
        return res.json({
            storageLimit: user.storageLimit,
            usedStorage: user.usedStorage
        })
    }


    async addAsset(req: any, res: any) {
        const { key, filename, parentId } = req.body
        await prisma.user.update({
            where: { id: req.user.id }, data: {
                assets: {
                    upsert: {
                        where: { key },
                        create: {
                            key,
                            filename,
                            size: 0,
                            contentType: '',
                            parentId: parentId || null,
                        },
                        update: {
                            filename,
                            parentId: parentId || null,
                        }
                    }
                }
            }
        })
        res.end()
    }

    async getAssets(req: any, res: any) {
        const { folderId } = req.query;

        // Fetch assets based on the provided folderId
        const assets = await prisma.asset.findMany({
            where: {
                userId: req.user.id,
                parentId: folderId ? folderId as string : null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!assets) {
            return res.status(404).json({ error: "Assets not found or unauthorized" });
        }

        return res.json(assets);
    }

    moveAsset = async (req: any, res: any) => {
        const { key, folderId } = req.body;

        // Fetch the asset
        const asset = await prisma.asset.findUnique({
            where: { key }
        });

        if (!asset || asset.userId !== req.user.id) {
            return res.status(404).json({ error: "Asset not found or unauthorized" });
        }

        // Update the asset's folderId
        await prisma.asset.update({
            where: { key },
            data: { parentId:folderId }
        });

        return res.end();
    }

    renameAsset = async (req: any, res: any) => {
        const { key, newName } = req.body;

        // Fetch the asset
        const asset = await prisma.asset.findUnique({
            where: { key }
        });

        if (!asset || asset.userId !== req.user.id) {
            return res.status(404).json({ error: "Asset not found or unauthorized" });
        }

        // Check if a file with the same name exists in the same folder
        const existingAsset = await prisma.asset.findFirst({
            where: {
                userId: req.user.id,
                filename: newName,
                parentId: asset.parentId
            }
        });
        if (existingAsset) {
            return res.status(409).json({ error: "A file with the same name already exists in this folder" });
        }

        // Update the asset's filename
        await prisma.asset.update({
            where: { key },
            data: { filename: newName }
        });

        return res.end();
    }

    deleteAsset = async (req: any, res: any) => {
        const { key } = req.body;

        // Fetch the asset
        const asset = await prisma.asset.findUnique({
            where: { key }
        });

        if (!asset || asset.userId !== req.user.id) {
            return res.status(404).json({ error: "Asset not found or unauthorized" });
        }

        // Remove the bucket name prefix from the key
        const bucketName = process.env.MINIO_BUCKET!;
        const objectKey = asset.key.replace(`${bucketName}/`, "");

        // Delete from MinIO
        await this.minio.removeObject(bucketName, objectKey);

        // Delete from DB
        await prisma.asset.delete({
            where: { key }
        });

        // Update user's usedStorage
        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                usedStorage: {
                    decrement: asset.size
                }
            }
        });

        return res.end();
    }

    async getFolders(req: any, res: any) {
        const { folderId } = req.query;

        // Fetch folders based on the provided folderId
        const folders = await prisma.folder.findMany({
            where: {
                userId: req.user.id,
                parentId: folderId ? folderId as string : null
            },
            include: {
                parent: true
            }
        });

        if (!folders) {
            return res.status(404).json({ error: "Folders not found or unauthorized" });
        }

        return res.json(folders);
    }

    async addFolder(req: any, res: any) {
        const { name, parentId } = req.body;

        // Check if folder already exists
        const existingFolder = await prisma.folder.findFirst({
            where: {
                userId: req.user.id,
                name,
                parentId: parentId || null
            }
        });
        
        if (existingFolder) {
            return res.status(409).json({ error: "Folder already exists" });
        }
        
        // Create new folder
        await prisma.folder.create({
            data: {
                name,
                userId: req.user.id,
                parentId: parentId || null
            }
        });

        return res.end();
    }

    async deleteFolder(req: any, res: any) {
        const { folderId } = req.body;

        // Check if folder exists
        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        });

        if (!folder || folder.userId !== req.user.id) {
            return res.status(404).json({ error: "Folder not found or unauthorized" });
        }

        // Check if the folder has subfolders or assets
        const subfolders = await prisma.folder.count({
            where: { parentId: folderId }
        });
        const assets = await prisma.asset.count({
            where: { parentId: folderId }
        });
        if (subfolders > 0 || assets > 0) {
            return res.status(400).json({ error: "Folder is not empty. Please delete its contents first." });
        }

        // Delete the folder
        await prisma.folder.delete({
            where: { id: folderId }
        });

        return res.end();
    }

    async moveFolder(req: any, res: any) {
        const { folderId, newParentId } = req.body;

        // Check if folder exists
        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        });

        if (!folder || folder.userId !== req.user.id) {
            return res.status(404).json({ error: "Folder not found or unauthorized" });
        }

        // check if folder with the same name exists in the new parent folder
        const existingFolder = await prisma.folder.findFirst({
            where: {
                userId: req.user.id,
                name: folder.name,
                parentId: newParentId || null
            }
        });
        if (existingFolder) {
            return res.status(409).json({ error: "A folder with the same name already exists in the target location" });
        }


        // Update the folder's parent ID
        await prisma.folder.update({
            where: { id: folderId },
            data: { parentId: newParentId }
        });

        return res.end();
    }

    async renameFolder(req: any, res: any) {
        const { folderId, newName } = req.body;

        // Check if folder exists
        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        });

        if (!folder || folder.userId !== req.user.id) {
            return res.status(404).json({ error: "Folder not found or unauthorized" });
        }

        // Check if a folder with the same name exists in the same parent folder
        const existingFolder = await prisma.folder.findFirst({
            where: {
                userId: req.user.id,
                name: newName,
                parentId: folder.parentId
            }
        });
        if (existingFolder) {
            return res.status(409).json({ error: "A folder with the same name already exists in this location" });
        }

        // Update the folder's name
        await prisma.folder.update({
            where: { id: folderId },
            data: { name: newName }
        });

        return res.end();
    }
}

export default new User();