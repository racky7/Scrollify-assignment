const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  mongoose.connection.on('connected', ()=>{
    console.log('connected to DB')
  })
  mongoose.connection.on('error', ()=>{
    console.log('error on connection')
  })

app.listen(PORT || process.env.PORT, ()=>{
    console.log('server is running on port: ', PORT)
  })