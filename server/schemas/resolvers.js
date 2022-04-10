const { User } = require('../models');

const resolvers = {
  // QUERY
  Query: {
    me: async (parent, args, context) => {
      // check for the existence of context.user. If no context.user property exists, then we know that the user isn't authenticated and we can throw an AuthenticationError.
      if (context.user) {
        const userData = await User.findOne({})
        .select('-__v -password');

        return userData
      }
    },
  },

  Mutation: {},
};

module.exports = resolvers;
