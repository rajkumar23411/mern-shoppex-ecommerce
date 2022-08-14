import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { clearErrors, getProductDetails, updateProduct } from "../../redux/actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productsContstant";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const {id} = useParams();
  const dispatch = useDispatch();
  const {product, error} = useSelector(state => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.updateProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [cutPrice, setCutPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagePreview, setImagesPreview] = useState([]);

  const categories = [
    "Jeans",
    "Trouser",
    "Shirt",
    "TShirt",
    "Footware",
    "EyeWare",
  ];

  useEffect(() => {
    if(product && product._id !== id){
      dispatch(getProductDetails(id));
    }else{
      setName(product.name);
      setPrice(product.price);
      setCutPrice(product.cutPrice);
      setStock(product.stock);
      setDescription(product.description);
      setCategory(product.category);
      setOldImages(product.images);
    }
    if (error) {
      enqueueSnackbar(error, {variant:"error"});
      dispatch(clearErrors());
    }

    if(isUpdated){
          enqueueSnackbar("Product updated Successfully", {variant:"success"});
          navigate("/admin/products");
          dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    if(updateError){
      enqueueSnackbar(updateError, {variant:"error"});
      dispatch(clearErrors());
    }
  }, [dispatch, loading, navigate, isUpdated, enqueueSnackbar, id, product, updateError, error]);

  const createProductHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
          var reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <div className="createProductForm">
          <form encType="multipart/form-data" onSubmit={createProductHandler}>
            <div className="header">
              <span>Update Product</span>
            </div>
            <div className="input-div">
            <i className="fa-light fa-pen-to-square"></i>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-div">
            <i className="fa-duotone fa-hand-holding-dollar"></i>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-div">
            <i className="fa-duotone fa-badge-percent"></i>
              <input
                type="number"
                placeholder="Cut Price"
                value={cutPrice}
                onChange={(e) => setCutPrice(e.target.value)}
              />
              </div>
            <div className="input-div">
            <i className="fa-duotone fa-border-all"></i>
              <select
                name="category" value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option defaultValue>Choose Category</option>
                {categories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-div">
            <i className="fa-duotone fa-cubes-stacked"></i>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="input-div text-area">
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="4"
              />
            </div>
            <div className="input-div select-image-div">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div> 
            { oldImages.length !== 0 &&
              <div className="image-previews">
              <label>Old Images</label>
                <div className="old-image-preview">
              { oldImages.map((image, i) => (
                <img src={image.url} alt="old products" key={i} />
              ))}
            </div>
              </div>
            }
            {
              imagePreview.length !== 0 &&
              <div className="image-previews">
                <label>New Images</label>
                <div className="selected-image-preview">
                {imagePreview.map((image, i) => (
                  <img src={image} alt="products" key={i} />
                ))}
              </div>
              </div>
            }
            <button type="submit" disabled={loading ? true : false}>Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;