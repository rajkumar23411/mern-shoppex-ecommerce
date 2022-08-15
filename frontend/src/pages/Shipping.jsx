import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../redux/actions/cartAction";
import { State } from "country-state-city";
import Navbar from "../components/Navbar.jsx";
import "../App.css";
import CartSummery from "../components/CartSummery";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import PaymentDetails from "../components/PaymentDetails";
import { useSnackbar } from "notistack";
const Shipping = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  // eslint-disable-next-line
  const [country, setCountry] = useState('IN');
  const [state, setState] = useState(shippingInfo.state);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

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

  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    if (address.length <= 0) {
      return enqueueSnackbar("Shipping addres is required", { variant: "warning" });
    }
    if (city.length <= 0) {
      return enqueueSnackbar("Shipping address is required", { variant: "warning" });
    }
    if (state.length <= 0) {
      return enqueueSnackbar("Select your city", { variant: "warning" });
    }
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      return enqueueSnackbar("Phone no. should be 10 digits", { variant: "warning" });
    }

    dispatch(
      saveShippingInfo({ address, city, country, state, phoneNo, pincode })
    );

    navigate("/order/confirm");
  };
  return (
    <>
      <Navbar />
      <div className="shippingPage">
        <CheckoutSteps activeSteps={0} />
        <div className="main">
          <div className="shipping-form">
            <form encType="multipart/form-data" onSubmit={shippingSubmitHandler} className="shippingForm">
              <div className="heading">
                Shipping Address
              </div>
              <div className="form-options">
                <div className="input-div">
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label>Address*</label>
                </div>
                <div className="input-div">
                  <input
                    required
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <label>City*</label>
                </div>

                <div className="input-div">
                  <input
                    required
                    type="number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    maxLength="10"
                  />
                  <label>Contact No.*</label>
                </div>
                <div className="input-div">
                  <input
                    required
                    type="number"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength="6"
                  />
                  <label>Pin Code*</label>
                </div>

                <div className="same-row">
                  <div className="input-select">
                    <label>Country*</label>
                    <select name="country" defaultValue={country} disabled>
                      <option value={'IN'}>India</option>
                    </select>
                  </div>
                  <div className="input-select">
                    <label>State*</label>
                    <select name="state" value={state} onChange={e=> setState(e.target.value)} required>
                        <option value="">select state</option>
                        {
                          State.getStatesOfCountry("IN").map((s)=>(
                            <option value={s.isoCode} key={s.isoCode}>
                              {s.name}
                            </option>
                          ))
                        }
                    </select>
                  </div>
                </div>
                <button disabled={state ? false : true}>Continue</button>
              </div>
            </form>
          </div>
          <div className="orderSummery">
            <div className="heading-section">
              <h4>Order Summary</h4>
              <Link to="/cart">
                <small>Edit cart</small>
              </Link>
            </div>
            <div className="itemsSection">
              {cartItems &&
                cartItems.map((item) => (
                  <CartSummery item={item} key={item.product} />
                ))}
            </div>
            {
              cartItems &&
              <PaymentDetails subTotal={subTotal} shippingPrice={shippingPrice} shippingDiscount={shippingDiscount} tax={tax} total={Total} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
