const catchAsyncError = require("../controllers/catchAsyncErrors");
const stripe = require("stripe");

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
  const myPayment = await Stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: { company: "Ecommerce" },
  });

  res
    .status(200)
    .json({ success: true, clientSecret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLIC_KEY });
});
