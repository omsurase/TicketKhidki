const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//register a new user

router.post("/register", async (req, res) => {
    try {
        //check if user exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) { 
            return res.send({
                success: false,
                message:"User already exits"
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;


        //save the user
        const newUser = new User(req.body);
        await newUser.save();

        res.send({success: true, message:"User created Successfully"});

    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;