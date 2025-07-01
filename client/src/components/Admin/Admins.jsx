import React from 'react'
import './admin.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs'


const Admins = () => {
    const [buildID, setbuildID] = useState()
    const [name, setname] = useState('')
    const [location,setlocation] = useState('')
    const [floor,setfloor] = useState()
    const [built_year, setbuilt_year] = useState()
    const [status, setstatus] = useState()
    const [discription, setdiscription] = useState('')
    const [image,setimage] = useState(null)
    const [message,setmessage] = useState('')
    const [toaster,settoaster] = useState(null)
    const [futured, setfutured] = useState([])
    const addBuild =async () =>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('floor', floor);
        formData.append('built_year', built_year);
        formData.append('status', status);
        formData.append('discription', discription);
        formData.append('image', image);
        const response = await axios.post('http://localhost:4000/building/add',formData, {
        headers: {'Content-Type': 'multipart/form-data',},})
        settoaster(response.data.success)
        setmessage(response.data.message)
    }
    useEffect(()=>{
        const features = async () =>{
            const response = await axios.get('http://localhost:4000/building/view')
            setfutured(response.data)
        }
        features()
    },[])
    const deletebuild = async (id) =>{
        const response = await axios.delete('http://localhost:4000/building/delete',{data: { id}})
        settoaster(response.data.success)
        setmessage(response.data.message)       
    }
    useEffect(() => {
    if (toaster !== null) {
      if (toaster === true) {
        toast.success(message);
        window.location.reload()
      } else if(toaster === false){
        toast.error(message);
      }
      settoaster(null);
    }
  }, [toaster]);

  return (
    <div>
      <h1>Admin</h1>
      <div className="building_admin">
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
            <select onChange={(e) => setstatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="Completed">Completed</option>
            <option value="Not completed">Not completed</option>
            </select>
            <input type="submit" value="Add" className='admin_bui' onClick={addBuild}/>
        </div>
        <div className='all_buildings'>
            <table className="building-table">
            <thead>
                <tr>
                <th className='table_tr'>#</th>
                <th className='table_tr'>Name</th>
                <th className='table_tr'>Year Built</th>
                <th className='table_tr'>Floor</th>
                <th className='table_tr'>Location</th>
                <th className='table_tr'>Created At</th>
                <th className='table_tr'>Action</th>
                </tr>
            </thead>
            <tbody>
                {futured.map((future, index) => (
                <tr key={future._id}>
                    <td className='table_tr'>{index + 1}</td>
                    <td className='table_tr'>{future.name}</td>
                    <td className='table_tr'>{future.built_year}</td>
                    <td className='table_tr'>{future.floor}</td>
                    <td className='table_tr'>{future.location}</td>
                    <td className='table_tr'>{dayjs(future.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                    <td className='table_tr'>
                    <button onClick={() => deletebuild(future._id)}><FaTrash /></button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Admins
