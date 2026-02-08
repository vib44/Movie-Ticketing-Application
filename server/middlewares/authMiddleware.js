const jwt=require("jsonwebtoken")
const User= require("../models/user_models.js")

const isAuth= async(req, res, next)=>
{
    const token=req.cookies.jwtToken;
    if(!token)
        return res.status(401).json(
    {
        success: false,
        message: "User not authorized, no token!"
    })

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId;

        //Optionally attach user data to request
        const user= await User.findById(decoded.userId).select("-password")
        if(user)
            req.user=user

        next();
    } catch (error) {
        return res.status(500).json(
            {
                sucess:false,
                message:"Something went wrong"})
    }
}

module.exports=isAuth;