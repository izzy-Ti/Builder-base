import React from 'react'
import { background } from '../../assets/assets'
import { useState, useEffect } from 'react'
import './hero.css'

const Hero = () => {

      const [index, setindex] = useState(0)
      useEffect(() =>{
        const interval = setInterval(() =>{
          setindex(i => (i + 1) % background.length)
        },7000)
        return () => clearInterval(interval);
      },[])

  return (
    <div style={{backgroundImage: `url(${background[index]})`}} className='hero_img'>
        <div className="hero_components">
            <h1><span>Find</span> Your Dream Home <br />with Confidence</h1>
            <h3>Explore top listings, trusted agents, and properties tailored <br /> to your lifestyle.</h3>
        </div>
    </div>
  )
}

export default Hero
