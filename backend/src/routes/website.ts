import { Router } from 'express'
import Website from '../controllers/website.controller'
import checkAuth from '../middleware/checkAuth'

const router = Router()

router.post('/draft/:websiteId',checkAuth,Website.setDraft)

// router.post('/domain/:websiteId',checkAuth,Website.setDomain)
router.get('/domain/:websiteId',checkAuth,Website.checkDomain)

router.post('/getbydomain',Website.getByDomain)

router.get('/',checkAuth,Website.getAll)
router.get('/:websiteId',checkAuth,Website.get)
router.post('/',checkAuth,Website.create)
router.put('/:websiteId',checkAuth,Website.update)
router.delete('/:websiteId',checkAuth,Website.delete)

export default router;
