import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearErrors, getSingleOrder } from "../redux/actions/orderAction";
import Loader from "../components/loader.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useReactToPrint} from 'react-to-print';
import "../App.css";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import { formatDate } from "../functions";

const SingleOrder = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const componentRef = useRef();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.singleOrder);
  const { user } = useSelector((state) => state.user);

  let orderStatus;
  let color;
  let date = new Date();
  const shippingPrice = order && order.shippingPrice && (order.shippingPrice).toFixed(2);
  const grossTotal = order  && order.itemsPrice && (order.itemsPrice).toFixed(2);
  const tax = order && order.taxPrice && (order.taxPrice).toFixed(2);
  const grandTotal = order && order.totalPrice && (order.totalPrice).toFixed(2);

  if (order && order.orderStatus === "Delivered") {
    orderStatus = "Your order has been delivered";
    color = "#2ecc71";
  } else if (order && order.orderStatus === "Shipped") {
    orderStatus = "Your order has been shipped";
    color = "#f1c40f";
  } else {
    orderStatus = "Your order is being processing";
    color = "#3498db";
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }
    dispatch(getSingleOrder(id));
  }, [error, enqueueSnackbar, dispatch, id]);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="orderDetailsPage">
            <div className="section-1">
              <div>
                <div className="header">Delivery Address</div>
                <p>
                  <span className="userName">
                    {order && order.user && order.user.name}
                  </span>
                  <span className="shippingAddress">
                    {order && order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}`}
                  </span>
                  <span className="shippingDetails">{ order && order.shippingInfo && `${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}</span>
                    <span className="phoneNo">
                      <p>Contact No.:</p> {order && order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                </p>
              </div>
              <div>
                <div className="header">Order Details</div>
                {order && (
                  <>
                    <p className="orderID">
                      <span>Order ID</span>
                      <span style={{ color: "#3498db" }}>{order._id}</span>
                    </p>
                    <p className="orderDate">
                      <span>Ordered On</span>
                      <span> {formatDate(order.createdAt)}</span>
                    </p>
                  </>
                )}
                <p className="orderStatus">
                  <div style={{ background: `${color}` }}></div>
                  <div>{order && orderStatus}</div>
                </p>
              </div>
              <div>
                <div className="header">Payment Details</div>
                <div>
                  <p>
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "#19d16f" }}
                    ></i>
                    {order && order.paymentInfo && order.paymentInfo.status}
                  </p>
                </div>
                <div className="paidOn">
                  {order && order.paidAt && (
                    <p>Paid On: {order.paidAt.substring(0, 10)}</p>
                  )}
                </div>
                <div className="invoiceBtn">
                  <button onClick={handlePrint}>Download Invoice</button>
                </div>
              </div>
            </div>
            <div className="section-2">
              <h3>Ordered Items</h3>
              {order && order.orderItems &&
                order.orderItems.map((item, i) => (
                  <div className="orderItem" key={i}>
                    <div className="item-details">
                      <img
                        src={item.image}
                        alt="product"
                        className="item-image"
                      />
                      <p>
                        <span className="itemName">{item.name}</span>
                        <span className="itemQty">
                          <p>Quantity:</p> {item.quantity}
                        </span>
                        <span className="itemPrice">
                          <p>Price:</p>
                          <i className="fa-light fa-indian-rupee-sign"></i>
                          {item.price}
                        </span>
                      </p>
                    </div>
                    <div className="quantityPrice">
                      <span>{item.quantity} </span>
                      <span> x </span>
                      <span>₹{item.price.toFixed(2)}</span>
                      <span> = {order.itemsPrice && `₹${order.itemsPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                ))}
              <div className="price-details">
                <h2 className="header">Price Details</h2>
                <div>
                  <p>
                    <span>Subtotal</span>
                    <span>
                      ₹{order && order.itemsPrice && order.itemsPrice.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    <span>Shipping Price</span>
                    <span>
                      ₹ {order && order.shippingPrice && order.shippingPrice.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    <span>Shipping Discount</span>
                    <span>
                      {order && order.itemsPrice && order.itemsPrice >= 1000
                        ? "- ₹50.00"
                        : "₹50.00"}
                    </span>
                  </p>
                  <p>
                    <span>Tax</span>
                    <span>₹{order && order.taxPrice && order.taxPrice.toFixed(2)}</span>
                  </p>
                  <p className="total">
                    <span>Total</span>
                    <span>
                      ₹{order && order.totalPrice && order.totalPrice.toFixed(2)}
                    </span>
                  </p>
                  <p className="isPaid">
                    <i className="fa-solid fa-circle-check"></i>
                    Paid
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display:"none" }}>
          <div className="order-invoice" ref={componentRef}>
            <div className="invoice-content">
              <div className="invoice-header">
                <h3>INVOICE</h3>
                <p>
                  Jayanagar, Beltola, <br />
                  Ghy-22, AS, IN, 781022
                </p>
              </div>
              <div className="shipping-details">
                <div>
                  <p>
                    <span>Order ID:</span>
                    <span>{order && order._id}</span>
                  </p>
                  <p>
                    <span>Order Date:</span>
                    <span>{order && order.createdAt && order.createdAt.substring(0, 10)}</span>
                  </p>
                  <p>
                    <span>Invoice Date:</span>
                    <span>{date.toLocaleDateString()}</span>
                  </p>
                  <p>
                    <span>Order Status:</span>
                    <span style={{ color: `${color}`, fontWeight: "500" }}>
                      {order && order.orderStatus}
                    </span>
                  </p>
                </div>
                <div className="billing-details">
                  <h3>BILL TO</h3>
                  <p>
                    {user && user.name},<br />
                    {order &&
                      order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city},`}{" "}
                    <br />
                    {order &&
                      order.shippingInfo &&
                      `${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}{" "}
                    <br />
                    {user && `Email: ${user.email}`} <br />
                    {`Phone No: XXXXXXXXXX`}
                  </p>
                </div>
                <div>
                  <h3>SHIPPED TO</h3>
                  <p>
                    {user && user.name},<br />
                    {order &&
                      order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city},`}{" "}
                    <br />
                    {order &&
                      order.shippingInfo &&
                      `${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}{" "}
                    <br />
                    {user && `Email: ${user.email}`} <br />
                    {`Phone No: XXXXXXXXXX`}
                  </p>
                </div>
                <div></div>
              </div>
              <div className="invoice-table">
                <div className="heading">
                  <div>Product</div>
                  <div>Quantity</div>
                  <div>Unit Price</div>
                  <div>Gross Amount</div>
                </div>
                {order && order.orderItems && 
                    order.orderItems.map((item, i) => (
                      <div key={i} className="table-content">
                        <div>{item.name}</div>
                        <div>{item.quantity}</div>
                        <div><i className="fa-light fa-indian-rupee-sign"></i>{item.price.toFixed(2)}</div>
                        <div><i className="fa-light fa-indian-rupee-sign"></i>{`${(item.quantity * item.price).toFixed(2)}`}</div>
                      </div>
                    ))}
              </div>
              <div className="invoice-price-details">
                <div>
                <p>
                  <span>Gross Total:</span>
                  <span>₹{grossTotal}</span>
                </p>
                <p>
                  <span>Estimate Shipping: </span>
                  <span>₹{shippingPrice}</span>
                </p>
                <p>
                  <span>Shipping Discount:</span>
                  <span>- ₹{grossTotal >= 1000 ? "50.00" : "00.00"}</span>
                </p>
                <p>
                  <span>Tax</span>
                  <span>₹{tax}</span>
                </p>
                <p>
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </p>
                <div className="verifiedby">
                  <img src="/Rajkumar_signature.png" alt="signature" style={{width:"5rem"}} />
                  <span style={{fontSize: "13px", marginTop: "1rem", color:"#3498db"}}>Verified By</span>
                  <p>Rajkumar Kalita <small>Admin, Shoppex</small></p>
                </div>
                </div>
              </div>

              <div className="invoice-footer">
                <span>Thank you for Shipping with us!</span>
                <span>Happy Shopping!</span>
                <p>Shoppex.contact@gmail.com <br /> 9101121717 | 9101 121 717 MON-SUN (9AM to 5PM) </p>
              </div>
            </div>
          </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default SingleOrder;
