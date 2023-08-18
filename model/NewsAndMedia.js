import mongoose from "mongoose";


const NewsAndMediaSchema = new mongoose.Schema({



  posted_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin"
  },
  post_image:{
    type:String,
    default:""
  },
  post_caption:{
    type:String,
    default:""
  },


},{
    timestamps:true
})


const newsandmediamodel = mongoose.model("news",NewsAndMediaSchema)
export default newsandmediamodel