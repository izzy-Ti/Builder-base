import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar_route'>
        <img src={logo} alt="" />
        <Link to='/' className='nav_elements'>Home</Link>
        <Link to='/' className='nav_elements'>Projects</Link>
        <Link to='/' className='nav_elements'>News & Updates</Link>
        <Link to='/' className='nav_elements'>About</Link>
      </div>
      <div>
        <Link to='/login' className='nav_login'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar
