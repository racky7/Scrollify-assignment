const mongoose = require('mongoose')

const reqString = {
    type:String,
    required:true
}

const userSchema = new mongoose.Schema({
    name:reqString,
    email:reqString,
    password:reqString
})

mongoose.model('User',userSchema)