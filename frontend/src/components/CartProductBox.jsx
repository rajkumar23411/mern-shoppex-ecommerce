import React from "react";
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import "../App.css";
import { addToCartItems, removeCartItem } from "../redux/actions/cartAction";
const CartProductBox = ({ item }) => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar()
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCartItems(id, newQty));
  };

  const decreaseQty = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addToCartItems(id, newQty));
  };
  const deleteCartItems = (id) => {
    dispatch(removeCartItem(id));
    enqueueSnackbar("Product revmoved from cart", {variant: "success"});
  };
  return (
    <div className="cart-product-box">
      <div className="cartBody">
        <div className="product-img-info">
          <div>
            <img src={item.image} alt="cartProduct" />
            <div onClick={() => deleteCartItems(item.product)} className="removeCartProductBtn">&times;</div>
          </div>
          <div>
            <span className="productName">{item.name}</span>
            <span className="productId">{item.product}</span>
            <span className="productQty">{item.quantity}</span>
            <span className="productSize">size</span>
          </div>
        </div>
        <div className="product-price">₹{item.price}</div>
        <div className="add-remove-qty">
          <span onClick={() => decreaseQty(item.product, item.quantity, item.stock)} className="qtyBtn"> <img src="/arrow-down.svg" alt="arrow down" className="arrows"/> </span>
          <span className="totalQty">{item.quantity}</span>
          <span onClick={() => increaseQty(item.product, item.quantity, item.stock)} className="qtyBtn"> <img src="/arrow-up.svg" alt="arrow up" className="arrows"/> </span>
        </div>
        <div className="total-price">₹{item.quantity * item.price}</div>
      </div>
    </div>
  );
};

export default CartProductBox;