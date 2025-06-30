import React, { useState, useEffect } from 'react'
import './login.css'
import logo from './../../assets/logo.png'
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { HiOutlineIdentification } from 'react-icons/hi';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Loginform = () => {
  const [isloggin, setisloggin] = useState(true)
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [fullname, setfullname] = useState('')
  const [password, setpassword] = useState('')
  const [message,setmessage] = useState('')
  const [toaster,settoaster] = useState(null)
  const navigate = useNavigate()

  const signup = async() =>{
    const response = await axios.post(' http://localhost:4000/user/signup',{
      username,
      email,
      fullname,
      password
    })
    setmessage(response.data.message)
    settoaster(response.data.success)
  }
  const login = async () =>{
    const response = await axios.post(' http://localhost:4000/user/login',{
      username,
      password
    })
    setmessage(response.data.message)
    settoaster(response.data.success)
  }
  useEffect(() => {
    if (toaster !== null) {
      if (toaster === true) {
        toast.success(message);
        navigate('/')
        location.reload()
      } else if(toaster === false){
        toast.error(message);
      }
      settoaster(null);
    }
  }, [toaster]);
  return (
    <div className='login_body'>
      <div className='login'>
        <div className='login_img'>
        <img src={logo} alt="" />
        </div>
        {isloggin?(
        <div className="login_cont">
          <div className="login_form">
              <h1>Login</h1>
              <div className="input_lab">
                <input type="text" placeholder='' onChange={(e)=>setusername(e.target.value)}/>
                <label>Username <FaUser /></label>

              </div>
              <div className="input_lab">
                <input type="password" placeholder='' onChange={(e)=>setpassword(e.target.value)} />
                <label>Password <FaLock /></label>
                <button className='login_butt' onClick={login}>Login</button>
              </div>
                <p className='login_toggel' onClick={()=>{setisloggin(false)}}>Don't have an account?</p>
            </div>
        </div>
        ):(
        <div className="login_cont">
          <div className="login_form">
              <h1>Sign up</h1>
              <div className="input_lab">
                <input type="text" placeholder='' onChange={(e)=>setfullname(e.target.value)}/>
                <label>Full name <HiOutlineIdentification /></label>
              </div>
              <div className="input_lab">
                <input type="email" placeholder='' onChange={(e)=>setemail(e.target.value)}/>
                <label>Email <MdEmail /></label>
              </div>
              <div className="input_lab">
                <input type="text" placeholder='' onChange={(e)=>setusername(e.target.value)}/>
                <label>Username <FaUser /></label>
              </div>
              <div className="input_lab">
                <input type="password" placeholder='' onChange={(e)=>setpassword(e.target.value)}/>
                <label>Pasword <FaLock /></label>
                <button className='login_butt' onClick={signup}>Sign up</button>
              </div>
                <p className='login_toggel' onClick={()=>{setisloggin(true)}}>Already have an account?</p>
            </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Loginform
