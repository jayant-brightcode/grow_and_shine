import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema({



   name:{
    type:String,
    required:true
   },
   address:{
    type:String,
    required:true
   },
   toll_free:{
    type:String,
    required:true
   }



},{
    timestamps:true
})


const contactModel = mongoose.model("contactus",ContactSchema)
export default contactModel