import mongoose from "mongoose";




const CitySchema  = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const cityModel  = mongoose.model("city",CitySchema)
export default cityModel