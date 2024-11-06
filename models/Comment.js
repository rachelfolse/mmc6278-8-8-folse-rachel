const { Schema } = require('mongoose');

const CommentSchema = new Schema({

    author: {
        type: String, 
        default: 'Anonymous'
    },
    body: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = CommentSchema
