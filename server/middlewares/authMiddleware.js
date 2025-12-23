const jwt=require("jsonwebtoken")

const isAuth= async(req, res, next)=>
{
    const token=req.cookies.jwtToken;
    if(!token)
        return res.status(401).json(
    {
        message: "User not authorized"
    })

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

module.exports=isAuth;