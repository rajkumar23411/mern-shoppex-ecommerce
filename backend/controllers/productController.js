const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../controllers/catchAsyncErrors");
const ApiFeatures = require("../features/apiFeatures");
const cloudinary = require("cloudinary");

//create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imageLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
      chunk_size: 6000000
    });

    imageLink.push({
      publicID: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imageLink;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
});

//update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  if (req.body.images !== undefined) {
    let images = [];
    if (typeof req.body.images === 'string') {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].publicID)
    }

    //then add new images 
    let imageLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
        chunk_size: 6000000
      });

      imageLink.push({
        publicID: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imageLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

//get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 12;

  const totalProduct = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let product = await apiFeatures.query;
  let filteredProductCount = product.length;

  apiFeatures.pagination(resultPerPage);

  product = await apiFeatures.query.clone();
  res
    .status(200)
    .json({ product, totalProduct, resultPerPage, filteredProductCount });
});

//GET ALL PRODUCTS (ADMIN)
exports.getAllProductsAdmin = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findByIdAndRemove({ _id: req.params.id });

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].publicID);
  }

  res.status(200).json({ success: true });
});

//get one product
exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({ product });
});

//add and update review
exports.createUpdateReview = catchAsyncError(async (req, res, next) => {
  const { productID, rating, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productID);

  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.ratings = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ runValidators: false });
  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

//get all reviews of a single product
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("No Product Found", 404));
  }

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

//delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productID);

  if (!product) {
    return next(new ErrorHandler("No Product Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productID,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ message: "Review deleted successfully", success: true });
});
