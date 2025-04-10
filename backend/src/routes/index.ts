import { Router } from 'express'
import UserRoutes from './user'
import WebsiteRoutes from './website'
import WebhookRoutes from './webhooks'

const router = Router()

router.use('/user',UserRoutes)
router.use('/website',WebsiteRoutes)
router.use('/webhook',WebhookRoutes)

export default router;
