const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

module.exports = server;
