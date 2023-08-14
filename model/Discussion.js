import mongoose from "mongoose";



const DiscussionSchema = new mongoose.Schema({

    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    chat_room_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat_room"
    }


},{
    timestamps:true
})


const discussionModel = mongoose.model("discussion",DiscussionSchema)
export default discussionModel