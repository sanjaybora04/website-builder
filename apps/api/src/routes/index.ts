import { Router } from 'express'
import UserRoutes from './user'
import WebsiteRoutes from './website'
import FormRoutes from './form'
import WebhookRoutes from './webhooks'

const router = Router()

router.use('/user',UserRoutes)
router.use('/website',WebsiteRoutes)
router.use('/form',FormRoutes)
router.use('/webhook',WebhookRoutes)

export default router;
