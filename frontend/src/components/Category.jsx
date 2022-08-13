import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
const Category = () => {
   const {keyword} = useParams();
   const dispatch = useDispatch();
   useEffect(()=>{
      dispatch(getProduct(keyword));
   }, [keyword, dispatch])
   const categories = [
      {
         img: "https://images.pexels.com/photos/5145180/pexels-photo-5145180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "SHOP SHIRTS",
         cat: "shirt"
      },
      {
         img: "https://images.pexels.com/photos/9558581/pexels-photo-9558581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "SHOP TSHIRTS",
         cat: "tshirt"
      },
      {
         img: "https://images.pexels.com/photos/12712954/pexels-photo-12712954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "SHOP JEANS",
         cat: "jeans"
      },
      {
         img: "https://images.pexels.com/photos/8047038/pexels-photo-8047038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "SHOP FOOTWEAR",
         cat: "shoe"
      }
   ]
   return (
      <section className="category">
         <div className="heading">
            <h3>Categories</h3>
            <p>Explore our top categories</p>
         </div>
         <div className="category-options">
               {
                 categories.map((item, i)=>(
                    <Link to={`/products/${item.cat}`} key={i} >
                      <div className="box">
                        <div className="category-image">
                           <img src={item.img} alt="category" />
                        </div>
                        <div className="title">
                           <span>{item.title}</span>
                        </div>
                     </div>
                    </Link>
                 ))
               }
         </div>
      </section>
   );
};

export default Category;