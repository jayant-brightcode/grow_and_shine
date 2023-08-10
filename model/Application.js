import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({


   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
   course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course"
   },
   university:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"university"
   }




},{
    timestamps:true
})


const applicationModel = mongoose.model("application",ApplicationSchema)
export default applicationModel