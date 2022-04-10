// import the gql tagged template function
const { gql } = require('apollo-server-express');

// creating the typeDefs -  Tagged templates are an advanced use of template literals
const typeDefs = gql`
    type User {

    }

    type Book {
        
    }


  type Query {
    helloWorld: String
  }
`;

// export the typeDefs
module.exports = typeDefs;
