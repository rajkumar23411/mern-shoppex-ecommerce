import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import Loader from "./loader";
import SingleNewArrivedProduct from "./SingleNewArrivedProduct";
import { getProductsAdmin } from "../redux/actions/productActions";
import { NextBtn, PreviousBtn } from "./Banner";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PreviousBtn />,
    nextArrow:<NextBtn />
  };
  useEffect(()=>{
    dispatch(getProductsAdmin());
  },[dispatch])
  return (
    <div className='new-arrivals'>
      <div className="heading">
        <h3>Newly Arrived</h3>
        <p>Products that are recently added</p>
      </div>
      <div className="featuredProducts">
        {loading ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {products &&
              products.reverse().slice(0, 10).map((product) => (
                <SingleNewArrivedProduct product={product} key={product._id} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  )
}

export default NewArrivals