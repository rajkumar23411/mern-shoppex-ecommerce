import React from "react";
import "../App.css";
import CartProductBox from "../components/CartProductBox";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector(state => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.user);

  const subTotal = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  const shippingPrice = 50;

  let shippingDiscount = 0;
  if (subTotal > 1000) {
    shippingDiscount = -50;
  } else {
    shippingDiscount = 0;
  }

  const tax = (subTotal * 5) / 100;
  const Total = subTotal + shippingPrice + shippingDiscount + tax;

  const checkOutHandler = () => {
    isAuthenticated ? navigate("/shipping") : navigate("/login");
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Navbar />
          <div className="cartPage">
            <div className="heading">
              <h2>Your Cart {`(${cartItems.length})`}</h2>
            </div>
            <div className="cart-main">
              <div className="left">
                <div className="cartHeader">
                  <span>Product</span>
                  <span>Unit Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartProductBox key={item.product} item={item} />
                  ))}
              </div>
              <div className="right">
                <div className="heading" style={{"textAlign":"center"}}>
                  <h3>CART SUMMERY</h3>
                </div>
                <span className="priceBox">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span>₹{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="shipping">
                    <span>Estimate Shipping</span>
                    <span>₹{shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="discount">
                    <span>Shipping Disocunt</span>
                    <span>₹{shippingDiscount.toFixed(2)}</span>
                  </div>
                  <div className="tax">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="Total">
                    <span style={{ fontWeight: "bold" }}>Total</span>
                    <span>₹{Total.toLocaleString()}</span>
                  </div>
                  <button
                    className="buyNow"
                    onClick={checkOutHandler}
                    style={{ cursor: "pointer" }}
                  >
                    BUY NOW
                  </button>
                  <Link to="/products"><button className="continueShoppingBtn">Continue Shopping</button></Link>
                </span>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Cart;
