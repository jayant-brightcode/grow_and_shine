import mongoose from "mongoose";


const CounsellingSchema  = new mongoose.Schema({
    datetime:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    office_location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"city"
    },
    counselling_type:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{
    timestamps:true
})


const cousellingModel  = mongoose.model("counselling",CounsellingSchema)
export default cousellingModel