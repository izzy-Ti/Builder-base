import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Navbar = () => {
  const [user,setuser] = useState()
  const [islogged,setislogged ] = useState(false)
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get('http://localhost:4000/user/fetch')
      setuser(response.data.user)
      setislogged(response.data.success)
    }
    fetch();
  },[])
  return (
    <div className='navbar'>
      <div className='navbar_route'>
        <Link to='/' ><img src={logo} alt="" /></Link>
        <Link to='/' className='nav_elements'>Home</Link>
        <Link to='/' className='nav_elements'>Projects</Link>
        <Link to='/' className='nav_elements'>News & Updates</Link>
        <Link to='/' className='nav_elements'>About</Link>
      </div>
      <div>
        {islogged?(<h2 className='user_full'>{user.fullname}</h2>):(
        <Link to='/login' className='nav_login'>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
