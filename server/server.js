const app = require('./app');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

async function startApolloServer() {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    // Mount Apollo middleware
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    
    // Run Express Server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });
    });

    return { server, app };
}

startApolloServer();