import { useSnackbar } from 'notistack';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "../App.css"
import { removeFromWishlist } from '../redux/actions/wishListAction'
const SingleWishListItem = ({item}) => {

  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
    enqueueSnackbar("Product removed from wishlist", {variant:"success"});
  }
  return (
    <div className='wishListItem'>
        <div>
        <div className="item-image">
            <img src={item.image} alt={item.image} />
        </div>
        <div className="item-details">
            <div className='itemName'>{item.name}</div>
            <div className='rating-review'>
                <small>{item.ratings} <i class="fa-solid fa-star"></i></small>
                <small>{ item.numOfRatings !== 0 && `(${item.numOfReviews})`}</small>
            </div>
            <div className='itemPrice'>₹{item.price}</div>
        </div>
        </div>
        <div>
          <i className="fa-duotone fa-trash" onClick={() => removeFromWishlistHandler(item.product)}></i>
          <Link to={`/product/${item.product}`}><span>Checkout Now</span></Link>
        </div>
    </div>
  )
}

export default SingleWishListItem