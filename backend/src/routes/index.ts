import { Router } from 'express'
import UserRoutes from './user'
import WebsiteRoutes from './website'

const router = Router()

router.use('/user',UserRoutes)
router.use('/website',WebsiteRoutes)

export default router;
