 const User= require("../models/user_models.js")

 const requiredRole= (...allowedRoles)=>{
 return async(req,res,next)=>{
    try {
          const user= await User.findById(req.userId).select("-password")
          if(!user)
                return res.status(401).send({
                success: false,
                message: "User does not exist"
                }) 
          if(!allowedRoles.includes(user.role))
                return res.status(403).send({
            success: true,
            message: "Access denied. Insufficient Permissions"
            })      
        
            req.user=user;
            next()
    } catch (error) {
        console.error(error.message)
        return res.status(500).send({
            success: false,
            message: "Access error"
        })
    }
 
 }
 }

 // Each Middlewares to check if 
 // user is a regular user/admin/partner/partner or admin

 const requiredUser=requiredRole("user")
 const requiredPartner=requiredRole("partner")
 const requiredAdmin=requiredRole("admin")
 const requiredAdminOrPartner=requiredRole("partner","admin")

 module.exports={requiredRole,
    requiredUser,
    requiredPartner,
    requiredAdmin,
    requiredAdminOrPartner
 }
