const Show = require("../models/show_models")
const addShows=async(req,res)=>
{
    try {
        //Security: Partners can only add shows to their theatres
        if(req.user.role==="partner" && req.body.theatre)
        {
            const Theatre=require("../models/theatre.model.js")
            const theatre= await Theatre.findById(req.body.theatre)
            if(theatre && theatre.owner.toString()!==req.userId)
            {
                return res.send({
                    success: false,
                    message: "Access denied. You can only add shows to your own theatres."
                })
            }
        }
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
       const show= await Show.findById(req.body.showId).populate("theatre")
   
if(!show)
    return res.send({
success: false,
message: "Show not found"})

//Security : Partners can only update shows from their own theatres
if(req.user.role==="partner" && show.theatre.owner.toString()!==req.userId)
     return res.send({
success: false,
message: "Access denied. You can only update shows for your theatres"})

await Show.findByIdAndUpdate(req.body.showId, req.body)
       res.send(
            {
                success: true,
                message: "Show Updated successfully",
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "error.message",
            }
        )}
}

const deleteShow=async(req,res)=>
{
    try {
       const show=await Show.findById(req.body.showId).populate("theatre")
       if(!show){
        return res.send({
            success:false,
            message: "Show not found",
        })
       }

       //Security : Partners can only delete shows from their own theatres
       if(req.user.role==="partner" && show.theatre.owner.toString()!==req.userId)
        return res.send({
    success: false,
message: "Access denied. You can only delete shows from your own thetares."})
        
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
                message: error.message,
            }
        )}
    }


//get all shows & theatres for a movie
const getAllShows=async(req,res)=>
{
    try {
        const {movie, date}=req.body
        const allShows= await Show.find({movie, date}).populate("theatre");
        
        console.log("allshows",allShows)
       //map shows with unique theatres
       const theatreMap = {}

allShows.forEach(show => {
  const theatreId = show.theatre._id

  if (!theatreMap[theatreId]) {
    theatreMap[theatreId] = {
      ...show.theatre._doc,
      shows: []
    }
  }

  theatreMap[theatreId].shows.push(show)
})

const uniqueTheatres = Object.values(theatreMap)
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
                message: error.message,
            }
        )}
}
//get details of a show by Id
const getShowById=async(req,res)=>
{
    try {
        
        const show= await Show.findById(req.body.showId)
        .populate("movie")
        .populate("theatre")
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
                message: error.message,
            }
        )}
}
module.exports={ addShows, updateShow, deleteShow, getAllShows, getShowById}