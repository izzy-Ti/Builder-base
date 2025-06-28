import { users } from "../models/users.js";
import jwt from 'jsonwebtoken'
import cookie from "cookie-parser";
import bycrpt from 'bcryptjs'

export const userRegistration = async (req,res) =>{
    const {fullname, email, username, password, role} = req.body
    const hashedPassword = await bycrpt.hash(password, 10)
    const newUser = new users({
        fullname,
        email,
        username,
        password:hashedPassword,
        role
    })
    await newUser.save()
    res.json(newUser)
}

export const userLogin = async (req,res) =>{
    const {username, password }= req.body 
    const user = await users.findOne({username})
    if(!user || !(await bycrpt.compare(password, user.password))){
        return res.send('invalid')
    }
    const token = jwt.sign({id:user._id}, 'Hashed#user')
    res.cookie('token',token)
    res.json(user)
} 
export const userUpdate = async (req,res) =>{
    const {fullname, username, email} = req.body
    const token = req.cookies.token
    const userId = jwt.verify(token, 'Hashed#user')
    const user =await users.findByIdAndUpdate(userId.id,{
        fullname,
        email,
        username
    },{new:true})
    res.json(user)
}
export const userPasswordReset = async (req,res) =>{
    const {password} = req.body
    const hashedPassword = await bycrpt.hash(password, 10)
    const token = req.cookies.token
    const userId = jwt.verify(token, 'Hashed#user')
    const user =await users.findByIdAndUpdate(userId.id,{
        password:hashedPassword
    },{new:true})
    res.json(user)
}
export const deleteuser = async (req,res) =>{
    const token = req.cookies.token
    const userId = jwt.verify(token, 'Hashed#user')
    const user = await users.findByIdAndDelete(userId.id)
    res.clearCookie('token')
    res.send('Account deleted')
}
export const logoutuser = async (req,res) =>{
    res.clearCookie('token')
    res.send('Logout successful')
}