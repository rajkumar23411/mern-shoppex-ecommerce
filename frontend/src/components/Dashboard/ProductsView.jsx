import React from "react";
import SideNavbar from "./SideNavbar";
import ProductStatistics from "./ProductStatistics.jsx";
const ProductList = () => {
  return (
    <div className="dashboard .product-statistics">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <div className="header" style={{"fontWeight":"600","padding":"1rem 0 0 1rem", "textTransform":"uppercase"}}>All Products
        </div>
        <ProductStatistics />
      </div>
    </div>
  );
};

export default ProductList;
