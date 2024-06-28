const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seats: {
        type: Array,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
