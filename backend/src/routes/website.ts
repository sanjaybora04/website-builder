import { Router } from 'express'
import Website from '../controllers/website.controller'

const router = Router()

router.get('/',Website.getAll)
router.get('/:websiteId',Website.get)
router.post('/',Website.create)
router.put('/:websiteId',Website.update)
router.delete('/:websiteId',Website.delete)

router.get('/draft/:websiteId',Website.getDraft)
router.post('/draft/:websiteId',Website.setDraft)

router.post('/domain/:websiteId',Website.setDomain)
router.get('/domain/:websiteId',Website.checkDomain)

export default router;
