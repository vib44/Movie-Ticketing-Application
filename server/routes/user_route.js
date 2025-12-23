const express=require("express")
const bcrypt=require("bcrypt");
const User=require("../models/user_models.js")

const userRouter= express.Router();// router form exprrss
const jwt= require("jsonwebtoken")

const isAuth = require("../middlewares/authMiddleware.js")

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
        //hashing pwd
        const salt=await bcrypt.genSalt() //default 10 rounds
        const hashedpwd=bcrypt.hashSync(req.body.password,salt)
        req.body.password=hashedpwd;
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


//user login 

userRouter.post("/login",async(req,res)=>
{
    try{
        const user= await User.findOne({email: req.body.email})
        if(!user)
        {
            return res.status(401).send(
                {
                    success: false,
                    message: "User does not exist. Please register"
                }
            )
        }

        //RETURNS PROMISE
        const isvalidpassword=await bcrypt.compare(req.body.password,user.password)
        console.log(isvalidpassword, ` ${user.password}`)
        if(!isvalidpassword)
            return res.status(401).send({
             success: false,
             message: "Password is incorrect"})
    
    const token= jwt.sign({userId: user._id},process.env.JWT_SECRET,
        {expiresIn:"7d"}) 
        
    res.cookie("jwtToken",token,{httpOnly: true})    
    
    return res.status(200).send(
        {success: true,
         message: "Logged in successfully",
         token: token,
         user: user})
    }
    catch(err)
    {
        console.log("Error",err)
        return res.status(500).json({message: "Something went wrong"})
    }
    
})

userRouter.get("/current-user",isAuth,async(req,res)=>
    {
        const userId=req.userId;
        if(!userId)
        {
            return res.send(401).json({
                message: "Not authorized. No valid token"
            })
        }
        try
        {
            const verifiedUser= await User.findById(userId).select("-password")
            console.log(verifiedUser)   
            res.json(verifiedUser) 
        }  
        catch(error)
    {
        console.log("Error",error)
        res.status(500).json({message: "Something went wrong"})
    }  });

module.exports=userRouter;