import React from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const OrderSuccessfull = () => {
  return (
    <>
    <Navbar />
      <div className="orderSuccessPage">
        <div className="success-box">
          <img src="/checkMark.gif" alt="check mark" />
          <h3>Your order is completed!</h3>
          <p>Thank you for choosing us. Your order is being processed and will be delievred within 3-6 working days.</p>
          <Link to="/orders"><button>View Orders</button></Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccessfull;
