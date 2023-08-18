import mongoose from "mongoose";


const BlogSchema = new mongoose.Schema({



  posted_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin"
  },
  post_image:{
    type:String,
    default:""
  },
  post_title:{
    type:String,
    default:""
  },
  post_desc:{
    type:String,
    default:""
  }


},{
    timestamps:true
})


const blogmodel = mongoose.model("blog",BlogSchema)
export default blogmodel