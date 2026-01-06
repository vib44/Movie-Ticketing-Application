const Show = require("../models/show_models")
const addShows=async(req,res)=>
{
    try {
        const newShow= new Show(req.body);
        await newShow.save()
        console.log(newShow)
        res.send(
            {
                success: true,
                message: "New Show added",
                data: newShow
            }
        )
    } catch (error) {
        res.send(
            {
                success: false,
                message: error.message,
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
        const allShows= await Show.find({movie, date}).populate("theatre").populate("movie");
        
        console.log("allshows",allShows)
       //map shows with unique theatres
        let uniqueTheatres=[]
        allShows.forEach((show)=>{
            let isTheatre= uniqueTheatres.find((theatre)=>
            theatre._id===show.theatre._id)

        if(!isTheatre)
        {
            let showsofThisTheatre= allShows.filter((showObj)=>
                showObj.theatre._id==show.theatre._id
            )
            uniqueTheatres.push({
                ...show.theatre._doc,
                shows: showsofThisTheatre
            })
        } })
       res.send(
            {
                success: true,
                message: "Shows fetched successfully",
                data: uniqueTheatres
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
        
        const show= await Show.findById(req.body.id)
        .populate("theatre")
        .populate("movie")
       res.send(
            {
                success: true,
                message: `Show fetched successfully`,
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