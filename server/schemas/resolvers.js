const { Tutorial, User, Room, Category } = require('../models');

const resolvers = {
    Query: {
        Tutorials: async (name, categoryID) => {
            return await Tutorial.find({
                name: new RegExp(name, 'i'),    // Searches for tutorials with name like given name
                category: categoryID
            }).populate('category').populate('author');
        },
        Room: async (roomID) => {
            // TODO
            return null;
        },
        Categories: () => {
            // TODO
            return [{ name: "JavaScript" }, { name: "HTML" }, { name: "CSS" }];
        }
    },

    Mutation: {
        CreateTutorial: (steps, name, categoryID) => {
            // TODO
            return null;
        },
        CreateRoom: (tutorialID, ownerID) => {
            // TODO
            return null;
        },
        CreateUser: (email, password, username) => {
            // TODO
            return null;
        },
        Login: (username, password) => {
            // TODO
            return null;
        }
    }
}

module.exports = resolvers;
