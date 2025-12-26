const Theatre = require("../models/theatre_models")
const addTheatres=async(req,res)=>
{
    try {
        const newTheatre= new Theatre(req.body);
        await newTheatre.save()

        res.status(200).send(
            {
                success: true,
                message: "New Theatre added",
                Theatre: newTheatre
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to add Theatre",
            })
    }
}

const updateTheatre=async(req,res)=>
{
    try {
       // const TheatreId= req.params.id;
        const Theatre= await Theatre.findByIdAndUpdate(req.body.TheatreId, req.body)
       res.status(200).send(
            {
                success: true,
                message: "Theatre Updated successfully",
                Theatre: Theatre
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to update Theatre",
            }
        )}
}

const deleteTheatre=async(req,res)=>
{
    try {
        //const TheatreId= req.params.id;
        const Theatre= await Theatre.findByIdAndDelete(req.body.TheatreId)
       res.send(
            {
                success: true,
                message: "Theatre Deleted successfully",
                Theatre: Theatre
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to delete Theatre",
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
                message: "Failed to fetch Theatre",
            }
        )}
}

const getTheatreById=async(req,res)=>
{
    try {
        const TheatreId= req.params.id;
        const Theatre= await Theatre.findById(TheatreId, req.body)
       res.status(200).send(
            {
                success: true,
                message: "Theatre fetched successfully",
                Theatre: Theatre
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