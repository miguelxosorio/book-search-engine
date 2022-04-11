const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  // QUERY
  Query: {
    me: async (parent, args, context) => {
      // check for the existence of context.user. If no context.user property exists, then we know that the user isn't authenticated and we can throw an AuthenticationError.
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id,
        }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
      // login accepts email and pw as params
      login: async() => {},

      // accepts a username, email, and pw as params; returns an Auth type
      addUser: async() => {},

      // accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type.
      saveBook: async() => {},

      // Accepts a book's bookId as a parameter; returns a User type
      removeBook: async() => {}
  },
};

module.exports = resolvers;
