import { Router } from 'express'
import User from '../controllers/user.controller'
import checkAuth from '../middleware/checkAuth'

const router = Router()

router.post('/signin', User.signin)

router.get('/storage/uploadurl',checkAuth, User.getUploadUrl)

router.get('/storage/usage',checkAuth, User.getUsage)

router.post('/storage/assets/add',checkAuth,User.addAsset)

router.post('/storage/assets/move',checkAuth, User.moveAsset)

router.post('/storage/assets/rename',checkAuth, User.renameAsset)

router.get('/storage/assets',checkAuth,User.getAssets)

router.post('/storage/assets/delete',checkAuth,User.deleteAsset)

router.get('/storage/folder',checkAuth, User.getFolders)

router.post('/storage/folder/add',checkAuth, User.addFolder)

router.post('/storage/folder/delete',checkAuth, User.deleteFolder)

router.post('/storage/folder/move',checkAuth, User.moveFolder)

router.post('/storage/folder/rename',checkAuth, User.renameFolder)



export default router;
