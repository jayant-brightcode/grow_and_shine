import mongoose from "mongoose";


const UniversitySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

    university_image:
        {
            type:String,
            required:true
        }
    ,
    course:[
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
          }
    ],
    faculty:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"faculty"
    }],

    facility:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"facility"
    }],

    required_document:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"required_document"
    }],

    application_guidance:{
        type:String
    },
    language_require:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"language_required"
    }],
    introduction:{
        type:String,
        required:true
    },

     university_video:{
        type:String
     },

    galary:
        [{
            type:mongoose.Schema.Types.ObjectId,
             ref:"galary"
        }]
     ,
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"country",
        required:true
    },
    accreditation:{
        type:String,
        required:true
    },
    university_type:{
        type:String,
        required:true
    },
    year_of_establishment:{
        type:Number
    },
    course_duration:{
        type:String
    },
    mci_passing_rate:{
        type:String
    },
    who_listed:{
        type:String
    },
    fee_per_year:{
        type:Number
    },
    total_fee:{
        type:Number
    },
    world_rank:{
        type:String
    },
    city_population:{
        type:String
    },
    indian_food:{
        type:String
    },
    safty_index:{
        type:String
    },
    hostel:{
        type:String
    },
    medium:{
        type:String
    },
    living_cost:{
        type:String
    },
    flight_time:{
        type:String
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true

    }],
    region:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"region",
        required:true
    },
    eligibilty:{
        type:String,
        required:true
    }

},{
    timestamps:true
})





const universityModel = mongoose.model("university",UniversitySchema)
export default universityModel