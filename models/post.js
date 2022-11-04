const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const reqString = {
  type: String,
  required: true
}

const postLikes = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User"
  },
  name: reqString
})

const postComments = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User"
  },
  name: reqString,
  text: reqString
}, { timestamps: true })

const postSchema = new mongoose.Schema({
  caption: reqString,
  image: reqString,
  likes: [postLikes],
  comments: [postComments],
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
}, { timestamps: true })

mongoose.model("Post", postSchema)