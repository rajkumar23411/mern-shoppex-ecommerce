import React, { useEffect } from "react";
import "../../Dashboard.css";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAdmin } from "../../redux/actions/productActions";
import { getAllOrders } from "../../redux/actions/orderAction";
import { allUser } from "../../redux/actions/userAction";
import MainData from "../../components/Dashboard/MainData";
const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector(state => state.allUsers);

  useEffect(() => {
    dispatch(getProductsAdmin());
    dispatch(getAllOrders());
    dispatch(allUser());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <MainData products={products} orders={orders} users={users} />
      </div>
    </div>
  );
};

export default AdminDashboard;