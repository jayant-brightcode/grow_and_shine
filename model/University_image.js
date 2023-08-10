import mongoose from "mongoose";






const UniversityImageSchema = new mongoose.Schema({
  
    university_images:
        {
            type:[String]
        }
    

})

const universityImageModel = mongoose.model("university_image",UniversityImageSchema)
export default universityImageModel