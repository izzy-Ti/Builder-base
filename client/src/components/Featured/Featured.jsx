import React from 'react'
import './featured.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaBuilding } from 'react-icons/fa'
import { MdCropSquare, MdAspectRatio, MdFullscreen } from 'react-icons/md';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Featured = () => {
    const [futured, setfutured] = useState([])
    const [build, setbuild] = useState()
    useEffect(()=>{
        const features = async () =>{
            const response = await axios.get('http://localhost:4000/building/view')
            setfutured(response.data)
        }
        features()
    },[])
  return (
    <div className='featured'>
      <h1 className='fea_title'>Featured Properties</h1>
      <p className='fea_desc'>Browse our top featured properties, selected for their quality and prime locations.</p>
      <div className="fea_cards">
        {
            futured.slice(0-3).map((future,index) =>{
                return (
                <div className='fea_card'>
                <img src={future.image} alt="" className='fea_img'/>
                <p className='fea_name'>{future.name}</p>
                <p className='fea_disc'>{future.discription}</p>
                <p className='fea_yr'><FaClock /> {future.built_year} year</p>
                <div className='flo_loc'>
                    <p className='fea_flo'><FaBuilding /> {future.floor} floor</p>
                    <p className='fea_loc'><FaMapMarkerAlt /> {future.location}</p>
                </div>
                </div>
            )})
        }
      </div>
    </div>
  )
}

export default Featured
