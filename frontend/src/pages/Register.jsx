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
const Register = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({ name: "", email: "" , password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/blank-user.png");
  const [avatarPreview, setAvatarPreview] = useState("/blank-user.png");
  const registerSubmit = (e) => {
    e.preventDefault();

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
          <div className="forms">
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
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  autoComplete="false"
                  required
                />
              </div>
              <div className="input-field forgotPassowrdOption">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div className="input-field forgotPassowrdOption">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={registerDataChange}
                  required
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
