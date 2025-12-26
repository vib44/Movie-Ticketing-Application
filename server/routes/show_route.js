const express= require("express")
const Show = require("../models/Show_models")
const { addShows, updateShow, deleteShow,
     getAllShows, getShowById}= require("../controllers/Show_controllers")


const ShowRouter= express.Router();

//create a Show

ShowRouter.post("/add",addShows)

//update
ShowRouter.put("/update",updateShow)

//delete
ShowRouter.delete("/delete/:id",deleteShow)

//get all Shows
ShowRouter.get("/get-all-theatres-by-movie",getAllShows)

//get Show by id
ShowRouter.get('/get-show-by-id',getShowById)

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

module.exports= ShowRouter;