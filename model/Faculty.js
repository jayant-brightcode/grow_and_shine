import mongoose from "mongoose"

const FacultySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    faculty_image:{
        type:String,
        required:true
    }
})

const FacultyModel = mongoose.model("faculty",FacultySchema)
export default FacultyModel