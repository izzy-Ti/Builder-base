import { home } from "../models/homes.js";


export const viewhome = async (req,res) =>{
    const viewhome = await home.find()
    res.json(viewhome)
}
export const addhome = async (req,res) =>{
    const {buildingId, bedrooms, area, price, status} = req.body
    const image = req.files.map(file => file.path)
    try{
        const newhome = new home({
            buildingId, 
            bedrooms, 
            area, 
            price, 
            status,
            image
        })
        await newhome.save()
        res.json({success: 'true', message: 'Home added successfully', home: newhome})
    } catch(error){
        return res.json({success: 'false', message: 'Something went wrong'})
    }
}
export const updatehome = async (req,res) =>{
    const {id,buildingId, bedroom, area, price, status} = req.body
    const image = req.file.path
    try {
        const updatedhome = await home.findByIdAndUpdate(id,{
            buildingId, 
            bedroom, 
            area, 
            price, 
            status,
            image
        },{new:true})
        res.json({success: 'true', message: 'Home updated successfully', home: updatedhome})
    } catch(error) {
        return res.json({success: 'false', message: 'Something went wrong'})
    }
}
export const deletehome = async (req,res) =>{
    const {id} = req.body
    try {
        const deletedhome = await home.findByIdAndDelete(id)
        res.json({success: 'true', message: 'Home deleted successfully'})
    } catch(error) {
        return res.json({success: 'false', message: 'Something went wrong'})
    }
}