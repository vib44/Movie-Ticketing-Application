const express = require("express")
const bcrypt = require("bcrypt");
const User = require("../models/user_models.js")

const jwt = require("jsonwebtoken")

const isAuth = require("../middlewares/authMiddleware.js")
const userRouter = express.Router();// router form express

//register API

userRouter.post("/register", async (req, res) => {
    try {
// Prevent admin registration through API
        if(req.body.role==="admin")
        {
            return res.send({
                success:  false,
                message: "Admin registration is not allowed through this endpoint"
            })
        }

        const queryUser = await User.findOne({ email: req.body.email })

        if (queryUser) {
            res.send(

                {
                    success: false,
                    message: "User already exists with this email"
                })
        }

        //Set default role to 'user' if not provided or if invalid
        const allowedRoles=["user","partner"]
        if(!req.body.role || !allowedRoles.includes(req.body.role))
                req.body.role="user"

        //hashing pwd
        const salt = await bcrypt.genSalt() //default 10 rounds
        const hashedpwd = bcrypt.hashSync(req.body.password, salt)
        req.body.password = hashedpwd;
        const newUser = await User(req.body);
        await newUser.save();
        res.send(
            {
                success: true,
                message: "User registered successfully",
                user: newUser
            })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ 
            sucess: false,
            message: error.message || "Registration failed" })
    }
})


//user login 

userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).send(
                {
                    success: false,
                    message: "User does not exist. Please register"
                }
            )
        }

        //RETURNS PROMISE
        const isvalidpassword = await bcrypt.compare(
            req.body.password,
             user.password
            )
 
        if (!isvalidpassword)
            return res.status(401).send({
                success: false,
                message: "Password is incorrect"
            })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,
            { expiresIn: "10d" })

        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })
        /*
        httpOnly: true
        Prevents JavaScript (e.g., document.cookie) from accessing the token. This is a best practice to mitigate XSS attacks.
        
        secure: process.env.NODE_ENV === "production"
        The cookie will only be sent over HTTPS in production.
        In development (HTTP), the cookie will still be set.
        
        sameSite: "lax"
        The cookie is:
        
        Sent on same-site requests
        
        Sent on top-level navigations (e.g., clicking a link)
        
        Not sent on most cross-site POST, PUT, DELETE requests*/

        return res.status(200).send(
            {
                success: true,
                message: "Logged in successfully",
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
    }
    catch (err) {
        console.log("Error", err)
        return res.status(500).json({ message: "Something went wrong" })
    }

})

userRouter.get("/current-user", isAuth, async (req, res) => {

    try {
        const verifiedUser = await User.findById(req.userId).select("-password")
        console.log(verifiedUser)
        if (!verifiedUser) {
            return res.status(404).json({
                success: false,
                message: "Not authorized. No valid token"
            })
        }
        return res.status(200).json({
            _id: verifiedUser._id,
            name: verifiedUser.name,
            email: verifiedUser.email,
            role: verifiedUser.role,
        })
    }
    catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: "Something went wrong" })
    }
});


//Logout

userRouter.post("/logout", isAuth, async (req, res) => {
    try {
        res.clearCookie("jwtToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })
        res.send({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging out"
        })
    }
})


module.exports = userRouter;