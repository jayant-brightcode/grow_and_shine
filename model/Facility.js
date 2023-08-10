import mongoose from "mongoose"

const FacilitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    photo:{
        type:String
    }
})

const FacilityModel = mongoose.model("facility",FacilitySchema)
export default FacilityModel