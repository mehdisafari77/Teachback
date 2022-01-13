const { Tutorial, User, Room, Category } = require('../models');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        Tutorials: async (_parent, { name, categoryID }) => {
            console.log(name, categoryID)
            let options = {};
            // TODO - scrub text of regular expressions. Escape spacial characters.
            if(name) options.name = new RegExp(name, "i");
            if(categoryID) options.category = categoryID
            return await Tutorial.find(options).populate('category').populate('author');
        },
        Room: async (roomID) => {
            // TODO
            return null;
        },
        Categories: async () => {
            // TODO
            return await Category.find();
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
