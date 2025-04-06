import { Router } from 'express'
import UserRoutes from './user'
import WebsiteRoutes from './website'
import checkAuth from '../middleware/checkAuth'

const router = Router()

router.use('/user',UserRoutes)
router.use('/website',checkAuth,WebsiteRoutes)

export default router;
