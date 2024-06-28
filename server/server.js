const express = require('express');
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const userRoutes = require("./routes/usersRoute"); 
const cors = require('cors');
const movieRoutes = require("./routes/movieRoute");
const theaterRoutes = require("./routes/theatersRoute");
const app = express();
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());
app.use(cors());


app.use("/api/users",userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theaters",theaterRoutes);
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server  is running on port ${port}`))