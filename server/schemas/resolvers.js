const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
    login: async (parent, { email, password }) => {
      // find a user by email
      const user = await User.findOne({ email });

      // if user is not found via email
      if (!user) {
        throw new AuthenticationError('Incorrect login credentials');
      }

      // checking pw associated w the email passing in pw as param
      const correctPw = await user.isCorrectPassword(password);

      // if not correct pw
      if (!correctPw) {
        throw new AuthenticationError('Incorrect login credentials');
      }

      // sign a token and return an object that combines the token with the user's data
      const token = signToken(user);
      
      return { token, user };
    },

    // accepts a username, email, and pw as params; returns an Auth type
    addUser: async (parent, args) => {

        // Mongoose User model creates a new user in the database with whatever is passed in as the args
        const user = await User.create(args);
        
        // sign a token and return an object that combines the token with the user's data
        const token = signToken(user);

        return { token, user };
    },

    // accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type.
    saveBook: async () => {},

    // Accepts a book's bookId as a parameter; returns a User type
    removeBook: async () => {},
  },
};

module.exports = resolvers;


/*
A resolver can accept four arguments in the following order:
1. parent: This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to the resolver that executed the nested resolver function. We won't need this throughout the project, but we need to include it as the first argument.
2. args: This is an object of all of the values passed into a query or mutation request as parameters. In our case, we destructure the username parameter out to be used.
3. context: This will come into play later. If we were to need the same data to be accessible by all resolvers, such as a logged-in user's status or API access token, this data will come through this context parameter as an object.
4. info: This will contain extra information about an operation's current state. This isn't used as frequently, but it can be implemented for more advanced uses.
*/