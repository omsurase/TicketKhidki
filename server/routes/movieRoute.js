const router = require('express').Router();
const Movie = require('../models/movieModel');
const authMiddleware = require('../middleware/authMiddleware');
//add new movie

router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added successfully"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
});

router.get('/get-all-movies', authMiddleware, async (req, res) => {
    try {
        //console.log("hi");
        const movies = await Movie.find();

        res.send({
            success: true,
            message: "Movie fetched successfully",
            data: movies
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
});
module.exports = router;