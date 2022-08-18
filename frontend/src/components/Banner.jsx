import React from "react";
import "../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export const PreviousBtn = ({ className, onClick }) => {
   return (
     <div className={className} onClick={onClick}>
       <ArrowBackIosIcon />
     </div>
   )
 }
 
 export const NextBtn = ({ className, onClick }) => {
   return (
     <div className={className} onClick={onClick}>
       <ArrowForwardIosIcon />
     </div>
   )
 }
const Banner = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 3000
   };
   const banner = [
      {
         img: "/banner-1.jpg",
         i: "The lastest gear from",
         h3: "The mens' store",
         span: "Browse collection"
      },
      {
         img: "/banner-2.jpg",
         i: "Buy 4, Get 2 Free",
         h3: "Grab Your favourite product now..",
         span: "Grab Now"
      },
      {
         img: "/banner-3.jpg",
         i: "The lastest gear from",
         h3: "The mens' store",
         span: "Browse collection"
      },
   ]
   return (
      <div className="banners">
         <Slider {...settings}>
            {
               banner.map((b, i) => (
                  <div className="banner" key={i}>
                     <img src={b.img} alt="banner" />
                     <div className="banner-content">
                        <p>{b.i}</p>
                        <h3>{b.h3}</h3>
                        <span>{b.span}</span>
                     </div>
                  </div>
               ))
            }
         </Slider>
      </div>
   );
};

export default Banner;
