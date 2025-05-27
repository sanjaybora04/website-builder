import dotenv from 'dotenv';
import prisma from '../../prisma';
dotenv.config();

class Website {

    async get(req: any, res: any) {
        const { websiteId } = req.params

        // check if user owns the website
        const website = await prisma.website.findUnique({ where: { id: websiteId } })
        return res.json(website)
    }

    async getAll(req: any, res: any) {
        const websites = await prisma.website.findMany({
            where: {
                admins: {
                    some: {
                        id: req.user.id
                    }
                }
            }
        })

        return res.json(websites)
    }

    async getByDomain(req: any, res: any) {
        const website = await prisma.website.findFirst({ where: { domain: req.body.domain } })
        return res.json(website)
    }

    async create(req: any, res: any) {
        const domain_exists = await prisma.website.findFirst({ where: { domain: req.body.domain } })
        if (domain_exists) return res.status(409).json({ error: `Provided domain name :- ${req.body.domain} is already registered` })

        //create a unique website domain based on website name
        await prisma.user.update({
            where: { id: req.user.id }, data: {
                websites: {
                    create: {
                        ...req.body
                    }
                }
            }
        })
        return res.end()
    }

    async update(req: any, res: any) {
        const { websiteId } = req.params

        if (req.body.domain) {
            const domain_exists = await prisma.website.findFirst({ where: { domain: req.body.domain } })
            if (domain_exists && domain_exists.id != websiteId) return res.status(409).json({ error: `${req.body.domain} is already registered` })
        }

        // check if user owns the website

        await prisma.website.update({
            where: { id: websiteId }, data: {
                ...req.body
            }
        })
        return res.end()
    }

    async delete(req: any, res: any) {
        const { websiteId } = req.params

        // check if user owns the website

        await prisma.website.delete({ where: { id: websiteId } })
        return res.end()
    }

    async getDraft(req: any, res: any) {
        const { websiteId } = req.params

        // check if user owns the website

        const website = await prisma.website.findFirst({ where: { id: websiteId } })

        return res.json(website?.draftPages)
    }

    async setDraft(req: any, res: any) {
        const { websiteId } = req.params

        // check if user owns the website

        await prisma.website.update({
            where: { id: websiteId }, data: {
                draftPages: req.body
            }
        })
        return res.end()
    }

    async checkDomain(req: any, res: any) {

        // check if domain name is pointng to server ip address

        return res.end()
    }
}

export default new Website();