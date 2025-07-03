import { Router } from 'express'
import form from '../controllers/form.controller'
import checkAuth from '../middleware/checkAuth'

const router = Router()

router.get('/',checkAuth,form.get)

router.post('/',form.submit)

export default router;
