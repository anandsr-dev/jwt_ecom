const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Token', tokenSchema)