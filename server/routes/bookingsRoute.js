const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
    // Save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // Update show's filledSeats
    const show = await Show.findById(req.body.show);
    if (!show) {
      return res.status(404).send({
        success: false,
        message: 'Show not found'
      });
    }
    await Show.findByIdAndUpdate(req.body.show, {
      filledSeats: [...show.filledSeats, ...req.body.seats]
    });

    res.status(200).send({
      success: true,
      message: "Show booked successfully",
      data: newBooking
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
});

// get all bookings by user id
router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId }).populate("show").populate({
      path: "show",
      populate: {
        path: "movie",
        model: "Movie",
      }
    }).populate("user").populate({
      path: "show",
      populate: {
        path: "theater",
        model: "Theater",
      }
    });
    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
});

//create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { token, amount } = req.body;

    if (!token || !amount) {
      return res.status(400).send({
        success: false,
        message: 'Token and amount are required'
      });
    }

    const { email, card: { name } } = token;

    // Search for an existing customer
    let customer;
    try {
      const query = `email:\'${email}\' AND name:\'${name}\'`;
      const customers = await stripe.customers.search({ query });

      if (customers.data.length > 0) {
        customer = customers.data[0];  // Use the existing customer
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: name,
        });
      }
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: `Error searching or creating customer: ${err.message}`
      });
    }

    // Create a payment intent
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'inr',
        customer: customer.id,
        payment_method: 'pm_card_visa',
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: `Error creating payment intent: ${err.message}`
      });
    }

    res.send({
      success: true,
      message: 'Payment intent created successfully',
      data: paymentIntent
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
});

//confirm payment intent
router.post('/confirm-payment-intent', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).send({
        success: false,
        message: 'Payment Intent ID is required'
      });
    }

    const paymentIntent = await stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: 'pm_card_visa',
        return_url: 'https://www.example.com',
      }
    );

    res.send({
      success: true,
      message: 'Payment intent confirmed successfully',
      data: paymentIntent
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
});

router.get('/public-key', authMiddleware, (req, res) => {
  try {
    const publicKey = process.env.STRIPE_PUBLIC_KEY;

    res.status(200).json({
      success: true,
      message: "public key fetched successfully.",
      data: publicKey
    });

  } catch (err) {
    res.status(404).json({
      success: false,
      error: 'Public key not found'
    });
  }
});

module.exports = router;