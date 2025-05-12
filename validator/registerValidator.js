const validator = require('validator')

let validation = user => {
    let error = {}

    if (!user.name) {
        error.name = "Please provide your name"
    }
    if (!user.email) {
        error.email = "Please provide your email address"
    }else if(!validator.isEmail(user.email)) {
        error.email = "Not a Valid Email..."
    }
    if (!user.password) {
        error.password = "Please enter password"
    }else if(user.password.length < 6) {
        error.password = "Password must be greater than equal to 6"
    }
    if (!user.confirmPassword) {
        error.confirmPassword = "Please confirm your password"
    }else if(user.password !== user.confirmPassword) {
        error.confirmPassword = "password doesn't match..."
    }

    return {
        error,
        isValid : Object.keys(error).length === 0
    }
}

module.exports = validation