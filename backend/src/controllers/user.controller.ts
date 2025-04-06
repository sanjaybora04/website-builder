import dotenv from 'dotenv';
import prisma from '../../prisma';
import axios from 'axios';
import jwt from 'jsonwebtoken'
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

class User {

    constructor() {
        this.signin = this.signin.bind(this);
        

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

        if(user){
            const token = jwt.sign({
                id: user.id,
                name:user.name,
                email: user.email,
            }, process.env.JWT_SECRET!, { expiresIn: "24d" })
    
            return res.json({
                token,
                name: user.name,
                email: user.email
            })
        }else{
            const newUser = await prisma.user.create({
                data:{
                    name:firstName,
                    googleOauthId,
                    email
                }
            })

            const token = jwt.sign({
                id: newUser.id,
                name:newUser.name,
                email: newUser.email,
            }, process.env.JWT_SECRET!, { expiresIn: "24d" })
    
            return res.json({
                token,
                name: newUser.name,
                email: newUser.email
            })
        }

    }
}

export default new User();