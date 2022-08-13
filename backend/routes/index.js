const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getOneProduct,
  createUpdateReview,
  getReviews,
  deleteReview,
  getAllProductsAdmin,
} = require("../controllers/productController");
const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getOneUserDetails,
  updateUserRole,
  deleteUser,
} = require("../controllers/userContoller");
const { isAuthUser, isAdmin } = require("../middleware/auth");
const router = express.Router();

//product routes
router.post(
  "/admin/product/new",
  [isAuthUser, isAdmin("admin")],
  createProduct
);
router.put("/admin/product/:id", [isAuthUser, isAdmin("admin")], updateProduct);
router.get("/products", getAllProducts);
router.delete(
  "/admin/product/:id",
  [isAuthUser, isAdmin("admin")],
  deleteProduct
);
router.get("/product/:id", getOneProduct);
router.put("/product/review", [isAuthUser], createUpdateReview);
router.get("/reviews", getReviews);
router.delete("/review", [isAuthUser], deleteReview);
router.get("/admin/products",  getAllProductsAdmin);

//user routes
router.post("/register/user/new", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logOut);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", [isAuthUser], getUserDetails);
router.put("/password/update", [isAuthUser], updatePassword);
router.put("/me/update", [isAuthUser], updateProfile);
router.get("/admin/users", [isAuthUser, isAdmin("admin")], getAllUsers);
router.get(
  "/admin/user/:id",
  [isAuthUser, isAdmin("admin")],
  getOneUserDetails
);
router.put(
  "/admin/update/role/:id",
  [isAuthUser, isAdmin("admin")],
  updateUserRole
);
router.delete(
  "/admin/delete/user/:id",
  [isAuthUser, isAdmin("admin")],
  deleteUser
);

//order routes
router.post("/order/new", [isAuthUser], newOrder);
router.get("/order/:id", [isAuthUser], getSingleOrder);
router.get("/my/orders", [isAuthUser], myOrders);
router.get("/admin/all/orders", [isAuthUser, isAdmin("admin")], allOrders);
router.put(
  "/admin/order/status/:id",
  [isAuthUser, isAdmin("admin")],
  updateOrderStatus
);
router.delete("/admin/delete/order/:id", [isAuthUser, isAdmin("admin")], deleteOrder);

//payment route
router.post("/process/payment", [isAuthUser], processPayment);
router.get("/sendApiKey", [isAuthUser], sendStripeApiKey);
module.exports = router;
