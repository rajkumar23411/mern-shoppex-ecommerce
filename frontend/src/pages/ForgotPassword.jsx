import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import { clearErrors, forgotPassword } from "../redux/actions/userAction";
import { useSnackbar } from "notistack";
import Navbar from "../components/Navbar";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [ email, setEmail ] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, {variant:"success"});
    }

  }, [dispatch, enqueueSnackbar, error, message]);
  return (
    <>
    <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forms">
          <div className="left">
            <img src="Forgot-password.svg" alt="forgot password" />
            <h3>Forgot Your Password ?</h3>
            <span>No worries! You can reset your password easily.</span>
          </div>
          <div className="register-login-form forgotPasswordForm">
          <form action="#" onSubmit={forgotPasswordSubmit}>
            <div className="form-heading">
              <h3>RECOVER PASSWORD</h3>
              <small>Please enter your e-mail:</small>
            </div>
            <div className="input-field">
              <input
                type="email"
                placeholder="Enter Your Registered Email*"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <button>Recover</button>
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
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
