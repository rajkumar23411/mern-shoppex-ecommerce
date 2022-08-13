import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import "../App.css"
import { Link } from 'react-router-dom'
const LostPage = () => {
  return (
    <>
        <Navbar />
        <div className='lost-page'>
            <img src="/lost404.gif" alt="404" />
            <h3>oops! The page you requested was not found! <span role="img">😥</span></h3>
            <Link to="/"><span>Back To Home</span></Link>
        </div>
        <Footer />
    </>
  )
}

export default LostPage