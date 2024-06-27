const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    filledSeats: {
        type: Array,
        default: []
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);