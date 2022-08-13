const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsycErrors = require("../controllers/catchAsyncErrors");
const sendEmail = require("../utils/sendMail");

//create new order
exports.newOrder = catchAsycErrors(async (req, res, next) => {
   const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      shippingDisocunt,
      totalPrice,
   } = req.body;

   const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      shippingDisocunt,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
   });

   res.status(201).json({ success: true, order });
});

// get single order
exports.getSingleOrder = catchAsycErrors(async (req, res, next) => {
   const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
   );

   if (!order) {
      return next(new ErrorHandler("No order found", 404));
   }

   res.status(200).json({ success: true, order });
});

//get logged in user orders
exports.myOrders = catchAsycErrors(async (req, res, next) => {
   const orders = await Order.find({ user: req.user._id });
   res.status(200).json({success: true, orders});
});

//get all orders (ADMIN ONLY)
exports.allOrders = catchAsycErrors(async (req, res, next) => {
   const orders = await Order.find();

   let totalIncome = 0;

   orders.forEach((order) => {
      totalIncome += order.totalPrice;
   });

   res.status(200).json({ totalIncome, orders });
});

// update order status (ADMIN Only)
exports.updateOrderStatus = catchAsycErrors(async (req, res, next) => {
   const order = await Order.findById(req.params.id).populate("user", "name email");
   if (!order) {
      return next(new ErrorHandler("Order not found", 404));
   }

   if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("Order is already delivered", 400));
   }

   if(req.body.status === "Shipped"){
      order.shippedAt = Date.now();
      order.orderItems.forEach(async (or) => {
         await updateStock(or.product, or.quantity);
      });
      let shippingMessage = `Hello there ${order.user.name}.\n\nYour order of ORDER ID ${order._id} has been shipped today. And will be delivered soon. Thank you for your patients.`;
      await sendEmail({
         email: order.user.email,
         subject: `Order Delivery Update`,
         message: shippingMessage
      })
   }

   order.orderStatus = req.body.status;

   if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      const deliverMessage = `Hello there ${order.user.name}.\n\nYour order of ORDER ID ${order._id} has delivered today. Thank you for shopping with us.\n\n\nWith regards\nTeam Shoppex.`;
      await sendEmail({
         email: order.user.email,
         subject: `Order Delivery Update`,
         message: deliverMessage
      })
   }
   await order.save({ validateBeforeSave: false });
   
   res.status(200).json({ order, success: true });
});
async function updateStock(productID, qty) {
   const product = await Product.findById(productID);

   product.stock -= qty;

   await product.save({ validateBeforeSave: false });
}

//delete order (ADMIN Only)
exports.deleteOrder = catchAsycErrors(async (req, res, next) => {
   const order = await Order.findById(req.params.id);

   if (!order) {
      return next(new ErrorHandler("No order found", 404));
   }

   await order.remove();

   res.status(200).json({ success: true, message: "Order successfully" });
});
