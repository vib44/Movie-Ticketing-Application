const mongoose=require("mongoose");

const connectDb= async()=>
{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to Db")        
    } catch (error) {
        console.log("Error in DB connection", error)
    }
}

module.exports={connectDb};