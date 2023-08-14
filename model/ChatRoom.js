import mongoose from "mongoose";



const ChatRoomSchema = new mongoose.Schema({

    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    created_with:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }


},{
    timestamps:true
})


const chatroomModel = mongoose.model("chat_room",ChatRoomSchema)
export default chatroomModel