import React from 'react'
import "../App.css"
const Specification = () => {
  return (
    <div className='specifications'>
        <h3>What Shoppex Offer!</h3>
        <div className="boxes">
        <div>
        <i className="fa-duotone fa-truck-fast" style={{"color": "#1abc9c"}}></i>
        <span>
        <h3>Free Shipping</h3>
        <small>Ordered Over ₹1000</small>
        </span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis hic accusamus repellendus</p>
        </div>
        <div>
          
        <i className="fa-duotone fa-shield-halved" style={{"color": "#2ecc71"}}></i>
        <span>
        <h3>Secure Payment</h3>
        <small>100% Secure Payment</small>
        </span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis hic accusamus repellendus</p>
        </div>
        <div>
        <i className="fa-duotone fa-person-walking-arrow-loop-left" style={{"color": "#f1c40f"}}></i>
        <span>
        <h3>Easy Return</h3>
        <small>10 Days Return Period</small>
        </span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis hic accusamus repellendus</p>
        </div>
        <div>
        <i className="fa-duotone fa-headphones-simple" style={{"color": "#81ecec"}}></i>
        <span>
          <h3>24/7 Support</h3>
          <small>Call Us anytime</small>
        </span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis hic accusamus repellendus</p>
        </div>
        </div>
    </div>
  )
}

export default Specification