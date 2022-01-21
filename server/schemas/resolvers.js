const { Tutorial, User, Room, Category } = require('../models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { findById } = require('../models/Room');

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
        CreateTutorial: async (_parent, { steps, name, categoryID, userID }) => {
            // Check information
            if(!(steps && name && categoryID && userID)) {
                // TODO - Improve error handling
                if(err) console.log(err);
            }
            const newTutorial = new Tutorial({steps, name, category: categoryID, author: userID});
            await newTutorial.save((err) => {
                // TODO - Improve error handling
                if(err) console.log(err);
            });
            await Tutorial.populate(newTutorial, "author");
            await Tutorial.populate(newTutorial, "category");

            return newTutorial;
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
        CreateUser: async (_parent, { email, password, username }) => {
            // Check all info is given
            if(!(email && password && username)) {
                // TODO - Improve error handling
                console.log("ERROR CREATING USER - Insufficient info.")
                return null;
            }

            // Check the given email is unique
            const oldUser = await User.findOne({ email, username });
            console.log(oldUser);
            if(oldUser) {
                // TODO - Improve error handling
                console.log("ERROR CREATING USER - This email is already in use.");
                return null;
            }

            // TODO define and check password requirements

            // Encrypt password
            const encryptedPassword = await bcrypt.hash(password, 10) // 10 salt rounds
            // Create a new user
            const newUser = new User({ email, password: encryptedPassword, username });
            await newUser.save((err) => {
                // TODO - Improve error handling
                if(err) console.log(err);
            });

            return newUser;
            
        },
        Login: async (_parent, { username, password }) => {
            // Check for all information needed
            if(!(username && password)) {
                // TODO - Improve error handling
                console.log("ERROR LOGGING IN - Insufficient information.");
                return null;
            }

            // Check for a user with the given username
            const user = await User.findOne({ username });
            if(!user) {
                // TODO - Improve error handling
                console.log("ERROR LOGGING IN - Username not found.");
                return null;
            }

            // Check the given password
            if(!await user.checkPassword(password)) {
                // TODO - Improve error handling
                console.log("ERROR LOGGING IN - Incorrect password.");
                return null;
            }

            // TODO - Add user to the apollo context.

            return user;
        },
        ConnectToRoom: async (_parent, { roomID, userID }) => {
            // TODO - Check for existing connection from that user
            const room = await Room.findOneAndUpdate(
                { _id: roomID }, 
                { $push: { connected: userID }, },
                { new: true })
            .populate("owner")
            .populate("connected")
            .populate({ path: "tutorial", populate: ["author", "category"]});
            const user = await User.findOneAndUpdate(
                { _id: userID },
                { stepFinished: false, },
                { new: true }
            )
            user.toggleStepFinished();
            return room;
        },
        DisconnectFromRoom: async (_parent, { roomID, userID }) => {
            const room = await Room.findOneAndUpdate(
                { _id: roomID },
                { $pull: { connected: userID } },
                { new: true }
            ).populate("owner")
            .populate("connected")
            .populate({ path: "tutorial", populate: ["author", "category"] });

            const user = await User.updateOne(
                { _id: userID },
                { stepFinished: undefined },
                {}
            );

            return room;
        },
        ToggleStepFinished: async (_parent, { userID }) => {
            const user = await User.findById(userID);
            user.toggleStepFinished();
            await user.save((err) => {
                // TODO - Improve error handling
                if(err) console.log(err)
            });
            return user;
        }
    }
}

module.exports = resolvers;
