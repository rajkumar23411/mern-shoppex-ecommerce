import React from "react";
import { Link } from "react-router-dom";
import "../App.css"
import { formatDate } from "../functions";
const MyOrderCard = ({ item }) => {
  return (
    <div className="myOrderCard">
      {item &&
        item.orderItems.map((orderItem, i) => (
          <Link to={`/order/${item._id}`} key={i}>
            <div className="orderProducts">
              <div>
                <div className="productImage">
                  <img src={orderItem.image} alt="product" />
                </div>
                <div className="productDesc">
                  <span className="productName">{orderItem.name}</span>
                  <span className="itemPrice">₹{orderItem.price}</span>
                  <span className="productQty"><p>Quantity: </p>{orderItem.quantity}</span>
                </div>
              </div>
              <div className="totalPrice">
                <span>{orderItem.quantity}</span>
                <span>x</span>
                <span>₹{orderItem.price}</span>
                <span>=</span>
                <span>₹{item.itemsPrice}</span>
              </div>
              <div>
                <span className="orderId">
                  <p>Order ID: </p>
                  <p>{item._id}</p>
                </span>
                <span className="orderDate"><span>Ordered on </span>{formatDate(item.createdAt)}</span>
                <span className="orderStatus">
                  <p className="dot"></p>
                  <p className="status">{`Your order is being ${item.orderStatus}`}</p>
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MyOrderCard;
