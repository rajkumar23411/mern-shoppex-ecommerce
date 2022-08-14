import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, updatePassword } from "../redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../redux/constants/userConstant";
import "../App.css";
import Loader from "../components/loader";
import Navbar from "../components/Navbar";
import { useSnackbar } from "notistack";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("Password updated Successfully", { variant: "success" });
      history("/my_account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, enqueueSnackbar, history, isUpdated, user]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forms updatePasswordPage">
          <div className="register-login-form">
          <form action="#" onSubmit={updatePasswordSubmit} className="updatePasswordForm">
            <div className="form-heading">
              <h3>CHANGE PASSWORD</h3>
              <small>Please fill in the information below:</small>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autocomplete="false"
              />
              <label>Old Password*</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label>New Password*</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Confirm New Password*</label>
            </div>
            <div className="input-field">
              <button>UPDATE PASSWORD</button>
            </div>
          </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;