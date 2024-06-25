const express = require('express');
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const userRoutes = require("./routes/usersRoute"); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users",userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server  is running on port ${port}`))