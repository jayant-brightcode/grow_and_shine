import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({


   title:{
    type:String,
    required:true
   },
   body:{
    type:String,
    required:true
   },
   notification_type:{
    type:Number,
    required:true

   },
   toUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }




},{
    timestamps:true
})


const notificationModel = mongoose.model("notification",NotificationSchema)
export default notificationModel