import mongoose from "mongoose";



const TestimonialSchema = new mongoose.Schema({



    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"university",
        required:true
    },
    desc:{
        type:String,
        required:true
    }
   





},{
    timestamps:true
})


const testimonialModel = mongoose.model("testimonial",TestimonialSchema)

export default testimonialModel