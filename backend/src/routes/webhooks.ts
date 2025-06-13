import { Router } from 'express'
import prisma from '../../prisma'

const router = Router()

router.post('/minio', async (req, res) => {
    if (req.body.EventName == "s3:ObjectCreated:Put") {
        const key = req.body.Key
        const size = req.body.Records[0].s3.object.size
        const contentType = req.body.Records[0].s3.object.contentType
        const [_, userId, filename] = key.split('/')
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) return res.end()
        await prisma.user.update({
            where: { id: userId }, data: {
                usedStorage: {
                    increment: size
                },
                assets: {
                    upsert: {
                        where: { key },
                        create: {
                            key,
                            filename,
                            size,
                            contentType
                        },
                        update: {
                            size,
                            contentType
                        }
                    }
                }
            }
        })
        return res.end()
    }
})

export default router;
