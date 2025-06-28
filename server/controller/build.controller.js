import {building} from './../models/building.js'

export const viewbuilding = async (req,res) =>{
    const build = await building.find()
    res.json(build)
}
export const addbuilding = async (req,res) =>{
    const {name, location, floor, built_year, discription, status} = req.body
    const image = req.files?.map(file => file.path);
    const newbuilding = new building({
        name,
        location,
        floor, 
        built_year, 
        image,
        discription, 
        status
    })
    await newbuilding.save()
    res.json(newbuilding)
}
export const updatebuilding =async (req,res) =>{
    const {id, name, location, floor, built_year, discription, status} = req.body
    const image = req.file.path
    const build = await building.findByIdAndUpdate(id,{
        name,
        location,
        floor, 
        image,
        built_year, 
        discription, 
        status
    },{new: true})
    res.json(build)
}
export const deletebuilding = async (req,res) =>{
    const {id} = req.body
    const build = await building.findByIdAndDelete(id)
    res.json(build)
}
