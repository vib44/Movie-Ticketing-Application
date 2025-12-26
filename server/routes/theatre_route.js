const express= require("express")
const Theatre = require("../models/theatre_models")
const { addTheatres, updateTheatre, deleteTheatre,
     getAllTheatres, getTheatreById}= require("../controllers/theatre_controllers")


const TheatreRouter= express.Router();

//create a Theatre

TheatreRouter.post("/add",addTheatres)

//update
TheatreRouter.put("/update",updateTheatre)

//delete
TheatreRouter.delete("/delete/:id",deleteTheatre)

//get all Theatres
TheatreRouter.get("/all",getAllTheatres)

//get Theatre by id
TheatreRouter.get('/:id',getTheatreById)

//get all theatres by owners

TheatreRouter.post("/get-all-theatres-by-owners", async(req,res)=>
{
    try {
        const response= await Theatre.find({owner: req.body.owner})
        res.send({
            success:true,
            message: "All theatres fetched successfully",
            data: response
        })
    } catch (error) {
        console.log("Fetch thetares error",error)
        res.send({
            success:false,
            message: "Something went wront. Unable to fetch theatres",
        })
    }
})

module.exports= TheatreRouter;