import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const Navbar = () => {
  const [user,setuser] = useState()
  const [islogged,setislogged ] = useState(false)
  const [dashboard, setdashboard] = useState(false)
  const [toaster,settoaster] = useState(null)
  const [message,setmessage] = useState('')
  const navigate = useNavigate()

  

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const response = await axios.get('http://localhost:4000/user/fetch', {withCredentials: true})
        setuser(response.data.user)
        setislogged(response.data.success)
      } catch (error){
        console.log('fetching error')
      }
    }
    fetch();
  },[])
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
    <div className='navbar'>
      <div className='navbar_route'>
        <Link to='/' ><img src={logo} alt="" /></Link>
        <Link to='/' className='nav_elements'>Home</Link>
        <Link to='/projects' className='nav_elements'>Projects</Link>
        <Link to='/news' className='nav_elements'>News & Updates</Link>
        <Link to='/about' className='nav_elements'>About</Link>
      </div>
      <div>
        {islogged?(
        <div className='user_sec'><h2 className='user_full'>{user.fullname}</h2><FaUser onClick={()=>{navigate('/dashboard')}} className='user_icon'/></div>
        ):(
        <Link to='/login' className='nav_login'>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
