const { required } = require('joi');
const mongoose = require('mongoose')

// Newsletter MongoDB schema
const newsletterSchema = mongoose.Schema({
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
module.exports = mongoose.model('Newsletter', newsletterSchema);