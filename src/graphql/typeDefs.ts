const { gql } = require("apollo-server");

module.exports = gql`
type Comment {
    id: ID!
    comment: String!
}

type Blog {
    title: String
    topic: String
    tag: String
    description: String
    comments: [Comment]
    numberOfLikes: Int
    numberOfViews: Int
    createdAt: String
    createdBy: String
    isDeleted: Boolean
}

input BlogInput {
    title: String!,
    topic: String!,
    tag: String,
    description: String!
}

input EditBlogInput {
    newTitle: String,
    topic: String,
    tag: String,
    description: String
}

input BlogCommentInput {
    comment: String!
}

type Query {
    getAllBlogs(title: String!): [Blog]
    getBlog(title: String!): Blog
    getDeletedBlog(isDeleted: Boolean): [Blog]
    getBlogsCreatedOn(creationDate: String!): [Blog]
}

type Mutation {
    createBlog(blogInput: BlogInput!): Boolean
    updateBlog(title: String!, editBlogInput: EditBlogInput): Boolean
    addBlogComment(title: String!, blogCommentInput: BlogCommentInput): Boolean    
    updateBlogComment(title: String!, id: ID!, blogCommentInput: BlogCommentInput): Boolean
}
`;