import mongoose from "mongoose";


const TopEngineeringSchema = new mongoose.Schema({

   university:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"university"

    }
   ]

    


},{
    timestamps:true
})

const topEngineerignModel = mongoose.model("top_engineering",TopEngineeringSchema)
export default topEngineerignModel