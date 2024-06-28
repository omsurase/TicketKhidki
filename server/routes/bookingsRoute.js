const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const authMiddleware = require("../middleware/authMiddleware");
const Show = require('../models/showModel');
const Booking = require('../models/bookingModel');

// make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Ticket Booked for Movie",
    });

    const transactionId = charge.id;

    res.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


//book Show

router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    //save booking 
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show);
    //upadte seats
    await Show.findByIdAndUpdate(req.body.show, {
      filledSeats: [...show.filledSeats, ...req.body.seats]
    });

    res.send({
      success: true,
      message: "Show bokked successfully",
      data: newBooking
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;