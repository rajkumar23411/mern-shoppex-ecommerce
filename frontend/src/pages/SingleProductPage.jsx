import React, { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from "../redux/actions/productActions";
import "../App.css";
import Loader from "../components/loader";
import ReviewCard from "../components/ReviewCard";
import { addToCartItems } from "../redux/actions/cartAction"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Rating } from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../redux/constants/productsContstant";
import SimilarProduct from "../components/SimilarProduct";
import { addToWishList, removeFromWishlist } from "../redux/actions/wishListAction";
import { getDiscount } from "../functions";
import { useSnackbar } from "notistack";

const SingleProductPage = () => {
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(state => state.newReview);
  const {cartItems} = useSelector(state => state.cart);
  const { wishlistItems } = useSelector(state => state.wishlist);

  const options = {
    value: product && product.ratings,
    size: "large",
    precision: 0.5,
    readOnly: true
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(" ");

  const increaseQty = () => {
    if (product.stock <= quantity) return enqueueSnackbar("Maximum Order Quantity", {variant:"warning"});
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const descreaseQty = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const itemInCart = cartItems.find((i)=> i.product === id);
  const addToCartHandler = () => {
    if(product.stock === 0){
      return enqueueSnackbar("Currently out of stock", {variant:"warning"})
    }
    dispatch(addToCartItems(id, quantity));
    enqueueSnackbar("Product added to cart", {variant:"success"});
  }
  const goToCart = () => {
    navigate("/cart");
  }
  const submitReviewToggle = () => {
    setOpen(!open);
  }
  const itemInWishList = wishlistItems.find((i) => i.product === product._id);
  const addToWishListHandler = () => {

    if (itemInWishList) {
      dispatch(removeFromWishlist(product._id));
      enqueueSnackbar("Removed from wishlist", {variant:"success"});
    } else {
      dispatch(addToWishList(product._id));
      enqueueSnackbar("Added to your wishlist", {variant:"success"});
    }
  }
  const reviewSubmitHandler = () => {

    if (rating === 0 || !comment.trim()) {
      return enqueueSnackbar("Empty a review & comment", {variant:"error"});
    }
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productID", id);

    dispatch(newReview(myForm));
    setOpen(false);
  }
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }

    if (reviewError) {
      enqueueSnackbar(reviewError, {variant:"warning"});
      dispatch(clearErrors());
    }

    if (success) {
      enqueueSnackbar("Review submitted", {variant:"success"});
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, enqueueSnackbar, reviewError, success]);

  const checkOutHandler = () => {
    if (product.stock === 0) {
      return enqueueSnackbar("Product currently out of Stock", {variant:"warning"});
    } else {
      addToCartHandler();
      isAuthenticated ? navigate("/shipping") : navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getSimilarProducts(product.category));
  }, [dispatch, product, product.category]);
  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetailsCard">
            <div className="productImage">
              <Carousel autoPlay="true" interval={2000} infiniteLoop="true" showStatus="false">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.url}
                      alt={`${i} slide`}
                      key={item.url}
                      className="carouselImage" />))}
              </Carousel>
              <div className="wishlistIcon" onClick={addToWishListHandler}>
                <i className='fa-solid fa-heart' style={itemInWishList ? { "color": "red" } : { "color": "rgba(0,0,0,0.2)" }}></i>
              </div>
              {
                product.stock === 0 && (
                  <div className="soldOut-block">
                    <p>Sold Out</p>
                  </div>
                )
              }
            </div>
            <div>
              <div className="productDetails">
                <div className="heading-block">{product && product.name}</div>
                <div className="desc-block">{product && product.description}</div>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="ratings">
                    <Rating {...options} />
                    <p>
                      (
                      {product.ratings && product.ratings === 0
                        ? `No ratings yet`
                        : `${product.numOfReviews} Rating${product.ratings === 1 ? "" : "s"
                        }`}
                      )
                    </p>
                  </div>
                )}
                <div className="add-review-btn" onClick={submitReviewToggle}>Add a review</div>
                <div className="specialPriceTag">Special Price</div>
                <div className="price-block">
                  <span className='originalPrice'>₹{product.price && product.price.toLocaleString()}</span>
                  <small className="cutPrice">₹{product.cutPrice}</small>
                  <small className="cutPrice-discount">{getDiscount(product.price, product.cutPrice)}%&nbsp;off</small>
                </div>
                <div className="bankOffer">
                  <p>Available Offers</p>
                  {
                    Array(3).fill("").map((i) => (
                      <p className="Offers" key={i}>
                        <i className="fa-duotone fa-tags"></i>
                        <span style={{color:"#000", "fontWeight":"600"}}>Bank offer</span>
                        15% Instant discount on first Shoppex Pay Later order of 500 and above <span style={{"color":"#3498db", "fontWeight":"600"}}>T&C</span>
                      </p>
                    ))
                  }
                </div>
                {
                  product.stock < 1 ? 
                  (
                    <div className="productStockRed stockStatus">
                      <i class="fa-duotone fa-circle-xmark"></i>
                      <span>Temporarily out of stock</span>
                    </div>
                  ):
                  (
                    <div className="productStockGreen stockStatus">
                    <i className="fa-duotone fa-arrow-trend-up"></i>
                    <span>Product in stock</span>
                  </div>
                  )
                }

                <div className="cart-block">
                  <div className="minus" onClick={descreaseQty}>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <div className="value">{quantity}</div>
                  <div className="plus" onClick={increaseQty}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
                <div className="add-to-cart-btn">
                  <button style={{ background: "#f39c12" }} onClick={checkOutHandler}><i className="fa-solid fa-bolt-lightning"></i>BUY NOW</button>
                  <button style={{ background: "#FB2E86" }} onClick={itemInCart ? goToCart : addToCartHandler}><i className="fa-solid fa-cart-shopping"></i>{itemInCart ? 'Go to cart' : 'Add to cart'}</button>
                </div>
              </div>
              <div className="productReview">
                <div className="header">
                  <div>
                    <h3>Customer Reviews & Ratings</h3>
                    {product.ratings === 0 && product.numOfReviews === 0
                      ? `` :
                      <div className="ratingReviewTag">
                        <p className="rating">{product && product.ratings}<i className="fa-solid fa-star"></i></p>
                        <p className="totalRating">{`(${product.numOfReviews} Reviews)`}</p>
                      </ div>
                    }
                  </div>
                  <div onClick={submitReviewToggle} className="rateProductBtn">RATE PRODUCT</div>
                </div>
                {product.reviews && product.reviews[0] ? (
                  <div className="allReviews">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ReviewCard review={review} key={review._id} />
                      ))}
                  </div>
                ) : (
                  <div className="no-review-rating">
                    <img src="/no-review.svg" alt="no review and rating" />
                    <h4>No ratings & reviews has been added yet!</h4>
                  </div>
                )}
              </div>
              <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle} className="dialog-box">
                <DialogTitle className="review-header">Submit Review</DialogTitle>
                <DialogTitle className="review-title">share your valuable review with us!</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" name="rating" />
                  <textarea className="reviewCommentArea" cols="40" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write here your valuable comment"></textarea>
                </DialogContent>
                <DialogActions className="dialog-btns">
                  <Button color="secondary" variant="outlined" onClick={submitReviewToggle}>Cancel</Button>
                  <Button color="primary" variant="outlined" onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </>
      )}
      <SimilarProduct />
      <Footer />
    </Fragment>
  );
};

export default SingleProductPage;