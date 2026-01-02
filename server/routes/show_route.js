const express= require("express")
const Show = require("../models/show_models")
const { addShows, updateShow, deleteShow,
     getAllShows, getShowById}= require("../controllers/show_controllers")


const ShowRouter= express.Router();

//create a Show

ShowRouter.post("/add",addShows)

//update
ShowRouter.put("/update",updateShow)

//delete
ShowRouter.delete("/delete/:id",deleteShow)

//get all Shows
ShowRouter.post("/get-all-theatres-by-movie",getAllShows)

//get Show by id
ShowRouter.post('/get-show-by-id',getShowById)

//get all Shows by owners

ShowRouter.post("/get-all-shows-by-owners", async(req,res)=>
{
    try {
        const response= await Show.find({owner: req.body.owner})
        res.send({
            success:true,
            message: "All Shows fetched successfully",
            data: response
        })
    } catch (error) {
        console.log("Fetch thetares error",error)
        res.send({
            success:false,
            message: "Something went wront. Unable to fetch Shows",
        })
    }
})

//get all shows for a partner

ShowRouter.post("/get-all-shows",async(req,res)=>
{
    try {
        const allShows=await Show.find({theatre: req.body.theatreId})
        .populate("movie").populate("theatre");
        res.send({
            success: true,
            message: "All shows fetched successfully",
            data: allShows
        })
    } catch (error) {
        res.send({
            success: false,
            message: `Not able to fetch shows ${error}`
        })
    }
})

module.exports= ShowRouter;