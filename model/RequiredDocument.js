import mongoose  from "mongoose"

const RequiredDocumentsSchema = new mongoose.Schema({
    document_name:{
        type:String,
        required:true
    },
    document_desc:{
        type:String
    },
    document_img:{
        type:String
    }

})

const requiredDocumentmodel = mongoose.model("required_document",RequiredDocumentsSchema)
export default requiredDocumentmodel