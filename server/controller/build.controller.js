import {building} from './../models/building.js'

export const viewbuilding = async (req,res) =>{
    const build = await building.find()
    res.json(build)
}
export const addbuilding = async (req,res) =>{
    const {name, location, floor, built_year, discription, status} = req.body
    const image = req.files?.map(file => file.path);
    try{
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
        res.json({success: true, message: 'Building added successfully', building: newbuilding})
    } catch(error) {
        res.json({success: false, message: 'Something went wrong'})
        console.log(error)
    }
}
export const updatebuilding =async (req,res) =>{
    const {id, name, location, floor, built_year, discription, status} = req.body
    const image = req.file.path
    try{
        const build = await building.findByIdAndUpdate(id,{
            name,
            location,
            floor, 
            image,
            built_year, 
            discription, 
            status
        },{new: true})
        res.json({success: true, message: 'Building updated successfully', building: build})
    } catch(error) {
        return res.json({success: false, message: 'Something went wrong'})
    }
}
export const deletebuilding = async (req,res) =>{
    const {id} = req.body
    try{
        const build = await building.findByIdAndDelete(id)
        res.json({success: true, message: 'Building deleted successfully'})
    } catch(error){
        return res.json({success: false, message: 'Something went wrong'})
    }
}
