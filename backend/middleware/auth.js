const catchAsyncErrors = require("../controllers/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
   const { token } = req.cookies;

   if (!token) {
      return next(new ErrorHandler("Please login to access", 401));
   }

   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findById(decodedData.id);

   next();
});

exports.isAdmin = (...role) => {
   return (req, res, next) => {
      if (!role.includes(req.user.role)) {
         return next(new ErrorHandler("Not allowed", 401));
      } else {
         next();
      }
   };
};
