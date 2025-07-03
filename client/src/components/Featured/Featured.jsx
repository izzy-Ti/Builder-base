import React from 'react'
import './featured.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaBuilding } from 'react-icons/fa'
import {MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { FaMapMarkerAlt, FaClock,FaArrowDown, FaArrowUp  } from 'react-icons/fa';

const Featured = () => {
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
    <div className='featured'>
      <h1 className='fea_title'>Featured Properties</h1>
      <p className='fea_desc'>Browse our top featured properties, selected for their quality and prime locations.</p>
      <div className="fea_cards">
      {
        (show ? futured : futured.slice(0, 3)).map((future, index) => (
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
      {!show ?(<button className='show_all' onClick={showless}>Show all <MdKeyboardArrowDown/></button>):(
          <button className='show_all' onClick={showall}>Show less <MdKeyboardArrowUp /></button>)
      }
    </div>
  )
}

export default Featured
