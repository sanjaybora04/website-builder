import dotenv from 'dotenv';
import prisma from '../../prisma';
dotenv.config();

function catchError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        try {
            return await originalMethod.apply(this, args);
        } catch (error: any) {
            console.error(`${target.constructor.name}.${propertyKey} : `, error);
            const [req, res, next] = args;
            if (res) {
                res.status(500).json({ message: 'Internal Server Error! Try again' });
            } else {
                throw error; // rethrow if there is no response object
            }
        }
    };
    return descriptor;
}

class Website {

    constructor() {
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getDraft = this.getDraft.bind(this);
        this.setDraft = this.setDraft.bind(this);
        this.setDomain = this.setDomain.bind(this);
        this.checkDomain = this.checkDomain.bind(this);
        
        // Apply decorator to all methods
        for (const key of Object.getOwnPropertyNames(this)) {
            const method = this.constructor.prototype[key];
            if (typeof method === 'function' && method.constructor.name === 'Function') {
                const descriptor = Object.getOwnPropertyDescriptor(this, key);
                if (descriptor) {
                    Object.defineProperty(this, key, catchError(this, key, descriptor));
                }
            }
        }
    }

    async get(req:any,res:any){
        const {websiteId} = req.params

        // check if user owns the website
        const website = await prisma.website.findUnique({where:{id:websiteId}})
        return res.json(website)
    }

    async getAll(req:any,res:any){
        console.log(req.user)
        const websites = await prisma.website.findMany({where:{
            admins:{
                some:{
                    id:req.user.id
                }
            }
        }})

        console.log(websites)
        return res.json(websites)
    }

    async create(req:any,res:any){
        await prisma.user.update({where:{id:req.user.id},data:{
            websites:{
                create:{
                    ...req.body
                }
            }
        }})
        return res.end()
    }

    async update(req:any,res:any){
        const {websiteId} = req.params

        // check if user owns the website

        await prisma.website.update({where:{id:websiteId},data:{
            ...req.body
        }})
        return res.end()
    }

    async delete(req:any,res:any){
        const {websiteId} = req.params

        // check if user owns the website

        await prisma.website.delete({where:{id:websiteId}})
        return res.end()
    }

    async getDraft(req:any,res:any){
        const {websiteId} = req.params

        // check if user owns the website

        const website = await prisma.website.findFirst({where:{id:websiteId}})

        return res.json(website?.draftPages)
    }
    
    async setDraft(req:any,res:any){
        const {websiteId} = req.params
    
        // check if user owns the website
    
        await prisma.website.update({where:{id:websiteId},data:{
            draftPages:req.body
        }})
        return res.end()
    }

    async setDomain(req:any,res:any){
        const {websiteId} = req.params
    
        // check if user owns the website
    
        await prisma.website.update({where:{id:websiteId},data:{
            domain:req.body
        }})
        return res.end()
    }

    async checkDomain(req:any,res:any){
        const {websiteId} = req.params
    
        // check if user owns the website
    
        await prisma.website.findFirst({where:{id:websiteId}})

        // check if the domain is working

        return res.end()
    }
}

export default new Website();