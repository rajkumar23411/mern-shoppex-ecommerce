import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "../App.css";
import { addToWishList, removeFromWishlist } from "../redux/actions/wishListAction";
import { useDispatch, useSelector } from "react-redux";
import { addToCartItems } from "../redux/actions/cartAction";
import { getDiscount } from "../functions";
import { useSnackbar } from "notistack";

const SingleProuct = ({ product }) => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {wishlistItems} = useSelector(state => state.wishlist);
    const itemInWishList = wishlistItems.find((i) => i.product === product._id);
    
    const addToWishListHandler = () => {
      if(itemInWishList){
        dispatch(removeFromWishlist(product._id));
        enqueueSnackbar("Removed from wishlist", {variant: "success"});

      }else{
        dispatch(addToWishList(product._id));
        enqueueSnackbar("Added to wishlist", {variant:"success"});
      }
    }
    
    const addToCartHandler = () =>{
      if(product.stock === 0){
        enqueueSnackbar("Currently Out of Stock", {variant:"warning"});
        return;
      }
      dispatch(addToCartItems(product._id, 1));
      enqueueSnackbar("Product added to cart", {variant:"success"});
    }
  const options = {
    value: product && product.ratings,
    size: "large",
    precision: 0.5,
    readOnly: true,
  };

  return (
    
      <div className="productCard">
        <Link to={`/product/${product._id}`}>
        <div className="product-img">
          <img src={product.images[0].url} alt="productimage" />
        </div>
        </Link>
        <div className="product-details">
        <Link to={`/product/${product._id}`}>
          <h3 className="productName">{product.name}</h3>
        </Link>
          <span className="addedBy">{product.description}</span>
          <div className="ratings">
            <Rating {...options} />
            <span>
              {" "}
              {product.numOfReviews === 0
                ? `No reviews yet`
                : `${product.numOfReviews} Review`}
            </span>
          </div>
          <div className="price-cart">
            <span className="price">
              <small className="originalPrice">₹{product.price.toLocaleString()}</small>
              <small className="cutPrice">₹{product.cutPrice.toLocaleString()}</small>
              <small className="cutPrice-discount">{getDiscount(product.price, product.cutPrice)}%&nbsp;off</small>
            </span>
            <button className="cartBtn" onClick={addToCartHandler}>
              <i class="fa-duotone fa-basket-shopping"></i>
            </button>
          </div>
        </div>
        <div className="wishlistIcon" onClick={addToWishListHandler}>
            <i className='fa-solid fa-heart' style={itemInWishList ? {"color":"red"} : {"color":"rgba(0,0,0,0.2)"}}></i>
        </div>
      </div>
  );
};
export default SingleProuct;
