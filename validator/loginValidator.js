const validator = require('validator')

let validation = user => {
    let error = {}

    if (!user.email) {
        error.email = "Please provide your email address"
    }else if(!validator.isEmail(user.email)) {
        error.email = "Not a Valid Email..."
    }
    if (!user.password) {
        error.password = "Please enter password"
    }
    return {
        error,
        isValid : Object.keys(error).length === 0
    }
}

module.exports = validation