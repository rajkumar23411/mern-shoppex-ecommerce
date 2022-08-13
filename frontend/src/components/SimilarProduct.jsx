import React from 'react'
import { useSelector } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from './loader';
import SingleSimilarProduct from './SingleSimilarProduct';
import "../App.css";
import { NextBtn, PreviousBtn } from "./Banner";
const SimilarProduct = () => {
    const {products, loading} = useSelector(state => state.products);
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
  return (
    <div className='similarProduct'>
      <div>
        <h3>Similar Products</h3>
        <small>Based on selected category</small>
      </div>
      {
        loading ? <Loader /> : (
         <Slider  {...settings}>
            {
              products && products.map((product)=> (
                <SingleSimilarProduct product={product} key={product._id} />
              ))
            }
         </Slider>
        )
      }
    </div>
  )
}

export default SimilarProduct;