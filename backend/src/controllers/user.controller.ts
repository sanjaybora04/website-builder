import dotenv from 'dotenv';
import prisma from '../../prisma';
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
                email: user.email
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
                email: newUser.email
            })
        }

    }

    getUploadUrl = async (req: any, res: any) => {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } })
        if (!user) return res.status(404).json({ error: "User not found" })
        if (user.usedStorage >= user.storageLimit) return res.status(413).json({ error: "You've reached your storage limit. Please delete files or upgrade your plan to continue uploading." })

        const filepath = `${req.user.id}/${crypto.randomUUID()}`
        const presignedUrl = await this.minio.presignedPutObject(process.env.MINIO_BUCKET!, filepath, 60 * 60);// valid for 1 hour
        return res.json({ url: presignedUrl, key: process.env.MINIO_BUCKET + '/' + filepath });
    }

    async addAsset(req:any,res:any){
        const {key} = req.body
        await prisma.user.update({where:{id:req.user.id},data:{
            assets:{
                upsert:{
                    where:{key},
                    create:{
                        key,
                        filename:'',
                        size:0,
                        contentType:''
                    },
                    update:{}
                }
            }
        }})
        res.end()
    }
    
    async getAssets(req: any, res: any) {
        const user = await prisma.user.findUnique({ where: { id: req.user.id }, include: { assets: true } })
        if (!user) return res.status(404).json({ error: "User not found" })

        user.assets = user.assets.map(a => ({ ...a, url: 'https://' + process.env.MINIO_ENDPOINT + '/' + a.key }))

        return res.json({
            usage: {
                storageLimit: user.storageLimit,
                usedStorage: user.usedStorage
            },
            assets: user.assets
        })
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


}

export default new User();