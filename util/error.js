module.exports = {
    serverError (res, err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error Occured"
        })
    },
    resourseError (res, message) {
        // console.log(err)
        res.status(400).json({
            message
        })
    }
}