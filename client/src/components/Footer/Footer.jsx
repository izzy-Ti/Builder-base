import React from 'react'
import './footer.css'
import logow from '../../assets/logow.png'
import { Link } from 'react-router-dom'
import { FaBuilding } from 'react-icons/fa'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer_up">
            <div className="footer_left">
                <img src={logow} alt="" className='footer_logo'/>
                <p>Turning properties into possibilities, one key at a time.</p>
            </div>
            <div className="footer_middel">
                <Link to='/'>Home</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/news' >News & Updates</Link>
                <Link to='/about' >About</Link>
            </div>
            <div className="footer_right">
                <p>Reach us</p>
                <p><FaMapMarkerAlt /> Bole, Addis ababa, Ethiopia</p>
                <p><FaPhone /> +2519 192939294</p>
                <p><FaEnvelope /> Builderbase@gmail.com</p>
            </div>
        </div>
        <hr />
        <div className="footer_up">
            <p>&copy; 2025 | Builderbase Alright reserved | Developed by Izzy</p>
        </div>
    </div>
  )
}

export default Footer
