import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import Loader from "../../components/loader";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../redux/actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstant";
import { useSnackbar } from "notistack";
const AllOrders = () => {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteOrderError, isDeleted } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Order deleted successfully", {variant:"success"});
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    if (deleteOrderError) {
      enqueueSnackbar(deleteOrderError);
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
  }, [isDeleted, enqueueSnackbar, navigate, deleteOrderError, dispatch, error]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="right">
            <div className="header" style={{ "fontWeight": "600", "padding": "1rem 0 2rem 1rem", "textTransform": "uppercase" }}>ALL ORDERS {orders.length}</div>
            <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Total Items</TableCell>
                  <TableCell>Grand Total</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  orders && orders.map((order, i)=>(
                    <TableRow key={i}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell style={order.orderStatus !== "Delivered" ? { color: "#d63031", "fontWeight":400 } : { color: "#2ecc71", "fontWeight":400 }}>{order.orderStatus}</TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell>Rs.{order.totalPrice}</TableCell>
                    <TableCell>{order.paymentInfo.status}</TableCell>
                    <TableCell>
                        <Link to={`/admin/order/${order._id}`}><i className="fa-duotone fa-pen-to-square"></i></Link>
                        <i className="fa-duotone fa-trash-can" onClick={() => deleteOrderHandler(order._id)}></i>
                    </TableCell>
                  </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default AllOrders;
