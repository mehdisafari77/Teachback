const server = require('../../server');

// Start the development server, 
// Addressing the server in global scope for testing
module.exports = async () => {
    global.httpServer = await server.server;
};