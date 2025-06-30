import React from 'react'
import './admin.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Admins = () => {
    const [name, setname] = useState('')
    const [location,setlocation] = useState('')
    const [floor,setfloor] = useState()
    const [built_year, setbuilt_year] = useState()
    const [status, setstatus] = useState('')
    const [discription, setdiscription] = useState('')
    const [image,setimage] = useState(null)
    const [message,setmessage] = useState('')
    const [toaster,settoaster] = useState(null)
    const addBuild =async () =>{
        const response = await axios.post('http://localhost:4000/building/add',{
            name,
            location,
            floor, 
            built_year, 
            image,
            discription, 
            status}
        )
        settoaster(response.data.success)
        setmessage(response.data.message)
    }
    useEffect(() => {
    if (toaster !== null) {
      if (toaster === true) {
        navigate('/')
        location.reload()
        toast.success(message);
      } else if(toaster === false){
        toast.error(message);
      }
      settoaster(null);
    }
  }, [toaster]);

  return (
    <div>
      <h1>Admin</h1>
      <div className="building_ad">
        <h2>Add building</h2>
        <label htmlFor="">Name</label>
        <input type="text" onChange={(e)=>{setname(e.target.value)}}/>
        <label htmlFor="">Description</label>
        <input type="text" onChange={(e)=>{setdiscription(e.target.value)}}/>
        <label htmlFor="">Location</label>
        <input type="text" onChange={(e)=>{setlocation(e.target.value)}}/>
        <label htmlFor="">Built year</label>
        <input type="number" onChange={(e)=>{setbuilt_year(e.target.value)}}/>
        <label htmlFor="">Floor</label>
        <input type="number" onChange={(e)=>{setfloor(e.target.value)}}/>
        <label htmlFor="">Image</label>
        <input type="file" onChange={(e)=>{setimage(e.target.files[0])}} />
        <label htmlFor="">Status</label>
        <select name="" id="">
            <option value="" onClick={()=>{setstatus('Completed')}}>Completed</option>
            <option value="" onClick={()=>{setstatus('Not completed')}}>Not completed</option>
        </select>
        <input type="submit" value="Add" onClick={addBuild}/>
      </div>
    </div>
  )
}

export default Admins
