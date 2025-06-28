import express from 'express'
import { addbuilding, deletebuilding, updatebuilding, viewbuilding } from '../controller/build.controller.js'
import { upload } from '../config/cloudnary.js'

const router = express.Router()
router.use(express.json())

router.get('/view', viewbuilding)
router.post('/add',upload.array('image', 3), addbuilding)
router.put('/update',upload.array('image', 3), updatebuilding)
router.delete('/delete', deletebuilding)

export default router