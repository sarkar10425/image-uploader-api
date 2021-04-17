const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    base64: String,
    type: String,
}, { timestamps: true })


module.exports = mongoose.model("Image", imageSchema)