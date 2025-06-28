import { users } from "../models/users.js";
import jwt from 'jsonwebtoken'
import cookie from "cookie-parser";
import bycrpt from 'bcryptjs'
import dotenv from 'dotenv'
import { verifyuser } from "../middleware/auth.verify.js";

dotenv.config()

export const userRegistration = async (req,res) =>{
    const {fullname, email, username, password, role} = req.body
    const Useremail = await users.findOne({email})
    const Username = await users.findOne({username})
    if(Username || Useremail) {
        res.json({success: 'false', message: 'Email already exists'})
    }
    try {
        const hashedPassword = await bycrpt.hash(password, 10)
        const newUser = new users({
            fullname,
            email,
            username,
            password:hashedPassword,
            role
        })
        await newUser.save()
        const token = jwt.sign({id:newUser._id}, process.env.TOKEN_SECRET)
        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.EXPRESS_ENV === 'production',
            sameSite: process.env.EXPRESS_ENV === 'production' ? 'none' : 'strict',
            maxAge: 14 * 24 * 60 * 60 * 1000
            })
        res.json({success: 'true', message: 'Signin successful'})
    } catch (error) {
        req.json({success: 'false', message: 'Something went wrong'})
    }
}

export const userLogin = async (req,res) =>{
    const {username, password }= req.body 
    const user = await users.findOne({username})
    if(!user || !password){
        return res.json({success: 'false', message: 'All fields are required'})
    }
    if(!(await bycrpt.compare(password, user.password))){
        return res.json({success: 'false', message: 'Invalid credentials'})
    }
    try{
        const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET)
        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.EXPRESS_ENV === 'production',
            sameSite: process.env.EXPRESS_ENV === 'production' ? 'none' : 'strict',
            maxAge: 14 * 24 * 60 * 60 * 1000
            })
        res.json({success: 'true', message: 'Signin successful', user: user})
    } catch (error){
        req.json({success: 'false', message: 'Something went wrong'})
    }
} 
export const userUpdate = async (req,res) =>{
    const {fullname, username, email} = req.body
    const user = verifyuser(req,res);
    const updateduser =await users.findByIdAndUpdate(user.id,{
        fullname,
        email,
        username
    },{new:true})
    res.json({success: 'true', message: 'Update successful', user: user})
}
export const userPasswordReset = async (req,res) =>{
    const {password} = req.body
    const hashedPassword = await bycrpt.hash(password, 10)
    const token = req.cookies.token
    if(!token) {
        req.json({success: 'false', message: 'please Login'})
    }
    const userId = jwt.verify(token, process.env.TOKEN_SECRET)
    const user =await users.findByIdAndUpdate(userId.id,{
        password:hashedPassword
    },{new:true})
    res.json(user)
}
export const deleteuser = async (req,res) =>{
    const token = req.cookies.token
    if(!token) {
        req.json({success: 'false', message: 'please Login'})
    }
    const userId = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await users.findByIdAndDelete(userId.id)
    res.clearCookie('token')
    res.send('Account deleted')
}
export const logoutuser = async (req,res) =>{
    res.clearCookie('token')
    res.send('Logout successful')
}
export const addfav = async (req,res) =>{
    const homeid = req.body
    const token = req.cookies.token
    if(!token) {
        req.json({success: 'false', message: 'please Login'})
    }
    const userId = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await users.findByIdAndDelete(userId.id)
    user.fav.push(homeid)
}