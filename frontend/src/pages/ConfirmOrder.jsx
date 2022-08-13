import React from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import CartSummery from "../components/CartSummery";
import { useNavigate } from "react-router";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
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

  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingPrice,
      shippingDiscount,
      tax,
      Total,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment");
  };
  return (
    <>
      <Navbar />
      <CheckoutSteps activeSteps={1} />
      <div className="confirmOrderPage">
        <div className="left">
          <div>
            <div className="header">
              <h3>Shipping Info</h3>
            </div>
            <div className="shippingInfo">
              <p>
                <span>Name: </span>
                <span>{user.name}</span>
              </p>
              <p>
                <span>Email: </span>
                <span>{user.email}</span>
              </p>
              <p>
                <span>Phone: </span>
                <span>{shippingInfo.phoneNo}</span>
              </p>
              <p>
                <span>Pin Code: </span>
                <span>{shippingInfo.pincode}</span>
              </p>
              <p>
                <span>Address: </span>
                <span>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`}</span>
              </p>
            </div>
            <div className="cartProducts">
              <div className="header">
                <h3>Your Cart Items</h3>
                <p>{cartItems.length}</p>
              </div>
              <div className="cartItem" style={{ width: "350px" }}>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartSummery item={item} key={item.product} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="details">
            <div className="header">
              <h3>Order Summary</h3>
            </div>
            <div className="paymentDetails">
              <p>
                <span>Subtotal</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </p>
              <p>
                <span>Eastimate Shipping</span>
                <span>₹{shippingPrice.toFixed(2)}</span>
              </p>
              <p>
                <span>Shipping Discount</span>
                <span>{shippingDiscount.toFixed(2)}</span>
              </p>
              <p>
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </p>
            </div>
            <p className="total">
              <span>Total</span>
              <span>₹{Total.toLocaleString()}</span>
            </p>
            <div className="paymentBtn">
              <button onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
