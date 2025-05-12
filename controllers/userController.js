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
        
        //Check for duplicate user
        //New user Object
        //Save to Database
        //Response back with new data
    }
}