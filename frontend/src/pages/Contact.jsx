import React from 'react'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-us-page">
        <div className="page-heading"><h3>Contact Us</h3></div>
        <div className="top">
          <div className="left">
            <h3>Infomation About us</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. saepe illum maiores quas ipsa odit delectus, nisi explicabo nulla. Ex inventore a numquam, quam placeat ut dolore.</p>
            <span>
              <div style={{"background":"#5726DF"}}></div>
              <div style={{"background":"#FB2E86"}}></div>
              <div style={{"background":"#FFB265"}}></div>
            </span>
          </div>
          <div className="right">
            <h3>Contact Way</h3>
            <div>
            <ul>
              <p>
                <li style={{"background":"#5726DF"}}></li>
                <li>Tel: 910-1121-717 <br /> Email: shoppex.contact@gmail.com</li>
              </p>
              <p>
                <li style={{"background":"#FB2E86"}}></li>
                <li>Support Forum <br /> For Over 24hr</li>
              </p>
            </ul>
            <ul>
              <p>
                <li style={{"background":"#FFB265"}}></li>
                <li>20 Margaret st, London <br />Great britain, 3NM98-LK</li>
              </p>
              <p>
                <li style={{"background":" #1BE982"}}></li>
                <li>Free standard shipping <br />On order over Rs.1000</li>
              </p>
            </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <h3>Get In Touch</h3>
            <form>
              <div className="same-row">
                <div className="input-div">
                  <input type="text" placeholder='Your Name*'/>
                </div>
                <div className="input-div">
                  <input type="email" placeholder='Your Email*'/>
                </div>
              </div>
              <div className="input-div">
                <input type="text" placeholder='Subject*'/>
              </div>
              <textarea cols="30" rows="10" placeholder='Type Your Message*'></textarea>
              <button>Send Mail</button>
            </form>
          </div>
          <div className="right">
            <img src="./contact-us-pana.svg" alt="contact us" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Contact