const app = require('./app');
const server = require('./server');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

async function startApolloServer() {
    await server.start();
    // Mount Apollo middleware
    server.applyMiddleware({ app });

    // Run Express Server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}

startApolloServer();
