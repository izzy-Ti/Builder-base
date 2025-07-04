import { users } from "../models/users.js";
import jwt from 'jsonwebtoken'
import cookie from "cookie-parser";
import bycrpt from 'bcryptjs'
import dotenv from 'dotenv'
import { verifyuser } from "../middleware/auth.verify.js";
import { building } from "../models/building.js";

dotenv.config()

export const userfetch = async (req,res) =>{
    const user = await verifyuser(req,res);
    if (res.headersSent) return;
    if(!user) {
        return res.json({success: false, message: 'Email or Username already exists'})
    }
    return res.json({success: true, message: 'Signin successful', user:user})
}

export const userRegistration = async (req,res) =>{
    const {fullname, email, username, password, role} = req.body
    const Useremail = await users.findOne({email})
    const Userunique = await users.findOne({username})
    if(Userunique || Useremail) {
        return res.json({success: false, message: 'Email or Username already exists'})
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
        res.json({success: true, message: 'Signin successful'})
    } catch (error) {
        return res.json({success: false, message: 'Something went wrong'})
    }
}

export const userLogin = async (req,res) =>{
    const {username, password }= req.body 
    const user = await users.findOne({username})
    if(!username || !password){
        return res.json({success: false, message: 'All fields are required'})
    }
    if(!user){
        return res.json({success: false, message: 'User not found'})
    }
    if(!(await bycrpt.compare(password, user.password))){
        return res.json({success: false, message: 'Invalid credentials'})
    }
    try{
        const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET)
        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.EXPRESS_ENV === 'production',
            sameSite: process.env.EXPRESS_ENV === 'production' ? 'none' : 'strict',
            maxAge: 14 * 24 * 60 * 60 * 1000
            })
        res.json({success: true, message: 'Login successful', user: user})
    } catch (error){
        res.json({success: false, message: 'Something went wrong'})
    }
} 
export const userUpdate = async (req,res) =>{
    const {fullname, username, email} = req.body
    try {
        const user = verifyuser(req,res);
        if (res.headersSent) return;
        const updateduser =await users.findByIdAndUpdate(user.id,{
            fullname,
            email,
            username
        },{new:true})
        res.json({success: true, message: 'Update successful', user: updateduser})
    } catch (error) {
        return res.json({success: 'false', message: 'Something went wrong'})
    }
}
export const userPasswordReset = async (req,res) =>{
    const {password} = req.body
    try {
        const hashedPassword = await bycrpt.hash(password, 10)
        const user = verifyuser(req,res);
        if (res.headersSent) return;
        const updateduser =await users.findByIdAndUpdate(user.id,{
            password:hashedPassword
        },{new:true})
        res.json({success: true, message: 'Password updated successfully', user: updateduser})
    } catch(error) {
        return res.json({success: 'false', message: 'Something went wrong'})
    }
}
export const deleteuser = async (req,res) =>{
    try {
        const user = verifyuser(req,res);
        if (res.headersSent) return;
        const deleteduser = await users.findByIdAndDelete(user.id)
        res.clearCookie('token')
        res.json({success: true, message: 'Account deleted successfully'})
    } catch (error) {
        return res.json({success: false, message: 'Something went wrong'})
    }
}
export const logoutuser = async (req,res) =>{
    try{
        res.clearCookie('token')
        res.json({success: true, message: 'Logout successful'})
    } catch (error){
        return res.json({success: false, message: 'Something went wrong'})
    }
}
export const viewfav = async (req,res) =>{
    try{
        const user = verifyuser(req,res);
        if (res.headersSent) return;
        const favs = user.fav
        const build = await building.findById(favs)
        res.json({success: true, message: 'Favs are', building: build})
    } catch (error){
        return res.json({success: false, message: 'Something went wrong'})
    }
}
export const addfav = async (req,res) =>{
    const buildingid = req.body.buildingid
        const user =await verifyuser(req,res);
        if (!Array.isArray(user.fav)) {
            user.fav = [];
        }
        if (res.headersSent) return;
        if (!user.fav.includes(buildingid)) {
            user.fav.push(buildingid);
            await user.save();
            res.json({success: true, message: 'Added to Fav', status: 'added'})
        }
        if(user.fav.includes(buildingid)){
            const index = user.fav.indexOf(buildingid);
            if (index > -1) {
                user.fav.splice(index, 1);
                res.json({success: true, message: 'Added to Fav', status: 'removed'})
            }
        }
}
