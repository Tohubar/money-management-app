const registerValidator = require("../validator/registerValidator")
const loginValidator = require("../validator/loginValidator")
const User = require("../model/User")
const bcryptjs = require("bcryptjs")
const {serverError, resourseError} = require("../util/error")
const jwt = require('jsonwebtoken')

module.exports = {
    //loginn controller
    login(req, res) {
        //Exract Data from request
        let {email, password} = req.body
        //Validate Data
        let validate = loginValidator({email, password})
        //Check for user availability
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return resourseError(res, "User not found")
                }
                //Compare password
                bcryptjs.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourseError(res, "Password doesn't match..")
                    }
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Succesfull',
                        token: `Bearer ${token}`
                    })
                })
            })
            .catch(err => serverError(err))
        

        //Generate Token and response Back .. by jwt
    },
    //register controller
    register(req, res) {
        //read Client Data
        let {name, email, password, confirmPassword} = req.body
        //Validation check user data
        let validate = registerValidator({name, email, password, confirmPassword})
        if (!validate.isValid) {
            res.status(400).json(validate.error)
        }else {
            User.findOne({ email })
                .then(user => {
                    // res.json({user})
                    if (user) {
                        return resourseError(res, "Email Already exist..")
                    }
                    //creating new User
                    bcryptjs.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourseError(res, "Error hashing password")
                        }
                        const newUser = new User({
                            name,
                            email,
                            password: hash
                        })
                        // res.json({newUser})
                        newUser.save()
                            .then(newUser => {
                                res.status(201).json({
                                    message: "User Created Successfully",
                                    newUser
                                })
                            })
                            .catch(err => serverError(err))
                    })
                    
                    
                })
                .catch(err => serverError(err))
        }
        //Check for duplicate user
        //New user Object
        //Save to Database
        //Response back with new data
    }
}