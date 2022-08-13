import axios from "axios";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishListConstant";

export const addToWishList = (id) => async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/product/${id}`);

    dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            ratings: data.product.ratings,
            numOfReviews: data.product.numOfReviews,
          },
    })

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems))
}


export const removeFromWishlist = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id
    })

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems))
}