import mongoose from "mongoose";

const homeSchema =new mongoose.Schema({
    buildingId: {type: mongoose.Schema.ObjectId, ref: 'building' , required: true},
    bedrooms : {type:Number, required:true},
    area: {type: String, required:true},
    price: {type: String, required:true},
    image: {type:[String], required:true},
    status: {type:String, enum: ['Available', 'Not available']}
}, {timestamp:true})

export const home = mongoose.model('home', homeSchema)