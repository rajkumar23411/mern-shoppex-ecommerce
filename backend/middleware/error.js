const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";

   //mongodb wrong id error
   if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;

      err = new ErrorHandler(message, 400);
   }

   //mongodb duplicate key error
   if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message, 400);
   }

   //wrong jwt error
   if (err.name === "JsonWebToken") {
      const message = `Token is Invalid. Please try again`;
      err = new ErrorHandler(message, 400);
   }

   //jwt expire error
   if (err.name === "TokenExpiredError") {
      const message = `Token is expired. Please try again`;
      err = new ErrorHandler(message, 400);
   }

   res.status(err.statusCode).json({
      success: false,
      message: err.message,
   });
};
