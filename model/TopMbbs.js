import mongoose from "mongoose";


const TopMbbsSchema = new mongoose.Schema({

   university:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"university"

    }
   ]

    


},{
    timestamps:true
})

const topMbbsModel = mongoose.model("top_mbbs",TopMbbsSchema)
export default topMbbsModel