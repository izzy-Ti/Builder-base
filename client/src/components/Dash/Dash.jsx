import React from 'react'
import toast from 'react-hot-toast'
import './dash.css'
import { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi';
import { UserCog } from 'lucide-react';
import { LogOut } from 'lucide-react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';



const Dash = () => {
    const navigate = useNavigate()
    const [user, setuser] = useState([])
    const [toaster,settoaster] = useState(null)
    const [message,setmessage] = useState('')
    const [favs, setfavs] = useState('')
    const [fav, setfav] = useState(false)

    useEffect(()=>{
      const fetch = async ()=>{
        try{
          const response = await axios.get('http://localhost:4000/user/fetch', {withCredentials: true})
          setuser(response.data.user)
        } catch (error){
          console.log('fetching error')
        }
      }
      fetch();
    },[])
    useEffect(()=>{
        const viewfavs = async () =>{
        const response = await axios.get('http://localhost:4000/user/viewfav')
        if(!response.data.building){
          setfavs('There is no favorites')
        } else {
          setfavs(response.data.building)
        }
      }
      viewfavs();
    },[])
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
                <p>{favs}</p>
            ):(
              <>
                    <h2><FaUser className='user_icon_dash' /></h2>
                    <div className='user_profile'>
                        <h4>Full Name: {user.fullname} </h4>
                        <p>Email: {user.email}</p>
                        <p>Username: {user.username}</p>
                    </div>
              </>
            )}
        </div>
    </div>
  )
}

export default Dash
