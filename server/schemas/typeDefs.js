// import the gql tagged template function
const { gql } = require('apollo-server-express');

// creating the typeDefs -  Tagged templates are an advanced use of template literals
const typeDefs = gql`
  # User definition
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  # Book definition
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  # Auth type must return a token and can optionally include any other user data.
  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
