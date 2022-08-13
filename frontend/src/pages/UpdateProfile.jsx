import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, loadUser, updateProfile } from "../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../redux/constants/userConstant";
import "../App.css"
import Loader from "../components/loader";
import Navbar from "../components/Navbar";
import { useSnackbar } from "notistack";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user && user.avatar.url);
    }
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("Profile updated successfully", {variant:"success"});
      dispatch(loadUser());
      history("/my_account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, enqueueSnackbar, history, isUpdated, user]);
  return (
        <>
          {loading ? <Loader /> : 
        <>
        <Navbar />
          <div className="forms">
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <div className="form-heading">
                <h3>UPDATE YOUR PROFILE</h3>
                <small>Please fill in the information below:</small>
              </div>
              <div className="profile-icon-div">
              {
                loading ? <Loader /> :<img
                src={avatarPreview}
                className="profileImage"
                alt="profilePic"
              />
              }
              </div>
              <div className="input-field">
                    <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
              <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={updateProfileChange}
                />
              </div>
              <div className="input-field">
                <button>UPDATE PROFILE</button>
              </div>
            </form>
          </div>
        </>
      }
    </>
  );
};

export default UpdateProfile;
