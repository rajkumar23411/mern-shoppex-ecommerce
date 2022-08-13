import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { clearErrors, getUserDetails, updateUser } from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstant";
import Loader from "../../components/loader";
import { useSnackbar } from "notistack";

const UpdateUserRole = () => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {loading, error, user} = useSelector(state => state.userDetails)
  const {loading: updateLoading, error: updateError, isUpdated} = useSelector(state => state.profile)
  const [role, setRole] = useState("");

  useEffect(() => {
    if(user && user._id !== id){
      dispatch(getUserDetails(id));
    }else{
      setRole(user.role);
    }
    if (error) {
      enqueueSnackbar(error,{variant:"error"});
      dispatch(clearErrors());
    }
    if(updateError){
      enqueueSnackbar(updateError, {variant:"error"});
      dispatch(clearErrors());
    }
    if(isUpdated){
          enqueueSnackbar("User updated successfully");
          navigate("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, loading, navigate, isUpdated, id, updateError, enqueueSnackbar, user]);

  const updateUserRoleHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      {
          updateLoading ? <Loader /> : <div className="right">
          <div className="createProductForm">
            <form onSubmit={updateUserRoleHandler}>
            <div className="header">
              <span>Update user role</span>
            </div>
            <div className="user-detail">
              <span><i class="fa-duotone fa-circle-user"></i>{user.name}</span>
              <span><small style={user.role === "admin" ? {background:"#2ecc71"}:{background:"#3498db"}}></small>{user.role}</span>
            </div>
              <div className="input-div">
              <i className="fa-duotone fa-circle-user"></i>
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={user && user.name}
                  readOnly
                />
              </div>
              <div className="input-div">
              <i className="fa-duotone fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={user && user.email}
                  readOnly
                />
              </div>
              <div className="input-div">
              <i className="fa-duotone fa-person-walking-luggage"></i>
                <select
                  name="category"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option defaultValue >Choose Role</option>
                  <option defaultValue value="admin">Admin</option>
                  <option defaultValue value="User">User</option>
                </select>
              </div>
              <button type="submit" disabled={updateLoading ? true : false || role === "" ? true : false}>UPDATE ROLE</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
};

export default UpdateUserRole;
