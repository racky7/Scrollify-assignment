const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')

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

module.exports = router