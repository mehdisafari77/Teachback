const { Tutorial, User, Room, Category } = require('../models');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        Tutorials: async (_parent, { name, categoryID }) => {
            console.log(name, categoryID)
            let options = {};
            // TODO - scrub text of regular expressions. Escape spacial characters.
            if(name) options.name = new RegExp(name, "i");
            if(categoryID) options.category = categoryID;
            
            return await Tutorial.find(options).populate('category').populate('author');
        },
        Room: async (_parent, { roomID }) => {
            const room = await Room.findById(roomID)
            .populate("owner")
            .populate("connected")
            .populate({
                path: "tutorial",
                populate: ["author", "category"]
            });
            return room;
        },
        Categories: async () => {
            return await Category.find();
        }
    },

    Mutation: {
        CreateTutorial: (_parent, { steps, name, categoryID, userID }) => {
            // TODO
            return null;
        },
        CreateRoom: async (_parent, { tutorialID, ownerID }) => {
            const newRoom = new Room({
                connected: [],
                owner: ownerID,
                currentStep: 0,
                tutorial: tutorialID
            });
            await newRoom.save((err) => {
                // TODO - Improve error handling
                if(err) console.log(err);
            });
            await Room.populate(newRoom, { path: "owner" });
            await Room.populate(newRoom, { path: "tutorial", populate: ["author", "category"] });
            return newRoom;
        },
        CreateUser: (_parent, { email, password, username }) => {
            // TODO
            return null;
        },
        Login: (_parent, { username, password }) => {
            // TODO
            return null;
        },
        ConnectToRoom: (_parent, { userID }) => {
            // TODO
            return null;
        },
        DisconnectFromRoom: (_parent, { userID }) => {
            // TODO
            return null;
        }
    }
}

module.exports = resolvers;
