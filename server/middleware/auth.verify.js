import { users } from "../models/users.js"

export const verifyuser = async (req,res) =>{
    const token = req.cookies.token
    if(!token) {
        return req.json({success: 'false', message: 'please Login'})
    }
    const userId = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await users.findByIdAndDelete(userId.id)
    if(!user) {
        return req.json({success: 'false', message: 'User not found'})
    }
    return user
}