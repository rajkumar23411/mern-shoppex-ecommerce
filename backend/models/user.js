const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: [true, "Please Enter Your Name"],
      maxLength: [40, "Name cannot exceed more than 40 characters"],
      minlength: [4, "Name should have more than 4 characters"],
      trim: true,
   },
   email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Your Email"],
      validate: [validator.isEmail, "Invalid Email ID"],
   },
   password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [8, "Password should be greater than 8 characters"],
      select: false,
   },
   avatar: {
      publicID: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },
   role: {
      type: String,
      default: "User",
   },
   createdAt:{type: Date, default: Date.now()},
   resetPasswordToken: String,
   resetPasswordExp: Date,
});

//encrypt the password before save the user
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcryptjs.hash(this.password, 10);
});

//create jwt token
userSchema.methods.getJwtToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
   });
};

//comapre password
userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcryptjs.compare(enteredPassword, this.password);
};

//generating forgot password token
userSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString("hex");

   //hasing and adding to userSchema
   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

   this.resetPasswordExp = Date.now() + 15 * 60 * 1000;

   return resetToken;
};

module.exports = mongoose.model("User", userSchema);
