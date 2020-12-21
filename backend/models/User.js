const mongoose = require('mongoose')

// User MongoDB schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Export model with created schema
module.exports = mongoose.model('Users', userSchema);