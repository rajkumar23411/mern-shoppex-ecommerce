import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearErrors, deleteProductAdmin, getProductsAdmin } from '../../redux/actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productsContstant';
import SideNavbar from '../../components/Dashboard/SideNavbar';
import { Link } from 'react-router-dom';
const AllProductsList = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDelete } = useSelector(state => state.deleteProduct);

  const deleteProductHandler = (id) => {
    dispatch(deleteProductAdmin(id));
  }
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isDelete) {
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getProductsAdmin());
  }, [dispatch, error, deleteError, navigate, isDelete, enqueueSnackbar]);
  return (
    <div className="dashboard .product-statistics">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <div className="header" style={{ "fontWeight": "600", "padding": "1rem 0 2rem 1rem", "textTransform": "uppercase" }}>Products List</div>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Ratings</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  products && products.map((item, i)=>(
                    <TableRow key={i}>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>₹{item.price.toLocaleString()}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.ratings}</TableCell>
                      <TableCell>
                          <Link to={`/admin/products/${item._id}`}><i className="fa-duotone fa-pen-to-square"></i></Link>
                          <i className="fa-duotone fa-trash-can" onClick={()=>deleteProductHandler(item._id)}></i>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default AllProductsList