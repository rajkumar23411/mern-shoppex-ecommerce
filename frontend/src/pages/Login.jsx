import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../redux/actions/userAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Login = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {enqueueSnackbar} = useSnackbar();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, error, enqueueSnackbar, history,isAuthenticated, redirect]);

  return (
    <>
      <Navbar />
      <div className="forms">
        <div className="left">
          <img src="/login-bro.svg" alt="login" />
          <h3>Part of us? Worry not, Login now</h3>
        </div>
        <div className="register-login-form">
        <form onSubmit={loginSubmit}>
          <div className="form-heading">
            <h3>LOGIN</h3>
            <small>Please enter your e-mail and password:</small>
          </div>
          <div className="input-field">
            <input
              type="text"
              autoComplete="new-password"
              required
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <label>Email*</label>
          </div>
          <div className="input-field forgotPassowrdOption">
            <input
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <label>Password*</label>
            <Link to="/forgot_password">
              <div className="forgotPassword">Forgot Password?</div>
            </Link>
          </div>
          <div className="input-field">
            <button>Login</button>
          </div>
          <div className="goTo">
            <Link to="/register">
              <small>
                Don't have an account? <span>Create One</span>
              </small>
            </Link>
          </div>
        </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;