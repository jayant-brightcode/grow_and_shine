import mongoose from "mongoose";


const FavUniversitySchema  = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"university",
        required:true
    }
},{
    timestamps:true
})


const favUniversityModel  = mongoose.model("fav_university",FavUniversitySchema)
export default favUniversityModel