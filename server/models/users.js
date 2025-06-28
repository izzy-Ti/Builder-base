import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullname: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role: {type:String, enum: ['Admin', 'User'], default: 'User'}
}, {timestamp: true})

export const users = mongoose.model("user", userSchema)