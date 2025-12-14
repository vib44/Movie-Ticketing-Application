const express=require("express")

const User=require("../models/user_models.js")

const userRouter= express.Router();// router form exprrss

//register API

userRouter.post("/register", async(req,res)=>
{
    try {
        const queryUser= await User.findOne({email: req.body.email})

        if(queryUser)
        {
            res.send(
                
                {
                    success: false,
                    message: "User already exists with this email"
                })
        }
        const newUser= await User(req.body);
        await newUser.save();
        res.send(
            {
                success: true,
                message: "User registered successfully",
                user: newUser
            })
    } catch (error) {
        console.log("error",error)
        res.status(500).json({message: "Something went wrong"})        
    }
})

module.exports=userRouter;