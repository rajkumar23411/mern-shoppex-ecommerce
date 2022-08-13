const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
   },
   description: {
      type: String,
      required: [true, "Product decription is required"],
      trim: true
   },
   price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true
   },
   cutPrice:{
      type: Number,
      required: [true, "Cut price is required"],
      trim: true
   },
   ratings: {
      type: Number,
      default: 0,
   },
   images: [
      {
         publicID: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
   category: {
      type: String,
      required: [true, "Please enter product category"],
   },
   stock: {
      type: Number,
      required: [true, "Product stock is required"],
      default: 1,
   },
   numOfReviews: {
      type: Number,
      default: 0,
   },
   reviews: [
      {
         user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
         },
         name: { type: String, required: true },
         rating: { type: Number, required: true },
         comment: { type: String, required: true },
      },
   ],
   user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});
module.exports = mongoose.model("Product", productSchema);
