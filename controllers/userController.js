const registerValidator = require("../validator/registerValidator")
const User = require("../model/User")
const bcryptjs = require("bcryptjs")

module.exports = {
    //loginn controller
    login(req, res) {
        let name = req.body.name
        let email = req.body.email
        res.json ({
            message: `Hello ${name} welcome login page, we will contact with u by ${email}`
        })
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
                        return res.status(400).json({
                            message: "Email Already Exist"
                        })
                    }
                    //creating new User
                    bcryptjs.hash(password, 11, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                message: "error hashing pass"
                            })
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
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    message: "Server Error Occured.."
                                })
                            })
                    })
                    
                    
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Server Error Occured.."
                    })
                })
        }
        //Check for duplicate user
        //New user Object
        //Save to Database
        //Response back with new data
    }
}