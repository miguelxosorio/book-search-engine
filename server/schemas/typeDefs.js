// import the gql tagged template function
const { gql } = require('apollo-server-express');

// creating the typeDefs -  Tagged templates are an advanced use of template literals
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String        
    }


  type Query {
    
  }
`;

// export the typeDefs
module.exports = typeDefs;
