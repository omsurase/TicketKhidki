
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
//console.log (process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB connection successfull');
});

connection.on('error', (err) => {
    console.log("MongoDB connection failed");
});