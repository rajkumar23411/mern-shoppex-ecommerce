import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";
import { getDiscount } from '../functions';

const SingleFeaturedProduct = ({product}) => {
  const options = {
    value: product && product.ratings,
    size: "small",
    precision: 0.5,
    readOnly: true,
  };
  return (
  <Link to={`/product/${product._id}`}>
      <div className='featuredProductCard'>
          <div className="product-image">
                    <img src={product.images[0].url} alt="product preview" />
          </div>
          <div className="featured-product-details">
            <div className='productName'>{product.name && product.name.length > 70 ? `${product.name.substring(0, 70)}...` : product.name}</div>
            <div className='productDsc'>{product.description.substring(0, 70)}...</div>
            <div className='ratings'><Rating {...options} /> ({product.numOfReviews})</div>
            <div className='productPrice'>
                <span className='originalPrice'>₹{product.price}</span>
                <small className="cutPrice">₹{product.cutPrice}</small>
                <small className="cutPrice-discount">{getDiscount(product.price, product.cutPrice)}%&nbsp;off</small>
            </div>
          </div>
    </div>
  </Link>
  )
}

export default SingleFeaturedProduct