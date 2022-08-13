import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { clearErrors, deleteReview, getAllReviews } from "../../redux/actions/productActions";
import "../../Dashboard.css";
import { useNavigate } from "react-router";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productsContstant";
import { useSnackbar } from "notistack";
const ProductReviews = () => {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );
  const { error, loading, reviews } = useSelector((state) => state.allReviews);
  const [productId, setProductId] = useState("");
  const productReviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };
  const deleteReviewHandler = (revId) => {
          dispatch(deleteReview(revId, productId));
  }

  useEffect(() => {
          if(productId.length === 24){
                    dispatch(getAllReviews(productId));
          }
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }
    if(deleteError){
              enqueueSnackbar(deleteError, {variant:"error"});
              dispatch(clearErrors());
    }

    if(isDeleted){
          enqueueSnackbar("Review deleted successfully", {variant:"success"});
          navigate("/admin/reviews");
          dispatch({type: DELETE_REVIEW_RESET});
    }     
  }, [productId, error, enqueueSnackbar, dispatch, isDeleted, navigate, deleteError]);
  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right product-review-page">
        <div className="reviewForm">
          <form onSubmit={productReviewSubmitHandler}>
            <h4>Search for Product Reviews</h4>
            <input
              type="text"
              placeholder="Enter product id"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <button
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </button>
          </form>
        </div>
        <div className="review-section">
        {reviews && reviews.length > 0 ? (
          <table>
            <thead>
              <th>Review ID</th>
              <th>User Name</th>
              <th>Ratings</th>
              <th>Comment</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {reviews &&
                reviews.map((rev) => (
                  <tr key={rev._id}>
                    <td>{rev._id}</td>
                    <td>{rev.name}</td>
                    <td>{rev.rating}</td>
                    <td>{rev.comment}</td>
                    <td className="edit-delete-option">
                      <i className="fa-light fa-trash-can" onClick={()=>deleteReviewHandler(rev._id)}></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="nothingFound">
                    <img src="/nothing.svg" alt="noting found" />
                    <h3>Not Found Anything</h3>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
