const Theatre = require("../models/theatre_models")
const isAuth=require("../middlewares/authMiddleware.js")
const {requirePartnerOrAdmin}=require("../middlewares/roleMiddleware.js")
const addTheatres=async(req,res)=>
{
    try {
        console.log("Received theatre data:", req.body)
        //Security: Partners can only add theatres with themselves as owner
        if(req.user.role==="partner")
            req.body.owner=req.userId 

        const newTheatre= new Theatre(req.body);
        const savedTheatre=await newTheatre.save()
        console.log("Saved theatre:",savedTheatre)

        res.status(200).send(
            {
                success: true,
                message: "New Theatre added",
                data: savedTheatre
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "error.message",
            })
    }
}

const updateTheatre=async(req,res)=>
{
    try {
       // const theatreId= req.params.id;
       const theatre=await Theatre.findById(req.body.theatreId)
       if(!theatre)
        return res.send({
    success: false,
message: "Theatre not found"})
        //Security: Partners can only update their own theatres
        if(req.user.role==="partner" && theatre.owner.toString()!==req.userId)
            return res.send({
        success: false,
    message: "Access denied. You can only update your theatres"})
           
    await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
       res.send(
            {
                success: true,
                message: "Theatre Updated successfully",
               
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

const deleteTheatre=async(req,res)=>
{
    try {
        //const theatreId= req.params.id;
       const theatre= await Theatre.findById(req.body.theatreId)
       if(!theatre)
        return res.send({
    success: false,
message: "Theatre not found"})

//Security: Partners can only delete their own theatres
if(req.user.role==="Partner" && theatre.owner.toString()!==req.userId)
    return res.send({
success: false,
message: "Access denied. You can only delete your theatres"})
       
await Theatre.findByIdAndDelete(req.body.theatreId)
res.send(
            {
                success: true,
                message: "Theatre Deleted successfully",
              
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

const getAllTheatres=async(req,res)=>
{
    try {
        const allTheatres= await Theatre.find();
        
       res.send(
            {
                success: true,
                message: "Theatres fetched successfully",
                data: allTheatres
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

const getTheatreById=async(req,res)=>
{
    try {
        
        const theatre= await Theatre.findById(req.body.theatreId)
       res.status(200).send(
            {
                success: true,
                message: "Theatre fetched successfully",
                theatre: theatre
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch Theatre",
            }
        )}
}
module.exports={ addTheatres, updateTheatre, deleteTheatre, getAllTheatres, getTheatreById}