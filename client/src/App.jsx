import { useState } from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import News from './pages/News'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './pages/Login'
import Admin from './pages/Admin.jsx'
import Footer from './components/Footer/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'




function App() {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/projects' element= {<Projects />} />
        <Route path='/about' element= {<About />} />
        <Route path='/news' element= {<News />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/admin' element = {<Admin />} />
        <Route path='/dashboard' element = {<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
