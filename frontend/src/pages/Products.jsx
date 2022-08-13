import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SingleProuct from "../components/SingleProuct";
import { clearErrors, getProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import ReactStars from "react-rating-stars-component";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../App.css";
import { Radio, RadioGroup, Slider } from "@mui/material";
import { useSnackbar } from "notistack";
const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [displaySizeFilter, setDisplaySizeFilter] = useState(true);
  const [displayPriceFilter, setDisplayPriceFilter] = useState(true);
  const [displayRatingFilter, setDisplayRatingFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 8000]);
  const {
    loading,
    error,
    products,
    totalProducts,
    resultPerPage,
    filteredProductCount
  } = useSelector((state) => state.products);

  const priceHanlder = (e, newPrice) => {
    setPrice(newPrice);
  }
  const HandleSizeFilter = () => {
    setDisplaySizeFilter(!displaySizeFilter);
  };
  const HandlePriceFilter = () => {
    setDisplayPriceFilter(!displayPriceFilter);
  };
  const HandleRatingFilter = () => {
    setDisplayRatingFilter(!displayRatingFilter);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const clearFilters = () => {
    setPrice([0, 8000]);
    setCategory("");
    setRating(0);
  }
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffb400",
    isHalf: true,
    size: 25,
  };
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
    dispatch(getProduct(keyword, currentPage, rating, category, price));
  }, [dispatch, error, enqueueSnackbar, keyword, currentPage, rating, category, price]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="allProducts">
            <div className="page-heading">
              <h3></h3>
            </div>
            <div className="main">
              <div className="filters">
                <div className="filter-heading">
                  <span>filters</span>
                  <div className="clear-filters" onClick={clearFilters}>Clear Filters</div>
                </div>
                <div className="all-filters">
                  <div className={displaySizeFilter ? "category-filter active" : "category-filter"}>
                    <div className="filter-name" onClick={HandleSizeFilter}>
                      <span>other categories</span>
                      <i className={displaySizeFilter ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}></i>
                    </div>
                    <div className="all-categories">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="category-radio-buttons-group"
                          onChange={(e) => setCategory(e.target.value)}
                          name="category-radio-buttons"
                          value={category}>
                          {
                            categories.map((el, i) => (
                              <FormControlLabel key={i} value={el} control={<Radio size="small" className="cats" />} label={<span key={i} style={{ padding: "4px !important" }}>{el}</span>} />
                            ))
                          }
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className={displayPriceFilter ? "price-filter active" : "price-filter"}>
                    <div className="filter-name" onClick={HandlePriceFilter}>
                      <span>Price</span>
                      <i className={displayPriceFilter ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}></i>
                    </div>
                    <div className="price-slider">
                      <Slider
                        value={price}
                        onChange={priceHanlder}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => 'Price range slider'}
                        min={0}
                        max={8000}
                      />
                      <div className="price-view">
                        <p>
                          <span>From: </span>
                          <span>₹{price[0]}</span>
                        </p>
                        <p>
                          <span>to: </span>
                          <span>₹{price[1]}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={displayRatingFilter ? "rating-filter active" : "rating-filter"}>
                    <div className="filter-name" onClick={HandleRatingFilter}>
                      <span>Customer Ratings</span>
                      <i className={displayRatingFilter ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}></i>
                    </div>
                    <div className="ratingSlider">
                      <span onClick={() => setRating(4)}><ReactStars {...options} value={4} /> (& Up)</span>
                      <span onClick={() => setRating(3)}><ReactStars {...options} value={3} /> (& Up)</span>
                      <span onClick={() => setRating(2)}><ReactStars {...options} value={2} /> (& Up)</span>
                      <span onClick={() => setRating(1)}><ReactStars {...options} value={1} /> (& Up)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-products">
                {
                  !loading && products.length === 0 ? (
                    <div className="no-products-found">
                      <img draggable="false" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="Search Not Found" />
                      <h1>Sorry, no results found!</h1>
                      <p>Please check the spelling or try searching for something else</p>
                    </div>
                  )
                    :
                    (
                      <>
                        {products &&
                          products.sort(() => Math.random() - 0.5).map((product) => (
                            <SingleProuct product={product} key={product._id} />
                          ))}

                        {filteredProductCount > resultPerPage && (
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={totalProducts}
                            onChange={setCurrentPageNo}
                            prevPageText="< PREV"
                            nextPageText="NEXT >"
                            itemClass="page-item"
                            linkClass="page_link"
                            activeClass="pageActive"
                            activeLinkClass="PageActiveLink"
                            firstPageText="FIRST"
                            lastPageText="LAST"
                          />
                        )}
                      </>
                    )
                }
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Products;