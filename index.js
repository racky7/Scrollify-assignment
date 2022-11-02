const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT || process.env.PORT, ()=>{
    console.log('server is running on port: ', PORT)
  })