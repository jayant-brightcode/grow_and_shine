import mongoose from "mongoose";


const CommunitySchema = new mongoose.Schema({



  posted_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  post_image:{
    type:String,
    default:""
  },
  post_caption:{
    type:String,
    default:""
  },

  post_likes:{
    type:Number,
    default:0
  },
  comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }
  ],
  liked_by:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }]






},{
    timestamps:true
})


const communtityModel = mongoose.model("community",CommunitySchema)
export default communtityModel