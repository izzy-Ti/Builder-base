import { home } from "../models/homes.js";


export const viewhome = async (req,res) =>{
    const viewhome = await home.find()
    res.json(viewhome)
}
export const addhome = async (req,res) =>{
    const {buildingId, bedrooms, area, price, status} = req.body
    const image = req.files.map(file => file.path)
    const newhome = new home({
        buildingId, 
        bedrooms, 
        area, 
        price, 
        status,
        image
    })
    await newhome.save()
    res.json(newhome)
}
export const updatehome = async (req,res) =>{
    const {id,buildingId, bedroom, area, price, status} = req.body
    const image = req.file.path
    const updatedhome = await home.findByIdAndUpdate(id,{
        buildingId, 
        bedroom, 
        area, 
        price, 
        status,
        image
    },{new:true})
    res.json(updatedhome)
}
export const deletehome = async (req,res) =>{
    const {id} = req.body
    const deletedhome = await home.findByIdAndDelete(id)
    res.json(deletedhome)
}