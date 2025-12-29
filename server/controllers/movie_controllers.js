const Movie = require("../models/movie_models")

const addMovies=async(req,res)=>
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
            })
    }
}

const updateMovie=async(req,res)=>
{
    try {
       // const movieId= req.params.id;
        const movie= await Movie.findByIdAndUpdate(req.body.movieId, req.body)
       res.status(200).send(
            {
                success: true,
                message: "Movie Updated successfully",
                movie: movie
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to update movie",
            }
        )}
}

const deleteMovie=async(req,res)=>
{
    try {
        //const movieId= req.params.id;
        const movie= await Movie.findByIdAndDelete(req.body.movieId)
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
}

const getAllMovies=async(req,res)=>
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
}

const getMovieById=async(req,res)=>
{
    try {
        const movieId= req.params.id;
        const movie= await Movie.findById(movieId, req.body)
       res.status(200).send(
            {
                success: true,
                message: "Movie fetched successfully",
                data: movie
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch movie",
            }
        )}
}
module.exports={ addMovies, updateMovie, deleteMovie, getAllMovies, getMovieById}