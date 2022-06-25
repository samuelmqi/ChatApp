const mongoose = require('mongoose')

const URL =

'mongodb+srv://samuel2:teste123@cluster0.xuoptvl.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URL)

module.exports = mongoose
