import { users } from "../models/users.js";
import express from 'express'
import jwt from 'jsonwebtoken'
import cookie from "cookie-parser";

export const verifyrole = async (req,res,next) =>{
    const token = req.cookies.token
    const userId = jwt.verify(token, 'Hashed#user')
    const user = await users.findById(userId.id)
    if(user.role === 'Admin'){
        next()
    } else {
        res.send('You are not an Admin')
    }
}