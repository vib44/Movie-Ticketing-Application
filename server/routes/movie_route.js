const express= require("express")
const Movie = require("../models/movie_models.js")
const { addMovies, updateMovie, deleteMovie, getAllMovies, getMovieById}= require("../controllers/movie_controllers.js")
const isAuth=require("../middlewares/authMiddleware.js")
const {requiredAdmin}=require("../middlewares/roleMiddleware.js")
const movieRouter= express.Router();

//create a movie

movieRouter.post("/add", isAuth, requiredAdmin, addMovies)

//update
movieRouter.put("/update", isAuth, requiredAdmin, updateMovie)

//delete
movieRouter.delete("/delete/:id", isAuth, requiredAdmin, deleteMovie)

//get all movies
movieRouter.get("/all", getAllMovies)

//get movie by id
movieRouter.get('/:id', getMovieById)

module.exports= movieRouter;