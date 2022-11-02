const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

/*
it is a protected route, to access this route we need a middleware (we require login before acessing this route)
*/
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost',requireLogin, (req, res)=>{
    res.json({message:"yup! you are authorised"})
})

module.exports = router
