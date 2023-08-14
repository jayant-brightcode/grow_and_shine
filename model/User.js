import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({

    phone:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    alternatePhone:{
        type:String,

    },
    aadharNumber:{
        type:String,
        default:"NA"
    },
    citizenShip:{
        type:String,
        required:true
    },
    student_type:{
        type:Number,
        required:true
    },
    tweleve_percentage:{
        type:String,
        required:String
    },
    passport_number:{
        type:String
    },
    gender:{
        type:Number,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    university_name:{
        type:String,
     
    },
    course_name:{
        type:String
    },
    user_type:{
        type:Number,
        required:true
    },
    neet_score:{
        type:String,
        default:"NA"
    },
    profile_photo:{
        type:String,
        default:"default_user.png"
    },
    isActive:{
        type:Boolean,
        default:false
    },
    notification_token:{
        type:String,
        required:true
    }

},{
    timestamps:true
})



const userModel = mongoose.model("user",UserSchema)
export default userModel