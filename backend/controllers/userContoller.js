const ErrorHandler = require("../utils/ErrorHandler");
const catchAsycErrors = require("../controllers/catchAsyncErrors");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//user register
exports.registerUser = catchAsycErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder: "avatars",
    chunk_size: 6000000,
    quality: 100,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { publicID: myCloud.secure_url, url: myCloud.secure_url },
  });
  
  const message = `Hi there! ${user.name} \n\nWelcome to Shoppex, India's Larget Shopping Site. Thank you for joining us. \n\n Happy Shopping😻.`;

    await sendEmail({
      email: user.email,
      subject: `Shoppex`,
      message: message,
    });

  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsycErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//logout user
exports.logOut = catchAsycErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//forgotPassword
exports.forgotPassword = catchAsycErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `Click the link below to reset your password - \n\n ${resetPasswordUrl}  \n\n If you have not request this then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Shoppex Password Recovery`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExp = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsycErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExp: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password request is invalid or has been expired",
        400
      )
    );
  }
rder
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExp = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsycErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update password
exports.updatePassword = catchAsycErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Invalid ", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update user Profie
exports.updateProfile = catchAsycErrors(async (req, res, next) => {
  const newUserData = { name: req.body.name, email: req.body.email };
  
  if(req.body.avatar !== ""){
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.publicID;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      crop: "scale",
    });
    newUserData.avatar = {
      publicID: myCloud.public_id,
      url: myCloud.secure_url
    }
  }
  
  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

//get all users -- admin
exports.getAllUsers = catchAsycErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ users, success: true });
});

// get one user details -- admin
exports.getOneUserDetails = catchAsycErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({ user, success: true });
});

// update user role -- admin
exports.updateUserRole = catchAsycErrors(async (req, res, next) => {
  const newUser = {
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, user });
});

// delete user -- admin
exports.deleteUser = catchAsycErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("No user found", 404));
  }

  const imageId = user.avatar.publicID;
  await cloudinary.v2.uploader.destroy(imageId);
  
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
