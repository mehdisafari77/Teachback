// Stop the development server
module.exports = async () => {
    await global.httpServer.stop();
};