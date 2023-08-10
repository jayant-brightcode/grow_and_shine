import mongoose from "mongoose";


const TopUniversitySchema = new mongoose.Schema({

   university:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"university"

    }
   ]

    


},{
    timestamps:true
})

const topUniversityModel = mongoose.model("top_university",TopUniversitySchema)
export default topUniversityModel