import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref: 'user', required: true},
    homeId: {type: mongoose.Schema.ObjectId, ref: 'home', required: true},
}, {timestamps:true})

export const fav = mongoose.model('fav',favSchema)