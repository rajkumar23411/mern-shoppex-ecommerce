import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader";
import "../App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../redux/actions/userAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Navbar from "../components/Navbar";
const Register = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({ name: "", email: "" , password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("https://i0.wp.com/artvoice.com/wp-content/uploads/2018/03/blank-profile-picture-973460_960_720.png?ssl=1");
  const [avatarPreview, setAvatarPreview] = useState("https://i0.wp.com/artvoice.com/wp-content/uploads/2018/03/blank-profile-picture-973460_960_720.png?ssl=1");
  const registerSubmit = (e) => {
    e.preventDefault();

    if(name.length <= 3){
      return enqueueSnackbar("Name should be greater than 4 characters", {variant:"info"});
    }    
    if(password.length < 6 ){
      return enqueueSnackbar("Password must be of 6 or more than 6 characters", {variant:"warning"});
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, enqueueSnackbar, navigate, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <Navbar />
          <div className="forms">
           <div className="register-login-form registerForm">
           <form encType="multipart/form-data" onSubmit={registerSubmit}>
              <div className="form-heading">
                <h3>REGISTER</h3>
                <small>Please fill in the information below:</small>
              </div>
              <div className="profile-icon-div">
              <img
                  src={avatarPreview}
                  className="profileImage"
                  alt="profilePic"
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  autoComplete="new-password"
                  required
                />
                <label>Name*</label>
              </div>
              <div className="input-field">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  autoComplete="new-password"
                  required
                />
                <label>Email*</label>
              </div>
              <div className="input-field forgotPassowrdOption">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  autoComplete="new-password"
                  required
                />
                <label>Password*</label>
              </div>
              <div className="input-field">
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={registerDataChange}
                  />
              </div>
              <div className="input-field">
                <button>register</button>
              </div>
              <div className="goTo">
                <Link to="/login">
                  <small>
                    Already have an account? <span>Login Now</span>
                  </small>
                </Link>
              </div>
            </form>
           </div>
            <div className="left">
              <img src="Signup-bro.svg" alt="sign up" />
              <h3>Join us now & Enjoy your shopping</h3>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
