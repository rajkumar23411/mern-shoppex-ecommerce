import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import Loader from "../../components/loader";
import { allUser, clearErrors, deleteUser} from "../../redux/actions/userAction";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import "../../Dashboard.css"
import { Link, useNavigate } from "react-router-dom";
import { DELETE_USER_RESET } from "../../redux/constants/userConstant";
import { useSnackbar } from "notistack";
import { formatDate } from "../../functions";
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
          <div className="header" style={{ "fontWeight": "600", "padding": "1rem 0 2rem 1rem", "textTransform": "uppercase" }}>ALL USERS ({users.length})</div>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Joined On</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  users &&
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <Link to={`/admin/user/${user._id}`}><i className="fa-light fa-pen-to-square"></i></Link>
                          <button disabled={deleteLoading ? true : false} style={{background: "none", border:"none"}}><i className="fa-light fa-trash-can" onClick={()=>deleteUserHanlder(user._id)}></i></button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default UserList;
