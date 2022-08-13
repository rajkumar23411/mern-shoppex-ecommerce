import React from 'react'
import { Link } from 'react-router-dom'

const Offer = () => {
  return (
    <div className='offer-box'>
        <div>
            <img src="/Free-shipping-pana.svg" alt="special offer" />
        </div>
        <div>
           <span>
                <h1>Free shipping on ordered over ₹1000</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ut, tenetur vitae architecto delectus perferendis nostrum iure explicabo mollitia, ex non consequuntur itaque quasi similique possimus eveniet corporis dolores! Iste!</p>
           </span>
            <Link to="/products"><span>SHOP NOW</span></Link>
        </div>
    </div>
  )
}

export default Offer