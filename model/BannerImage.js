import mongoose from "mongoose";





const BannerImageSchema  = new mongoose.Schema({
    banner_image:{
        type:String,
     
    },
    

},{
    timestamps:true
})


const BannerImageModel  = mongoose.model("banner_image",BannerImageSchema)
export default BannerImageModel