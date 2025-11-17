import dotenv from 'dotenv';
import prisma from '../lib/prisma';
import dns from 'dns/promises';
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
                adminId: req.user.id
            }
        })

        return res.json(websites)
    }

    async getByDomain(req: any, res: any) {
        const website = await prisma.website.findFirst({ where: { domain: req.body.domain }, include: { admin: true } })
        return res.json(website)
    }

    async create(req: any, res: any) {
        const { domain } = req.body;

        const domain_exists = await prisma.website.findFirst({ where: { domain: domain } })
        if (domain_exists) return res.status(409).json({ error: `Provided domain name :- ${domain} is already registered` })

        // check max websites limit for the user
        const user = await prisma.user.findUnique({ where: { id: req.user.id }, include: { websites: true } })
        if (!user) return res.status(404).json({ error: `User not found` })
        if (user.websites.length >= user.maxWebsites) {
            return res.status(403).json({ error: `You have reached the maximum number of websites allowed for your plan.\nPlease upgrade your plan.` })
        }

        // Validate domain format
        const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            return res.status(400).json({ error: `Provided domain name :- ${domain} is not valid` });
        }

        // dont allow custom domain for free users
        if (!domain.endsWith(process.env.WILDCARD_DOMAIN)) {
            if (user.plan == "FREE") return res.status(403).json({ error: `You can only create websites with the sitecraft subdomain on free plan.\nPlease upgrade your plan to use custom domains.` })

            // DNS Lookup to verify if domain is pointing to the server
            try {
                const records = await dns.lookup(domain, { all: true });
                const domainPointsToServer = records.some(record => record.address === process.env.SERVER_IP);

                if (!domainPointsToServer) {
                    return res.status(404).json({
                        error: `Domain ${domain} is not pointing to this server.`,
                        records: records.map(r => r.address),
                    });
                }
            } catch (dnsError) {
                try {
                    const ns = await dns.resolveNs(domain);
                    return res.status(404).json({
                        error: `Domain ${domain} is not pointing to this server.`,
                        nameservers: ns,
                    });
                } catch {
                    return res.status(404).json({
                        error: `Domain ${domain} is not pointing to this server and no nameservers could be found.`,
                    });
                }
            }
        }

        //create a unique website domain based on website name
        const website = await prisma.website.create({
            data: {
                ...req.body,
                adminId: req.user.id,
            },
            select: {
                id: true,
            },
        })
        
        return res.json({ id: website.id })
    }

    async update(req: any, res: any) {
        const { websiteId } = req.params

        const { domain } = req.body;
        if (domain) {
            const user = await prisma.user.findUnique({ where: { id: req.user.id } })
            if (!user) return res.status(404).json({ error: "User not found" })

            // Validate domain format
            const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
            if (!domainRegex.test(domain)) {
                return res.status(400).json({ error: `Provided domain name :- ${domain} is not valid` });
            }

            // dont allow custom domain for free users
            if (!domain.endsWith(process.env.WILDCARD_DOMAIN)) {
                if (user.plan == "FREE") return res.status(403).json({ error: `You can only create websites with the sitecraft subdomain on free plan.\nPlease upgrade your plan to use custom domains.` })

                // DNS Lookup to verify if domain is pointing to the server
                try {
                    const records = await dns.lookup(domain, { all: true });
                    const domainPointsToServer = records.some(record => record.address === process.env.SERVER_IP);

                    if (!domainPointsToServer) {
                        return res.status(404).json({
                            error: `Domain ${domain} is not pointing to this server.`,
                            records: records.map(r => r.address),
                        });
                    }
                } catch (dnsError) {
                    try {
                        const ns = await dns.resolveNs(domain);
                        return res.status(404).json({
                            error: `Domain ${domain} is not pointing to this server.`,
                            nameservers: ns,
                        });
                    } catch {
                        return res.status(404).json({
                            error: `Domain ${domain} is not pointing to this server and no nameservers could be found.`,
                        });
                    }
                }
            }
        }

        // check if user owns the website
        const userOwnsWebsite = await prisma.website.findFirst({ where: { id: websiteId, adminId: req.user.id } })
        if (!userOwnsWebsite) return res.status(409).json({ error: "You dont have access to this website" })

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
        const userOwnsWebsite = await prisma.website.findFirst({ where: { id: websiteId, adminId: req.user.id } })
        if (!userOwnsWebsite) return res.status(409).json({ error: "You dont have access to this website" })

        await prisma.formSubmission.deleteMany({ where: { websiteId } })
        await prisma.website.delete({ where: { id: websiteId } })
        return res.end()
    }

    async getDraft(req: any, res: any) {
        const { websiteId } = req.params

        // check if user owns the website
        const userOwnsWebsite = await prisma.website.findFirst({ where: { id: websiteId, adminId: req.user.id } })
        if (!userOwnsWebsite) return res.status(409).json({ error: "You dont have access to this website" })

        const website = await prisma.website.findFirst({ where: { id: websiteId } })

        return res.json(website?.draftPages)
    }

    async setDraft(req: any, res: any) {
        const { websiteId } = req.params

        // check if user owns the website
        const userOwnsWebsite = await prisma.website.findFirst({ where: { id: websiteId, adminId: req.user.id } })
        if (!userOwnsWebsite) return res.status(409).json({ error: "You dont have access to this website" })

        await prisma.website.update({
            where: { id: websiteId }, data: {
                draftPages: req.body
            }
        })
        return res.end()
    }

    async checkDomain(req: any, res: any) {
        const { domain } = req.body;

        // 1. Check if domain is already registered
        const domain_exists = await prisma.website.findFirst({ where: { domain } });
        if (domain_exists) {
            return res.status(409).json({ error: `Provided domain name :- ${domain} is already registered` });
        }

        // 2. Validate domain format
        const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            return res.status(400).json({ error: `Provided domain name :- ${domain} is not valid` });
        }

        // 3. DNS Lookup to verify if domain is pointing to the server
        try {
            const records = await dns.lookup(domain, { all: true });
            const domainPointsToServer = records.some(record => record.address === process.env.SERVER_IP);

            if (domainPointsToServer) {
                return res.status(200).json({ message: `Domain ${domain} is valid and pointing to server.` });
            } else {
                return res.status(404).json({
                    error: `Domain ${domain} is not pointing to this server.`,
                    records: records.map(r => r.address)
                });
            }
        } catch (dnsError) {
            // 4. Optionally, get nameservers as a hint for provider
            try {
                const ns = await dns.resolveNs(domain);
                return res.status(404).json({
                    error: `Domain ${domain} is not pointing to this server.`,
                    nameservers: ns
                });
            } catch {
                return res.status(404).json({
                    error: `Domain ${domain} is not pointing to this server and no nameservers could be found.`,
                });
            }
        }
    }
}

export default new Website();