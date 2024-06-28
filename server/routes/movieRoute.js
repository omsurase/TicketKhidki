const router = require('express').Router();
const Movie = require('../models/movieModel');
const authMiddleware = require('../middleware/authMiddleware');
const redisClient = require('../config/redisConfig');


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


// router.get('/get-all-movies', authMiddleware, async (req, res) => {
//     try {
//         //console.log("hi");
//         const movies = await Movie.find().sort({ createdAt: -1 });

//         res.send({
//             success: true,
//             message: "Movie fetched successfully",
//             data: movies
//         });
//     } catch (err) {
//         res.send({
//             success: false,
//             message: err.message,
//         });
//     }
// });

//fetch movies
router.get('/get-all-movies', authMiddleware, async (req, res) => {
    try {
        const cacheKey = 'movies';

        // Check Redis cache
        const cachedMovies = await redisClient.get(cacheKey);
        if (cachedMovies) {
            // If movies are found in cache
            return res.send({
                success: true,
                message: "Movies fetched successfully from cache",
                data: JSON.parse(cachedMovies)
            });
        } else {
            // If movies are not found in cache, query MongoDB
            const movies = await Movie.find().sort({ createdAt: -1 });

            // Store the result in Redis cache
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(movies)); // 3600 seconds = 1 hour

            return res.send({
                success: true,
                message: "Movies fetched successfully from database",
                data: movies
            });
        }
    } catch (err) {
        return res.send({
            success: false,
            message: err.message,
        });
    }
});

//update movie
router.post("/update-movie", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated Successfully"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});


// delete a movie
router.post('/delete-movie', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: "Movie deleted Successfully"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

//get movie by id

router.post("/get-movie-by-id/:id", authMiddleware, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched successfully.",
            data: movie
        });
    } catch (err) {
        res.send({
            success: false,
            message: "Movie fetched unsuccessfully.",
        });
      };
});

module.exports = router;