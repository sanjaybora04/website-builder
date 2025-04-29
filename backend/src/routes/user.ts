import { Router } from 'express'
import User from '../controllers/user.controller'
import checkAuth from '../middleware/checkAuth'

const router = Router()

router.post('/signin', User.signin)

router.get('/storage/uploadurl',checkAuth, User.getUploadUrl)

router.post('/storage/addasset',checkAuth,User.addAsset)

router.get('/storage/assets',checkAuth,User.getAssets)

router.post('/storage/deleteasset',checkAuth,User.deleteAsset)

export default router;
