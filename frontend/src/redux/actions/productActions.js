import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productsContstant";

export const getProduct = (keyword = " ", currentPage = 1, rating = 0, category, price=[0, 8000]) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      
      let Link = `/api/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      
      if(category){
        Link = `/api/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      const { data } = await axios.get(Link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  //get products of similar category
  export const getSimilarProducts = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await axios.get(`/api/products?category=${category}`);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
// get all products admin 
export const getProductsAdmin = () => async (dispatch) => {
  try{
    dispatch({type: ADMIN_PRODUCT_REQUEST})

    const {data} = await axios.get("/api/admin/products");

    dispatch({type: ADMIN_PRODUCT_SUCCESS, payload: data.products});
  }catch(error){
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}

// delete product
export const deleteProductAdmin = (id) => async (dispatch) => {
  try{
    dispatch({type: DELETE_PRODUCT_REQUEST})

    const {data} = await axios.delete(`/api/admin/product/${id}`);

    dispatch({type: DELETE_PRODUCT_SUCCESS, payload: data.success});
  }catch(error){
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}

//create new product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    
    const { data } = await axios.post("/api/admin/product/new", productData, config);
    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

// update product

export const updateProduct = (id, productData) => async(dispatch) => {
  try{
    dispatch({type: UPDATE_PRODUCT_REQUEST});
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/admin/product/${id}`, productData, config);
    dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data.success});
  }catch(error){
    dispatch({type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message});
  }
}

//  get detils of a product
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//new review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    
    const { data } = await axios.put("/api/product/review", reviewData, config);
    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// get all reviews of a product --ADMIN
export const getAllReviews = (id) => async(dispatch) => {
  try{
    dispatch({type: ALL_REVIEW_REQUEST});
  
    const {data} = await axios.get(`/api/reviews?id=${id}`);

    dispatch({type: ALL_REVIEW_SUCCESS, payload: data.review})
  }catch(error){
    dispatch({type: ALL_REVIEW_FAIL, payload: error.response.data.message})
  }
}

// delete revie of a product --ADMIN
export const deleteReview = (revID, prodID) => async(dispatch) => {
  try{
    dispatch({type: DELETE_REVIEW_REQUEST});
  
    const {data} = await axios.delete(`/api/review?id=${revID}&productID=${prodID}`);

    dispatch({type: DELETE_REVIEW_SUCCESS, payload: data.success})
  }catch(error){
    dispatch({type: DELETE_REVIEW_FAIL, payload: error.response.data.message})
  }
}