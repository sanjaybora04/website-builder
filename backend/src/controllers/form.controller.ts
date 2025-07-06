import dotenv from 'dotenv';
import prisma from '../../prisma';
import { addMonths } from 'date-fns';
dotenv.config();

class Form {
    submit = async (req: any, res: any) => {
        const referer = req.headers.referer || '';
        const refererUrl = referer ? new URL(referer) : null;

        const sourceDomain = refererUrl?.hostname;

        const website = await prisma.website.findUnique({where:{domain:sourceDomain},include:{admin:true}})
        if(!website) return res.status(400).json({error:"Website not found"})

        const countFormSubmissions = await prisma.formSubmission.count({
            where:{
                userId:website.admin.id,
                createdAt:{
                    gte: addMonths(new Date(),-1)
                }
            },
            take:website.admin.maxFormSubmissions,
        })

        if(countFormSubmissions==website.admin.maxFormSubmissions){
            return res.status(409).json({error:"Form Submission Limit Reached\n If you are the owner, please upgrade to continue"})
        }

        await prisma.formSubmission.create({
            data:{
                websiteId: website.id,
                page: req.body.page,
                userId: website.admin.id,
                data: req.body.data,
            }
        })

        return res.end()
    }

    get = async (req:any, res:any)=>{
        const {websiteId,path,from,to,limit,page} = req.query

        const total = await prisma.formSubmission.count({
            where:{
                websiteId,
                page:path,
                userId:req.user.id
            }
        })

        const formSubmissions = await prisma.formSubmission.findMany({
            where:{
                websiteId,
                page:path,
                userId:req.user.id,
                createdAt: {
                    ...from?{gte:new Date(from)}:{},
                    ...to?{lte:new Date(new Date(to).setHours(23,59,59,999))}:{}
                }
            },
            orderBy:{
                createdAt:'desc'
            },
            include:{website:true},
            take:Number(limit),
            skip:(Number(page))*Number(limit)
        })

        function extractDynamicFields(submissions: any[]): string[] {
            const fieldsSet = new Set<string>()
          
            submissions.forEach((submission) => {
              if (submission.data && typeof submission.data === "object") {
                Object.keys(submission.data).forEach((key) => {
                  fieldsSet.add(key)
                })
              }
            })
          
            return Array.from(fieldsSet).sort()
          }
          
        const dynamicFields = extractDynamicFields(formSubmissions)

        return res.json({data:formSubmissions,dynamicFields,total})
    }
}

export default new Form();