const express= require("express")
const Movie = require("../models/movie_models")
const { addMovies, updateMovie, deleteMovie, getAllMovies, getMovieById}= require("../controllers/movie_controllers")


const movieRouter= express.Router();

//create a movie

movieRouter.post("/add",addMovies)

//update
movieRouter.put("/update",updateMovie)

//delete
movieRouter.delete("/delete/:id",deleteMovie)

//get all movies
movieRouter.get("/all",getAllMovies)

//get movie by id
movieRouter.get('/:id',getMovieById)

module.exports= movieRouter;