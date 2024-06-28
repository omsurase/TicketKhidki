const router = require("express").Router();
const Theater = require('../models/theaterModel');
const authMiddleware = require('../middleware/authMiddleware');
const { response } = require("express");
const Show = require("../models/showModel");

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
router.get("/get-all-theater", authMiddleware, async (req, res) => {
    try {
        const theaters = await Theater.find().sort({ createdAt: -1 });
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
        const theaters = await Theater.find({ owner: req.body.owner }).sort({ createdAt: -1 });
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

//Get all uniques theaters which have shows of a movie
router.post("/get-all-theaters-by-movie", authMiddleware, async (req, res) => {
    try {
        const { movie, date } = req.body;
        // this will include duplicate theaters too where multiple shows of same movie are present at different times
        const shows = await Show.find({ movie, date }).populate('theater').sort({ createdAt: -1 });

        //get all unique theaters
        let uniqueTheaters = [];

        shows.forEach((show) => {
            const theater = uniqueTheaters.find((theater) => theater._id == show.theater._id);

            if (!theater) {
                const showsForThisTheater = shows.filter((showObj) => showObj.theater._id == show.theater._id);
                uniqueTheaters.push({
                    ...show.theater._doc,
                    shows: showsForThisTheater
                });
            }

        });

        res.send({
            success: true,
            message: "Shows fetched successfully",
            data: uniqueTheaters,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    };
});

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

//delete theater
router.post("/delete-theater", authMiddleware, async (req, res) => {
    try {
        await Theater.findByIdAndDelete(req.body.theaterId);
        res.send({
            success: true,
            message: "Theater deleted Successfully"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


//add Show
router.post("/add-show", authMiddleware, async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success: true,
            message: "Show added successfully",
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    };
});

//get all shows by theater
router.post("/get-all-shows-by-theater", authMiddleware, async (req, res) => {
    try {
        const shows = await Show.find({ theater: req.body.theaterId }).populate('movie').sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Shows fetched successfully",
            data: shows
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    };
})

//delete a show 
router.post("/delete-show", authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId);
        res.send({
            success: true,
            message: "Show deleted Successfully"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

//get show by id

router.post("/get-shows-by-id", authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById(req.body.showId).populate("movie").populate("theater");
        res.send({
            success: true,
            message: "Show fetched successsfully",
            data: show,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
     }
});


module.exports = router