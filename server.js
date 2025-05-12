const express = require('express')
const morgan = require('morgan') // logar / shows logs
const cors = require('cors') //
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./routers/userRoute')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false})) // form data handling
app.use(bodyParser.json()) // json data handling

app.use("/api/users", userRoute)

app.get('/', (req, res) => {
    res.json ({
        message: "Welcome To Our Application"
    })
    // res.write("Welcome")
})

const PORT = process.env.PORT || 4000
mongoose.connect("mongodb://localhost/money-management-app", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    
    })
})
.catch(error => {
    console.log("MongoDB connection failed", error)
})
