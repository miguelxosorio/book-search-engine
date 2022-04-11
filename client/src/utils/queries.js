// This will hold the query GET_ME, which will execute the me query set up using Apollo Server.
// This file will store all of the GraphQL query requests.
import { gql } from '@apollo/client';

// wrapped the entire query code in a tagged template literal using the imported gql function
// also saved it as GET_ME and exported it using the ES6 module export syntax
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        imageLinks
      }
    }
  }
`;
