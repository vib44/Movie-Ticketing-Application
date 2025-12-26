const mongoose=require("mongoose")

const movieSchema=new mongoose.Schema(
    {
        title:{
            type: String,
            required:true
        },
        genre:{type: String,
            required:true,
        },
        duration:{
            type: Number,
            required: true
        },
         rating:{
            type: Number,
        },
        description:{type: String,
            required:true,
        },
        posterPath:{type: String,
            required:true,
        },
        language:{type: String,
            required:true,
        },
        releaseDate:{type: Date,
            required:true,
        },
         
    },{timestamps: true})

    const movie=mongoose.model('movie',movieSchema)

    module.exports=movie;