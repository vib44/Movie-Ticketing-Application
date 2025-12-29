const mongoose=require("mongoose")

const showSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        
        date:{
            type: Date,
            required: true
        },
         time:{
            type: String,
            required: true
        },
        totalSeats:
        {
            type:Number,
            required:true
        },
        bookedSeats:{type: Array,
            required:false,
        },
         ticketPrice:
        {
            type:Number,
            required:true
        },
         movie:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "movie",
            required:true
        },
         theatre:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "theatre",
            required:false
        },
         
    },{timestamps: true})

    const Show=mongoose.model('show',showSchema)

    module.exports=Show;