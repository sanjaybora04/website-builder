import { Router } from 'express'
import User from '../controllers/user.controller'

const router = Router()

router.post('/signin', User.signin)

export default router;
