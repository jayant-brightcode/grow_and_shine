import mongoose from "mongoose";

const Connection = async () =>{
const URL = process.env.URL
try {

     await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("db connected")
    
} catch (error) {
    console.log(error.message)
}



}

export default Connection