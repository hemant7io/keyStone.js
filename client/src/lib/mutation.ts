import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      id
    }
  }
`;
