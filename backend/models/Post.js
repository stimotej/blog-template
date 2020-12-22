const mongoose = require('mongoose')

// Post MongoDB schema
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Draft'
    },
    comments: [
        {
            body: String,
            author: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User'
            },
            status: {
                type: String,
                default: 'Pending'
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

// Export model with created schema
module.exports = mongoose.model('Posts', postSchema);