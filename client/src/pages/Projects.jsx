import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaBuilding } from 'react-icons/fa'
import {MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { FaMapMarkerAlt, FaClock,FaArrowDown, FaArrowUp  } from 'react-icons/fa';

const Projects = () => {
    const [futured, setfutured] = useState([])
    const [show, setshow] = useState(false)
    const [slice, setslice] = useState(``)
    useEffect(()=>{
        const features = async () =>{
            const response = await axios.get('http://localhost:4000/building/view')
            setfutured(response.data)
        }
        features()
    },[])
    const showall = () =>{
      setshow(s=> !s)
    }
    const showless =() =>{
      setshow(s=> !s)

    }
  return (
    <div>
    <div className='featured'>
      <h1 className='fea_title'>Projects Right Now</h1>
          <div className="fea_cards">
            {
              futured.map((future, index) => (
                <div className='fea_card' key={index}>
                  <img src={future.image} alt="" className='fea_img' />
                  <p className='fea_name'>{future.name}</p>
                  <p className='fea_disc'>{future.discription}</p>
                  <p className='fea_yr'><FaClock /> {future.built_year} year</p>
                  <div className='flo_loc'>
                    <p className='fea_flo'><FaBuilding /> {future.floor} floor</p>
                    <p className='fea_loc'><FaMapMarkerAlt /> {future.location}</p>
                  </div>
                </div>
              ))
            }
            </div>
            </div>
    </div>
  )
}

export default Projects
