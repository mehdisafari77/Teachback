const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        username: String
        password: String
    }

    type Tutorial {
        _id: ID
        steps: [String]
        name: String
        author: User
        category: Category
    }

    type Category {
        _id: ID
        name: String
    }

    type Room {
        _id: ID
        connected: [User]
        owner: User
        currentStep: Int
        tutorial: Tutorial
    }

    type Query {
        Tutorials(name: String, categoryID: ID): [Tutorial]
        Room(roomID: ID): Room
        Categories: [Category]
    }

    type Mutation {
        CreateTutorial(steps: [String], name: String, categoryID: ID): Tutorial
        CreateRoom(tutorialID: ID, ownerID: ID): Room
        CreateUser(email: String, password: String, username: String): User
        Login(username: String, password: String): User
    }

`

module.exports = typeDefs;
