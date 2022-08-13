import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const EmptyCart = () => {
  return (
    <>
    <Navbar />
      <div className="emptyCart">
      <img src="/Empty-bro.svg" alt="empty box" />
      <h2>Your cart is empty</h2>
      <Link to="/products">
        <button className="continueShoppingBtn">SHOP NOW</button>
      </Link>
    </div>
    <Footer />
    </>
  );
};

export default EmptyCart;
