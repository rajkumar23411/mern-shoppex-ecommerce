import React from "react";
import {  useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Loader from "../components/loader";
import "../App.css";
import { Link } from "react-router-dom";
const MyAccount = () => {
  const LinkTagColor = {color: "#fff"};
  const { user, loading } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      {loading ?
        <Loader />
       : 
        <>
          <div className="profile-section">
            <div className="profile-card">
            <div className="heading">My Profile</div>
            <div>
            <div className="profile-image">
              <div className="image-block">
              <img src={user && user.avatar && user.avatar.url} alt="profilePIC" />
              </div>
              <div className="user-name-heading">{user.name}</div>
            </div>
            <div className="user-info">
              <div className="user-name">
                  <span>Full Name</span>
                  <small>{user.name}</small>
                </div>
                <div className="user-email">
                  <span>Email</span>
                  <small>{user.email}</small>
                </div>
                <div className="joined-date">
                  <span>Joined On</span>
                  <small>{String(user.createdAt).substring(0, 10)}</small>
                </div>
                <div className="btns">
                  <Link to="/me/update" style={{...LinkTagColor}}><span className="updateProfileBtn">Update Profile</span></Link>
                  <Link to="/update/password" style={{...LinkTagColor}}><span className="changeProfileBtn">Change Password</span></Link>
                </div>
            </div>
            </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default MyAccount;
