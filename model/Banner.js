import mongoose from "mongoose";




const BannerSchema  = new mongoose.Schema({
   
    banner:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"banner_image"
        }
    ]

},{
    timestamps:true
})


const bannerModel  = mongoose.model("banner",BannerSchema)
export default bannerModel