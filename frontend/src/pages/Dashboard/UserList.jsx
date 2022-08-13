import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import Loader from "../../components/loader";
import { allUser, clearErrors, deleteUser} from "../../redux/actions/userAction";
import "../../Dashboard.css"
import { Link, useNavigate } from "react-router-dom";
import { DELETE_USER_RESET } from "../../redux/constants/userConstant";
import { useSnackbar } from "notistack";
const UserList = () => {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, users, error } = useSelector((state) => state.allUsers);
  const { loading: deleteLoading ,error: deleteError, isDeleted} = useSelector(state => state.deleteUser);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }

    if(deleteError){
      enqueueSnackbar(deleteError, {variant:"error"});
      dispatch(clearErrors());
    }

    if(isDeleted){
      enqueueSnackbar("User removed successfully", {variant:"success"});
      navigate("/admin/users");
      dispatch({type: DELETE_USER_RESET});
    }
    dispatch(allUser());
  }, [dispatch, error, deleteError, navigate, isDeleted, enqueueSnackbar]);
  
  const deleteUserHanlder = (id) =>{
    dispatch(deleteUser(id));
  }
  
  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="right">
          <div className="header">ALL USERS</div>
          {users && (
            <table cellPadding="1" cellSpacing="1">
              <thead>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined On</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.createdAt.substring(0, 10)}</td>
                      <td className="edit-delete-option">
                        <Link to={`/admin/user/${user._id}`}>
                          <i className="fa-light fa-pen-to-square"></i>
                        </Link>
                          <button disabled={deleteLoading ? true : false} style={{background: "none", border:"none"}}><i className="fa-light fa-trash-can" onClick={()=>deleteUserHanlder(user._id)}></i></button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
