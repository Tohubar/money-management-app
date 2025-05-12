const router = require('express').Router()
const {login} = require("../controllers/userController")
//registration route
//localhost:400/api/users/register
router.post("/register", (req, res) => {

})

//Login route
//localhost:400/api/users/login
router.post("/login", login)

module.exports = router