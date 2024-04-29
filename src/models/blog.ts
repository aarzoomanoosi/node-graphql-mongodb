const { model, Schema } = require("mongoose");

const blogSchema = new Schema({
    title: String,
    topic: String,
    tag: String,
    description: String,
    comments: Array<String>,
    numberOfLikes: Number,
    numberOfViews: Number,
    createdAt: Date,
    createdBy: String,
    isDeleted: Boolean
});

module.exports = model('Blog', blogSchema);