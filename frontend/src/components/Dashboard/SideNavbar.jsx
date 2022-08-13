import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/userAction";

const SideNavbar = () => {
          const dispatch = useDispatch();
          const {enqueueSnackbar} = useSnackbar();
          const navigate = useNavigate();
          const [productsTag, setProductsTag] = useState(false);
          const displayProductsSubTag = () =>{
                    setProductsTag(!productsTag);
          }
          function logoutUser() {
            dispatch(logOut());
            enqueueSnackbar("Logged out Successfully", {variant:"success"});
            navigate("/");
          }
  return (
    <>
      <div className="brandName"><Link to="/" style={{color: "unset"}}>Shoppex</Link></div>
      <ul>
        <Link to="/admin/dashboard" style={{color: "unset"}}>
          <li>
            <i className="fa-duotone fa-chart-simple"></i>
            <span>Dashboard</span>
          </li>
        </Link>
       <Link to="/admin/orders" style={{color: "unset"}}> 
          <li>
            <i className="fa-duotone fa-bucket"></i>
            <span>Orders</span>
          </li>
       </Link>
        <li className="products-tag" onClick={displayProductsSubTag}>
          <i className="fa-duotone fa-dice"></i>
          <span>Products</span>
        </li>
        <div
          className={
            productsTag ? "products-sub-tag active" : "products-sub-tag"
          }
        >
          <Link to="/admin/products" style={{color: "unset"}}>
            <span style={{color:"#fff"}}>
            <i className="fa-duotone fa-cubes-stacked"></i>All Products
            </span>
          </Link>
          <Link to="/admin/product/new" style={{color: "unset"}}>
          <span style={{color:"#fff"}}>
            <i className="fa-duotone fa-square-plus"></i> Create Products
          </span>
          </Link>
        </div>
        <Link to="/admin/users" style={{color: "unset"}}>
        <li>
        <i className="fa-duotone fa-users"></i>Users
        </li>
        </Link>
        <Link to="/admin/reviews" style={{color: "unset"}}>
        <li>
        <i className="fa-duotone fa-star-half-stroke"></i>Reviews
        </li>
        </Link>
        <li onClick={logoutUser}>
        <i className="fa-duotone fa-right-from-bracket"></i>Logout
        </li>
      </ul>
    </>
  );
};

export default SideNavbar;
