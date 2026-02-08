const express= require("express")
const Show = require("../models/show_models")
const isAuth=require("../middlewares/authMiddleware.js")
const {requiredAdminOrPartner}=require("../middlewares/roleMiddleware.js")
const { addShows, updateShow, deleteShow,
     getAllShows, getShowById}= require("../controllers/show_controllers.js")


const ShowRouter= express.Router();

//create a Show

ShowRouter.post("/add",isAuth,requiredAdminOrPartner,addShows)

//update
ShowRouter.put("/update",isAuth,requiredAdminOrPartner,updateShow)

//delete
ShowRouter.delete("/delete",isAuth,requiredAdminOrPartner,deleteShow)

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

ShowRouter.post("/get-all-shows",isAuth,requiredAdminOrPartner,async(req,res)=>
{
    try {
        //Security: Partners can only see shows from their theatres
        if(req.user.role==="partner" && req.body.theatreId)
    {   
        const Theatre= require("../models/theatre_model.js")
        const theatre= await Theatre.findById(req.body.theatreId)
        if(theatre && theatre.owner.toString()!==req.userId)

         return res.send({
success: false,
message: "Access denied. You can only update shows for your theatres"})
}
         
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