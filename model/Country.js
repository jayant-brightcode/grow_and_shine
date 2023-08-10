import mongoose from "mongoose";



const CountrySchema = new mongoose.Schema({

   name:{
    type:String,
    required:true
   },

   country_image:{
    type:String,
    required:true
   },

   region:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"region",
    required:true
   }

   


},{
    timestamps:true
})


const countryModel = mongoose.model("country",CountrySchema)
export default countryModel