import React from 'react'
import Navbar from '../components/Navbar'
import "../App.css"
const About = () => {
  return (
    <>
      <Navbar />
      <div className='about-us-page'>
        <div className="page-heading"><h3>About the developer</h3></div>
        <div className="about-me">
          <div className="img-div">
            <img src="./blank-user.png" alt="me" className='me' />
          </div>
          <div className="about-para">
            <h4>Hey there! <span>I’m Rajkumar</span>, nice to meet you. Thank you for visiting the protal.</h4>
            <p>This is a demo of my final semester project, where i have taken utmost care of privacy & authorization & on buliding a clean UI for users out there.</p>
          </div>
          <div className="feedback-para">
            <h4>Click here <a href="mailto:itzraj005@gmail.com"><i className="fa-solid fa-envelope"></i></a> share your valuable feedback.</h4>
          </div>
          <div className="socail-icon">
              <a href="https://www.instagram.com/__raaaaaaj/"><i className="fa-brands fa-instagram" style={{ color: "#833AB4" }}></i></a>
              <a href="https://www.facebook.com/razkumar.kalita"><i className="fa-brands fa-facebook" style={{ color: "#4267B2" }}></i></a>
              <a href="https://github.com/rajkumar23411"><i className="fa-brands fa-github" style={{ "color": "#171515" }}></i></a>
              <a href="https://wa.me/9101121717"><i className="fa-brands fa-whatsapp" style={{ color: "#25D366" }}></i></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;