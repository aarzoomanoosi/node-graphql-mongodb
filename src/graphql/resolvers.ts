const { v4: uuidv4 } = require('uuid');

const Blog = require("../models/blog");

module.exports = {
    Query: {
        async getAllBlogs(_, {title}) {
            return await Blog.find();
        },
        async getBlog(_, {title}) {
            return await Blog.findOne({title: title});
        },
        async getDeletedBlog(_, {isDeleted}) {
            return await Blog.find({ isDeleted: isDeleted });
        },
        async getBlogsCreatedOn(_, {creationDate}) {
            return await Blog.find({ createdAt: creationDate });
        }
    },
    Mutation: {
        async createBlog(_, {blogInput: {title, topic, tag, description}}) {
            const blog = new Blog ({
                title: title,
                topic: topic,
                tag: tag,
                description: description,
                comments: null,
                numberOfLikes: 0,
                numberOfViews: 0,                
                createdAt: new Date().toISOString(),
                createdBy: 'Test',
                isDeleted: false
            });
            const res = await blog.save(); // MongoDB Saving
            return true;
        },
        async updateBlog(_, {title, editBlogInput: {newTitle, topic, tag, description}}) {
            const blog = await Blog.findOne({title: title});
            if(blog != null){
                blog.title = newTitle;
                blog.topic = topic;
                blog.tag = tag;
                blog.description = description;
                var res = await blog.save();
                return true;
            }
            return false;
        },
        async addBlogComment(_, {title, blogCommentInput: {comment}}) {
            const blog = await Blog.findOne({title: title});
            if(blog != null){
                if(blog.comments == null){
                    blog.comments = [{          
                        id: uuidv4(),              
                        comment: comment
                    }]
                } else {
                    blog.comments.push({
                        id: uuidv4(),              
                        comment: comment
                    })
                }
                var res = await blog.save();
                return true;
            }
            return false;
        },
        async updateBlogComment(_, {title, id, blogCommentInput: {comment}}) {
            let blog = await Blog.findOne({title: title});
            let commentFound = false;
            if(blog != null){
                if(blog.comments == null) {
                    return false;
                } else {
                    for(let item of blog.comments) {
                        if(item.id == id) {
                            item.comment = comment;
                            commentFound = true;
                            break;
                        }
                    }
                    if(commentFound===true){
                        try {
                            await Blog.findOneAndUpdate({ title: title }, blog);
                            return true;
                          } catch (err) {
                            console.log(err);
                          }    
                    }                    
                }                
            }
            return false;
        }
    }
}