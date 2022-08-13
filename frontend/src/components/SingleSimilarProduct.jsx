import { useSnackbar } from 'notistack';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDiscount } from '../functions';
import { addToWishList, removeFromWishlist } from '../redux/actions/wishListAction';

const SingleSimilarProduct = ({product}) => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {wishlistItems} = useSelector(state => state.wishlist);
    
    const itemInWishList = wishlistItems.find((i)=> i.product === product._id);
    const addToWishListHandler = () => {
      if(itemInWishList){
        dispatch(removeFromWishlist(product._id));
        enqueueSnackbar("Removed from wishlist", {variant:"success"});
      }else{
        dispatch(addToWishList(product._id));
        enqueueSnackbar("Added to your wishlist", {variant:"success"});
      }
  }
  return (
    <>
      <div className='similarProductCard'>
      <Link to={`/product/${product._id}`}>
        <div className="product-image">
                    <img src={product.images[0].url} alt="product preview" />
          </div>
      
          <div className="similar-product-details">
            <span className='productName'>{product.name}</span>
            {/* <span className='productDsc'>{product.description.substring(0, 60)}...</span> */}
            <div className="product-rating">
              <div><span>{product && product.ratings}</span> <i className="fa-solid fa-star"></i></div>
              <div>{`(${product.numOfReviews})`}</div>
            </div>
            <div className='productPrice'>
                <span className='originalPrice'>₹{product.price}</span>
                <small className="cutPrice">₹{product.cutPrice}</small>
                <small className="cutPrice-discount">{getDiscount(product.price, product.cutPrice)}%&nbsp;off</small>
            </div>
          </div>
        </Link>
          <div className="wishlistIcon" onClick={addToWishListHandler}>
          <i className='fa-solid fa-heart' style={itemInWishList ? {"color":"red"} : {"color":"rgba(0,0,0,0.2)"}}></i>
      </div>
    </div>
  </>
  )
}

export default SingleSimilarProduct