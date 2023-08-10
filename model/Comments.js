import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({



  post_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"community"
  },
  comment:{
    type:String
  },
  comment_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
 






},{
    timestamps:true
})


const commentModel = mongoose.model("comment",CommentSchema)
export default commentModel