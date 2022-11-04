const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const reqString = {
    type:String,
    required:true
}

const userLikes = new mongoose.Schema({
  userId:{
    type:ObjectId,
    ref:"User"
  },
  name:reqString
})

const postSchema = new mongoose.Schema({
    caption:reqString,
    image:reqString,
    likes:[userLikes],
    postedBy:{
      type:ObjectId,
      ref:"User"
    }
  },{timestamps:true})
  
  mongoose.model("Post",postSchema)