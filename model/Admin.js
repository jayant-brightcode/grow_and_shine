import mongoose from "mongoose";



const AdminSchema = new mongoose.Schema({

    user_email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin_type:{
        type:Number,
        required:true
    }


},{
    timestamps:true
})


const adminModel = mongoose.model("admin",AdminSchema)
export default adminModel