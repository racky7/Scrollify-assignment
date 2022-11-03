const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 4000
const cors = require('cors')

app.use(cors({
  origin:'*'
}))

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to DB')
})
mongoose.connection.on('error', () => {
    console.log('error on connection')
})

require('./models/user')
require('./models/post')

app.use(express.json())

//routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)

app.listen(PORT || process.env.PORT, () => {
    console.log('server is running on port: ', PORT)
})