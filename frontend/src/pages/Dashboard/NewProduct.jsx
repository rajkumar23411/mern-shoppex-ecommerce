import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { clearErrors, createProduct } from "../../redux/actions/productActions";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productsContstant";

const NewProduct = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [cutPrice, setCutPrice] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
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
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (success) {
      enqueueSnackbar("Product created Successfully", {variant: "success"});
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, loading, navigate, success, enqueueSnackbar]);

  const createProductHandler = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return enqueueSnackbar("Product name is required", { variant: "warning" });
    }
    if (price.length === 0) {
      return enqueueSnackbar("Product price is required", { variant: "warning" });
    }
    if (stock.length === 0) {
      return enqueueSnackbar("Product price is required", { variant: "warning" });
    }
    if (description.length === 0) {
      return enqueueSnackbar("Product price is required", { variant: "warning" });
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("cutPrice", cutPrice);
    myForm.set("stock", stock);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

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
              <span>Create Product</span>
            </div>
            <div className="input-div">
              <i className="fa-duotone fa-tag"></i>
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
                name="category"
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
                rows="5"
              />
            </div>
            <div className="input-div select-image-div">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                placeholder="Choose Product Images"
                multiple
              />
            </div>
            {
              imagePreview.length !== 0 && (
                <div className="selected-image-preview ">
                  {imagePreview.map((image, i) => (
                    <img src={image} alt="products" key={i} />
                  ))}
                </div>
              )
            }
            <button type="submit" disabled={loading ? true : false}>Create Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
