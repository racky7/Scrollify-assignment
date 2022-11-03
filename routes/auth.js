const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    //check for empty string value
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "please add all the fields"
        })
    }

    User.findOne({ email: email }).then((savedUser) => {
        //if user already exist
        if (savedUser) {
            return res.status(400).json({
                error: "user already exist with this email"
            })
        }

        //encrypt user password
        bcrypt.hash(password, 7)
            .then(hashedpassword => {
                //create new user with hashed password
                const user = new User({
                    email,
                    password: hashedpassword,
                    name
                })


                //save user in databse    
                user.save()
                    .then(user => {
                        res.json({ message: "user saved successfully" })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }).catch((err) => {
                console.log(err)
            })

    })

})

router.post('/signin', (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please provide email or password"})
    }

    User.findOne({email:email}).then(savedUser=>{
        //check if user does not exist
        if(!savedUser){
            return res.status(422).json({error:"account does not exist"})
        }

        //decrypt user password
        bcrypt.compare(password, savedUser.password)
              .then(doCheck=>{
                //check if password is correct
                if(doCheck){
                    //generate a jwt token
                    const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET)
                    const {_id, name, email} = savedUser
                    res.status(200).json({message:"sucessfully signed in", token, user:{_id, name, email}})
                }
                else{
                    res.status(422).json({error:"invalid password"})
                }
              })
              .catch(err=>{
                console.log(err)
              })

    })

})

module.exports = router