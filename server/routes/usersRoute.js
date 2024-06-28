const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');

//register a new user

router.post("/register", async (req, res) => {
    try {
        //check if user exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            //user already exists
            return res.send({
                success: false,
                message: "User already exits"
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;


        //save the user
        const newUser = new User(req.body);
        await newUser.save();

        res.send({ success: true, message: "Registration Successfull, please login." });

    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


//login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            //user not exits
            return res.send({
                succes: false,
                message: "User does not exist"
            });
        }

        //compare password 
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password"
            });
        }
        // Generate jwt token

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.send({
            succes: true,
            message: "User logged in successfully",
            data: token
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


//get user details by id
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        //console.log("/get-current-user");
        const user = await User.findById(req.body.userId);
        //console.log(user);
        if (user) {
            res.send({
                success: true,
                message: "User Found",
                data: user
            })
        } else {
            res.send({
                success: false,
                message: "User not Found",
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;