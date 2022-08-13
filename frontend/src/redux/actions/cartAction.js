import { ADD_TO_CART, CLEAR_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";
import axios from "axios";

// add to cart item
export const addToCartItems = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove item from cart
export const removeCartItem = (id) => async (dispatch, getState) =>{
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//clear cart 
export const clearCart = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_CART });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// save shipping info 
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
}