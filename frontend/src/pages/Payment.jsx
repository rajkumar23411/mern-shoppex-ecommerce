import React, { useEffect, useRef } from "react";
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutSteps from "../components/CheckoutSteps";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, createOrder } from "../redux/actions/orderAction";
import { clearCart } from "../redux/actions/cartAction";
import { useSnackbar } from "notistack";

const Payment = () => {
  const payBtn = useRef(null);
  const {enqueueSnackbar} = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const {error} = useSelector(state => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  
  const paymentData = {
    amount: Math.round(orderInfo.Total * 100), //stripe takes payment in form of paisa
  };
  
  const order = {
    shippingInfo:{
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.country,
      pinCode: shippingInfo.pincode,
      phoneNo: shippingInfo.phoneNo
    },
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingPrice,
    shippingDisocunt: orderInfo.shippingDiscount,
    totalPrice: orderInfo.Total,
  }

  const submitHandler = async (e) => {
    
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {headers: { "Content-Type": "application/json"}};

      const { data } = await axios.post("/api/process/payment", paymentData, config);

      const clientSecret = data.clientSecret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        enqueueSnackbar(result.error.message, {variant:"error"});
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          } ;
          dispatch(createOrder(order));
          dispatch(clearCart());
          navigate("/order/success");
        } else {
          enqueueSnackbar("There is issue while processing payment", {variant:"warning"});
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      enqueueSnackbar(err.response.data.message, {variant:"error"});
    }
  };

  useEffect(()=>{
    dispatch(clearErrors());
  },[error, dispatch, enqueueSnackbar])
  return (
    <>
      <CheckoutSteps activeSteps={2} />
      <div className="paymentPage">
        <div className="left">
          <img src="/credit-card-pana.svg" alt="credit card" />
          <h3>Pay your bills with stripe! now</h3>
          <span>Simple, fast and 100% Secure payment gateway.</span>
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="paymentForm"
        >
          <div className="amount">₹{orderInfo && orderInfo.Total}</div>
          <div className="header">
            <h4>Card Info</h4>
            <span>Enter your card details carefully</span>
          </div>
          <div className="input-div">
            <i className="fa-duotone fa-credit-card"></i>
            <CardNumberElement className="cardInput" />
          </div>
          <div className="same-row">
            <div className="input-div">
            <i class="fa-duotone fa-calendar-check"></i>
              <CardExpiryElement className="cardExpInput" />
            </div>
            <div className="input-div">
            <i className="fa-duotone fa-lock"></i>
              <CardCvcElement className="cardCVC" />
            </div>
          </div>
          <div className="payBtn">
            <button ref={payBtn}>Pay Now</button>
          </div>
        </form>
        <span></span>
      </div>
    </>
  );
};

export default Payment;
