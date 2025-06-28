import mongoose from "mongoose";


const buildingSchema = new mongoose.Schema({
    name: {type:String , required: true},
    location: {type:String , required: true},
    floor: {type:String , required: true},
    image: {type: [String], required:true},
    built_year: {type:String , required: true},
    discription: {type:String , required: true},
    status: {type: String, enum: ['Completed', 'Not completed']}
},{timestamps: true})

export const building = mongoose.model('building', buildingSchema)