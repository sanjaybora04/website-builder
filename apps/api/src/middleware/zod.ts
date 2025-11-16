import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { z } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
    (schema: ZodSchema, target: ValidationTarget = 'body') =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req[target]);
                return next(); // If validation passes, proceed to the next middleware
            } catch (err: any) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        message: 'Validation error',
                        errors: err.errors,
                    });
                }
                console.error('Zod Internal server error: ', err);
                return res.status(500).json({message:'Internal Server Error'}); // Pass any non-validation errors to the next error handler
            }
        };

export const centerSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().min(200, "description should be atleast 200 characters long").max(250, "description can't be more than 250 characters"),
    address: z.string(),
    matterportUrl: z.string(),
    city: z.string(),
    area: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    placeId: z.string(),
    openingTime: z.string(),
    closingTime: z.string(),
    amenities: z.array(z.string()),
    availableWeekdays: z.object({
        Monday: z.boolean(),
        Tuesday: z.boolean(),
        Wednesday: z.boolean(),
        Thursday: z.boolean(),
        Friday: z.boolean(),
        Saturday: z.boolean(),
        Sunday: z.boolean()
    }),
    images: z.array(z.string()).min(4,{message:"Atleast 4 images are required"}),
});
