import React from 'react'
import toast from 'react-hot-toast'
import './dash.css'
import { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi';
import { UserCog } from 'lucide-react';
import { LogOut } from 'lucide-react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Dash = () => {
    const navigate = useNavigate()
    const [toaster,settoaster] = useState(null)
    const [message,setmessage] = useState('')
    const [fav, setfav] = useState(false)
    const logout = async () =>{
        try{
            const response = await axios.delete('http://localhost:4000/user/logout', {withCredentials: true})
            settoaster(response.data.success)
            setmessage(response.data.message)
            } catch (error){
            console.log('fetching error', error)
            }
    }
    useEffect(() => {
    if (toaster !== null) {
      if (toaster === true) {
        navigate('/')
        toast.success(message);
      } else if(toaster === false){
        toast.error(message);
      }
      settoaster(null);
    }
  }, [toaster]);
  return (
    <div className='dashboard'> 
        <div className="left_dash">
            <div className="left_up_dash">
                <p onClick={()=>{setfav(false)}}>Manage Account <UserCog /> </p>
                <p onClick={()=>{setfav(true)}}>Your Favorites <FiHeart /></p>
            </div>
            <div className="left_down_dash">
                <p onClick={logout}>Logout <LogOut /> </p>
            </div>
        </div>
        <div className="right_dash">
            {fav? (
                <p>Fav</p>
            ):(
                <p>Manage</p>
            )}
        </div>
    </div>
  )
}

export default Dash
