import jwt from 'jsonwebtoken'

/**
 * decrypt JWT token 
*/
const auth = (req:any, res:any, next:any) => {
    try {
        if (req.headers.token) {
            const user = jwt.verify(req.headers.token, process.env.JWT_SECRET!)
            req.user = user
            return next()
        }
        else {
            return next()
        }
    } catch (err) {
        next()
    }
};

export default auth;