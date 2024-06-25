const express = require('express');
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoutes = require("./routes/usersRoute"); 

app.use("/api/users",userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server  is running on port ${port}`))