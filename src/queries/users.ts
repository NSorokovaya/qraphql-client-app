import { gql } from "@apollo/client";

// 1. Add users list pagination

// 2. Add user details page (/users/:id)
// 2.1. All users data from the table
// 2.2. Number of all user's posts
// 2.3. Number of all user's comments
// 2.4. Number of all user's reactions
// 2.5. Number of all user's post views (how mony posts have they viewed)
// 2.6. List of user's friends (with basic user data -- username)
// 2.7. List of user's followees (with basic user data -- username)
// 2.8. List of user's followers (with basic user data -- username)

// 3. Add auth
// 3.1 Add auth page
// 3.2 Make the users query require auth, send to the login page if not authed

export const GET_USERS = gql`
  query GetUsers($first: Int, $after: String) {
    users(first: $first, after: $after) {
      edges {
        node {
          id
          username
          isAdmin
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
