import { users } from "../models/users.js"
import jwt from 'jsonwebtoken'


export const verifyuser = async (req,res) =>{
    const token = req.cookies.token
    if(!token) {
        return res.json({success: false, message: 'please Login'})
    }
    const userId = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await users.findById(userId.id)
    if(!user) {
        return res.json({success: false, message: 'User not found'})
    }
    return user
}