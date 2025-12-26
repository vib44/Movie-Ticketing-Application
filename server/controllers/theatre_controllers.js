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
                data: newTheatre
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
       // const theatreId= req.params.id;
       const theatreUpdated= await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
       res.send(
            {
                success: true,
                message: "Theatre Updated successfully",
                data: theatreUpdated
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
        //const theatreId= req.params.id;
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