import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router";
import {useParams} from 'react-router-dom'
import { clearErrors, resetPassword } from "../redux/actions/userAction";
import "../App.css";
import Loader from "../components/loader";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const {token} = useParams()
  const { loading, success, error } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Password updated successfully", {variant:"success"});
      navigate("/login");
    }
  }, [dispatch, error, enqueueSnackbar, navigate, success, token]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forms">
          <form action="#" onSubmit={resetPasswordSubmit}>
            <div className="form-heading">
              <h3>RESET PASSWORD</h3>
              <small>Please fill in the information below:</small>
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <button>RESET PASSWORD</button>
            </div>
            <div className="goTo">
              <small>
                Remember your password?{" "}
                <span>
                  <Link to="/login">Back to Login</Link>
                </span>
              </small>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
