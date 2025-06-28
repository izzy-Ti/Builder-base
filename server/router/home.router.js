import express from 'express'
import { upload } from '../config/cloudnary.js'
import { addhome, deletehome, updatehome, viewhome } from '../controller/home.controller.js'

const router = express.Router()

router.get('/view', viewhome)
router.post('/add',upload.array('image', 5), addhome)
router.put('/update',upload.array('image', 5), updatehome)
router.delete('delete', deletehome)

export default router