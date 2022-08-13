import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  reviewReducer,
  newProductReducer,
  deleteProductReducer,
  updateProductReducer,
  productReviewReducer,
  deleteReviewReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  deleteUserReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, getOrderReducer, myOrderReducer, newOrderReducer, orderReducer } from "./reducers/orderReducer";
import { wishListReducer } from "./reducers/wishListReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  singleOrder: getOrderReducer,
  newReview: reviewReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  deleteUser: deleteUserReducer,
  userDetails: userDetailsReducer,
  allReviews: productReviewReducer,
  deleteReview: deleteReviewReducer,
  wishlist: wishListReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {}
  },
};
const middlwWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlwWare))
);

export default store;