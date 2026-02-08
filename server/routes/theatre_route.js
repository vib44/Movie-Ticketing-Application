const express= require("express")
const Theatre = require("../models/theatre_models")
const { addTheatres, updateTheatre, deleteTheatre,
     getAllTheatres, getTheatreById}= require("../controllers/theatre_controllers")
const isAuth= require("../middlewares/authMiddleware.js")
const {requiredAdminOrPartner}=require("../middlewares/roleMiddleware.js")

const TheatreRouter= express.Router();

//create a Theatre

TheatreRouter.post("/add",isAuth,requiredAdminOrPartner,addTheatres)

//update
TheatreRouter.put("/update",isAuth,requiredAdminOrPartner,updateTheatre)

//delete
TheatreRouter.delete("/delete",isAuth,requiredAdminOrPartner,deleteTheatre)

//get all Theatres
TheatreRouter.get("/all",isAuth,requiredAdminOrPartner,getAllTheatres)

//get Theatre by id
TheatreRouter.get('/:id',getTheatreById)

//get all theatres by owners

TheatreRouter.post("/get-all-theatres-by-owners",isAuth,requiredAdminOrPartner, async(req,res)=>
{
    try {
        const userId=req.userId;
        const requestedOwnerId=req.body.owner;

        //Security: Partners can only see their own theatres, Admins can see any
        if(req.user.role==="partner" && requestedOwnerId!==userId)
            return res.send({
        success: false,
    message: "Access denied. You can only view your own theatres."})
    console.log("Getting theatres for owner:", requestOwnerId)
    const allTheatres=await Theatre.find({owner: requestedOwnerId})
    console.log("Found theatres:", allTheatres.length)

            res.send({
            success:true,
            message: "All theatres fetched successfully",
            data: allTheatres
        })
    } catch (error) {
        console.log("Fetch thetares error",error)
        res.send({
            success:false,
            message: error.message
        })
    }
})

module.exports= TheatreRouter;