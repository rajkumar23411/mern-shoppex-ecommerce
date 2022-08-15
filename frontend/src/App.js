import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import SingleProductPage from "./pages/SingleProductPage";
import MyAccount from "./pages/MyAccount";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import ProtectedRoutes from "./protectedRoutes";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import axios from "axios";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccessfull from "./pages/OrderSuccessfull";
import MyOrder from "./pages/MyOrder";
import SingleOrder from "./pages/SingleOrder";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProductsView from "./components/Dashboard/ProductsView";
import NewProduct from "./pages/Dashboard/NewProduct";
import UpdateProduct from "./pages/Dashboard/UpdateProduct";
import AllOrders from "./pages/Dashboard/AllOrders";
import UpdateOrderStatus from "./pages/Dashboard/UpdateOrderStatus";
import UserList from "./pages/Dashboard/UserList";
import UpdateUserRole from "./pages/Dashboard/UpdateUserRole";
import ProductReviews from "./pages/Dashboard/ProductReviews";
import LostPage from "./pages/404";
import WishList from "./pages/WishList";
import AllProductsList from "./pages/Dashboard/AllProductsList";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState(null);
  const {pathname} = useLocation();
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/sendApiKey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" exact element={<SingleProductPage />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/my_account" element={<ProtectedRoutes> <MyAccount /> </ProtectedRoutes>} />
      <Route path="/me/update" element={<ProtectedRoutes><UpdateProfile /></ProtectedRoutes>} />
      <Route path="/update/password" element={<ProtectedRoutes><UpdatePassword /></ProtectedRoutes>} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<ProtectedRoutes><Shipping /></ProtectedRoutes>}/>
      <Route path="/order/confirm" exact element={<ProtectedRoutes><ConfirmOrder /></ProtectedRoutes>}/>
      <Route path="/process/payment" exact element={<ProtectedRoutes>{stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>)}</ProtectedRoutes>}/>
      <Route path="/order/success" element={<ProtectedRoutes><OrderSuccessfull /></ProtectedRoutes>}/>
      <Route path="/orders" element={<ProtectedRoutes> <MyOrder /> </ProtectedRoutes>} />
      <Route path="/order/:id" element={<ProtectedRoutes> <SingleOrder /> </ProtectedRoutes>} />
      <Route path="/wishlist" element={<ProtectedRoutes> <WishList /> </ProtectedRoutes>} />
      <Route path="/admin/dashboard" element={<ProtectedRoutes isAdmin={true}> <AdminDashboard /> </ProtectedRoutes>} />
      <Route path="/admin/products" element={<ProtectedRoutes isAdmin={true}><ProductsView /></ProtectedRoutes>} />
      <Route path="/admin/all/products" element={<ProtectedRoutes isAdmin={true}><AllProductsList/> </ProtectedRoutes>} />
      <Route path="/admin/product/new" element={<ProtectedRoutes isAdmin={true}><NewProduct/></ProtectedRoutes>}  />
      <Route path="/admin/products/:id" element={<ProtectedRoutes isAdmin={true}><UpdateProduct/></ProtectedRoutes>}  />
      <Route path="/admin/orders" element={<ProtectedRoutes isAdmin={true}> <AllOrders /> </ProtectedRoutes>}  />
      <Route path="/admin/order/:id" element={<ProtectedRoutes isAdmin={true}><UpdateOrderStatus /></ProtectedRoutes>} />
      <Route path="/admin/users" element={<ProtectedRoutes isAdmin={true}><UserList /></ProtectedRoutes>} />
      <Route path="/admin/user/:id" element={<ProtectedRoutes isAdmin={true}><UpdateUserRole /></ProtectedRoutes>} />
      <Route path="/admin/reviews" element={<ProtectedRoutes isAdmin={true}><ProductReviews /></ProtectedRoutes>} />
      <Route path="*" element={<LostPage />} />
      </Routes>
    </>
  );
};

export default App;