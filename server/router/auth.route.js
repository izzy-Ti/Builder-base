import express from 'express'
import { Router } from 'express'
import { deleteuser, logoutuser, userLogin, userPasswordReset, userRegistration, userUpdate } from '../controller/auth.controller.js'
import { verifyrole } from '../middleware/role.verify.js'

const router = express.Router()

router.use(express.json())


router.post('/signup', userRegistration)
router.post('/login', userLogin)
router.post('/update',verifyrole, userUpdate)
router.post('/passwordreset', userPasswordReset)
router.delete('/deleteaccount', deleteuser)
router.delete('/logout', logoutuser)

export default router