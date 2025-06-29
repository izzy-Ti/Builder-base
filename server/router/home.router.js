import express from 'express'
import { upload } from '../config/cloudnary.js'
import { addhome, deletehome, updatehome, viewhome } from '../controller/home.controller.js'
import { verifyrole } from '../middleware/role.verify.js'

const router = express.Router()

router.get('/view', viewhome)
router.post('/add',verifyrole,upload.array('image', 5), addhome)
router.put('/update',verifyrole,upload.array('image', 5), updatehome)
router.delete('delete',verifyrole, deletehome)

export default router