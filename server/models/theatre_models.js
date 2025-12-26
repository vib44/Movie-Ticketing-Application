const mongoose=require("mongoose")

const theatreSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId, //Field will store an objectId value(unique)
            ref: "User", //This objectId belongs to 'User' collection. Like FK in RDBMS
            required:true,
        },
        address:{
            type: String,
            required: true
        },
         email:{
            type: String,
            required: true
        },
        phone:
        {
            type:"String",
            required:true
        },
        isActive:{type: Boolean,
            default:false,
        },
         
    },{timestamps: true})

    const theatre=mongoose.model('theatre',theatreSchema)

    module.exports=theatre;