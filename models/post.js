const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const reqString = {
    type:String,
    required:true
}

const postSchema = new mongoose.Schema({
    caption:reqString,
    image:reqString,
    likes:[{
      type:ObjectId,
      ref:"User"
    }],
    postedBy:{
      type:ObjectId,
      ref:"User"
    }
  },{timestamps:true})
  
  mongoose.model("Post",postSchema)