import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyOrderCard from "../components/MyOrderCard";
import Navbar from "../components/Navbar";
import { clearErrors, myOrders } from "../redux/actions/orderAction";
import "../App.css";
import Loader from "../components/loader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
const MyOrder = () => {
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "success" });
      dispatch(clearErrors());
    }
    if (isAuthenticated === false) {
      navigate("/login");
    } else {
      dispatch(myOrders());
    }
  }, [error, dispatch, enqueueSnackbar, navigate, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          {
            orders && orders.length === 0 ? (
              <div className="no-orders">
                <img src="./marketplace-pana.svg" alt="marketplace" />
                <h2>oops! Seems like you have not ordered anything yet!</h2>
                <span>SHOP NOW</span>
              </div>
            ) : (
              <div className="all-orderd-products">
                <div className="header">
                  <h3>Your order history&nbsp;<span>{`(${orders && orders.length})`}</span></h3>

                </div>
                {
                  orders &&
                  orders.map((item, i) => <MyOrderCard item={item} key={i} />)
                }
              </div>
            )
          }
          <Footer />
        </>
      )}
    </>
  );
};

export default MyOrder;
