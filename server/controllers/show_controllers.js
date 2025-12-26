const Show = require("../models/show_models")
const addShows=async(req,res)=>
{
    try {
        const newShow= new Show(req.body);
        await newShow.save()

        res.status(200).send(
            {
                success: true,
                message: "New Show added",
                data: newShow
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to add Show",
            })
    }
}

const updateShow=async(req,res)=>
{
    try {
       // const ShowId= req.params.id;
       const showUpdated= await Show.findByIdAndUpdate(req.body.showId,req.body)
       res.send(
            {
                success: true,
                message: "Show Updated successfully",
                data: showUpdated
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to update Show",
            }
        )}
}

const deleteShow=async(req,res)=>
{
    try {
        //const ShowId= req.params.id;
        await Show.findByIdAndDelete(req.body.showId)
       res.send(
            {
                success: true,
                message: "Show Deleted successfully",
              
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to delete Show",
            }
        )}
}

//get all shows & theatres for a movie
const getAllShows=async(req,res)=>
{
    try {
        const {movie, date}=req.body
        const allShows= await Show.find({movie, date});
        
       res.send(
            {
                success: true,
                message: "Shows fetched successfully",
                data: allShows
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch Show",
            }
        )}
}
//get details of a show by Id
const getShowById=async(req,res)=>
{
    try {
        
        const show= await Show.findById(req.body.showId)
       res.status(200).send(
            {
                success: true,
                message: "Show fetched successfully",
                data: show
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch Show",
            }
        )}
}
module.exports={ addShows, updateShow, deleteShow, getAllShows, getShowById}