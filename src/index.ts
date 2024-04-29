const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const mongoDBConnectionString = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/graphql?retryWrites=true&w=majority";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs, resolvers
});

mongoose.connect(mongoDBConnectionString, {})
    .then(() =>{
        console.log("MonogDB Connection Successful");
        return server.listen({port: 5000});
    })
    .then((res)=>{
        console.log(`Server running at ${res.url}`);
    });
