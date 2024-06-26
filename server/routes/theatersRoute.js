const router = require("express").Router();
const Theater = require('../models/theaterModel');
const authMiddleware = require('../middleware/authMiddleware');
const { response } = require("express");


//Add a theater
router.post("/add-theater", authMiddleware, async (req, res) => {
    try {
        const newTheater = new Theater(req.body);
        await newTheater.save();
        res.send({
            success: true,
            message: "Theater added successfully",
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    };
})

//Get all theaters
router.post("/get-all-theater", authMiddleware, async (req, res) => {
    try {
        const theaters = await Theater.find().sort({createdAt: -1});
        res.send({
            success: true,
            message: "Theaters fetched successfully",
            data: theaters
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    };
})

//Get all theaters by Owner
router.post("/get-all-theater-by-owner", authMiddleware, async (req, res) => {
    try {
        const theaters = await Theater.find({ owner: req.body.owner }).sort({createdAt: -1});
        res.send({
            success: true,
            message: "Theaters fetched successfully",
            data: theaters
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    };
})

//update theater
router.post("/update-theater", authMiddleware, async (req, res) => {
    try {
        await Theater.findByIdAndUpdate(req.body.theaterId, req.body);
        res.send({
            success: true,
            message: "Theater updated Successfully"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

module.exports = router