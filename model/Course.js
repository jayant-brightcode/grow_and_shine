import mongoose from "mongoose";



const CourseSchema = new mongoose.Schema({

   name:{
    type:String,
    required:true
   },

   course_image:{
    type:String,
    default:""
   },
   cat_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category",
    required:true
   }

   


},{
    timestamps:true
})


const courseModel = mongoose.model("course",CourseSchema)
export default courseModel