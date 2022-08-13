import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleFeaturedProduct from "./SingleFeaturedProduct";
import "../App.css";
import Loader from "./loader";
import { getProductsAdmin } from "../redux/actions/productActions";
import { NextBtn, PreviousBtn } from "./Banner";

const FeaturedProduct = () => {

  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <PreviousBtn />,
    nextArrow:<NextBtn />
  };
  useEffect(()=>{
    dispatch(getProductsAdmin());
  },[dispatch])
  
  return (
    <div className="featured">
      <div className="heading">
        <h3>Top Selling Products</h3>
        <p>Don't miss these</p>
      </div>
      <div className="featuredProducts">
        {loading ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {products &&
              products.map((product) => (
                product.stock <= 4 && 
                  <SingleFeaturedProduct product={product} key={product._id} />
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
