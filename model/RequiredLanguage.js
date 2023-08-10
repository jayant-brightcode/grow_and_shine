import mongoose from "mongoose"
const LanguageRequiredSchema = new mongoose.Schema({
    lang_name:{
        type:String,
        required:true
    },
    lang_desc:{
        type:String
    },
    lang_img:{
        type:String
    }

})

const languageModel = mongoose.model("language_required",LanguageRequiredSchema)
export default languageModel