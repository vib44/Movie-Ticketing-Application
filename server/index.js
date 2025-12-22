const express=require("express");
const app=express();
const dbConfig=require("./dbConfig.js")
const dotEnv= require("dotenv")
const cors= require("cors")

dotEnv.config();
dbConfig.connectDb()

const userRoutes=require("./routes/user_route.js")

app.use(express.json())


app.use(cors({origin: "http://localhost:5173"}))

app.use("/api/auth",userRoutes)


app.listen(8001,()=>
{
    console.log("Server started...")
})