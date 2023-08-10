import mongoose from "mongoose";



const RatingSchema = new mongoose.Schema({



    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"university"
    },
    rating:{
        type:Number,
        max:5,
        min:1
    },
    review:{
        type:String
    }






},{
    timestamps:true
})


const ratingModel = mongoose.model("rating",RatingSchema)

export default ratingModel