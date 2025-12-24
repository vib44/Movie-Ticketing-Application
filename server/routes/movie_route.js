const express= require("express")
const Movie = require("../models/movie_models")

const movieRouter= express.Router();

//create a movie

movieRouter.post("/add",async(req,res)=>
{
    try {
        const newMovie= new Movie(req.body);
        await newMovie.save()

        res.status(200).send(
            {
                success: true,
                message: "New movie added",
                movie: newMovie
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to add movie",
            }
        )
    }
})

//update
movieRouter.put("/update/:id",async(req,res)=>
{
    try {
        const movieId= req.params.id;
        const movie= await Movie.findByIdAndUpdate(movieId, req.body)
       res.status(200).send(
            {
                success: true,
                message: "Movie Updated successfully",
                movieId: movieId
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to update movie",
            }
        )}
})

//delete
movieRouter.delete("/delete/:id",async(req,res)=>
{
    try {
        const movieId= req.params.id;
        const movie= await Movie.findByIdAndDelete(movieId)
       res.send(
            {
                success: true,
                message: "Movie Deleted successfully",
                movie: movie
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to delete movie",
            }
        )}
})

//get all movies
movieRouter.get("/all",async(req,res)=>
{
    try {
        const allMovies= await Movie.find();
        
       res.send(
            {
                success: true,
                message: "Movies fetched successfully",
                data: allMovies
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch movie",
            }
        )}
})

//get movie by id
movieRouter.get('/:id',async(req,res)=>
{
    try {
        const movieId= req.params.id;
        const movie= await Movie.findById(movieId, req.body)
       res.status(200).send(
            {
                success: true,
                message: "Movie fetched successfully",
                movie: movie
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch movie",
            }
        )}
})
module.exports= movieRouter;