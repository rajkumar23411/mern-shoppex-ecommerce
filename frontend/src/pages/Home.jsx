import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";
import FeaturedProduct from "../components/FeaturedProduct";
import NewArrivals from "../components/NewArrivals";
import Specification from "../components/Specification";
import Offer from "../components/Offer";
import RecentOrder from "../components/recentOrder";
const Home = () => {
   return (
      <div>
         <Navbar />
         <Banner />
         <Category />
         <Specification />
         <RecentOrder />
         <FeaturedProduct />
         <Offer />
         <NewArrivals />
         <Footer />
      </div>
   );
};

export default Home;
