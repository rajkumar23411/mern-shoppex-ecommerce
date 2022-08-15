import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import React from "react";
import { logOut } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
const Navbar = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [stickyNavBar, setStickyNavBar] = useState(false);
  const [SearchPage, setSearchPage] = useState(false);
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlistItems } = useSelector(state => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const StickyNavBar = () => {
    if (window.scrollY > 720) {
      setStickyNavBar(true);
    } else {
      setStickyNavBar(false);
    }

    if(window.scrollY > 500){
      setSearchPage(false)
    }
  };
  window.addEventListener("scroll", StickyNavBar);

  const showSearchPage = () => {
    setSearchPage(true);
  };
  const removeSearchPage = () => {
    setSearchPage(false);
  };

  // eslint-disable-next-line
  const DisplayMenu = () => {
    setToggleNavBar(!toggleNavBar);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  function logoutUser() {
    dispatch(logOut());
    enqueueSnackbar("Logged out Successfully", { variant: "success" });
    navigate("/")
  }

  return (
    <>
      <nav>
        <div className={stickyNavBar ? "bottom active" : "bottom"}>
          <div className="left">
            <Link to="/">
              <div className="brandLogo">
                <img src="/shoppexlogo.png" alt="brand logo" />
                <p>
                  <span>Shoppex</span>
                  <small>The Mens' Store</small>
                </p>
              </div>
            </Link>
            <ul className={toggleNavBar ? "navTags active" : "navTags"}>
              <NavLink to="/">
                <li>Home</li>
              </NavLink>
              <NavLink to="/products">
                <li>Products</li>
              </NavLink>
              <NavLink to="/about">
                <li>About Us</li>
              </NavLink>
              <NavLink to="/contact">
                <li>Contact Us</li>
              </NavLink>
            </ul>
          </div>
          <div className="right">
            <div className="navIcons">
              <div className="searcIcon" onClick={showSearchPage}>
                <img src="/search-normal.svg" alt="Icon" className="Icon" />
              </div>
             {
              !isAuthenticated ? (
                <Link to="/login"><div className="LoginOption">Login</div></Link>
              ):(
                <div className="accountIcon">
                <i class="fa-duotone fa-circle-user"></i>
                <p>Profile</p>
                <div className="account-menu">
                  <div className="section-1">
                    {
                      isAuthenticated === false ? (
                        <div className="unauthUserGreet">
                          <>Hi there!</>
                          <p>Please login to access</p>
                          <Link to="/login">
                            <div className="login-signup-btn">LOGIN / SIGNUP</div>
                          </Link>
                        </div>
                      ) : (
                        <div className="authUserGreet">
                          <h3>Hello!</h3>
                          <p>
                            <span>{user.name}</span>
                          </p>
                        </div>
                      )
                    }
                  </div>
                  <div className="section-2">
                    {
                      user && user.role === "admin" &&
                      <Link to="/admin/dashboard">
                        <p>
                          <i className="fa-duotone fa-chart-line"></i>
                          <span>Dashboard</span>
                        </p>
                      </Link>
                    }
                    <Link to="/my_account">
                      <p>
                        <i className="fa-duotone fa-circle-user"></i>
                        <span>Account</span>
                      </p>
                    </Link>
                    <Link to="/orders">
                      <p>
                        <i className="fa-duotone fa-truck-fast"></i>
                        <span>Orders</span>
                      </p>
                    </Link>
                    <Link to="/cart">
                      <p>
                        <i className="fa-duotone fa-basket-shopping"></i>
                        <span>Cart</span>
                      </p>
                    </Link>
                    <Link to="/wishlist">
                      <p>
                        <i className="fa-solid fa-heart"></i>
                        <span>Wishlist</span>
                      </p>
                    </Link>
                  </div>
                  {!isAuthenticated ? (
                    " "
                  ) : (
                    <div className="section-3">
                      <i className="fa-duotone fa-power-off"></i>
                      <span onClick={logoutUser}>
                        Logout
                      </span>
                    </div>
                  )}
                </div>
              </div>
              )
             }
              <Link to="/wishlist">
                <div className="wishlistIcon">
                  <i className="fa-duotone fa-heart-circle-check"></i>
                  {
                    wishlistItems.length !== 0 && (
                      <span className="wishlistCount">{wishlistItems.length}</span>
                    )
                  }
                  <p>
                    <span>Wishlist</span>
                  </p>
                </div>
              </Link>
              <Link to="/cart">
                <div className="cartIcon">
                  <i class="fa-duotone fa-bag-shopping"></i>
                  <p>
                    <span>Cart</span>
                  </p>
                  {
                    cartItems.length !== 0 && (
                      <span className="cartItemCount">{cartItems.length}</span>
                    )
                  }
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={SearchPage ? "searchPage active" : "searchPage"}>
        <div className="search-div">
          <form onSubmit={searchSubmitHandler}>
            <div className="search-options">
              <input
                type="text"
                placeholder="search here products, brands and more.."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <i className="fa-light fa-magnifying-glass"></i>
              <div className="cross" onClick={removeSearchPage}>
                &times;
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
