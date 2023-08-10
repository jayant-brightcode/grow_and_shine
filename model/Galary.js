import mongoose from "mongoose";




const GalarySchema = new mongoose.Schema({
  
    photos:
        {
            type:String
        }
    

})

const galaryModel = mongoose.model("galary",GalarySchema)
export default galaryModel