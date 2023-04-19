import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import client from "../../../lib/apollo-client";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const { data } = await client.query({
          query: gql`
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
          `,
        });

        return data;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
