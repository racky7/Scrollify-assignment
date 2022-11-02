const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) =>{
    //authorization === Bearer <token>
    
    const {authorization} = req.headers

    if(!authorization){
        res.status(401).json({error:"you must be logged in"})
        return
    }

    const token = authorization.replace("Bearer ","")

    //verify token

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if(error){
          return res.status(401).json({error:"invalid token"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
          req.user = userdata
          next()
        })
        
      })

    
}

