const { Schema, model, SchemaTypes, models} = require('mongoose');
const CommentSchema = require('./Comment')

const PostSchema = new Schema({
// Create an "title" property with type String that is required and unique
// Create an "body" property with type String that is required
// Create a "createdAt" property with type Date and set default to Date.now
title: {
  type: String, 
  required: true,
  unique: true
},
body: {
  type: String, 
  required: true
},
createdAt: {
  type: Date,
  default: Date.now
},
// Create a "comments" property that is an array of CommentSchema (a subdocument)
comments: [CommentSchema], // Array of CommentSchema
    tags: [{
        type: SchemaTypes.ObjectId,
        ref: 'Tag' // Reference to a 'Tag' model
    }],
    slug: {
        type: String,
        unique: true // Optional: Ensure slugs are unique
    }
});
// Create a "tags" property that is an array of objects
// with type SchemaTypes.ObjectId and ref 'Tag'
// Create a "slug" property with type String

// Turns the first five words of the title and lowercases them
// and joins them on hypens.
// Ex: The Trouble With JavaScript => the-trouble-with-javascript
PostSchema.pre('save', async function(next) {
  this.slug = this.title
    .split(' ')
    .slice(0, 5)
    .join('-')
    .toLowerCase()
    .replace(/[',.*\?\!\\\$@;:"]/, "")
  next()
})

module.exports = models.Post || model('Post', PostSchema)
